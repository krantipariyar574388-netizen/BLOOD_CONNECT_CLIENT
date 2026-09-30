"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Trash2 } from "lucide-react";

import { getAllBloodRequests, updateBloodRequestStatus, deleteBloodRequest } from "@/api/bloodRequest.api";
import { TBloodRequestItem } from "@/types/bloodRequestList.types";
import { STATUS_OPTIONS } from "@/constants/requestStatus";

export default function AdminRequestsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-requests", statusFilter],
    queryFn: () => getAllBloodRequests({ status: statusFilter || undefined }),
  });

  const requests: TBloodRequestItem[] = data?.data?.requests ?? [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateBloodRequestStatus(id, status),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBloodRequest(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17] mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="font-serif text-2xl font-semibold mb-6">Manage Requests</h1>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A8201A] mb-6"
      >
        <option value="">All statuses</option>
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {isLoading ? (
        <p className="text-sm text-[#6b5f58]">Loading...</p>
      ) : requests.length === 0 ? (
        <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
          No requests found.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {requests.map((r) => (
            <div
  key={r._id}
  className="flex flex-wrap items-center gap-4 bg-white border border-[#E5D3BC] rounded-lg px-5 py-4 cursor-pointer hover:shadow-md transition-shadow" // 🔁 CHANGE
>
  <div
    onClick={() => router.push(`/requests/${r._id}`)}
    className="flex items-center gap-4 flex-1"
  >
    <div className="font-serif text-lg font-semibold w-12">{r.bloodGroup}</div>
    <div className="flex-1 min-w-[200px]">
      <div className="text-[15px] font-bold">{r.patient}</div>
      <div className="text-[13px] text-[#6b5f58]">{r.hospital}, {r.district}</div>
    </div>
  </div>

  <select
    value={r.status}
    onChange={(e) => {
      e.stopPropagation();
      statusMutation.mutate({ id: r._id, status: e.target.value });
    }}
    onClick={(e) => e.stopPropagation()}
    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none"
  >
    {STATUS_OPTIONS.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>

  <button
    onClick={(e) => {
      e.stopPropagation();
      deleteMutation.mutate(r._id);
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