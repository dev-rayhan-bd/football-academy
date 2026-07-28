"use client";

import React from "react";
import { 
  IconUsers, 
  IconTrophy, 
  IconFileAnalytics, 
  IconBallFootball,
  IconCalendarFilled,
  IconHeartFilled,
  IconUpload,
  IconMapPin,
  IconCalendarEvent,
  IconClipboardText,
  IconPlus,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconVideo
} from "@tabler/icons-react";

import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSidebarPanel, DashboardSidebarItem } from "@/components/dashboard/dashboard-sidebar";
import { ProductCard } from "@/components/dashboard/product-card";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";

const PlayerEvalSidebarItem = ({ player, status }: { player: any, status: any }) => {
  const playerImgSrc = typeof player.playerImage === 'string'
    ? player.playerImage
    : (player.playerImage?.src || "/ronaldo.png");

  return (
    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all group flex items-center justify-between gap-3 cursor-pointer">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={playerImgSrc} alt={player.fullName} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white group-hover:text-[#E31B23] transition-colors truncate">
            {player.fullName}
          </p>
          <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider truncate">
            Coach: {player.coachName || "N/A"}
          </p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        {status.expired ? (
          <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider text-red-500 bg-red-500/10 border border-red-500/20">
            {status.remainingDays < 0 ? `Overdue ${Math.abs(status.remainingDays)}d` : "Expired"}
          </span>
        ) : status.remainingDays <= 15 ? (
          <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider text-yellow-500 bg-yellow-500/10 border border-yellow-500/20">
            {status.remainingDays}d left
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
            {status.remainingDays}d left
          </span>
        )}
      </div>
    </div>
  );
};

