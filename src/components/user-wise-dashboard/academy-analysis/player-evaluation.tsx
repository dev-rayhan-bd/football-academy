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
  IconPlus,
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconTrash,
  IconStar,
  IconClock,
  IconHeart,
  IconChartBar,
  IconUsers,
  IconFileText,
  IconTrendingUp,
  IconDownload,
  IconCheck,
  IconX
} from "@tabler/icons-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import logo from "@/assets/logo.png";

import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { EvaluationData } from "@/lib/features/evaluation/evaluationSlice";

const technicalKeys: (keyof EvaluationData)[] = [
  "dribbling", "ballMastery", "runningWithBall", "rangePassing",
  "strikingFinishing", "defending", "firstTouch", "nonDominantFoot"
];
const physicalKeys: (keyof EvaluationData)[] = [
  "speedAcceleration", "movement", "balance", "power", "strength", "agility", "coordination"
];
const mentalKeys: (keyof EvaluationData)[] = [
  "gameAwareness", "gamesUnderstanding", "decisionMaking", "concentration", "leadership", "desire", "maturity"
];

const DEFAULT_EVALUATION = {
  dribbling: 2,
  ballMastery: 2,
  runningWithBall: 2,
  rangePassing: 2,
  strikingFinishing: 2,
  defending: 2,
  firstTouch: 2,
  nonDominantFoot: 2,
  gameAwareness: 2,
  gamesUnderstanding: 2,
  decisionMaking: 2,
  concentration: 2,
  leadership: 2,
  desire: 2,
  maturity: 2,
  speedAcceleration: 2,
  movement: 2,
  balance: 2,
  power: 2,
  strength: 2,
  agility: 2,
  coordination: 2,
};

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

const mockCards = [
  { id: 101, tag: "U-15", name: "Marcus Silva", date: "Jan 25, 2026", coach: "John Smith", rating: 7.2, tech: 16, phys: 14, ment: 15, pos: "Forward", tier: "TIER 1", btnColor: "text-red-500 bg-red-500" },
  { id: 102, tag: "U-16", name: "Sarah Williams", date: "Jan 25, 2026", coach: "Mike Williams", rating: 8.5, tech: 18, phys: 16, ment: 18, pos: "Midfielder", tier: "TIER 2", btnColor: "text-emerald-500 bg-emerald-500" },
  { id: 103, tag: "U-17", name: "David Chen", date: "Jan 25, 2026", coach: "Sarah Johnson", rating: 7.2, tech: 15, phys: 14, ment: 16, pos: "Midfielder", tier: "TIER 1", btnColor: "text-red-500 bg-red-500" },
  { id: 104, tag: "U-17", name: "Alex Jordan", date: "Jan 25, 2026", coach: "Sarah Johnson", rating: 8.5, tech: 19, phys: 17, ment: 18, pos: "Defender", tier: "TIER 2", btnColor: "text-emerald-500 bg-emerald-500" },
  { id: 105, tag: "U-19", name: "James Brown", date: "Jan 25, 2026", coach: "Mike Williams", rating: 8.5, tech: 18, phys: 15, ment: 17, pos: "Forward", tier: "TIER 1", btnColor: "text-yellow-500 bg-yellow-500" },
  { id: 106, tag: "U-16", name: "Sarah Williams", date: "Jan 25, 2026", coach: "Mike Williams", rating: 7.8, tech: 16, phys: 15, ment: 16, pos: "Midfielder", tier: "TIER 2", btnColor: "text-emerald-500 bg-emerald-500" }
];

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

