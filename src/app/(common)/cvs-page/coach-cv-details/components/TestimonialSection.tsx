import { Star, Plus, Trash2, Quote } from 'lucide-react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useCoach } from '@/lib/hooks/useCoach'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'Emanuel',
    role: 'Assistant Coach',
    text: 'Working with this coach changed everything for our team. Skills that felt impossible now look effortless.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Dylan Hodges',
    role: 'Head Coach of the club',
    text: 'The coach improved our squad faster than we expected. Progress that used to take months now shows within days.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Madonna',
    role: 'Youth Academy Director',
    text: 'Our players develop twice as fast under this coach. What once felt confusing is now clear and structured.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Iris Barrows',
    role: 'Professional Scout',
    text: 'This coach unlocked a new level in my son\'s game. Techniques that took ages to grasp now make perfect sense.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53a8c9c0c0d0?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Jitzsche',
    role: 'National Data Engineer',
    text: 'Simplified learning for our players. Skills that took forever to pick up now come quickly.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Elliott',
    role: 'Senior Tactics Executive',
    text: 'The coach has simplified learning for our players. Skills that took forever to pick up now come quickly.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 7,
    name: 'Evelyn Pollich',
    role: 'Strategist',
    text: 'Our team grows rapidly with this coach. Drills that used to drain the boys now boost their confidence.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 8,
    name: 'Shanelle',
    role: 'Coordinator',
    text: 'The coach brought discipline and clarity. Progress that was slow before now happens session after session.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    id: 9,
    name: 'Aletha',
    role: 'Assistant',
    text: 'This coach helps players improve. Techniques that took repeated practice now look natural.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53a8c9c0c0d0?w=400&h=400&fit=crop'
  }
];

export default function TestimonialSection({ editable }: { editable?: boolean }) {
  const { coachData, handleUpdate } = useCoach()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  })

  const testimonials = (coachData.testimonials && coachData.testimonials.length > 0) 
    ? coachData.testimonials 
    : DEFAULT_TESTIMONIALS

  const handleAdd = () => {
    if (formData.name && formData.text) {
      const newTestimonial = {
        ...formData,
        id: Date.now()
      }
      handleUpdate('testimonials', [newTestimonial, ...testimonials])
      setFormData({
        name: '',
        role: '',
        text: '',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
      })
      setIsOpen(false)
    }
  }

  const handleRemove = (id: number) => {
    handleUpdate('testimonials', testimonials.filter(t => t.id !== id))
  }

  const StarRating = () => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
      ))}
    </div>
  )

  const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 min-w-[320px] flex-shrink-0 group relative overflow-hidden">
      {editable && (
        <button 
          onClick={() => handleRemove(testimonial.id)}
          className="absolute top-2 right-2 p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
        >
          <Trash2 size={14} />
        </button>
      )}
      <div className="flex items-start gap-4 mb-4">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={200}
          height={200}
          className="w-14 h-14 rounded-full object-cover border border-gray-700"
        />
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-gray-400 text-xs">{testimonial.role}</p>
          <div className="mt-2">
            <StarRating />
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm max-w-sm leading-relaxed relative z-0 italic">
        <Quote size={12} className="inline-block mr-1 opacity-50 -mt-1" />
        {testimonial.text}
      </p>
    </div>
  )

  return (
    <div className=" bg-black py-20 ">
      <div className={`${editable? "container mx-auto" : ""}`}>
        {/* Title Area */}
        <div className="flex flex-col items-center mb-16 gap-4">
          <h1 className="text-4xl font-heading text-white tracking-wide">
            TESTIMONIALS
          </h1>
          
          {editable && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-2 px-6 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] h-auto">
                  <Plus size={16} className="text-primary" /> Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold font-orbitron uppercase italic text-primary">New Testimonial</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Profile Image</Label>
                    <div className="relative group w-20 h-20 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-gray-800 hover:border-primary/50 transition-all flex items-center justify-center bg-black/50">
                      {formData.avatar ? (
                        <img 
                          src={formData.avatar} 
                          alt="Avatar Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Plus className="text-gray-400 group-hover:text-primary transition-colors" size={24} />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[8px] text-white font-black uppercase tracking-widest">Upload</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 2 * 1024 * 1024) {
                              toast.error("File size too large. Max 2MB.");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, avatar: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/40">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Smith" 
                      className="bg-black/50 border-gray-800 text-white h-12 rounded-xl focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest text-white/40">Role / Designation</Label>
                    <Input 
                      id="role" 
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Academy Director" 
                      className="bg-black/50 border-gray-800 text-white h-12 rounded-xl focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text" className="text-[10px] font-black uppercase tracking-widest text-white/40">Their Testimony</Label>
                    <Textarea 
                      id="text" 
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      placeholder="Enter the coach evaluation here..." 
                      className="bg-black/50 border-gray-800 text-white min-h-[100px] rounded-xl focus:border-primary/50 transition-colors resize-none p-4"
                    />
                  </div>
                  <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest py-6 rounded-xl mt-2">
                    Add Testimonial
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* First Marquee Row */}
        <div className="mb-8">
          <Marquee gradient gradientColor="#000000" pauseOnHover speed={40}>
            {(testimonials.slice(0, Math.ceil(testimonials.length / 2)) || []).map((testimonial) => (
              <div key={testimonial.id} className="mr-6">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Second Marquee Row */}
        <div>
          <Marquee gradient gradientColor="#000000" pauseOnHover speed={40} direction="right">
            {(testimonials.slice(Math.ceil(testimonials.length / 2)) || []).map((testimonial) => (
              <div key={testimonial.id} className="mr-6">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}
