"use client";

import React from "react";
import { 
  IconCreditCard, 
  IconUser, 
  IconLock, 
  IconBell 
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-[#E31B23]">
      <Icon size={20} stroke={1.5} />
    </div>
    <h2 className="text-lg font-bold text-white font-orbitron tracking-wide">{title}</h2>
  </div>
);

export const AgentSettings = () => {
  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-orbitron tracking-wide mb-1">Settings</h1>
        <p className="text-gray-400 text-sm font-medium">Manage your account and preferences</p>
      </div>

      {/* Billing & Subscription */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader icon={IconCreditCard} title="Billing & Subscription" />
        
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-white font-semibold">Premium Plan</h3>
                <p className="text-gray-400 text-xs mt-1">Professional Agent - £99/month</p>
              </div>
              <Button className="bg-white/10 border border-white/5 text-white hover:bg-white/20 rounded-full h-8 text-xs px-5">
                Change Plan
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs font-medium">Next billing date</span>
                <span className="text-white text-xs font-medium">July 15, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs font-medium">Payment method</span>
                <span className="text-white text-xs font-medium">....4242</span>
              </div>
            </div>
          </div>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 h-10 px-5 rounded-lg text-xs font-medium">
            Update Payment Method
          </Button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader icon={IconUser} title="Personal Information" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs ml-1">Full Name</Label>
            <Input defaultValue="John Doe" className="bg-[#0a0a0a] border-white/10 text-white rounded-xl h-11 focus:border-white/30 focus:ring-1 focus:ring-white/30" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs ml-1">Date Of Birth</Label>
            <Input type="date" defaultValue="1975-01-01" className="bg-[#0a0a0a] border-white/10 text-white rounded-xl h-11 [color-scheme:dark] focus:border-white/30 focus:ring-1 focus:ring-white/30" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs ml-1">Email</Label>
            <Input defaultValue="john.doe@k10football.com" className="bg-[#0a0a0a] border-white/10 text-white rounded-xl h-11 focus:border-white/30 focus:ring-1 focus:ring-white/30" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs ml-1">Phone</Label>
            <Input defaultValue="+44 7700 900000" className="bg-[#0a0a0a] border-white/10 text-white rounded-xl h-11 focus:border-white/30 focus:ring-1 focus:ring-white/30" />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader icon={IconLock} title="Security" />
        
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs ml-1">Current Password</Label>
            <Input type="password" placeholder="••••••••" className="bg-[#0a0a0a] border-white/10 text-white rounded-xl h-11 focus:border-white/30 focus:ring-1 focus:ring-white/30" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs ml-1">New Password</Label>
            <Input type="password" placeholder="••••••••" className="bg-[#0a0a0a] border-white/10 text-white rounded-xl h-11 focus:border-white/30 focus:ring-1 focus:ring-white/30" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400 text-xs ml-1">Confirm New Password</Label>
            <Input type="password" placeholder="••••••••" className="bg-[#0a0a0a] border-white/10 text-white rounded-xl h-11 focus:border-white/30 focus:ring-1 focus:ring-white/30" />
          </div>
          <div className="pt-2">
            <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 h-10 px-5 rounded-lg text-xs font-medium">
              Update Password
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader icon={IconBell} title="Notifications" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.01]">
            <div>
              <h4 className="text-white font-medium text-sm">New Players</h4>
              <p className="text-gray-500 text-xs mt-0.5">Get notified when new Players join</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-[#E31B23]" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.01]">
            <div>
              <h4 className="text-white font-medium text-sm">Profile Updates</h4>
              <p className="text-gray-500 text-xs mt-0.5">Notifications when liked Players update profiles</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-[#E31B23]" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.01]">
            <div>
              <h4 className="text-white font-medium text-sm">Shared with You</h4>
              <p className="text-gray-500 text-xs mt-0.5">When another agent shares a profile with you</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-[#E31B23]" />
          </div>
        </div>
      </div>
    </div>
  );
};
