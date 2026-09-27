"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2, ArrowLeft } from "lucide-react";

import {
  getMyNotifications,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/api/notification.api";
import { TNotificationItem } from "@/types/notification.types";

export default function NotificationsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
  });

  const notifications: TNotificationItem[] = data?.data?.notifications ?? [];
  const unreadCount: number = data?.data?.unreadCount ?? 0;

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: (res) => {
      toast.success(res.message ?? "Notification deleted");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  const handleClick = (n: TNotificationItem) => {
    if (n.bloodRequest?._id) {
      router.push(`/requests/${n.bloodRequest._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17] mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-semibold">Notifications</h1>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllReadMutation.mutate()}
            className="text-sm font-semibold text-[#0F6E5C] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-sm text-[#6b5f58]">Loading...</p>
      ) : notifications.length === 0 ? (
        <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
          No notifications yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`flex items-start justify-between gap-3 bg-white border border-[#E5D3BC] rounded-lg px-5 py-4 ${
                !n.isRead ? "border-l-4 border-l-[#A8201A]" : ""
              }`}
            >
              <button onClick={() => handleClick(n)} className="flex-1 text-left">
                <p className="text-sm text-[#211A17]">{n.message}</p>
                <p className="text-xs text-[#8a7d75] mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </button>

              <button
                onClick={() => deleteMutation.mutate(n._id)}
                disabled={deleteMutation.isPending}
                className="text-[#A8201A] hover:text-[#7A1712] shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}