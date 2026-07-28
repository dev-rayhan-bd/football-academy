import React from "react";
import { IconEye, IconHeart, IconPlayerPlay } from "@tabler/icons-react";

interface MediaCardProps {
  type: "image" | "video";
  thumbnail: string;
  title: string;
  date: string;
  views: number;
  likes: number;
}

export const MediaCard = ({
  type,
  thumbnail,
  title,
  date,
  views,
  likes,
}: MediaCardProps) => {
  return (
    <div className="bg-[#111111] rounded-3xl border border-white/5 p-4 flex flex-col gap-4 group cursor-pointer hover:border-white/10 transition-all">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
              <IconPlayerPlay size={24} className="text-white fill-white" />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors font-orbitron">
          {title}
        </h3>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
          {date}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-white/40">
          <IconEye size={14} />
          <span className="text-[10px] font-bold">{views}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/40">
          <IconHeart size={14} />
          <span className="text-[10px] font-bold">{likes}</span>
        </div>
      </div>
    </div>
  );
};
