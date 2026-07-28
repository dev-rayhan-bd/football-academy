"use client";
import React from "react";
import { IconPlus, IconStar } from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { 
  DashboardPageHeader, 
  DashboardSection 
} from "@/components/dashboard/dashboard-elements";

const successData = [
  { id: 1, title: "New Striker Joins IJ17 Squad from Local Rivals", category: "Player Promotion", date: "2024-01-15", status: "Approved", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, title: "Regional Championship Win Caps Historic Season", category: "Tournament Achievement", date: "2024-02-01", status: "Pending", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, title: "New Striker Joins IJ17 Squad from Local Rivals", category: "Seasonal Highlight", date: "2023-12-01", status: "Rejected", avatar: "https://i.pravatar.cc/150?u=3" },
];

export const SuccessStory = () => {
  const columns: Column<typeof successData[0]>[] = [
    {
      header: "Story Title",
      key: "title",
      render: (item) => (
        <div className="flex items-center gap-3 py-2">
          <img src={item.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
          <span className="text-sm font-bold text-white max-w-xs leading-snug">{item.title}</span>
        </div>
      ),
    },
    { header: "Category", key: "category", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Date", key: "date", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (item) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          item.status === 'Approved' ? 'bg-green-500/10 text-green-500' : 
          item.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onEdit={() => {}} onDelete={() => {}} />,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <DashboardPageHeader 
        title="Success Story" 
        subtitle="Share your academy's latest achievement or success Story" 
        action={{
          label: "Add Success Story",
          icon: <IconPlus size={18} />,
          onClick: () => console.log("Add Success Story")
        }}
      />

      <DashboardSection>
        <DashboardTable columns={columns} data={successData} className="border-white/10" />
      </DashboardSection>
    </div>
  );
};
