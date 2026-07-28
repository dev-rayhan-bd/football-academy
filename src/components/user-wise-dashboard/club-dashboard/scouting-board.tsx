"use client";
import React from "react";
import {
  IconChevronDown
} from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const playerData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, club: "Manchester Academy", country: "Brazil", age: 19, status: "Silver", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, club: "Chelsea Youth", country: "England", age: 18, status: "Gold", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, club: "Barcelona B", country: "Spain", age: 20, status: "Silver", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "James Brown", position: "Goalkeeper", rating: 7.9, club: "Liverpool Academy", country: "Argentina", age: 17, status: "Bronze", avatar: "https://i.pravatar.cc/150?u=4" },
];

const coachData = [
  { id: 1, name: "Eduardo Ricci", role: "Head Coach", speciality: "Attacking", experience: "12 yrs", club: "Santos FC", country: "Brazil", status: "Available", avatar: "https://i.pravatar.cc/150?u=10" },
  { id: 2, name: "Marco Fernandez", role: "Assistant Coach", speciality: "Defending", experience: "8 yrs", club: "Real Madrid B", country: "Spain", status: "Contracted", avatar: "https://i.pravatar.cc/150?u=11" },
  { id: 3, name: "Lucas Oliveira", role: "Fitness Coach", speciality: "Physical", experience: "5 yrs", club: "PSG Academy", country: "France", status: "Available", avatar: "https://i.pravatar.cc/150?u=12" },
  { id: 4, name: "Rafael Costa", role: "Goalkeeping Coach", speciality: "GK Training", experience: "10 yrs", club: "Ajax Youth", country: "Netherlands", status: "Contracted", avatar: "https://i.pravatar.cc/150?u=13" },
];

export const ScoutingBoard = () => {
  const playerColumns: Column<typeof playerData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (p) => (
        <div className="flex items-center gap-3">
          <img src={p.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
          <div>
            <div className="text-sm font-bold text-white">{p.name}</div>
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{p.position}</div>
          </div>
        </div>
      ),
    },
    { header: "Rating", key: "rating", align: "center", render: (p) => <span className="text-sm font-black text-red-600 italic">{p.rating}</span> },
    { header: "Club", key: "club", align: "center", cellClassName: "text-sm text-gray-400 text-center" },
    { header: "Country", key: "country", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Age", key: "age", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (p) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          p.status === "Gold" ? "bg-yellow-500/10 text-yellow-500" :
          p.status === "Silver" ? "bg-gray-400/10 text-gray-400" : "bg-orange-500/10 text-orange-500"
        }`}>
          {p.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onHeart={() => {}} onShare={() => {}} />,
    },
  ];

  const coachColumns: Column<typeof coachData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (c) => (
        <div className="flex items-center gap-3">
          <img src={c.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
          <div>
            <div className="text-sm font-bold text-white">{c.name}</div>
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{c.role}</div>
          </div>
        </div>
      ),
    },
    { header: "Speciality", key: "speciality", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Club", key: "club", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Country", key: "country", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Experience", key: "experience", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (c) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          c.status === "Available" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
        }`}>
          {c.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onHeart={() => {}} onShare={() => {}} />,
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Scouting Board</h1>
        <p className="text-gray-500 text-sm mt-2">Discover and track potential signings</p>
      </div>

      {/* Players Table */}
      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Players</p>
          <div className="flex items-center gap-3">
            <FilterButton label="All Positions" />
            <FilterButton label="Country" />
            <FilterButton label="Age Range" />
            <FilterButton label="All Status" />
          </div>
        </div>
        <DashboardTable columns={playerColumns} data={playerData} className="border-white/10" />
      </div>

      {/* Coaches Table */}
      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Coaches</p>
          <div className="flex items-center gap-3">
            <FilterButton label="All Roles" />
            <FilterButton label="Country" />
            <FilterButton label="Speciality" />
            <FilterButton label="All Status" />
          </div>
        </div>
        <DashboardTable columns={coachColumns} data={coachData} className="border-white/10" />
      </div>
    </div>
  );
};

const FilterButton = ({ label }: { label: string }) => (
  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all">
    {label}
    <IconChevronDown size={14} className="text-gray-500" />
  </button>
);
