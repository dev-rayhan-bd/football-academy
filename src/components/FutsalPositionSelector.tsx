import React, { useState } from 'react';

// Mapping from futsal positions to three related football (soccer) positions
const relatedPositions: Record<string, string[]> = {
  Goalkeeper: ['Goalkeeper', 'Sweeper Keeper', 'Full‑Back'],
  Fixo: ['Center‑Back', 'Left‑Back', 'Right‑Back'],
  'Alas (Right Wing)': ['Right Winger', 'Right Midfielder', 'Forward'],
  'Alas (Left Wing)': ['Left Winger', 'Left Midfielder', 'Forward'],
  Pivot: ['Striker', 'Center Forward', 'Attacking Midfielder'],
};

const futsalOptions = Object.keys(relatedPositions);

export const FutsalPositionSelector = () => {
  const [selected, setSelected] = useState<string>(futsalOptions[0]);
  const positions = relatedPositions[selected] || [];

  return (
    <div className="my-6">
      {/* Dropdown to choose a futsal position */}
      <label className="block text-sm font-medium text-white mb-2">Futsal Position</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full rounded-md bg-gray-800 text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {futsalOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Display the three related football positions */}
      <div className="flex gap-4 mt-4 justify-center items-start">
        {positions.map((pos, idx) => (
          <div
            key={pos}
            className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg transition-transform hover:scale-105 ${idx === 0 ? 'w-48 h-48 text-xl' : 'w-32 h-32 text-sm'} `}
          >
            <span className="font-bold whitespace-nowrap">{pos}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