const EvaluationCard = ({ 
  tag, 
  name, 
  date, 
  coach, 
  rating, 
  tech, 
  phys, 
  ment, 
  pos, 
  tier, 
  onClick
}: any) => (
  <div 
    onClick={onClick}
    className="bg-[#111111] border border-white/20 rounded-3xl p-6 flex flex-col gap-6 group hover:border-white/40 transition-all cursor-pointer"
  >
    <div className="flex justify-between items-center">
      <span className="bg-white/5 border border-white/20 rounded-full px-4 py-1 text-[10px] font-bold text-white/60">{tag}</span>
    </div>

    <div className="space-y-1">
      <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold">
        <IconClock size={12} /> {date}
      </div>
      <h3 className="text-white text-xl font-black font-orbitron group-hover:text-[#E31B23] transition-colors">{name}</h3>
      <p className="text-white/40 text-[10px] font-bold flex items-center gap-1">
        <IconUsers size={12} /> Coach: {coach}
      </p>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <p className="text-white/40 text-[10px] font-bold uppercase">Overall Rating:</p>
        <p className="text-white/60 text-[10px] font-bold">({rating}/10)</p>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400" 
          style={{ width: `${rating * 10}%` }} 
        />
      </div>
    </div>

    <div className="flex justify-between items-center">
       <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
             <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-emerald-400 rounded-full" />
             </div>
             {tech}
          </div>
          <div className="flex items-center gap-1.5 text-yellow-400 text-[10px] font-bold">
             <div className="w-2.5 h-2.5 rounded-full border-2 border-yellow-400 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-yellow-400 rounded-full" />
             </div>
             {phys}
          </div>
          <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold">
             <div className="w-2.5 h-2.5 rounded-full border-2 border-red-400 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-red-400 rounded-full" />
             </div>
             {ment}
          </div>
       </div>
       <div className="flex items-center gap-3">
          <span className="text-white/40 text-[10px] font-bold uppercase">{pos} · {tier}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toast.info("Deletion is managed on the coach dashboard.");
            }}
            className="text-red-500/40 hover:text-red-500 transition-colors cursor-pointer"
          >
             <IconTrash size={16} />
          </button>
       </div>
    </div>
  </div>
);

