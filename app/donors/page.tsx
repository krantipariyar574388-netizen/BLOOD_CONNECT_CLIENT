"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Phone, MapPin, Search, Droplet, Calendar } from "lucide-react";

import { getEligibleDonors } from "@/api/user.api";
import { TDonorItem } from "@/types/donor.types";
import { BLOOD_GROUP_OPTIONS } from "@/constants/bloodGroup";

export default function DonorSearchPage() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    bloodGroup: "",
    district: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["eligible-donors", appliedFilters],
    queryFn: () =>
      getEligibleDonors({
        bloodGroup: appliedFilters.bloodGroup || undefined,
        district: appliedFilters.district || undefined,
      }),
  });

  const donors: TDonorItem[] = data?.data?.donors ?? [];
  const responseMessage: string | undefined = data?.message;

  const handleSearch = () => {
    setAppliedFilters({ bloodGroup, district });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] px-6 md:px-[6vw] py-10">
      <h1 className="font-serif text-2xl font-semibold mb-1">Find Donors</h1>
      <p className="text-sm text-[#6b5f58] mb-6">
        Search eligible donors by blood group and district.
      </p>

      {/* ---- filter bar ---- */}
      <div className="bg-white border border-[#E5D3BC] rounded-2xl p-5 mb-8 grid sm:grid-cols-3 gap-3">
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

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-1.5 bg-[#A8201A] hover:bg-[#7A1712] text-white font-semibold text-sm rounded-md py-2"
        >
          <Search size={15} /> Search
        </button>
      </div>

      {/* ---- results ---- */}
      {isLoading ? (
        <p className="text-sm text-[#6b5f58]">Loading donors...</p>
      ) : donors.length === 0 ? (
        <div className="bg-white border border-[#E5D3BC] rounded-xl p-8 text-center text-[#6b5f58]">
          {responseMessage ?? "No eligible donors found matching your criteria"}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map((d) => (
            <div
              key={d._id}
              className="bg-white border border-[#E5D3BC] rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 grid place-items-center bg-[#A8201A] rounded-lg text-white font-serif font-semibold">
                    {d.bloodGroup}
                  </span>
                  <div>
                    <div className="text-[15px] font-bold">{d.fullName}</div>
                    <div className="text-[12.5px] text-[#6b5f58] flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> {d.district}
                    </div>
                  </div>
                </div>

                {/* 🆕 available green dot */}
                <span
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    d.isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      d.isAvailable ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  />
                  {d.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 pt-3 border-t border-[#E5D3BC] text-[13px] text-[#6b5f58]">
                <div className="flex items-center gap-1.5">
                  <Phone size={13} /> {d.phone}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {d.lastDonationDate
                    ? `Last donated ${new Date(d.lastDonationDate).toLocaleDateString()}`
                    : "No donation history yet"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}