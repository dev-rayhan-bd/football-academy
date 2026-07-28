"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface StatInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  colorClass: string;
  align?: "left" | "right";
}

const StatInput = ({ label, value, onChange, colorClass, align = "left" }: StatInputProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", align === "right" ? "items-end text-right" : "items-start text-left")}>
      <Label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] font-orbitron">{label}</Label>
      <div className={cn("h-11 w-full rounded-lg relative overflow-hidden shadow-lg", colorClass)}>
        {/* Plus / Minus Buttons */}
        <div className={cn("absolute top-0 bottom-0 flex items-center justify-center w-[50%]", align === "right" ? "right-0" : "left-0")}>
          <button
            type="button"
            onClick={() => onChange(Math.max(0, value - 1))}
            className="flex-1 h-full flex items-center justify-center text-white/85 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-xl font-black font-orbitron cursor-pointer select-none"
          >
            -
          </button>
          <div className="w-[1px] h-4 bg-white/20" />
          <button
            type="button"
            onClick={() => onChange(value + 1)}
            className="flex-1 h-full flex items-center justify-center text-white/85 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-xl font-black font-orbitron cursor-pointer select-none"
          >
            +
          </button>
        </div>
        <div 
          className={cn(
            "absolute top-0 bottom-0 bg-white w-[50%] flex items-center justify-center", 
            align === "right" ? "left-0 shadow-[4px_0_10px_rgba(0,0,0,0.1)]" : "right-0 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]"
          )} 
          style={{ 
            clipPath: align === "right" 
              ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' 
              : 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' 
          }}
        >
          <input 
            type="text" 
            value={value === 0 ? "0" : value} 
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, ""), 10);
              onChange(isNaN(val) ? 0 : val);
            }}
            className={cn(
              "h-full w-full bg-transparent border-none text-[#111111] font-black font-orbitron text-xl focus:outline-none focus:ring-0 text-center",
              align === "right" ? "pr-4" : "pl-4"
            )}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20" />
      </div>
    </div>
  );
};

export interface PitchLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface MatchStatisticsFormProps {
  position: string;
  stats: Record<string, number>;
  setStats: (stats: Record<string, number>) => void;
  goalMarkers: { x: number; y: number }[];
  setGoalMarkers: (markers: { x: number; y: number }[]) => void;
  pitchMarkers: PitchLine[];
  setPitchMarkers: (markers: PitchLine[]) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const MatchStatisticsForm = ({
  position,
  stats,
  setStats,
  goalMarkers,
  setGoalMarkers,
  pitchMarkers,
  setPitchMarkers,
  onCancel,
  onSubmit
}: MatchStatisticsFormProps) => {
  const isGK = position === "GOALKEEPER";

  // Load default stats if empty
  useEffect(() => {
    if (Object.keys(stats).length === 0) {
      if (isGK) {
        setStats({
          shotsOnGoal: 0, goalScored: 0, assists: 1, passAccurate: 12, wrongPass: 2, penaltiesTaken: 0,
          standTackle: 0, slidingTackle: 0, interception: 0, savesAccurate: 10, freeKick: 0, cornerKick: 0,
          goalUnsave: 1, penaltiesSaves: 1, appearances: 15, fault: 1, redCard: 0, yellowCard: 1,
          punching: 5, handling: 10, reflex: 1, aerialAbility: 5, throwing: 8, reactions: 1
        });
        setGoalMarkers([{ x: 15, y: 25 }, { x: 85, y: 25 }, { x: 50, y: 50 }]);
        setPitchMarkers([{ x1: 35, y1: 50, x2: 12, y2: 50 }]);
      } else {
        setStats({
          shotsOnGoal: 8, goalScored: 3, assists: 6, passAccurate: 12, wrongPass: 2, penaltiesTaken: 4,
          standTackle: 12, slidingTackle: 12, interception: 2, savesAccurate: 10, freeKick: 12, cornerKick: 4,
          goalUnsave: 1, penaltiesSaves: 1, appearances: 15, fault: 1, redCard: 0, yellowCard: 1,
          punching: 5, handling: 10, reflex: 1, aerialAbility: 5, throwing: 8, reactions: 1
        });
        setGoalMarkers([{ x: 15, y: 25 }, { x: 85, y: 25 }, { x: 50, y: 50 }]);
        setPitchMarkers([{ x1: 50, y1: 50, x2: 88, y2: 50 }]);
      }
    }
  }, [isGK, stats, setStats, setGoalMarkers, setPitchMarkers]);

  const handleStatChange = (key: string, val: number) => {
    setStats({ ...stats, [key]: val });
  };

  const handleGoalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    
    // Add marker, max 10 markers
    if (goalMarkers.length < 10) {
      setGoalMarkers([...goalMarkers, { x, y }]);
    }
  };

