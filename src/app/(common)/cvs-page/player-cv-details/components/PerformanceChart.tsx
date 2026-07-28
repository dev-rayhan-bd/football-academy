/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts'
import { usePlayer } from '@/lib/hooks/usePlayer'

interface ChartDataItem {
  name: string
  value: number
  color: string
}

interface PerformanceChartProps {
  title: string
  percentage: number
  data: ChartDataItem[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-primary/50 rounded px-3 py-2">
        <p className="text-white text-sm font-medium">{payload[0].payload.name}</p>
        <p className="text-primary text-sm">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

const PerformanceChart = ({ title, percentage, data }: PerformanceChartProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-xl md:text-2xl font-heading font-normal mb-6 uppercase tracking-widest text-primary/90">
        {title}
      </h3>
      <div className="w-full aspect-square max-w-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="95%"
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                value={`${percentage}%`}
                position="center"
                fill="white"
                className="text-4xl md:text-6xl font-black"
              />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Enhanced Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm md:text-base font-bold text-white uppercase tracking-wider">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const getHexColor = (val: number) => {
  if (val >= 80) return "#22c55e";
  if (val >= 60) return "#eab308";
  return "#ef4444";
};

export function PerformanceAnalytics() {
  const { playerData } = usePlayer();

  const skillData = (playerData.skillsCategories || []).map((cat: any) => {
    const avg = Math.round(cat.skills.reduce((sum: number, s: any) => sum + s.value, 0) / cat.skills.length);
    return {
      name: cat.category,
      value: avg,
      color: getHexColor(avg)
    };
  });

  const skillsAvg = skillData.length > 0 
    ? Math.round(skillData.reduce((sum, d) => sum + d.value, 0) / skillData.length)
    : 0;

  const footData = [
    { name: 'Right Foot', value: playerData.rightLegUsage || 0, color: getHexColor(playerData.rightLegUsage || 0) },
    { name: 'Left Foot', value: playerData.leftLegUsage || 0, color: getHexColor(playerData.leftLegUsage || 0) },
  ];

  // Derive head from skills if available
  const headingSkill = (playerData.skillsCategories || [])
    .flatMap((c: any) => c.skills)
    .find((s: any) => s.name === "Heading" || s.name === "Jumping");
  
  if (headingSkill) {
    footData.push({ name: 'Heading', value: headingSkill.value, color: getHexColor(headingSkill.value) });
  }

  const footAvg = footData.length > 0 
    ? Math.round(footData.reduce((sum, d) => sum + d.value, 0) / footData.length)
    : 0;

  const roleData = [
    { name: 'Midfield', value: 45, color: '#0077FF' },
    { name: 'Attack', value: 40, color: '#FF1010' },
    { name: 'Defense', value: 15, color: '#00FF62' },
  ];

  return (
    <div className="mt-20 container">
      <h1 className="text-4xl font-light font-heading text-center mb-12 text-foreground">
        PERFORMANCE ANALYTICS
      </h1>

      <div className=" bg-black/30 rounded-2xl p-6 md:p-10">
        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-start">
          {/* Chart 1 - Skills */}
          <div className="flex justify-center">
            <PerformanceChart
              title="Skills"
              percentage={skillsAvg}
              data={skillData}
            />
          </div>

          {/* Chart 2 - Role */}
          <div className="flex justify-center">
            <PerformanceChart
              title="Role"
              percentage={90}
              data={roleData}
            />
          </div>
        </div>

        {/* Chart 3 - Foot (Bottom Center) */}
        <div className="flex justify-center">
          <div className="mb-12">
            <PerformanceChart
              title="Foot"
              percentage={footAvg}
              data={footData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
