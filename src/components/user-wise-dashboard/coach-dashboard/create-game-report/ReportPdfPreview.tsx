"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadarChart } from "./RadarChart";
import { IconDownload, IconCheck, IconLoader2 } from "@tabler/icons-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface ReportPdfPreviewProps {
  formData: any;
  characteristics: string[];
  stats: Record<string, number>;
  goalMarkers: { x: number; y: number }[];
  pitchMarkers: any[];
  onSave: (overallRating: number) => void;
  onBack: () => void;
  viewOnly?: boolean;
  isPlayer?: boolean;
}

export const ReportPdfPreview = ({
  formData,
  characteristics,
  stats,
  goalMarkers,
  pitchMarkers,
  onSave,
  onBack,
  viewOnly,
  isPlayer
}: ReportPdfPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const isGK = formData.position === "GOALKEEPER";

  // Helper to scale/normalize stats to a rating between 50 and 99
  const mapStat = (val: number, maxVal = 15) => {
    return Math.min(99, Math.max(50, Math.round(50 + (val / maxVal) * 49)));
  };

  // Compute attributes for the radar chart
  const radarStats = isGK
    ? [
        { label: "DIV", value: mapStat((stats.reflex || 0) + (stats.savesAccurate || 0), 25) },
        { label: "HAN", value: mapStat((stats.handling || 0) + (stats.punching || 0), 25) },
        { label: "KIC", value: mapStat((stats.throwing || 0) + (stats.passAccurate || 0), 25) },
        { label: "REF", value: mapStat((stats.reflex || 0) + (stats.penaltiesSaves || 0) * 5, 20) },
        { label: "SPD", value: mapStat((stats.reactions || 0) + (stats.appearances || 0), 25) },
        { label: "POS", value: mapStat((stats.aerialAbility || 0) + (stats.savesAccurate || 0), 25) }
      ]
    : [
        { label: "PAC", value: mapStat((stats.reactions || 0) + (characteristics.includes("FAST") ? 8 : 4), 20) },
        { label: "SHO", value: mapStat((stats.goalScored || 0) * 3 + (stats.shotsOnGoal || 0) + (stats.penaltiesTaken || 0), 25) },
        { label: "PAS", value: mapStat((stats.assists || 0) * 2 + (stats.passAccurate || 0), 25) },
        { label: "DRI", value: mapStat((stats.passAccurate || 0) + (characteristics.includes("SKILLFUL") ? 8 : 4), 20) },
        { label: "DEF", value: mapStat((stats.standTackle || 0) + (stats.slidingTackle || 0) + (stats.interception || 0), 30) },
        { label: "PHY", value: mapStat((stats.appearances || 0) + (stats.savesAccurate || 0), 30) }
      ];

  const overallRating = Math.round(
    radarStats.reduce((sum, s) => sum + s.value, 0) / radarStats.length
  );

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Player_Analysis_Profile_${formData.playerName.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic font-orbitron">Report Generated</h1>
        <p className="text-gray-400 text-sm">Preview the generated Player Analysis Profile PDF and save it.</p>
      </div>

      {/* PDF Container (Styled exactly like the 3rd image, print-friendly white background) */}
      <div className="border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-white p-1">
        <div 
          ref={previewRef} 
          id="pdf-report-content" 
          className="bg-white text-slate-800 p-10 font-sans relative overflow-hidden select-none w-full"
          style={{ width: "794px", height: "1123px", minWidth: "794px", minHeight: "1123px" }} // Exact A4 aspect ratio in pixels (96 DPI)
        >
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
            <img src="/logo.png" alt="Logo Watermark" className="w-[500px] object-contain" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b-4 border-slate-900 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="K10 Logo" className="w-12 h-12 object-contain" />
              <div>
                <div className="text-xs font-black tracking-widest text-slate-900 font-orbitron">K10 FOOTBALL</div>
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest font-orbitron">ANALYSIS CV</div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-sky-500 font-orbitron uppercase tracking-tighter italic">
                PLAYER ANALYSIS PROFILE
              </h2>
              <div className="text-[10px] text-slate-900 font-black uppercase tracking-widest mt-1">
                POSITION : {formData.position} ⚽
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-black tracking-widest text-slate-900 font-orbitron">K10 FOOTBALL</div>
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest font-orbitron">ANALYSIS CV</div>
              </div>
              <img src="/logo.png" alt="K10 Logo" className="w-12 h-12 object-contain" />
            </div>
          </div>

          {/* Body Content */}
          <div className="relative z-10 grid grid-cols-12 gap-6 mb-6">
            {/* Player details */}
            <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-3.5 text-[11px] font-medium text-slate-600">
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">PLAYER NAME:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5 uppercase">{formData.playerName}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">CLUB NAME:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5 uppercase">{formData.clubName}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">DOB:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5">{formData.dob}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">MATCHES PLAYED:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5">{formData.matchesPlayed}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">WEIGHT:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5">{formData.weight} KG</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">MINUTES PLAYED:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5">{formData.minutesPlayed} MIN</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">HEIGHT:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5">{formData.height} M</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">MAN OF THE MATCH:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5">{formData.manOfTheMatch}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 uppercase font-orbitron">FOOT:</span>
                <p className="text-slate-700 text-xs font-bold mt-0.5 uppercase">{formData.foot}</p>
              </div>
            </div>

            {/* FUT player card photo preview */}
            <div className="col-span-4 flex justify-end">
              <div className="w-36 h-48 border-2 border-sky-400 bg-sky-50 rounded-2xl p-2 relative shadow-md flex flex-col items-center justify-between">
                {/* FUT card header */}
                <div className="flex justify-between w-full items-start">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-black text-sky-600 font-orbitron italic leading-none">{overallRating}</div>
                    <div className="text-[8px] font-bold text-sky-500 uppercase font-orbitron leading-none mt-0.5">{formData.position.slice(0,3)}</div>
                  </div>
                  <img src="/logo.png" alt="Club Logo" className="w-5 h-5 object-contain" />
                </div>
                {/* Player image in FUT Card */}
                <div className="w-24 h-28 overflow-hidden relative mt-1 flex items-end justify-center">
                  <img 
                    src={isGK ? "/mini__GP15525.webp" : "/sergio-ramos.png"} 
                    alt="Player Card Image" 
                    className="h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = isGK ? "/pngegg.png" : "/ronaldo.png";
                    }}
                  />
                </div>
                {/* FUT card footer */}
                <div className="w-full text-center bg-sky-500/10 py-0.5 rounded border border-sky-400/20 mt-1">
                  <div className="text-[10px] font-black text-sky-600 truncate uppercase font-orbitron leading-none">{formData.playerName.split(" ")[0]}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Player Characteristic Section */}
          <div className="relative z-10 mb-6">
            <div className="bg-sky-500 text-white font-orbitron px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-wider mb-3 shadow">
              PLAYER CHARACTERISTIC:
            </div>
            <div className="flex flex-wrap gap-4 pl-2">
              {characteristics.map(tag => (
                <div key={tag} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-800">
                  <span className="text-sky-500">⚽</span>
                  <span className="font-orbitron">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Match Information Section */}
          <div className="relative z-10 mb-6">
            <div className="bg-sky-500 text-white font-orbitron px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-wider mb-4 shadow">
              MATCH INFORMATION
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3.5 text-[11px] font-medium text-slate-600 pl-2">
              <div>
                <span className="font-bold text-slate-950 font-orbitron">SCOUT NAME:</span>
                <span className="ml-2 text-slate-700 font-bold uppercase">{formData.scoutName}</span>
              </div>
              <div>
                <span className="font-bold text-slate-950 font-orbitron">GAME DATE:</span>
                <span className="ml-2 text-slate-700 font-bold">{formData.gameDate}</span>
              </div>
              <div>
                <span className="font-bold text-slate-950 font-orbitron">MATCH RESULT:</span>
                <span className="ml-2 text-slate-700 font-bold uppercase">{formData.matchResult}</span>
              </div>
              <div>
                <span className="font-bold text-slate-950 font-orbitron">GAME LOCATION:</span>
                <span className="ml-2 text-slate-700 font-bold uppercase">{formData.gameLocation}</span>
              </div>
              <div>
                <span className="font-bold text-slate-950 font-orbitron">WEATHER/TEMPERATURE:</span>
                <span className="ml-2 text-slate-700 font-bold uppercase">{formData.weather} {formData.temperature}C</span>
              </div>
              <div>
                <span className="font-bold text-slate-950 font-orbitron">GAME TYPE:</span>
                <span className="ml-2 text-slate-700 font-bold uppercase">{formData.gameType}</span>
              </div>
            </div>
          </div>

          {/* Match Statistics Section */}
          <div className="relative z-10 mb-6">
            <div className="bg-sky-500 text-white font-orbitron px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-wider mb-4 shadow">
              MATCH STATISTICS
            </div>
            <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-[10px] pl-2">
              {[
                { label: "Shots on Goal:", val: stats.shotsOnGoal || 0 },
                { label: "Stand Tackle:", val: stats.standTackle || 0 },
                { label: "Appearances:", val: stats.appearances || 0 },
                { label: "Goals Scored:", val: stats.goalsScored || 0 },
                { label: "Sliding Tackle:", val: stats.slidingTackle || 0 },
                { label: "Fault:", val: stats.fault || 0 },
                { label: "Assists:", val: stats.assists || 0 },
                { label: "Interception:", val: stats.interception || 0 },
                { label: "Punching:", val: stats.punching || 0 },
                { label: "Pass Accurate:", val: stats.passAccurate || 0 },
                { label: "Saves Accurate:", val: stats.savesAccurate || 0 },
                { label: "Handling:", val: stats.handling || 0 },
                { label: "Wrong Pass:", val: stats.wrongPass || 0 },
                { label: "Goals Unsave:", val: stats.goalUnsave || 0 },
                { label: "Reflex:", val: stats.reflex || 0 },
                { label: "Free Kick:", val: stats.freeKick || 0 },
                { label: "Penalties Save:", val: stats.penaltiesSaves || 0 },
                { label: "Aerial Ability:", val: stats.aerialAbility || 0 },
                { label: "Corner Kick:", val: stats.cornerKick || 0 },
                { label: "Red Card:", val: stats.redCard || 0 },
                { label: "Throwing:", val: stats.throwing || 0 },
                { label: "Penalties Taken:", val: stats.penaltiesTaken || 0 },
                { label: "Yellow Card:", val: stats.yellowCard || 0 },
                { label: "Reactions:", val: stats.reactions || 0 }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-100 py-1 pr-2">
                  <span className="text-slate-500 font-bold uppercase font-orbitron">{item.label}</span>
                  <span className="text-slate-800 font-black font-orbitron">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section (Radar, Overall, Logos) */}
          <div className="relative z-10 flex items-center justify-between border-t-2 border-slate-200 pt-6 mt-6">
            {/* Radar Chart */}
            <div className="w-[180px]">
              <RadarChart 
                stats={radarStats} 
                size={140} 
                color="#0284c7" 
                fillColor="rgba(2, 132, 199, 0.25)" 
              />
            </div>

            {/* Overall score */}
            <div className="text-center flex-1">
              <div className="text-4xl font-black text-emerald-600 font-orbitron tracking-tighter italic">
                OVERALL = {overallRating}%
              </div>
            </div>

            {/* Logo and tag */}
            <div className="flex flex-col items-center gap-1.5 w-[180px]">
              <img src="/logo.png" alt="K10 Logo" className="w-10 h-10 object-contain" />
              <div className="text-center leading-none">
                <div className="text-[10px] font-black tracking-widest text-slate-900 font-orbitron">K10 FOOTBALL</div>
                <div className="text-[7px] text-slate-500 font-bold uppercase tracking-widest font-orbitron">ANALYSIS CV</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={downloading}
          className="flex-1 border-white/10 bg-transparent text-white h-14 rounded-xl font-bold uppercase tracking-widest hover:bg-white/5 transition-colors font-orbitron"
        >
          Back
        </Button>
        <Button 
          onClick={handleDownloadPdf}
          disabled={downloading}
          className="flex-1 bg-sky-500 hover:bg-sky-400 text-white h-14 rounded-xl font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center gap-2 font-orbitron"
        >
          {downloading ? (
            <>
              <IconLoader2 className="animate-spin" size={18} />
              Generating PDF...
            </>
          ) : (
            <>
              <IconDownload size={18} />
              Download PDF
            </>
          )}
        </Button>
        <Button 
          onClick={() => onSave(overallRating)}
          disabled={downloading}
          className="flex-1 bg-[#00FF62] hover:bg-[#00D150] text-black h-14 rounded-xl font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,255,98,0.2)] flex items-center justify-center gap-2 font-orbitron"
        >
          <IconCheck size={18} />
          {isPlayer ? "Proceed to Payment" : "Save & Finish"}
        </Button>
      </div>
    </div>
  );
};
