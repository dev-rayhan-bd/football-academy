"use client";

import React from "react";
import { IconUsers, IconHeart, IconShare, IconEye } from "@tabler/icons-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area
} from "recharts";

const areaData = [
  { week: "Week 1", views: 14 },
  { week: "Week 2", views: 21 },
  { week: "Week 3", views: 12 },
  { week: "Week 4", views: 25 },
];

const barData = [
  { week: "Week 1", likes: 8, shares: 5 },
  { week: "Week 2", likes: 6, shares: 9 },
  { week: "Week 3", likes: 11, shares: 4 },
  { week: "Week 4", likes: 3, shares: 5 },
];

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-white/10 p-3 rounded-xl shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-[#E31B23] font-bold text-sm">views : {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-white/10 p-3 rounded-xl shadow-xl">
        <p className="text-[#E31B23] font-bold text-xs mb-1">{label}</p>
        <p className="text-black text-xs font-medium">Likes : {payload[0].value}</p>
        <p className="text-black text-xs font-medium">shares : {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

export const AgentAnalytics = () => {
  return (
    <div className="p-2 md:p-6 space-y-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-orbitron tracking-wide mb-1">Analytics For Players Monitored</h1>
        <p className="text-gray-400 text-sm font-medium">Insights Based on Players Interactions, Profile Activity & Performance Data.</p>
      </div>

      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white font-orbitron tracking-wide mb-4">Overview Of Agent Activity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
             <IconUsers className="text-gray-400 w-5 h-5" />
             <p className="text-3xl font-bold text-white">24</p>
             <p className="text-sm text-gray-400 font-medium">Players Profile Viewed</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
             <IconHeart className="text-gray-400 w-5 h-5" />
             <p className="text-3xl font-bold text-white">8</p>
             <p className="text-sm text-gray-400 font-medium">Liked CVs</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
             <IconShare className="text-gray-400 w-5 h-5" />
             <p className="text-3xl font-bold text-white">5</p>
             <p className="text-sm text-gray-400 font-medium">Shared Profiles</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
             <IconEye className="text-gray-400 w-5 h-5" />
             <p className="text-3xl font-bold text-white">156</p>
             <p className="text-sm text-gray-400 font-medium">Profile Views</p>
          </div>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold font-orbitron mb-1">CVs Views Over Tme</h3>
              <p className="text-gray-500 text-xs">Your profile viewing trends</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E31B23" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#E31B23" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={true} horizontal={false} />
                  <XAxis dataKey="week" stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} tickCount={5} />
                  <Tooltip content={<CustomAreaTooltip />} cursor={{ stroke: '#555', strokeWidth: 1, strokeDasharray: '3 3' }} />
                  <Area type="monotone" dataKey="views" stroke="#E31B23" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" activeDot={{ r: 6, fill: "#E31B23", stroke: "#111", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold font-orbitron mb-1">Likes & Shares Activity</h3>
              <p className="text-gray-500 text-xs">Your interaction patterns</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={true} horizontal={false} />
                  <XAxis dataKey="week" stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} tickCount={5} />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#222' }} />
                  <Legend iconType="square" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#fff' }} />
                  <Bar dataKey="likes" name="Likes" fill="#333" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shares" name="Shares" fill="#fff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
