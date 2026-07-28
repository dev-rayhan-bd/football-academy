"use client";
import React, { useState } from "react";
import { 
  IconFileText, 
  IconHeart, 
  IconShare, 
  IconChevronDown
} from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { 
  DashboardPageHeader, 
  DashboardStatCard, 
  DashboardSection 
} from "@/components/dashboard/dashboard-elements";

const stats = [
  { label: "All CVS", value: "4", icon: IconFileText },
  { label: "Liked CVs", value: "42", icon: IconHeart },
  { label: "Profiles Shared", value: "18", icon: IconShare },
];

const cvData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, club: "Manchester Academy", country: "Brazil", age: 19, status: "Silver", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, club: "Chelsea Youth", country: "England", age: 18, status: "Gold", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, club: "Barcelona B", country: "Spain", age: 20, status: "Silver", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "James Brown", position: "Goalkeeper", rating: 7.9, club: "Liverpool Academy", country: "Argentina", age: 17, status: "Bronze", avatar: "https://i.pravatar.cc/150?u=4" },
];

export const CVsLibrary = () => {
  const [activeTab, setActiveTab] = useState("All CVS");

  const columns: Column<typeof cvData[0]>[] = [
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
    { header: "Club", key: "club", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Country", key: "country", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Age", key: "age", align: "center", cellClassName: "text-sm text-gray-400" },
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
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onHeart={() => {}} onShare={() => {}} />
    },
  ];

  const filterAction = (
    <div className="flex gap-3">
      <FilterButton label="All Positions" />
      <FilterButton label="Country" />
      <FilterButton label="Age Range" />
      <FilterButton label="All Status" />
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <DashboardPageHeader title="CVs Library" subtitle="View and manage athlete CVs" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <DashboardStatCard key={idx} {...stat} icon={<stat.icon size={20} />} />
        ))}
      </div>

      <div className="flex items-center gap-8 border-b border-white/10 pb-4">
        {stats.map((tab) => (
          <button 
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 text-sm font-bold transition-all ${activeTab === tab.label ? 'text-[#E31B23]' : 'text-gray-500 hover:text-white'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <DashboardSection action={filterAction}>
        <DashboardTable columns={columns} data={cvData} className="border-white/10" />
      </DashboardSection>
    </div>
  );
};

const FilterButton = ({ label }: { label: string }) => (
  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all">
    {label}
    <IconChevronDown size={14} className="text-gray-500" />
  </button>
);
