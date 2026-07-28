"use client";

import React from "react";
import { 
  IconCircleCheck, 
  IconShieldCheck,
  IconFileDescription,
  IconUpload
} from "@tabler/icons-react";

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-6 text-white">
    <IconCircleCheck className="text-green-500 w-5 h-5" />
    <h2 className="text-lg font-bold font-orbitron">{title}</h2>
  </div>
);

export const AgentVerification = () => {
  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-orbitron tracking-wide mb-1">Licensed Verification</h1>
        <p className="text-gray-400 text-sm font-medium">Manage your agent verification and licensing</p>
      </div>

      {/* Verification Status Card */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white shrink-0">
            <IconShieldCheck size={24} stroke={1.5} />
          </div>
          <div>
            <h3 className="text-white font-bold font-orbitron text-lg">Verification Status</h3>
            <p className="text-gray-400 text-sm">Your account is currently verified</p>
          </div>
        </div>
        <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium">
          Approved
        </div>
      </div>

      {/* Verification Documents */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Verification Documents" />
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.01] gap-4">
            <div className="flex items-center gap-4">
              <IconFileDescription className="text-[#E31B23] shrink-0" size={24} stroke={1.5} />
              <div>
                <h4 className="text-white font-medium text-sm">License Certificate</h4>
                <p className="text-gray-500 text-xs mt-0.5">Uploaded: Jan 15, 2024</p>
              </div>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-xs font-medium w-fit sm:w-auto">
              Approved
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.01] gap-4">
            <div className="flex items-center gap-4">
              <IconFileDescription className="text-[#E31B23] shrink-0" size={24} stroke={1.5} />
              <div>
                <h4 className="text-white font-medium text-sm">National ID / Passport</h4>
                <p className="text-gray-500 text-xs mt-0.5">Uploaded: Jan 15, 2024</p>
              </div>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-xs font-medium w-fit sm:w-auto">
              Approved
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] gap-4">
            <div className="flex items-center gap-4">
              <IconFileDescription className="text-[#E31B23] shrink-0 opacity-60" size={24} stroke={1.5} />
              <div>
                <h4 className="text-white font-medium text-sm">Association Membership</h4>
                <p className="text-gray-500 text-xs mt-0.5">Uploaded: Jan 15, 2024</p>
              </div>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-gray-500 text-xs font-medium w-fit sm:w-auto">
              Rejected
            </div>
          </div>
        </div>
      </div>

      {/* Upload Additional Documents */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Upload Additional Documents" />
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-dashed border-white/15 bg-white/[0.01] hover:bg-white/[0.02] transition-colors gap-4">
            <div className="flex items-center gap-4">
              <IconUpload className="text-gray-400 shrink-0" size={24} stroke={1.5} />
              <div>
                <h4 className="text-white font-medium text-sm">License Certificate</h4>
                <p className="text-gray-500 text-xs mt-0.5">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
            <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium transition-colors w-fit sm:w-auto">
              Choose File
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-dashed border-white/15 bg-white/[0.01] hover:bg-white/[0.02] transition-colors gap-4">
            <div className="flex items-center gap-4">
              <IconUpload className="text-gray-400 shrink-0" size={24} stroke={1.5} />
              <div>
                <h4 className="text-white font-medium text-sm">National ID / Passport</h4>
                <p className="text-gray-500 text-xs mt-0.5">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
            <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium transition-colors w-fit sm:w-auto">
              Choose File
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-dashed border-white/15 bg-white/[0.01] hover:bg-white/[0.02] transition-colors gap-4">
            <div className="flex items-center gap-4">
              <IconUpload className="text-gray-400 shrink-0" size={24} stroke={1.5} />
              <div>
                <h4 className="text-white font-medium text-sm">Association Membership</h4>
                <p className="text-gray-500 text-xs mt-0.5">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
            <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium transition-colors w-fit sm:w-auto">
              Choose File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};