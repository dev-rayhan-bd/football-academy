"use client";

import React, { useState } from "react";
import { 
  IconUser, 
  IconCalendar, 
  IconCheck, 
  IconTrash, 
  IconAward, 
  IconSchool, 
  IconBuildingCommunity,
  IconUserCheck,
  IconClock,
  IconShieldCheck,
  IconBriefcase
} from "@tabler/icons-react";
import { toast } from "sonner";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";

// Mock lists of registered users of each role who don't have premium or are options
const MOCK_USERS_BY_ROLE = {
  player: [
    { id: "p1", name: "Marcus Silva", currentPlan: "Standard", email: "m.silva@gmail.com" },
    { id: "p2", name: "Alex Jonson", currentPlan: "Standard", email: "alex.j@yahoo.com" },
    { id: "p3", name: "James Brown", currentPlan: "Bronze", email: "j.brown@gmail.com" },
    { id: "p4", name: "Leo Messi Jr", currentPlan: "Standard", email: "leo.jr@gmail.com" },
  ],
  coach: [
    { id: "co1", name: "Carlos Alberto", currentPlan: "Standard", email: "carlos.coaching@outlook.com" },
    { id: "co2", name: "John Doe", currentPlan: "Standard", email: "j.doe@example.com" },
    { id: "co3", name: "Mikel Arteta Jr", currentPlan: "Standard", email: "mikel.arteta@gmail.com" },
  ],
  academy: [
    { id: "ac1", name: "Elite FC Academy", currentPlan: "Standard", email: "contact@elitefc.com" },
    { id: "ac2", name: "La Masia Junior", currentPlan: "Standard", email: "lamasia@fcb.cat" },
    { id: "ac3", name: "Champions Academy", currentPlan: "Standard", email: "info@champions.co.uk" },
  ],
  club: [
    { id: "cl1", name: "Manchester United Youth", currentPlan: "Standard", email: "youth@manutd.com" },
    { id: "cl2", name: "Paris Saint-Germain Academy", currentPlan: "Standard", email: "academy@psg.fr" },
    { id: "cl3", name: "Red Bull Salzburg Youth", currentPlan: "Standard", email: "office@rbsalzburg.at" },
  ],
  agent: [
    { id: "ag1", name: "Mino Raiola Jr", currentPlan: "Standard", email: "mino.jr@agents.com" },
    { id: "ag2", name: "Pini Zahavi Academy", currentPlan: "Standard", email: "zahavi.p@pini.com" },
    { id: "ag3", name: "Jorge Mendes Agency", currentPlan: "Standard", email: "mendes@gestifute.com" },
  ],
};

interface MembershipRecord {
  id: string;
  name: string;
  role: string;
  email: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Revoked";
}

const initialMemberships: MembershipRecord[] = [
  {
    id: "m1",
    name: "Marcus Silva",
    role: "Player",
    email: "m.silva@gmail.com",
    duration: "1 Year",
    startDate: "2026-06-15",
    endDate: "2027-06-15",
    status: "Active",
  },
  {
    id: "m2",
    name: "Carlos Alberto",
    role: "Coach",
    email: "carlos.coaching@outlook.com",
    duration: "3 Months",
    startDate: "2026-05-20",
    endDate: "2026-08-20",
    status: "Active",
  },
  {
    id: "m3",
    name: "Mino Raiola Jr",
    role: "Agent",
    email: "mino.jr@agents.com",
    duration: "6 Months",
    startDate: "2026-05-10",
    endDate: "2026-11-10",
    status: "Active",
  },
];

