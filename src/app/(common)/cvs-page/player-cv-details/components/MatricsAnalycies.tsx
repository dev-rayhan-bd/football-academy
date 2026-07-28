/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { usePlayerStats } from './FullEditablePage'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useUpdatePlayerProfileMutation } from '@/lib/features/cv/cvApi'
import { CMSField } from '@/components/shared/CMSField'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface MetricRow {
  category: string
  score: number
  trend: number
  grade: 'Excellent' | 'Good' | 'Average' | 'Average'
}

const getGrade = (score: number): 'Excellent' | 'Good' | 'Average' => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  return 'Average';
};

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'Excellent': return 'bg-[#22c55e] text-white'; // Green
    case 'Good': return 'bg-[#eab308] text-white';      // Yellow
    case 'Average': return 'bg-[#ef4444] text-white';      // Red
    default: return 'bg-gray-500 text-white';
  }
};

const getProgressColor = (grade: string) => {
  switch (grade) {
    case 'Excellent': return '[&>div]:bg-[#22c55e]';
    case 'Good': return '[&>div]:bg-[#eab308]';
    case 'Average': return '[&>div]:bg-[#ef4444]';
    default: return '[&>div]:bg-gray-500';
  }
};

const METRIC_CATEGORIES = ['Perception', 'Vision']

