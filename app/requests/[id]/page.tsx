"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MapPin, Phone, Calendar, Droplet, Heart, ArrowLeft, FileText } from "lucide-react";

import { getBloodRequestById, fulfillBloodRequest } from "@/api/bloodRequest.api";
import { useAuth } from "@/hooks/useAuth";
import { TBloodRequestItem } from "@/types/bloodRequestList.types";

const urgencyColor: Record<string, string> = {
  low: "bg-[#0F6E5C]",
  medium: "bg-amber-600",
  high: "bg-orange-700",
  critical: "bg-[#A8201A]",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Fulfilled: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function BloodRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const id = params?.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blood-request", id],
    queryFn: () => getBloodRequestById(id),
    enabled: !!id,
  });

  const request: TBloodRequestItem | undefined = data?.data;

  const fulfillMutation = useMutation({
    mutationFn: () => fulfillBloodRequest(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["blood-request", id] });
      queryClient.invalidateQueries({ queryKey: ["nearby-requests"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Something went wrong"),
  });

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center text-[#6b5f58]">Loading...</div>;
  }

  if (isError || !request) {
    return (
      <div className="min-h-screen grid place-items-center text-[#6b5f58]">
        Request not found.
      </div>
    );
  }

  // 🆕 donor le afno hoina bhaneko request matra fulfill garna paune, ra status Pending huनुparcha
  const canFulfill =
    user?.role === "donor" &&
    request.status === "Pending" &&
    request.requester._id !== user._id;

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[#6b5f58] hover:text-[#211A17] mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="max-w-2xl mx-auto bg-white border border-[#E5D3BC] rounded-2xl p-8">
        {/* ---- header ---- */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 grid place-items-center bg-[#A8201A] rounded-xl text-white font-serif text-xl font-semibold">
              {request.bloodGroup}
            </span>
            <div>
              <h1 className="font-serif text-xl font-semibold">{request.patient}</h1>
              <p className="text-sm text-[#6b5f58]">Patient</p>
            </div>
          </div>

          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusStyles[request.status]}`}>
            {request.status}
          </span>
        </div>

        {/* ---- urgency badge ---- */}
        <span
          className={`inline-block text-xs font-bold text-white px-3 py-1.5 rounded-full capitalize mb-6 ${urgencyColor[request.urgency]}`}
        >
          {request.urgency} urgency
        </span>

        {/* ---- details grid ---- */}
        <div className="grid sm:grid-cols-2 gap-5 mb-6 pb-6 border-b border-[#E5D3BC]">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">Hospital</div>
              <div className="text-sm font-semibold">{request.hospital}</div>
              <div className="text-sm text-[#6b5f58]">{request.district}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Droplet size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">Units needed</div>
              <div className="text-sm font-semibold">{request.units}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">Required by</div>
              <div className="text-sm font-semibold">
                {new Date(request.requiredDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone size={16} className="text-[#6b5f58] mt-0.5" />
            <div>
              <div className="text-xs text-[#8a7d75]">Contact phone</div>
              <div className="text-sm font-semibold">{request.phone}</div>
            </div>
          </div>
        </div>

        {/* ---- requester profile ---- */}
        <div className="mb-6 pb-6 border-b border-[#E5D3BC]">
          <div className="text-xs text-[#8a7d75] mb-2">Requested by</div>
          <div className="text-sm font-semibold">{request.requester.fullName ?? "Unknown"}</div>
          {request.requester.email && (
            <div className="text-sm text-[#6b5f58]">{request.requester.email}</div>
          )}
          {request.requester.phone && (
            <div className="text-sm text-[#6b5f58]">{request.requester.phone}</div>
          )}
        </div>

        {/* ---- medical document ---- */}
        {(request as any).medicalDocument?.path && (
          <a href={(request as any).medicalDocument.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#0F6E5C] hover:underline mb-6"
          >
            <FileText size={16} /> View medical document / prescription
          </a>
        )}

        {/* ---- fulfill button ---- */}
        {canFulfill && (
          <button
            onClick={() => fulfillMutation.mutate()}
            disabled={fulfillMutation.isPending}
            className="flex items-center justify-center gap-2 w-full bg-[#0F6E5C] hover:bg-[#0c5647] text-white font-semibold py-3 rounded-lg disabled:opacity-60"
          >
            <Heart size={16} />
            {fulfillMutation.isPending ? "Processing..." : "I can donate"}
          </button>
        )}
      </div>
    </div>
  );
}