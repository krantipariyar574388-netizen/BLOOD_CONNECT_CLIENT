"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  MapPin,
  Clock,
  ShieldCheck,
  Users,
  Activity,
  ChevronRight,
  Phone,
  Droplet,
} from "lucide-react";
import Link from "next/link";

const BLOOD_TYPES = [
  { type: "A+", count: 214, status: "ok" },
  { type: "A-", count: 38, status: "low" },
  { type: "B+", count: 261, status: "ok" },
  { type: "B-", count: 22, status: "critical" },
  { type: "AB+", count: 96, status: "ok" },
  { type: "AB-", count: 11, status: "critical" },
  { type: "O+", count: 302, status: "ok" },
  { type: "O-", count: 29, status: "low" },
];

const STATS = [
  { label: "Registered donors", value: "2,400+" },
  { label: "Lives supported", value: "860" },
  { label: "Cities covered", value: "34" },
  { label: "Requests right now", value: "12" },
];

const STEPS = [
  {
    n: "1",
    title: "Share what's needed",
    body: "Blood group, hospital, and how urgent it is — takes under a minute.",
  },
  {
    n: "2",
    title: "We match you",
    body: "Verified donors nearby with a matching or compatible type are notified instantly.",
  },
  {
    n: "3",
    title: "Connect directly",
    body: "Call, confirm eligibility, and coordinate the donation with the hospital.",
  },
];

const REQUESTS = [
  {
    type: "O-",
    hospital: "Grande International Hospital",
    city: "Kathmandu",
    urgency: "Critical",
    time: "2 hrs ago",
  },
  {
    type: "B+",
    hospital: "Bir Hospital",
    city: "Kathmandu",
    urgency: "Urgent",
    time: "5 hrs ago",
  },
  {
    type: "AB+",
    hospital: "Manipal Teaching Hospital",
    city: "Pokhara",
    urgency: "Stable",
    time: "1 day ago",
  },
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: "ID-verified profiles",
    body: "Every donor confirms identity and blood group before appearing in search.",
  },
  {
    icon: Activity,
    title: "Health screening reminders",
    body: "We nudge donors on rest periods and basic eligibility ahead of each match.",
  },
  {
    icon: Users,
    title: "Hospital partnerships",
    body: "Requests from partner hospitals are flagged and prioritised automatically.",
  },
];

