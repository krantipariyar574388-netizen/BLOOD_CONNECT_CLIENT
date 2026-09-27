"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Droplet, MapPin, Phone } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { toggleAvailability } from "@/api/user.api";
import UpdateProfileForm from "@/components/form/updateProfile.form";
import ChangePasswordForm from "@/components/form/changePassword.form";

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  const [tab, setTab] = useState<"profile" | "password">("profile");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const availabilityMutation = useMutation({
    mutationFn: toggleAvailability,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  if (authLoading || !user) {
    return <div className="min-h-screen grid place-items-center text-[#6b5f58]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17] mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="max-w-2xl mx-auto">
        {/* ---- profile card ---- */}
        <div className="bg-white border border-[#E5D3BC] rounded-2xl p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.profile_image?.path ? (
              <img
                src={user.profile_image.path}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover border border-[#E5D3BC]"
              />
            ) : (
              <span className="w-16 h-16 grid place-items-center bg-[#A8201A] rounded-full text-white font-serif text-xl font-semibold">
                {user.fullName.charAt(0)}
              </span>
            )}
            <div>
              <h1 className="font-serif text-xl font-semibold">{user.fullName}</h1>
              <div className="flex items-center gap-1.5 text-sm text-[#6b5f58] mt-1">
                <Droplet size={13} /> {user.bloodGroup}
                <span className="mx-1">·</span>
                <MapPin size={13} /> {user.district}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#6b5f58] mt-1">
                <Phone size={13} /> {user.phone}
              </div>
            </div>
          </div>

          {user.role === "donor" && (
            <button
              onClick={() => availabilityMutation.mutate()}
              disabled={availabilityMutation.isPending}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold ${
                user.isAvailable
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
            >
              {user.isAvailable ? "● Available to donate" : "○ Not available"}
            </button>
          )}
        </div>

        {/* ---- tabs ---- */}
        <div className="flex gap-2 mb-6 border-b border-[#E5D3BC]">
          <button
            onClick={() => setTab("profile")}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 ${
              tab === "profile"
                ? "border-[#A8201A] text-[#A8201A]"
                : "border-transparent text-[#6b5f58]"
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setTab("password")}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 ${
              tab === "password"
                ? "border-[#A8201A] text-[#A8201A]"
                : "border-transparent text-[#6b5f58]"
            }`}
          >
            Change Password
          </button>
        </div>

        {/* ---- tab content ---- */}
        <div className="bg-white border border-[#E5D3BC] rounded-2xl p-6">
          {tab === "profile" ? (
            <UpdateProfileForm user={user} />
          ) : (
            <ChangePasswordForm />
          )}
        </div>
      </div>
    </div>
  );
}