"use client";

import React from "react";
import {
  IconDownload,
  IconCurrencyDollar,
  IconTrendingUp,
  IconUsers,
  IconTrophy,
  IconFileText,
  IconBallFootball,
  IconClipboardText,
  IconArrowsTransferDown,
  IconId,
} from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// ─── Existing Data ──────────────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", Fees: 8500, Events: 1200, Store: 800 },
  { month: "Feb", Fees: 9200, Events: 1500, Store: 1000 },
  { month: "Mar", Fees: 8800, Events: 1100, Store: 700 },
  { month: "Apr", Fees: 9600, Events: 1800, Store: 1200 },
  { month: "May", Fees: 9000, Events: 1300, Store: 900 },
  { month: "Jun", Fees: 10500, Events: 2000, Store: 1100 },
];

const expenseData = [
  { name: "Match Costs",         value: 4000,  color: "#FF0000" },
  { name: "Training Equipment",  value: 3000,  color: "#FF4D4D" },
  { name: "Ground Maintenance",  value: 2500,  color: "#FF8080" },
  { name: "Staff Salaries",      value: 12000, color: "#FFB3B3" },
  { name: "Other",               value: 2500,  color: "#808080" },
];

const detailedReports = [
  { title: "Fees Summary Report",   date: "January 2026" },
  { title: "Match Expenses Report", date: "Q1 2026" },
  { title: "Event Costs Summary",   date: "All Time" },
];

// ─── New Chart Data ─────────────────────────────────────────────────────────

// Game Reports – monthly count of submitted reports
const gameReportsData = [
  { month: "Jan", Reports: 8,  Wins: 5,  Draws: 2, Losses: 1 },
  { month: "Feb", Reports: 12, Wins: 7,  Draws: 3, Losses: 2 },
  { month: "Mar", Reports: 10, Wins: 6,  Draws: 2, Losses: 2 },
  { month: "Apr", Reports: 15, Wins: 9,  Draws: 4, Losses: 2 },
  { month: "May", Reports: 11, Wins: 6,  Draws: 3, Losses: 2 },
  { month: "Jun", Reports: 18, Wins: 12, Draws: 4, Losses: 2 },
];

// Evaluations – monthly completed vs pending
const evaluationData = [
  { month: "Jan", Completed: 14, Pending: 6,  Expired: 2 },
  { month: "Feb", Completed: 18, Pending: 5,  Expired: 1 },
  { month: "Mar", Completed: 12, Pending: 8,  Expired: 3 },
  { month: "Apr", Completed: 20, Pending: 4,  Expired: 1 },
  { month: "May", Completed: 16, Pending: 7,  Expired: 2 },
  { month: "Jun", Completed: 22, Pending: 3,  Expired: 0 },
];

// Transfers – monthly incoming vs outgoing
const transferData = [
  { month: "Jan", Incoming: 2, Outgoing: 1, Pending: 3 },
  { month: "Feb", Incoming: 1, Outgoing: 2, Pending: 4 },
  { month: "Mar", Incoming: 3, Outgoing: 1, Pending: 2 },
  { month: "Apr", Incoming: 4, Outgoing: 3, Pending: 5 },
  { month: "May", Incoming: 2, Outgoing: 2, Pending: 3 },
  { month: "Jun", Incoming: 5, Outgoing: 2, Pending: 4 },
];

// Player CV Validation – monthly Gold/Silver/Bronze tier validations
const cvValidationData = [
  { month: "Jan", Gold: 3,  Silver: 5,  Bronze: 8 },
  { month: "Feb", Gold: 4,  Silver: 6,  Bronze: 7 },
  { month: "Mar", Gold: 2,  Silver: 8,  Bronze: 9 },
  { month: "Apr", Gold: 5,  Silver: 7,  Bronze: 6 },
  { month: "May", Gold: 6,  Silver: 5,  Bronze: 5 },
  { month: "Jun", Gold: 8,  Silver: 6,  Bronze: 4 },
];

// CV Status Donut
const cvStatusPie = [
  { name: "Gold CVs",    value: 28, color: "#FBBF24" },
  { name: "Silver CVs",  value: 37, color: "#CBD5E1" },
  { name: "Bronze CVs",  value: 39, color: "#F97316" },
];

// Transfer Status Donut
const transferStatusPie = [
  { name: "Completed",  value: 17, color: "#4ADE80" },
  { name: "In Progress",value: 19, color: "#60A5FA" },
  { name: "Rejected",   value: 5,  color: "#EF4444" },
];

