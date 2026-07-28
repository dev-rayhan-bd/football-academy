"use client";
import React from "react";
import { 
  IconChevronDown, 
  IconEye,
  IconLock,
  IconTrash
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";

const StatusBadge = ({ active }: { active: boolean }) => (
  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${active ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-white/40 border-white/10"}`}>
    {active ? "Active" : "Inactive"}
  </span>
);

interface ClubRow {
  name: string;
  category: string;
  country: string;
  likedPlayers: number;
  active: boolean;
}

export const SuperAdminClubs = () => {
  const columns: Column<ClubRow>[] = [
    {
      header: "Club",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
             <img src={`https://i.pravatar.cc/150?u=${row.name}`} alt={row.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white text-sm font-black uppercase">{row.name}</p>
            <p className="text-red-500 text-[10px] font-bold uppercase">{row.category}</p>
          </div>
        </div>
      )
    },
    { header: "Country", key: "country", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { header: "Liked Players", key: "likedPlayers", align: "center", cellClassName: "text-white text-sm font-black font-orbitron" },
    { 
      header: "Status", 
      key: "status", 
      align: "center", 
      render: (row) => <StatusBadge active={row.active} /> 
    },
    {
      header: "Actions",
      key: "actions",
      align: "center",
      render: () => (
        <div className="flex items-center justify-center gap-2">
           <button className="w-9 h-9 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all hover:scale-105">
              <IconEye size={18} stroke={2} />
           </button>
           <button className="w-9 h-9 inline-flex items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-yellow-500 hover:text-yellow-400 hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all hover:scale-105">
              <IconLock size={18} stroke={2} />
           </button>
           <button className="w-9 h-9 inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all hover:scale-105">
              <IconTrash size={18} stroke={2} />
           </button>
        </div>
      )
    }
  ];

  const data: ClubRow[] = [
    { name: "Manchester United", category: "Premium Club", country: "Brazil", likedPlayers: 28, active: true },
    { name: "Real Madrid", category: "Premium Club", country: "England", likedPlayers: 30, active: true },
    { name: "Bayern Munich", category: "Premium Club", country: "Spain", likedPlayers: 29, active: false },
    { name: "Paris Saint- Germain", category: "Premium Club", country: "Argentina", likedPlayers: 30, active: true },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron tracking-tight">Clubs</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">View all platform clubs</p>
      </div>

      {/* Main Container */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
        {/* Table Filters */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="bg-black/40 border-white/20 h-10 rounded-xl text-white/60 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 px-4">
            All Status <IconChevronDown size={14} />
          </Button>
        </div>

        {/* Professional Table */}
        <DashboardTable columns={columns} data={data} />
      </div>
    </div>
  );
};