  const removeGoalMarker = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setGoalMarkers(goalMarkers.filter((_, idx) => idx !== index));
  };

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);

  const handlePitchMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setDragStart({ x, y });
    setDragCurrent({ x, y });
  };

  const handlePitchMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStart) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setDragCurrent({ x, y });
  };

  const handlePitchMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStart) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const dist = Math.sqrt(Math.pow(x - dragStart.x, 2) + Math.pow(y - dragStart.y, 2));
    if (dist > 2) {
      if (pitchMarkers.length < 15) {
        setPitchMarkers([...pitchMarkers, { x1: dragStart.x, y1: dragStart.y, x2: x, y2: y }]);
      } else {
        toast.error("You can add a maximum of 15 assist/save arrows.");
      }
    }
    setDragStart(null);
    setDragCurrent(null);
  };

  const handlePitchMouseLeave = () => {
    setDragStart(null);
    setDragCurrent(null);
  };

  const removePitchMarker = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPitchMarkers(pitchMarkers.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex flex-col gap-8 pb-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Create Game Reports</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Create Professional Football Player Game Reports</p>
      </div>

      <div className="bg-[#0A0A0A] rounded-[40px] border border-white/10 p-8 md:p-12 flex flex-col gap-10 relative overflow-hidden shadow-2xl">
        {/* MATCH STATISTICS Header Bar */}
        <div className="relative w-full">
          <div className="bg-gradient-to-r from-[#00A3FF] to-[#0066FF] font-orbitron text-white w-full py-4 rounded-xl font-black uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(0,163,255,0.3)] text-center border border-white/20 text-lg italic">
            Match Statistics
          </div>
        </div>

        {/* 3-Column Layout: Left Stats, Player Image, Right Stats */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[700px]">
          {/* Left Column (Stats 1-12) */}
          <div className="lg:col-span-3 flex flex-col gap-4 z-20">
            <StatInput label="Shots on Goal" value={stats.shotsOnGoal || 0} onChange={(val) => handleStatChange("shotsOnGoal", val)} colorClass="bg-[#00D1FF]" />
            <StatInput label="Goal Scored" value={stats.goalScored || 0} onChange={(val) => handleStatChange("goalScored", val)} colorClass="bg-[#8B5CF6]" />
            <StatInput label="Assists" value={stats.assists || 0} onChange={(val) => handleStatChange("assists", val)} colorClass="bg-[#2DD4BF]" />
            <StatInput label="Pass Accurate" value={stats.passAccurate || 0} onChange={(val) => handleStatChange("passAccurate", val)} colorClass="bg-[#F59E0B]" />
            <StatInput label="Wrong Pass" value={stats.wrongPass || 0} onChange={(val) => handleStatChange("wrongPass", val)} colorClass="bg-[#C084FC]" />
            <StatInput label="Penalties Taken" value={stats.penaltiesTaken || 0} onChange={(val) => handleStatChange("penaltiesTaken", val)} colorClass="bg-[#EF4444]" />
            <StatInput label="Stand Tackle" value={stats.standTackle || 0} onChange={(val) => handleStatChange("standTackle", val)} colorClass="bg-[#B48A14]" />
            <StatInput label="Sliding Tackle" value={stats.slidingTackle || 0} onChange={(val) => handleStatChange("slidingTackle", val)} colorClass="bg-[#8B5CF6]" />
            <StatInput label="Interception" value={stats.interception || 0} onChange={(val) => handleStatChange("interception", val)} colorClass="bg-[#F59E0B]" />
            <StatInput label="Saves Accurate" value={stats.savesAccurate || 0} onChange={(val) => handleStatChange("savesAccurate", val)} colorClass="bg-[#4ADE80]" />
            <StatInput label="Free Kick" value={stats.freeKick || 0} onChange={(val) => handleStatChange("freeKick", val)} colorClass="bg-[#F59E0B]" />
            <StatInput label="Corner Kick" value={stats.cornerKick || 0} onChange={(val) => handleStatChange("cornerKick", val)} colorClass="bg-[#00D1FF]" />
          </div>

          {/* Center Column: Player Standing Image */}
          <div className="lg:col-span-6 flex justify-center items-end h-full relative min-h-[500px]">
            {isGK ? (
              <img 
                src="/mini__GP15525.webp" 
                alt="Goalkeeper" 
                className="h-[520px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                onError={(e) => {
                  // Fallback if the image doesn't load
                  e.currentTarget.src = "/pngegg.png";
                }}
              />
            ) : (
              <img 
                src="/sergio-ramos.png" 
                alt="Sergio Ramos" 
                className="h-[520px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                onError={(e) => {
                  e.currentTarget.src = "/ronaldo.png";
                }}
              />
            )}
          </div>

          {/* Right Column (Stats 13-24) */}
          <div className="lg:col-span-3 flex flex-col gap-4 z-20 items-end">
            <StatInput label="Goal Unsave" value={stats.goalUnsave || 0} onChange={(val) => handleStatChange("goalUnsave", val)} colorClass="bg-[#8B5CF6]" align="right" />
            <StatInput label="Penalties Saves" value={stats.penaltiesSaves || 0} onChange={(val) => handleStatChange("penaltiesSaves", val)} colorClass="bg-[#F59E0B]" align="right" />
            <StatInput label="Appearances" value={stats.appearances || 0} onChange={(val) => handleStatChange("appearances", val)} colorClass="bg-[#00D1FF]" align="right" />
            <StatInput label="Fault" value={stats.fault || 0} onChange={(val) => handleStatChange("fault", val)} colorClass="bg-[#4ADE80]" align="right" />
            <StatInput label="Red Card" value={stats.redCard || 0} onChange={(val) => handleStatChange("redCard", val)} colorClass="bg-[#EF4444]" align="right" />
            <StatInput label="Yellow Card" value={stats.yellowCard || 0} onChange={(val) => handleStatChange("yellowCard", val)} colorClass="bg-[#F59E0B]" align="right" />
            <StatInput label="Punching" value={stats.punching || 0} onChange={(val) => handleStatChange("punching", val)} colorClass="bg-[#00D1FF]" align="right" />
            <StatInput label="Handling" value={stats.handling || 0} onChange={(val) => handleStatChange("handling", val)} colorClass="bg-[#B48A14]" align="right" />
            <StatInput label="Reflex" value={stats.reflex || 0} onChange={(val) => handleStatChange("reflex", val)} colorClass="bg-[#8B5CF6]" align="right" />
            <StatInput label="Arial Ability" value={stats.aerialAbility || 0} onChange={(val) => handleStatChange("aerialAbility", val)} colorClass="bg-[#2DD4BF]" align="right" />
            <StatInput label="Throwing" value={stats.throwing || 0} onChange={(val) => handleStatChange("throwing", val)} colorClass="bg-[#F59E0B]" align="right" />
            <StatInput label="Reactions" value={stats.reactions || 0} onChange={(val) => handleStatChange("reactions", val)} colorClass="bg-[#00D1FF]" align="right" />
          </div>
        </div>

        {/* Bottom Section: Goalpost (Left) and Pitch (Right) Diagrams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-6">
          {/* Goalpost diagram (Accurate Shots / Accurate Save) */}
          <div className="bg-[#121212]/90 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
            <div className="bg-white/5 py-3.5 px-6 text-center border-b border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] font-orbitron">
                {isGK ? "Accurate Save" : "Accurate Shots"}
              </span>
              <button 
                onClick={() => setGoalMarkers([])}
                className="text-[9px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors font-orbitron"
              >
                Clear
              </button>
            </div>
            <div 
              onClick={handleGoalClick}
              className="aspect-video relative cursor-crosshair overflow-hidden group select-none bg-black"
            >
              <img 
                src="/goal-bar.png" 
                alt="Goal" 
                draggable={false}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none select-none" 
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              {/* Grid hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none">
                <span className="text-white text-xs font-semibold uppercase tracking-widest font-orbitron">Click Goal to Place Marker</span>
              </div>
              {/* Render Markers */}
              {goalMarkers.map((marker, idx) => (
                <div 
                  key={idx} 
                  onClick={(e) => removeGoalMarker(idx, e)}
                  className="absolute w-8 h-8 -ml-4 -mt-4 bg-white/95 rounded-full flex items-center justify-center shadow-2xl border-2 border-red-600 hover:scale-125 hover:bg-red-500 transition-all cursor-pointer animate-in zoom-in duration-200"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  title="Click to remove"
                >
                  <span className="text-sm select-none">{isGK ? "🧤" : "⚽"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Football Pitch diagram (Accurate Assist / Accurate Saves) */}
          <div className="bg-[#121212]/90 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
            <div className="bg-white/5 py-3.5 px-6 text-center border-b border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] font-orbitron">
                {isGK ? "Accurate Saves" : "Accurate Assist"}
              </span>
              <button 
                onClick={() => setPitchMarkers([])}
                className="text-[9px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors font-orbitron"
              >
                Clear
              </button>
            </div>
            <div 
              onMouseDown={handlePitchMouseDown}
              onMouseMove={handlePitchMouseMove}
              onMouseUp={handlePitchMouseUp}
              onMouseLeave={handlePitchMouseLeave}
              className="aspect-video relative cursor-crosshair overflow-hidden group select-none bg-[#092b15]"
            >
              <img 
                src="/FootballPitch.png" 
                alt="Football Pitch" 
                draggable={false}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none select-none" 
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              {/* Grid hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none">
                <span className="text-white text-xs font-semibold uppercase tracking-widest font-orbitron">Drag from start to goal box to draw arrow</span>
              </div>
 
              {/* Render lines from start to end with arrow heads */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker
                    id="pitch-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#00FF62" />
                  </marker>
                </defs>
                {pitchMarkers.map((line, idx) => (
                  <line
                    key={idx}
                    x1={`${line.x1}%`}
                    y1={`${line.y1}%`}
                    x2={`${line.x2}%`}
                    y2={`${line.y2}%`}
                    stroke="#00FF62"
                    strokeWidth="3"
                    markerEnd="url(#pitch-arrow)"
                  />
                ))}
                
                {/* Dragging preview */}
                {dragStart && dragCurrent && (
                  <line
                    x1={`${dragStart.x}%`}
                    y1={`${dragStart.y}%`}
                    x2={`${dragCurrent.x}%`}
                    y2={`${dragCurrent.y}%`}
                    stroke="#00FF62"
                    strokeWidth="3"
                    markerEnd="url(#pitch-arrow)"
                  />
                )}

                {/* Target Goal Box Highlight Overlay */}
                {dragStart && (
                  <g>
                    <rect
                      x={isGK ? "0%" : "78%"}
                      y="20%"
                      width="22%"
                      height="60%"
                      fill="rgba(0, 255, 98, 0.08)"
                      stroke="#00FF62"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                    <text
                      x={isGK ? "11%" : "89%"}
                      y="52%"
                      fill="#00FF62"
                      fontSize="8"
                      fontWeight="900"
                      textAnchor="middle"
                      className="font-orbitron tracking-widest uppercase select-none opacity-80 animate-pulse"
                    >
                      {isGK ? "SAVE ZONE" : "ASSIST ZONE"}
                    </text>
                  </g>
                )}
              </svg>
 
              {/* Center Circle Label */}
              <div 
                className={cn(
                  "absolute -translate-y-1/2 w-16 h-16 bg-white/10 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm pointer-events-none select-none shadow-xl",
                  isGK ? "left-[12%] -translate-x-1/2 top-1/2" : "left-1/2 -translate-x-1/2 top-1/2"
                )}
              >
                <span className="text-[7px] font-black text-white text-center leading-none uppercase font-orbitron">
                  {isGK ? "Accurate\nSaves" : "Accurate\nAssist"}
                </span>
              </div>
 
              {/* Render Pitch Markers (soccer balls at start points) */}
              {pitchMarkers.map((line, idx) => (
                <div 
                  key={idx} 
                  onClick={(e) => removePitchMarker(idx, e)}
                  className="absolute w-7 h-7 -ml-3.5 -mt-3.5 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-600 hover:scale-125 transition-all cursor-pointer animate-in zoom-in duration-200 z-30"
                  style={{ left: `${line.x1}%`, top: `${line.y1}%` }}
                  title="Click to remove"
                >
                  <span className="text-xs select-none font-sans">⚽</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-6 mt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex-1 bg-transparent hover:bg-white/5 text-white border border-white/10 h-16 rounded-xl font-black uppercase tracking-[0.2em] transition-all font-orbitron italic"
        >
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          className="flex-1 bg-[#00FF62] hover:bg-[#00D150] text-black h-16 rounded-xl font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(0,255,98,0.2)] font-orbitron italic"
        >
          Submit Report
        </Button>
      </div>
    </div>
  );
};
