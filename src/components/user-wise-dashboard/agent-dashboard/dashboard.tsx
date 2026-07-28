"use client";

import React from "react";
import { 
  IconUsers, 
  IconHeart,
  IconShare,
  IconEye,
  IconShieldCheck,
  IconCertificate,
  IconPhone,
  IconMail,
  IconChevronDown
} from "@tabler/icons-react";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSidebarPanel, DashboardSidebarItem } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from "recharts";
import MyImagesSection from "@/app/(common)/cvs-page/player-cv-details/components/MyImageSection";
import MyVideosSection from "@/app/(common)/cvs-page/player-cv-details/components/MyVideoSection";

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

type Player = {
  avatar: string;
  name: string;
  position: string;
  rating: number;
  club: string;
  country: string;
  age: number;
  status: "Gold" | "Silver" | "Bronze";
};

const monitoredPlayers: Player[] = [
  { avatar: "https://i.pravatar.cc/150?u=10", name: "Marcus Silva", position: "Forward", rating: 9.2, club: "Manchester Academy", country: "Brazil", age: 19, status: "Silver" },
  { avatar: "https://i.pravatar.cc/150?u=11", name: "David Chen", position: "Midfielder", rating: 8.8, club: "Chelsea Youth", country: "England", age: 18, status: "Gold" },
  { avatar: "https://i.pravatar.cc/150?u=12", name: "Alex Jonson", position: "Defender", rating: 8.5, club: "Barcelona B", country: "Spain", age: 20, status: "Silver" },
  { avatar: "https://i.pravatar.cc/150?u=13", name: "James Brown", position: "Goalkeeper", rating: 7.9, club: "Liverpool Academy", country: "Argentina", age: 17, status: "Bronze" },
];

const getStatusColor = (status: "Gold" | "Silver" | "Bronze") => {
  switch (status) {
    case "Gold": return "bg-[#ffc107] text-black";
    case "Silver": return "bg-[#e0e0e0] text-black";
    case "Bronze": return "bg-[#cd7f32] text-white";
    default: return "bg-gray-500 text-white";
  }
};

