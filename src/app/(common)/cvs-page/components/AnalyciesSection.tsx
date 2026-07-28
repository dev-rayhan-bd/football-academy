/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import image from "@/assets/cvs-page/player_position.png"
import image_bar from "@/assets/cvs-page/bar.png"

const playersByNationality = [
  { name: "Brazil", Players: 68 },
  { name: "Argentina", Players: 56 },
  { name: "USA", Players: 40 },
  { name: "England", Players: 35 },
  { name: "Germany", Players: 28 },
  { name: "Japan", Players: 22 },
  { name: "Spain", Players: 20 },
];

const ageGroupData = [
  { name: "07-10", value: 15, fill: "#FF1010" },
  { name: "11-15", value: 30, fill: "#00FF62" },
  { name: "16-20", value: 35, fill: "#FDC700" },
  { name: "21+", value: 20, fill: "#0077FF" },
];

const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  if (width <= 0 || height <= 0) return null;
  return (
    <image
      x={x}
      y={y}
      width={width}
      height={height}
      href={image_bar.src}
      preserveAspectRatio="none"
      style={{ filter: "brightness(0.9)" }}
    />
  );
};

const AnalyciesSection = () => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Bar Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">Players by Nationality</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={playersByNationality}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #262626",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend />
              <Bar dataKey="Players" shape={<CustomBar />} fill="#00FF62" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-border flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">BY AGE</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageGroupData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {ageGroupData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #262626",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex gap-6 mt-4 text-sm">
            {ageGroupData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player Position Field */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-border">
        <h2 className="text-lg font-semibold mb-6">BY PLAYER POSITION</h2>
        <div
          className="relative w-full  overflow-hidden"
          style={{ aspectRatio: "2/1" }}
        >
          <Image src={image} className="h-full w-full" alt="field image for player position" />
        </div>
      </div>
    </div>
  );
};

export default AnalyciesSection;
