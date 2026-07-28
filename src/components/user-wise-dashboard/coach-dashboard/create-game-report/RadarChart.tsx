"use client";
import React from "react";

interface RadarChartProps {
  stats: { label: string; value: number }[];
  size?: number;
  color?: string;
  fillColor?: string;
  textColor?: string;
  gridColor?: string;
}

export const RadarChart = ({
  stats,
  size = 200,
  color = "#38bdf8",
  fillColor = "rgba(56, 189, 248, 0.4)",
  textColor = "#9ca3af",
  gridColor = "rgba(255,255,255,0.08)",
}: RadarChartProps) => {
  const center = size / 2;
  const r = size * 0.35; // Maximum radius

  // Calculate coordinates for 6 points
  const points = stats.map((stat, i) => {
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2; // Start from top
    const valueRatio = Math.max(10, Math.min(100, stat.value)) / 100;
    const x = center + r * valueRatio * Math.cos(angle);
    const y = center + r * valueRatio * Math.sin(angle);
    return { x, y, label: stat.label, value: stat.value, angle };
  });

  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Draw background grids (hexagons) */}
        {gridLevels.map((level, idx) => {
          const gridPoints = stats.map((_, i) => {
            const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
            const x = center + r * level * Math.cos(angle);
            const y = center + r * level * Math.sin(angle);
            return `${x},${y}`;
          });
          return (
            <polygon
              key={idx}
              points={gridPoints.join(" ")}
              fill="none"
              stroke={gridColor}
              strokeWidth="1"
            />
          );
        })}

        {/* Draw axes lines */}
        {stats.map((_, i) => {
          const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={gridColor}
              strokeWidth="1"
            />
          );
        })}

        {/* Draw filled player stats polygon */}
        <polygon
          points={polygonPath}
          fill={fillColor}
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Draw markers and labels */}
        {points.map((p, i) => {
          // Push labels slightly outwards from vertices
          const labelDist = r * 1.25;
          const lx = center + labelDist * Math.cos(p.angle);
          const ly = center + labelDist * Math.sin(p.angle);

          return (
            <g key={i}>
              {/* Vertex dot */}
              <circle cx={p.x} cy={p.y} r="3" fill={color} />
              
              {/* Label */}
              <text
                x={lx}
                y={ly}
                fill={textColor}
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-orbitron"
              >
                {p.label} ({p.value})
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

