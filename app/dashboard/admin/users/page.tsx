"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Trash2, Ban, CheckCircle } from "lucide-react";

import { getAllUsers, toggleUserBan, deleteUser } from "@/api/admin.api";
import { TAdminUserItem } from "@/types/admin.types";
import { useSearchParams } from "next/navigation";

export default function AdminUsersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [roleFilter, setRoleFilter] = useState(searchParams.get("role") ?? "");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", roleFilter, search],
    queryFn: () =>
      getAllUsers({
        role: roleFilter || undefined,
        query: search || undefined,
      }),
  });

  const users: TAdminUserItem[] = data?.data?.users ?? [];

  const banMutation = useMutation({
    mutationFn: (id: string) => toggleUserBan(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) =>
      toast.error(error?.message ?? "Something went wrong"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) =>
      toast.error(error?.message ?? "Something went wrong"),
  });

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17] mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="font-serif text-2xl font-semibold mb-6">Manage Users</h1>

      <div className="bg-white border border-[#E5D3BC] rounded-2xl p-5 mb-6 grid sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A8201A]"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A8201A]"
        >
          <option value="">All roles</option>
          <option value="donor">Donor</option>
          <option value="requester">Requester</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-sm text-[#6b5f58]">Loading...</p>
      ) : users.length === 0 ? (
        <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
          No users found.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {users.map((u) => (
            <div
              key={u._id}
              className="flex flex-wrap items-center gap-4 bg-white border border-[#E5D3BC] rounded-lg px-5 py-4 cursor-pointer hover:shadow-md transition-shadow" // 🔁 CHANGE
            >
              <div
                onClick={() => router.push(`/dashboard/admin/users/${u._id}`)} // 🆕 ADD
                className="flex-1 min-w-[200px]"
              >
                <div className="text-[15px] font-bold">{u.fullName}</div>
                <div className="text-[13px] text-[#6b5f58]">{u.email}</div>
                <div className="text-[12px] text-[#8a7d75] mt-0.5">
                  {u.bloodGroup} · {u.district} ·{" "}
                  <span className="capitalize">{u.role}</span>
                </div>
              </div>

              {u.isBanned && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                  Banned
                </span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  banMutation.mutate(u._id);
                }}
                disabled={banMutation.isPending}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg ${
                  u.isBanned
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {u.isBanned ? <CheckCircle size={14} /> : <Ban size={14} />}
                {u.isBanned ? "Unban" : "Ban"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutation.mutate(u._id);
                }}
                disabled={deleteMutation.isPending}
                className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