const cellStyles: Record<string, string> = {
  ok: "bg-emerald-50 border-emerald-200",
  low: "bg-amber-50 border-amber-200",
  critical: "bg-red-50 border-red-200",
};
const dotStyles: Record<string, string> = {
  ok: "bg-teal-700",
  low: "bg-amber-600",
  critical: "bg-red-700",
};
const badgeStyles: Record<string, string> = {
  Critical: "bg-red-700",
  Urgent: "bg-amber-600",
  Stable: "bg-teal-700",
};

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeType, setActiveType] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-[#211A17] font-sans">
      <nav className="flex items-center justify-between px-6 md:px-[6vw] py-5 border-b border-[#E5D3BC]">
        <div className="flex items-center gap-2 font-serif text-xl font-semibold tracking-tight">
          <span className="w-7 h-7 grid place-items-center bg-[#A8201A] rounded-lg text-white">
            <Droplet size={15} fill="white" />
          </span>
          BloodConnect
        </div>

        <div className="hidden md:flex items-center gap-8 text-[15px]">
          <a href="#how" className="opacity-75 hover:opacity-100">
            How it works
          </a>
          <a href="#requests" className="opacity-75 hover:opacity-100">
            Urgent requests
          </a>
          <a href="#trust" className="opacity-75 hover:opacity-100">
            Why trust us
          </a>
          <Link href="/login" className="opacity-75 hover:opacity-100">
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-[#A8201A] hover:bg-[#7A1712] text-white text-[14.5px] font-semibold px-5 py-2.5 rounded-lg"
          >
            Become a donor
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
  <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-b border-[#E5D3BC]">
    <a href="#how">How it works</a>
    <a href="#requests">Urgent requests</a>
    <a href="#trust">Why trust us</a>
    <Link href="/login" className="text-sm font-semibold">
      Log in
    </Link>
    <Link
      href="/register"
      className="bg-[#A8201A] text-white text-sm font-semibold px-5 py-2.5 rounded-lg w-fit"
    >
      Become a donor
    </Link>
  </div>
)}

      <section className="grid md:grid-cols-[1.05fr_0.95fr] gap-14 px-6 md:px-[6vw] pt-16 pb-20 items-center">
          <div className="flex items-center gap-2 text-sm text-[#A8201A] font-semibold mb-4">
            <Heart size={15} fill="#A8201A" />
            Nepal's donor-to-patient network
          </div>

          <h1 className="font-serif font-semibold text-[34px] md:text-[52px] leading-[1.08] tracking-tight max-w-[12.5ch] mb-5">
            Your blood type is someone's lifeline today
          </h1>

          <p className="text-lg leading-relaxed text-[#4a413c] max-w-[46ch] mb-8">
            BloodConnect matches people who need blood with verified donors
            nearby — in minutes, not days. Search by blood group, city, or
            hospital.
          </p>

          <div className="flex flex-wrap gap-3.5 mb-10">
            
  <Link
    href="/register"
    className="flex items-center gap-1.5 bg-[#A8201A] hover:bg-[#7A1712] text-white font-semibold text-[15.5px] px-6 py-3.5 rounded-lg"
  >
    Register as donor <ChevronRight size={16} />
  </Link>

  <Link
  href="/requests"
  className="border-[1.5px] border-[#211A17] hover:bg-[#211A17] hover:text-[#FFF9F4] font-semibold text-[15.5px] px-6 py-3.5 rounded-lg"
>
  Request blood
</Link>

          <div className="flex items-center gap-2 text-sm text-[#6b5f58]">
            <ShieldCheck size={16} color="#0F6E5C" />
            2,400+ ID-verified donors across 34 cities
          </div>
        </div>

        <div className="bg-white border border-[#E5D3BC] rounded-2xl p-6">
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="font-serif text-lg font-semibold">
              Live donor availability
            </h3>
            <span className="text-[13px] text-[#8a7d75] flex items-center gap-1">
              <MapPin size={13} /> Kathmandu Valley
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {BLOOD_TYPES.map((b) => (
              <div
                key={b.type}
                className={`rounded-lg border px-2.5 py-3.5 text-center transition-transform hover:-translate-y-0.5 ${cellStyles[b.status]}`}
                onMouseEnter={() => setActiveType(b.type)}
                onMouseLeave={() => setActiveType(null)}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block mb-1.5 ${dotStyles[b.status]}`}
                />
                <div className="font-serif text-xl font-semibold">{b.type}</div>
                <div className="text-[12.5px] text-[#5c5049] mt-0.5">
                  {activeType === b.type
                    ? b.status === "critical"
                      ? "Needs donors"
                      : b.status === "low"
                        ? "Running low"
                        : "Well stocked"
                    : `${b.count} donors`}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-4 text-[12.5px] text-[#6b5f58]">
            <span className="flex items-center gap-1.5">
              <i className="w-1.5 h-1.5 rounded-full inline-block bg-teal-700" />{" "}
              Well stocked
            </span>
            <span className="flex items-center gap-1.5">
              <i className="w-1.5 h-1.5 rounded-full inline-block bg-amber-600" />{" "}
              Running low
            </span>
            <span className="flex items-center gap-1.5">
              <i className="w-1.5 h-1.5 rounded-full inline-block bg-red-700" />{" "}
              Critical
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#E5D3BC]">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`text-center py-8 px-4 ${i !== 0 ? "border-l border-[#E5D3BC]" : ""} ${
              i < 2 ? "border-b md:border-b-0 border-[#E5D3BC]" : ""
            }`}
          >
            <div className="font-serif text-[30px] font-semibold text-[#A8201A]">
              {s.value}
            </div>
            <div className="text-[13.5px] text-[#6b5f58] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <section id="how" className="px-6 md:px-[6vw] py-20">
        <div className="max-w-[52ch] mb-12">
          <h2 className="font-serif font-semibold text-[26px] md:text-[34px] tracking-tight mb-3">
            Three steps from request to donation
          </h2>
          <p className="text-[#6b5f58] text-[16px] leading-relaxed">
            No waiting rooms, no cold calls — just the shortest path between
            someone who needs blood and someone who can give it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="pt-4 border-t-2 border-[#211A17]">
              <div className="font-serif text-[15px] text-[#A8201A] mb-3.5">
                {s.n}
              </div>
              <h4 className="text-[17.5px] font-bold mb-2">{s.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-[#5c5049]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="requests" className="bg-[#F3E7D8] px-6 md:px-[6vw] py-20">
        <div className="max-w-[52ch] mb-12">
          <h2 className="font-serif font-semibold text-[26px] md:text-[34px] tracking-tight mb-3">
            Urgent requests near you
          </h2>
          <p className="text-[#6b5f58] text-[16px] leading-relaxed">
            These patients need a match right now. A single donation can cover
            more than one request.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {REQUESTS.map((r, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-4 bg-white rounded-lg px-5 py-4 border-l-4 border-[#A8201A]"
            >
              <div className="font-serif text-[22px] font-semibold w-14 shrink-0">
                {r.type}
              </div>
              <div className="flex-1 min-w-[180px]">
                <div className="text-[15px] font-bold">{r.hospital}</div>
                <div className="text-[13.5px] text-[#6b5f58] flex items-center gap-1 mt-1">
                  <MapPin size={13} />
                  {r.city}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full text-white inline-block ${badgeStyles[r.urgency]}`}
                >
                  {r.urgency}
                </span>
                <span className="block text-xs text-[#8a7d75] mt-1.5">
                  <Clock size={11} className="inline -mt-0.5 mr-1" />
                  {r.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="trust" className="px-6 md:px-[6vw] py-20">
        <div className="max-w-[52ch] mb-12">
          <h2 className="font-serif font-semibold text-[26px] md:text-[34px] tracking-tight mb-3">
            Every donor is verified before they're matched
          </h2>
          <p className="text-[#6b5f58] text-[16px] leading-relaxed">
            Safety for both sides of the connection is the whole product, not an
            afterthought.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-9">
          {TRUST.map((t) => (
            <div key={t.title}>
              <t.icon
                size={24}
                strokeWidth={1.8}
                className="text-teal-700 mb-3.5"
              />
              <h4 className="text-[16.5px] font-bold mb-2">{t.title}</h4>
              <p className="text-[14.5px] leading-relaxed text-[#5c5049]">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#211A17] text-[#FFF9F4] text-center px-6 md:px-[6vw] py-20">
  <h2 className="font-serif font-semibold text-[28px] md:text-[40px] tracking-tight mb-3.5">
    Be the reason someone gets a second chance
  </h2>
  <p className="text-[#C9BEB5] text-[16px] mb-7">
    Registration takes two minutes. Your next donation could be someone's only option.
  </p>

  {/* 🔁 YO <button> LAI <Link> BANAUNUS */}
  <Link
    href="/register"
    className="bg-[#A8201A] hover:bg-[#7A1712] text-white font-semibold text-base px-8 py-3.5 rounded-lg inline-block"
  >
    Join BloodConnect
  </Link>
</section>

      <footer className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 md:px-[6vw] py-7 text-[13px] text-[#8a7d75] border-t border-[#E5D3BC]">
        <span>
          © 2026 BloodConnect. Built for Nepal's hospitals and donors.
        </span>
        <div className="flex gap-5">
          <a href="#" className="flex items-center gap-1">
            <Phone size={12} /> Helpline
          </a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
