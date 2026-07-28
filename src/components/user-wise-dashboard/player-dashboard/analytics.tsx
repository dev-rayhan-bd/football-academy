"use client";
import React from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from "recharts";
import { 
  IconStar, 
  IconTarget, 
  IconCircleCheck, 
  IconChartBar,
  IconTrendingUp
} from "@tabler/icons-react";

const stats = [
  { label: "Overall Rating", value: "8.7", icon: IconStar },
  { label: "Goals", value: "39", icon: IconTarget },
  { label: "Assists", value: "33", icon: IconCircleCheck },
  { label: "Improvement", value: "+15%", icon: IconTrendingUp },
];

const fullPotentialData = [
  { subject: "Vision", A: 85, fullMark: 100 },
  { subject: "Strength", A: 75, fullMark: 100 },
  { subject: "Pace", A: 92, fullMark: 100 },
  { subject: "Stamina", A: 88, fullMark: 100 },
  { subject: "Shooting", A: 85, fullMark: 100 },
  { subject: "Passing", A: 82, fullMark: 100 },
];

const mentalAnalysisData = [
  { subject: "Creativity", A: 80, fullMark: 100 },
  { subject: "Leadership", A: 85, fullMark: 100 },
  { subject: "Confidence", A: 90, fullMark: 100 },
  { subject: "Composure", A: 82, fullMark: 100 },
  { subject: "Motivation", A: 88, fullMark: 100 },
  { subject: "Focus", A: 85, fullMark: 100 },
];

const skillsData = [
  { 
    title: "Pace", 
    percentage: 92, 
    color: "#00FF62",
    subMetrics: [
      { name: "Acceleration", value: 88, color: "#00FF62" },
      { name: "Sprint Speed", value: 70, color: "#00FF62" }
    ]
  },
  { 
    title: "Passing", 
    percentage: 82, 
    color: "#00FF62",
    subMetrics: [
      { name: "Vision", value: 90, color: "#FF1010" },
      { name: "Short Pass", value: 88, color: "#FF1010" },
      { name: "Long Pass", value: 89, color: "#FF1010" }
    ]
  },
  { 
    title: "Shooting", 
    percentage: 85, 
    color: "#00FF62",
    subMetrics: [
      { name: "Finishing", value: 79, color: "#00FF62" },
      { name: "Long Shots", value: 88, color: "#00FF62" },
      { name: "Penalties", value: 92, color: "#00FF62" }
    ]
  },
  { 
    title: "Physical", 
    percentage: 78, 
    color: "#FF1010",
    subMetrics: [
      { name: "Strength", value: 82, color: "#FF1010" },
      { name: "Stamina", value: 88, color: "#FF1010" },
      { name: "Jumping", value: 78, color: "#FF1010" }
    ]
  },
  { 
    title: "Defending", 
    percentage: 65, 
    color: "#00FF62",
    subMetrics: [
      { name: "Marking", value: 88, color: "#00FF62" },
      { name: "Interception", value: 79, color: "#00FF62" },
      { name: "Tackle", value: 82, color: "#00FF62" }
    ]
  },
  { 
    title: "Dribbling", 
    percentage: 88, 
    color: "#FF1010",
    subMetrics: [
      { name: "Balance", value: 96, color: "#FF1010" },
      { name: "Agility", value: 88, color: "#FF1010" },
      { name: "Ball Control", value: 65, color: "#FF1010" }
    ]
  },
];

const performanceTrend = [
  { month: "Sep", goals: 4, assists: 3, rating: 7.8 },
  { month: "Oct", goals: 6, assists: 5, rating: 8.2 },
  { month: "Nov", goals: 5, assists: 4, rating: 8.0 },
  { month: "Dec", goals: 7, assists: 6, rating: 8.5 },
  { month: "Jan", goals: 8, assists: 8, rating: 8.7 },
  { month: "Feb", goals: 9, assists: 7, rating: 9.0 },
];

export const PlayerAnalytics = () => {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-normal text-white uppercase tracking-tighter font-heading">
          Analytics
        </h1>
        <p className="text-gray-400 text-lg font-light tracking-tight">
          Track Your Performance and Improvement
        </p>
      </div>

      {/* Stats Grid */}
      <div className="p-8 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 group hover:border-white/10 transition-all duration-500">
              <div className="flex flex-col gap-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                  <stat.icon size={20} stroke={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-white tracking-tighter font-orbitron">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RadarCard 
          title="Full Potential" 
          subtitle="Physical & Technical Attributes" 
          data={fullPotentialData} 
          color="#FF1010" 
          score="81/100" 
          growth="+8%" 
        />
        <RadarCard 
          title="Mental Analysis" 
          subtitle="Psychological Performance Metrics" 
          data={mentalAnalysisData} 
          color="#00FF62" 
          score="82/100" 
          growth="+8%" 
        />
      </div>

      {/* Skills Analysis */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase font-heading">Skills Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, idx) => (
            <SkillCard key={idx} skill={skill} />
          ))}
        </div>
      </div>

      {/* Performance Trend */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase font-heading mb-10">Performance Trend</h2>
        <div className="space-y-4">
          {performanceTrend.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="text-lg font-bold text-white w-20">{item.month}</div>
              <div className="flex-1 grid grid-cols-3 gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Goals:</span>
                  <span className="text-white font-bold">{item.goals}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Assists:</span>
                  <span className="text-white font-bold">{item.assists}</span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Rating:</span>
                  <span className="text-white font-bold">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RadarCard = ({ title, subtitle, data, color, score, growth }: any) => (
  <div className="p-10 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl flex flex-col items-center">
    <div className="w-full mb-8">
      <h3 className="text-2xl font-bold text-white tracking-tight uppercase font-heading">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
    
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 12, fontWeight: 500 }} />
          <Radar
            name={title}
            dataKey="A"
            stroke={color}
            fill={color}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>

    <div className="w-full border-t border-white/10 pt-8 mt-4 flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Overall Score</p>
        <p className="text-sm text-gray-400 font-light italic">Growth vs last month</p>
      </div>
      <div className="text-right space-y-1">
        <p className="text-2xl font-bold font-orbitron" style={{ color }}>{score}</p>
        <p className="text-sm font-bold text-green-500">{growth}</p>
      </div>
    </div>
  </div>
);

const SkillCard = ({ skill }: any) => (
  <div className="p-8 rounded-[32px] border border-white/5 bg-[#0A0A0A]/60 flex flex-col items-center gap-8 group hover:border-white/10 transition-all duration-500">
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="58"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-white/5"
        />
        <circle
          cx="64"
          cy="64"
          r="58"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={364.4}
          strokeDashoffset={364.4 * (1 - skill.percentage / 100)}
          className="transition-all duration-1000 ease-out"
          style={{ color: skill.color }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white font-orbitron">{skill.percentage}%</span>
      </div>
    </div>

    <div className="w-full text-center space-y-6">
      <h4 className="text-xl font-bold text-white uppercase tracking-tight font-heading">{skill.title}</h4>
      <div className="space-y-4">
        {skill.subMetrics.map((metric: any, idx: number) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>{metric.name}</span>
              <span style={{ color: metric.color }}>{metric.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out" 
                style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
