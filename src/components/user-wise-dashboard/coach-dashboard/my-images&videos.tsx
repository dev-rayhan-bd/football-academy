"use client";
import React from "react";
import { 
  IconPlayerPlay, 
  IconEye, 
  IconHeart, 
  IconPlus, 
  IconUpload,
  IconDotsVertical,
  IconTrash,
  IconEdit,
  IconShare
} from "@tabler/icons-react";

const stats = [
  { label: "Total Videos", value: "24", icon: IconPlayerPlay },
  { label: "Total Views", value: "5.2k", icon: IconEye },
  { label: "Total Likes", value: "892", icon: IconHeart },
  { label: "This Month", value: "6", icon: IconUpload },
];

const mediaItems = [
  { title: "vs Arsenal U19", date: "Mar 15, 2024", views: 234, likes: 97, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
  { title: "vs Chelsea U19", date: "Mar 10, 2024", views: 189, likes: 45, img: "https://images.unsplash.com/photo-1526232762682-d2f5f7144f2a?q=80&w=400" },
  { title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
  { title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400" },
];

export const MyImagesAndVideos = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">My Images & Videos</h1>
        <p className="text-gray-500 text-sm mt-1">Your professional football profile</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D] group hover:border-[#E31B23]/30 transition-all">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#E31B23]/10 group-hover:text-[#E31B23] transition-colors">
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-3xl font-black text-white italic mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-8">
        <MediaSection title="My Images" type="image" items={mediaItems} />
        <MediaSection title="My Videos" type="video" items={mediaItems} />
      </div>
    </div>
  );
};

const MediaSection = ({ title, type, items }: { title: string, type: 'image' | 'video', items: any[] }) => (
  <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl font-bold text-white italic uppercase tracking-tight">{title}</h2>
        <p className="text-sm text-gray-500">Match highlights & training</p>
      </div>
      <button className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition-all flex items-center gap-2">
        {type === 'image' ? <IconPlus size={16} /> : <IconUpload size={16} />}
        {type === 'image' ? 'Upload Image' : 'Upload Video'}
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <div key={idx} className="group relative rounded-2xl overflow-hidden border border-white/20 bg-[#111] hover:scale-[1.02] transition-all duration-300">
          <div className="relative aspect-video overflow-hidden">
             <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt={item.title} />
             {type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                   <div className="w-12 h-12 rounded-full bg-[#E31B23] flex items-center justify-center shadow-[0_0_30px_rgba(227,27,35,0.4)]">
                      <IconPlayerPlay size={24} className="text-white fill-current ml-1" />
                   </div>
                </div>
             )}
             
             {/* Hover Actions */}
             <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-[#E31B23] transition-colors">
                   <IconEdit size={14} />
                </button>
                <button className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-red-500 transition-colors">
                   <IconTrash size={14} />
                </button>
             </div>
          </div>
          <div className="p-4 bg-gradient-to-b from-[#111] to-[#0D0D0D]">
             <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">{item.date}</p>
             <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                      <IconEye size={14} /> {item.views}
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                      <IconHeart size={14} className="text-[#E31B23]" /> {item.likes}
                   </div>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                   <IconShare size={16} />
                </button>
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
