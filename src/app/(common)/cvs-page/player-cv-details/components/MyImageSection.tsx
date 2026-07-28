"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Heart, Upload } from "lucide-react";
import Image from "next/image";
import { usePlayerStats } from "./FullEditablePage";
import { useUpdatePlayerProfileMutation } from "@/lib/features/cv/cvApi";
import { CMSField } from "@/components/shared/CMSField";
import { cn } from "@/lib/utils";

interface ImageCard {
  id: string;
  title: string;
  date: string;
  views: number;
  likes: number;
  image: string;
}

const SAMPLE_IMAGES: ImageCard[] = [
  {
    id: "1",
    title: "vs Arsenal U19",
    date: "Mar 15, 2024",
    views: 234,
    likes: 97,
    image:
      "https://images.pexels.com/photos/35405504/pexels-photo-35405504.jpeg",
  },
  {
    id: "2",
    title: "vs Chelsea U19",
    date: "Mar 10, 2024",
    views: 189,
    likes: 45,
    image:
      "https://images.pexels.com/photos/32205625/pexels-photo-32205625.jpeg",
  },
  {
    id: "3",
    title: "vs Liverpool U19",
    date: "Mar 5, 2024",
    views: 312,
    likes: 227,
    image:
      "https://images.pexels.com/photos/35405504/pexels-photo-35405504.jpeg",
  },
  {
    id: "4",
    title: "Training Highlights",
    date: "Feb 28, 2024",
    views: 156,
    likes: 62,
    image:
      "https://images.pexels.com/photos/32205625/pexels-photo-32205625.jpeg",
  },
];

export default function MyImagesSection({ editable = false }: { editable?: boolean }) {
  const { role } = usePlayerStats();
  const [updatePlayer] = useUpdatePlayerProfileMutation();
  const [images, setImages] = useState<ImageCard[]>(SAMPLE_IMAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    image: null as File | null,
  });

  const canEdit = editable;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleUpdateImage = async (id: string, field: string, value: any) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, [field]: value } : img)),
    );

    try {
      await updatePlayer({
        id: "current-player",
        data: { [`gallery.images.${id}.${field}`]: value },
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.image) {
      const newImage: ImageCard = {
        id: String(images.length + 1),
        title: formData.title,
        date: formData.date,
        views: 0,
        likes: 0,
        image: URL.createObjectURL(formData.image),
      };
      setImages((prev) => [newImage, ...prev]);
      setFormData({ title: "", date: "", description: "", image: null });
      setIsModalOpen(false);
      // In a real app, you'd call the API here to upload the image
    }
  };

  const EditableGalleryImage = ({ img }: { img: ImageCard }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          handleUpdateImage(img.id, "image", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Card
        className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
      >
        <div 
          className={cn(
            "aspect-video overflow-hidden bg-gray-800 relative group",
            canEdit && "cursor-pointer"
          )}
          onClick={() => canEdit && fileInputRef.current?.click()}
        >
          <Image
            src={img.image}
            alt={img.title}
            width={500}
            height={500}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          {canEdit && (
            <>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-xs text-white font-bold uppercase tracking-widest">
                  Click to Change
                </span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onFileSelect}
              />
            </>
          )}
        </div>
        <div className="p-4">
          <CMSField
            value={img.title}
            onUpdate={(val) => handleUpdateImage(img.id, "title", val)}
            canEdit={canEdit}
            className="text-white font-semibold mb-1"
          />
          <CMSField
            value={img.date}
            onUpdate={(val) => handleUpdateImage(img.id, "date", val)}
            canEdit={canEdit}
            className="text-gray-400 text-sm mb-4"
          />
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{img.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{img.likes}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="mt-20">
      <div className="container bg-cardBg p-10 rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl text-white mb-2 font-heading">My Images</h1>
            <p className="text-gray-400">Match highlights & training</p>
          </div>
          {canEdit && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
              variant="outline"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          )}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <EditableGalleryImage key={img.id} img={img} />
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Upload Image
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Image File
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    {formData.image
                      ? formData.image.name
                      : "Click to upload or drag and drop"}
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Title
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., vs Arsenal U19"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Date
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add a description for this image..."
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-24"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upload
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
