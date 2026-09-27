"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/api/notification.api";
import { TNotificationItem } from "@/types/notification.types";

export default function NotificationBell() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    refetchInterval: 30000,
  });

  const notifications: TNotificationItem[] = data?.data?.notifications ?? [];
  const unreadCount: number = data?.data?.unreadCount ?? 0;
  const latestFive = notifications.slice(0, 5);

  const markReadMutation = useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (n: TNotificationItem) => {
    if (!n.isRead) {
      markReadMutation.mutate(n._id);
    }
    setOpen(false);
    if (n.bloodRequest?._id) {
      router.push(`/requests/${n.bloodRequest._id}`);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17]"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#A8201A] text-white text-[10px] font-bold w-4 h-4 rounded-full grid place-items-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E5D3BC] rounded-xl shadow-lg z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#E5D3BC]">
            <span className="text-sm font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllReadMutation.mutate()}
                className="text-xs text-[#0F6E5C] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {latestFive.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-[#6b5f58]">
                No notifications yet
              </div>
            ) : (
              latestFive.map((n) => (
                <button
                  key={n._id}
                  onClick={() => handleNotificationClick(n)}
                  className={`w-full text-left px-4 py-3 border-b border-[#E5D3BC] last:border-0 hover:bg-gray-50 ${
                    !n.isRead ? "bg-red-50/40" : ""
                  }`}
                >
                  <p className="text-sm text-[#211A17]">{n.message}</p>
                  <p className="text-xs text-[#8a7d75] mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </button>
              ))
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-[#E5D3BC] text-center">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/notifications");
              }}
              className="text-sm font-semibold text-[#A8201A] hover:underline"
            >
              View all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}