"use client";

import React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { Button } from "@/components/ui/button";

type SharedPlayer = {
  avatar: string;
  name: string;
  position: string;
  rating: number;
  club: string;
  country: string;
  age: number;
  sharedWith: string;
  status: "Viewed" | "Not Viewed";
};

const getStatusBadge = (status: "Viewed" | "Not Viewed") => {
  if (status === "Viewed") {
    return "border-green-500/50 bg-green-500/10 text-green-500";
  }
  return "border-white/20 bg-white/5 text-gray-300";
};

const columns: Column<SharedPlayer>[] = [
  {
    header: "Name",
    key: "name",
    align: "left",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.avatar} alt={row.name} className="w-10 h-10 rounded-full border border-white/10" />
        <div>
          <p className="text-white font-semibold">{row.name}</p>
          <p className="text-[#E31B23] text-xs">{row.position}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Rating",
    key: "rating",
    align: "center",
    render: (row) => <span className="text-[#E31B23] font-bold">{row.rating.toFixed(1)}</span>,
  },
  {
    header: "Club",
    key: "club",
    align: "center",
    cellClassName: "text-white font-medium",
  },
  {
    header: "Country",
    key: "country",
    align: "center",
    cellClassName: "text-gray-400",
  },
  {
    header: "Age",
    key: "age",
    align: "center",
    cellClassName: "text-gray-400",
  },
  {
    header: "Shared With",
    key: "sharedWith",
    align: "center",
    cellClassName: "text-gray-400",
  },
  {
    header: "Status",
    key: "status",
    align: "center",
    render: (row) => (
      <span className={`px-4 py-1 rounded-full border text-xs font-bold ${getStatusBadge(row.status)}`}>
        {row.status}
      </span>
    ),
  },
  {
    header: "Actions",
    key: "actions",
    align: "center",
    render: () => (
      <TableActionButtons 
        onView={() => {}}
        onHeart={() => {}}
        onShare={() => {}}
        shareColor="text-[#E31B23] border-[#E31B23]/30 bg-[#E31B23]/10 hover:bg-[#E31B23]/20"
      />
    ),
  },
];

const mockPlayers: SharedPlayer[] = [
  { avatar: "https://i.pravatar.cc/150?u=10", name: "Marcus Silva", position: "Forward", rating: 9.2, club: "Manchester Academy", country: "Brazil", age: 19, sharedWith: "Elite Agents Ltd", status: "Viewed" },
  { avatar: "https://i.pravatar.cc/150?u=11", name: "David Chen", position: "Midfielder", rating: 8.8, club: "Chelsea Youth", country: "England", age: 18, sharedWith: "Scout Network Pro", status: "Not Viewed" },
  { avatar: "https://i.pravatar.cc/150?u=12", name: "Alex Jonson", position: "Defender", rating: 8.5, club: "Barcelona B", country: "Spain", age: 20, sharedWith: "Global Sports Agency", status: "Viewed" },
  { avatar: "https://i.pravatar.cc/150?u=13", name: "James Brown", position: "Goalkeeper", rating: 7.9, club: "Liverpool Academy", country: "Argentina", age: 17, sharedWith: "European Scouts", status: "Not Viewed" },
];

export const SharedProfiles = () => {
  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-orbitron tracking-wide mb-1">Shared Profiles</h1>
        <p className="text-gray-400 text-sm font-medium">Players you've shared with other members</p>
      </div>

      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap gap-4 justify-end mb-2">
          <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
            All Positions <IconChevronDown className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
            Country <IconChevronDown className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
            Age Range <IconChevronDown className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
            All Status <IconChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <DashboardTable columns={columns} data={mockPlayers} />
      </div>
    </div>
  );
};
