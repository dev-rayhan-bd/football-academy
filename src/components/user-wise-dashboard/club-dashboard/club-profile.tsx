"use client";
import React from "react";
import { 
  IconCheck, 
  IconTrophy, 
  IconUpload,
  IconCalendar
} from "@tabler/icons-react";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { 
  SettingsSection, 
  SettingsInput 
} from "@/components/dashboard/dashboard-settings-elements";

export const ClubProfile = () => {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Club Profile</h1>
        <p className="text-gray-500 text-sm mt-2">Your professional football Club Profile</p>
      </div>

      {/* Academy Information Section */}
      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D] space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
            <IconCheck size={16} />
          </div>
          <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">Academy Information</h3>
        </div>

        {/* Hero Preview */}
        <div className="rounded-3xl overflow-hidden border border-white/10">
          <DashboardHero 
            backgroundImage="/barcelona-la-liga-champions.avif"
            badgeText="Active Club"
            title="Liverpool FC"
            subtitle="Premium Club"
            details={[
              { text: "Est. 1878" },
              { text: "Brazil" }
            ]}
            contacts={[
              { type: "phone", label: "Contact", value: "+55 11 9999-8888" },
              { type: "email", label: "Email", value: "liverpool.fc@gmail.com" },
            ]}
             logoImage="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_(crest).svg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
          <div className="space-y-6">
            <SettingsInput label="Club Name" placeholder="Liverpool FC" />
            <SettingsInput label="Club Country" placeholder="Brazil" />
            <SettingsInput label="Club League" placeholder="Premier League" />
            <SettingsInput label="Date of Establishment" placeholder="1878" icon={<IconCalendar size={18} />} />
            <SettingsInput label="Contact" placeholder="+55 11 9999-8888" />
            <SettingsInput label="Email" placeholder="liverpool.fc@gmail.com" />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Upload Cover Photo</label>
              <div className="aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-3 group hover:border-[#E31B23]/30 transition-all cursor-pointer">
                <div className="p-3 rounded-xl bg-white/5 text-white/40 group-hover:bg-[#E31B23]/10 group-hover:text-[#E31B23] transition-all">
                  <IconUpload size={24} />
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Upload image</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Upload Logo</label>
              <div className="h-32 rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-3 group hover:border-[#E31B23]/30 transition-all cursor-pointer">
                <div className="p-3 rounded-xl bg-white/5 text-white/40 group-hover:bg-[#E31B23]/10 group-hover:text-[#E31B23] transition-all">
                  <IconUpload size={24} />
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Upload image</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About the Club Section */}
      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D] space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
            <IconCheck size={16} />
          </div>
          <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">About the Club</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
            <textarea 
              className="w-full h-32 px-5 py-4 rounded-xl bg-[#0D0D0D] border-2 border-white/10 text-white text-sm focus:border-[#E31B23]/50 focus:outline-none transition-all resize-none"
              placeholder="Santos FC Academy is committed to developing world-class football talent..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vision & Mission</label>
            <textarea 
              className="w-full h-32 px-5 py-4 rounded-xl bg-[#0D0D0D] border-2 border-white/10 text-white text-sm focus:border-[#E31B23]/50 focus:outline-none transition-all resize-none"
              placeholder="To nurture the next generation of football stars..."
            />
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D] space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1 rounded-full bg-white/10 text-white border border-white/20">
            <IconTrophy size={16} />
          </div>
          <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SettingsInput label="Year" placeholder="Enter Year" />
          <SettingsInput label="Championship" placeholder="Enter Championship" />
          <SettingsInput label="Venue" placeholder="Enter Venue" />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="px-12 py-4 rounded-xl bg-[#E31B23] text-white text-sm font-black uppercase tracking-widest hover:bg-[#C1161D] transition-all shadow-[0_10px_40px_rgba(227,27,35,0.2)]">
          Save Changes
        </button>
      </div>
    </div>
  );
};
