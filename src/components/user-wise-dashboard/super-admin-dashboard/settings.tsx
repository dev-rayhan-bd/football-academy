"use client";
import React from "react";
import { 
  IconUser, 
  IconLock, 
  IconBell, 
  IconUpload,
  IconChevronDown
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

export const SuperAdminSettings = () => {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Settings</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Manage platform configuration and preferences</p>
      </div>

      {/* Super Admin Information */}
      <SettingsSection icon={IconUser} title="Super Admin Information">
        <div className="flex flex-col xl:flex-row gap-10">
           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              <SettingField label="Super Admin Name" value="K10 Football" />
              <SettingField label="Contact" value="+55 11 9999-8888" />
              <SettingField label="Default Language" value="English" icon={IconChevronDown} />
              <SettingField label="Email" value="support@k10football.com" />
           </div>
           
           <div className="xl:w-[380px] space-y-2">
              <Label className="text-white/70 text-[11px] font-bold uppercase tracking-wider">Upload Cover Photo</Label>
              <div className="border-2 border-dashed border-white/10 rounded-[32px] h-[200px] flex flex-col items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                    <IconUpload size={20} />
                 </div>
                 <p className="text-white/40 text-xs font-medium group-hover:text-white transition-colors">Upload image</p>
              </div>
           </div>
        </div>
      </SettingsSection>

      {/* Security */}
      <SettingsSection icon={IconLock} title="Security">
        <div className="flex flex-col gap-6">
           <SettingField label="Current Password" type="password" placeholder="••••••••••••" />
           <SettingField label="New Password" type="password" placeholder="••••••••••••" />
           <SettingField label="Confirm New Password" type="password" placeholder="••••••••••••" />
           <div className="flex justify-end pt-2">
             <Button className="bg-[#1A1A1A] border border-white/20 hover:bg-white/5 h-12 px-8 rounded-xl text-white font-bold transition-all">
                Update Password
             </Button>
           </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection icon={IconBell} title="Notifications">
        <div className="flex flex-col gap-4">
           {[
             { title: "New User Registration", desc: "Allow new users to register" },
             { title: "Game Report Submissions", desc: "Enable game report creation" },
             { title: "Pending Approvals", desc: "Alert when action needed" },
             { title: "Payment Notifications", desc: "Notify on transactions" }
           ].map((notif, i) => (
             <div key={i} className="bg-black/40 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                <div className="space-y-1">
                   <h4 className="text-white font-bold text-sm">{notif.title}</h4>
                   <p className="text-white/40 text-xs">{notif.desc}</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-red-600" />
             </div>
           ))}
        </div>
      </SettingsSection>
    </div>
  );
};
