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

export const Settings = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Settings</h1>
        <p className="text-gray-500 text-sm mt-2">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <SettingsSection title="Personal Information" icon={<IconUser size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <SettingsInput label="Full Name" placeholder="John Doe" />
            <SettingsInput label="Date Of Birth" placeholder="01/01/1975" isDate />
            <SettingsInput label="Email" placeholder="john.doe@k10football.com" />
            <SettingsInput label="Phone" placeholder="+44 7700 900000" />
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection title="Security" icon={<IconLock size={20} />}>
          <div className="space-y-6">
            <SettingsInput label="Current Password" type="password" />
            <SettingsInput label="New Password" type="password" />
            <SettingsInput label="Confirm New Password" type="password" />
            
            <button className="px-6 py-2.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
              Update Password
            </button>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications" icon={<IconBell size={20} />}>
          <div className="space-y-4">
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
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};
