"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconSearch, 
  IconPlus, 
  IconFilter, 
  IconCalendar,
  IconClock,
  IconUser,
  IconMapPin,
  IconCheck,
  IconX,
  IconClockHour4,
  IconChevronRight,
  IconChevronDown,
  IconArrowLeft,
  IconDeviceFloppy,
  IconBallFootball,
  IconAlertCircle
} from "@tabler/icons-react";

const sessions = [
  {
    id: 1,
    team: "U-15",
    date: "Jan 25, 2026",
    time: "9:00 AM - 11:00 AM",
    title: "Set Pieces & Dead Balls",
    coach: "John Smith",
    attendance: 0,
    stats: { present: 0, late: 0, absent: 0, total: 20 },
    color: "#E31B23"
  },
  {
    id: 2,
    team: "U-16",
    date: "Jan 25, 2026",
    time: "9:00 AM - 11:00 AM",
    title: "Goalkeeper Session",
    coach: "Mike Williams",
    attendance: 98,
    stats: { present: 16, late: 4, absent: 2, total: 22 },
    color: "#4ADE80"
  },
  {
    id: 3,
    team: "U-17",
    date: "Jan 25, 2026",
    time: "9:00 AM - 11:00 AM",
    title: "Tactical Play & Formation",
    coach: "Sarah Johnson",
    attendance: 25,
    stats: { present: 5, late: 0, absent: 15, total: 20 },
    color: "#E31B23"
  },
  {
    id: 4,
    team: "U-19",
    date: "Jan 25, 2026",
    time: "9:00 AM - 11:00 AM",
    title: "Ball Control & Dribbling",
    coach: "Mike Williams",
    attendance: 82,
    stats: { present: 18, late: 4, absent: 7, total: 25 },
    color: "#FBBF24"
  }
];

const initialPlayers = [
  { id: 1, name: "Marcus Silva", number: 7, position: "Forward", status: "present", avatar: "https://i.pravatar.cc/100?u=marcus" },
  { id: 2, name: "Alex Jordan", number: 5, position: "Midfielder", status: "unmarked", avatar: "https://i.pravatar.cc/100?u=alex" },
  { id: 3, name: "Tyler Brooks", number: 3, position: "Defender", status: "present", avatar: "https://i.pravatar.cc/100?u=tyler" },
  { id: 4, name: "Noah Carter", number: 9, position: "Forward", status: "unmarked", avatar: "https://i.pravatar.cc/100?u=noah" },
  { id: 5, name: "Ethan Rivera", number: 11, position: "Winger", status: "absent", avatar: "https://i.pravatar.cc/100?u=ethan" },
  { id: 6, name: "Liam Foster", number: 2, position: "Right Back", status: "unmarked", avatar: "https://i.pravatar.cc/100?u=liam" },
  { id: 7, name: "Mason Hayes", number: 6, position: "Central Mid", status: "late", avatar: "https://i.pravatar.cc/100?u=mason" },
  { id: 8, name: "Oliver Kim", number: 4, position: "Centre Back", status: "unmarked", avatar: "https://i.pravatar.cc/100?u=oliver" },
  { id: 9, name: "Lucas Grant", number: 8, position: "Midfielder", status: "unmarked", avatar: "https://i.pravatar.cc/100?u=lucas" },
];

