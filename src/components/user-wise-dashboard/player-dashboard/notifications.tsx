"use client";
import React from "react";
import { 
  IconHeart, 
  IconCalendar, 
  IconEye, 
  IconUser,
  IconBuildingCommunity,
  IconSearch,
  IconBriefcase
} from "@tabler/icons-react";

const stats = [
  { label: "Total Interest", value: "4", icon: IconHeart },
  { label: "This Month", value: "4", icon: IconCalendar },
  { label: "Total Profile Views", value: "127", icon: IconEye },
  { label: "Avg Views Per Video", value: "10", icon: IconEye },
];

const notifications = [
  { id: 1, name: "Championship Youth FC", type: "Club", date: "Mar 8, 2024", icon: IconBuildingCommunity },
  { id: 2, name: "International Scouts Network", type: "Scout", date: "Mar 5, 2024", icon: IconSearch },
  { id: 3, name: "Elite Development Centre", type: "Club", date: "Mar 8, 2024", icon: IconBuildingCommunity },
  { id: 4, name: "Professional Pathway Agency", type: "Agent", date: "Feb 28, 2024", icon: IconBriefcase },
];

export const PlayerNotifications = () => {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-normal text-white uppercase tracking-tighter font-heading">
          Notification
        </h1>
        <p className="text-gray-400 text-lg font-light tracking-tight">
          Clubs and Agents Who Have Shown Interest in Your Profile
        </p>
      </div>

      {/* Stats Grid */}
      <div className="p-8 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 group hover:border-white/10 transition-all duration-500"
            >
              <div className="flex flex-col gap-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                  <stat.icon size={20} stroke={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-white tracking-tighter font-orbitron">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl space-y-4">
        {notifications.map((item) => (
          <div 
            key={item.id} 
            className="group flex items-center justify-between p-6 rounded-2xl bg-[#0A0A0A]/60 border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all">
                <IconHeart size={24} stroke={1.5} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-white tracking-tight">{item.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-white/10">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium uppercase tracking-wider">
                    <IconCalendar size={14} />
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
            <button className="px-6 py-2.5 rounded-xl border border-green-500/20 bg-green-500/5 text-[11px] font-black text-green-500 uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all">
              Interested
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
