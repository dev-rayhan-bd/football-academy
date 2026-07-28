"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { events } from "@/components/user-wise-dashboard/academy-management/extraEvents";
import { 
  IconCalendar, 
  IconCurrencyDollar, 
  IconUsers, 
  IconMapPin, 
  IconArrowLeft, 
  IconCopy, 
  IconCheck, 
  IconPhone, 
  IconMail, 
  IconUser,
  IconStar,
  IconUsersGroup
} from "@tabler/icons-react";
import { toast } from "sonner";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = Number(params?.id);

  // Find the event from the exported events array
  const event = events.find((e) => e.id === eventId) || {
    id: eventId,
    title: "Academy Special Event",
    date: "Date to be announced",
    fee: "Free",
    enrolled: "0/50",
    status: "Open",
    group: "Group A",
    ageGroup: "U-14",
    targetGroup: "Academy Players Only"
  };

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Back Navigation */}
      <Link 
        href="/dashboard/academy/management/extra-events" 
        className="flex items-center gap-2 text-white/60 hover:text-white transition-all text-xs font-black uppercase tracking-widest w-fit font-orbitron"
      >
        <IconArrowLeft size={16} />
        Back to Events
      </Link>

      {/* Main Details Card */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 overflow-hidden shadow-2xl">
        {/* Banner area */}
        <div className="h-64 bg-gradient-to-br from-[#1E1B4B] to-[#0A0A0A] relative flex items-center justify-center p-8 border-b border-white/15">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center space-y-4 max-w-2xl">
            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
              event.status === 'Open' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'
            }`}>
              {event.status}
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase text-white font-orbitron tracking-tight leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left / Center: Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-orbitron">
                  <IconCalendar size={14} className="text-[#E31B23]" /> Date
                </span>
                <span className="text-sm font-bold text-white uppercase">{event.date}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-orbitron">
                  <IconCurrencyDollar size={14} className="text-[#E31B23]" /> Entry Fee
                </span>
                <span className="text-sm font-bold text-white uppercase">{event.fee}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-orbitron">
                  <IconUsers size={14} className="text-[#E31B23]" /> Enrolled
                </span>
                <span className="text-sm font-bold text-white uppercase">{event.enrolled}</span>
              </div>
            </div>

            {/* Event Group, Age Group & Target Group Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-orbitron">
                  <IconUsersGroup size={14} className="text-[#E31B23]" /> Group
                </span>
                <span className="text-sm font-bold text-white uppercase">{event.group || "N/A"}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-orbitron">
                  <IconStar size={14} className="text-[#E31B23]" /> Age Group
                </span>
                <span className="text-sm font-bold text-white uppercase">{event.ageGroup || "N/A"}</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-orbitron">
                  <IconUser size={14} className="text-[#E31B23]" /> Target Group
                </span>
                <span className="text-sm font-bold text-white uppercase">{event.targetGroup || "N/A"}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase text-white font-orbitron">Event Description</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Join our {event.title} organized by the Academy Management. This event is designed to bring our players, coaches, and families together for development and engagement. We will have dedicated drills, fun activities, and coaching sessions tailored for the participants.
              </p>
            </div>

            {/* Additional info */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase text-white font-orbitron">Requirements / What to Bring</h3>
              <ul className="text-sm text-white/60 space-y-2 list-disc pl-5">
                <li>Proper training uniform and cleats</li>
                <li>Water bottle and energy snacks</li>
                <li>Shin guards (mandatory for tournaments and matches)</li>
                <li>Signed parental consent form (for youth players)</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Venue, Contact & Share Link */}
          <div className="space-y-8 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
            {/* Share / Copy Link Box */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[24px] p-6 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-white font-orbitron">Share Event</h4>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Copy this link to share the tournament details page with players, parents, or sponsors.
              </p>
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 bg-[#E31B23] hover:bg-[#C2181F] text-white font-black uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-all shadow-lg shadow-[#E31B23]/10 font-orbitron cursor-pointer"
              >
                {copied ? (
                  <>
                    <IconCheck size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <IconCopy size={16} />
                    Copy Share Link
                  </>
                )}
              </button>
            </div>

            {/* Venue Box */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white/40 font-orbitron">Venue / Location</h4>
              <div className="flex items-start gap-2.5">
                <IconMapPin size={18} className="text-white/40 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white">Academy Arena</p>
                  <p className="text-xs text-white/40 mt-0.5">123 Sports Drive, Suite 100, London</p>
                </div>
              </div>
            </div>

            {/* Contact Box */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white/40 font-orbitron">Contact Person</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-xs text-white/60">
                  <IconUser size={16} className="text-white/40" />
                  Mario Lopez (Scout Coordinator)
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/60">
                  <IconPhone size={16} className="text-white/40" />
                  +1 (555) 019-2834
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/60">
                  <IconMail size={16} className="text-white/40" />
                  m.lopez@academy.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
