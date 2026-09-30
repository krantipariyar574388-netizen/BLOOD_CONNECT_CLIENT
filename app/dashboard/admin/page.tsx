"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Droplet, Users, Heart, Activity, LogOut } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { getAdminStats } from "@/api/admin.api";
import { logout } from "@/api/user.api";
import { TAdminStats } from "@/types/admin.types";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggingOut) return;
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    } else if (user && user.role !== "admin") {
      router.replace("/"); // गैर-admin लाई landing page मा फर्काउने
    }
  }, [authLoading, isAuthenticated, user, router, isLoggingOut]);

  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    enabled: !!user && user.role === "admin",
  });

  const stats: TAdminStats | undefined = data?.data;

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
          BloodConnect Admin
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard/admin/users"
            className="text-sm text-[#6b5f58] hover:text-[#211A17]"
          >
            Users
          </Link>
          <Link
            href="/dashboard/admin/requests"
            className="text-sm text-[#6b5f58] hover:text-[#211A17]"
          >
            Requests
          </Link>
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17]"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="px-6 md:px-[6vw] py-10">
        <h1 className="font-serif text-2xl font-semibold mb-6">
          Admin Overview
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => router.push("/dashboard/admin/users")}
            className="bg-white border border-[#E5D3BC] rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <Users size={20} className="text-[#A8201A] mb-2" />
            <div className="text-2xl font-serif font-semibold">
              {stats?.totalUsers ?? "-"}
            </div>
            <div className="text-xs text-[#6b5f58]">Total Users</div>
          </div>

          <div
            onClick={() => router.push("/dashboard/admin/users?role=donor")}
            className="bg-white border border-[#E5D3BC] rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <Heart size={20} className="text-[#0F6E5C] mb-2" />
            <div className="text-2xl font-serif font-semibold">
              {stats?.totalDonors ?? "-"}
            </div>
            <div className="text-xs text-[#6b5f58]">Donors</div>
          </div>

          <div
            onClick={() => router.push("/dashboard/admin/users?role=requester")}
            className="bg-white border border-[#E5D3BC] rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <Users size={20} className="text-amber-600 mb-2" />
            <div className="text-2xl font-serif font-semibold">
              {stats?.totalRequesters ?? "-"}
            </div>
            <div className="text-xs text-[#6b5f58]">Requesters</div>
          </div>

          <div
            onClick={() =>
              router.push("/dashboard/admin/requests?status=Pending")
            }
            className="bg-white border border-[#E5D3BC] rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <Activity size={20} className="text-orange-600 mb-2" />
            <div className="text-2xl font-serif font-semibold">
              {stats?.pendingRequests ?? "-"}
            </div>
            <div className="text-xs text-[#6b5f58]">Pending Requests</div>
          </div>

          <div
            onClick={() =>
              router.push("/dashboard/admin/requests?status=Fulfilled")
            }
            className="bg-white border border-[#E5D3BC] rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <Activity size={20} className="text-emerald-600 mb-2" />
            <div className="text-2xl font-serif font-semibold">
              {stats?.fulfilledRequests ?? "-"}
            </div>
            <div className="text-xs text-[#6b5f58]">Fulfilled Requests</div>
          </div>
        </div>
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
