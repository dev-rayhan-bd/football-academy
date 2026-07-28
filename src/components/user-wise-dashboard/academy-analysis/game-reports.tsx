"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  IconSearch,
  IconClock,
  IconUsers,
  IconTrash,
  IconStar,
  IconTrendingUp,
  IconFileText,
  IconDownload,
  IconX,
  IconCheck,
  IconLoader2
} from "@tabler/icons-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import logo from "@/assets/sort_logo.png";

import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { MatchStats } from "@/lib/constants/reports";
import { RadarChart } from "@/components/user-wise-dashboard/coach-dashboard/create-game-report/RadarChart";

const getPlayerTag = (player: any) => {
  if (player.fullName === "Marcus Silva") return "U-15";
  if (player.fullName === "Sarah Williams") return "U-16";
  if (player.fullName === "David Chen") return "U-17";
  if (player.fullName === "Alex Jonson" || player.fullName === "Alex Jordan") return "U-17";
  if (player.fullName === "James Brown") return "U-19";
  
  const ageNum = parseInt(player.age);
  if (!isNaN(ageNum)) {
    return `U-${ageNum}`;
  }
  return "U-15";
};

// Map individual report details to the 24 stats for the detailed report view
const getStatsFromReport = (report: MatchStats) => {
  const isGK = report.playerPosition?.toUpperCase() === "GOALKEEPER";
  if (isGK) {
    return {
      shotsOnGoal: 0,
      goalScored: report.goals || 0,
      assists: report.assists || 0,
      passAccurate: report.passes || 50,
      wrongPass: Math.round((report.passes || 50) * (1 - (report.passAccuracy || 90) / 100)) || 5,
      penaltiesTaken: 0,
      standTackle: 0,
      slidingTackle: 0,
      interception: 0,
      savesAccurate: 10,
      freeKick: 0,
      cornerKick: 0,
      goalUnsave: 1,
      penaltiesSaves: 1,
      appearances: 1,
      fault: 1,
      redCard: report.redCards || 0,
      yellowCard: report.yellowCards || 0,
      punching: 5,
      handling: 10,
      reflex: 8,
      aerialAbility: 7,
      throwing: 8,
      reactions: 9
    };
  } else {
    return {
      shotsOnGoal: (report.goals || 0) + 3,
      goalScored: report.goals || 0,
      assists: report.assists || 0,
      passAccurate: report.passes || 80,
      wrongPass: Math.round((report.passes || 80) * (1 - (report.passAccuracy || 90) / 100)) || 8,
      penaltiesTaken: 1,
      standTackle: 6,
      slidingTackle: 4,
      interception: 8,
      savesAccurate: 0,
      freeKick: 3,
      cornerKick: 4,
      goalUnsave: 0,
      penaltiesSaves: 0,
      appearances: 1,
      fault: 2,
      redCard: report.redCards || 0,
      yellowCard: report.yellowCards || 0,
      punching: 0,
      handling: 0,
      reflex: 0,
      aerialAbility: 5,
      throwing: 0,
      reactions: 8
    };
  }
};

const SummaryCard = ({ label, value, icon: Icon, bgColor, textColor }: { label: string, value: string | number, icon: any, bgColor: string, textColor: string }) => (
  <div className="bg-[#0A0A0A] border border-white/20 rounded-[20px] p-5 flex items-center gap-4 flex-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} bg-opacity-20 border border-white/20 flex-shrink-0`}>
      {Icon && <Icon size={24} className={`${textColor} opacity-100`} stroke={2} />}
    </div>
    <div className="space-y-0.5">
      <p className="text-white/40 text-[11px] font-medium leading-none">{label}</p>
      <p className="text-white text-2xl font-bold font-orbitron">{value}</p>
    </div>
  </div>
);

