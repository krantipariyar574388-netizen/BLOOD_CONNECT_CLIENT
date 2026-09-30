"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, Phone, MapPin, Droplet, Ban, CheckCircle, Trash2, Calendar } from "lucide-react";

import { getUserById, toggleUserBan, deleteUser } from "@/api/admin.api";
import { TAdminUserItem } from "@/types/admin.types";

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params?.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

  const user: TAdminUserItem | undefined = data?.data;

  const banMutation = useMutation({
    mutationFn: () => toggleUserBan(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: (res) => {
      toast.success(res.message);
      router.push("/dashboard/admin/users");
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center text-[#6b5f58]">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen grid place-items-center text-[#6b5f58]">User not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17] mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="max-w-2xl mx-auto bg-white border border-[#E5D3BC] rounded-2xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 grid place-items-center bg-[#A8201A] rounded-full text-white font-serif text-xl font-semibold">
              {user.fullName.charAt(0)}
            </span>
            <div>
              <h1 className="font-serif text-xl font-semibold">{user.fullName}</h1>
              <p className="text-sm text-[#6b5f58] capitalize">{user.role}</p>
            </div>
          </div>

          {user.isBanned && (
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              Banned
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-6 pb-6 border-b border-[#E5D3BC]">
          <div className="flex items-start gap-2">
            <Mail size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">Email</div>
              <div className="text-sm font-semibold">{user.email}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">Phone</div>
              <div className="text-sm font-semibold">{user.phone}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Droplet size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">Blood Group</div>
              <div className="text-sm font-semibold">{user.bloodGroup}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">District</div>
              <div className="text-sm font-semibold">{user.district}</div>
            </div>
          </div>

          {user.role === "donor" && (
            <div className="flex items-start gap-2">
              <Calendar size={16} className="text-[#6b5f58] mt-0.5" />
              <div>
                <div className="text-xs text-[#8a7d75]">Availability</div>
                <div className="text-sm font-semibold">
                  {user.isAvailable ? "Available" : "Not available"}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => banMutation.mutate()}
            disabled={banMutation.isPending}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg ${
              user.isBanned
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {user.isBanned ? <CheckCircle size={16} /> : <Ban size={16} />}
            {user.isBanned ? "Unban User" : "Ban User"}
          </button>

          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
          >
            <Trash2 size={16} /> Delete User
          </button>
        </div>
      </div>
    </div>
  );
}