export const PlayerEvaluation = () => {
  const players = useAppSelector((state) => state.player.players);
  const evaluationRecords = useAppSelector((state) => state.evaluation.records);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const evaluatedItems = Object.values(evaluationRecords);

  const evaluatedCards = evaluatedItems.map((record) => {
    const player = players.find(p => p.id === record.playerId);
    
    // Calculate tech, phys, ment scores
    const evaluation = record.evaluation;
    const techVal = technicalKeys.reduce((sum, key) => sum + (evaluation[key] ?? 2), 0);
    const physVal = physicalKeys.reduce((sum, key) => sum + (evaluation[key] ?? 2), 0);
    const mentVal = mentalKeys.reduce((sum, key) => sum + (evaluation[key] ?? 2), 0);
    const totalSum = techVal + physVal + mentVal;
    
    // rating maps sum of 22 items (max score 66) to 10 scale
    const rating = Number(((totalSum / 66) * 10).toFixed(1));
    
    let btnColor = "text-red-500 bg-red-500";
    if (rating >= 8.5) btnColor = "text-emerald-500 bg-emerald-500";
    else if (rating >= 7.5) btnColor = "text-yellow-500 bg-yellow-500";

    // Format date: "YYYY-MM-DD" -> "MMM DD, YYYY"
    let formattedDate = record.date;
    try {
      const d = new Date(record.date);
      formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch (e) {}

    return {
      id: record.playerId,
      name: record.playerName,
      date: formattedDate,
      coach: player?.coachName || "Coach N/A",
      rating,
      tech: techVal,
      phys: physVal,
      ment: mentVal,
      pos: player?.position || "Player",
      tag: player ? getPlayerTag(player) : "U-15",
      tier: player?.validationStatus === "verified" ? "TIER 1" : "TIER 2",
      btnColor,
    };
  });

  // Filter out mock cards if there is an active evaluated card with the same player name
  const activeEvaluatedNames = new Set(evaluatedCards.map(c => c.name.toLowerCase()));
  const filteredMockCards = mockCards.filter(mc => !activeEvaluatedNames.has(mc.name.toLowerCase()));
  const cardsToRender = [...evaluatedCards, ...filteredMockCards];

  const filteredCards = cardsToRender.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.pos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Summary Stats
  const totalEvalsCount = cardsToRender.length;
  const avgRatingVal = totalEvalsCount > 0 
    ? (cardsToRender.reduce((sum, c) => sum + Number(c.rating), 0) / totalEvalsCount).toFixed(1)
    : "0.0";
  const improvingCountVal = cardsToRender.filter(c => Number(c.rating) >= 8.0).length;
  
  // Count evaluations saved this month
  const thisMonthCount = 28 + evaluatedCards.filter(c => {
    try {
      const evalDate = new Date(c.date);
      const now = new Date();
      return evalDate.getMonth() === now.getMonth() && evalDate.getFullYear() === now.getFullYear();
    } catch(e) {
      return false;
    }
  }).length;

  // Retrieve evaluation data object for selected card (seeded or real Redux data)
  const getEvaluationData = (card: any) => {
    if (!card) return DEFAULT_EVALUATION as EvaluationData;
    const record = evaluationRecords[card.id];
    if (record?.evaluation) {
      return record.evaluation;
    }

    // Distribute mock scores based on aggregate tech/phys/ment values
    const mockEval = { ...DEFAULT_EVALUATION } as EvaluationData;
    
    // Distribute tech
    let techLeft = card.tech || 16;
    technicalKeys.forEach((key) => {
      const val = Math.min(3, Math.max(1, Math.ceil(techLeft / 6)));
      mockEval[key] = val;
      techLeft -= val;
    });

    // Distribute phys
    let physLeft = card.phys || 14;
    physicalKeys.forEach((key) => {
      const val = Math.min(3, Math.max(1, Math.ceil(physLeft / 6)));
      mockEval[key] = val;
      physLeft -= val;
    });

    // Distribute ment
    let mentLeft = card.ment || 15;
    mentalKeys.forEach((key) => {
      const val = Math.min(3, Math.max(1, Math.ceil(mentLeft / 6)));
      mockEval[key] = val;
      mentLeft -= val;
    });

    return mockEval;
  };

  // Download PDF Report
  const handleDownloadPDF = async () => {
    const page1 = document.getElementById("report-page-1");
    const page2 = document.getElementById("report-page-2");
    if (!selectedCard || !page1 || !page2) {
      toast.error("Evaluation elements not found in DOM.");
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
      const pdf = new jsPDF("l", "mm", "a4");
      const imgWidth = 297;
      const imgHeight = 210;

      // Capture Page 1
      toast.loading("Rendering Page 1...", { id: toastId });
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Capture Page 2
      toast.loading("Rendering Page 2...", { id: toastId });
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      toast.loading("Assembling PDF document...", { id: toastId });
      const imgData1 = canvas1.toDataURL("image/png");
      pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.addPage();
      const imgData2 = canvas2.toDataURL("image/png");
      pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.save(`Evaluation_Report_${selectedCard.name.replace(/\s+/g, "_")}.pdf`);
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

  // Render read-only circular rating indicators
  const renderReadOnlyRatingCircle = (
    key: keyof EvaluationData,
    targetVal: number,
    evalData: EvaluationData
  ) => {
    const isSelected = evalData[key] === targetVal;
    let bgColor = "#ffffff";
    if (isSelected) {
      if (targetVal === 1) bgColor = "#2563EB";
      else if (targetVal === 2) bgColor = "#EAB308";
      else if (targetVal === 3) bgColor = "#16A34A";
    } else {
      if (targetVal === 1) bgColor = "#DBEAFE";
      else if (targetVal === 2) bgColor = "#FEF9C3";
      else if (targetVal === 3) bgColor = "#DCFCE7";
    }

    return (
      <div className="w-14 flex justify-center">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center border border-transparent shadow-sm"
          style={{ backgroundColor: bgColor }}
        >
          {isSelected && <IconCheck className="w-3 h-3 text-white stroke-[3px]" />}
        </div>
      </div>
    );
  };

  // Get matching player for selected card details
  const matchingPlayer = selectedCard ? players.find((p) => p.id === selectedCard.id) : null;
  const playerImgSrc = selectedCard
    ? (typeof matchingPlayer?.playerImage === "string"
        ? matchingPlayer.playerImage
        : (matchingPlayer?.playerImage?.src || "/ronaldo.png"))
    : "/ronaldo.png";

  const activeEvaluationData = selectedCard ? getEvaluationData(selectedCard) : (DEFAULT_EVALUATION as EvaluationData);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Player Evaluation</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">Create and manage player development progress reports</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard label="Avg. Overall Rating" value={avgRatingVal} icon={IconStar} bgColor="bg-red-500" textColor="text-red-500" />
        <SummaryCard label="Improving Players" value={improvingCountVal} icon={IconTrendingUp} bgColor="bg-emerald-500" textColor="text-emerald-500" />
        <SummaryCard label="Evaluated this Month" value={thisMonthCount} icon={IconFileText} bgColor="bg-blue-500" textColor="text-blue-500" />
        <SummaryCard label="Total Evaluations" value={totalEvalsCount} icon={IconUsers} bgColor="bg-yellow-500" textColor="text-yellow-500" />
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <Input 
                placeholder="Search players by name, team, or position..." 
                className="bg-[#111111] border-white/10 h-12 rounded-xl pl-12 text-white/60 font-medium" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Evaluation Grid */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Evaluations</h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-emerald-400 rounded-full" />
                  </div>
                  Technical
                </div>
                <div className="flex items-center gap-2 text-yellow-400 text-[10px] font-bold uppercase">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-yellow-400 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-yellow-400 rounded-full" />
                  </div>
                  Physical
                </div>
                <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-red-400 flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-red-400 rounded-full" />
                  </div>
                  Mental
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCards.map((card, idx) => (
                <EvaluationCard 
                  key={card.id ? `${card.id}-${idx}` : `mock-${idx}`}
                  tag={card.tag}
                  name={card.name}
                  date={card.date}
                  coach={card.coach}
                  rating={card.rating}
                  tech={card.tech}
                  phys={card.phys}
                  ment={card.ment}
                  pos={card.pos}
                  tier={card.tier}
                  btnColor={card.btnColor}
                  onClick={() => setSelectedCard(card)}
                />
              ))}
              {filteredCards.length === 0 && (
                <div className="col-span-full text-center py-16 border border-white/5 rounded-3xl bg-[#111111]/50 text-white/40 font-medium">
                  No evaluations found matching search query.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[340px] flex flex-col gap-8 shrink-0">
           {/* Most Improved */}
           <div className="bg-[#111111] border border-white/20 rounded-[32px] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(227,27,35,0.2)]">
                    <IconClock size={20} className="text-white" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Most Improved</h2>
              </div>
              <div className="space-y-4">
                 {[
                   { name: "Marcus Silva", team: "U-15", change: "+0.8", textColor: "text-emerald-600", border: "border-emerald-400", bgColor: "bg-emerald-100", down: false },
                   { name: "David Chen", team: "U-17", change: "+0.8", textColor: "text-emerald-600", border: "border-emerald-400", bgColor: "bg-emerald-100", down: false },
                   { name: "James Brown", team: "U-17", change: "+0.8", textColor: "text-emerald-600", border: "border-emerald-400", bgColor: "bg-emerald-100", down: false },
                   { name: "Alex Jordan", team: "U-15", change: "-0.4", textColor: "text-red-600", border: "border-red-400", bgColor: "bg-red-100", down: true },
                 ].map((player, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         {player.down ? (
                           <IconTrendingUp size={16} className={`${player.textColor} rotate-180`} />
                         ) : (
                           <IconTrendingUp size={16} className={player.textColor} />
                         )}
                         <div>
                            <p className="text-white text-sm font-black">{player.name}</p>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{player.team}</p>
                         </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${player.textColor} ${player.bgColor} bg-opacity-20`}>
                        {player.change}
                      </span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Top Performers */}
           <div className="bg-[#111111] border border-white/20 rounded-[32px] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <IconHeart size={20} className="text-red-500" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Top Performers</h2>
              </div>
              <div className="space-y-6">
                 {[
                   { name: "James Brown", info: "U-17 · Goalkeeper", rating: "9.2" },
                   { name: "Marcus Silva", info: "U-15 · Forward", rating: "8.5" },
                   { name: "David Chen", info: "U-17 · Midfielder", rating: "7.8" },
                   { name: "Sarah Williams", info: "U-15 · Midfielder", rating: "7.5" },
                   { name: "Alex Jordan", info: "U-15 · Defender", rating: "7.2" },
                 ].map((player, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <span className="text-red-500 text-[10px] font-black font-orbitron">#{i+1}</span>
                         <div>
                            <p className="text-white text-sm font-bold">{player.name}</p>
                            <p className="text-white/40 text-[10px] font-bold uppercase">{player.info}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-1 text-white text-[10px] font-black font-orbitron">
                         <IconStar size={14} className="text-red-500 fill-red-500/20" />
                         {player.rating}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Evaluation Report Sheet Dialog Modal */}
      <Dialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
        <DialogContent 
          showCloseButton={false}
          className="!w-screen !h-screen !max-w-none !max-h-none !top-0 !left-0 !translate-x-0 !translate-y-0 !rounded-none !border-none bg-black/98 text-white p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          <DialogHeader className="flex flex-row justify-between items-center shrink-0 pb-4 border-b border-white/10 mb-6">
            <div>
              <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">
                Player Evaluation Report
              </DialogTitle>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">
                Development Report Sheet Overlay for {selectedCard?.name}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 bg-[#E31B23] hover:bg-[#ff2d35] border border-transparent text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(227,27,35,0.2)] cursor-pointer disabled:opacity-50 font-bold"
              >
                <IconDownload size={16} /> {isGeneratingPdf ? "Generating..." : "Download PDF"}
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all cursor-pointer font-bold"
              >
                <IconX size={16} /> Close
              </button>
            </div>
          </DialogHeader>

          {selectedCard && (
            <div className="flex flex-col items-center gap-8 py-6">
              {/* Printable Page 1 */}
              <div 
                id="report-page-1"
                className="w-[1130px] h-[800px] bg-white text-black p-12 rounded-2xl border border-gray-200 relative overflow-hidden flex flex-col justify-between select-none shrink-0"
              >
                {/* Header Banner Section */}
                <div className="flex justify-between items-center w-full relative z-10">
                  <div className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt="K10 Football Logo" className="h-10 object-contain" />
                  </div>
                  <div className="text-gray-500 text-xs font-bold font-mono">
                    Date: {selectedCard.date}
                  </div>
                </div>

                {/* Page 1 Body */}
                <div className="flex flex-col flex-1 justify-center py-6 relative z-10">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none font-heading uppercase">
                      PLAYER <span className="text-[#E31B23]">DEVELOPMENT</span> PROGRAMME
                    </h1>
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.25em] font-black">
                      TIER 1 PLAYER PROGRESS REPORT
                    </p>
                  </div>

                  {/* Player Info Row */}
                  <div className="flex gap-8 py-4 border-t border-b border-gray-100 text-gray-800 mt-6 max-w-[500px]">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-black block tracking-wider">Player Name</span>
                      <span className="text-base font-extrabold text-[#E31B23]">{selectedCard.name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-black block tracking-wider">Age Group</span>
                      <span className="text-base font-extrabold text-gray-900">{selectedCard.tag}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-black block tracking-wider">Centre</span>
                      <span className="text-base font-extrabold text-[#E31B23]">{matchingPlayer?.academyName || "Santos FC Academy"}</span>
                    </div>
                  </div>

                  {/* Legend/Key */}
                  <div className="mt-8 space-y-3">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Key:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: "#2563EB" }} />
                        <span className="text-gray-700 text-sm font-extrabold">Area For Improvement</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: "#EAB308" }} />
                        <span className="text-gray-700 text-sm font-extrabold">Good</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: "#16A34A" }} />
                        <span className="text-gray-700 text-sm font-extrabold">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Player Cut-out Image */}
                <div className="absolute right-0 bottom-0 h-[80%] w-[50%] flex items-end justify-end pointer-events-none z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={playerImgSrc}
                    alt={selectedCard.name}
                    className="h-full object-contain object-bottom relative z-10"
                  />
                </div>
              </div>

              {/* Printable Page 2 */}
              <div 
                id="report-page-2"
                className="w-[1130px] h-[800px] bg-white text-black p-8 rounded-2xl border border-gray-200 relative overflow-hidden flex flex-col justify-between select-none shrink-0"
              >
                <div className="flex justify-between items-center w-full relative z-10">
                  <div className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt="K10 Football Logo" className="h-10 object-contain" />
                  </div>
                  <div className="text-gray-500 text-xs font-bold font-mono">
                    Date: {selectedCard.date}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-2 space-y-3">
                  {/* Techniques */}
                  <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-2">
                    <h3 className="text-sm font-black text-gray-900 border-b pb-1 uppercase tracking-wide">Techniques</h3>
                    <div className="grid grid-cols-2 gap-x-12">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[7px] font-black uppercase text-gray-400 tracking-wider pb-1">
                          <span>Skill</span>
                          <div className="flex gap-2 w-[180px] justify-between text-center">
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Improvement</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Good</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Excellent</span>
                          </div>
                        </div>
                        {[
                          { label: "Dribbling", key: "dribbling" },
                          { label: "Ball Mastery", key: "ballMastery" },
                          { label: "Running with the Ball", key: "runningWithBall" },
                          { label: "Range of Passing", key: "rangePassing" },
                        ].map((skill) => (
                          <div key={skill.key} className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0">
                            <span className="text-xs font-bold text-gray-700">{skill.label}</span>
                            <div className="flex gap-2 w-[180px] justify-between">
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 1, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 2, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 3, activeEvaluationData)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[7px] font-black uppercase text-gray-400 tracking-wider pb-1">
                          <span>Skill</span>
                          <div className="flex gap-2 w-[180px] justify-between text-center">
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Improvement</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Good</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Excellent</span>
                          </div>
                        </div>
                        {[
                          { label: "Striking / Finishing", key: "strikingFinishing" },
                          { label: "Defending", key: "defending" },
                          { label: "First Touch", key: "firstTouch" },
                          { label: "Non Dominant Foot", key: "nonDominantFoot" },
                        ].map((skill) => (
                          <div key={skill.key} className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0">
                            <span className="text-xs font-bold text-gray-700">{skill.label}</span>
                            <div className="flex gap-2 w-[180px] justify-between">
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 1, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 2, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 3, activeEvaluationData)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-2">
                    <h3 className="text-sm font-black text-gray-900 border-b pb-1 uppercase tracking-wide">Characteristics</h3>
                    <div className="grid grid-cols-2 gap-x-12">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[7px] font-black uppercase text-gray-400 tracking-wider pb-1">
                          <span>Skill</span>
                          <div className="flex gap-2 w-[180px] justify-between text-center">
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Improvement</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Good</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Excellent</span>
                          </div>
                        </div>
                        {[
                          { label: "Game Awareness", key: "gameAwareness" },
                          { label: "Games Understanding", key: "gamesUnderstanding" },
                          { label: "Decision Making", key: "decisionMaking" },
                          { label: "Concentration", key: "concentration" },
                        ].map((skill) => (
                          <div key={skill.key} className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0">
                            <span className="text-xs font-bold text-gray-700">{skill.label}</span>
                            <div className="flex gap-2 w-[180px] justify-between">
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 1, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 2, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 3, activeEvaluationData)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[7px] font-black uppercase text-gray-400 tracking-wider pb-1">
                          <span>Skill</span>
                          <div className="flex gap-2 w-[180px] justify-between text-center">
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Improvement</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Good</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Excellent</span>
                          </div>
                        </div>
                        {[
                          { label: "Leadership", key: "leadership" },
                          { label: "Desire", key: "desire" },
                          { label: "Maturity", key: "maturity" },
                        ].map((skill) => (
                          <div key={skill.key} className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0">
                            <span className="text-xs font-bold text-gray-700">{skill.label}</span>
                            <div className="flex gap-2 w-[180px] justify-between">
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 1, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 2, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 3, activeEvaluationData)}
                            </div>
                          </div>
                        ))}
                        <div className="py-0.5 opacity-0 pointer-events-none select-none text-[10px] font-bold">Spacer</div>
                      </div>
                    </div>
                  </div>

                  {/* Physical */}
                  <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-2">
                    <h3 className="text-sm font-black text-gray-900 border-b pb-1 uppercase tracking-wide">Physical</h3>
                    <div className="grid grid-cols-2 gap-x-12">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[7px] font-black uppercase text-gray-400 tracking-wider pb-1">
                          <span>Skill</span>
                          <div className="flex gap-2 w-[180px] justify-between text-center">
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Improvement</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Good</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Excellent</span>
                          </div>
                        </div>
                        {[
                          { label: "Speed + Acceleration", key: "speedAcceleration" },
                          { label: "Movement", key: "movement" },
                          { label: "Balance", key: "balance" },
                          { label: "Power", key: "power" },
                        ].map((skill) => (
                          <div key={skill.key} className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0">
                            <span className="text-xs font-bold text-gray-700">{skill.label}</span>
                            <div className="flex gap-2 w-[180px] justify-between">
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 1, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 2, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 3, activeEvaluationData)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[7px] font-black uppercase text-gray-400 tracking-wider pb-1">
                          <span>Skill</span>
                          <div className="flex gap-2 w-[180px] justify-between text-center">
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Improvement</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Good</span>
                            <span className="w-14 text-[8px] font-black uppercase text-gray-400 tracking-wider">Excellent</span>
                          </div>
                        </div>
                        {[
                          { label: "Strength", key: "strength" },
                          { label: "Agility", key: "agility" },
                          { label: "Co-ordination", key: "coordination" },
                        ].map((skill) => (
                          <div key={skill.key} className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0">
                            <span className="text-xs font-bold text-gray-700">{skill.label}</span>
                            <div className="flex gap-2 w-[180px] justify-between">
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 1, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 2, activeEvaluationData)}
                              {renderReadOnlyRatingCircle(skill.key as keyof typeof DEFAULT_EVALUATION, 3, activeEvaluationData)}
                            </div>
                          </div>
                        ))}
                        <div className="py-0.5 opacity-0 pointer-events-none select-none text-[10px] font-bold">Spacer</div>
                      </div>
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
