"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  IconPlus, 
  IconSearch, 
  IconDotsVertical, 
  IconTrash, 
  IconPencil,
  IconPhoto,
  IconVideo,
  IconFileText,
  IconStar
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

const SummaryCard = ({ label, value, icon: Icon, bgColor, textColor }: { label: string, value: string | number, icon: any, bgColor: string, textColor: string }) => (
  <div className="bg-[#0A0A0A] border border-white/20 rounded-[20px] p-5 flex items-center gap-4 flex-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} bg-opacity-20 border border-white/20 flex-shrink-0`}>
      {Icon && <Icon size={24} className={`${textColor} opacity-100`} stroke={2} />}
    </div>
    <div className="space-y-0.5">
      <p className="text-white/40 text-[11px] font-medium leading-none">{label}</p>
      <p className="text-white text-2xl font-bold font-orbitron">{value}</p>
    </div>
  </div>
);

export const SuccessStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [editingStory, setEditingStory] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<{ mediaType: "image" | "video"; mediaFile: string } | null>(null);

  const [stories, setStories] = useState([
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

  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Statistics calculations
  const totalStories = stories.length;
  const imageCount = stories.filter(s => s.mediaType === "image").length;
  const videoCount = stories.filter(s => s.mediaType === "video").length;
  const milestones = stories.filter(s => s.description.length > 120).length;

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
        Academy Dashboard / Analysis / <span className="text-white">Success Story</span>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Success Story</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">Manage and view academy accomplishments and milestones</p>
        </div>
        <Button 
          onClick={handleAddClick}
          className="bg-[#E31B23] hover:bg-[#C1171D] text-white px-6 h-12 rounded-xl font-bold flex items-center gap-2"
        >
          <IconPlus size={20} /> Add Success Story
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard label="Total Stories" value={totalStories} icon={IconFileText} bgColor="bg-red-500" textColor="text-red-500" />
        <SummaryCard label="Images Shared" value={imageCount} icon={IconPhoto} bgColor="bg-emerald-500" textColor="text-emerald-500" />
        <SummaryCard label="Videos Shared" value={videoCount} icon={IconVideo} bgColor="bg-blue-500" textColor="text-blue-500" />
        <SummaryCard label="Milestones" value={milestones} icon={IconStar} bgColor="bg-yellow-500" textColor="text-yellow-500" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-8">
        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <Input 
              placeholder="Search success stories by title or keywords..." 
              className="bg-[#111111] border-white/10 h-12 rounded-xl pl-12 text-white/60 font-medium" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-[#111111] border border-white/20 rounded-3xl overflow-hidden hover:border-white/40 transition-all flex flex-col h-full group relative">
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
              <div className="p-6 flex flex-col gap-3 flex-grow bg-[#111111]">
                <h3 className="text-lg font-bold text-white leading-tight font-orbitron uppercase group-hover:text-[#E31B23] transition-colors">{story.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-4">{story.description}</p>
              </div>
            </div>
          ))}
          {filteredStories.length === 0 && (
            <div className="col-span-full text-center py-16 border border-white/5 rounded-3xl bg-[#111111]/50 text-white/40 font-medium">
              No success stories found matching search query.
            </div>
          )}
        </div>
      </div>

      {/* Edit/Add Modal */}
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
                className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#ff2d35] text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(227,27,35,0.3)]"
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