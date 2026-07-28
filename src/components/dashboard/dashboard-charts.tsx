"use client";

import React from "react";
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useAppSelector } from "@/lib/hooks/reduxHooks";

const barData = [
  { month: "Jan-Feb", value: 6 },
  { month: "Mar-Apr", value: 10 },
  { month: "May-Jun", value: 5 },
  { month: "Jul-Aug", value: 8 },
  { month: "Sept-Oct", value: 9 },
  { month: "Nov-Dec", value: 4 },
];

const areaData = [
  { month: "Jan-Feb", value: 400 },
  { month: "Mar-Apr", value: 600 },
  { month: "May-Jun", value: 550 },
  { month: "Jul-Aug", value: 800 },
  { month: "Sept-Oct", value: 700 },
  { month: "Nov-Dec", value: 900 },
];

export const DashboardCharts = () => {
  const players = useAppSelector((state) => state.player.players);
  const evaluationRecords = useAppSelector((state) => state.evaluation.records);

  // Deterministic age mapper for mock players to provide a rich distribution
  const getPlayerAge = (player: any) => {
    const parsedAge = parseInt(player.age);
    if (!isNaN(parsedAge) && parsedAge !== 24) return parsedAge;
    
    const mockAges: Record<number, number> = {
      1: 8, 2: 10, 3: 21, 4: 19, 5: 22,
      6: 12, 7: 15, 8: 7, 9: 13, 10: 16,
      11: 18, 12: 23, 13: 20, 14: 25, 15: 11
    };
    return mockAges[player.id] || 16;
  };

  const ageGroups = [
    { category: "7-8", count: 0 },
    { category: "9-10", count: 0 },
    { category: "11-12", count: 0 },
    { category: "13-14", count: 0 },
    { category: "15-16", count: 0 },
    { category: "17-18", count: 0 },
    { category: "19-20", count: 0 },
    { category: "21+", count: 0 },
  ];

  players.forEach((player) => {
    const age = getPlayerAge(player);
    if (age >= 7 && age < 9) ageGroups[0].count++;
    else if (age >= 9 && age < 11) ageGroups[1].count++;
    else if (age >= 11 && age < 13) ageGroups[2].count++;
    else if (age >= 13 && age < 15) ageGroups[3].count++;
    else if (age >= 15 && age < 17) ageGroups[4].count++;
    else if (age >= 17 && age < 19) ageGroups[5].count++;
    else if (age >= 19 && age < 21) ageGroups[6].count++;
    else if (age >= 21) ageGroups[7].count++;
  });

  let evaluatedCount = 0;
  let expiredCount = 0;
  let needEvaluationCount = 0;

  players.forEach((player) => {
    const record = evaluationRecords[player.id];
    const evalDateStr = record?.date || player.evaluationDate || player.lastValidatedDate;

    if (!evalDateStr) {
      needEvaluationCount++;
    } else {
      const evalDate = new Date(evalDateStr);
      const currentDate = new Date();
      evalDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      
      const dueDate = new Date(evalDate.getTime());
      dueDate.setDate(dueDate.getDate() + 90);
      
      const diffTime = dueDate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        expiredCount++;
      } else {
        evaluatedCount++;
      }
    }
  });

  const evaluationStatusData = [
    { name: "Evaluated", value: evaluatedCount, color: "#10B981" },
    { name: "Need Evaluation", value: needEvaluationCount, color: "#3B82F6" },
    { name: "Expired", value: expiredCount, color: "#EF4444" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Bar Chart - Game Reports Engagement */}
      <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black uppercase text-white font-orbitron">Game Reports Engagement</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              />
              <Bar dataKey="value" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Age Category */}
      <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black uppercase text-white font-orbitron">Age Category</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageGroups} margin={{ top: 10, right: 15, left: 15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                interval={0}
                padding={{ left: 10, right: 10 }}
                tickMargin={8}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              />
              <Bar 
                dataKey="count" 
                name="Player Count"
                fill="#E31B23" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart - Evaluation Status */}
      <div className="space-y-6 bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black uppercase text-white font-orbitron">Player Evaluation Status</h3>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4">
          <div className="h-[300px] w-[300px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={evaluationStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                >
                  {evaluationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-xl">
            {evaluationStatusData.map((entry, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:border-white/10 transition-all">
                <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block leading-none mb-1">{entry.name}</span>
                  <span className="text-2xl font-black text-white font-orbitron block leading-none">{entry.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
