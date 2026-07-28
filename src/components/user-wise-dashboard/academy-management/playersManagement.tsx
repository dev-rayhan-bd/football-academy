"use client";

import React from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconSearch, 
  IconPlus, 
  IconFilter, 
  IconEye, 
  IconEdit, 
  IconTrash,
  IconChevronDown,
  IconChevronLeft,
  IconUpload
} from "@tabler/icons-react";

const players = [
  { id: "1", name: "Marcus Silva", age: 15, team: "U-15", position: "Forward", attendance: "95%", feeStatus: "Paid", lastActive: "2 hours ago", avatar: "https://i.pravatar.cc/100?u=marcus" },
  { id: "2", name: "David Chen", age: 16, team: "U-17", position: "Midfielder", attendance: "88%", feeStatus: "Paid", lastActive: "5 hours ago", avatar: "https://i.pravatar.cc/100?u=david" },
  { id: "3", name: "Alex Jordan", age: 14, team: "U-15", position: "Defender", attendance: "92%", feeStatus: "Unpaid", lastActive: "1 day ago", avatar: "https://i.pravatar.cc/100?u=alex" },
  { id: "4", name: "James Brown", age: 17, team: "U-17", position: "Goalkeeper", attendance: "98%", feeStatus: "Paid", lastActive: "3 hours ago", avatar: "https://i.pravatar.cc/100?u=james" },
  { id: "5", name: "Sarah Williams", age: 15, team: "U-15", position: "Midfielder", attendance: "85%", feeStatus: "Paid", lastActive: "6 hours ago", avatar: "https://i.pravatar.cc/100?u=sarah" },
];

const PlayersManagement = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 pb-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight">Players</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-1">Manage your academy players and their information</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={18} />
          Add New Player
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111111] rounded-3xl border border-white/15 p-4 flex gap-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search players by name, team, or position..."
            className="w-full bg-white/[0.02] border border-white/15 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-all"
          />
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all">
          <IconFilter size={20} />
          <span className="text-sm font-bold">Filters</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#111111] rounded-3xl border border-white/15 p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">All Players (5)</h2>
          <div className="flex gap-3">
            {["All Teams", "Positions", "Status"].map((filter) => (
              <button key={filter} className="bg-white/5 border border-white/15 px-4 py-2 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all">
                {filter}
                <IconChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Players Table */}
        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/15">Player Name</th>
                <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/15 text-center">Age</th>
                <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/15 text-center">Team</th>
                <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/15 text-center">Position</th>
                <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/15 text-center">Attendance</th>
                <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/15 text-center">Fee Status</th>
                <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/15 text-center">Last Active</th>
                <th className="py-5 px-6 text-sm font-bold text-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, index) => (
                <tr key={p.id} className={`hover:bg-white/[0.02] transition-colors group ${index !== players.length - 1 ? 'border-b border-white/15' : ''}`}>
                  <td className="py-5 px-6 border-r border-white/15">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0">
                        <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-bold text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/80 text-center">{p.age}</td>
                  <td className="py-5 px-6 border-r border-white/15 text-center">
                    <span className="bg-white/5 border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold text-white/60">
                      {p.team}
                    </span>
                  </td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/80 text-center">{p.position}</td>
                  <td className="py-5 px-6 border-r border-white/15 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      parseInt(p.attendance) >= 90 ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "bg-[#FBBF24]/10 text-[#FBBF24]"
                    }`}>
                      {p.attendance}
                    </span>
                  </td>
                  <td className="py-5 px-6 border-r border-white/15 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      p.feeStatus === "Paid" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "bg-[#EF4444]/10 text-[#EF4444]"
                    }`}>
                      {p.feeStatus}
                    </span>
                  </td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.lastActive}</td>
                  <td className="py-5 px-6 text-center">
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] rounded-3xl border border-white/15 p-8 flex flex-col items-center justify-center gap-2">
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Total Players</p>
          <p className="text-5xl font-black text-white font-orbitron">64</p>
        </div>
        <div className="bg-[#111111] rounded-3xl border border-white/15 p-8 flex flex-col items-center justify-center gap-2">
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Average Attendance</p>
          <p className="text-5xl font-black text-white font-orbitron">91.6%</p>
        </div>
        <div className="bg-[#111111] rounded-3xl border border-white/15 p-8 flex flex-col items-center justify-center gap-2">
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Outstanding Fees</p>
          <p className="text-5xl font-black text-[#E31B23] font-orbitron">3</p>
        </div>
      </div>

      {/* Add New Player Modal */}
      <DashboardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Player"
        subtitle="Enter player information to register a new academy member"
        showBackButton
        footer={
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-8 py-3.5 rounded-xl border border-white/30 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
              <IconPlus size={18} />
              Add Player
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  First Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter first name" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Last Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter last name" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Date of Birth <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/15 transition-all">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Gender <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/15 transition-all">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Team & Position Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Team & Position Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Team <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/15 transition-all">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Position <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/15 transition-all">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Jersey Number <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="e.g., 10" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Email <span className="text-[#E31B23]">*</span>
                </label>
                <input type="email" placeholder="player@example.com" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Phone Number <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Address</label>
                <input type="text" placeholder="Street address" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">City</label>
                <input type="text" placeholder="City" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">ZIP Code</label>
                <input type="text" placeholder="ZIP Code" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Assign Parents <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/15 transition-all">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Emergency Contact Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Full name" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Emergency Contact Phone <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all" />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Medical Information</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Medical Conditions / Allergies</label>
              <textarea 
                placeholder="List any medical conditions, allergies, or special requirements..." 
                className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/15 transition-all resize-none"
              />
              <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">This information will be kept confidential and used only in emergencies</p>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Profile Photo</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Upload Photo</label>
              <div className="w-full border-2 border-dashed border-white/15 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-white/15 transition-all cursor-pointer bg-white/[0.01]">
                <IconUpload size={32} className="text-white/20" />
                <p className="text-sm font-bold text-white/60">Click to upload or drag and drop image/*</p>
              </div>
              <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Recommended: Square image, at least 400x400 pixels</p>
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default PlayersManagement;