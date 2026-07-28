"use client";
import React from "react";
import { 
  IconBuildingCommunity, 
  IconLock, 
  IconCreditCard,
  IconBell,
} from "@tabler/icons-react";
import { 
  SettingsSection, 
  SettingsInput, 
  SettingsToggle 
} from "@/components/dashboard/dashboard-settings-elements";

export const ClubSettings = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Settings</h1>
        <p className="text-gray-500 text-sm mt-2">Manage your club account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Club Information */}
        <SettingsSection title="Club Information" icon={<IconBuildingCommunity size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <SettingsInput label="Club Name" placeholder="Liverpool FC" />
            <SettingsInput label="Date of Establishment" placeholder="1878" isDate />
            <SettingsInput label="Nationality" placeholder="Brazil" />
            <SettingsInput label="Contact" placeholder="+55 11 9999-8888" />
            <SettingsInput label="Club Category" placeholder="Premier League" />
            <SettingsInput label="Email" placeholder="liverpool.fc@gmail.com" />
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

        {/* Billing & Subscription */}
        <SettingsSection title="Billing & Subscription" icon={<IconCreditCard size={20} />}>
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-sm font-bold text-white">Premium Plan <span className="text-gray-500 font-medium ml-2">($150/month)</span></h4>
                </div>
                <button className="px-4 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
                  Change Plan
                </button>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 uppercase font-bold tracking-widest">Next billing date</span>
                  <span className="text-white font-bold italic">July 15, 2025</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 uppercase font-bold tracking-widest">Payment method</span>
                  <span className="text-white font-bold italic">....4242</span>
                </div>
              </div>
            </div>
            
            <button className="px-6 py-2.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
              Update Payment Method
            </button>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications" icon={<IconBell size={20} />}>
          <div className="space-y-4">
            <SettingsToggle 
              title="New CV Alerts" 
              description="Get notified of new athlete CVs" 
              defaultChecked 
            />
            <SettingsToggle 
              title="Profile Share Alerts" 
              description="Notification when profiles are viewed" 
              defaultChecked 
            />
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};
