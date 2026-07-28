"use client";
import React from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";

const profileAnalysisData = [
  { subject: 'Tactics', A: 97, fullMark: 100 },
  { subject: 'Leadership', A: 88, fullMark: 100 },
  { subject: 'Communication', A: 92, fullMark: 100 },
  { subject: 'Adaptability', A: 98, fullMark: 100 },
  { subject: 'Discipline', A: 87, fullMark: 100 },
  { subject: 'Development', A: 96, fullMark: 100 },
];

const tournamentStatsData = [
  { name: 'Win', value: 38, color: '#A80000' },
  { name: 'Los', value: 25, color: '#FF1A1A' },
  { name: 'Draw', value: 21, color: '#FF9999' },
  { name: 'Runner Up', value: 9, color: '#FF4D4D' },
  { name: 'Champion', value: 7, color: '#FFEBEB' },
];

const trophyStats = [
  { name: 'KIO FOOTBALL CHAMPIONSHIP', number: 10, win: 5, loss: 4, draw: 1, runnerUp: 1, champion: 1 },
  { name: 'KIO FOOTBALL CUP', number: 8, win: 6, loss: 1, draw: 1, runnerUp: 2, champion: 0 },
  { name: 'KIO FOOTBALL LEAGUE', number: 9, win: 7, loss: 1, draw: 1, runnerUp: 0, champion: 1 },
  { name: 'KIO FOOTBALL YOUTH CUP', number: 11, win: 8, loss: 2, draw: 1, runnerUp: 1, champion: 0 },
  { name: 'GBN CFN B', number: 6, win: 4, loss: 1, draw: 1, runnerUp: 0, champion: 1 },
];

const barChartData = [
  { name: 'CHAMPIONSHIP', value: 4.2 },
  { name: 'CUP', value: 3.8 },
  { name: 'LEAGUE', value: 5.0, highlight: true },
  { name: 'YOUTH CUP', value: 3.7 },
  { name: 'GBN CFN B', value: 3.4 },
];

const trophyColumns: Column<typeof trophyStats[0]>[] = [
  { header: "Trophies Name", key: "name", cellClassName: "text-xs font-bold text-gray-300 uppercase" },
  { header: "Number", key: "number", align: "center", cellClassName: "text-sm text-white font-bold" },
  { header: "Win", key: "win", align: "center", cellClassName: "text-sm text-white" },
  { header: "Loss", key: "loss", align: "center", cellClassName: "text-sm text-white" },
  { header: "Draw", key: "draw", align: "center", cellClassName: "text-sm text-white" },
  { header: "Runner Up", key: "runnerUp", align: "center", cellClassName: "text-sm text-white" },
  { header: "Champion", key: "champion", align: "center", cellClassName: "text-sm text-white" },
];

export const Analytics = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Deep insights into coaching performance and leadership</p>
      </div>

      {/* Top Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
          <h3 className="text-sm font-bold text-white mb-8 uppercase tracking-widest italic">Coach Profile Analysis</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={profileAnalysisData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 11, fontWeight: 'black' }} />
                <Radar
                  name="Coach"
                  dataKey="A"
                  stroke="#E31B23"
                  fill="#E31B23"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
          <h3 className="text-sm font-bold text-white mb-8 uppercase tracking-widest italic">Tournament Stats</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tournamentStatsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                    index,
                  }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                      <text
                        x={x}
                        y={y}
                        fill={index === 4 ? "#000" : "#fff"}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[12px] font-black italic"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {tournamentStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="square"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
        <h3 className="text-sm font-bold text-white mb-8 uppercase tracking-widest italic">Major Trophies</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#444', fontSize: 9, fontWeight: 'black' }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#444', fontSize: 10 }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: '#000', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '10px 15px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#E31B23', fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ color: '#888', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Bar 
                dataKey="value" 
                radius={[15, 15, 0, 0]} 
                barSize={35}
              >
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.highlight ? "#fff" : "#333"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trophies Table Section */}
      <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
        <DashboardTable 
          columns={trophyColumns} 
          data={trophyStats} 
          className="border-white/10"
        />
      </div>
    </div>
  );
};
