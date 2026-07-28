"use client";
import React, { useState } from "react";
import { 
  IconChevronDown, 
  IconCalendar, 
  IconX,
  IconCheck
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReportDetailsFormProps {
  formData: any;
  setFormData: (data: any) => void;
  characteristics: string[];
  setCharacteristics: (tags: string[]) => void;
  onCancel: () => void;
  onContinue: () => void;
}

export const ReportDetailsForm = ({
  formData,
  setFormData,
  characteristics,
  setCharacteristics,
  onCancel,
  onContinue
}: ReportDetailsFormProps) => {
  const [newTag, setNewTag] = useState("");

  const handleChange = (field: string, val: any) => {
    setFormData({ ...formData, [field]: val });
  };

  const addTag = () => {
    const trimmed = newTag.trim().toUpperCase();
    if (trimmed && !characteristics.includes(trimmed)) {
      setCharacteristics([...characteristics, trimmed]);
      setNewTag("");
    }
  };

  const removeCharacteristic = (tag: string) => {
    setCharacteristics(characteristics.filter(c => c !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const isFormValid = () => {
    return (
      formData.playerName?.trim() &&
      formData.dob?.trim() &&
      formData.clubName?.trim() &&
      formData.position?.trim() &&
      formData.foot?.trim() &&
      formData.weight?.trim() &&
      formData.height?.trim() &&
      formData.matchesPlayed?.trim() &&
      formData.minutesPlayed?.trim() &&
      formData.manOfTheMatch?.trim() &&
      formData.scoutName?.trim() &&
      formData.gameType?.trim() &&
      formData.gameDate?.trim() &&
      formData.gameLocation?.trim() &&
      formData.matchResult?.trim() &&
      formData.weather?.trim() &&
      formData.temperature?.trim()
    );
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic font-orbitron">Create Game Reports</h1>
        <p className="text-gray-500 text-sm italic">Create Professional Football Player Game Reports</p>
      </div>

      {/* Fee Section */}
      <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 flex justify-between items-center shadow-2xl">
        <div className="space-y-1">
          <div className="text-gray-400 text-sm font-medium">Report Fee</div>
          <div className="text-gray-500 text-xs italic">Professional analysis delivered within 48 hours</div>
        </div>
        <div className="text-4xl font-black text-[#E31B23] tracking-tighter italic font-orbitron">$6.99</div>
      </div>

      <div className="space-y-8">
        {/* Player Information */}
        <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00FF62]/10 border border-[#00FF62] flex items-center justify-center">
              <IconCheck size={18} className="text-[#00FF62]" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight font-orbitron">Player Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Player Name:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.playerName}
                onChange={(e) => handleChange("playerName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date of Birth:</Label>
              <div className="relative">
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                />
                <IconCalendar className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Club Name:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.clubName}
                onChange={(e) => handleChange("clubName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Position:</Label>
              <div className="relative">
                <select 
                  className="w-full bg-[#161616] border border-white/10 text-white h-12 rounded-lg px-4 uppercase font-bold appearance-none focus:outline-none focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                >
                  <option value="STRIKER">STRIKER</option>
                  <option value="MIDFIELDER">MIDFIELDER</option>
                  <option value="WINGER">WINGER</option>
                  <option value="DEFENDER">DEFENDER</option>
                  <option value="GOALKEEPER">GOALKEEPER</option>
                </select>
                <IconChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Foot:</Label>
              <div className="relative">
                <select 
                  className="w-full bg-[#161616] border border-white/10 text-white h-12 rounded-lg px-4 uppercase font-bold appearance-none focus:outline-none focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]"
                  value={formData.foot}
                  onChange={(e) => handleChange("foot", e.target.value)}
                >
                  <option value="RIGHT">RIGHT</option>
                  <option value="LEFT">LEFT</option>
                  <option value="BOTH">BOTH</option>
                </select>
                <IconChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Characteristic:</Label>
              <div className="bg-[#161616] border border-white/10 rounded-lg min-h-12 px-4 py-2 flex flex-wrap gap-2 items-center">
                {characteristics.map(tag => (
                  <div key={tag} className="flex items-center gap-1 text-[10px] font-black text-white bg-[#0D0D0D] border border-white/10 px-3 py-1 rounded-full group cursor-pointer hover:border-red-500 transition-all font-orbitron">
                    {tag}
                    <IconX size={10} className="text-red-500 cursor-pointer" onClick={() => removeCharacteristic(tag)} />
                  </div>
                ))}
                <input 
                  type="text" 
                  placeholder={characteristics.length === 0 ? "Type & press Enter..." : "+ Add"}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="bg-transparent border-none text-xs font-bold text-white focus:outline-none flex-1 min-w-[80px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Weight:</Label>
              <div className="relative">
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
                <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold font-orbitron">KG</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Height:</Label>
              <div className="relative">
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                />
                <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold font-orbitron">M</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Matches Played:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.matchesPlayed}
                onChange={(e) => handleChange("matchesPlayed", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Minutes Played:</Label>
              <div className="relative">
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                  value={formData.minutesPlayed}
                  onChange={(e) => handleChange("minutesPlayed", e.target.value)}
                />
                <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold font-orbitron">min</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Man of the Match:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.manOfTheMatch}
                onChange={(e) => handleChange("manOfTheMatch", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Match Information */}
        <div className="p-8 rounded-3xl border border-white/10 bg-[#0D0D0D] space-y-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00FF62]/10 border border-[#00FF62] flex items-center justify-center">
              <IconCheck size={18} className="text-[#00FF62]" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight font-orbitron">Match Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Scout Name:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.scoutName}
                onChange={(e) => handleChange("scoutName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Game Type:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.gameType}
                onChange={(e) => handleChange("gameType", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Game Date:</Label>
              <div className="relative">
                <Input 
                  className="bg-[#161616] border-white/10 text-white h-12 focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                  value={formData.gameDate}
                  onChange={(e) => handleChange("gameDate", e.target.value)}
                />
                <IconCalendar className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Game Location:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.gameLocation}
                onChange={(e) => handleChange("gameLocation", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Match Result:</Label>
              <Input 
                className="bg-[#161616] border-white/10 text-white h-12 uppercase font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                value={formData.matchResult}
                placeholder="e.g. INTER MIAMI 2 x 0 LA FC"
                onChange={(e) => handleChange("matchResult", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Weather/Temperature:</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select 
                    className="w-full bg-[#161616] border border-white/10 text-white h-12 rounded-lg px-4 uppercase font-bold appearance-none focus:outline-none focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]"
                    value={formData.weather}
                    onChange={(e) => handleChange("weather", e.target.value)}
                  >
                    <option value="RAINY">RAINY</option>
                    <option value="SUNNY">SUNNY</option>
                    <option value="CLOUDY">CLOUDY</option>
                    <option value="WINDY">WINDY</option>
                    <option value="SNOWY">SNOWY</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
                </div>
                <div className="relative">
                  <Input 
                    className="bg-[#161616] border-white/10 text-white h-12 font-bold focus:border-[#00FF62] focus:ring-1 focus:ring-[#00FF62]" 
                    value={formData.temperature}
                    onChange={(e) => handleChange("temperature", e.target.value)}
                  />
                  <span className="absolute right-4 top-3.5 text-gray-500 text-xs font-bold font-orbitron">C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-8">
        <Button 
          variant="outline" 
          className="flex-1 h-14 rounded-xl border-white/10 bg-transparent text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all italic font-orbitron"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 h-14 rounded-xl bg-[#00FF62] hover:bg-[#00D150] text-black font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,255,98,0.2)] italic font-orbitron disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onContinue}
          disabled={!isFormValid()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
