"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Droplet, Plus, Clock, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getMyRequests, cancelBloodRequest } from "@/api/bloodRequest.api";
import { logout } from "@/api/user.api";
import { TBloodRequestItem } from "@/types/bloodRequestList.types";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/confirm-dialog";

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Fulfilled: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function RequesterDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggingOut) return;
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    } else if (user && user.role === "donor") {
      router.replace("/dashboard/donor");
    }
  }, [authLoading, isAuthenticated, user, router]);

  const { data: myRequestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ["my-requests"],
    queryFn: getMyRequests,
    enabled: !!user,
  });

  const requests: TBloodRequestItem[] = myRequestsData?.data ?? [];

  const cancelMutation = useMutation({
    mutationFn: (id: string) => cancelBloodRequest(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
    },
    onError: (error: any) =>
      toast.error(error?.message ?? "Something went wrong"),
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

  return (
    <div className="min-h-screen bg-[#FFF9F4]">
      <div className="border-b border-[#E5D3BC] px-6 md:px-[6vw] py-5 flex justify-between items-center">
        <div className="flex items-center gap-2 font-serif text-xl font-semibold">
          <span className="w-7 h-7 grid place-items-center bg-[#A8201A] rounded-lg text-white">
            <Droplet size={15} fill="white" />
          </span>
          BloodConnect
        </div>
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17]"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="px-6 md:px-[6vw] py-10">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl font-semibold">
              Welcome, {user.fullName.split(" ")[0]}
            </h1>
            <p className="text-sm text-[#6b5f58] mt-1">
              Track and manage your blood requests
            </p>
          </div>

          <Link
            href="/requests"
            className="flex items-center gap-1.5 bg-[#A8201A] hover:bg-[#7A1712] text-white font-semibold text-sm px-5 py-3 rounded-lg"
          >
            <Plus size={16} /> New request
          </Link>
        </div>

        <h2 className="font-serif text-xl font-semibold mb-4">Your requests</h2>

        {requestsLoading ? (
          <p className="text-sm text-[#6b5f58]">Loading...</p>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
            You haven't created any blood requests yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((r) => (
              <div
                key={r._id}
                onClick={() => router.push(`/requests/${r._id}`)} // 🆕 ADD — card click gare detail page ma jaane
                className="flex flex-wrap items-center gap-4 bg-white rounded-lg px-5 py-4 border border-[#E5D3BC] cursor-pointer hover:shadow-md transition-shadow" // 🔁 CHANGE — cursor-pointer, hover:shadow-md add
              >
                <div className="font-serif text-xl font-semibold w-14 shrink-0">
                  {r.bloodGroup}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="text-[15px] font-bold">{r.patient}</div>
                  <div className="text-[13.5px] text-[#6b5f58] mt-1">
                    {r.hospital}, {r.district}
                  </div>
                  <div className="text-[12px] text-[#8a7d75] flex items-center gap-1 mt-1">
                    <Clock size={11} /> Required by{" "}
                    {new Date(r.requiredDate).toLocaleDateString()}
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusStyles[r.status]}`}
                >
                  {r.status}
                </span>
                {r.status === "Pending" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelMutation.mutate(r._id);
                    }}
                    disabled={cancelMutation.isPending}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                )}
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
