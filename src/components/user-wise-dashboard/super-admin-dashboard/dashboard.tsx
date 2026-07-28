import React from "react";
import { 
  IconUsers, 
  IconCurrencyDollar,
  IconClock,
  IconCreditCard
} from "@tabler/icons-react";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSidebarPanel, DashboardSidebarItem } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
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
  Cell
} from "recharts";

const barData = [
  { month: "Jan-Feb", Revenue: 16000 },
  { month: "Mar-Apr", Revenue: 22000 },
  { month: "May-Jun", Revenue: 12000 },
  { month: "Jul-Aug", Revenue: 20000 },
  { month: "Sept-Oct", Revenue: 18000 },
  { month: "Nov-Dec", Revenue: 10000 },
];

const areaData = [
  { month: "Jan-Feb", Members: 400 },
  { month: "Mar-Apr", Members: 680 },
  { month: "May-Jun", Members: 550 },
  { month: "Jul-Aug", Members: 800 },
  { month: "Sept-Oct", Members: 700 },
  { month: "Nov-Dec", Members: 900 },
];

type Activity = {
  name: string;
  role: string;
  action: string;
  date: string;
  status: "Completed" | "Pending";
};

const recentActivitiesData: Activity[] = [
  { name: "Marcus Silva", role: "Player", action: "Created Profile", date: "2024-01-15", status: "Completed" },
  { name: "David Chen", role: "Coach", action: "Game Reports", date: "2024-02-01", status: "Pending" },
  { name: "Alex Jonson", role: "Academy", action: "Subscription Renewed", date: "2023-12-01", status: "Completed" },
  { name: "James Brown", role: "Agent", action: "Verification", date: "2024-03-10", status: "Pending" },
  { name: "Alex Silva", role: "Club", action: "Player Liked", date: "2024-03-09", status: "Completed" },
];

const columns: Column<Activity>[] = [
  {
    header: "Name",
    key: "name",
    align: "left",
    cellClassName: "font-semibold text-white",
  },
  {
    header: "Role",
    key: "role",
    align: "center",
    cellClassName: "text-gray-400 text-sm",
  },
  {
    header: "Action",
    key: "action",
    align: "center",
    cellClassName: "text-gray-200 text-sm",
  },
  {
    header: "Date",
    key: "date",
    align: "center",
    cellClassName: "text-gray-400 text-sm",
  },
  {
    header: "Status",
    key: "status",
    align: "center",
    render: (row) => (
      <span
        className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block w-24 text-center ${
          row.status === "Completed"
            ? "bg-[#d1fae5] text-[#065f46]"
            : "bg-[#ffedd5] text-[#9a3412]"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-black p-3 rounded-xl border-none shadow-lg">
        <p className="font-bold text-sm text-[#E31B23]">{label}</p>
        <p className="font-semibold text-sm">
          {payload[0].name} : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

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

export const SuperAdminDashboard = () => {
    return (
        <div className="flex flex-col xl:flex-row gap-6 p-6">
            <div className="flex-1 space-y-6 min-w-0">
                <DashboardHero
                  backgroundImage="/707964211aa29e42aa7d522475b870cad9c4ad92.png"
                  badgeText="SUPER ADMIN"
                  title="K10 Football"
                  contacts={[
                    { type: "phone", label: "Contact", value: "+55 11 9999-8888" },
                    { type: "email", label: "Email", value: "contact@santosfc.academy" }
                  ]}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardStatCard 
                      icon={<IconUsers className="w-6 h-6" />}
                      label="Total Users"
                      value="1,245"
                    />
                    <DashboardStatCard 
                      icon={<IconCurrencyDollar className="w-6 h-6" />}
                      label="Revenue This Month"
                      value="$ 197,400"
                    />
                    <DashboardStatCard 
                      icon={<IconClock className="w-6 h-6" />}
                      label="Pending Verifications"
                      value="89"
                    />
                    <DashboardStatCard 
                      icon={<IconCreditCard className="w-6 h-6" />}
                      label="Active Subscriptions"
                      value="342"
                    />
                </div>
                
                <div className="bg-[#111111] border border-white/15 rounded-3xl p-8 space-y-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-orbitron tracking-wide mb-1">Analytics</h2>
                            <p className="text-sm text-gray-500 font-medium">Deep insights</p>
                        </div>
                        <Button variant="outline" className="bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg px-6">
                            Full Analytics
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Bar Chart */}
                        <div className="space-y-6">
                            <h3 className="text-base font-bold text-white tracking-wide">Revenue Overview</h3>
                            <div className="h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} barSize={20} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }}
                                            ticks={[0, 8000, 16000, 24000, 32000]}
                                        />
                                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                                        <Bar dataKey="Revenue" radius={[4, 4, 0, 0]}>
                                            {
                                                barData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.month === 'Mar-Apr' ? '#ffffff' : 'rgba(255,255,255,0.15)'} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Area Chart */}
                        <div className="space-y-6">
                            <h3 className="text-base font-bold text-white tracking-wide">Membership Growth</h3>
                            <div className="h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#E31B23" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#E31B23" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }}
                                            ticks={[0, 300, 600, 900, 1200]}
                                        />
                                        <Tooltip content={<CustomAreaTooltip />} />
                                        <Area 
                                            type="monotone" 
                                            dataKey="Members" 
                                            stroke="#E31B23" 
                                            fillOpacity={1} 
                                            fill="url(#colorMembers)" 
                                            strokeWidth={2}
                                            activeDot={{ r: 5, fill: '#111', stroke: '#E31B23', strokeWidth: 2 }}
                                            dot={{ r: 3, fill: '#111', stroke: '#fff', strokeWidth: 1.5 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#111111] border border-white/15 rounded-3xl p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-white font-orbitron tracking-wide">Recent Activities</h2>
                    <DashboardTable columns={columns} data={recentActivitiesData} />
                </div>
            </div>
            
            <div className="w-full xl:w-[320px] shrink-0">
                <DashboardSidebarPanel title="Pending Approvals" icon={<IconClock size={20} />} iconColor="text-[#E31B23]">
                    <DashboardSidebarItem
                        avatar="https://i.pravatar.cc/150?u=1"
                        title="Elite FC Academy"
                        subtitle="Academy"
                        subtitleColor="text-[#E31B23]"
                        extraInfo="4h ago"
                    />
                    <DashboardSidebarItem
                        avatar="https://i.pravatar.cc/150?u=2"
                        title="David Chen"
                        subtitle="Agent"
                        subtitleColor="text-[#E31B23]"
                        extraInfo="1d ago"
                    />
                    <DashboardSidebarItem
                        avatar="https://i.pravatar.cc/150?u=3"
                        title="Manchester United"
                        subtitle="Club"
                        subtitleColor="text-[#E31B23]"
                        extraInfo="2d ago"
                    />
                </DashboardSidebarPanel>
            </div>
        </div>
    );
};