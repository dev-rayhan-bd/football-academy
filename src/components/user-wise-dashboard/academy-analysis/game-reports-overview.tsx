"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const StatBar = ({ label, value, colorClass, align = "left" }: { label: string; value: number | string; colorClass: string; align?: "left" | "right" }) => (
  <div className={`flex flex-col gap-1.5 w-full max-w-[2280px] ${align === "right" ? "items-end text-right" : "items-start text-left"}`}>
    <Label className="text-[10px] font-black text-white uppercase tracking-[0.1em]">{label}</Label>
    <div className={`h-11 w-full rounded-lg relative overflow-hidden ${colorClass} shadow-lg`}>
       <div 
         className={`absolute top-0 bottom-0 bg-white w-[50%] ${align === "right" ? "left-0 shadow-[4px_0_10px_rgba(0,0,0,0.1)]" : "right-0 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]"}`} 
         style={{ 
           clipPath: align === "right" 
             ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' 
             : 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' 
         }}
       >
          <div className={`h-full flex items-center px-4 font-black text-[#111111] font-orbitron text-2xl ${align === "right" ? "justify-start" : "justify-end"}`}>
            {value}
          </div>
       </div>
       <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20" />
    </div>
  </div>
);

export const GameReportsOverview = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Create Game Reports</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Create Professional Football Player Game Reports</p>
      </div>

      {/* Main Stats Container */}
      <div className="bg-[#111111] rounded-[40px] border border-white/10 p-8 md:p-12 flex flex-col gap-10 relative overflow-hidden">
        {/* Background Overlay */}
        <div 
           className="absolute inset-0 opacity-[0.08] pointer-events-none"
           style={{ 
             backgroundImage: "url('/pngegg (2).png')",
             backgroundSize: '70%',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}
        />

        <div className="relative w-full">
           <div className="bg-[#00A3FF] font-orbitron text-white w-full py-3 rounded-xl font-black uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(0,163,255,0.3)] text-center border border-white/20">
             Match Statistics
           </div>
        </div>

        <div className="relative flex justify-between gap-20">
           {/* Left Column */}
           <div className="flex flex-col gap-4 flex-1 max-w-[300px]">
              <StatBar label="Shots on Goal" value="8" colorClass="bg-[#00D1FF]" />
              <StatBar label="Goal Scored" value="3" colorClass="bg-[#8B5CF6]" />
              <StatBar label="Assists" value="6" colorClass="bg-[#2DD4BF]" />
              <StatBar label="Pass Accurate" value="12" colorClass="bg-[#F59E0B]" />
              <StatBar label="Wrong Pass" value="2" colorClass="bg-[#C084FC]" />
              <StatBar label="Penalties Taken" value="4" colorClass="bg-[#EF4444]" />
              <StatBar label="Stand Tackle" value="12" colorClass="bg-[#B48A14]" />
              <StatBar label="Sliding Tackle" value="12" colorClass="bg-[#8B5CF6]" />
              <StatBar label="Interception" value="2" colorClass="bg-[#F59E0B]" />
              <StatBar label="Saves Accurate" value="10" colorClass="bg-[#4ADE80]" />
              <StatBar label="Free Kick" value="12" colorClass="bg-[#F59E0B]" />
              <StatBar label="Corner Kick" value="4" colorClass="bg-[#00D1FF]" />
           </div>

           {/* Center Player Image */}
           <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full flex justify-center items-start pointer-events-none">
              <img 
                src="/sergio-ramos.png" 
                alt="Sergio Ramos" 
                className="h-[95%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] mt-24"
              />
           </div>

           {/* Right Column */}
           <div className="flex flex-col gap-4 items-end flex-1 max-w-[300px]">
              <StatBar label="Goal Unsave" value="1" colorClass="bg-[#8B5CF6]" align="right" />
              <StatBar label="Penalties Saves" value="1" colorClass="bg-[#F59E0B]" align="right" />
              <StatBar label="Appearances" value="15" colorClass="bg-[#00D1FF]" align="right" />
              <StatBar label="Fault" value="1" colorClass="bg-[#4ADE80]" align="right" />
              <StatBar label="Red Card" value="0" colorClass="bg-[#EF4444]" align="right" />
              <StatBar label="Yellow Card" value="1" colorClass="bg-[#F59E0B]" align="right" />
              <StatBar label="Punching" value="5" colorClass="bg-[#00D1FF]" align="right" />
              <StatBar label="Handling" value="10" colorClass="bg-[#B48A14]" align="right" />
              <StatBar label="Reflex" value="1" colorClass="bg-[#8B5CF6]" align="right" />
              <StatBar label="Arial Ability" value="5" colorClass="bg-[#2DD4BF]" align="right" />
              <StatBar label="Throwing" value="8" colorClass="bg-[#F59E0B]" align="right" />
              <StatBar label="Reactions" value="1" colorClass="bg-[#00D1FF]" align="right" />
           </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-10">
           <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden group">
              <div className="bg-white/5 py-3 px-6 text-center border-b border-white/10">
                 <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Accurate Shots</p>
              </div>
              <div className="aspect-video relative">
                 <img src="/goal-bar.png" alt="Goal" className="w-full h-full object-cover" />
                 {/* Football Markers */}
                 <div className="absolute top-[25%] left-[15%] w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-black/20">⚽</div>
                 <div className="absolute top-[25%] right-[15%] w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-black/20">⚽</div>
                 <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-black/20">⚽</div>
              </div>
           </div>

           <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden group">
              <div className="bg-white/5 py-3 px-6 text-center border-b border-white/10">
                 <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Accurate Assist</p>
              </div>
              <div className="aspect-video relative">
                 <img src="/FootballPitch.png" alt="Football Pitch" className="w-full h-full object-cover" />
                 
                 {/* Assist Path Overlay */}
                 <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-black/20">⚽</div>
                    <div className="h-20 w-px bg-white border-l border-white relative mt-2 shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                       <div className="absolute bottom-0 left-0 w-4 h-px bg-white -rotate-45 origin-left" />
                       <div className="absolute bottom-0 left-0 w-4 h-px bg-white rotate-45 origin-left" />
                    </div>
                 </div>

                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[7px] font-black text-white text-center leading-none uppercase">Accurate<br/>Assist</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-6 mt-4">
        <Button className="flex-1 bg-transparent hover:bg-white/5 text-white border border-white/10 h-16 rounded-xl font-black uppercase tracking-[0.2em] transition-all">
          Cancel
        </Button>
        <Button className="flex-1 bg-[#00FF85] hover:bg-[#00E074] text-black h-16 rounded-xl font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(0,255,133,0.2)]">
          Submit Report
        </Button>
      </div>
    </div>
  );
};
