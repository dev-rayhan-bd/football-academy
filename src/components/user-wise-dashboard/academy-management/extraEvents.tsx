"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconSearch, 
  IconPlus, 
  IconFilter, 
  IconChevronDown,
  IconCalendar,
  IconClock,
  IconUsers,
  IconCurrencyDollar,
  IconMapPin,
  IconUpload,
  IconArrowLeft,
  IconInfoCircle,
  IconCopy
} from "@tabler/icons-react";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/hooks/reduxHooks";

export const events = [
  {
    id: 1,
    title: "Summer Training Camp",
    date: "Feb 15-20, 2026",
    fee: "$250",
    enrolled: "32/40",
    status: "Open",
    group: "Group A",
    ageGroup: "U-14",
    targetGroup: "Academy Players Only"
  },
  {
    id: 2,
    title: "Tournament Registration",
    date: "Mar 5, 2026",
    fee: "$180",
    enrolled: "24/30",
    status: "Open",
    group: "Group B",
    ageGroup: "U-16",
    targetGroup: "All Members & Families"
  },
  {
    id: 3,
    title: "Skills Workshop",
    date: "Jan 30, 2026",
    fee: "$75",
    enrolled: "18/20",
    status: "Closing Soon",
    group: "Group C",
    ageGroup: "U-12",
    targetGroup: "Academy Players Only"
  },
  {
    id: 4,
    title: "Skills Workshop",
    date: "Jan 30, 2026",
    fee: "$75",
    enrolled: "18/20",
    status: "Closing Soon",
    group: "Group D",
    ageGroup: "U-10",
    targetGroup: "Academy Players Only"
  }
];

