"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconSearch, 
  IconPlus, 
  IconFilter, 
  IconChevronDown,
  IconEye,
  IconEdit,
  IconTrash,
  IconLock,
  IconFileText,
  IconWorld,
  IconPencil,
  IconRecycle,
  IconCalendar,
  IconUser,
  IconUpload,
  IconArrowLeft,
  IconTag,
  IconBell
} from "@tabler/icons-react";

const newsArticles = [
  {
    id: 1,
    title: "Santos FC Academy Wins Regional Championship",
    excerpt: "Our U-17 team dominated the regional finals with a stunning 4-1 victory...",
    author: "Admin",
    date: "Jan 22, 2026",
    views: 25,
    status: "Published",
    visibility: "Public"
  },
  {
    id: 2,
    title: "New Training Facility Opening Next Month",
    excerpt: "We are excited to announce the opening of our state-of-the-art training facility...",
    author: "Admin",
    date: "Jan 22, 2026",
    views: 25,
    status: "Published",
    visibility: "Public"
  },
  {
    id: 3,
    title: "Summer Camp Registration Now Open",
    excerpt: "Early bird registration for our summer training camp is now available...",
    author: "Admin",
    date: "Jan 22, 2026",
    views: 25,
    status: "Draft",
    visibility: "Private"
  }
];

export const AcademyNewsManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All News");

  const tabs = [
    { name: "All News", icon: IconFileText },
    { name: "Published", icon: IconWorld },
    { name: "Private", icon: IconLock },
    { name: "Draft", icon: IconPencil },
    { name: "BIN", icon: IconTrash }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Academy News</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Create and manage news articles</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Create News</span>
        </button>
      </div>

      {/* Tabs / Filters Bar */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-4 flex gap-8 shadow-xl">
        {tabs.map((tab) => (
          <button 
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all px-4 py-2 rounded-xl ${
              activeTab === tab.name 
              ? "bg-white/5 text-white border border-white/15" 
              : "text-white/40 hover:text-white/60"
            }`}
          >
            <tab.icon size={18} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* News Cards Grid */}
      <div className="flex flex-col gap-6">
        {newsArticles.map((article) => (
          <div key={article.id} className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 hover:border-white/25 transition-all shadow-2xl relative group">
            {/* Action Buttons (Top Right) */}
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <IconEye size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <IconEdit size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <IconLock size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#E31B23]/10 border border-[#E31B23]/20 text-[#E31B23] hover:bg-[#E31B23] hover:text-white transition-all shadow-lg shadow-[#E31B23]/5 hover:shadow-[#E31B23]/20">
                <IconTrash size={18} />
              </button>
            </div>

            <div className="flex gap-3">
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                article.status === 'Published' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'
              }`}>
                {article.status}
              </span>
              <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl text-[10px] font-black text-white/60 uppercase tracking-widest">
                {article.visibility}
              </span>
            </div>

            <div className="space-y-3 pr-40">
              <h3 className="text-2xl font-black uppercase text-white font-orbitron leading-tight tracking-tight">
                {article.title}
              </h3>
              <p className="text-sm font-medium text-white/60 leading-relaxed max-w-3xl">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-6 text-[10px] font-black text-white/40 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                Published By: <span className="text-white/80">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                • Publishing Date: <span className="text-white/80">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                • Views: <span className="text-white/80">{article.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create News Modal */}
      <DashboardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create News Article"
        subtitle="Publish news and updates for your academy community"
        showBackButton
        footer={
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="px-8 py-3.5 rounded-xl border border-white/30 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/15 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
              Save Draft
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
              Publish Now
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Article Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Article Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Article Title <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter a compelling headline" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Category <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Author <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Author name</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Publish Date <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <input type="date" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Article Content</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                Full Article <span className="text-[#E31B23]">*</span>
              </label>
              <textarea 
                placeholder="Write the full article content here..." 
                className="w-full h-80 bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Featured Image</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Upload Image</label>
              <div className="w-full border-2 border-dashed border-white/15 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-white/25 transition-all cursor-pointer bg-white/[0.01]">
                <IconUpload size={32} className="text-white/20" />
                <p className="text-sm font-bold text-white/60">Click to upload or drag and drop image/*</p>
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Recommended: 1200x675 pixels (16:9 ratio)</p>
              </div>
            </div>
          </div>

          {/* Tags & Priority */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Tags & Priority</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Tags</label>
                <input type="text" placeholder="e.g., U-17, Championship, Training" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">Separate tags with commas</p>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Priority <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Notification Settings</h3>
            <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Send push notification to all users</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Users will receive a notification about this news article</p>
              </div>
              <div className="w-12 h-6 bg-[#E31B23] rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default AcademyNewsManagement;
