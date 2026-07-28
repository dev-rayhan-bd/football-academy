'use client'

import Image from 'next/image'
import { useCoach } from '@/lib/hooks/useCoach'
import {
  Award,
  Plus,
  Trash2,
  X,
  Check,
  Trophy,
  Star,
  Target,
  Users,
  TrendingUp,
  Activity,
  Shield,
  GraduationCap,
  Calendar,
  Medal,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { cn } from "@/lib/utils"
import { CMSField } from "@/components/shared/CMSField"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Static Logo Imports
import courseLogo1 from "@/assets/cvs-page/id/courses-logo1.png";
import courseLogo2 from "@/assets/cvs-page/id/courses-logo2.png";
import courseLogo3 from "@/assets/cvs-page/id/courses-logo3.png";
import courseLogo4 from "@/assets/cvs-page/id/courses-logo4.png";
import courseLogo5 from "@/assets/cvs-page/id/courses-logo5.jpg";
import courseLogo6 from "@/assets/cvs-page/id/courses-logo6.png";
import courseLogo7 from "@/assets/cvs-page/id/courses-logo7.png";
import courseLogo8 from "@/assets/cvs-page/id/courses-logo8.png";
import courseLogo9 from "@/assets/cvs-page/id/courses-logo9.png";

const STATIC_LOGOS = [
  { id: 1, name: "Logo 1", image: courseLogo1 },
  { id: 2, name: "Logo 2", image: courseLogo2 },
  { id: 3, name: "Logo 3", image: courseLogo3 },
  { id: 4, name: "Logo 4", image: courseLogo4 },
  { id: 5, name: "Logo 5", image: courseLogo5 },
  { id: 6, name: "Logo 6", image: courseLogo6 },
  { id: 7, name: "Logo 7", image: courseLogo7 },
  { id: 8, name: "Logo 8", image: courseLogo8 },
  { id: 9, name: "Logo 9", image: courseLogo9 },
];

const COURSE_ICONS: Record<string, React.ComponentType<any>> = {
  award: Award,
  trophy: Trophy,
  star: Star,
  target: Target,
  users: Users,
  trendingUp: TrendingUp,
  activity: Activity,
  shield: Shield,
  graduationCap: GraduationCap,
  calendar: Calendar,
  medal: Medal,
  sparkles: Sparkles,
};

const PREDEFINED_COURSES_BY_CATEGORY = {
  "Coaching Pathway Courses": [
    "FA Introduction to Coaching Football",
    "Grassroots Football Coaching",
    "Youth Football Coaching",
    "FA Emergency Aid",
    "FA Safeguarding Children Course",
    "UEFA C Licence",
    "UEFA B Licence",
    "UEFA A Licence",
    "UEFA Pro Licence",
    "FA Advanced Youth Award",
    "FA Goalkeeping Courses",
    "FA Futsal Coaching Courses",
    "FA Talent Identification Courses"
  ],
  "Goalkeeper Courses": [
    "Goalkeeping Coaching Level 1",
    "Goalkeeping Coaching Level 2",
    "Goalkeeping Coaching Level 3",
    "Advanced Goalkeeper Development",
    "Goalkeeper Match Analysis",
    "Youth Goalkeeper Coaching",
    "Elite Goalkeeping Tactics"
  ],
  "Strength & Conditioning Courses": [
    "Football Fitness Coaching",
    "Strength & Conditioning Level 1",
    "Strength & Conditioning Level 2",
    "Strength & Conditioning Level 3",
    "Strength & Conditioning Level 4",
    "Sports Rehabilitation",
    "Injury Prevention in Football",
    "Nutrition for Athletes",
    "Sports Psychology",
    "Recovery & Load Management",
    "GPS Athlete Monitoring"
  ],
  "Talent Identification & Scouting Courses": [
    "Introduction to Football Scouting",
    "Talent Identification in Football",
    "Opposition Analysis & Scouting",
    "Recruitment Strategy",
    "Youth Talent Scouting",
    "Elite Player Assessment",
    "Match Observation Techniques",
    "Data-Led Recruitment",
    "PFSA Level 1 Talent Identification",
    "PFSA Level 2 Opposition Analysis",
    "PFSA Level 3 Technical Scouting",
    "PFSA Football Scouting Diploma",
    "ISF Scouting Certification",
    "IPSO Talent ID Courses",
    "UEFA Talent Identification Programs"
  ]
};

export default function ComplementaryCoursesSection({ editable }: { editable?: boolean }) {
  const { coachData, handleUpdate } = useCoach()

  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null)

  const removeCourse = (id: number) => {
    handleUpdate('complementaryCourses', (coachData.complementaryCourses || []).filter(c => c.id !== id))
  }

  return (
    <div className="py-20 bg-black p-12">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-heading text-white text-center mb-12 tracking-wide">
          COMPLEMENTARY COURSES
        </h1>

        {/* Logo Badges (Static 9 Logos) */}
        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          {STATIC_LOGOS.map((logo) => (
            <div key={logo.id} className='relative border border-gray-700 p-5 rounded-xl bg-gray-900/50 group'>
              <Image src={logo.image} className='w-20 h-20 object-contain' alt={logo.name} width={80} height={80} />
            </div>
          ))}
        </div>

        {/* Course Cards - Styled like Accomplishments Section */}
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full">
            {(coachData.complementaryCourses || []).map((course, index) => {
              const IconComponent = COURSE_ICONS[course.icon || ""] || Award;
              return (
                <div
                  key={course.id || index}
                  className="flex items-center justify-center gap-4 border border-white/10 rounded-xl p-4 bg-gray-900/40 relative group hover:border-primary/30 transition-all animate-in fade-in duration-200"
                >
                  <div
                    className={cn(
                      "shrink-0 text-white",
                      editable ? "cursor-pointer hover:text-primary transition-colors" : ""
                    )}
                    onClick={() => {
                      if (editable) {
                        setActiveIconIndex(index);
                      }
                    }}
                  >
                    <IconComponent className="w-5 h-5 text-white hover:scale-110 transition-transform" />
                  </div>
                  <div className={cn("flex-1 text-left", editable ? "pr-6" : "")}>
                    <CMSField
                      value={course.title}
                      onUpdate={(val) => {
                        const newCourses = [...(coachData.complementaryCourses || [])];
                        newCourses[index] = { ...newCourses[index], title: String(val) };
                        handleUpdate("complementaryCourses", newCourses);
                      }}
                      canEdit={!!editable}
                      type="textarea"
                      className="text-white text-sm leading-relaxed text-left"
                    />
                  </div>
                  {editable && (
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {editable && (
            <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-6 border-dashed border-white/20 hover:border-primary hover:bg-transparent text-gray-400 hover:text-white flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Complementary Course
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0D0D0D] border-white/20 text-white max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-heading uppercase italic">
                    Select Complementary Course
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {Object.entries(PREDEFINED_COURSES_BY_CATEGORY).map(([category, courses]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-white/10 pb-1">
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 gap-1">
                        {courses.map((courseTitle, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const newCourse = {
                                id: Date.now() + idx,
                                title: courseTitle,
                                icon: "award",
                              };
                              handleUpdate("complementaryCourses", [
                                ...(coachData.complementaryCourses || []),
                                newCourse,
                              ]);
                              setIsAddCourseOpen(false);
                            }}
                            className="flex items-center gap-3 w-full text-left p-2.5 rounded-lg border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group"
                          >
                            <div className="shrink-0 p-1.5 rounded bg-white/5 group-hover:bg-primary/20 text-gray-400 group-hover:text-primary transition-all">
                              <Award size={14} />
                            </div>
                            <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                              {courseTitle}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/10 pt-4">
                    <button
                      onClick={() => {
                        const newCourse = {
                          id: Date.now(),
                          title: "Double-click to edit course details.",
                          icon: "award",
                        };
                        handleUpdate("complementaryCourses", [
                          ...(coachData.complementaryCourses || []),
                          newCourse,
                        ]);
                        setIsAddCourseOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left p-3 rounded-lg border border-dashed border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all group text-gray-400 hover:text-white"
                    >
                      <div className="shrink-0 p-2 rounded bg-white/5 text-gray-400 group-hover:text-primary">
                        <Plus size={18} />
                      </div>
                      <span className="text-xs">Add Custom Course</span>
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Course Icon Picker Dialog */}
      <Dialog
        open={activeIconIndex !== null}
        onOpenChange={(open) => !open && setActiveIconIndex(null)}
      >
        <DialogContent className="bg-[#0D0D0D] border-white/20 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading uppercase italic">Select Icon</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {Object.entries(COURSE_ICONS).map(([name, Icon]) => (
              <button
                key={name}
                onClick={() => {
                  if (activeIconIndex !== null) {
                    const newCourses = [...(coachData.complementaryCourses || [])];
                    newCourses[activeIconIndex] = {
                      ...newCourses[activeIconIndex],
                      icon: name,
                    };
                    handleUpdate("complementaryCourses", newCourses);
                    setActiveIconIndex(null);
                  }
                }}
                className="flex items-center justify-center p-3 rounded-lg border border-white/10 hover:border-primary hover:bg-white/5 text-gray-400 hover:text-white transition-all"
              >
                <Icon size={24} />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