export const ExtraEventsManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const players = useAppSelector((state) => state.player.players);
  const [eventType, setEventType] = useState("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [opponent1, setOpponent1] = useState("Santos FC Academy");
  const [opponent2, setOpponent2] = useState("");
  const [assignedPlayers, setAssignedPlayers] = useState<number[]>([]);
  const [sendOpponentNotification, setSendOpponentNotification] = useState(true);
  const [matchFormation, setMatchFormation] = useState("11v11");
  const [tournamentFormat, setTournamentFormat] = useState("knockout");

  const handleCopyEventLink = (eventId: number) => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const path = `/dashboard/academy/management/extra-events/${eventId}`;
      const url = origin + path;
      navigator.clipboard.writeText(url);
      toast.success("Event link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Extra Events</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Manage special events and activities</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Create Event</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-end gap-3">
        <button className="bg-[#111111] border border-white/15 px-5 py-2.5 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all">
          All Events
          <IconChevronDown size={14} />
        </button>
        <button className="bg-[#111111] border border-white/15 px-5 py-2.5 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all">
          Date
          <IconChevronDown size={14} />
        </button>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-[#111111] rounded-[32px] border border-white/15 p-6 flex flex-col gap-6 hover:border-white/25 transition-all shadow-xl group">
            <div className="flex justify-between items-start">
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                event.status === 'Open' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'
              }`}>
                {event.status}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-black uppercase text-white font-orbitron leading-tight min-h-[3rem] line-clamp-2">
                {event.title}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  <IconCalendar size={16} />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  <IconCurrencyDollar size={16} />
                  {event.fee}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  <IconUsers size={16} />
                  {event.enrolled} Enrolled
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-auto w-full">
              <Link 
                href={`/dashboard/academy/management/extra-events/${event.id}`}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all text-center block"
              >
                View Details
              </Link>
              <button 
                type="button"
                onClick={() => handleCopyEventLink(event.id)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-2xl text-white/60 hover:text-white transition-all flex items-center justify-center cursor-pointer shrink-0"
                title="Copy Event Link"
              >
                <IconCopy size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      <DashboardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Extra Event"
        subtitle="Set up a new event for academy members and families"
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
              Create Event
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Event Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Event Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Event Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="e.g., Summer Football Camp" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Event Type <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer"
                  >
                    <option value="">Select event type</option>
                    <option value="tournament">Tournament</option>
                    <option value="training-camp">Training Camp</option>
                    <option value="friendly-match">Friendly Match</option>
                    <option value="workshop">Workshop / Clinic</option>
                    <option value="trial">Club Trial / Tryout</option>
                    <option value="social">Social Event</option>
                    <option value="other">Other Event</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Group <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option value="">Select group</option>
                    {Array.from({ length: 26 }, (_, i) => {
                      const letter = String.fromCharCode(65 + i);
                      return (
                        <option key={letter} value={letter}>
                          Group {letter}
                        </option>
                      );
                    })}
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              {eventType !== "tournament" && (
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                    Age Group <span className="text-[#E31B23]">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                      <option value="">Select age group</option>
                      {Array.from({ length: 51 }, (_, i) => {
                        const age = 10 + i;
                        return (
                          <option key={age} value={age}>
                            U-{age}
                          </option>
                        );
                      })}
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                </div>
              )}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Target Attendees <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option value="">Select an option</option>
                    <option value="all">All Members & Families</option>
                    <option value="players">Academy Players Only</option>
                    <option value="coaches">Coaches & Staff Only</option>
                    <option value="parents">Parents & Guardians Only</option>
                    <option value="public">Public Event (Open to all)</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Match Setup (Conditional) */}
          {eventType === "tournament" && (
            <div className="bg-[#1C1C1C]/40 border border-[#E31B23]/35 rounded-[32px] p-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E31B23] animate-pulse" />
                <h3 className="text-xl font-black uppercase text-white font-orbitron tracking-tight">Tournament Match Setup</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age Groups Multi-Select */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">
                    Target Age Groups <span className="text-[#E31B23]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["U-8", "U-9", "U-10", "U-11", "U-12", "U-13", "U-14", "U-15", "U-16", "U-17", "U-18", "U-19", "U-21"].map((group) => {
                      const isSelected = selectedAgeGroups.includes(group);
                      return (
                        <button
                          key={group}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedAgeGroups(selectedAgeGroups.filter(g => g !== group));
                            } else {
                              setSelectedAgeGroups([...selectedAgeGroups, group]);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                            isSelected 
                              ? 'bg-[#E31B23] border-[#E31B23] text-white' 
                              : 'bg-[#111] border-white/10 text-white/40 hover:border-white/20'
                          }`}
                        >
                          {group}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Opponent 1 / Home Academy */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">
                    Host Club / Academy (Opponent 1) <span className="text-[#E31B23]">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={opponent1}
                      onChange={(e) => setOpponent1(e.target.value)}
                      className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer"
                    >
                      <option value="Santos FC Academy">Santos FC Academy (Our Academy)</option>
                      <option value="Flamengo Academy">Flamengo Academy</option>
                      <option value="Palmeiras Youth">Palmeiras Youth</option>
                      <option value="São Paulo Academy">São Paulo Academy</option>
                      <option value="Corinthians Academy">Corinthians Academy</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                </div>

                {/* Opponent 2 / Away Academy */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">
                    Rival Club / Academy (Opponent 2) <span className="text-[#E31B23]">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={opponent2}
                      onChange={(e) => setOpponent2(e.target.value)}
                      className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer"
                    >
                      <option value="">Select Opponent Academy</option>
                      <option value="Santos FC Academy">Santos FC Academy</option>
                      <option value="Flamengo Academy">Flamengo Academy</option>
                      <option value="Palmeiras Youth">Palmeiras Youth</option>
                      <option value="São Paulo Academy">São Paulo Academy</option>
                      <option value="Corinthians Academy">Corinthians Academy</option>
                      <option value="Fluminense FC">Fluminense FC</option>
                      <option value="Gremio Academy">Gremio Academy</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                  {opponent2 && (
                    <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={sendOpponentNotification}
                        onChange={(e) => setSendOpponentNotification(e.target.checked)}
                        className="rounded border-white/20 text-[#E31B23] focus:ring-0 bg-transparent w-4 h-4 cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                        Notify {opponent2} administrator
                      </span>
                    </label>
                  )}
                </div>

                {/* Organize Formation (Match Format) */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">
                    Match Formation / Format <span className="text-[#E31B23]">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={matchFormation}
                      onChange={(e) => setMatchFormation(e.target.value)}
                      className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer"
                    >
                      <option value="11v11">11 v 11 (Standard)</option>
                      <option value="9v9">9 v 9 (Intermediate)</option>
                      <option value="7v7">7 v 7 (Junior)</option>
                      <option value="5v5">5 v 5 (Futsal / Mini)</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                </div>

                {/* Tournament Format */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">
                    Tournament Structure <span className="text-[#E31B23]">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={tournamentFormat}
                      onChange={(e) => setTournamentFormat(e.target.value)}
                      className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer"
                    >
                      <option value="knockout">Single Elimination (Knockout)</option>
                      <option value="double-knockout">Double Elimination</option>
                      <option value="round-robin">Round Robin (League Style)</option>
                      <option value="group-knockout">Group Stage + Knockout</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                </div>

                {/* Assign Players for Own Academy */}
                {opponent1 === "Santos FC Academy" && (
                  <div className="space-y-2 md:col-span-2 bg-[#0A0A0A]/60 border border-white/5 rounded-2xl p-5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex justify-between items-center">
                      <span>Assign Players (Santos FC Academy)</span>
                      <span className="text-[#E31B23] font-orbitron">{assignedPlayers.length} Selected</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 mt-3">
                      {players.map((player) => (
                        <label 
                          key={player.id} 
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:bg-white/[0.02] ${
                            assignedPlayers.includes(Number(player.id)) 
                              ? 'border-[#E31B23]/40 bg-[#E31B23]/5' 
                              : 'border-white/5 bg-transparent'
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={assignedPlayers.includes(Number(player.id))}
                            onChange={(e) => {
                              const pId = Number(player.id);
                              if (e.target.checked) {
                                setAssignedPlayers([...assignedPlayers, pId]);
                              } else {
                                setAssignedPlayers(assignedPlayers.filter(id => id !== pId));
                              }
                            }}
                            className="rounded border-white/20 text-[#E31B23] focus:ring-0 bg-transparent w-4 h-4 cursor-pointer"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate leading-none mb-1">{player.fullName}</p>
                            <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider leading-none">Age: {player.age}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>
          )}

          {/* Date & Time */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Event Date <span className="text-[#E31B23]">*</span>
                </label>
                <input type="date" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Start Time <span className="text-[#E31B23]">*</span>
                </label>
                <input type="time" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  End Time <span className="text-[#E31B23]">*</span>
                </label>
                <input type="time" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2 md:col-span-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Registration Deadline <span className="text-[#E31B23]">*</span>
                </label>
                <input type="date" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Last date to register for this event</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Venue Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="e.g., City Sports Complex" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Full Address <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Street address, City, State, ZIP" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
            </div>
          </div>

          {/* Registration & Fees */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Registration & Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Event Fee</label>
                <input type="text" placeholder="0.00" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Leave blank or enter 0 for free events</p>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Maximum Capacity</label>
                <input type="text" placeholder="e.g., 50" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Leave blank for unlimited capacity</p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Event Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Event Description <span className="text-[#E31B23]">*</span>
                </label>
                <textarea 
                  placeholder="Provide a detailed description of the event, activities planned, and what participants can expect..." 
                  className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Requirements / What to Bring</label>
                <textarea 
                  placeholder="List any requirements, items to bring, dress code, etc." 
                  className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Contact Person <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Full name" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Contact Phone <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Contact Email <span className="text-[#E31B23]">*</span>
                </label>
                <input type="email" placeholder="contact@example.com" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
            </div>
          </div>

          {/* Event Image */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Event Image</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Upload Event Banner</label>
              <div className="w-full border-2 border-dashed border-white/15 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-white/25 transition-all cursor-pointer bg-white/[0.01]">
                <IconUpload size={32} className="text-white/20" />
                <p className="text-sm font-bold text-white/60">Click to upload or drag and drop image/*</p>
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Recommended: 1200x630 pixels for best display</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default ExtraEventsManagement;