export function MetricsAnalysis({ editable = false }: { editable?: boolean }) {
  const [updatePlayer] = useUpdatePlayerProfileMutation();
  const [activeTab, setActiveTab] = useState('Perception')
  const [metricsData, setMetricsData] = useState<Record<string, MetricRow[]>>({
    Perception: [
      { category: 'Space Awareness', score: 92, trend: 3, grade: 'Excellent' },
      { category: 'Opponent Reading', score: 88, trend: 5, grade: 'Good' },
      { category: 'Game Flow Understanding', score: 85, trend: 2, grade: 'Good' },
      { category: 'Pressure Handling', score: 90, trend: 4, grade: 'Excellent' },
    ],
    Vision: [
      { category: 'Peripheral Vision', score: 87, trend: 3, grade: 'Good' },
      { category: 'Focus Control', score: 92, trend: 2, grade: 'Excellent' },
      { category: 'Pattern Recognition', score: 89, trend: 4, grade: 'Good' },
      { category: 'Decision Speed', score: 91, trend: 5, grade: 'Excellent' },
      { category: 'Visual Acuity', score: 86, trend: 1, grade: 'Good' },
    ],
  })

  const { setMetricsAvg, role } = usePlayerStats();

  useEffect(() => {
    const allRows = Object.values(metricsData).flat();
    const avg = allRows.reduce((sum, r) => sum + r.score, 0) / allRows.length;
    setMetricsAvg(Math.round(avg));
  }, [metricsData, setMetricsAvg]);

  const handleUpdate = async (tab: string, idx: number, field: keyof MetricRow, value: any) => {
    const metricName = metricsData[tab][idx].category;

    setMetricsData(prev => {
      const newData = { ...prev };
      const row = { ...newData[tab][idx] };

      if (field === 'score') {
        const score = Math.max(0, Math.min(100, parseInt(value) || 0));
        row.score = score;
        row.grade = getGrade(score);
      } else if (field === 'trend') {
        row.trend = Math.max(0, parseInt(value) || 0);
      } else {
        (row as any)[field] = value;
      }

      newData[tab][idx] = row;
      return newData;
    });

    try {
      await updatePlayer({
        id: "current-player",
        data: { [`metrics.${tab}.${metricName}.${field}`]: value }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground mb-12 tracking-wider">
          DETAILED ANALYSIS METRICS
        </h2>

        <div className="border border-border rounded-lg  p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 p-1 rounded-full">
              {METRIC_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full text-base font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-black data-[state=inactive]:text-foreground uppercase tracking-widest py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab}>
              <Table className="border border-border">
                <TableHeader>
                  <TableRow className="border-border bg-white/5">
                    <TableHead className="border-r border-border text-gray-400 font-black uppercase tracking-wider h-14">
                      Category
                    </TableHead>
                    <TableHead className="text-center border-r border-border text-gray-400 font-black uppercase tracking-wider h-14">
                      Score (0-100)
                    </TableHead>
                    <TableHead className="text-center border-r border-border text-gray-400 font-black uppercase tracking-wider h-14">
                      Trend
                    </TableHead>
                    <TableHead className="text-right text-gray-400 font-black uppercase tracking-wider h-14">
                      Grade
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {metricsData[activeTab].map((metric, idx) => (
                    <TableRow
                      key={idx}
                      className="border-b border-border hover:bg-[#262626] transition-colors"
                    >
                      <TableCell className="border-r border-border py-4">
                        <CMSField
                          value={metric.category}
                          onUpdate={(val) => handleUpdate(activeTab, idx, 'category', val)}
                          canEdit={editable}
                          className="w-full font-bold text-base uppercase text-gray-200"
                          inputClassName="text-base font-bold uppercase"
                        />
                      </TableCell>

                      <TableCell className="border-r border-border min-w-[250px]">
                        <div className="flex items-center justify-between gap-2">
                          <div className="relative flex-1 min-w-0 flex items-center h-2 group translate-y-[5px]">
                            {editable ? (
                              <>
                                <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                                  <div
                                    className={cn(
                                      "h-full transition-all duration-300 ease-out",
                                      metric.score >= 80 ? "bg-[#22c55e]" : metric.score >= 60 ? "bg-[#eab308]" : "bg-[#ef4444]"
                                    )}
                                    style={{ width: `${metric.score}%` }}
                                  />
                                </div>
                                {/* Visible Slider on Hover */}
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={metric.score}
                                  onChange={(e) =>
                                    handleUpdate(activeTab, idx, 'score', parseInt(e.target.value))
                                  }
                                  style={{
                                    background: `linear-gradient(to right, ${metric.score >= 80 ? '#22c55e' : metric.score >= 60 ? '#eab308' : '#ef4444'} ${metric.score}%, #333 ${metric.score}%)`,
                                  }}
                                  className={cn(
                                    "w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100",
                                    metric.score >= 80 ? "accent-[#22c55e]" : metric.score >= 60 ? "accent-[#eab308]" : "accent-[#ef4444]"
                                  )}
                                />
                                {/* Always Active Invisible Slider for Dragging */}
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={metric.score}
                                  onChange={(e) =>
                                    handleUpdate(activeTab, idx, 'score', parseInt(e.target.value))
                                  }
                                  className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                                />
                              </>
                            ) : (
                              <Progress
                                value={metric.score}
                                className="w-full h-1.5"
                                style={{ backgroundColor: '#333' }}
                                indicatorClassName={metric.score >= 80 ? "bg-[#22c55e]" : metric.score >= 60 ? "bg-[#eab308]" : "bg-[#ef4444]"}
                              />
                            )}
                          </div>
                          <div className="shrink-0">
                            <CMSField
                              value={metric.score}
                              onUpdate={(val) => handleUpdate(activeTab, idx, 'score', val)}
                              canEdit={editable}
                              isNumeric
                              className="font-black text-lg justify-end"
                              style={{ color: metric.score >= 80 ? '#22c55e' : metric.score >= 60 ? '#eab308' : '#ef4444' }}
                              inputClassName="text-right w-16 text-lg bg-gray-900 border-gray-700 font-black"
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-center border-r border-border">
                        <div className="flex justify-center items-center gap-1">
                          <span className="text-primary font-black text-base">+</span>
                          <CMSField
                            value={metric.trend}
                            onUpdate={(val) => handleUpdate(activeTab, idx, 'trend', val)}
                            canEdit={editable}
                            isNumeric
                            className="text-primary font-black text-base"
                            inputClassName="w-14 text-center text-base font-black"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <Badge
                          className={`font-black text-sm min-w-[100px] py-1.5 justify-center uppercase tracking-tighter ${getGradeColor(metric.grade)} shadow-md`}
                        >
                          {metric.grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