const AcademyManagementDashboard = () => {
  const players = useAppSelector((state) => state.player.players);
  const evaluationRecords = useAppSelector((state) => state.evaluation.records);

  const getEvaluationStatus = (player: any) => {
    const reduxRecord = evaluationRecords[player.id];
    const evalDateStr = reduxRecord?.date || player.evaluationDate || player.lastValidatedDate;

    if (!evalDateStr) {
      return {
        expired: true,
        remainingDays: 0,
        label: "Expired",
      };
    }

    const evalDate = new Date(evalDateStr);
    const currentDate = new Date();

    evalDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const dueDate = new Date(evalDate.getTime());
    dueDate.setDate(dueDate.getDate() + 90);

    const diffTime = dueDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      expired: diffDays <= 0,
      remainingDays: diffDays,
      label: diffDays <= 0
        ? `Expired (${Math.abs(diffDays)}d overdue)`
        : `${diffDays}d remaining`,
    };
  };

  const playersWithStatus = players.map(player => ({
    player,
    status: getEvaluationStatus(player)
  })).sort((a, b) => {
    if (a.status.expired && !b.status.expired) return -1;
    if (!a.status.expired && b.status.expired) return 1;
    if (a.status.expired && b.status.expired) {
      return a.status.remainingDays - b.status.remainingDays;
    }
    return a.status.remainingDays - b.status.remainingDays;
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdownId, setActiveDropdownId] = React.useState<string | null>(null);
  const [editingStory, setEditingStory] = React.useState<any | null>(null);
  const [selectedMedia, setSelectedMedia] = React.useState<{ mediaType: "image" | "video"; mediaFile: string } | null>(null);
  const [stories, setStories] = React.useState([
    {
      id: "1",
      title: "U-17 Championship Triumph",
      description: "Our U-17 squad claimed the state championship trophy after an intense 3-2 victory in the finals. A testament to their relentless training and teamwork throughout the season.",
      mediaType: "image" as "image" | "video",
      mediaFile: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070",
    },
    {
      id: "2",
      title: "Marcus Silva Signs Professional Contract",
      description: "Academy star Marcus Silva has officially signed a professional development contract with Manchester City. We are incredibly proud of his growth and wish him the best in the Premier League.",
      mediaType: "image" as "image" | "video",
      mediaFile: "https://images.unsplash.com/photo-1518005020250-6759229547b9?q=80&w=2021",
    },
    {
      id: "3",
      title: "New Hydrotherapy Facilities Opened",
      description: "We are excited to unveil our newly constructed state-of-the-art hydrotherapy pool and recovery suite, designed to optimize post-match rehabilitation for all academy athletes.",
      mediaType: "image" as "image" | "video",
      mediaFile: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076",
    }
  ]);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      mediaType: "image" as "image" | "video",
      mediaFile: "",
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setValue("mediaFile", event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    setEditingStory(null);
    reset({
      title: "",
      description: "",
      mediaType: "image",
      mediaFile: "",
    });
    setIsOpen(true);
  };

  const handleEditClick = (story: any) => {
    setEditingStory(story);
    setValue("title", story.title);
    setValue("description", story.description);
    setValue("mediaType", story.mediaType);
    setValue("mediaFile", story.mediaFile);
    setActiveDropdownId(null);
    setIsOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
    setActiveDropdownId(null);
    toast.success("Success story deleted successfully!");
  };

  const onSubmit = (data: any) => {
    if (!data.mediaFile) {
      toast.error("Please upload an image or video");
      return;
    }
    if (editingStory) {
      setStories((prev) =>
        prev.map((s) =>
          s.id === editingStory.id
            ? {
                ...s,
                title: data.title,
                description: data.description,
                mediaType: data.mediaType,
                mediaFile: data.mediaFile,
              }
            : s
        )
      );
      toast.success("Success story updated successfully!");
    } else {
      const newStory = {
        id: String(Date.now()),
        title: data.title,
        description: data.description,
        mediaType: data.mediaType,
        mediaFile: data.mediaFile,
      };
      setStories((prev) => [newStory, ...prev]);
      toast.success("Success story published successfully!");
    }
    setIsOpen(false);
    reset();
    setEditingStory(null);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Academy Dashboard / <span className="text-white">Management</span>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Hero Section */}
          <DashboardHero
            backgroundImage="/banner.png"
            logoImage="/image 47.png"
            badgeText="Active Academy"
            title="Santos FC Academy"
            subtitle="Premier League Academy"
            details={[
              { icon: <IconCalendarEvent size={16} />, text: "Founded 2018" },
              { icon: <IconMapPin size={16} className="text-green-500" />, text: "São Paulo, Brazil" },
            ]}
            contacts={[
              { type: "phone", label: "Contact", value: "+55 11 9999-8888" },
              { type: "email", label: "Email", value: "contact@santosfc.academy" },
            ]}
          />

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashboardStatCard icon={<IconBallFootball size={24} />} label="Teams" value="4" />
            <DashboardStatCard icon={<IconUsers size={24} />} label="Players" value="64" />
            <DashboardStatCard icon={<IconTrophy size={24} />} label="Coaches" value="12" />
            <DashboardStatCard icon={<IconFileAnalytics size={24} />} label="Game Reports" value="12" />
          </div>

          {/* Analytics Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Analytics</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Deep insights into Revenue</p>
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all">
                Full Analytics
              </button>
            </div>
            <DashboardCharts />
          </div>

          {/* Product Store Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Product Store</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Match highlights & training</p>
              </div>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all">
                <IconUpload size={16} />
                Upload Image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProductCard
                image="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop"
                category="Jerseys"
                stock={24}
                name="Home Jersey"
                price="45"
              />
              <ProductCard
                image="https://images.unsplash.com/photo-1518005020250-6759229547b9?q=80&w=2021&auto=format&fit=crop"
                category="Kits"
                stock={18}
                name="Training Kit"
                price="35"
              />
              <ProductCard
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                category="Accessories"
                stock={12}
                name="Football Boots"
                price="85"
              />
            </div>
          </div>

          {/* Success Story Section */}
          <div className="bg-[#111111] rounded-3xl border border-white/5 p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase text-white font-orbitron">Success Story</h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Share and view academy milestones</p>
              </div>
              <button 
                onClick={handleAddClick}
                className="flex items-center gap-2 bg-[#E31B23] hover:bg-[#ff2d35] border border-transparent text-[10px] font-black uppercase tracking-widest text-white px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(227,27,35,0.2)] cursor-pointer font-bold"
              >
                <IconPlus size={16} />
                Add Success Story
              </button>
            </div>

            {/* List of stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <div key={story.id} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all flex flex-col h-full group relative">
                  {/* Actions Dropdown */}
                  <div className="absolute top-3 right-3 z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId(activeDropdownId === story.id ? null : story.id);
                      }}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white/80 hover:text-white cursor-pointer transition-all"
                    >
                      <IconDotsVertical size={16} />
                    </button>
                    {activeDropdownId === story.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-20 cursor-default" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(null);
                          }}
                        />
                        <div className="absolute right-0 mt-1 w-32 bg-[#111111] border border-white/10 rounded-xl shadow-xl py-1.5 z-30 flex flex-col">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(story);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold uppercase text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <IconPencil size={14} className="text-[#3B82F6]" />
                            Edit
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(story.id);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold uppercase text-red-500 hover:text-red-400 hover:bg-red-500/5 transition-all flex items-center gap-2 cursor-pointer border-t border-white/5"
                          >
                            <IconTrash size={14} className="text-red-500" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Media container */}
                  <div 
                    onClick={() => setSelectedMedia({ mediaType: story.mediaType, mediaFile: story.mediaFile })}
                    className="aspect-video w-full bg-black relative overflow-hidden flex-shrink-0 flex items-center justify-center cursor-zoom-in"
                  >
                    {story.mediaType === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={story.mediaFile} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                    ) : (
                      <div className="relative w-full h-full">
                        <video src={story.mediaFile} className="w-full h-full object-cover pointer-events-none" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <IconVideo size={24} className="text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Text details */}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <h3 className="text-lg font-bold text-white leading-tight font-orbitron uppercase group-hover:text-[#E31B23] transition-colors">{story.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed line-clamp-4">{story.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:w-[380px] shrink-0 flex flex-col gap-6">
          <DashboardSidebarPanel title="Pending Game Reports" icon={<IconCalendarFilled size={24} />}>
            <DashboardSidebarItem
              avatar="https://i.pravatar.cc/100?u=marcus"
              title="Marcus Silva"
              subtitle="Forward"
              subtitleColor="text-[#E31B23]"
              extraInfo="9.2"
            />
            <DashboardSidebarItem
              avatar="https://i.pravatar.cc/100?u=david"
              title="David Chen"
              subtitle="Midfielder"
              subtitleColor="text-[#E31B23]"
              extraInfo="8.8"
            />
            <DashboardSidebarItem
              avatar="https://i.pravatar.cc/100?u=alex"
              title="Alex Jonson"
              subtitle="Defender"
              subtitleColor="text-[#E31B23]"
              extraInfo="8.5"
            />
          </DashboardSidebarPanel>

          <DashboardSidebarPanel title="Player Evaluations" icon={<IconClipboardText size={24} />}>
            <div className="max-h-[300px] overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {playersWithStatus.map(({ player, status }) => (
                <PlayerEvalSidebarItem key={player.id} player={player} status={status} />
              ))}
            </div>
          </DashboardSidebarPanel>

          <DashboardSidebarPanel title="Clubs Interested" icon={<IconHeartFilled size={24} />}>
            <DashboardSidebarItem
              avatar="/Manchester-City-F.C-Transparent-File 1.png"
              title="Manchester City"
              subtitle="Viewed your profile"
            />
            <DashboardSidebarItem
              avatar="/pngegg.png"
              title="Liverpool FC"
              subtitle="Viewed your profile"
            />
            <DashboardSidebarItem
              avatar="/pngegg (2).png"
              title="Chelsea FC"
              subtitle="Viewed your profile"
            />
          </DashboardSidebarPanel>

          <DashboardSidebarPanel title="Quickk stats">
            <div className="flex flex-col gap-4 px-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Profile Views</span>
                <span className="text-sm font-black text-white">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Likes</span>
                <span className="text-sm font-black text-[#E31B23]">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Reports</span>
                <span className="text-sm font-black text-[#4ADE80]">12</span>
              </div>
            </div>
          </DashboardSidebarPanel>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white rounded-3xl max-w-lg p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">
              {editingStory ? "Edit Success Story" : "Add Success Story"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">Story Title</label>
              <input 
                type="text" 
                placeholder="Enter title (e.g. Under-17 Championship Victory)" 
                className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 transition-all placeholder:text-gray-600"
                {...register("title", { required: "Title is required", minLength: { value: 3, message: "Title must be at least 3 characters" } })}
              />
              {errors.title && <p className="text-xs text-red-500 font-bold">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">Description</label>
              <textarea 
                placeholder="Share the details of this success story..." 
                className="w-full h-28 bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 transition-all placeholder:text-gray-600 resize-none"
                {...register("description", { required: "Description is required", minLength: { value: 10, message: "Description must be at least 10 characters" } })}
              />
              {errors.description && <p className="text-xs text-red-500 font-bold">{errors.description.message}</p>}
            </div>

            {/* Media Type selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">Media Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                  <input 
                    type="radio" 
                    value="image" 
                    className="accent-[#E31B23] w-4 h-4 cursor-pointer"
                    {...register("mediaType")} 
                  />
                  Image
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                  <input 
                    type="radio" 
                    value="video" 
                    className="accent-[#E31B23] w-4 h-4 cursor-pointer"
                    {...register("mediaType")} 
                  />
                  Video
                </label>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">
                Upload {watch("mediaType") === "image" ? "Image" : "Video"}
              </label>
              <div className="relative">
                <input 
                  type="file" 
                  accept={watch("mediaType") === "image" ? "image/*" : "video/*"}
                  className="w-full text-sm text-gray-500 file:mr-4 file:file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-white/5 file:text-white hover:file:bg-white/10 file:transition-all cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-white/5 justify-end">
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer font-bold"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#ff2d35] text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(227,27,35,0.3)] font-bold"
              >
                {editingStory ? "Save Changes" : "Publish Story"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Media Popup Overlay Viewer */}
      <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        <DialogContent className="bg-black/95 border border-white/10 text-white rounded-3xl max-w-4xl p-6 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full flex items-center justify-center max-h-[75vh]">
            {selectedMedia?.mediaType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedMedia.mediaFile} alt="Preview" className="max-w-full max-h-[70vh] object-contain rounded-xl" />
            ) : (
              <video src={selectedMedia?.mediaFile} controls autoPlay className="max-w-full max-h-[70vh] object-contain rounded-xl" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademyManagementDashboard;