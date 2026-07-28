"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconPlus, 
  IconEye, 
  IconEdit, 
  IconTrash,
  IconChevronDown,
  IconUpload,
  IconChevronLeft
} from "@tabler/icons-react";

const successStories = [
  {
    id: 1,
    title: "1—114 Winger Signed by National Talent Centre",
    category: "Tournament Achievement",
    date: "2024-01-15",
    status: "Approved",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
  {
    id: 2,
    title: "Academy Graduate Makes First Team Debut",
    category: "Seasonal Highlight",
    date: "2024-02-01",
    status: "Pending",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    id: 3,
    title: "1—114 Winger Signed by National Talent Centre",
    category: "Coach Promotion",
    date: "2023-12-01",
    status: "Approved",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: 4,
    title: "Academy Graduate Makes First Team Debut",
    category: "Player Signing",
    date: "2024-03-10",
    status: "Rejected",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
  }
];

export const SuccessStoryManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Success Story</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Share your academy's latest achievement or success Story</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#1A1A1A] hover:bg-[#252525] border border-white/10 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Add Success Story</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#0A0A0A] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.01]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/60 border-r border-white/15">Story Title</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/60 border-r border-white/15 text-center">Category</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/60 border-r border-white/15 text-center">Date</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/60 border-r border-white/15 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/60 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {successStories.map((story, index) => (
                <tr key={story.id} className={`hover:bg-white/[0.02] transition-colors group ${index !== successStories.length - 1 ? 'border-b border-white/15' : ''}`}>
                  <td className="py-6 px-6 border-r border-white/15">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/15 bg-[#1A1A1A] shrink-0">
                        <img src={story.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-black text-white leading-tight max-w-[240px]">{story.title}</p>
                    </div>
                  </td>
                  <td className="py-6 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{story.category}</td>
                  <td className="py-6 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{story.date}</td>
                  <td className="py-6 px-6 border-r border-white/15 text-center">
                    <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      story.status === 'Approved' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 
                      story.status === 'Pending' ? 'bg-[#FBBF24]/10 text-[#FBBF24]' : 
                      'bg-[#EF4444]/10 text-[#EF4444]'
                    }`}>
                      {story.status}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                        <IconEye size={18} />
                      </button>
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                        <IconEdit size={18} />
                      </button>
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#E31B23]/10 border border-[#E31B23]/20 text-[#E31B23] hover:bg-[#E31B23] hover:text-white transition-all shadow-lg shadow-[#E31B23]/5 hover:shadow-[#E31B23]/20">
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Success Story Modal */}
      <DashboardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Success Story"
        subtitle="Share your academy's latest achievement or success Story"
        showBackButton
        footer={
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-4 rounded-xl border border-white/30 text-sm font-bold text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="flex-[2] py-4 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-white/15 text-sm font-bold text-white transition-all shadow-lg">
              Submit for Approval
            </button>
          </div>
        }
      >
        <div className="space-y-8">
          {/* Form Fields */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Story Title</label>
              <input type="text" placeholder="e.g., U14 Winger Signed by National Talent Centre" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Player Name</label>
                <input type="text" placeholder="Marcus Silva" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Position</label>
                <input type="text" placeholder="Forward" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Current Academy</label>
                <input type="text" placeholder="Elite Youth Academy" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Date</label>
                <input type="date" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Category</label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white/40 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select Category</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Upload Photo</p>
            <div className="w-full aspect-video border-2 border-dashed border-white/15 rounded-[32px] flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.02] transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                <IconUpload size={24} />
              </div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Upload Image</p>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Story Content</p>
            <textarea 
              placeholder="Tell the full story of this achievement..." 
              className="w-full h-40 bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
            />
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default SuccessStoryManagement;
