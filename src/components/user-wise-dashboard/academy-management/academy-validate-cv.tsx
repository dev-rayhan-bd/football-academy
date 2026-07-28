"use client";

import React, { useState, useMemo } from "react";
import {
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconEye,
  IconBell,
  IconX,
  IconDownload,
  IconShield,
  IconUser,
  IconStar,
  IconTrophy,
  IconMapPin,
  IconPhone,
  IconMail,
  IconBallFootball,
  IconLoader2,
  IconCheck,
  IconClock,
  IconShare,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/reduxHooks";
import { PlayerStateItem, setSelectedPlayerId } from "@/lib/features/player/playerSlice";
import { toast } from "sonner";
import { COACH_POOL } from "@/components/user-wise-dashboard/academy-analysis/team-data-store";
import FullEditablePage from "@/app/(common)/cvs-page/player-cv-details/components/FullEditablePage";
import { getFullWithShortForm } from "@/lib/utils";
import { FileText } from 'lucide-react';

// ─── CV Tier calculation ───────────────────────────────────────────────────
type CvTier = "Gold" | "Silver" | "Bronze";

function getCvTier(rating: number): CvTier {
  if (rating >= 80) return "Gold";
  if (rating >= 60) return "Silver";
  return "Bronze";
}

const TIER_STYLES: Record<CvTier, { label: string; color: string; border: string; bg: string; glow: string }> = {
  Gold:   { label: "GOLD",   color: "text-[#FBBF24]", border: "border-[#FBBF24]/40", bg: "bg-[#FBBF24]/10", glow: "shadow-[0_0_16px_rgba(251,191,36,0.25)]" },
  Silver: { label: "SILVER", color: "text-[#CBD5E1]", border: "border-[#CBD5E1]/40", bg: "bg-[#CBD5E1]/10", glow: "shadow-[0_0_16px_rgba(203,213,225,0.15)]" },
  Bronze: { label: "BRONZE", color: "text-[#F97316]", border: "border-[#F97316]/40", bg: "bg-[#F97316]/10", glow: "shadow-[0_0_16px_rgba(249,115,22,0.15)]" },
};

// ─── Player type based on position ────────────────────────────────────────
function getPlayerType(position: string): string {
  const p = position.toLowerCase();
  if (p.includes("goalkeeper") || p === "gk") return "Goalkeeper";
  if (p.includes("defender") || p.includes("back") || p.includes("cb") || p.includes("lb") || p.includes("rb")) return "Defender";
  if (p.includes("midfielder") || p.includes("mid") || p.includes("cm") || p.includes("dm") || p.includes("am")) return "Midfielder";
  if (p.includes("forward") || p.includes("striker") || p.includes("winger") || p.includes("cf") || p.includes("lw") || p.includes("rw")) return "Forward";
  return "Field Player";
}

function getPositionCode(position: string): string {
  const p = position.toLowerCase();
  if (p.includes("goalkeeper")) return "GK";
  if (p.includes("defensive mid")) return "CDM";
  if (p.includes("center back") || p.includes("cb")) return "CB";
  if (p.includes("left back")) return "LB";
  if (p.includes("right back")) return "RB";
  if (p.includes("midfielder")) return "CM";
  if (p.includes("forward") || p.includes("striker")) return "ST";
  if (p.includes("winger")) return "LW";
  if (p.includes("defender")) return "CB";
  return "MF";
}

const VALIDATION_BADGE: Record<string, { label: string; color: string; border: string; bg: string }> = {
  verified: { label: "Verified",   color: "text-[#4ADE80]", border: "border-[#4ADE80]/30", bg: "bg-[#4ADE80]/10" },
  pending:  { label: "Pending",    color: "text-[#FBBF24]", border: "border-[#FBBF24]/30", bg: "bg-[#FBBF24]/10" },
};

// ─── CV Detail Dialog ──────────────────────────────────────────────────────
function CvDetailDialog({
  player,
  onClose,
}: {
  player: PlayerStateItem;
  onClose: () => void;
}) {
  const [notifying, setNotifying] = useState(false);
  const [notified, setNotified] = useState(false);
  const tier = getCvTier(player.rating);
  const tierStyle = TIER_STYLES[tier];

  // State for Select & Notify Coach feature
  const [showCoachSelector, setShowCoachSelector] = useState(false);
  const [coachSearch, setCoachSearch] = useState("");
  const [selectedCoachIds, setSelectedCoachIds] = useState<string[]>([]);
  const [isNotifyingCoaches, setIsNotifyingCoaches] = useState(false);

  const filteredCoaches = useMemo(() => {
    return COACH_POOL.filter(c => 
      c.name.toLowerCase().includes(coachSearch.toLowerCase()) ||
      c.role.toLowerCase().includes(coachSearch.toLowerCase())
    );
  }, [coachSearch]);

  const toggleCoachSelection = (coachId: string) => {
    setSelectedCoachIds(prev => 
      prev.includes(coachId) 
        ? prev.filter(id => id !== coachId) 
        : [...prev, coachId]
    );
  };

  const handleNotifySelectedCoaches = async () => {
    if (selectedCoachIds.length === 0) return;
    setIsNotifyingCoaches(true);
    
    const coachNames = COACH_POOL
      .filter(c => selectedCoachIds.includes(c.id))
      .map(c => c.name)
      .join(", ");

    const tid = toast.loading(`Sending CV of ${player.fullName} to selected coaches...`);
    await new Promise((r) => setTimeout(r, 1800));
    
    toast.success(`Successfully notified coaches: ${coachNames}!`, { id: tid, duration: 5000 });
    
    setIsNotifyingCoaches(false);
    setShowCoachSelector(false);
    setSelectedCoachIds([]);
  };

  const handleNotifyCoach = async () => {
    if (notified) return;
    setNotifying(true);
    const coachName = player.coachName || "the assigned coach";
    const tid = toast.loading(`Sending validation request to ${coachName}...`);
    await new Promise((r) => setTimeout(r, 1600));
    toast.success(`Validation request sent to ${coachName}! They will review ${player.fullName}'s CV shortly.`, { id: tid, duration: 5000 });
    setNotifying(false);
    setNotified(true);
  };

  const strengths = player.strengths ?? { pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0 };
  const attrs = [
    { label: "Pace",      value: strengths.pace      },
    { label: "Shooting",  value: strengths.shooting   },
    { label: "Passing",   value: strengths.passing    },
    { label: "Dribbling", value: strengths.dribbling  },
    { label: "Defending", value: strengths.defending  },
    { label: "Physical",  value: strengths.physical   },
  ];

  const posCode   = getPositionCode(player.position);
  const pType     = getPlayerType(player.position);
  const imgSrc    = typeof player.playerImage === "string" ? player.playerImage : player.playerImage?.src || "/ronaldo.png";
  const completion = Math.min(100, Math.round((player.rating / 100) * 100));

  const reports = useAppSelector(state => state.reports.reports);
  const gameReports = useMemo(() => {
    return (reports || [])
      .filter(r => r.status === "Paid")
      .slice(0, 3)
      .map(r => ({
        id: r.id,
        opponent: `vs ${r.team2}`,
        rating: r.rating
      }));
  }, [reports]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">
      <div className="relative w-full h-full overflow-y-auto flex flex-col">
        {/* Dialog Header */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/10 py-5">
          <div className="w-full flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${tierStyle.bg} ${tierStyle.border} ${tierStyle.color}`}>
                {tier} CV
              </div>
              <h2 className="text-xl font-black uppercase text-white font-orbitron tracking-tight">{player.fullName}</h2>
            </div>
            <div className="flex items-center gap-3">
              {/* NEW: Select & Notify Coach Button */}
              <div className="relative">
                <button
                  onClick={() => setShowCoachSelector(!showCoachSelector)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer bg-[#E31B23] hover:bg-[#C2181F] border-[#E31B23]/40 text-white shadow-lg shadow-[#E31B23]/20"
                >
                  <IconBell size={16} />
                  Select & Notify Coach
                </button>

                {showCoachSelector && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowCoachSelector(false)} />
                    <div className="absolute right-0 top-12 w-80 bg-[#0d0d0d] border border-white/15 backdrop-blur-md rounded-2xl p-4 shadow-2xl z-50 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Select Coaches</span>
                        <button 
                          onClick={() => setShowCoachSelector(false)}
                          className="text-white/40 hover:text-white"
                        >
                          <IconX size={14} />
                        </button>
                      </div>
                      
                      {/* Search */}
                      <div className="relative">
                        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          placeholder="Search coaches..."
                          value={coachSearch}
                          onChange={(e) => setCoachSearch(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-[11px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
                        />
                      </div>

                      {/* Coaches list */}
                      <div className="max-h-60 overflow-y-auto flex flex-col gap-1.5 pr-1">
                        {filteredCoaches.map(coach => {
                          const isSelected = selectedCoachIds.includes(coach.id);
                          return (
                            <div
                              key={coach.id}
                              onClick={() => toggleCoachSelection(coach.id)}
                              className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#E31B23]/10 border-[#E31B23]/30"
                                  : "bg-white/5 border-transparent hover:bg-white/10"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                                  <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[11px] font-black text-white truncate">{coach.name}</p>
                                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{coach.role}</p>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-[#E31B23] border-[#E31B23] text-white"
                                  : "border-white/20 text-transparent"
                              }`}>
                                <IconCheck size={10} strokeWidth={3} />
                              </div>
                            </div>
                          );
                        })}
                        {filteredCoaches.length === 0 && (
                          <p className="text-center text-[10px] text-white/30 py-4 uppercase font-bold">No coaches found</p>
                        )}
                      </div>

                      {/* Select options */}
                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <button
                          onClick={() => setSelectedCoachIds(COACH_POOL.map(c => c.id))}
                          className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-black uppercase text-white/60 hover:text-white tracking-widest transition-all"
                        >
                          Select All
                        </button>
                        <button
                          onClick={() => setSelectedCoachIds([])}
                          className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-black uppercase text-white/60 hover:text-white tracking-widest transition-all"
                        >
                          Clear
                        </button>
                      </div>

                      {/* Submit */}
                      <button
                        onClick={handleNotifySelectedCoaches}
                        disabled={selectedCoachIds.length === 0 || isNotifyingCoaches}
                        className="w-full py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] border-[#E31B23]/40 text-white text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-lg shadow-[#E31B23]/20"
                      >
                        {isNotifyingCoaches ? (
                          <><IconLoader2 size={12} className="animate-spin" /> Sending...</>
                        ) : (
                          <>Notify ({selectedCoachIds.length})</>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Original Auto Notify Coach Button */}
              <button
                onClick={handleNotifyCoach}
                disabled={notifying || notified}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer disabled:cursor-default border ${
                  notified
                    ? "bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]"
                    : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white"
                }`}
              >
                {notifying ? (
                  <><IconLoader2 size={16} className="animate-spin" /> Sending...</>
                ) : notified ? (
                  <><IconCheck size={16} /> Coach Notified</>
                ) : (
                  <><IconBell size={16} /> Auto Notify ({player.coachName || "Coach"})</>
                )}
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* CV Body - Adjusted to full width */}
        <div className="p-8 flex flex-col gap-6 w-full">
          {/* Personal Information Hero - Restoring Original Design */}
          <section className="bg-[#111111] rounded-3xl border border-white/10 p-4 md:p-8 flex flex-col gap-8">
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[560px] border border-white/10 group flex flex-col justify-end">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('/stadium-night.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 via-[45%] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute right-0 bottom-0 h-full w-[70%] md:w-[55%] flex items-end justify-end pointer-events-none opacity-60 md:opacity-100">
                <img
                  src={typeof player.playerImage === 'string' ? player.playerImage : (player.playerImage?.src || "/ronaldo.png")}
                  alt="Player"
                  className="h-[90%] md:h-[105%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="relative p-6 md:p-10 w-full space-y-8">
                <div className="flex flex-col gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gold bg-gold/80 flex items-center justify-center backdrop-blur-2xl shadow-2xl">
                    <span className="text-3xl md:text-4xl font-black text-white font-orbitron">{player.rating}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-[#E31B23] border border-[#E31B23]/20 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase w-fit tracking-[0.2em] shadow-[0_0_20px_rgba(227,27,35,0.3)]">{player.transferStatus || "Active Player"}</div>
                    <div className="space-y-2">
                      <h1 className="text-3xl md:text-6xl font-black text-white font-orbitron uppercase tracking-tighter leading-none">{player.fullName}</h1>
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] pt-1">
                        <span className="text-[#E31B23]">{getFullWithShortForm(player.position)}</span>
                        <span className="text-white/20 hidden md:inline">/</span>
                        <span className="text-white">{player.age} Years Old</span>
                        <span className="text-white/20 hidden md:inline">/</span>
                        <span className="flex items-center gap-3 text-white">
                          <img src={`https://flagcdn.com/br.svg`} alt={player.birthCountry} className="w-4 h-3 md:w-5 md:h-3.5 object-cover rounded-sm shadow-sm" /> {player.birthCountry}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6 pt-4 md:pt-8 max-w-2xl p-4 md:p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconShield size={20} /></div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Current Club</p>
                      <p className="text-sm font-bold text-white">{player.clubs[0]?.name || "Unattached"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconPhone size={20} /></div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Contact</p>
                      <p className="text-sm font-bold text-white">{player.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconClock size={20} /></div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Contract Until</p>
                      <p className="text-sm font-bold text-[#FBBF24]">{player.contractUntil}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconMail size={20} /></div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Email</p>
                      <p className="text-sm font-bold text-white truncate max-w-[180px]">{player.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Top Squares */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full">
            {/* Completion Status */}
            <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
              <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">Completion Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-5xl font-black text-[#E31B23] font-orbitron">85%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E31B23] rounded-full" style={{ width: "85%" }} />
                </div>
                <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-wider">
                  Complete all sections to unlock Gold tier status
                </p>
              </div>
            </div>

            {/* Tier Status */}
            <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FBBF24]/10 blur-3xl rounded-full" />
              <div className="flex flex-col">
                <h3 className="text-3xl font-black text-[#FBBF24] font-orbitron italic tracking-tighter leading-none">GOLD</h3>
                <div className="w-full h-1 bg-[#FBBF24] mt-2 opacity-50" />
              </div>
              <p className="text-[10px] text-white/60 font-bold leading-relaxed uppercase tracking-wider mt-2">
                Your CV meets Gold standards and is ready to share with top clubs and agents.
              </p>
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-2 w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] h-auto mt-4 cursor-pointer flex items-center justify-center">
                <IconShare size={18} className="text-white/40" /> Request Re-validation
              </button>
            </div>

            {/* New Game Reports */}
            <div className="bg-[#111111] h-fit rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#E31B23] rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">
                  New Game Reports
                </h3>
              </div>

              <div className="space-y-3">
                {gameReports.map((report) => (
                  <div key={report.id} className="border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition group">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-white/40 group-hover:text-[#E31B23] transition-colors" />
                      <span className="text-white/60 text-sm font-bold">{report.opponent}</span>
                    </div>
                    <span className="text-white font-black text-xl font-orbitron">{report.rating}</span>
                  </div>
                ))}
                {gameReports.length === 0 && (
                  <p className="text-white/40 text-[10px] uppercase font-bold text-center py-4">No reports available</p>
                )}
              </div>
            </div>
          </div>

          <FullEditablePage editable={false} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
const AcademyValidateCv = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.player.players);

  const [searchTerm, setSearchTerm]       = useState("");
  const [tierFilter, setTierFilter]       = useState<"All" | CvTier>("All");
  const [typeFilter, setTypeFilter]       = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStateItem | null>(null);

  const playerTypes = useMemo(() => {
    const types = new Set(players.map((p) => getPlayerType(p.position)));
    return ["All", ...Array.from(types)];
  }, [players]);

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const tier = getCvTier(p.rating);
      const type = getPlayerType(p.position);
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term || p.fullName.toLowerCase().includes(term) || p.position.toLowerCase().includes(term) || p.birthCountry.toLowerCase().includes(term);
      const matchesTier   = tierFilter === "All" || tier === tierFilter;
      const matchesType   = typeFilter === "All" || type === typeFilter;
      return matchesSearch && matchesTier && matchesType;
    });
  }, [players, searchTerm, tierFilter, typeFilter]);

  const stats = useMemo(() => {
    const gold   = players.filter((p) => getCvTier(p.rating) === "Gold").length;
    const silver = players.filter((p) => getCvTier(p.rating) === "Silver").length;
    const bronze = players.filter((p) => getCvTier(p.rating) === "Bronze").length;
    return { gold, silver, bronze, total: players.length };
  }, [players]);

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Validate CV</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Player CV library — view, validate, and notify coaches</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all font-bold cursor-pointer">
          <IconDownload size={18} />
          <span className="text-[11px] font-black uppercase tracking-widest">Export All</span>
        </button>
      </div>

      {/* Tier Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: "Total Players", value: stats.total, color: "text-white",         border: "border-white/15", bg: "bg-white/5" },
          { label: "Gold CVs",      value: stats.gold,  color: "text-[#FBBF24]",    border: "border-[#FBBF24]/30", bg: "bg-[#FBBF24]/5" },
          { label: "Silver CVs",    value: stats.silver,color: "text-[#CBD5E1]",    border: "border-[#CBD5E1]/30", bg: "bg-[#CBD5E1]/5" },
          { label: "Bronze CVs",    value: stats.bronze,color: "text-[#F97316]",    border: "border-[#F97316]/30", bg: "bg-[#F97316]/5" },
        ].map(({ label, value, color, border, bg }) => (
          <div key={label} className={`bg-[#111111] rounded-[28px] border ${border} p-6 flex flex-col gap-2 shadow-xl`}>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</p>
            <p className={`text-4xl font-black font-orbitron ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#111111] rounded-3xl border border-white/15 p-4 flex flex-col md:flex-row gap-4 shadow-xl">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input
            type="text"
            placeholder="Search by name, position, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/15 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
          />
        </div>
        <div className="flex gap-3">
          {/* Tier Filter */}
          <div className="relative">
            <IconFilter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as "All" | CvTier)}
              className="bg-white/5 border border-white/15 rounded-2xl py-3 pl-9 pr-8 text-[11px] font-bold text-white/60 focus:outline-none focus:border-white/25 transition-all cursor-pointer appearance-none"
            >
              <option value="All">All Tiers</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
            <IconChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
          </div>
          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/5 border border-white/15 rounded-2xl py-3 px-4 pr-8 text-[11px] font-bold text-white/60 focus:outline-none focus:border-white/25 transition-all cursor-pointer appearance-none"
            >
              {playerTypes.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All Positions" : t}</option>
              ))}
            </select>
            <IconChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">Player CVs ({filtered.length})</h2>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Click &ldquo;View CV&rdquo; to open full profile</span>
        </div>

        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.01]">
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15">Player</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Rating</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">CV Tier</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Type</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Position</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Validation</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Coach</th>
                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, index) => {
                const tier      = getCvTier(p.rating);
                const tierStyle = TIER_STYLES[tier];
                const pType     = getPlayerType(p.position);
                const displayStatus = p.validationStatus === "verified" ? "verified" : "pending";
                const vBadge    = VALIDATION_BADGE[displayStatus];
                const imgSrc    = typeof p.playerImage === "string" ? p.playerImage : p.playerImage?.src || "/ronaldo.png";

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-white/[0.02] transition-colors group ${index !== filtered.length - 1 ? "border-b border-white/15" : ""}`}
                  >
                    {/* Player */}
                    <td className="py-4 px-6 border-r border-white/15">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0 bg-white/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgSrc} alt={p.fullName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white whitespace-nowrap">{p.fullName}</p>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{p.birthCountry}</p>
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className={`text-xl font-black font-orbitron ${tierStyle.color}`}>{p.rating}</span>
                    </td>

                    {/* CV Tier */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${tierStyle.bg} ${tierStyle.border} ${tierStyle.color}`}>
                        {tier}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className="text-[11px] font-bold text-white/60">{pType}</span>
                    </td>

                    {/* Position */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className="text-[11px] font-bold text-white/60 whitespace-nowrap">{p.position}</span>
                    </td>

                    {/* Validation */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${vBadge.bg} ${vBadge.border} ${vBadge.color}`}>
                        {vBadge.label}
                      </span>
                    </td>

                    {/* Coach */}
                    <td className="py-4 px-6 border-r border-white/15 text-center">
                      <span className="text-[11px] font-bold text-white/60 whitespace-nowrap">{p.coachName || "Unassigned"}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            dispatch(setSelectedPlayerId(p.id));
                            setSelectedPlayer(p);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all cursor-pointer text-[10px] font-black uppercase tracking-widest"
                        >
                          <IconEye size={14} />
                          View CV
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-white/40 text-sm font-medium">
                    No player CVs match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CV Detail Dialog */}
      {selectedPlayer && (
        <CvDetailDialog
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
};

export default AcademyValidateCv;