export const TrainingSessions = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [players, setPlayers] = useState(initialPlayers);

  const handleStatusChange = (playerId: number, status: string) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, status } : p));
  };

  const markAll = (status: string) => {
    setPlayers(prev => prev.map(p => ({ ...p, status })));
  };

  const unmarkedCount = players.filter(p => p.status === "unmarked").length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Training Sessions</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Schedule and manage training sessions</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Create Session</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111111] rounded-3xl border border-white/15 p-4 flex gap-4 shadow-xl">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search sessions by team, coach, or title..."
            className="w-full bg-white/[0.02] border border-white/15 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
          />
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all">
          <IconFilter size={20} />
          <span className="text-sm font-bold">Filters</span>
        </button>
      </div>

      {/* Session Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            onClick={() => setSelectedSession(session)}
            className="bg-[#111111] rounded-[32px] border border-white/15 p-6 flex flex-col gap-6 hover:border-white/30 transition-all cursor-pointer group shadow-xl"
          >
            <div className="flex justify-between items-start">
              <span className="bg-white/5 border border-white/15 px-4 py-2 rounded-xl text-[10px] font-black text-white/80 uppercase tracking-widest">
                {session.team}
              </span>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                session.attendance > 50 
                ? "bg-[#4ADE80]/10 border-[#4ADE80]/20 text-[#4ADE80] group-hover:bg-[#4ADE80] group-hover:text-black" 
                : "bg-[#E31B23]/10 border-[#E31B23]/20 text-[#E31B23] group-hover:bg-[#E31B23] group-hover:text-white"
              }`}>
                {session.attendance > 50 ? <IconCheck size={14} /> : <IconAlertCircle size={14} />}
                Attendance
                <IconChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-white/40 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <IconCalendar size={14} />
                  {session.date}
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <IconClock size={14} />
                  {session.time}
                </div>
              </div>
              <h3 className="text-lg font-black uppercase text-white font-orbitron leading-tight min-h-[3rem] line-clamp-2">
                {session.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                <IconUser size={14} />
                Coach: <span className="text-white/80">{session.coach}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Attendance:</span>
                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-none">({session.attendance}%)</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000" 
                  style={{ 
                    width: `${session.attendance}%`,
                    backgroundColor: session.color
                  }} 
                />
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-1.5 text-[#4ADE80]">
                  <IconCheck size={12} strokeWidth={4} />
                  {session.stats.present}
                </div>
                <div className="flex items-center gap-1.5 text-[#FBBF24]">
                  <IconClockHour4 size={12} strokeWidth={4} />
                  {session.stats.late}
                </div>
                <div className="flex items-center gap-1.5 text-[#E31B23]">
                  <IconX size={12} strokeWidth={4} />
                  {session.stats.absent}
                </div>
                <div className="ml-auto text-white/20">
                  Total: {session.stats.total}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Modal */}
      <DashboardModal
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        title={selectedSession?.title || "Attendance"}
        maxWidth="max-w-4xl"
        footer={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#FBBF24]">
              <IconAlertCircle size={18} />
              <span className="text-[11px] font-bold uppercase tracking-widest">{unmarkedCount} players still unmarked</span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedSession(null)}
                className="px-8 py-3.5 rounded-xl border border-white/30 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button className="px-8 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
                <IconDeviceFloppy size={18} />
                Save Attendance
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-8">
          {/* Session Info Bar */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="bg-white/5 border border-white/15 px-3 py-1 rounded-full text-[10px] font-black text-white/80 uppercase tracking-widest">
              {selectedSession?.team}
            </span>
            <div className="flex items-center gap-2 text-white/40 text-[11px] font-bold uppercase tracking-widest">
              <IconCalendar size={14} />
              {selectedSession?.date} • {selectedSession?.time}
            </div>
            <div className="flex items-center gap-2 text-white/40 text-[11px] font-bold uppercase tracking-widest">
              <IconUser size={14} />
              {selectedSession?.coach}
            </div>
            <div className="flex items-center gap-2 text-white/40 text-[11px] font-bold uppercase tracking-widest">
              <IconMapPin size={14} />
              Main Field A
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            <div className="bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-xl px-4 py-2.5 flex items-center gap-2 shrink-0">
              <IconCheck size={16} className="text-[#4ADE80]" />
              <span className="text-[11px] font-black text-[#4ADE80] uppercase tracking-widest">{players.filter(p => p.status === 'present').length} Present</span>
            </div>
            <div className="bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-xl px-4 py-2.5 flex items-center gap-2 shrink-0">
              <IconClockHour4 size={16} className="text-[#FBBF24]" />
              <span className="text-[11px] font-black text-[#FBBF24] uppercase tracking-widest">{players.filter(p => p.status === 'late').length} Late</span>
            </div>
            <div className="bg-[#E31B23]/10 border border-[#E31B23]/20 rounded-xl px-4 py-2.5 flex items-center gap-2 shrink-0">
              <IconX size={16} className="text-[#E31B23]" />
              <span className="text-[11px] font-black text-[#E31B23] uppercase tracking-widest">{players.filter(p => p.status === 'absent').length} Absent</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 shrink-0">
              <IconClock size={16} className="text-white/40" />
              <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">{unmarkedCount} Unmarked</span>
            </div>
            <div className="ml-auto flex items-center text-white/20 text-[11px] font-bold uppercase tracking-widest shrink-0">
              {players.length} total players
            </div>
          </div>

          {/* Player Grid Header & Quick Actions */}
          <div className="flex justify-between items-center bg-white/[0.02] border-y border-white/10 -mx-10 px-10 py-4">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Quick actions:</span>
              <button 
                onClick={() => markAll('present')}
                className="bg-[#4ADE80]/10 hover:bg-[#4ADE80]/20 border border-[#4ADE80]/20 rounded-xl px-4 py-2 flex items-center gap-2 text-[10px] font-black text-[#4ADE80] uppercase tracking-widest transition-all"
              >
                <IconCheck size={14} />
                Mark All Present
              </button>
              <button 
                onClick={() => markAll('absent')}
                className="bg-[#E31B23]/10 hover:bg-[#E31B23]/20 border border-[#E31B23]/20 rounded-xl px-4 py-2 flex items-center gap-2 text-[10px] font-black text-[#E31B23] uppercase tracking-widest transition-all"
              >
                <IconX size={14} />
                Mark All Absent
              </button>
              <button 
                onClick={() => markAll('unmarked')}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-white/40 uppercase tracking-widest transition-all"
              >
                Clear All
              </button>
            </div>
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input type="text" placeholder="Search" className="bg-white/5 border border-white/15 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-white/25 w-48" />
            </div>
          </div>

          {/* Players List */}
          <div className="space-y-2">
            {players.map((p, index) => (
              <div 
                key={p.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  p.status === 'present' ? 'bg-[#4ADE80]/5 border-[#4ADE80]/20' :
                  p.status === 'late' ? 'bg-[#FBBF24]/5 border-[#FBBF24]/20' :
                  p.status === 'absent' ? 'bg-[#E31B23]/5 border-[#E31B23]/20' :
                  'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className="w-6 text-[11px] font-black text-white/20">{index + 1}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0">
                      <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white leading-none mb-1">{p.name}</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">#{p.number} • {p.position}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStatusChange(p.id, 'present')}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                      p.status === 'present' ? 'bg-[#4ADE80] text-black border-[#4ADE80]' : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <IconCheck size={14} />
                    Present
                  </button>
                  <button 
                    onClick={() => handleStatusChange(p.id, 'late')}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                      p.status === 'late' ? 'bg-[#FBBF24] text-black border-[#FBBF24]' : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <IconClock size={14} />
                    Late
                  </button>
                  <button 
                    onClick={() => handleStatusChange(p.id, 'absent')}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                      p.status === 'absent' ? 'bg-[#E31B23] text-white border-[#E31B23]' : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <IconX size={14} />
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardModal>

      {/* Create Session Modal */}
      <DashboardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Training Session"
        subtitle="Schedule a new training session for your team"
        showBackButton
        footer={
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="px-8 py-3.5 rounded-xl border border-white/30 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
              <IconPlus size={18} />
              Create Session
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Session Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="e.g., Technical Drills Practice" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Team <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Head Coach <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Schedule Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Date <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <input type="date" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Start Time <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <input type="time" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  End Time <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <input type="time" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Venue */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Location & Venue</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                Training Location <span className="text-[#E31B23]">*</span>
              </label>
              <div className="relative">
                <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                  <option>Select an option</option>
                </select>
                <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              </div>
            </div>
          </div>

          {/* Session Type & Focus */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Session Type & Focus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Session Type <span className="text-[#E31B23]">*</span>
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
                  Focus Area <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select an option</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Max Participants</label>
                <input type="text" placeholder="e.g., 25" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Leave blank for unlimited participants</p>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Session Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Session Description <span className="text-[#E31B23]">*</span>
                </label>
                <textarea 
                  placeholder="Describe the training session objectives, drills, and activities..." 
                  className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Required Equipment</label>
                <textarea 
                  placeholder="List all equipment needed: cones, balls, bibs, etc." 
                  className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Additional Notes</label>
                <textarea 
                  placeholder="Any additional information for coaches or players..." 
                  className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default TrainingSessions;