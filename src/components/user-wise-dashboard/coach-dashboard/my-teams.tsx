"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  IconUsers,
  IconChartBar,
  IconUserCheck,
  IconUserExclamation,
  IconPlus,
  IconEye,
  IconDotsVertical
} from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const stats = [
  { label: "Total Players", value: "24", icon: IconUsers },
  { label: "Avg Rating", value: "8.5", icon: IconChartBar },
  { label: "Active", value: "22", icon: IconUserCheck },
  { label: "Injured", value: "2", icon: IconUserExclamation },
];

const teamData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, matches: 28, goals: 15, assists: 8, status: "Active", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, matches: 30, goals: 5, assists: 12, status: "Active", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, matches: 29, goals: 2, assists: 3, status: "Injured", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "James Brown", position: "Goalkeeper", rating: 9.0, matches: 30, goals: 0, assists: 0, status: "Active", avatar: "https://i.pravatar.cc/150?u=4" },
];

export const MyTeams = () => {
  const router = useRouter();
  const columns: Column<typeof teamData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (player) => (
        <div className="flex items-center gap-3">
          <img src={player.avatar} className="w-10 h-10 rounded-full object-cover" alt={player.name} />
          <div>
            <div className="text-sm font-bold text-white">{player.name}</div>
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{player.position}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Rating",
      key: "rating",
      align: "center",
      render: (player) => <span className="text-sm font-black text-red-600 italic">{player.rating}</span>,
    },
    { header: "Matches", key: "matches", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Goals", key: "goals", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Assists", key: "assists", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      render: (player) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${player.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {player.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: (player) => (
        <TableActionButtons
          onView={() => router.push(`/dashboard/coach/game-reports?playerId=${player.id}`)}
          viewColor="text-[#E31B23] hover:text-white border-[#E31B23]/20 hover:border-[#E31B23] bg-[#E31B23]/5 hover:bg-[#E31B23]"
        />
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">My Teams</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your squad, track performance, and optimize your lineup</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-3xl font-black text-white italic mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl border border-white/20 bg-[#0D0D0D]">
        <h2 className="text-xl font-bold text-white mb-8 italic uppercase tracking-tight">Players</h2>
        <DashboardTable
          columns={columns}
          data={teamData}
          className="border-white/10"
          onRowClick={(player) => router.push(`/dashboard/coach/game-reports?playerId=${player.id}`)}
        />
      </div>
    </div>
  );
};