const columns: Column<Player>[] = [
  {
    header: "Name",
    key: "name",
    align: "left",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.avatar} alt={row.name} className="w-10 h-10 rounded-full border border-white/10" />
        <div>
          <p className="text-white font-semibold">{row.name}</p>
          <p className="text-[#E31B23] text-xs">{row.position}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Rating",
    key: "rating",
    align: "center",
    render: (row) => <span className="text-[#E31B23] font-bold">{row.rating.toFixed(1)}</span>,
  },
  {
    header: "Club",
    key: "club",
    align: "center",
    cellClassName: "text-white font-medium",
  },
  {
    header: "Country",
    key: "country",
    align: "center",
    cellClassName: "text-gray-400",
  },
  {
    header: "Age",
    key: "age",
    align: "center",
    cellClassName: "text-gray-400",
  },
  {
    header: "Status",
    key: "status",
    align: "center",
    render: (row) => (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(row.status)}`}>
        {row.status}
      </span>
    ),
  },
  {
    header: "Actions",
    key: "actions",
    align: "center",
    render: () => (
      <TableActionButtons 
        onView={() => {}}
        onHeart={() => {}}
        onShare={() => {}}
      />
    ),
  },
];

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] text-white p-3 rounded-xl border border-white/10 shadow-lg">
        <p className="text-gray-400 text-xs mb-1">-- {label} --</p>
        <p className="font-semibold text-sm">
          {payload[0].name} : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-black p-3 rounded-xl border-none shadow-lg">
        <p className="font-bold text-sm text-[#E31B23] mb-1">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="font-semibold text-sm">
            {p.name} : {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AgentDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Hero & Sidebar Row */}
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Custom Agent Hero */}
                <div className="flex-1 min-w-0">
                    <div className="relative rounded-3xl overflow-hidden min-h-[450px] border border-white/15 group flex flex-col h-full">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(/707964211aa29e42aa7d522475b870cad9c4ad92.png)` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                      
                      <div className="relative p-8 md:p-10 w-full flex flex-col h-full justify-between">
                        <div>
                          {/* Progress Circle SVG */}
                          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#E31B23]" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - 0.74)} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <span className="text-2xl font-black italic">74%</span>
                              <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Profile</span>
                            </div>
                          </div>
                          
                          <div className="bg-black/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase w-fit tracking-[0.2em] mb-4">
                            ACTIVE AGENT
                          </div>
                          
                          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none font-orbitron mb-3">
                            John Doe
                          </h1>
                          
                          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                            <span className="text-[#E31B23]">Premium Agent</span>
                            <span>•</span>
                            <span>58 Years Old</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><span className="w-4 h-3 bg-green-600 border border-white/10 rounded-sm"></span> Brazil</span>
                          </div>
                        </div>
                        
                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-8 border-t border-white/15">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/15 text-white/40">
                              <IconShieldCheck size={22} />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">License ID</p>
                              <p className="text-white text-base font-bold font-heading">UK-AG-2024-001</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/15 text-white/40">
                              <IconCertificate size={22} />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Certifications</p>
                              <p className="text-[#E31B23] text-base font-bold font-heading">FIFA Licensed Agent</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/15 text-white/40">
                              <IconPhone size={22} />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Contact</p>
                              <p className="text-white text-base font-bold font-heading">+55 11 9999-8888</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/15 text-white/40">
                              <IconMail size={22} />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Email</p>
                              <p className="text-white text-base font-bold font-heading">john.doe@example.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full xl:w-[320px] shrink-0">
                    <DashboardSidebarPanel title="Recent Activity" icon={<IconShieldCheck size={20} />} iconColor="text-[#E31B23]">
                        <div className="space-y-4">
                          {/* Activity Item 1 */}
                          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all flex items-start gap-4">
                            <div className="mt-1">
                              <IconHeart size={18} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white mb-1">
                                You liked CV James Rodriguez's
                              </p>
                              <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                          </div>
                          
                          {/* Activity Item 2 */}
                          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all flex items-start gap-4">
                            <div className="mt-1">
                              <IconShare size={18} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white mb-1">
                                You shared profile Sarah Mitchell's
                              </p>
                              <p className="text-xs text-gray-500">5 hours ago</p>
                            </div>
                          </div>
                          
                          {/* Activity Item 3 */}
                          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all flex items-start gap-4">
                            <div className="mt-1">
                              <IconShieldCheck size={18} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white mb-1">
                                Verification status updated to Approved
                              </p>
                              <p className="text-xs text-gray-500">Yesterday at 3:45 PM</p>
                            </div>
                          </div>
                        </div>
                    </DashboardSidebarPanel>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatCard 
                  icon={<IconUsers className="w-6 h-6" />}
                  label="Players Viewed"
                  value="24"
                />
                <DashboardStatCard 
                  icon={<IconHeart className="w-6 h-6" />}
                  label="Liked CVs"
                  value="8"
                />
                <DashboardStatCard 
                  icon={<IconShare className="w-6 h-6" />}
                  label="Shared Profiles"
                  value="5"
                />
                <DashboardStatCard 
                  icon={<IconEye className="w-6 h-6" />}
                  label="Profile Views"
                  value="156"
                />
            </div>
            
            {/* Analytics */}
            <div className="bg-[#111111] border border-white/15 rounded-3xl p-8 space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-orbitron tracking-wide mb-1">Analytics For Players Monitored</h2>
                        <p className="text-sm text-gray-500 font-medium">Insights based on Players interactions, profile activity & performance data.</p>
                    </div>
                    <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg px-6">
                        Full Analytics
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Area Chart */}
                    <div className="space-y-6">
                        <div>
                          <h3 className="text-base font-bold text-white tracking-wide">CV Views Over Time</h3>
                          <p className="text-xs text-gray-500">Your profile viewing trends</p>
                        </div>
                        <div className="h-[220px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E31B23" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#E31B23" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis 
                                        dataKey="week" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }}
                                        ticks={[0, 7, 14, 21, 28]}
                                    />
                                    <Tooltip content={<CustomAreaTooltip />} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="views" 
                                        name="views"
                                        stroke="#E31B23" 
                                        fillOpacity={1} 
                                        fill="url(#colorViews)" 
                                        strokeWidth={2}
                                        activeDot={{ r: 5, fill: '#111', stroke: '#E31B23', strokeWidth: 2 }}
                                        dot={{ r: 3, fill: '#111', stroke: '#fff', strokeWidth: 1.5 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="space-y-6">
                        <div>
                          <h3 className="text-base font-bold text-white tracking-wide">Likes & Shares Activity</h3>
                          <p className="text-xs text-gray-500">Your interaction patterns</p>
                        </div>
                        <div className="h-[220px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} barSize={12} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis 
                                        dataKey="week" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }}
                                        ticks={[0, 3, 6, 9, 12]}
                                    />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomBarTooltip />} />
                                    <Legend 
                                      iconType="square" 
                                      wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                                    />
                                    <Bar dataKey="likes" name="Likes" fill="#ffffff" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="shares" name="Shares" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Monitored Players */}
            <div className="bg-[#111111] border border-white/15 rounded-3xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-white font-orbitron tracking-wide mb-4">Monitored Players</h2>
                
                <div className="flex flex-wrap gap-4 justify-end mb-6">
                  <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
                    All Positions <IconChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
                    Country <IconChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
                    Age Range <IconChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg">
                    All Status <IconChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <DashboardTable columns={columns} data={monitoredPlayers} />
            </div>

            <MyImagesSection editable={true} />
            <MyVideosSection editable={true} />
        </div>
    );
};
