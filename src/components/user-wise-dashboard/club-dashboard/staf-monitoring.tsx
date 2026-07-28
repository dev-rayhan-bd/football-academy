"use client";
import React from "react";
import { 
  IconShieldCheck, 
  IconUsers, 
  IconUserCheck, 
  IconAlertCircle,
  IconPlus,
  IconDots
} from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { 
  DashboardPageHeader, 
  DashboardStatCard, 
  DashboardSection 
} from "@/components/dashboard/dashboard-elements";

const stats = [
  { label: "Active Coach", value: "16", icon: IconUserCheck },
  { label: "Vacation Coach", value: "2", icon: IconAlertCircle },
  { label: "Active Players", value: "64", icon: IconUsers },
  { label: "Injured Players", value: "5", icon: IconShieldCheck },
];

const managerData = [
  { id: 1, name: "Carlos Silva", handle: "@carlos_silva", ageGroup: "Santos U17", teams: 4, coaches: 8, players: 64, status: "Active", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Maria Santos", handle: "@maria_antos", ageGroup: "Santos U19", teams: 6, coaches: 12, players: 84, status: "Active", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "João Pedro", handle: "@pedro_110", ageGroup: "Santos U12", teams: 4, coaches: 8, players: 64, status: "Vacation", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Roberto Lima", handle: "@roberto_lima", ageGroup: "Santos U18", teams: 5, coaches: 10, players: 68, status: "Active", avatar: "https://i.pravatar.cc/150?u=4" },
];

const coachData = [
  { id: 1, name: "Carlos Silva", role: "Assistant Coach", teamName: "Santos U17", players: 12, status: "Active", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Maria Santos", role: "Head Coach", teamName: "Santos U17", players: 16, status: "Active", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "João Pedro", role: "Assistant Coach", teamName: "Santos U17", players: 14, status: "Vacation", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Roberto Lima", role: "Head Coach", teamName: "Santos U17", players: 15, status: "Active", avatar: "https://i.pravatar.cc/150?u=4" },
];

const playerData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, matches: 28, goals: 15, assists: 8, status: "Active", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, matches: 30, goals: 5, assists: 12, status: "Active", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, matches: 29, goals: 2, assists: 3, status: "Injured", avatar: "https://i.pravatar.cc/150?u=7" },
  { id: 4, name: "James Brown", position: "Goalkeeper", rating: 7.9, matches: 30, goals: 0, assists: 0, status: "Active", avatar: "https://i.pravatar.cc/150?u=8" },
];

export const StaffMonitoring = () => {
  const managerColumns: Column<typeof managerData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (m) => (
        <div className="flex items-center gap-3">
          <img src={m.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
          <div>
            <div className="text-sm font-bold text-white">{m.name}</div>
            <div className="text-[10px] text-red-500 font-bold">{m.handle}</div>
          </div>
        </div>
      ),
    },
    { header: "Age Group", key: "ageGroup", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Teams", key: "teams", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Coaches", key: "coaches", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Players", key: "players", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (m) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          m.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {m.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onDots={() => {}} />
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
            <div className="text-[10px] text-red-500 font-bold">{c.role}</div>
          </div>
        </div>
      ),
    },
    { header: "Team Name", key: "teamName", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Player", key: "players", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (c) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          c.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {c.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onDots={() => {}} />
    },
  ];

  const playerColumns: Column<typeof playerData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (p) => (
        <div className="flex items-center gap-3">
          <img src={p.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
          <div>
            <div className="text-sm font-bold text-white">{p.name}</div>
            <div className="text-[10px] text-red-500 font-bold">{p.position}</div>
          </div>
        </div>
      ),
    },
    { header: "Rating", key: "rating", align: "center", render: (p) => <span className="text-sm font-black text-red-600 italic">{p.rating}</span> },
    { header: "Matches", key: "matches", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Goals", key: "goals", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Assists", key: "assists", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (p) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          p.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {p.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onDots={() => {}} />
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <DashboardPageHeader title="Staff Monitoring" subtitle="Manage your Coach and Players" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <DashboardStatCard key={idx} {...stat} icon={<stat.icon size={20} />} />
        ))}
      </div>

      <DashboardSection 
        title="Academy Manager" 
        action={<AddButton label="Add Manager" />}
      >
        <DashboardTable columns={managerColumns} data={managerData} className="border-white/10" />
      </DashboardSection>

      <DashboardSection 
        title="Professional Coach" 
        action={<AddButton label="Add Coach" />}
      >
        <DashboardTable columns={coachColumns} data={coachData} className="border-white/10" />
      </DashboardSection>

      <DashboardSection 
        title="Professional Player" 
        action={<AddButton label="Add Player" />}
      >
        <DashboardTable columns={playerColumns} data={playerData} className="border-white/10" />
      </DashboardSection>
    </div>
  );
};

const AddButton = ({ label }: { label: string }) => (
  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all">
    <IconPlus size={16} />
    {label}
  </button>
);
