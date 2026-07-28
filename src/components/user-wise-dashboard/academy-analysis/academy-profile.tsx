import React from "react";
import { 
  IconCircleCheck, 
  IconPencil, 
  IconUpload, 
  IconCalendar, 
  IconX, 
  IconMapPin,
  IconCalendarEvent
} from "@tabler/icons-react";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const AcademyProfile = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Academy Profile</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Your professional football Academy profile</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Academy Information Section */}
        <section className="bg-[#111111] rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <IconCircleCheck size={24} className="text-[#4ADE80]" />
              <h2 className="text-xl font-black text-white font-orbitron uppercase">Academy Information</h2>
            </div>
            <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-all">
              <IconPencil size={18} />
            </button>
          </div>

          {/* Profile Hero Card */}
          <DashboardHero 
            backgroundImage="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2058"
            logoImage="/image 47.png"
            badgeText="Active Academy"
            title="Santos FC Academy"
            subtitle="Premier League Academy"
            details={[
              { icon: <IconCalendarEvent size={16} />, text: "Founded 2018" },
              { icon: <IconMapPin size={16} className="text-green-500" />, text: "São Paulo, Brazil" },
            ]}
            contacts={[
              { type: "phone", label: "Contact", value: "+55 11 9999-8888" },
              { type: "email", label: "Email", value: "contact@santosfc.academy" },
            ]}
          />

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 mt-4">
            {/* Left Column - Inputs */}
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Academy Name</Label>
                <Input 
                  defaultValue="Santos FC Academy" 
                  className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 transition-all px-4"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Nationality</Label>
                <Input 
                  defaultValue="São Paulo, Brazil" 
                  className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 transition-all px-4"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Academy Category</Label>
                <Input 
                  defaultValue="Premier League Academy" 
                  className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 transition-all px-4"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Date of Establishment</Label>
                <div className="relative">
                  <Input 
                    defaultValue="01/01/2018" 
                    className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 transition-all px-4 pr-12"
                  />
                  <IconCalendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Contact</Label>
                <Input 
                  defaultValue="+55 11 9999-8888" 
                  className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 transition-all px-4"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Email</Label>
                <Input 
                  defaultValue="john.doe@k10football.com" 
                  className="bg-black/40 border-white/10 h-12 rounded-xl text-white font-medium focus:border-white/20 transition-all px-4"
                />
              </div>
            </div>

            {/* Right Column - Uploads */}
            <div className="flex flex-col gap-8 h-full">
              <div className="flex flex-col gap-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Upload Cover Photo</Label>
                <div className="h-[380px] border-2 border-dashed border-white/10 bg-black/20 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/30 hover:border-white/10 transition-all group">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-all">
                    <IconUpload size={24} className="text-white/60 group-hover:text-white transition-all" />
                  </div>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Upload image</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Upload Logo</Label>
                <div className="h-[180px] border-2 border-dashed border-white/10 bg-black/20 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/30 hover:border-white/10 transition-all group">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-all">
                    <IconUpload size={24} className="text-white/60 group-hover:text-white transition-all" />
                  </div>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Upload image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Academy Section */}
        <section className="bg-[#111111] rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <IconCircleCheck size={24} className="text-[#4ADE80]" />
              <h2 className="text-xl font-black text-white font-orbitron uppercase">About the Academy</h2>
            </div>
            <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-all">
              <IconPencil size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Description</Label>
              <Textarea 
                defaultValue="Santos FC Academy is committed to developing world-class football talent through excellence in coaching, state-of-the-art facilities, and a holistic approach to player development."
                className="bg-black/40 border-white/10 min-h-[100px] rounded-2xl text-white font-medium focus:border-white/20 transition-all p-4 resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Vision & Mission</Label>
              <Textarea 
                defaultValue="To nurture the next generation of football stars by combining technical excellence with character development."
                className="bg-black/40 border-white/10 min-h-[100px] rounded-2xl text-white font-medium focus:border-white/20 transition-all p-4 resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">Training Philosophy</Label>
              <Textarea 
                defaultValue="Player-centered development focusing on technical skills, tactical awareness, physical conditioning, and mental resilience."
                className="bg-black/40 border-white/10 min-h-[100px] rounded-2xl text-white font-medium focus:border-white/20 transition-all p-4 resize-none"
              />
            </div>
          </div>
        </section>

        {/* Footer Buttons */}
        <div className="flex justify-end items-center gap-4 mt-12">
          <button className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-white/5 border border-white/10 text-white/60 hover:text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all">
            Cancel <IconX size={18} />
          </button>
          <button className="flex items-center gap-2 bg-[#00FF85] hover:bg-[#00E676] text-black px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-[0_0_20px_rgba(0,255,133,0.2)]">
            <IconCircleCheck size={18} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};