export function SuperAdminGrantMembership() {
  const [selectedRole, setSelectedRole] = useState<keyof typeof MOCK_USERS_BY_ROLE>("player");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [duration, setDuration] = useState<"3" | "6" | "12">("12");
  const [memberships, setMemberships] = useState<MembershipRecord[]>(initialMemberships);

  const activeUsers = MOCK_USERS_BY_ROLE[selectedRole];

  const handleGrantMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      toast.error("Please select a user first.");
      return;
    }

    const user = activeUsers.find((u) => u.id === selectedUserId);
    if (!user) return;

    // Check if user already has an active grant in our table
    const exists = memberships.some((m) => m.name === user.name && m.status === "Active");
    if (exists) {
      toast.error(`${user.name} already has an active premium membership grant.`);
      return;
    }

    const now = new Date();
    const startDateStr = now.toISOString().split("T")[0];
    
    const end = new Date();
    end.setMonth(end.getMonth() + Number(duration));
    const endDateStr = end.toISOString().split("T")[0];

    const durationLabel = duration === "3" ? "3 Months" : duration === "6" ? "6 Months" : "1 Year";

    const newGrant: MembershipRecord = {
      id: `m_${Date.now()}`,
      name: user.name,
      role: selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1),
      email: user.email,
      duration: durationLabel,
      startDate: startDateStr,
      endDate: endDateStr,
      status: "Active",
    };

    setMemberships([newGrant, ...memberships]);
    toast.success(`Premium membership granted to ${user.name} for ${durationLabel}!`);
    setSelectedUserId("");
  };

  const handleRevoke = (id: string) => {
    setMemberships(
      memberships.map((m) => (m.id === id ? { ...m, status: "Revoked" as const } : m))
    );
    toast.success("Membership successfully revoked.");
  };

  const columns: Column<MembershipRecord>[] = [
    {
      header: "User Details",
      key: "name",
      render: (row) => (
        <div>
          <p className="text-white text-sm font-black uppercase">{row.name}</p>
          <p className="text-white/40 text-[10px] font-bold lowercase">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Category",
      key: "role",
      align: "center",
      render: (row) => {
        const icons = {
          Player: <IconUser size={14} className="text-sky-400 shrink-0" />,
          Coach: <IconUserCheck size={14} className="text-purple-400 shrink-0" />,
          Academy: <IconSchool size={14} className="text-yellow-400 shrink-0" />,
          Club: <IconBuildingCommunity size={14} className="text-emerald-400 shrink-0" />,
          Agent: <IconBriefcase size={14} className="text-orange-400 shrink-0" />,
        };
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-white/10 bg-white/5 text-white/80">
            {icons[row.role as keyof typeof icons] || <IconUser size={14} />}
            {row.role}
          </span>
        );
      },
    },
    {
      header: "Duration",
      key: "duration",
      align: "center",
      cellClassName: "text-white/80 text-sm font-bold font-orbitron",
    },
    {
      header: "Validity Period",
      key: "dates",
      align: "center",
      render: (row) => (
        <div className="text-[11px] font-bold text-white/60 tracking-wider">
          <span className="text-emerald-400">{row.startDate}</span>
          <span className="mx-2 text-white/20">to</span>
          <span className="text-red-400">{row.endDate}</span>
        </div>
      ),
    },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
            row.status === "Active"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "center",
      render: (row) => (
        row.status === "Active" ? (
          <button
            onClick={() => handleRevoke(row.id)}
            className="w-9 h-9 inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all hover:scale-105 cursor-pointer"
            title="Revoke Premium"
          >
            <IconTrash size={18} />
          </button>
        ) : (
          <span className="text-[10px] font-black uppercase tracking-wider text-white/20">None</span>
        )
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron tracking-tight leading-none uppercase">Grant Membership</h1>
        <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Bestow direct premium memberships to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Grant Membership Form */}
        <div className="bg-[#111111] border border-white/15 rounded-[32px] p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E31B23]/10 border border-[#E31B23]/20 flex items-center justify-center text-[#E31B23]">
              <IconShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase text-white font-orbitron">Grant Premium</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mt-0.5">Activate instant premium access</p>
            </div>
          </div>

          <form onSubmit={handleGrantMembership} className="space-y-5">
            {/* User Type Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">
                User Category
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(Object.keys(MOCK_USERS_BY_ROLE) as Array<keyof typeof MOCK_USERS_BY_ROLE>).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      setSelectedUserId("");
                    }}
                    className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all text-center border cursor-pointer ${
                      selectedRole === role
                        ? "bg-[#E31B23] border-[#E31B23] text-white shadow-lg shadow-[#E31B23]/25"
                        : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Select User */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                Select {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} <span className="text-[#E31B23]">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all cursor-pointer appearance-none"
                >
                  <option value="" disabled className="bg-[#111111] text-white/40">Select registered user</option>
                  {activeUsers.map((u) => (
                    <option key={u.id} value={u.id} className="bg-[#111111] text-white">
                      {u.name} ({u.currentPlan} plan - {u.email})
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                  <IconClock size={16} />
                </div>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">
                Membership Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "3", label: "3 Months" },
                  { value: "6", label: "6 Months" },
                  { value: "12", label: "1 Year" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setDuration(item.value as any)}
                    className={`py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center border cursor-pointer ${
                      duration === item.value
                        ? "bg-white text-black border-white font-black"
                        : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E31B23] hover:bg-[#C2181F] text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-lg shadow-[#E31B23]/10 mt-2 font-orbitron cursor-pointer flex items-center justify-center gap-2"
            >
              <IconAward size={18} />
              Grant Premium Access
            </button>
          </form>
        </div>

        {/* Memberships Granted Table */}
        <div className="bg-[#111111] border border-white/15 rounded-[32px] p-6 lg:p-8 flex flex-col gap-6 lg:col-span-2 shadow-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black uppercase text-white font-orbitron">Active Grants</h2>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white/60 uppercase tracking-widest">
              Total {memberships.filter((m) => m.status === "Active").length} Grants
            </span>
          </div>

          <DashboardTable columns={columns} data={memberships} />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminGrantMembership;
