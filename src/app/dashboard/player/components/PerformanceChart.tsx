'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

import { usePlayer } from "@/lib/hooks/usePlayer";
import { useAppSelector } from "@/lib/hooks/reduxHooks";

export default function PerformanceChart() {
  const { playerData } = usePlayer();
  const reports = useAppSelector(state => state.reports.reports);

  const paidReports = reports.filter(r => r.status === "Paid");
  
  const totalGoals = paidReports.reduce((sum, r) => sum + r.goals, 0);
  const totalAssists = paidReports.reduce((sum, r) => sum + r.assists, 0);
  const totalMatches = paidReports.length;

  const avgPassAccuracy = totalMatches > 0 
    ? Math.round(paidReports.reduce((sum, r) => sum + r.passAccuracy, 0) / totalMatches)
    : 0;

  const radarData = [
    { subject: 'Vision', value: playerData.strengths.passing },
    { subject: 'Strength', value: playerData.strengths.physical },
    { subject: 'Pace', value: playerData.strengths.pace },
    { subject: 'Passing', value: playerData.strengths.passing },
    { subject: 'Shooting', value: playerData.strengths.shooting },
    { subject: 'Dribbling', value: playerData.strengths.dribbling }
  ]

  const stats = [
    { label: 'Goals', value: totalGoals.toString() },
    { label: 'Assists', value: totalAssists.toString() },
    { label: 'Matches', value: totalMatches.toString() }
  ]

  const accuracyMetrics = [
    { label: 'Pass Accuracy', value: avgPassAccuracy },
    { label: 'Shot Accuracy', value: playerData.performanceMetrics.shootAccuracy },
    { label: 'Dribble Success', value: playerData.performanceMetrics.dribbleSuccess }
  ]

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl font-heading text-white mb-2">Performance Analytics</h1>
            <p className="text-gray-400">Season 2024/25</p>
          </div>
          <button className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition">
            Full Analytics
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-12">
          {/* Left - Radar Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid stroke="#333333" />
                <PolarAngleAxis dataKey="subject" stroke="#666666" tick={{ fill: '#999999', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#333333" tick={{ fill: '#666666', fontSize: 12 }} />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#dc2626"
                  fill="#991b1b"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Right - Stats and Metrics */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
                  <p className="text-red-600 text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Accuracy Metrics */}
            <div className="space-y-6">
              {accuracyMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">{metric.label}</span>
                    <span className="text-red-600 font-bold">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-600 h-full rounded-full transition-all"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
