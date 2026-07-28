"use client";
import React, { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SettingsSection = ({ title, icon, children, className = "" }: SettingsSectionProps) => (
  <div className={`p-8 rounded-2xl border border-white/20 bg-[#0D0D0D] ${className}`}>
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#E31B23]">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{title}</h3>
    </div>
    {children}
  </div>
);

interface SettingsInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  isDate?: boolean;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsInput = ({ label, placeholder, type = "text", isDate, icon, value, onChange }: SettingsInputProps) => (
  <div className="space-y-2">
    <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 bg-white/[0.02] border border-white/25 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 placeholder:text-gray-700 transition-all" 
      />
      {isDate && !icon && <IconCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
      {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
    </div>
  </div>
);

interface SettingsToggleProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const SettingsToggle = ({ title, description, defaultChecked, onToggle }: SettingsToggleProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleToggle = () => {
    const newState = !checked;
    setChecked(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between group hover:border-[#E31B23]/20 transition-all">
      <div>
        <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button 
        onClick={handleToggle}
        className={`w-11 h-6 rounded-full relative transition-all duration-300 ${checked ? 'bg-[#E31B23]' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${checked ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
};
