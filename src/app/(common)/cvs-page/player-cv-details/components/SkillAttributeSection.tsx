"use client";
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { usePlayerStats } from "./FullEditablePage";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { CMSField } from "@/components/shared/CMSField";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  value: number;
}

interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
  borderColor: string;
}

export function SkillsAttributes({ editable = false }: { editable?: boolean }) {
  const { playerData, handleUpdate: syncToRedux } = usePlayer();
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // Local state initialized from Redux or original defaults
  const [categories, setCategories] = useState<SkillCategory[]>(playerData.skillsCategories || [
    {
      category: "Technical",
      color: "#0077FF",
      borderColor: "border-l-blue-500",
      skills: [
        { name: "Ball Control", value: 90 },
        { name: "Dribbling", value: 85 },
        { name: "Short Passing", value: 92 },
        { name: "Long Passing", value: 88 },
        { name: "Crossing", value: 82 },
        { name: "Shooting", value: 78 },
        { name: "Finishing", value: 75 },
        { name: "Long Shots", value: 80 },
      ],
    },
    {
      category: "Tactical",
      color: "#00FF62",
      borderColor: "border-l-green-500",
      skills: [
        { name: "Positioning", value: 88 },
        { name: "Vision", value: 91 },
        { name: "Anticipation", value: 86 },
        { name: "Composition", value: 84 },
        { name: "Teamwork", value: 89 },
        { name: "Work Rate", value: 87 },
        { name: "Decisions", value: 85 },
        { name: "Att. Position", value: 83 },
      ],
    },
    {
      category: "Physical",
      color: "#FF1010",
      borderColor: "border-l-red-500",
      skills: [
        { name: "Acceleration", value: 78 },
        { name: "Sprint Speed", value: 76 },
        { name: "Stamina", value: 85 },
        { name: "Strength", value: 72 },
        { name: "Balance", value: 83 },
        { name: "Agility", value: 81 },
        { name: "Reactions", value: 86 },
        { name: "Jumping", value: 70 },
      ],
    },
    {
      category: "Mental",
      color: "#ffffff",
      borderColor: "border-l-yellow-500",
      skills: [
        { name: "Aggression", value: 65 },
        { name: "Interceptions", value: 74 },
        { name: "Marking", value: 87 },
        { name: "Leadership", value: 79 },
        { name: "Bravery", value: 73 },
        { name: "Determination", value: 88 },
        { name: "Heading", value: 85 },
        { name: "Influence", value: 82 },
      ],
    },
  ]);

  const { setSkillsAvg } = usePlayerStats();

  // Sync with Redux and calculate average
  useEffect(() => {
    const allSkills = categories.flatMap(c => c.skills);
    const avg = allSkills.reduce((sum, s) => sum + s.value, 0) / allSkills.length;
    setSkillsAvg(Math.round(avg));
    
    // Sync to Redux so Analysis can see it
    syncToRedux("skillsCategories", categories);
  }, [categories, setSkillsAvg]);

  const handleUpdate = (catIdx: number, skillIdx: number, value: number) => {
    setCategories((prev) => {
      const newCats = [...prev];
      newCats[catIdx] = {
        ...newCats[catIdx],
        skills: [...newCats[catIdx].skills]
      };
      newCats[catIdx].skills[skillIdx] = {
        ...newCats[catIdx].skills[skillIdx],
        value: value
      };
      return newCats;
    });
  };

  const getIndicatorColor = (val: number) => {
    if (val >= 80) return "bg-green-500";
    if (val >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getHexColor = (val: number) => {
    if (val >= 80) return "#22c55e";
    if (val >= 60) return "#eab308";
    return "#ef4444";
  };

  if (!playerData.skillsCategories) return null;

  return (
    <div className="container mt-20">
      <h1 className="text-4xl font-light text-center font-heading mb-8 text-foreground tracking-wide">
        SKILLS ATTRIBUTES
      </h1>

      <div className="border border-border bg-cardBg rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, catIdx) => (
            <div key={category.category} className={`space-y-4 pl-6`}>
              <h2 className={`text-xl border-l-4 font-heading ${
                category.category === "Technical" ? "border-blue" : 
                category.category === "Physical" ? "border-red" : 
                category.category === "Tactical" ? "border-primary" : 
                "border-yellow"
                } pl-4 text-foreground`}>
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => {
                  const fieldId = `${category.category}.${skill.name}`;
                  const color = getHexColor(skill.value);
                  
                  return (
                    <div key={skill.name} className="grid grid-cols-[100px_1fr_auto] items-center gap-2 p-1.5 bg-[#1a1a1a]/40 border border-border/40 rounded-lg group/skill transition-colors hover:bg-[#1a1a1a]/60">
                      <div className="truncate">
                        <span className="text-xs font-bold text-gray-400 uppercase truncate block">
                          {skill.name}
                        </span>
                      </div>

                      <div className="min-w-0 translate-y-[5px]">
                        {editable ? (
                          <div className="relative flex items-center h-2 group">
                            <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                              <div 
                                className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(skill.value))}
                                style={{ width: `${skill.value}%` }}
                              />
                            </div>
                            
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.value}
                              onChange={(e) => handleUpdate(catIdx, skillIdx, parseInt(e.target.value))}
                              style={{
                                background: `linear-gradient(to right, ${color} ${skill.value}%, #333 ${skill.value}%)`,
                              }}
                              className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                            />

                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.value}
                              onChange={(e) => handleUpdate(catIdx, skillIdx, parseInt(e.target.value))}
                              className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                            />
                          </div>
                        ) : (
                          <Progress
                            value={skill.value}
                            indicatorClassName={getIndicatorColor(skill.value)}
                            className="h-1.5"
                            style={{ backgroundColor: '#333' }}
                          />
                        )}
                      </div>

                      <div className="flex justify-end">
                        <CMSField
                          value={skill.value}
                          onUpdate={(val) => handleUpdate(catIdx, skillIdx, parseInt(String(val)))}
                          canEdit={editable}
                          type="number"
                          editTrigger="doubleClick"
                          className="font-bold text-base justify-end uppercase"
                          style={{ color: getHexColor(skill.value) }}
                          inputClassName="text-right h-6 w-14 text-base bg-gray-900 uppercase"
                          hideIcon={true}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
