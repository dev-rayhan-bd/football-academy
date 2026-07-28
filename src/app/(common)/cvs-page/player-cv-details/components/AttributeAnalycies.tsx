"use client";
import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { usePlayerStats } from './FullEditablePage';
import { usePlayer } from '@/lib/hooks/usePlayer';

const AttributeDonut = ({ score, color }: { score: number; color: string }) => {
  const data = [
    { name: 'filled', value: score },
    { name: 'empty', value: 100 - score },
  ]

  return (
    <ResponsiveContainer width={120} height={120}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={55}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          <Cell fill={color} />
          <Cell fill="#ffffff" />
          <Label
            value={score}
            position="center"
            fill={color}
            className="text-2xl font-black"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

const getHexColor = (val: number) => {
  if (val >= 80) return "#22c55e";
  if (val >= 60) return "#eab308";
  return "#ef4444";
};

const AttributesAnalysis = ({ editable = false }: { editable?: boolean }) => {
  const { setAttributesAvg } = usePlayerStats();
  const { playerData } = usePlayer();

  const getSkillValue = (name: string): number => {
    if (!playerData.skillsCategories) return 0;
    for (const cat of playerData.skillsCategories) {
      const skill = cat.skills.find(s => s.name.toLowerCase() === name.toLowerCase());
      if (skill) return skill.value;
    }
    // Fallbacks for similar names
    if (name === "Passing") return (getSkillValue("Short Passing") + getSkillValue("Long Passing")) / 2;
    if (name === "Speed") return getSkillValue("Sprint Speed");
    if (name === "Decision Making") return getSkillValue("Decisions");
    if (name === "First Touch") return getSkillValue("Ball Control"); // Approximate
    if (name === "Composure") return getSkillValue("Composition");
    if (name === "Tackling") return 70; // Placeholder if missing
    return 0;
  };

  const cards = [
    {
      title: 'Technical Ability',
      color: '#00FF62',
      attributes: ['Ball Control', 'Passing', 'Dribbling', 'First Touch'],
    },
    {
      title: 'Reaction Skills',
      color: '#0077FF',
      attributes: ['Positioning', 'Vision', 'Decision Making', 'Teamwork'],
    },
    {
      title: 'Physical Attributes',
      color: '#FF1010',
      attributes: ['Speed', 'Stamina', 'Strength', 'Agility'],
    },
    {
      title: 'Mental Strength',
      color: '#FDC700',
      attributes: ['Composure', 'Determination', 'Leadership', 'Bravery'],
    },
    {
      title: 'Attacking Skills',
      color: '#F200FF',
      attributes: ['Shooting', 'Finishing', 'Long Shots', 'Att. Position'],
    },
    {
      title: 'Defensive Skills',
      color: '#FF8010',
      attributes: ['Tackling', 'Interceptions', 'Marking', 'Heading'],
    },
  ].map(card => {
    const attrs = card.attributes.map(name => ({
      name,
      value: Math.round(getSkillValue(name))
    }));
    const score = Math.round(attrs.reduce((sum, a) => sum + a.value, 0) / attrs.length);
    const color = getHexColor(score);
    return { ...card, attributes: attrs, score, color };
  });

  useEffect(() => {
    const avg = Math.round(cards.reduce((sum, c) => sum + c.score, 0) / cards.length);
    setAttributesAvg(avg);
  }, [cards, setAttributesAvg]);

  return (
    <div className="container my-20">
      <h1 className="text-4xl font-light text-center font-heading mb-12 text-foreground tracking-wide">
        ANALYSIS OF PLAYER ATTRIBUTES
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border border-border bg-black/30 rounded-lg p-8 flex flex-col items-center hover:bg-black/50 transition-colors"
          >
            {/* Title */}
            <h3 className="text-xl font-bold font-heading text-center mb-8 uppercase tracking-widest text-primary/90">
              {card.title}
            </h3>

            {/* Donut Chart */}
            <div className="flex flex-col items-center mb-10">
              <AttributeDonut score={card.score} color={card.color} />
              <span className="mt-4 text-3xl font-black text-white">
                {card.score}
              </span>
            </div>

            {/* Score Text */}
            <p className="text-xs uppercase tracking-widest text-gray-500 font-black text-center mb-8">Overall Score</p>

            {/* Attributes List */}
            <div className="w-full space-y-4">
              {card.attributes.map((attr, attrIndex) => (
                <div
                  key={attrIndex}
                  className="flex justify-between border-b border-white/10 pb-2 items-center text-base"
                >
                  <span className="text-gray-400 font-bold uppercase tracking-wide">{attr.name}</span>
                  <span className="font-black text-white text-lg">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AttributesAnalysis;
