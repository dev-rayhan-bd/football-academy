"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { addReportRequest } from "@/lib/constants/reports";
import { StripePaymentModal } from "./StripePaymentModal";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { addGameReportRequest } from "@/lib/features/reports/reportsSlice";
import { 
  IconCheck, 
  IconCalendar, 
  IconChevronDown, 
  IconCircleCheck
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const PlayerRequestWizard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { playerData } = usePlayer();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    opponent: "Chelsea U19",
    gameDate: new Date().toISOString().split("T")[0],
    gameLocation: "London",
    league: "Friendly League",
    weather: "SUNNY",
    temperature: "24",
    message: ""
  });

  const handleChange = (field: string, val: string) => {
    setFormData({ ...formData, [field]: val });
  };

  const isFormValid = () => {
    return (
      formData.opponent.trim() &&
      formData.gameDate.trim() &&
      formData.gameLocation.trim() &&
      formData.league.trim() &&
      formData.weather.trim() &&
      formData.temperature.trim()
    );
  };

  const handlePaySuccess = () => {
    // Add request to REPORT_REQUESTS_DATA
    const newReq = addReportRequest({
      playerName: playerData.fullName,
      playerPosition: playerData.position,
      date: formData.gameDate,
      status: "Pending",
      coachName: playerData.coachName || "Pep Guardiola",
      playerId: playerData.id,
      opponent: formData.opponent,
      location: formData.gameLocation,
      league: formData.league,
      weather: formData.weather,
      temperature: formData.temperature,
      message: formData.message
    });

    // Sync to Redux store
    dispatch(addGameReportRequest(newReq));

    toast.success("Payment successful! Request submitted to Coach.");
    setStep(3);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      {step === 1 && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic font-orbitron">Request Game Report</h1>
            <p className="text-gray-500 text-sm italic">Request a professional match analysis from your coach.</p>
          </div>

          {/* Fee Section */}
          <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 flex justify-between items-center shadow-2xl">
            <div className="space-y-1">
              <div className="text-gray-400 text-sm font-medium">Evaluation Fee</div>
              <div className="text-gray-500 text-xs italic">Secures professional analysis from your coach</div>
            </div>
            <div className="text-4xl font-black text-[#E31B23] tracking-tighter italic font-orbitron">$6.99</div>
          </div>

          {/* Form details card */}
          <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-8 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00FF62]/10 border border-[#00FF62] flex items-center justify-center">
                <IconCheck size={18} className="text-[#00FF62]" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight font-orbitron">Match Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-orbitron">Opponent Team:</Label>
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#E31B23]" 
                  value={formData.opponent}
                  onChange={(e) => handleChange("opponent", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-orbitron">Game Date:</Label>
                <div className="relative">
                  <Input 
                    className="bg-[#161616] border-white/10 text-white h-12 focus:border-[#E31B23]" 
                    value={formData.gameDate}
                    onChange={(e) => handleChange("gameDate", e.target.value)}
                  />
                  <IconCalendar className="absolute right-4 top-3.5 text-gray-500" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-orbitron">Stadium / Location:</Label>
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#E31B23]" 
                  value={formData.gameLocation}
                  onChange={(e) => handleChange("gameLocation", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-orbitron">League / Game Type:</Label>
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#E31B23]" 
                  value={formData.league}
                  onChange={(e) => handleChange("league", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-orbitron">Weather/Temperature:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select 
                      className="w-full bg-[#161616] border border-white/10 text-white h-12 rounded-lg px-4 uppercase font-bold appearance-none focus:outline-none focus:border-[#E31B23]"
                      value={formData.weather}
                      onChange={(e) => handleChange("weather", e.target.value)}
                    >
                      <option value="SUNNY">SUNNY</option>
                      <option value="RAINY">RAINY</option>
                      <option value="CLOUDY">CLOUDY</option>
                      <option value="WINDY">WINDY</option>
                      <option value="SNOWY">SNOWY</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
                  </div>
                  <div className="relative">
                    <Input 
                      className="bg-[#161616] border-white/10 text-white h-12 font-bold focus:border-[#E31B23]" 
                      value={formData.temperature}
                      onChange={(e) => handleChange("temperature", e.target.value)}
                    />
                    <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold font-orbitron">C</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-orbitron">Assigned Coach:</Label>
                <Input 
                  className="bg-[#161616]/50 border-white/5 text-gray-500 h-12 uppercase font-bold cursor-not-allowed" 
                  value={playerData.coachName || "Pep Guardiola"} 
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-orbitron">Message / Note to Coach:</Label>
              <textarea
                placeholder="Write any details or focus areas you want the coach to analyze..."
                className="w-full bg-[#161616] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E31B23] h-28 resize-none transition-colors"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="flex-1 h-14 rounded-xl border-white/10 bg-transparent text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors font-orbitron"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setStep(2)}
              disabled={!isFormValid()}
              className="flex-1 bg-[#00FF62] hover:bg-[#00D150] text-black h-14 rounded-xl font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,255,98,0.2)] font-orbitron italic"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <StripePaymentModal 
          onPay={handlePaySuccess}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <div className="space-y-8 max-w-lg mx-auto text-center py-12 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6 text-green-500">
            <IconCircleCheck size={48} stroke={1.5} />
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter font-orbitron">Request Submitted</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your payment of **$6.99** was processed successfully. We have notified Coach **{playerData.coachName || "Pep Guardiola"}** of your analysis request. Once complete, the report will appear on your dashboard.
          </p>

          <Button 
            onClick={() => router.push("/dashboard/player/game-reports")}
            className="w-full h-14 rounded-xl bg-[#00FF62] hover:bg-[#00D150] text-black font-bold uppercase tracking-widest transition-all font-orbitron"
          >
            Back to Reports
          </Button>
        </div>
      )}
    </div>
  );
};
export default PlayerRequestWizard;
