import React from 'react';

export const FutsalPositions = () => {
  const positions = [
    { name: 'Goalkeeper', role: 'Goalkeeper', size: 'large' },
    { name: 'Fixo', role: 'Defender', size: 'small' },
    { name: 'Alas (Right Wing)', role: 'Wing', size: 'small' },
  ];

  return (
    <div className="flex gap-4 items-start">
      {positions.map((p, i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg transition-transform hover:scale-105 ${p.size === 'large' ? 'w-48 h-48 text-xl' : 'w-32 h-32 text-sm'}`}
        >
          <span className="font-bold">{p.name}</span>
          <span className="mt-1 text-xs">{p.role}</span>
        </div>
      ))}
    </div>
  );
};
