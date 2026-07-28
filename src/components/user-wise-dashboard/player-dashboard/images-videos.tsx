"use client";
import React from "react";
import { 
  IconPlayerPlay, 
  IconEye, 
  IconHeart, 
  IconPlus, 
  IconUpload,
  IconInfoCircle
} from "@tabler/icons-react";

const stats = [
  { label: "Total Videos", value: "24", icon: IconPlayerPlay },
  { label: "Total Views", value: "5.2k", icon: IconEye },
  { label: "Total Likes", value: "892", icon: IconHeart },
  { label: "This Month", value: "+6", icon: IconUpload },
];

const imageItems = [
  { title: "vs Arsenal U19", date: "Mar 15, 2024", views: 234, likes: 97, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
  { title: "vs Chelsea U19", date: "Mar 10, 2024", views: 189, likes: 45, img: "https://images.unsplash.com/photo-1526232762682-d2f5f7144f2a?q=80&w=400" },
  { title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
  { title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400" },
];

const videoItems = [
  { title: "vs Arsenal U19", date: "Mar 15, 2024", views: 234, likes: 97, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
  { title: "vs Chelsea U19", date: "Mar 10, 2024", views: 189, likes: 45, img: "https://images.unsplash.com/photo-1526232762682-d2f5f7144f2a?q=80&w=400" },
  { title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
  { title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400" },
  { title: "U16 Championship Final", date: "Mar 10, 2024", views: 234, likes: 45, img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400" },
  { title: "Training Session- Skills...", date: "Mar 2, 2024", views: 189, likes: 38, img: "https://images.unsplash.com/photo-1556476272-b52467180b59?q=80&w=400" },
  { title: "vs Liverpool U19", date: "Feb 28, 2024", views: 372, likes: 250, img: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=400" },
  { title: "Regional Cup - Best Moments", date: "Feb 15, 2024", views: 211, likes: 115, img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=400" },
];

export const PlayerImagesAndVideos = () => {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-normal text-white uppercase tracking-tighter font-heading">
          My Images & Videos
        </h1>
        <p className="text-gray-400 text-lg font-light tracking-tight">
          My Professional Football Profile
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="p-8 rounded-3xl border border-white/5 bg-[#0D0D0D]/60 backdrop-blur-md group hover:border-white/10 transition-all duration-500"
          >
            <div className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                <stat.icon size={24} stroke={1.5} />
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white tracking-tighter">{stat.value}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Sections */}
      <div className="space-y-12">
        <MediaSection title="My Images" type="image" items={imageItems} />
        <MediaSection title="My Videos" type="video" items={videoItems} />
      </div>
    </div>
  );
};

const MediaSection = ({ title, type, items }: { title: string, type: 'image' | 'video', items: any[] }) => (
  <div className="p-10 rounded-[40px] border border-white/5 bg-[#0D0D0D]/40 backdrop-blur-xl">
    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">Match highlights & training</p>
      </div>
      <button className="px-6 py-3 rounded-2xl bg-[#1A1A1A] border border-white/10 text-xs font-bold text-white hover:bg-[#252525] hover:border-white/20 transition-all flex items-center gap-2.5 uppercase tracking-wider">
        {type === 'image' ? <IconPlus size={18} /> : <IconUpload size={18} />}
        {type === 'image' ? 'Upload Image' : 'Upload Video'}
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, idx) => (
        <div key={idx} className="group cursor-pointer">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-white/5">
             <img 
               src={item.img} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
               alt={item.title} 
             />
             {type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                   <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                      <IconPlayerPlay size={32} className="text-white fill-white ml-1" />
                   </div>
                </div>
             )}
             
             {/* Subtle Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          </div>
          
          <div className="space-y-4">
             <div>
                <h4 className="text-lg font-bold text-white leading-tight">{item.title}</h4>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1.5">{item.date}</p>
             </div>
             
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 text-[12px] text-gray-400 font-bold">
                      <IconEye size={16} stroke={2} /> {item.views}
                   </div>
                   <div className="flex items-center gap-2 text-[12px] text-gray-400 font-bold">
                      <IconHeart size={16} stroke={2} className="text-red-600 fill-red-600/10 group-hover:fill-red-600/30 transition-all" /> {item.likes}
                   </div>
                </div>
                {type === 'video' && (
                  <button className="text-gray-500 hover:text-white transition-colors p-2 rounded-xl border border-white/5 bg-white/5">
                    <IconInfoCircle size={18} stroke={1.5} />
                  </button>
                )}
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

