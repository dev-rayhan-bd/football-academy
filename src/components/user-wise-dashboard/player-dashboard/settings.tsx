"use client";
import React from "react";
import { 
  IconUser, 
  IconLock, 
  IconBell,
} from "@tabler/icons-react";
import { 
  SettingsSection, 
  SettingsInput, 
  SettingsToggle 
} from "@/components/dashboard/dashboard-settings-elements";

export const PlayerSettings = () => {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-normal text-white uppercase tracking-tighter font-heading leading-none">Settings</h1>
        <p className="text-gray-500 text-lg font-light tracking-tight">Manage your account and preferences</p>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <SettingsSection title="Personal Information" icon={<IconUser size={20} />} className="!rounded-[40px] !p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <SettingsInput label="Full Name" placeholder="Player Name" />
            <SettingsInput label="Date Of Birth" placeholder="01/01/2005" isDate />
            <SettingsInput label="Email" placeholder="player@k10football.com" />
            <SettingsInput label="Phone" placeholder="+44 7700 900000" />
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection title="Security" icon={<IconLock size={20} />} className="!rounded-[40px] !p-10">
          <div className="max-w-2xl space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <SettingsInput label="Current Password" type="password" placeholder="••••••••" />
              <SettingsInput label="New Password" type="password" placeholder="••••••••" />
              <SettingsInput label="Confirm New Password" type="password" placeholder="••••••••" />
            </div>
            
            <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all uppercase tracking-widest">
              Update Password
            </button>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications" icon={<IconBell size={20} />} className="!rounded-[40px] !p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingsToggle 
              title="New video likes" 
              description="Get notified when someone likes your video" 
              defaultChecked 
            />
            <SettingsToggle 
              title="Profile views" 
              description="Get notified when a club views your profile" 
              defaultChecked 
            />
            <SettingsToggle 
              title="Interest alerts" 
              description="Get notified when a club shows interest in you" 
              defaultChecked 
            />
            <SettingsToggle 
              title="Marketing emails" 
              description="Receive news and updates from K10 Football" 
            />
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};