const GameReportCard = ({ 
  tag, 
  playerName, 
  date, 
  coach, 
  rating, 
  goals, 
  assists, 
  passes, 
  pos, 
  tier,
  team1,
  team2,
  onClick
}: any) => {
  const displayRating = rating <= 10 ? rating * 10 : rating;
  return (
    <div 
      onClick={onClick}
      className="bg-[#111111] border border-white/20 rounded-3xl p-6 flex flex-col gap-6 group hover:border-white/40 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <span className="bg-white/5 border border-white/20 rounded-full px-4 py-1 text-[10px] font-bold text-white/60">{tag}</span>
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider truncate max-w-[160px]">{team1} vs {team2}</span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold">
          <IconClock size={12} /> {date}
        </div>
        <h3 className="text-white text-xl font-black font-orbitron group-hover:text-[#E31B23] transition-colors">{playerName}</h3>
        <p className="text-white/40 text-[10px] font-bold flex items-center gap-1">
          <IconUsers size={12} /> Scout: {coach}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <p className="text-white/40 text-[10px] font-bold uppercase">Overall Performance:</p>
          <p className="text-white/60 text-[10px] font-bold">({displayRating.toFixed(0)}% / 100%)</p>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-sky-400" 
            style={{ width: `${displayRating}%` }} 
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
               <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 flex items-center justify-center p-[1px]">
                 <div className="w-full h-full bg-emerald-400 rounded-full" />
               </div>
               {goals} G
            </div>
            <div className="flex items-center gap-1.5 text-yellow-400 text-[10px] font-bold">
               <div className="w-2.5 h-2.5 rounded-full border-2 border-yellow-400 flex items-center justify-center p-[1px]">
                 <div className="w-full h-full bg-yellow-400 rounded-full" />
               </div>
               {assists} A
            </div>
            <div className="flex items-center gap-1.5 text-sky-400 text-[10px] font-bold">
               <div className="w-2.5 h-2.5 rounded-full border-2 border-sky-400 flex items-center justify-center p-[1px]">
                 <div className="w-full h-full bg-sky-400 rounded-full" />
               </div>
               {passes} P
            </div>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-white/40 text-[10px] font-bold uppercase">{pos} · {tier}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toast.info("Deletion is managed on the coach dashboard.");
              }}
              className="text-red-500/40 hover:text-red-500 transition-colors cursor-pointer animate-none"
            >
               <IconTrash size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};

