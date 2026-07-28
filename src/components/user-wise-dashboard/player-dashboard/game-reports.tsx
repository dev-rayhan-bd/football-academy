"use client";
import React from "react";
import {
  IconFileText,
  IconStar,
  IconCircleCheck,
  IconClock,
  IconCreditCard,
  IconPlus,
  IconEye,
  IconDownload,
  IconReportAnalytics
} from "@tabler/icons-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import { MatchStats } from "@/lib/constants/reports";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks/reduxHooks";

export const GameReports = () => {
  const reports = useAppSelector(state => state.reports.reports);
  const [selectedReport, setSelectedReport] = React.useState<MatchStats | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<'All' | 'Paid' | 'Pending'>('All');

  const totalReports = reports.length;
  const paidReports = reports.filter(r => r.status === "Paid");
  const avgRating = paidReports.length > 0
    ? (paidReports.reduce((sum, r) => sum + r.rating, 0) / paidReports.length).toFixed(1)
    : "0.0";
  const completed = paidReports.length;
  const pending = reports.filter(r => r.status === "Pending").length;

  const stats = [
    { label: "Total Reports", value: totalReports.toString(), icon: IconFileText },
    { label: "Average Rating", value: avgRating, icon: IconStar },
    { label: "Completed", value: completed.toString(), icon: IconCircleCheck },
    { label: "Pending", value: pending.toString(), icon: IconClock },
  ];

  const handleView = (report: MatchStats) => {
    setSelectedReport(report);
    setIsOpen(true);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-normal text-white uppercase tracking-tighter font-heading">
            Game Reports
          </h1>
          <p className="text-gray-400 text-lg font-light tracking-tight">
            Professional Performance Analysis
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href={"/dashboard/player/game-reports/create"}>
            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-wider">
              <IconReportAnalytics size={18} stroke={1.5} />
              Create New Report
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-8 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 group hover:border-white/10 transition-all duration-500"
            >
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

      {/* Filter Section */}
      <div className="flex items-center gap-4 px-2">
        {(['All', 'Paid', 'Pending'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border",
              statusFilter === status 
                ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20" 
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              <th className="pb-6 pl-4">Report</th>
              <th className="pb-6">Rating</th>
              <th className="pb-6">Amount</th>
              <th className="pb-6">Approval Date</th>
              <th className="pb-6">Status</th>
              <th className="pb-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {reports
              .filter(item => statusFilter === 'All' || item.status === statusFilter)
              .map((item) => (
              <tr key={item.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                <td className="py-6 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500">
                      <IconFileText size={18} stroke={1.5} />
                    </div>
                    <span className="text-white font-bold">vs {item.team2}</span>
                  </div>
                </td>
                <td className="py-6">
                  <span className="text-red-600 font-bold">{item.rating.toFixed(1)}</span>
                </td>
                <td className="py-6 text-gray-300">
                  {item.amount}
                </td>
                <td className="py-6 text-gray-400">
                  {item.date}
                </td>
                <td className="py-6">
                  <div className={`flex items-center gap-2 ${item.status === 'Paid' ? 'text-green-500' : 'text-orange-500'}`}>
                    {item.status === 'Paid' ? <IconCircleCheck size={16} /> : <IconClock size={16} />}
                    <span className="text-xs font-bold uppercase tracking-wider">{item.status}</span>
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleView(item)}
                      className="text-red-600 hover:text-red-400 transition-colors"
                    >
                      <IconEye size={18} stroke={1.5} />
                    </button>
                    <button className="text-white hover:text-gray-300 transition-colors">
                      <IconDownload size={18} stroke={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Detail Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="bg-black border-white/10 p-5 text-white sm:max-w-xl overflow-y-auto">
          <SheetHeader className="mb-8">
            <div className="flex items-center justify-between">
              <Badge className="bg-red-600 text-white font-black italic uppercase tracking-tighter">
                Game Report Details
              </Badge>
              <div className="text-right">
                <div className="text-4xl font-black text-[#00FF62] italic">{selectedReport?.rating.toFixed(1)}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Scout Rating</div>
              </div>
            </div>
            <SheetTitle className="text-3xl font-black text-white uppercase italic tracking-tighter mt-4">
              {selectedReport?.team1} vs {selectedReport?.team2}
            </SheetTitle>
            <SheetDescription className="text-gray-500 italic">
              Professional Performance Analysis by {selectedReport?.scoutName}
            </SheetDescription>
          </SheetHeader>

          {selectedReport && (
            <div className="space-y-10">
              {/* Core Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Position</div>
                  <div className="text-lg font-bold text-white uppercase">{selectedReport.playerPosition}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Date</div>
                  <div className="text-lg font-bold text-white uppercase">{selectedReport.date}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">League</div>
                  <div className="text-lg font-bold text-white uppercase">{selectedReport.league}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</div>
                  <div className="text-lg font-bold text-red-600 italic">{selectedReport.score}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <IconReportAnalytics size={20} className="text-[#00FF62]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Performance Metrics</h3>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white italic">{selectedReport.goals}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Goals</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-3xl font-black text-white italic">{selectedReport.assists}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Assists</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-3xl font-black text-white italic">{selectedReport.passes}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Passes</div>
                  </div>
                </div>
              </div>

              {/* Scout Analysis Placeholder */}
              <div className="space-y-3">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Scout Analysis</div>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  {selectedReport.status === 'Paid'
                    ? "Player showed excellent awareness and positioning. Particularly strong in distribution and organizing the defensive line. Demonstrated high tactical intelligence and composure under pressure."
                    : "Analysis pending payment and scout review. Full report will be available once the professional evaluation is complete."}
                </p>
              </div>

              {/* Footer Info */}
              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Report ID: #{selectedReport.id}</span>
                <span className={selectedReport.status === 'Paid' ? 'text-green-500' : 'text-orange-500'}>
                  Status: {selectedReport.status}
                </span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
