"use client";
import React from "react";
import { 
  IconAffiliate, 
  IconTrophy, 
  IconUsers,
  IconPlus
} from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { 
  DashboardPageHeader, 
  DashboardStatCard, 
  DashboardSection 
} from "@/components/dashboard/dashboard-elements";

const stats = [
  { label: "Teams", value: "4", icon: IconAffiliate },
  { label: "Total Coaches", value: "16", icon: IconTrophy },
  { label: "Total Players", value: "64", icon: IconUsers },
];

const academyData = [
  { id: 1, name: "Santos U17", ageGroup: "Under 17", manager: "Carlos Silva", teams: 4, coaches: 8, players: 64, status: "Active" },
  { id: 2, name: "Santos U19", ageGroup: "Under 19", manager: "Roberto Lima", teams: 6, coaches: 12, players: 84, status: "Active" },
  { id: 3, name: "Santos U16", ageGroup: "Under 16", manager: "Alex Jonson", teams: 4, coaches: 8, players: 64, status: "Inactive" },
  { id: 4, name: "Santos U18", ageGroup: "Under 18", manager: "James Brown", teams: 5, coaches: 10, players: 68, status: "Active" },
];

export const MyAcademies = () => {
  const columns: Column<typeof academyData[0]>[] = [
    { header: "Academy Name", key: "name", cellClassName: "text-sm font-bold text-white" },
    { header: "Age Group", key: "ageGroup", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Manager Name", key: "manager", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Teams", key: "teams", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Coaches", key: "coaches", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Players", key: "players", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (item) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          item.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-400/10 text-gray-400'
        }`}>
          {item.status}
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
      <DashboardPageHeader title="My Academies" subtitle="View you all academies" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <DashboardStatCard key={idx} {...stat} icon={<stat.icon size={20} />} />
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-all">
          <IconPlus size={18} /> Add Academy
        </button>
      </div>

      <DashboardSection>
        <DashboardTable columns={columns} data={academyData} className="border-white/10" />
      </DashboardSection>
    </div>
  );
};