export const GameReports = () => {
  const players = useAppSelector((state) => state.player.players);
  const reports = useAppSelector((state) => state.reports.reports);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Map Redux game reports to component view format
  const mappedReports = reports.map((report) => {
    const player = report.playerId ? players.find(p => p.id === report.playerId) : undefined;
    
    const pName = player?.fullName || report.playerName || "Marcus Silva";
    const pPos = player?.position || report.playerPosition || "Defensive Midfielder";
    const pTag = player ? getPlayerTag(player) : "U-15";
    const tier = player?.validationStatus === "verified" ? "TIER 1" : "TIER 2";

    // Format date: "YYYY-MM-DD" -> "MMM DD, YYYY"
    let formattedDate = report.date;
    try {
      const d = new Date(report.date);
      formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch (e) {}

    return {
      ...report,
      playerName: pName,
      playerPosition: pPos,
      tag: pTag,
      tier,
      dateFormatted: formattedDate
    };
  });

  const filteredReports = mappedReports.filter(report => 
    report.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.playerPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.scoutName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.team2.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Summary Stats
  const totalReportsCount = mappedReports.length;
  const avgRatingVal = totalReportsCount > 0 
    ? (mappedReports.reduce((sum, r) => {
        const ratingNum = r.rating <= 10 ? r.rating * 10 : r.rating;
        return sum + ratingNum;
      }, 0) / totalReportsCount).toFixed(1)
    : "0.0";
  const totalGoalsVal = mappedReports.reduce((sum, r) => sum + (r.goals || 0), 0);
  const totalAssistsVal = mappedReports.reduce((sum, r) => sum + (r.assists || 0), 0);

  // Retrieve stats and radar mappings for selected card
  const activeStats = selectedCard ? getStatsFromReport(selectedCard) : null;
  
  const mapStat = (val: number, maxVal = 15) => {
    return Math.min(99, Math.max(50, Math.round(50 + (val / maxVal) * 49)));
  };

  const isGK = selectedCard?.playerPosition?.toUpperCase() === "GOALKEEPER";
  const radarStats = selectedCard && activeStats
    ? (isGK
      ? [
          { label: "DIV", value: mapStat((activeStats.reflex || 0) + (activeStats.savesAccurate || 0), 25) },
          { label: "HAN", value: mapStat((activeStats.handling || 0) + (activeStats.punching || 0), 25) },
          { label: "KIC", value: mapStat((activeStats.throwing || 0) + (activeStats.passAccurate || 0), 25) },
          { label: "REF", value: mapStat((activeStats.reflex || 0) + (activeStats.penaltiesSaves || 0) * 5, 20) },
          { label: "SPD", value: mapStat((activeStats.reactions || 0) + (activeStats.appearances || 0), 25) },
          { label: "POS", value: mapStat((activeStats.aerialAbility || 0) + (activeStats.savesAccurate || 0), 25) }
        ]
      : [
          { label: "PAC", value: mapStat((activeStats.reactions || 0) + (selectedCard.characteristics?.includes("FAST") ? 8 : 4), 20) },
          { label: "SHO", value: mapStat((activeStats.goalScored || 0) * 3 + (activeStats.shotsOnGoal || 0) + (activeStats.penaltiesTaken || 0), 25) },
          { label: "PAS", value: mapStat((activeStats.assists || 0) * 2 + (activeStats.passAccurate || 0), 25) },
          { label: "DRI", value: mapStat((activeStats.passAccurate || 0) + (selectedCard.characteristics?.includes("SKILLFUL") ? 8 : 4), 20) },
          { label: "DEF", value: mapStat((activeStats.standTackle || 0) + (activeStats.slidingTackle || 0) + (activeStats.interception || 0), 30) },
          { label: "PHY", value: mapStat((activeStats.appearances || 0) + (activeStats.savesAccurate || 0), 30) }
        ])
    : [];

  const overallPercent = radarStats.length > 0
    ? Math.round(radarStats.reduce((sum, s) => sum + s.value, 0) / radarStats.length)
    : 0;

  // Download PDF Report
  const handleDownloadPDF = async () => {
    const page = document.getElementById("report-page-1");
    if (!selectedCard || !page) {
      toast.error("Report elements not found in DOM.");
      return;
    }

    const toastId = toast.loading("Generating PDF report... Please wait.");
    setIsGeneratingPdf(true);

    const originalGetComputedStyle = window.getComputedStyle;
    const dummy = document.createElement("div");
    dummy.style.display = "none";
    document.body.appendChild(dummy);

    const convertModernColor = (value: string) => {
      if (typeof value !== "string") return value;
      if (!value.includes("oklch") && !value.includes("lab") && !value.includes("oklab") && !value.includes("lch")) {
        return value;
      }
      return value.replace(/(oklch|oklab|lab|lch)\([^)]+\)/g, (match) => {
        try {
          dummy.style.color = match;
          const resolved = originalGetComputedStyle(dummy).color;
          if (resolved && (resolved.startsWith("rgb") || resolved.startsWith("#"))) {
            return resolved;
          }
          return "rgb(0, 0, 0)";
        } catch {
          return "rgb(0, 0, 0)";
        }
      });
    };

    window.getComputedStyle = function (el, pseudoEl) {
      const style = originalGetComputedStyle(el, pseudoEl);
      return new Proxy(style, {
        get(target, prop) {
          if (prop === "getPropertyValue") {
            return (propertyName: string) => {
              const val = target.getPropertyValue(propertyName);
              return convertModernColor(val);
            };
          }
          if (typeof prop === "string") {
            const targetRecord = target as unknown as Record<string, unknown>;
            const val = targetRecord[prop];
            if (typeof val === "string") {
              return convertModernColor(val);
            }
            if (typeof val === "function") {
              return (val as Function).bind(target);
            }
            return val;
          }
          const targetRecord = target as unknown as Record<string | symbol, unknown>;
          return targetRecord[prop];
        },
      });
    };

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = 297;

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.save(`Game_Report_${selectedCard.playerName.replace(/\s+/g, "_")}.pdf`);
      toast.success("PDF report downloaded successfully!", { id: toastId });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF.", { id: toastId });
    } finally {
      window.getComputedStyle = originalGetComputedStyle;
      if (dummy.parentNode) {
        dummy.parentNode.removeChild(dummy);
      }
      setIsGeneratingPdf(false);
    }
  };

  const matchingPlayer = selectedCard ? players.find((p) => p.id === selectedCard.playerId) : null;
  const playerImgSrc = selectedCard
    ? (typeof matchingPlayer?.playerImage === "string"
        ? matchingPlayer.playerImage
        : (matchingPlayer?.playerImage?.src || "/ronaldo.png"))
    : "/ronaldo.png";

  // Sidebar Aggregations
  // 1. Top Performers (by average rating)
  const topPerformers = [...mappedReports]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // 2. Top Scorers (by cumulative goals in reports)
  const goalMap: Record<string, { name: string, goals: number, pos: string, team: string }> = {};
  mappedReports.forEach(r => {
    if (r.playerName) {
      if (!goalMap[r.playerName]) {
        goalMap[r.playerName] = { name: r.playerName, goals: 0, pos: r.playerPosition, team: r.tag };
      }
      goalMap[r.playerName].goals += (r.goals || 0);
    }
  });
  const topScorers = Object.values(goalMap)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Game Reports</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">Professional player match performance analysis and scout records</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard label="Avg. Match Rating" value={`${avgRatingVal}%`} icon={IconStar} bgColor="bg-sky-500" textColor="text-sky-500" />
        <SummaryCard label="Total Goals" value={totalGoalsVal} icon={IconTrendingUp} bgColor="bg-emerald-500" textColor="text-emerald-500" />
        <SummaryCard label="Total Assists" value={totalAssistsVal} icon={IconFileText} bgColor="bg-blue-500" textColor="text-blue-500" />
        <SummaryCard label="Total Reports" value={totalReportsCount} icon={IconUsers} bgColor="bg-yellow-500" textColor="text-yellow-500" />
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <Input 
                placeholder="Search reports by player name, scout, team, or position..." 
                className="bg-[#111111] border-white/10 h-12 rounded-xl pl-12 text-white/60 font-medium" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Reports Grid */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Scouting Reports</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredReports.map((report, idx) => (
                <GameReportCard 
                  key={report.id ? `${report.id}-${idx}` : `report-${idx}`}
                  tag={report.tag}
                  playerName={report.playerName}
                  date={report.dateFormatted}
                  coach={report.scoutName}
                  rating={report.rating}
                  goals={report.goals}
                  assists={report.assists}
                  passes={report.passes}
                  pos={report.playerPosition}
                  tier={report.tier}
                  team1={report.team1}
                  team2={report.team2}
                  onClick={() => setSelectedCard(report)}
                />
              ))}
              {filteredReports.length === 0 && (
                <div className="col-span-full text-center py-16 border border-white/5 rounded-3xl bg-[#111111]/50 text-white/40 font-medium">
                  No match reports found matching search query.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[340px] flex flex-col gap-8 shrink-0">
           {/* Top Scorers */}
           <div className="bg-[#111111] border border-white/20 rounded-[32px] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                    <IconTrendingUp size={20} className="text-white" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Top Scorers</h2>
              </div>
              <div className="space-y-4">
                 {topScorers.map((player, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <IconFileText size={16} className="text-sky-400" />
                         <div>
                            <p className="text-white text-sm font-black">{player.name}</p>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{player.team} · {player.pos}</p>
                         </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 bg-emerald-100 bg-opacity-20">
                        {player.goals} Goals
                      </span>
                   </div>
                 ))}
                 {topScorers.length === 0 && (
                   <p className="text-white/40 text-xs text-center py-4">No goals recorded yet.</p>
                 )}
              </div>
           </div>

           {/* Top Performers */}
           <div className="bg-[#111111] border border-white/20 rounded-[32px] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    <IconStar size={20} className="text-sky-500" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Top Performers</h2>
              </div>
              <div className="space-y-6">
                 {topPerformers.map((report, i) => {
                   const displayRating = report.rating <= 10 ? report.rating * 10 : report.rating;
                   return (
                     <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <span className="text-sky-500 text-[10px] font-black font-orbitron">#{i+1}</span>
                           <div>
                              <p className="text-white text-sm font-bold">{report.playerName}</p>
                              <p className="text-white/40 text-[10px] font-bold uppercase">{report.tag} · {report.playerPosition}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-1 text-white text-[10px] font-black font-orbitron">
                           <IconStar size={14} className="text-sky-500 fill-sky-500/20" />
                           {displayRating.toFixed(0)}%
                        </div>
                     </div>
                   );
                 })}
                 {topPerformers.length === 0 && (
                   <p className="text-white/40 text-xs text-center py-4">No reports recorded yet.</p>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Game Report Preview Modal */}
      <Dialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
        <DialogContent 
          showCloseButton={false}
          className="!w-screen !h-screen !max-w-none !max-h-none !top-0 !left-0 !translate-x-0 !translate-y-0 !rounded-none !border-none bg-black/98 text-white p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          <DialogHeader className="flex flex-row justify-between items-center shrink-0 pb-4 border-b border-white/10 mb-6">
            <div>
              <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">
                Player Game Report
              </DialogTitle>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">
                Scouted Match Performance Profile for {selectedCard?.playerName}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 border border-transparent text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.2)] cursor-pointer disabled:opacity-50 font-bold font-orbitron"
              >
                {isGeneratingPdf ? (
                  <>
                    <IconLoader2 className="animate-spin" size={16} /> Generating...
                  </>
                ) : (
                  <>
                    <IconDownload size={16} /> Download PDF
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all cursor-pointer font-bold font-orbitron"
              >
                <IconX size={16} /> Close
              </button>
            </div>
          </DialogHeader>

          {selectedCard && activeStats && (
            <div className="flex flex-col items-center gap-8 py-6">
              {/* Printable Page 1 */}
              <div 
                id="report-page-1"
                className="bg-white text-slate-800 p-10 font-sans relative overflow-hidden select-none"
                style={{ width: "794px", height: "1123px", minWidth: "794px", minHeight: "1123px" }}
              >
                {/* Watermark Logo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt="Logo Watermark" className="w-[500px] object-contain" />
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between border-b-4 border-slate-900 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt="K10 Logo" className="w-12 h-12 object-contain" />
                    <div>
                      <div className="text-xs font-black tracking-widest text-slate-900 font-orbitron">K10 FOOTBALL</div>
                      <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest font-orbitron">ANALYSIS CV</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-sky-500 font-orbitron uppercase tracking-tighter italic">
                      PLAYER GAME REPORT
                    </h2>
                    <div className="text-[10px] text-slate-900 font-black uppercase tracking-widest mt-1">
                      POSITION : {selectedCard.playerPosition} ⚽
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-black tracking-widest text-slate-900 font-orbitron">K10 FOOTBALL</div>
                      <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest font-orbitron">ANALYSIS CV</div>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt="K10 Logo" className="w-12 h-12 object-contain" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="relative z-10 grid grid-cols-12 gap-4 mb-4">
                  {/* Player details */}
                  <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] font-medium text-slate-600">
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">PLAYER NAME:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5 uppercase">{selectedCard.playerName}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">CLUB NAME:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5 uppercase">{selectedCard.team1}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">DOB:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5">
                        {matchingPlayer?.dob || "27-03-2014"}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">MATCHES PLAYED:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5">1</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">WEIGHT:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5">{selectedCard.weight || "45 KG"}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">MINUTES PLAYED:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5">{selectedCard.timePlayedMinutes || "90"} MIN</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">HEIGHT:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5">{selectedCard.height || "1.20 M"}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">MAN OF THE MATCH:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5">1</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-orbitron">FOOT:</span>
                      <p className="text-slate-700 text-xs font-bold mt-0.5 uppercase">{selectedCard.foot || "RIGHT"}</p>
                    </div>
                  </div>

                  {/* FUT player card photo preview */}
                  <div className="col-span-4 flex justify-end">
                    <div className="w-36 h-48 border-2 border-sky-400 bg-sky-50 rounded-2xl p-2 relative shadow-md flex flex-col items-center justify-between">
                      {/* FUT card header */}
                      <div className="flex justify-between w-full items-start">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-black text-sky-600 font-orbitron italic leading-none">
                            {overallPercent}
                          </div>
                          <div className="text-[8px] font-bold text-sky-500 uppercase font-orbitron leading-none mt-0.5">
                            {selectedCard.playerPosition?.slice(0,3)}
                          </div>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.src} alt="Club Logo" className="w-5 h-5 object-contain" />
                      </div>
                      {/* Player image in FUT Card */}
                      <div className="w-24 h-28 overflow-hidden relative mt-1 flex items-end justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={playerImgSrc} 
                          alt="Player Card Image" 
                          className="h-full object-contain object-bottom"
                        />
                      </div>
                      {/* FUT card footer */}
                      <div className="w-full text-center bg-sky-500/10 py-0.5 rounded border border-sky-400/20 mt-1">
                        <div className="text-[10px] font-black text-sky-600 truncate uppercase font-orbitron leading-none">
                          {selectedCard.playerName?.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Characteristic Section */}
                <div className="relative z-10 mb-4">
                  <div className="bg-sky-500 text-white font-orbitron px-4 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-2 shadow">
                    PLAYER CHARACTERISTIC:
                  </div>
                  <div className="flex flex-wrap gap-4 pl-2">
                    {selectedCard.characteristics?.map((tagStr: string) => (
                      <div key={tagStr} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-800">
                        <span className="text-sky-500">⚽</span>
                        <span className="font-orbitron">{tagStr}</span>
                      </div>
                    ))}
                    {(!selectedCard.characteristics || selectedCard.characteristics.length === 0) && (
                      <p className="text-slate-400 text-xs">Standard Midfield Attributes</p>
                    )}
                  </div>
                </div>

                {/* Match Information Section */}
                <div className="relative z-10 mb-4">
                  <div className="bg-sky-500 text-white font-orbitron px-4 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-2 shadow">
                    MATCH INFORMATION
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-1.5 text-[11px] font-medium text-slate-600 pl-2">
                    <div>
                      <span className="font-bold text-slate-950 font-orbitron">SCOUT NAME:</span>
                      <span className="ml-2 text-slate-700 font-bold uppercase">{selectedCard.scoutName}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-950 font-orbitron">GAME DATE:</span>
                      <span className="ml-2 text-slate-700 font-bold">{selectedCard.date}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-950 font-orbitron">MATCH RESULT:</span>
                      <span className="ml-2 text-slate-700 font-bold uppercase">{selectedCard.team1} {selectedCard.score} {selectedCard.team2}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-950 font-orbitron">GAME LOCATION:</span>
                      <span className="ml-2 text-slate-700 font-bold uppercase">{selectedCard.stadium}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-950 font-orbitron">WEATHER/TEMPERATURE:</span>
                      <span className="ml-2 text-slate-700 font-bold uppercase">{selectedCard.weather} {selectedCard.temperature}°C</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-950 font-orbitron">GAME TYPE:</span>
                      <span className="ml-2 text-slate-700 font-bold uppercase">{selectedCard.gameType || "Championship Match"}</span>
                    </div>
                  </div>
                </div>

                {/* Match Statistics Section */}
                <div className="relative z-10 mb-4">
                  <div className="bg-sky-500 text-white font-orbitron px-4 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-2 shadow">
                    MATCH STATISTICS
                  </div>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-1 text-[10px] pl-2">
                    {[
                      { label: "Shots on Goal:", val: activeStats.shotsOnGoal },
                      { label: "Stand Tackle:", val: activeStats.standTackle },
                      { label: "Appearances:", val: activeStats.appearances },
                      { label: "Goals Scored:", val: activeStats.goalScored },
                      { label: "Sliding Tackle:", val: activeStats.slidingTackle },
                      { label: "Fault:", val: activeStats.fault },
                      { label: "Assists:", val: activeStats.assists },
                      { label: "Interception:", val: activeStats.interception },
                      { label: "Punching:", val: activeStats.punching },
                      { label: "Pass Accurate:", val: activeStats.passAccurate },
                      { label: "Saves Accurate:", val: activeStats.savesAccurate },
                      { label: "Handling:", val: activeStats.handling },
                      { label: "Wrong Pass:", val: activeStats.wrongPass },
                      { label: "Goals Unsave:", val: activeStats.goalUnsave },
                      { label: "Reflex:", val: activeStats.reflex },
                      { label: "Free Kick:", val: activeStats.freeKick },
                      { label: "Penalties Save:", val: activeStats.penaltiesSaves },
                      { label: "Aerial Ability:", val: activeStats.aerialAbility },
                      { label: "Corner Kick:", val: activeStats.cornerKick },
                      { label: "Red Card:", val: activeStats.redCard },
                      { label: "Throwing:", val: activeStats.throwing },
                      { label: "Penalties Taken:", val: activeStats.penaltiesTaken },
                      { label: "Yellow Card:", val: activeStats.yellowCard },
                      { label: "Reactions:", val: activeStats.reactions }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-100 py-0.5 pr-2">
                        <span className="text-slate-500 font-bold uppercase font-orbitron">{item.label}</span>
                        <span className="text-slate-800 font-black font-orbitron">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom section (Radar, Overall, Logos) */}
                <div className="absolute bottom-10 left-10 right-10 z-10 flex items-center justify-between border-t-2 border-slate-200 pt-4">
                  {/* Radar Chart */}
                  <div className="w-[180px]">
                    <RadarChart 
                      stats={radarStats} 
                      size={140} 
                      color="#0284c7" 
                      fillColor="rgba(2, 132, 199, 0.25)" 
                      textColor="#475569"
                      gridColor="rgba(0, 0, 0, 0.1)"
                    />
                  </div>

                  {/* Overall score */}
                  <div className="text-center flex-1">
                    <div className="text-4xl font-black text-emerald-600 font-orbitron tracking-tighter italic">
                      OVERALL = {overallPercent}%
                    </div>
                  </div>

                  {/* Logo and tag */}
                  <div className="flex flex-col items-center gap-1.5 w-[180px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt="K10 Logo" className="w-10 h-10 object-contain" />
                    <div className="text-center leading-none">
                      <div className="text-[10px] font-black tracking-widest text-slate-900 font-orbitron">K10 FOOTBALL</div>
                      <div className="text-[7px] text-slate-500 font-bold uppercase tracking-widest font-orbitron">ANALYSIS CV</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};