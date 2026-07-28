'use client'

import formation1 from "@/assets/cvs-page/id/position-map.png"
import formationPin from "@/assets/cvs-page/id/positionIcon.png"
import { useCoach } from "@/lib/hooks/useCoach"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const TacticalMap = ({ 
  formationIndex, 
  image, 
  pinIcon, 
  markers, 
  editable, 
  onUpdate 
}: { 
  formationIndex: number; 
  image: any; 
  pinIcon: any; 
  markers: { id: number; x: number; y: number }[]; 
  editable: boolean; 
  onUpdate: (markers: any[]) => void 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);

  const addMarker = () => {
    const newMarker = {
      id: Date.now(),
      x: 50,
      y: 50
    };
    onUpdate([...(markers || []), newMarker]);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (activeMarkerId === null || !mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onUpdate(markers.map((m: any) => 
      m.id === activeMarkerId ? { ...m, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : m
    ));
  };

  const handleMouseUp = () => {
    setActiveMarkerId(null);
  };

  useEffect(() => {
    if (activeMarkerId !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeMarkerId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <span className="text-xs font-bold text-primary uppercase">Formation {formationIndex + 1}</span>
        {editable && (
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 text-[10px] border-primary/20 hover:bg-primary/10 text-primary"
            onClick={addMarker}
          >
            + Add Icon
          </Button>
        )}
      </div>

      <div 
        ref={mapContainerRef}
        className="relative w-full h-auto overflow-hidden select-none rounded-xl border border-white/10"
      >
        <Image
          src={image}
          alt={`formation ${formationIndex + 1}`}
          width={400}
          height={300}
          className="w-full h-auto"
          draggable={false}
        />

        {/* Render markers */}
        {(markers || []).map((marker) => (
          <div
            key={marker.id}
            className="absolute z-20 cursor-move group/marker"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={(e) => {
              if (!editable) return;
              e.stopPropagation();
              setActiveMarkerId(marker.id);
            }}
          >
            <Image
              src={pinIcon}
              alt="marker"
              width={40}
              height={40}
              className={cn(
                "pointer-events-none drop-shadow-lg transition-transform group-hover/marker:scale-110",
                "w-8 h-8 md:w-10 md:h-10"
              )}
            />
            {editable && (
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/marker:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate(markers.filter(m => m.id !== marker.id));
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Top3Formation({ editable }: { editable?: boolean }) {
  const { coachData, handleUpdate } = useCoach();

  const handleMarkersUpdate = (index: number, newMarkers: any[]) => {
    const updatedMarkers = [...(coachData.formationMarkers || [[], [], []])];
    updatedMarkers[index] = newMarkers;
    handleUpdate('formationMarkers', updatedMarkers);
  };

  return (
    <div className="py-20 bg-black p-12">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-heading text-white text-center mb-12 tracking-wide uppercase">
          Top 3 Formations
        </h1>

        {/* Formation Maps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <TacticalMap
              key={index}
              formationIndex={index}
              image={formation1}
              pinIcon={formationPin}
              markers={(coachData.formationMarkers || [[], [], []])[index]}
              editable={!!editable}
              onUpdate={(newMarkers) => handleMarkersUpdate(index, newMarkers)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
