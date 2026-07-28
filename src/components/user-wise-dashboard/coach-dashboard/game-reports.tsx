"use client";
import React, { useState } from "react";
import {
  IconFileText,
  IconCircleCheck,
  IconClock,
  IconCalendar,
  IconPlus,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const stats = [
  { label: "Total Reports", value: "6", icon: IconFileText },
  { label: "Completed", value: "5", icon: IconCircleCheck },
  { label: "Pending", value: "1", icon: IconClock },
  { label: "This Month", value: "22", icon: IconCalendar },
];

import { usePlayer } from "@/lib/hooks/usePlayer";
import { MatchStats } from "@/lib/constants/reports";
import { useAppSelector } from "@/lib/hooks/reduxHooks";

export const GameReports = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { players } = usePlayer();

  const reports = useAppSelector(state => state.reports.reports);
  const requests = useAppSelector(state => state.reports.requests);

  const playerId = searchParams.get("playerId");

  // Get all completed reports
  const completedReports = reports.filter(r => r.status === "Paid");

  // Get all pending requests
  const pendingRequests = requests.filter(req => req.status === "Pending");

  // Merge them for display
  const displayRows = [
    ...completedReports.map(r => {
      const player = r.playerId ? players.find(p => p.id === r.playerId) : undefined;
      return {
        ...r,
        playerName: player?.fullName || r.playerName || "Unknown Player",
        playerPosition: player?.position || r.playerPosition || "Unknown",
        isRequest: false,
        requestId: undefined,
      };
    }),
    ...pendingRequests.map(req => {
      const player = req.playerId ? players.find(p => p.id === req.playerId) : undefined;
      return {
        id: req.id + 100000,
        playerId: req.playerId,
        playerName: player?.fullName || req.playerName,
        playerPosition: player?.position || req.playerPosition,
        rating: 0,
        team1: player?.fullName || req.playerName,
        team2: req.opponent || "TBD",
        score: "TBD",
        goals: 0,
        assists: 0,
        date: req.date,
        amount: "$ 6.99",
        status: "Pending" as const,
        isRequest: true,
        requestId: req.id
      };
    })
  ];

  // Filter display rows by playerId if active filter is set
  const filteredRows = playerId
    ? displayRows.filter(row => row.playerId === Number(playerId))
    : displayRows;

  // Calculate stats based on filtered lists
  const filterCompleted = playerId
    ? completedReports.filter(r => r.playerId === Number(playerId))
    : completedReports;
  const filterPending = playerId
    ? pendingRequests.filter(req => req.playerId === Number(playerId))
    : pendingRequests;

  const totalCount = filterCompleted.length + filterPending.length;
  const completedCount = filterCompleted.length;
  const pendingCount = filterPending.length;

  const stats = [
    { label: "Total Reports", value: totalCount.toString(), icon: IconFileText },
    { label: "Completed", value: completedCount.toString(), icon: IconCircleCheck },
    { label: "Pending", value: pendingCount.toString(), icon: IconClock },
    { label: "This Month", value: totalCount.toString(), icon: IconCalendar },
  ];

  const columns: Column<any>[] = [
    {
      header: "Name",
      key: "playerName",
      render: (row) => {
        const player = players.find(p => p.id === row.playerId);
        const avatar = player && typeof player.playerImage === "string" ? player.playerImage : "https://i.pravatar.cc/150?u=" + (row.playerId || 1);
        return (
          <div className="flex items-center gap-3">
            <img src={avatar} className="w-10 h-10 rounded-full object-cover" alt={row.playerName || "Player"} />
            <div>
              <div className="text-sm font-bold text-white">{row.playerName || "Marcus Silva"}</div>
              <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{row.playerPosition}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Rating",
      key: "rating",
      align: "center",
      render: (row) => {
        if (row.status === "Pending") {
          return <span className="text-xs font-bold text-orange-500/80 font-orbitron uppercase tracking-widest">Pending</span>;
        }
        return <span className="text-sm font-black text-red-600 italic">{(row.rating * 10).toFixed(0)}</span>;
      },
    },
    { 
      header: "Matches", 
      key: "team2", 
      align: "center", 
      cellClassName: "text-sm text-gray-400",
      render: (row) => {
        if (row.status === "Pending") {
          return `vs ${row.team2}`;
        }
        return `${row.team1} vs ${row.team2}`;
      }
    },
    { 
      header: "Goals", 
      key: "goals", 
      align: "center", 
      cellClassName: "text-sm text-gray-400",
      render: (row) => {
        if (row.status === "Pending") return <span className="text-gray-600">—</span>;
        return row.goals;
      }
    },
    { 
      header: "Assists", 
      key: "assists", 
      align: "center", 
      cellClassName: "text-sm text-gray-400",
      render: (row) => {
        if (row.status === "Pending") return <span className="text-gray-600">—</span>;
        return row.assists;
      }
    },
    { header: "Date", key: "date", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Amount", key: "amount", align: "center", cellClassName: "text-sm text-gray-300 font-bold" },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          row.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
        }`}>
          {row.status === 'Paid' ? 'Completed' : 'Pending'}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: (row) => (
        <TableActionButtons
          onView={() => {
            if (row.status === "Pending") {
              router.push(`/dashboard/coach/game-reports/create?playerId=${row.playerId}&requestId=${row.requestId}`);
            } else {
              router.push(`/dashboard/coach/game-reports/create?playerId=${row.playerId}&viewOnly=true`);
            }
          }}
          viewColor="text-[#E31B23] hover:text-white border-[#E31B23]/20 hover:border-[#E31B23] bg-[#E31B23]/5 hover:bg-[#E31B23]"
        />
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase font-orbitron">Game Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Professional performance analysis</p>
        </div>
      </div>

      {playerId && (
        <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm flex items-center justify-between shadow-lg">
          <span>Showing reports for player: <strong>{players.find(p => p.id === Number(playerId))?.fullName || "Marcus Silva"}</strong></span>
          <button 
            onClick={() => router.push('/dashboard/coach/game-reports')} 
            className="text-xs uppercase font-black tracking-widest text-white hover:text-gray-200 underline font-orbitron"
          >
            Clear Filter
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-3xl font-black text-white italic mb-1 font-orbitron">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest font-orbitron">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl border border-white/20 bg-[#0D0D0D]">
        <DashboardTable 
          columns={columns} 
          data={filteredRows} 
          className="border-white/10" 
          onRowClick={(row) => {
            if (row.status === "Pending") {
              router.push(`/dashboard/coach/game-reports/create?playerId=${row.playerId}&requestId=${row.requestId}`);
            } else {
              router.push(`/dashboard/coach/game-reports/create?playerId=${row.playerId}&viewOnly=true`);
            }
          }}
        />
      </div>
    </div>
  );
};
