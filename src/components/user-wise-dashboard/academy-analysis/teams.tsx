"use client";
import React from "react";
import {
  IconUsers,
  IconTrophy,
  IconBallFootball,
  IconEye,
  IconPencil,
  IconTrash,
  IconPlus,
  IconMinus
} from "@tabler/icons-react";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const teamsData = [
  { id: "1", name: "Santos U17", ageGroup: "Under 17", coachCount: 3, playerCount: 22, status: "Active" },
  { id: "2", name: "Santos U19", ageGroup: "Under 19", coachCount: 4, playerCount: 18, status: "Active" },
  { id: "3", name: "Santos U16", ageGroup: "Under 16", coachCount: 2, playerCount: 16, status: "Inactive" },
  { id: "4", name: "Santos U18", ageGroup: "Under 18", coachCount: 4, playerCount: 20, status: "Active" },
];

export const Teams = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Teams</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Manage your Coach and Players</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardStatCard icon={<IconBallFootball size={24} />} label="Teams" value="4" />
        <DashboardStatCard icon={<IconTrophy size={24} />} label="Total Coach" value="16" />
        <DashboardStatCard icon={<IconUsers size={24} />} label="Total Players" value="64" />
      </div>

      {/* Teams Table Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-6 md:p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">My Teams</h2>
            <p className="text-white/60 font-medium text-xs uppercase tracking-widest mt-1">Coaches and Players</p>
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white px-6 py-3 rounded-xl transition-all">
            <IconPlus size={16} />
            Add Teams
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 bg-white/[0.02]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20">Team Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Age Group</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Coach</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Players</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamsData.map((team, index) => (
                <tr key={team.id} className={`group hover:bg-white/[0.02] transition-colors ${index !== teamsData.length - 1 ? 'border-b border-white/20' : ''}`}>
                  <td className="py-6 px-6 border-r border-white/20">
                    <span className="text-sm font-bold text-white group-hover:text-[#00FF85] transition-colors">{team.name}</span>
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-medium text-white/60">
                    {team.ageGroup}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                    {team.coachCount}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                    {team.playerCount}
                  </td>
                  <td className="py-6 px-6 border-r border-white/20 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${team.status === "Active"
                      ? "bg-[#00FF85]/10 text-[#00FF85] border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]"
                      : "bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20"
                      }`}>
                      {team.status}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <TableActionButtons
                      onView={() => console.log("View", team.id)}
                      onEdit={() => console.log("Edit", team.id)}
                      onDelete={() => console.log("Delete", team.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};