// Evaluation Radar Data
const evalRadarData = [
  { subject: "Technical",  A: 82 },
  { subject: "Physical",   A: 75 },
  { subject: "Mental",     A: 68 },
  { subject: "Tactical",   A: 79 },
  { subject: "Leadership", A: 65 },
  { subject: "Teamwork",   A: 88 },
];

// ─── Shared tooltip style ───────────────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: "#111111",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "16px",
  fontSize: "11px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  color: "#fff",
};

// ─── Section Heading ────────────────────────────────────────────────────────
function SectionHeading({ icon, title, subtitle, color }: { icon: React.ReactNode; title: string; subtitle: string; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${color}`}>
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-black uppercase text-white font-orbitron tracking-tight">{title}</h2>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────
export const AnalyticsReport = () => {
  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Analytics Report</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Financial, performance, and operational analytics</p>
        </div>
        <button className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20 cursor-pointer">
          <IconDownload size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Export Report</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue",   value: "$54,280", icon: IconCurrencyDollar,      color: "text-[#E31B23]", bg: "bg-[#E31B23]/10" },
          { label: "Total Expenses",  value: "$24,000", icon: IconTrendingUp,           color: "text-[#4ADE80]", bg: "bg-[#4ADE80]/10" },
          { label: "Active Players",  value: "64",      icon: IconUsers,                color: "text-[#60A5FA]", bg: "bg-[#60A5FA]/10" },
          { label: "Matches Won",     value: "18",      icon: IconTrophy,               color: "text-[#FBBF24]", bg: "bg-[#FBBF24]/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex items-center gap-6 shadow-xl hover:border-white/25 transition-all group">
            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center border border-white/5`}>
              <stat.icon size={32} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-white font-orbitron tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Existing Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Breakdown */}
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">Revenue Breakdown</h2>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={36} iconType="rect"
                  formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mr-4">{v}</span>} />
                <Bar dataKey="Fees"   fill="#E31B23" radius={[4,4,0,0]} barSize={12} />
                <Bar dataKey="Events" fill="#FF4D4D" radius={[4,4,0,0]} barSize={12} />
                <Bar dataKey="Store"  fill="#FFB3B3" radius={[4,4,0,0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses Distribution */}
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">Expenses Distribution</h2>
          <div className="h-[320px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {expenseData.map((entry, index) => <Cell key={`c-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#fff" }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle"
                  formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          NEW CHARTS — Game Reports
      ══════════════════════════════════════ */}
      <div className="flex flex-col gap-6">
        <SectionHeading
          icon={<IconBallFootball size={20} className="text-[#60A5FA]" />}
          title="Game Reports"
          subtitle="Monthly match reports submitted by coaches"
          color="border-[#60A5FA]/20 bg-[#60A5FA]/10"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Reports Bar */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">Monthly Report Volume</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Total reports submitted each month</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gameReportsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} contentStyle={tooltipStyle} />
                  <Legend verticalAlign="bottom" height={36} iconType="rect"
                    formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mr-3">{v}</span>} />
                  <Bar dataKey="Wins"   fill="#4ADE80" radius={[4,4,0,0]} barSize={14} />
                  <Bar dataKey="Draws"  fill="#FBBF24" radius={[4,4,0,0]} barSize={14} />
                  <Bar dataKey="Losses" fill="#EF4444" radius={[4,4,0,0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Game Reports Trend Line */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">Reports Trend</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Growth in report submissions over time</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gameReportsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reportsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#60A5FA" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="Reports" stroke="#60A5FA" strokeWidth={2.5} fill="url(#reportsGrad)" dot={{ fill: "#60A5FA", strokeWidth: 0, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          NEW CHARTS — Player Evaluations
      ══════════════════════════════════════ */}
      <div className="flex flex-col gap-6">
        <SectionHeading
          icon={<IconClipboardText size={20} className="text-[#4ADE80]" />}
          title="Player Evaluations"
          subtitle="Monthly evaluation completion, pending, and expired counts"
          color="border-[#4ADE80]/20 bg-[#4ADE80]/10"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Evaluation Bar Chart */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">Evaluation Status by Month</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Completed vs Pending vs Expired evaluations</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evaluationData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} contentStyle={tooltipStyle} />
                  <Legend verticalAlign="bottom" height={36} iconType="rect"
                    formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mr-3">{v}</span>} />
                  <Bar dataKey="Completed" fill="#4ADE80" radius={[4,4,0,0]} barSize={14} />
                  <Bar dataKey="Pending"   fill="#FBBF24" radius={[4,4,0,0]} barSize={14} />
                  <Bar dataKey="Expired"   fill="#EF4444" radius={[4,4,0,0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Evaluation Radar */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">Average Skill Scores</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Aggregated academy-wide evaluation scores</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={evalRadarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} />
                  <Radar name="Academy Avg" dataKey="A" stroke="#4ADE80" fill="#4ADE80" fillOpacity={0.15} strokeWidth={2} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          NEW CHARTS — Transfers
      ══════════════════════════════════════ */}
      <div className="flex flex-col gap-6">
        <SectionHeading
          icon={<IconArrowsTransferDown size={20} className="text-[#FBBF24]" />}
          title="Transfers"
          subtitle="Monthly incoming, outgoing, and pending transfer activity"
          color="border-[#FBBF24]/20 bg-[#FBBF24]/10"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transfer Line Chart */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">Transfer Activity Trend</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Monthly flow of player movements</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transferData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend verticalAlign="bottom" height={36} iconType="plainline"
                    formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mr-3">{v}</span>} />
                  <Line type="monotone" dataKey="Incoming" stroke="#4ADE80" strokeWidth={2.5} dot={{ fill: "#4ADE80", r: 4 }} />
                  <Line type="monotone" dataKey="Outgoing" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: "#EF4444", r: 4 }} />
                  <Line type="monotone" dataKey="Pending"  stroke="#FBBF24" strokeWidth={2} strokeDasharray="5 4" dot={{ fill: "#FBBF24", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transfer Status Donut */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">Transfer Status Overview</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">All-time transfer request statuses</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={transferStatusPie} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={4} dataKey="value" stroke="none">
                    {transferStatusPie.map((entry, i) => <Cell key={`ts-${i}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#fff" }} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle"
                    formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          NEW CHARTS — Player CV Validation
      ══════════════════════════════════════ */}
      <div className="flex flex-col gap-6">
        <SectionHeading
          icon={<IconId size={20} className="text-[#F97316]" />}
          title="Player CV Validation"
          subtitle="Monthly count of validated CVs by tier — Gold, Silver, and Bronze"
          color="border-[#F97316]/20 bg-[#F97316]/10"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CV Validation Bar Chart */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">Validations by Month &amp; Tier</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">How many CVs validated each month by tier</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cvValidationData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} contentStyle={tooltipStyle} />
                  <Legend verticalAlign="bottom" height={36} iconType="rect"
                    formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mr-3">{v}</span>} />
                  <Bar dataKey="Gold"   fill="#FBBF24" radius={[4,4,0,0]} barSize={14} />
                  <Bar dataKey="Silver" fill="#CBD5E1" radius={[4,4,0,0]} barSize={14} />
                  <Bar dataKey="Bronze" fill="#F97316" radius={[4,4,0,0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CV Tier Distribution Donut */}
          <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
            <div>
              <h3 className="text-base font-black uppercase text-white font-orbitron">CV Tier Distribution</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Total share of validated CVs across tiers</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={cvStatusPie} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={4} dataKey="value" stroke="none">
                    {cvStatusPie.map((entry, i) => <Cell key={`cv-${i}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#fff" }} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle"
                    formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CV Validation Area Trend */}
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
          <div>
            <h3 className="text-base font-black uppercase text-white font-orbitron">Cumulative CV Validations</h3>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Monthly validation trend showing Gold tier growth</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cvValidationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGrad"   x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#FBBF24" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#CBD5E1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bronzeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#F97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} dy={8} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={36} iconType="rect"
                  formatter={(v) => <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mr-3">{v}</span>} />
                <Area type="monotone" dataKey="Gold"   stroke="#FBBF24" strokeWidth={2.5} fill="url(#goldGrad)"   dot={{ fill: "#FBBF24", r: 4 }} />
                <Area type="monotone" dataKey="Silver" stroke="#CBD5E1" strokeWidth={2}   fill="url(#silverGrad)" dot={{ fill: "#CBD5E1", r: 3 }} />
                <Area type="monotone" dataKey="Bronze" stroke="#F97316" strokeWidth={2}   fill="url(#bronzeGrad)" dot={{ fill: "#F97316", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Reports List */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
        <h2 className="text-xl font-black uppercase text-white font-orbitron">Detailed Reports</h2>
        <div className="flex flex-col gap-4">
          {detailedReports.map((report, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-[24px] p-6 flex justify-between items-center hover:border-white/20 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                  <IconFileText size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">{report.title}</h3>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-0.5">{report.date}</p>
                </div>
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/15 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg cursor-pointer">
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
