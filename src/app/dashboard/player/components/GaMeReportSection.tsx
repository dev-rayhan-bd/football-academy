'use client'

import React, { useState } from 'react';
import { FileText, Eye, Plus, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePlayer } from "@/lib/hooks/usePlayer";
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function GameReportSection() {
  const router = useRouter();
  const { playerData } = usePlayer();
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const reports = useAppSelector(state => state.reports.reports);
  const requests = useAppSelector(state => state.reports.requests);

  // Filter completed reports for this player
  const completedReports = reports.filter(
    r => r.playerId === playerData.id || r.playerName === playerData.fullName
  );

  // Filter pending requests for this player
  const pendingRequests = requests.filter(
    req => req.playerId === playerData.id && req.status === 'Pending'
  );

  // Merge them for display in the table
  const displayRows = [
    ...completedReports.map(r => ({
      id: r.id,
      team2: `vs ${r.team2}`,
      rating: (r.rating * 10).toFixed(0),
      amount: r.amount,
      date: r.date,
      status: 'Paid',
      raw: r
    })),
    ...pendingRequests.map(req => ({
      id: req.id + 100000,
      team2: `Requested from ${req.coachName}`,
      rating: 'N/A',
      amount: '$ 6.99',
      date: req.date,
      status: 'Pending',
      raw: null
    }))
  ];

  const handleView = (row: any) => {
    if (row.raw) {
      setSelectedReport(row.raw);
      setIsOpen(true);
    }
  };

  return (
    <div className="py-16">
      <div className="w-full">
        {/* Main Card */}
        <div className="border border-white/10 bg-[#0A0A0A]/60 rounded-3xl p-8 shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white mb-1 uppercase italic font-orbitron">Game Reports</h1>
              <p className="text-gray-400 text-sm">Professional match performance analysis</p>
            </div>
            <button 
              onClick={() => router.push("/dashboard/player/game-reports/create")}
              className="px-4 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition flex items-center gap-2 text-xs uppercase tracking-widest font-orbitron cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Request Report
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {displayRows.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-sm italic">
                No game reports or requests found.
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-4 py-4 text-left">Report</th>
                    <th className="px-4 py-4 text-left">Rating</th>
                    <th className="px-4 py-4 text-left">Amount</th>
                    <th className="px-4 py-4 text-left">Date</th>
                    <th className="px-4 py-4 text-left">Status</th>
                    <th className="px-4 py-4 text-center">View</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((row) => (
                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                      <td className="px-4 py-6 text-sm">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-red-600 shrink-0" />
                          <span className="text-white font-bold font-orbitron">{row.team2}</span>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-sm font-bold text-red-500 font-orbitron">{row.rating}</td>
                      <td className="px-4 py-6 text-sm text-gray-300 font-orbitron">{row.amount}</td>
                      <td className="px-4 py-6 text-sm text-gray-400">{row.date}</td>
                      <td className="px-4 py-6 text-sm">
                        <div className="flex items-center gap-2">
                          {row.status === 'Paid' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-500 font-bold uppercase tracking-wider text-[10px] font-orbitron">Paid</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
                              <span className="text-orange-500 font-bold uppercase tracking-wider text-[10px] font-orbitron">Pending</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-sm text-center">
                        {row.raw ? (
                          <Eye 
                            onClick={() => handleView(row)}
                            className="w-5 h-5 text-red-600 hover:text-red-500 cursor-pointer transition mx-auto" 
                          />
                        ) : (
                          <span className="text-gray-600 text-xs italic font-orbitron">Requested</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Report Detail Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="bg-[#0A0A0A] border-white/10 p-6 text-white sm:max-w-xl overflow-y-auto">
          <SheetHeader className="mb-8">
            <div className="flex items-center justify-between">
              <Badge className="bg-red-600 text-white font-black italic uppercase tracking-tighter font-orbitron">
                Game Report Details
              </Badge>
              <div className="text-right">
                <div className="text-4xl font-black text-[#00FF62] italic font-orbitron">
                  {selectedReport ? (selectedReport.rating * 10).toFixed(0) : "0"}
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-orbitron">Scout Rating</div>
              </div>
            </div>
            <SheetTitle className="text-3xl font-black text-white uppercase italic tracking-tighter mt-4 font-orbitron">
              {selectedReport?.team1} vs {selectedReport?.team2}
            </SheetTitle>
            <SheetDescription className="text-gray-500 italic">
              Professional Performance Analysis by {selectedReport?.scoutName}
            </SheetDescription>
          </SheetHeader>

          {selectedReport && (
            <div className="space-y-8">
              {/* Core Info */}
              <div className="grid grid-cols-2 gap-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-orbitron">Position</div>
                  <div className="text-md font-bold text-white uppercase font-orbitron">{selectedReport.playerPosition}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-orbitron">Date</div>
                  <div className="text-md font-bold text-white uppercase font-orbitron">{selectedReport.date}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-orbitron">League</div>
                  <div className="text-md font-bold text-white uppercase font-orbitron">{selectedReport.league}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-orbitron">Score</div>
                  <div className="text-md font-bold text-red-600 italic font-orbitron">{selectedReport.score}</div>
                </div>
              </div>

              {/* Performance stats */}
              <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <FileText size={20} className="text-[#00FF62]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest font-orbitron">Performance Metrics</h3>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white italic font-orbitron">{selectedReport.goals}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-orbitron">Goals</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-3xl font-black text-white italic font-orbitron">{selectedReport.assists}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-orbitron">Assists</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-3xl font-black text-white italic font-orbitron">{selectedReport.passes}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-orbitron">Passes</div>
                  </div>
                </div>
              </div>

              {/* Scout Comments */}
              <div className="space-y-3">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-orbitron">Scout Analysis</div>
                <p className="text-sm text-gray-400 leading-relaxed italic bg-white/5 p-4 rounded-xl border border-white/5">
                  Player demonstrated high tactical intelligence, agility, and overall excellent pitch coverage. Displayed high confidence under pressure, quick transition capabilities, and outstanding distribution qualities.
                </p>
              </div>

              {/* Footer Info */}
              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest font-orbitron">
                <span>Report ID: #{selectedReport.id}</span>
                <span className="text-green-500">Status: {selectedReport.status}</span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
