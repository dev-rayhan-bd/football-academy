"use client";
import React, { useState, useRef } from 'react';
import { useCoach } from "@/lib/hooks/useCoach";
import { CMSField } from '@/components/shared/CMSField';
import { cn } from '@/lib/utils';
import { Plus, Trash2, X, Check, Info, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { usePlayerStats } from "../../player-cv-details/components/FullEditablePage";

import clubImage from '@/assets/cvs-page/club1.png';
import Image from 'next/image';

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));
const TO_YEARS = ["Present", ...YEARS];

export default function CoachClubsSection({ editable = true }: { editable?: boolean }) {
  const { coachData, handleUpdate } = useCoach();
  const { role } = usePlayerStats() || { role: "player" };

  const canEdit = !!(editable && (role === "coach" || role === "admin" || !role));
  
  const [isAdding, setIsAdding] = useState(false);
  
  // States for new club entry
  const [newClubName, setNewClubName] = useState("");
  const [newClubLogo, setNewClubLogo] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState(YEARS[0]);
  const [toDate, setToDate] = useState("Present");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clubCount = coachData?.clubs?.length || 0;
  const isLimitReached = clubCount >= 6;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("File size too large. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClubLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateClub = (id: string, field: string, value: string | number | object | null) => {
    const newClubs = (coachData?.clubs || []).map(club =>
      club.id === id ? { ...club, [field]: value } : club
    );
    handleUpdate("clubs", newClubs);
  };

  const removeClub = (id: string) => {
    const newClubs = (coachData?.clubs || []).filter(club => club.id !== id);
    handleUpdate("clubs", newClubs);
  };

  const addClub = () => {
    if (!newClubName.trim()) {
      toast.error("Please enter a club name");
      return;
    }
    if (isLimitReached) {
      toast.error("Maximum 6 clubs allowed");
      return;
    }

    const newClub = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClubName,
      from: fromDate,
      to: toDate,
      logo: newClubLogo || "", // Use uploaded logo or fallback empty/default
      color: "border-primary", // Default border color for new entries
    };

    handleUpdate("clubs", [...(coachData?.clubs || []), newClub]);
    
    // Reset state
    setIsAdding(false);
    setNewClubName("");
    setNewClubLogo(null);
    toast.success("Club added successfully");
  };

  return (
    <div className="container py-10 bg-cardBg rounded-xl mt-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
           <Info size={14} className="text-gray-400" />
           <span className="text-xs text-gray-400">{clubCount}/6 Clubs</span>
        </div>
        <h1 className="text-4xl font-light text-center text-foreground font-heading">Clubs</h1>
        {canEdit ? (
          <Button
            onClick={() => {
              if (isLimitReached) {
                toast.error("Maximum 6 clubs allowed. Remove an entry to add a new one.");
              } else {
                setIsAdding(true);
              }
            }}
            disabled={isLimitReached && !isAdding}
            className={cn(
              "text-black transition-all font-bold",
              isLimitReached ? "bg-gray-600 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
            )}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Club
          </Button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      <div className="border border-border bg-black/30 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(coachData?.clubs || []).map((club) => (
            <div
              key={club.id}
              className="relative border border-border cursor-pointer hover:bg-cardBg duration-300 bg-black/20 rounded-lg p-6 flex items-center gap-4 group transition"
            >
              {canEdit && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeClub(club.id); }}
                  className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              )}

              <div className="shrink-0 relative group/logo">
                <div className={cn(
                  "w-20 h-20 rounded-full border-2 flex items-center justify-center overflow-hidden bg-gray-900",
                  club.color || "border-primary"
                )}>
                  <Image
                    src={(club.logo && (typeof club.logo === 'string' ? !club.logo.startsWith('bg-') : true)) ? club.logo : clubImage}
                    alt={club.name}
                    width={80}
                    height={80}
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <CMSField
                  value={club.name}
                  onUpdate={(val) => updateClub(club.id, "name", val)}
                  canEdit={canEdit}
                  className="text-lg font-semibold text-foreground truncate uppercase"
                />
                <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                  <CMSField
                    value={club.from}
                    onUpdate={(val) => updateClub(club.id, "from", val)}
                    canEdit={canEdit}
                    type="combobox"
                    options={YEARS}
                    editTrigger="doubleClick"
                    hideIcon={true}
                    className="w-16"
                  />
                  <span>-</span>
                  <CMSField
                    value={club.to}
                    onUpdate={(val) => updateClub(club.id, "to", val)}
                    canEdit={canEdit}
                    type="combobox"
                    options={TO_YEARS}
                    editTrigger="doubleClick"
                    hideIcon={true}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          ))}

          {isAdding && (
            <div className="border-2 border-dashed border-primary/50 bg-primary/5 rounded-lg p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary uppercase">New Club Entry</span>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Logo Upload Section */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-full border-2 border-dashed border-gray-700 bg-black/40 flex items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
                  >
                    {newClubLogo ? (
                      <Image src={newClubLogo} alt="Preview" width={80} height={80} className="object-contain p-2" />
                    ) : (
                      <Upload size={24} className="text-gray-500" />
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase">Club Logo</span>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase">Club Name</span>
                  <input
                    type="text"
                    placeholder="Enter club name..."
                    className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    value={newClubName}
                    onChange={(e) => setNewClubName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase">From</span>
                    <select
                      className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    >
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase">To</span>
                    <select
                      className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    >
                      {TO_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <Button
                  onClick={addClub}
                  disabled={!newClubName.trim()}
                  className="w-full bg-primary text-black font-bold hover:bg-primary/90 mt-2"
                  size="sm"
                >
                  <Check className="h-4 w-4 mr-2" /> Confirm Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
