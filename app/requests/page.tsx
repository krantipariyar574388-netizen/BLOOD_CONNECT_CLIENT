"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MapPin, Clock, Search } from "lucide-react";

import { getAllBloodRequests } from "@/api/bloodRequest.api";
import { TBloodRequestItem } from "@/types/bloodRequestList.types";
import { BLOOD_GROUP_OPTIONS } from "@/constants/bloodGroup";
import { URGENCY_OPTIONS } from "@/constants/urgency";
import { STATUS_OPTIONS } from "@/constants/requestStatus";

const urgencyBarColor: Record<string, string> = {
  critical: "border-[#A8201A]",
  high: "border-orange-600",
  medium: "border-amber-500",
  low: "border-[#0F6E5C]",
};

const urgencyBadgeColor: Record<string, string> = {
  critical: "bg-[#A8201A]",
  high: "bg-orange-600",
  medium: "bg-amber-500",
  low: "bg-[#0F6E5C]",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Fulfilled: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function RequestsFeedPage() {
  const router = useRouter();

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [status, setStatus] = useState("");
  const [urgency, setUrgency] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    bloodGroup: "",
    district: "",
    status: "",
    urgency: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["public-requests", appliedFilters],
    queryFn: () =>
      getAllBloodRequests({
        bloodGroup: appliedFilters.bloodGroup || undefined,
        district: appliedFilters.district || undefined,
        status: appliedFilters.status || undefined,
        urgency: appliedFilters.urgency || undefined,
      }),
  });

  const requests: TBloodRequestItem[] = data?.data?.requests ?? [];

  const handleSearch = () => {
    setAppliedFilters({ bloodGroup, district, status, urgency });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <h1 className="font-serif text-2xl font-semibold mb-1">Blood Requests</h1>
      <p className="text-sm text-[#6b5f58] mb-6">
        Browse active blood requests near you and lend a hand.
      </p>

      <div className="bg-white border border-[#E5D3BC] rounded-2xl p-5 mb-8 grid sm:grid-cols-2 md:grid-cols-5 gap-3">
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A8201A]"
        >
          <option value="">All blood groups</option>
          {BLOOD_GROUP_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A8201A]"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A8201A]"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A8201A] capitalize"
        >
          <option value="">All urgency levels</option>
          {URGENCY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-1.5 bg-[#A8201A] hover:bg-[#7A1712] text-white font-semibold text-sm rounded-md py-2"
        >
          <Search size={15} /> Search
        </button>
      </div>

      {/* ---- results ---- */}
      {isLoading ? (
        <p className="text-sm text-[#6b5f58]">Loading requests...</p>
      ) : requests.length === 0 ? (
        <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
          No requests found matching your criteria.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((r) => (
            <div
              key={r._id}
              onClick={() => router.push(`/requests/${r._id}`)}
              className={`flex flex-wrap items-center gap-4 bg-white rounded-lg px-5 py-4 border-l-4 cursor-pointer hover:shadow-md transition-shadow ${urgencyBarColor[r.urgency]}`}
            >
              <div className="font-serif text-xl font-semibold w-14 shrink-0">
                {r.bloodGroup}
              </div>

              <div className="flex-1 min-w-[180px]">
                <div className="text-[15px] font-bold">{r.patient}</div>
                <div className="text-[13.5px] text-[#6b5f58] flex items-center gap-1 mt-1">
                  <MapPin size={13} /> {r.hospital}, {r.district}
                </div>
                <div className="text-[12px] text-[#8a7d75] flex items-center gap-1 mt-1">
                  <Clock size={11} /> Required by{" "}
                  {new Date(r.requiredDate).toLocaleDateString()}
                </div>
              </div>

              <span
                className={`text-xs font-bold text-white px-2.5 py-1 rounded-full capitalize ${urgencyBadgeColor[r.urgency]}`}
              >
                {r.urgency}
              </span>

              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusStyles[r.status]}`}
              >
                {r.status}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/requests/${r._id}`);
                }}
                className="text-sm font-semibold text-[#A8201A] hover:underline"
              >
                View details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}