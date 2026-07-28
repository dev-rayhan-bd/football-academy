"use client";

import React from "react";
import { IconPlus, IconCloudUpload } from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Story = {
  avatar: string;
  title: string;
  category: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};

const getStatusBadge = (status: "Approved" | "Pending" | "Rejected") => {
  switch (status) {
    case "Approved": return "border-green-500/50 bg-green-500/10 text-green-500";
    case "Pending": return "border-orange-500/50 bg-orange-500/10 text-orange-500";
    case "Rejected": return "border-red-500/50 bg-red-500/10 text-red-500";
    default: return "border-gray-500/50 bg-gray-500/10 text-gray-500";
  }
};

const columns: Column<Story>[] = [
  {
    header: "Story Title",
    key: "title",
    align: "left",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-white/10 shrink-0" />
        <p className="text-white font-medium text-sm w-48 truncate sm:w-auto sm:whitespace-normal">{row.title}</p>
      </div>
    ),
  },
  {
    header: "Category",
    key: "category",
    align: "center",
    cellClassName: "text-gray-300 font-medium text-sm",
  },
  {
    header: "Date",
    key: "date",
    align: "center",
    cellClassName: "text-gray-400 text-sm",
  },
  {
    header: "Status",
    key: "status",
    align: "center",
    render: (row) => (
      <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(row.status)}`}>
        {row.status}
      </span>
    ),
  },
  {
    header: "Action",
    key: "actions",
    align: "center",
    render: () => (
      <TableActionButtons 
        onView={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    ),
  },
];

const mockStories: Story[] = [
  { avatar: "https://i.pravatar.cc/150?u=20", title: "Agent Luis Secures Trial for Midfielder at Benfica Academy", category: "Transfer Achievement", date: "2024-01-15", status: "Approved" },
  { avatar: "https://i.pravatar.cc/150?u=21", title: "Agent Luis Secures Trial for Midfielder at Benfica Academy", category: "Signing Achievement", date: "2024-02-01", status: "Pending" },
  { avatar: "https://i.pravatar.cc/150?u=22", title: "Agent Luis Secures Trial for Midfielder at Benfica Academy", category: "Agent Milestone", date: "2023-12-01", status: "Rejected" },
];

export const SuccessStory = () => {
  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-orbitron tracking-wide mb-1">Success Story</h1>
          <p className="text-gray-400 text-sm font-medium">Share your academy's latest achievement or success Story</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl px-4 py-2 shrink-0 h-11 w-full sm:w-auto">
              <IconPlus className="w-5 h-5 mr-2 text-gray-400" />
              Add Success Story
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0a0a] border border-white/15 text-white sm:max-w-[850px] w-[95vw] rounded-3xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
            <DialogHeader className="p-6 md:p-8 border-b border-white/5 shrink-0">
              <DialogTitle className="text-2xl font-orbitron tracking-wide font-normal">Add Success Story</DialogTitle>
              <p className="text-gray-400 text-sm font-medium mt-1">Share your academy's latest achievement or success Story</p>
            </DialogHeader>

            <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs ml-1 font-medium">Story Title</Label>
                <Input placeholder="e.g., U14 Winger Signed by National Talent Centre" className="bg-[#111111] border-white/15 text-white h-11 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/40" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-xs ml-1 font-medium">Player Name</Label>
                  <Input defaultValue="Marcus Silva" className="bg-[#111111] border-white/15 text-white h-11 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/40" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-xs ml-1 font-medium">Position</Label>
                  <Input defaultValue="Forward" className="bg-[#111111] border-white/15 text-white h-11 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/40" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-xs ml-1 font-medium">Previous Academy</Label>
                  <Input defaultValue="Local Youth Academy" className="bg-[#111111] border-white/15 text-white h-11 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/40" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-xs ml-1 font-medium">Date</Label>
                  <Input type="date" defaultValue="2025-11-22" className="bg-[#111111] border-white/15 text-white h-11 rounded-xl [color-scheme:dark] focus:border-white/40 focus:ring-1 focus:ring-white/40" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs ml-1 font-medium">Signed Club / Achievement</Label>
                <Select defaultValue="benfica">
                  <SelectTrigger className="bg-[#111111] border-white/15 text-white h-11 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/40">
                    <SelectValue placeholder="Select Achievement" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/15 text-white">
                    <SelectItem value="benfica">Benfica Academy - Trial Secured</SelectItem>
                    <SelectItem value="chelsea">Chelsea Youth - Contract Signed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs ml-1 font-medium">Category</Label>
                <Select defaultValue="select">
                  <SelectTrigger className="bg-[#111111] border-white/15 text-white h-11 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/40">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/15 text-white">
                    <SelectItem value="select">Select Category</SelectItem>
                    <SelectItem value="transfer">Transfer Achievement</SelectItem>
                    <SelectItem value="signing">Signing Achievement</SelectItem>
                    <SelectItem value="milestone">Agent Milestone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs ml-1 font-medium">Upload Photo</Label>
                <div className="min-h-[200px] border border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-white/30 hover:text-white transition-colors cursor-pointer bg-white/[0.01]">
                  <IconCloudUpload className="w-8 h-8 mb-2 opacity-50" stroke={1.5} />
                  <p className="text-xs font-medium opacity-50">Upload Image</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-xs ml-1 font-medium">Story Content</Label>
                <Textarea 
                  className="min-h-[120px] bg-[#111111] border-white/15 text-white rounded-xl resize-none p-4 text-sm focus:border-white/40 focus:ring-1 focus:ring-white/40" 
                  placeholder="tell the full story of this achievement..."
                />
              </div>
            </div>

            <div className="p-6 md:p-8 border-t border-white/5 flex gap-4 bg-[#0a0a0a] shrink-0 items-center justify-center">
              <Button className="flex-1 bg-transparent border border-white/15 text-white hover:bg-white/5 h-12 rounded-xl font-medium">
                Cancel
              </Button>
              <Button className="flex-1 bg-white/10 border border-white/5 text-white hover:bg-white/20 h-12 rounded-xl font-medium">
                Submit for Approval
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <DashboardTable columns={columns} data={mockStories} />
      </div>
    </div>
  );
};
