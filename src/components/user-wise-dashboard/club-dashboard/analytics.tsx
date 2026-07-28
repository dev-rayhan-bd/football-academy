"use client";
import React from "react";
import { 
  IconUsers, 
  IconHeart, 
  IconShare, 
  IconEye,
  IconChevronDown
} from "@tabler/icons-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const stats = [
  { label: "Players Profile Viewed", value: "24", icon: IconUsers },
  { label: "Liked CVs", value: "8", icon: IconHeart },
  { label: "Shared Profiles", value: "5", icon: IconShare },
  { label: "Profile Views", value: "156", icon: IconEye },
];

const timelineData = [
  { name: 'Jan-Feb', players: 45, coaches: 12 },
  { name: 'Mar-Apr', players: 62, coaches: 15 },
  { name: 'May-Jun', players: 75, coaches: 18 },
  { name: 'Jul-Aug', players: 70, coaches: 16 },
  { name: 'Sept-Oct', players: 85, coaches: 22 },
  { name: 'Nov-Dec', players: 98, coaches: 25 },
];

const distributionData = [
  { name: 'Midfielder', value: 80 },
  { name: 'Striker', value: 65 },
  { name: 'Defender', value: 92, highlight: true },
  { name: 'Goalkeeper', value: 75 },
  { name: 'Winger', value: 58 },
];

const playerEngagementData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, age: 19, country: "Brazil", club: "Manchester Academy", status: "Silver", views: 45, likes: 12, shares: 8, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, age: 18, country: "England", club: "Chelsea Youth", status: "Gold", views: 38, likes: 15, shares: 6, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, age: 20, country: "Spain", club: "Barcelona B", status: "Silver", views: 32, likes: 8, shares: 5, avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "James Brown", position: "Goalkeeper", rating: 7.9, age: 17, country: "Argentina", club: "Liverpool Academy", status: "Bronze", views: 28, likes: 9, shares: 4, avatar: "https://i.pravatar.cc/150?u=4" },
];

export const Analytics = () => {
  const columns: Column<typeof playerEngagementData[0]>[] = [
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
    { header: "Rating", key: "rating", align: "center", render: (p) => <span className="text-sm font-black text-red-600 italic">{p.rating}</span> },
    { header: "Age", key: "age", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Country", key: "country", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Club", key: "club", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (p) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          p.status === 'Gold' ? 'bg-yellow-500/10 text-yellow-500' : 
          p.status === 'Silver' ? 'bg-gray-400/10 text-gray-400' : 'bg-orange-500/10 text-orange-500'
        }`}>
          {p.status}
        </span>
      ),
    },
    { header: "Views", key: "views", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Likes", key: "likes", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Shares", key: "shares", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} />
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Analytics</h1>
        <p className="text-gray-500 text-sm mt-2">Track engagement and performance metrics</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
          <h3 className="text-sm font-bold text-white mb-8 uppercase tracking-widest italic">Players & Coaches Monitored</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" name="Players Monitored" dataKey="players" stroke="#E31B23" strokeWidth={3} dot={{ r: 4, fill: '#E31B23', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Coaches Monitored" dataKey="coaches" stroke="#444" strokeWidth={2} dot={{ r: 3, fill: '#444', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
          <h3 className="text-sm font-bold text-white mb-8 uppercase tracking-widest italic">Position Interest Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Bar dataKey="value" barSize={35} radius={[10, 10, 0, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.highlight ? "#fff" : "#333"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">Top Players Engaged</h3>
          <div className="flex gap-3">
             <FilterButton label="All Positions" />
             <FilterButton label="Country" />
             <FilterButton label="Age Range" />
             <FilterButton label="All Status" />
          </div>
        </div>
        <DashboardTable columns={columns} data={playerEngagementData} className="border-white/10" />
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
