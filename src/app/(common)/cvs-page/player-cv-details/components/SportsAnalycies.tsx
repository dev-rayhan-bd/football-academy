/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useUpdatePlayerProfileMutation } from "@/lib/features/cv/cvApi";
import { CMSField } from "@/components/shared/CMSField";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { useAppSelector } from "@/lib/hooks/reduxHooks";

const getResultColor = (result: "W" | "D" | "L") => {
  switch (result) {
    case "W":
      return "bg-[#00FF62] text-black";
    case "D":
      return "bg-gray-500 text-white";
    case "L":
      return "bg-red-600 text-white";
  }
};

const getResultText = (result: "W" | "D" | "L") => result;

function SportsAnalycies({ editable = false }: { editable?: boolean }) {
  const reports = useAppSelector(state => state.reports.reports);
  const matches = reports.filter(m => m.status === "Paid").slice(0, 4);

  const wins = matches.filter((m) => m.result === "W").length;
  const draws = matches.filter((m) => m.result === "D").length;
  const losses = matches.filter((m) => m.result === "L").length;
  const totalGoals = matches.reduce((sum, m) => sum + m.goals, 0);
  const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0);
  
  const avgRating = matches.length > 0 
    ? (matches.reduce((sum, m) => sum + m.rating, 0) / matches.length).toFixed(1)
    : "0.0";

  const avgPassAccuracy = matches.length > 0
    ? Math.round(matches.reduce((sum, m) => sum + m.passAccuracy, 0) / matches.length)
    : 0;

  const avgTackles = (2.4).toFixed(1);
  const avgInterceptions = (2.4).toFixed(1);

  return (
    <div className="container ">
      <h1 className="mb-8 text-center text-3xl font-bold text-white font-heading">
        GAME SUMMARY (LAST 4 MATCHES)
      </h1>

      <div className="space-y-6">
        {/* Overall stats cards */}
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <Card className="border-0 bg-gradient-to-br from-[#1B4D2E] to-[#0F3B1F] p-8 text-white rounded-lg">
            <div className="mb-6 text-xl font-bold text-[#00FF62] uppercase tracking-wide">Overall Performance</div>
            <div className="mb-6">
              <div className="text-base text-gray-300 font-medium">Average Rating</div>
              <div className="text-6xl font-black text-[#00FF62]">{avgRating}</div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-base text-gray-300 font-medium">Total Goals</div>
                <div className="text-4xl font-black text-white">{totalGoals}</div>
              </div>
              <div>
                <div className="text-base text-gray-300 font-medium">Total Assists</div>
                <div className="text-4xl font-black text-white">{totalAssists}</div>
              </div>
            </div>
          </Card>

          <Card className="border border-border bg-black p-8 text-white rounded-lg">
            <div className="mb-6 text-xl font-bold text-gray-300 uppercase tracking-wide">Form Guide</div>
            <div className="mb-6 flex gap-3">
              {matches.map((match, idx) => (
                <Badge key={idx} className={`h-12 w-12 flex items-center justify-center p-0 rounded-full font-black text-lg ${getResultColor(match.result)} shadow-lg`}>
                  {getResultText(match.result)}
                </Badge>
              ))}
            </div>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between"><span className="text-gray-300">Wins</span><span className="font-bold text-white">{wins}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Draws</span><span className="font-bold text-white">{draws}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Losses</span><span className="font-bold text-white">{losses}</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-black p-8 text-white rounded-lg">
            <div className="mb-6 text-xl font-bold text-gray-300 uppercase tracking-wide">Key Stats</div>
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm md:text-base">
                  <span className="text-gray-300 font-medium">Average Pass Accuracy</span>
                  <span className="text-[#00FF62] font-bold">{avgPassAccuracy}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FF62]" style={{ width: `${avgPassAccuracy}%` }} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm md:text-base">
                  <span className="text-gray-300 font-medium">Average Tackles</span>
                  <span className="text-[#00FF62] font-bold">{avgTackles}</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FF62]" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Game Reports */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {matches.map((match, idx) => (
            <Card
              key={idx}
              className="border border-border bg-black p-8 text-white rounded-xl hover:border-primary/30 transition-all shadow-xl"
            >
              {/* Header Row */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-lg text-gray-400">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                    <span className="font-medium">{match.date}</span>
                  </div>
                  <Badge className="bg-gray-800 text-white hover:bg-gray-700 text-base py-1.5 px-4 rounded-md font-bold uppercase tracking-wider">
                    {match.league}
                  </Badge>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] uppercase font-black tracking-widest py-0.5 px-2">VERIFIED</Badge>
                  <div className="text-3xl font-black text-[#00FF62]">{match.rating}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 font-black">Rating</div>
                </div>
              </div>

              {/* Teams and Score */}
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <div className="text-xl font-black uppercase tracking-tight text-white mb-1">{match.team1}</div>
                  <div className="h-1 w-12 bg-primary/30 mx-auto rounded-full"></div>
                </div>
                <div className="shrink-0 bg-cardBg border border-border/50 p-4 px-8 rounded-xl shadow-inner">
                  <div className="text-4xl font-black text-white tracking-tighter">{match.score}</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xl font-black uppercase tracking-tight text-white mb-1">{match.team2}</div>
                  <Badge className={cn(getResultColor(match.result), "font-black text-sm uppercase px-3")}>
                    {getResultText(match.result)}
                  </Badge>
                </div>
              </div>

              {/* Stadium */}
              <div className="flex items-center gap-3 text-lg text-gray-400 mb-6 bg-white/5 p-3 rounded-lg">
                <MapPinIcon className="h-6 w-6 text-primary" />
                <span className="font-medium">{match.stadium}</span>
              </div>

              {/* Stats Grid */}
              <div className="mb-6 grid grid-cols-4 gap-4 border-t border-b border-border/50 py-6 mt-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">{match.goals}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">{match.assists}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">{match.passes}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Passes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">{match.timePlayedMinutes}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Minutes</div>
                </div>
              </div>

              {/* Cards and Accuracy */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-5 bg-[#FFCC00] rounded-sm shadow-md" />
                    <span className="text-xl font-black text-white">{match.yellowCards}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-5 bg-[#DC143C] rounded-sm shadow-md" />
                    <span className="text-xl font-black text-white">{match.redCards}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">
                    {match.passAccuracy}%
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Accuracy</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SportsAnalycies;
