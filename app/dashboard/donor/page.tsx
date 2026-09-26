"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Droplet, MapPin, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getAllBloodRequests,
  fulfillBloodRequest,
} from "@/api/bloodRequest.api";
import { toggleAvailability, logout } from "@/api/user.api";
import { TBloodRequestItem } from "@/types/bloodRequestList.types";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/confirm-dialog";

export default function DonorDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggingOut) return;
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    } else if (user && user.role === "requester") {
      router.replace("/dashboard/requester");
    }
  }, [authLoading, isAuthenticated, user, router, isLoggingOut]);

  const { data: requestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ["nearby-requests", user?.bloodGroup, user?.district],
    queryFn: () =>
      getAllBloodRequests({
        bloodGroup: user?.bloodGroup,
        district: user?.district,
      }),
    enabled: !!user && user.isAvailable,
  });

  const requests: TBloodRequestItem[] = requestsData?.data?.requests ?? [];

  const availabilityMutation = useMutation({
    mutationFn: toggleAvailability,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: any) =>
      toast.error(error?.message ?? "Something went wrong"),
  });

    const fulfillMutation = useMutation({
    mutationFn: (id: string) => fulfillBloodRequest(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["nearby-requests"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      router.replace("/");
    },
  });

  if (authLoading || !user) {
    return (
      <div className="min-h-screen grid place-items-center text-[#6b5f58]">
        Loading...
      </div>
    );
  }

  const getEligibility = () => {
    if (!user.isAvailable) {
      return {
        eligible: false,
        reason: "You've marked yourself as unavailable.",
      };
    }
    if (user.lastDonationDate) {
      const lastDonation = new Date(user.lastDonationDate);
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      if (lastDonation > ninetyDaysAgo) {
        const nextEligibleDate = new Date(lastDonation);
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);
        return {
          eligible: false,
          reason: `You can donate again on ${nextEligibleDate.toLocaleDateString()}.`,
        };
      }
    }
    return { eligible: true, reason: "" };
  };

  const eligibility = getEligibility();

  return (
    <div className="min-h-screen bg-[#FFF9F4]">
      <div className="px-6 md:px-[6vw] py-10">
        <h2 className="font-serif text-xl font-semibold mb-4">
          Requests matching your blood group nearby
        </h2>

        {!eligibility.eligible ? (
          <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
            <p className="font-semibold mb-1">
              You're not currently eligible to donate
            </p>
            <p className="text-sm">{eligibility.reason}</p>
            <button
              onClick={() => availabilityMutation.mutate()}
              disabled={availabilityMutation.isPending}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60 ${
                user.isAvailable
                  ? "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                  : "bg-[#0F6E5C] hover:bg-[#0c5647] text-white"
              }`}
            >
              {availabilityMutation.isPending
                ? "Updating..."
                : user.isAvailable
                ? "Mark as not available"
                : "Mark as available"}
            </button>
          </div>
        ) : requestsLoading ? (
          <p className="text-sm text-[#6b5f58]">Loading requests...</p>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
            No matching requests right now. We'll notify you when someone nearby
            needs {user.bloodGroup}.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((r) => (
              <div
                key={r._id}
                onClick={() => router.push(`/requests/${r._id}`)}
                className="flex flex-wrap items-center gap-4 bg-white rounded-lg px-5 py-4 border-l-4 border-[#A8201A] cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="font-serif text-xl font-semibold w-14 shrink-0">
                  {r.bloodGroup}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="text-[15px] font-bold">{r.hospital}</div>
                  <div className="text-[13.5px] text-[#6b5f58] flex items-center gap-1 mt-1">
                    <MapPin size={13} /> {r.district}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white bg-[#A8201A] capitalize">
                    {r.urgency}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fulfillMutation.mutate(r._id);
                  }}
                  disabled={fulfillMutation.isPending}
                  className="flex items-center gap-1.5 bg-[#0F6E5C] hover:bg-[#0c5647] text-white text-sm font-semibold px-4 py-2 rounded-lg"
                >
                  <Heart size={14} /> I can donate
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={showLogoutDialog}
        title="Log out?"
        message="Are you sure you want to log out of your account?"
        onConfirm={() => {
          setIsLoggingOut(true);
          logoutMutation.mutate();
          setShowLogoutDialog(false);
        }}
        onCancel={() => setShowLogoutDialog(false)}
        isLoading={logoutMutation.isPending}
      />
    </div>
  );
}
