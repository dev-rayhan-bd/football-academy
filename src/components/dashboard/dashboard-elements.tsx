"use client";
import React from "react";
import { IconPlus } from "@tabler/icons-react";

interface DashboardPageHeaderProps {
  title: string;
  subtitle: string;
  action?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
}

export const DashboardPageHeader = ({ title, subtitle, action }: DashboardPageHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div>
      <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{title}</h1>
      <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
    </div>
    {action && (
      <button 
        onClick={action.onClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-all"
      >
        {action.icon}
        {action.label}
      </button>
    )}
  </div>
);

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export const DashboardStatCard = ({ label, value, icon, className = "" }: DashboardStatCardProps) => (
  <div className={`p-6 rounded-2xl border border-white/20 bg-[#0D0D0D] group hover:border-[#E31B23]/30 transition-all ${className}`}>
    <div className="flex flex-col gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#E31B23]/10 group-hover:text-[#E31B23] transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-3xl font-black text-white italic mb-1">{value}</div>
        <div className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">{label}</div>
      </div>
    </div>
  </div>
);

export const DashboardSection = ({ title, children, action, className = "" }: { title?: string, children: React.ReactNode, action?: React.ReactNode, className?: string }) => (
  <div className={`p-8 rounded-2xl border border-white/20 bg-[#0D0D0D] ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between mb-8">
        {title && <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </div>
);
