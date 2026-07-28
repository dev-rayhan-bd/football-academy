import React from "react";

interface DashboardStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const DashboardStatCard = ({ icon, label, value }: DashboardStatCardProps) => (
  <div className="bg-[#111111] p-6 md:p-8 rounded-2xl border border-white/15 hover:border-white/20 transition-all space-y-6 group">
    <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/15 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-2xl md:text-3xl font-black text-white uppercase leading-none tracking-tight font-orbitron">
        {value}
      </p>
      <p className="text-[11px] text-white/40 uppercase font-bold tracking-widest">
        {label}
      </p>
    </div>
  </div>
);
