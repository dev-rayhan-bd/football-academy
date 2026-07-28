"use client";
import React from "react";
import { 
  IconSchool, 
  IconLock, 
  IconCreditCard, 
  IconBell, 
  IconCalendar,
  IconChevronDown,
  IconCircleCheck
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
    <div className="flex items-center gap-3">
       <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
          <Icon size={22} />
       </div>
       <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">{title}</h2>
    </div>
    {children}
  </div>
);

const SettingField = ({ label, value, type = "text", placeholder, icon: Icon }: any) => (
  <div className="space-y-2 flex-1">
    <Label className="text-white/70 text-[11px] font-bold uppercase tracking-wider">{label}</Label>
    <div className="relative">
      <Input 
        type={type} 
        defaultValue={value} 
        placeholder={placeholder}
        className="bg-black/40 border-white/20 h-14 rounded-xl px-6 text-white/90 placeholder:text-white/20 focus:border-red-500/50 transition-all" 
      />
      {Icon && <Icon size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />}
    </div>
  </div>
);

export const AcademySettings = () => {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Settings</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Manage your account and preferences</p>
      </div>

      {/* Academy Information */}
      <SettingsSection icon={IconSchool} title="Academy Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <SettingField label="Academy Name" value="Santos FC Academy" />
           <SettingField label="Date of Founded" value="01/01/2018" icon={IconCalendar} />
           <SettingField label="Nationality" value="São Paulo, Brazil" />
           <SettingField label="Contact" value="+55 11 9999-8888" />
           <SettingField label="Academy Category" value="Premier League Academy" />
           <SettingField label="Email" value="john.doe@k10football.com" />
        </div>
      </SettingsSection>

      {/* Security */}
      <SettingsSection icon={IconLock} title="Security">
        <div className="flex flex-col gap-6 max-w-full">
           <SettingField label="Current Password" type="password" placeholder="••••••••••••" />
           <SettingField label="New Password" type="password" placeholder="••••••••••••" />
           <SettingField label="Confirm New Password" type="password" placeholder="••••••••••••" />
           <div className="pt-2">
             <Button className="bg-[#1A1A1A] border border-white/20 hover:bg-white/5 h-12 px-8 rounded-xl text-white font-bold transition-all">
                Update Password
             </Button>
           </div>
        </div>
      </SettingsSection>

      {/* Billing & Subscription */}
      <SettingsSection icon={IconCreditCard} title="Billing & Subscription">
        <div className="flex flex-col gap-6">
           <div className="bg-black/40 border border-white/10 rounded-[32px] p-8 flex flex-col gap-6 relative">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-xl font-black text-white font-orbitron uppercase">Premium Plan</h3>
                    <p className="text-white/40 text-sm font-medium mt-1">$89 per month</p>
                 </div>
                 <Button variant="outline" className="bg-white/5 border-white/10 h-10 px-6 rounded-xl text-white/80 font-bold text-xs hover:bg-white/10">
                    Change Plan
                 </Button>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="flex justify-between items-center text-sm">
                 <div className="space-y-1">
                    <p className="text-white/40 font-bold uppercase text-[10px] tracking-wider">Next billing date</p>
                    <p className="text-white/80 font-medium">July 15, 2025</p>
                 </div>
                 <div className="space-y-1 text-right">
                    <p className="text-white/40 font-bold uppercase text-[10px] tracking-wider">Payment method</p>
                    <p className="text-white/80 font-medium flex items-center justify-end gap-2">
                       •••• 4242 <IconCircleCheck size={16} className="text-emerald-500" />
                    </p>
                 </div>
              </div>
           </div>
           <div className="pt-2">
              <Button variant="outline" className="bg-transparent border-white/20 h-12 px-8 rounded-xl text-white/80 font-bold hover:bg-white/5 transition-all">
                 Update Payment Method
              </Button>
           </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection icon={IconBell} title="Notifications">
        <div className="flex flex-col gap-4">
           {[
             { title: "New video likes", desc: "Get notified when someone likes your video" },
             { title: "Profile views", desc: "Get notified when a club views your profile" }
           ].map((notif, i) => (
             <div key={i} className="bg-black/40 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                <div className="space-y-1">
                   <h4 className="text-white font-bold text-sm">{notif.title}</h4>
                   <p className="text-white/40 text-xs">{notif.desc}</p>
                </div>
                <Switch className="data-[state=checked]:bg-red-600" />
             </div>
           ))}
        </div>
      </SettingsSection>
    </div>
  );
};
