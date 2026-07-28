"use client";
import React from "react";
import { 
  IconFileText, 
  IconHeart, 
  IconEye, 
  IconShare, 
  IconChevronDown,
  IconSearch
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

import { TableActionButtons } from "@/components/dashboard/table-action-buttons";

const LibraryStatCard = ({ icon: Icon, value, label }: { icon: any, value: string | number, label: string }) => (
  <div className="bg-[#111111] border border-white/20 rounded-2xl p-8 flex flex-col gap-4 flex-1">
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center">
       <Icon size={20} className="text-white/60" />
    </div>
    <div>
      <p className="text-white text-4xl font-black font-orbitron">{value}</p>
      <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const TabButton = ({ active, label, icon: Icon, onClick }: { active?: boolean, label: string, icon: any, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 pb-4 border-b-2 transition-all ${active ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/60"}`}
  >
    <Icon size={18} />
    <span className="text-xs font-black uppercase tracking-wider">{label}</span>
  </button>
);

const StatusPill = ({ type }: { type: "Silver" | "Gold" | "Bronze" }) => {
  const styles = {
    Silver: "bg-white/10 text-white border-white/20",
    Gold: "bg-yellow-500/20 text-yellow-500 border-yellow-500/40",
    Bronze: "bg-orange-800/20 text-orange-400 border-orange-800/40"
  };
  return (
    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${styles[type]}`}>
      {type}
    </span>
  );
};

export const CvsLibrary = () => {
  const [activeTab, setActiveTab] = React.useState("All CVS");

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">CVs Library</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">View and manage athlete CVs</p>
      </div>

      {/* Summary Container */}
      <div className="bg-[#111111] border border-white/15 rounded-[40px] p-10 flex flex-col gap-10">
        <div className="flex gap-6">
          <LibraryStatCard icon={IconFileText} value="4" label="All CVS" />
          <LibraryStatCard icon={IconHeart} value="42" label="Liked CVs" />
          <LibraryStatCard icon={IconEye} value="18" label="Profiles Shared" />
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/15">
          <TabButton active={activeTab === "All CVS"} onClick={() => setActiveTab("All CVS")} label="All CVS" icon={IconFileText} />
          <TabButton active={activeTab === "Liked CVs"} onClick={() => setActiveTab("Liked CVs")} label="Liked CVs" icon={IconHeart} />
          <TabButton active={activeTab === "Profiles Shared"} onClick={() => setActiveTab("Profiles Shared")} label="Profiles Shared" icon={IconEye} />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-8 flex flex-col gap-8">
        {/* Table Filters */}
        <div className="flex justify-end gap-3">
          {["All Positions", "Country", "Age Range", "All Status"].map((filter) => (
            <Button key={filter} variant="outline" className="bg-black/40 border-white/20 h-10 rounded-xl text-white/60 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 px-4">
              {filter} <IconChevronDown size={14} />
            </Button>
          ))}
        </div>

        {/* Professional Table */}
        <div className="border border-white/20 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/20">
                <th className="px-6 py-4 text-[10px] font-black text-white uppercase tracking-wider border-r border-white/20">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-white uppercase tracking-wider border-r border-white/20 text-center">Rating</th>
                <th className="px-6 py-4 text-[10px] font-black text-white uppercase tracking-wider border-r border-white/20 text-center">Club</th>
                <th className="px-6 py-4 text-[10px] font-black text-white uppercase tracking-wider border-r border-white/20 text-center">Country</th>
                <th className="px-6 py-4 text-[10px] font-black text-white uppercase tracking-wider border-r border-white/20 text-center">Age</th>
                <th className="px-6 py-4 text-[10px] font-black text-white uppercase tracking-wider border-r border-white/20 text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-white uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {[
                { name: "Marcus Silva", pos: "Forward", rating: "9.2", club: "Manchester Academy", country: "Brazil", age: 19, status: "Silver" as const },
                { name: "David Chen", pos: "Midfielder", rating: "8.8", club: "Chelsea Youth", country: "England", age: 18, status: "Gold" as const },
                { name: "Alex Jonson", pos: "Defender", rating: "8.5", club: "Barcelona B", country: "Spain", age: 20, status: "Silver" as const },
                { name: "James Brown", pos: "Goalkeeper", rating: "7.9", club: "Liverpool Academy", country: "Argentina", age: 17, status: "Bronze" as const },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5 border-r border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
                         <img src={`https://i.pravatar.cc/150?u=${row.name}`} alt={row.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-black uppercase">{row.name}</p>
                        <p className="text-red-500 text-[10px] font-bold uppercase">{row.pos}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-red-600 font-black font-orbitron text-lg">{row.rating}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-white text-sm font-black">{row.club}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-white/60 text-sm font-medium">{row.country}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <span className="text-white/60 text-sm font-black font-orbitron">{row.age}</span>
                  </td>
                  <td className="px-6 py-5 border-r border-white/20 text-center">
                    <StatusPill type={row.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center gap-2">
                       <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all hover:scale-105">
                          <IconEye size={18} />
                       </button>
                       <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/40 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-all hover:scale-105">
                          <IconHeart size={18} />
                       </button>
                       <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/40 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all hover:scale-105">
                          <IconShare size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};