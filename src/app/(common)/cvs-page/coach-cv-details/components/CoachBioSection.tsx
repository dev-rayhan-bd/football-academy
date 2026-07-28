"use client";
import badge1 from "@/assets/cvs-page/id/coach-badge1.png";
import badge2 from "@/assets/cvs-page/id/coach-badge2.png";
import iconAttackMinded from "@/assets/cvs-page/id/coach-styles-icons/attack minded.png";
import iconCounterAttack from "@/assets/cvs-page/id/coach-styles-icons/counter-attack.png";
import iconDisciplinarian from "@/assets/cvs-page/id/coach-styles-icons/disciplainarian.png";
import iconGegenpressing from "@/assets/cvs-page/id/coach-styles-icons/gegenpressing.png";
import iconHolistic from "@/assets/cvs-page/id/coach-styles-icons/holistic.png";
import iconMotivator from "@/assets/cvs-page/id/coach-styles-icons/motivator.png";
import iconParkTheBus from "@/assets/cvs-page/id/coach-styles-icons/park the bus.png";
import iconPlayerCentric from "@/assets/cvs-page/id/coach-styles-icons/player-centric.png";
import iconSetPieceSpecialist from "@/assets/cvs-page/id/coach-styles-icons/set-piece specialist.png";
import iconTikiTaka from "@/assets/cvs-page/id/coach-styles-icons/tiki-taka.png";
import iconYouthDevelopment from "@/assets/cvs-page/id/coach-styles-icons/youth development.png";
import trophyIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import { CMSField } from "@/components/shared/CMSField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCoach } from "@/lib/hooks/useCoach";
import { cn } from "@/lib/utils";
import { IconTrophy } from "@tabler/icons-react";
import {
  Activity,
  Award,
  Calendar,
  GraduationCap,
  Medal,
  PencilIcon,
  Plus,
  Shield,
  Sparkles,
  Star,
  Target,
  Trash2,
  TrendingUp,
  Trophy,
  Users
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { usePlayerStats } from "../../player-cv-details/components/FullEditablePage";

const ACCOMPLISHMENT_ICONS: Record<string, React.ComponentType<any>> = {
  trophy: Trophy,
  award: Award,
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

const PREDEFINED_ACCOMPLISHMENTS = [
  { text: "Led team to league, district, or tournament championships", icon: "trophy" },
  { text: "Improved team win-loss record over multiple seasons", icon: "trendingUp" },
  { text: "Developed successful training and match strategies", icon: "target" },
  { text: "Increased player performance, fitness, and discipline", icon: "activity" },
  { text: "Mentored players who advanced to professional or collegiate levels", icon: "graduationCap" },
  { text: "Built strong team culture and sportsmanship standards", icon: "users" },
  { text: "Organized effective practice sessions and development programs", icon: "calendar" },
  { text: "Recruited and retained talented athletes", icon: "medal" },
  { text: "Reduced injury rates through conditioning and safety programs", icon: "shield" },
  { text: "Managed match preparation, analysis, and tactical adjustments", icon: "sparkles" },
  { text: "Coordinated with staff, parents, and club management effectively", icon: "users" },
  { text: "Achieved promotion to higher divisions or competitive levels", icon: "trendingUp" },
  { text: "Implemented data analysis and performance tracking systems", icon: "activity" },
  { text: "Won Coach of the Year or similar recognition awards", icon: "award" },
  { text: "Successfully managed budgets, schedules, and team logistics", icon: "calendar" }
];

const PREDEFINED_KEY_SKILLS = [
  { text: "Tactical planning and game strategy", icon: "target" },
  { text: "Player development and mentoring", icon: "users" },
  { text: "Match analysis and opponent scouting", icon: "trendingUp" },
  { text: "Training session design", icon: "calendar" },
  { text: "Offensive and defensive coordination", icon: "shield" },
  { text: "Performance evaluation", icon: "activity" },
  { text: "Fitness and conditioning knowledge", icon: "activity" },
  { text: "Injury prevention awareness", icon: "shield" },
  { text: "Sports psychology and motivation", icon: "sparkles" },
  { text: "Leadership and team management", icon: "users" },
  { text: "Communication and interpersonal skills", icon: "users" },
  { text: "Conflict resolution", icon: "star" },
  { text: "Decision-making under pressure", icon: "target" },
  { text: "Time management", icon: "calendar" },
  { text: "Goal setting and performance monitoring", icon: "trendingUp" },
  { text: "Discipline and accountability management", icon: "medal" },
  { text: "Staff coordination and delegation", icon: "users" },
  { text: "Motivational leadership", icon: "award" },
  { text: "Adaptability and resilience", icon: "sparkles" },
  { text: "Patience and professionalism", icon: "star" },
  { text: "Strong work ethic", icon: "activity" },
  { text: "Strategic thinking", icon: "target" },
  { text: "Problem-solving ability", icon: "sparkles" }
];

const COACH_TYPES = [
  "Head Coach",
  "Assistant Coach",
  "Goalkeeping Coach",
  "Fitness Coach",
  "Youth Coach",
  "Technical Coach"
];

type CoachLanguage = {
  name: string;
  level: string;
  color: string;
};

type CoachData = {
  fullName: string;
  dob: string;
  age: string;
  birthCountry: string;
  birthCountryFlag: StaticImageData;
  dualNationality: string;
  dualNationalityFlag: StaticImageData;
  email: string;
  phone: string;
  location: string;
  website: string;
  languages: CoachLanguage[];
  seasonStats: {
    matches: number;
    wins: number;
    losses: number;
    draws: number;
    cleanSheets: number;
  };
  transferStatus: string;
  contractUntil: string;
  agent: string;
  agency: string;
  salary: string;
  majorTrophies: { name: string; count: number }[];
  cupHistory: string[];
  keySkills: { id: number; text: string; icon?: string }[];
  clubs: { name: string; period: string }[];
  qualifications: { id: number; text: string; icon?: string }[];
  playerImage: StaticImageData | string;
  mainFlag: StaticImageData | string;
};

const COUNTRY_CODES: Record<string, string> = {
  "afghanistan": "af", "albania": "al", "algeria": "dz", "andorra": "ad", "angola": "ao",
  "antigua and barbuda": "ag", "argentina": "ar", "armenia": "am", "australia": "au",
  "austria": "at", "azerbaijan": "az", "bahamas": "bs", "bahrain": "bh", "bangladesh": "bd",
  "barbados": "bb", "belarus": "by", "belgium": "be", "belize": "bz", "benin": "bj",
  "bhutan": "bt", "bolivia": "bo", "bosnia and herzegovina": "ba", "botswana": "bw",
  "brazil": "br", "brunei": "bn", "bulgaria": "bg", "burkina faso": "bf", "burundi": "bi",
  "cambodia": "kh", "cameroon": "cm", "canada": "ca", "cape verde": "cv",
  "central african republic": "cf", "chad": "td", "chile": "cl", "china": "cn",
  "colombia": "co", "comoros": "km", "congo": "cg", "costa rica": "cr", "croatia": "hr",
  "cuba": "cu", "cyprus": "cy", "czech republic": "cz", "denmark": "dk", "djibouti": "dj",
  "dominica": "dm", "dominican republic": "do", "ecuador": "ec", "egypt": "eg",
  "el salvador": "sv", "equatorial guinea": "gq", "eritrea": "er", "estonia": "ee",
  "ethiopia": "et", "fiji": "fj", "finland": "fi", "france": "fr", "gabon": "ga",
  "gambia": "gm", "georgia": "ge", "germany": "de", "ghana": "gh", "greece": "gr",
  "grenada": "gd", "guatemala": "gt", "guinea": "gn", "guinea-bissau": "gw",
  "guyana": "gy", "haiti": "ht", "honduras": "hn", "hungary": "hu", "iceland": "is",
  "india": "in", "indonesia": "id", "iran": "ir", "iraq": "iq", "ireland": "ie",
  "israel": "il", "italy": "it", "jamaica": "jm", "japan": "jp", "jordan": "jo",
  "kazakhstan": "kz", "kenya": "ke", "kiribati": "ki", "korea, north": "kp",
  "korea, south": "kr", "kuwait": "kw", "kyrgyzstan": "kg", "laos": "la", "latvia": "lv",
  "lebanon": "lb", "lesotho": "ls", "liberia": "lr", "libya": "ly", "liechtenstein": "li",
  "lithuania": "lt", "luxembourg": "lu", "macedonia": "mk", "madagascar": "mg",
  "malawi": "mw", "malaysia": "my", "maldives": "mv", "mali": "ml", "malta": "mt",
  "marshall islands": "mh", "mauritania": "mr", "mauritius": "mu", "mexico": "mx",
  "micronesia": "fm", "moldova": "md", "monaco": "mc", "mongolia": "mn", "montenegro": "me",
  "morocco": "ma", "mozambique": "mz", "myanmar": "mm", "namibia": "na", "nauru": "nr",
  "nepal": "np", "netherlands": "nl", "new zealand": "nz", "nicaragua": "ni",
  "niger": "ne", "nigeria": "ng", "norway": "no", "oman": "om", "pakistan": "pk",
  "palau": "pw", "panama": "pa", "papua new guinea": "pg", "paraguay": "py", "peru": "pe",
  "philippines": "ph", "poland": "pl", "portugal": "pt", "qatar": "qa", "romania": "ro",
  "russia": "ru", "rwanda": "rw", "saint kitts and nevis": "kn", "saint lucia": "lc",
  "saint vincent and the grenadines": "vc", "samoa": "ws", "san marino": "sm",
  "sao tome and principe": "st", "saudi arabia": "sa", "senegal": "sn", "serbia": "rs",
  "seychelles": "sc", "sierra leone": "sl", "singapore": "sg", "slovakia": "sk",
  "slovenia": "si", "solomon islands": "sb", "somalia": "so", "south africa": "za",
  "spain": "es", "sri lanka": "lk", "sudan": "sd", "suriname": "sr", "swaziland": "sz",
  "sweden": "se", "switzerland": "ch", "syria": "sy", "taiwan": "tw", "tajikistan": "tj",
  "tanzania": "tz", "thailand": "th", "timor-leste": "tl", "togo": "tg", "tonga": "to",
  "trinidad and tobago": "tt", "tunisia": "tn", "turkey": "tr", "turkmenistan": "tm",
  "tuvalu": "tv", "uganda": "ug", "ukraine": "ua", "united arab emirates": "ae",
  "united kingdom": "gb", "united states": "us", "uruguay": "uy", "uzbekistan": "uz",
  "vanuatu": "vu", "vatican city": "va", "venezuela": "ve", "vietnam": "vn", "yemen": "ye",
  "zambia": "zm", "zimbabwe": "zw"
};

const ALL_COUNTRIES = Object.keys(COUNTRY_CODES).map(c =>
  c.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
).sort();

const COACH_STYLE_GROUPS = [
  {
    label: "Tactical Philosophy",
    styles: ["Tiki-Taka", "Gegenpressing", "Counter-Attack", "Park the Bus"],
  },
  {
    label: "Man Management",
    styles: ["Motivator", "Disciplinarian", "Holistic", "Player-Centric"],
  },
  {
    label: "Strategic Focus",
    styles: [
      "Youth Development",
      "Set-Piece Specialist",
      "Defensive Solid",
      "Attack Minded",
    ],
  },
];

const ALL_COACH_STYLES = COACH_STYLE_GROUPS.flatMap(group =>
  group.styles.map(style => ({
    id: style.toLowerCase().replace(/ /g, "-"),
    label: style
  }))
);

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));
const TO_YEARS = ["Present", ...YEARS];

interface Attribute {
  name: string;
  score: number;
  status: "Excellent" | "Good" | "Average";
}

const getBadgeStatus = (score: number): "Excellent" | "Good" | "Average" => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Average";
};

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-green-500/10 text-green-500 border-green-500/50";
    case "Good":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/50";
    case "Average":
      return "bg-red-500/10 text-red-500 border-red-500/50";
    default:
      return "bg-green-500/10 text-green-500 border-green-500/50";
  }
};

const getIndicatorColor = (val: number) => {
  if (val >= 80) return "bg-green-500";
  if (val >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const getHexColor = (val: number) => {
  if (val >= 80) return "#22c55e";
  if (val >= 60) return "#eab308";
  return "#ef4444";
};

const CoachBioSection = ({ editable }: { editable?: boolean }) => {
  const { coachData, handleUpdate } = useCoach();

  const [isAddingClub, setIsAddingClub] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubLogo, setNewClubLogo] = useState<string | null>(null);
  const [fromYear, setFromYear] = useState(YEARS[0]);
  const [toYear, setToYear] = useState("Present");
  const [isAddAccOpen, setIsAddAccOpen] = useState(false);
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(null);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [activeSkillIconIndex, setActiveSkillIconIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map each coach style ID → its dedicated icon image
  const COACH_STYLE_ICONS: Record<string, { src: string }> = {
    "tiki-taka": iconTikiTaka,
    "gegenpressing": iconGegenpressing,
    "counter-attack": iconCounterAttack,
    "park-the-bus": iconParkTheBus,
    "motivator": iconMotivator,
    "disciplinarian": iconDisciplinarian,
    "holistic": iconHolistic,
    "player-centric": iconPlayerCentric,
    "youth-development": iconYouthDevelopment,
    "set-piece-specialist": iconSetPieceSpecialist,
    "defensive-solid": badge1,   // no dedicated icon — use first badge as fallback
    "attack-minded": iconAttackMinded,
  };
  const { role, bioRating, skillsAvg, metricsAvg, attributesAvg } = usePlayerStats();

  const canEdit = !!(editable && (role === "coach" || role === "admin" || !role));

  const overallRating = Math.round(
    (bioRating + skillsAvg + metricsAvg + attributesAvg) / 4,
  );



  const calculateAge = (dobString: string) => {
    if (!dobString) return "";
    let birthDate: Date;

    if (dobString.includes("/")) {
      const [day, month, year] = dobString.split("/");
      birthDate = new Date(`${year}-${month}-${day}`);
    } else {
      birthDate = new Date(dobString);
    }

    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getFlagUrl = (countryName: string) => {
    if (!countryName) return "";
    const code = COUNTRY_CODES[countryName.toLowerCase()];
    if (!code) return "";
    return `https://flagcdn.com/w160/${code}.png`;
  };

  const handleImageUpload = async (file: File, field: string) => {
    let processedFile = file;

    if (field === "coachImage" || field === "playerImage") {
      try {
        const { toast } = await import("sonner");
        toast.loading("Removing background... Please wait.", { id: "bg-removal" });
        const { removeBackground } = await import("@imgly/background-removal");
        const blob = await removeBackground(file);
        processedFile = new File([blob], file.name, { type: "image/png" });
        toast.success("Background removed!", { id: "bg-removal" });
      } catch (error) {
        console.error("Background removal failed:", error);
        const { toast } = await import("sonner");
        toast.error("Background removal failed. Using original image.", { id: "bg-removal" });
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdate(field, reader.result);
    };
    reader.readAsDataURL(processedFile);
  };

  const handleClubLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size too large. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClubLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addClub = () => {
    if (!newClubName.trim()) {
      toast.error("Please enter a club name");
      return;
    }

    const newClub = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClubName,
      from: fromYear,
      to: toYear,
      logo: newClubLogo || "",
    };

    handleUpdate("clubs", [...coachData.clubs, newClub]);
    setIsAddingClub(false);
    setNewClubName("");
    setNewClubLogo(null);
    toast.success("Club added successfully");
  };

  const removeClub = (id: string) => {
    const newClubs = coachData.clubs.filter(c => c.id !== id);
    handleUpdate("clubs", newClubs);
    toast.success("Club removed");
  };

  const updateClub = (id: string, field: string, value: any) => {
    const newClubs = coachData.clubs.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    );
    handleUpdate("clubs", newClubs);
  };

  const toggleStyle = (styleId: string) => {
    const currentStyles = coachData.selectedStyleIds || [];
    if (currentStyles.includes(styleId)) {
      handleUpdate(
        "selectedStyleIds",
        currentStyles.filter((id) => id !== styleId)
      );
    } else if (currentStyles.length < 4) {
      handleUpdate("selectedStyleIds", [...currentStyles, styleId]);
    } else {
      toast.error("Maximum 4 styles allowed");
    }
  };

  const orderedSelectedStyles = (coachData.selectedStyleIds || []).map(
    (id) => ALL_COACH_STYLES.find((s) => s.id === id)!
  ).filter(Boolean);

  const EditableImage = ({
    src,
    alt,
    className,
    field,
    width,
    height,
    fill,
  }: {
    src: any;
    alt: string;
    className?: string;
    field: string;
    width?: number;
    height?: number;
    fill?: boolean;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
      <div
        className={cn(
          "relative group w-full h-full",
          canEdit ? "cursor-pointer" : ""
        )}
        onClick={() => canEdit && fileInputRef.current?.click()}
      >
        <Image
          src={src}
          alt={alt}
          className={className}
          {...(!fill ? { width: width || 500, height: height || 500 } : { fill: true })}
        />
        {canEdit && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
              <span className="text-[10px] text-white font-black uppercase tracking-widest">
                Click to Change
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, field);
              }}
            />
          </>
        )}
      </div>
    );
  };


  return (
    <>
      <div className="container">
        <div className="grid xl:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-12 xl:col-span-4 h-fit space-y-6 bg-cardBg">
            {/* Personal Information */}
            <div className=" p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Personal Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Full Name</span>
                  <CMSField
                    value={coachData.fullName}
                    onUpdate={(val) => handleUpdate("fullName", val)}
                    canEdit={canEdit}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Date of Birth</span>
                  <CMSField
                    value={coachData.dob}
                    type="date"
                    onUpdate={(val) => {
                      handleUpdate("dob", val);
                      const newAge = calculateAge(String(val));
                      if (newAge !== "") {
                        handleUpdate("age", `${newAge}`);
                      }
                    }}
                    canEdit={canEdit}
                    className="w-1/2 justify-end"
                    inputClassName="text-right w-full bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-3 py-1.5 rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">Age</span>
                  <div className="flex items-center gap-1">
                    <span>{coachData.age ? coachData.age.replace(/\D/g, "") : 0}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={coachData.birthCountry}
                      onUpdate={(val) => handleUpdate("birthCountry", val)}
                      canEdit={canEdit}
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(coachData.birthCountry)}
                        alt="birth country flag"
                        width={24}
                        height={16}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={coachData.dualNationality}
                      onUpdate={(val) => handleUpdate("dualNationality", val)}
                      canEdit={canEdit}
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(coachData.dualNationality)}
                        alt="dual nationality flag"
                        width={24}
                        height={16}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Contact
              </h2>
              <div className="space-y-2 text-sm text-primary">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <CMSField
                    value={coachData.email}
                    onUpdate={(val) => handleUpdate("email", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <CMSField
                    value={coachData.phone}
                    onUpdate={(val) => handleUpdate("phone", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <CMSField
                    value={coachData.location}
                    onUpdate={(val) => handleUpdate("location", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <CMSField
                    value={coachData.website}
                    onUpdate={(val) => handleUpdate("website", val)}
                    canEdit={canEdit}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Key Accomplishments */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Key Accomplishments
              </h2>
              <div className="max-w-2xl">
                <div className="space-y-6">
                  {coachData.qualifications.map((item, index) => {
                    const IconComponent = ACCOMPLISHMENT_ICONS[item.icon || ""] || Trophy;
                    return (
                      <div
                        key={index}
                        className="flex gap-4 border border-white/10 rounded-xl p-3 relative group"
                      >
                        <div
                          className={cn(
                            "shrink-0 pt-1 text-white",
                            canEdit ? "cursor-pointer hover:text-primary transition-colors" : ""
                          )}
                          onClick={() => {
                            if (canEdit) {
                              setActiveIconIndex(index);
                            }
                          }}
                        >
                          <IconComponent className="w-5 h-5 text-white hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 pr-6">
                          <CMSField
                            value={item.text}
                            onUpdate={(val) => {
                              const newQuals = [...coachData.qualifications];
                              newQuals[index] = { ...newQuals[index], text: String(val) };
                              handleUpdate("qualifications", newQuals);
                            }}
                            canEdit={canEdit}
                            type="textarea"
                            className="text-white text-sm leading-relaxed"
                          />
                        </div>
                        {canEdit && (
                          <button
                            onClick={() => {
                              const newQuals = coachData.qualifications.filter((_, idx) => idx !== index);
                              handleUpdate("qualifications", newQuals);
                            }}
                            className="absolute right-3 top-3 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {canEdit && (
                  <Dialog open={isAddAccOpen} onOpenChange={setIsAddAccOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-6 border-dashed border-white/20 hover:border-primary hover:bg-transparent text-gray-400 hover:text-white flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> Add Accomplishment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0D0D0D] border-white/20 text-white max-w-md max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-heading uppercase italic">
                          Select Accomplishment
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-4">
                        {PREDEFINED_ACCOMPLISHMENTS.map((acc, idx) => {
                          const Icon = ACCOMPLISHMENT_ICONS[acc.icon] || Trophy;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                const newAcc = {
                                  id: Date.now() + idx,
                                  text: acc.text,
                                  icon: acc.icon,
                                };
                                handleUpdate("qualifications", [...coachData.qualifications, newAcc]);
                                setIsAddAccOpen(false);
                              }}
                              className="flex items-center gap-3 w-full text-left p-3 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group"
                            >
                              <div className="shrink-0 p-2 rounded bg-white/5 group-hover:bg-primary/20 text-gray-400 group-hover:text-primary transition-all">
                                <Icon size={18} />
                              </div>
                              <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                                {acc.text}
                              </span>
                            </button>
                          );
                        })}
                        <button
                          onClick={() => {
                            const newAcc = {
                              id: Date.now(),
                              text: "Double-click to edit accomplishment details.",
                              icon: "trophy",
                            };
                            handleUpdate("qualifications", [...coachData.qualifications, newAcc]);
                            setIsAddAccOpen(false);
                          }}
                          className="flex items-center gap-3 w-full text-left p-3 rounded-lg border border-dashed border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all group text-gray-400 hover:text-white"
                        >
                          <div className="shrink-0 p-2 rounded bg-white/5 text-gray-400 group-hover:text-primary">
                            <Plus size={18} />
                          </div>
                          <span className="text-xs">Add Custom Accomplishment</span>
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Icon Picker Dialog */}
              <Dialog
                open={activeIconIndex !== null}
                onOpenChange={(open) => !open && setActiveIconIndex(null)}
              >
                <DialogContent className="bg-[#0D0D0D] border-white/20 text-white max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="font-heading uppercase italic">Select Icon</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {Object.entries(ACCOMPLISHMENT_ICONS).map(([name, Icon]) => (
                      <button
                        key={name}
                        onClick={() => {
                          if (activeIconIndex !== null) {
                            const newQuals = [...coachData.qualifications];
                            newQuals[activeIconIndex] = {
                              ...newQuals[activeIconIndex],
                              icon: name,
                            };
                            handleUpdate("qualifications", newQuals);
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

            {/* Languages */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Languages
              </h2>
              <div className="space-y-2 text-sm">
                {coachData.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-2 gap-2"
                  >
                    <CMSField
                      value={lang.name}
                      onUpdate={(val) => {
                        const newLangs = [...coachData.languages];
                        newLangs[idx] = { ...newLangs[idx], name: String(val) };
                        handleUpdate("languages", newLangs);
                      }}
                      canEdit={canEdit}
                      className="w-1/2"
                    />
                    <CMSField
                      value={lang.level}
                      onUpdate={(val) => {
                        const newLangs = [...coachData.languages];
                        newLangs[idx] = { ...newLangs[idx], level: String(val) };
                        handleUpdate("languages", newLangs);
                      }}
                      canEdit={canEdit}
                      type="select"
                      options={["Native", "Fluent", "Intermediate", "Beginner"]}
                      className="w-1/2 justify-end"
                      inputClassName="text-right"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* MAJOR TROPHIES */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                MAJOR TROPHIES
              </h2>
              <div className="">
                <div className="space-y-4">
                  {coachData.majorTrophies.map((tournament, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 px-4 border-b border-slate-800"
                    >
                      <CMSField
                        value={tournament.name}
                        onUpdate={(val) => {
                          const newTrophies = [...coachData.majorTrophies];
                          newTrophies[index] = { ...newTrophies[index], name: String(val) };
                          handleUpdate("majorTrophies", newTrophies);
                        }}
                        canEdit={canEdit}
                        className="text-white text-[12px] font-medium tracking-wide flex-1"
                      />
                      <div className="flex items-center gap-3">
                        <CMSField
                          value={tournament.count}
                          onUpdate={(val) => {
                            const newTrophies = [...coachData.majorTrophies];
                            newTrophies[index] = { ...newTrophies[index], count: Number(val) };
                            handleUpdate("majorTrophies", newTrophies);
                          }}
                          canEdit={canEdit}
                          isNumeric
                          className="text-white text-sm font-semibold w-12 justify-center"
                          inputClassName="text-center"
                        />
                        <IconTrophy />
                        {canEdit && (
                          <button
                            onClick={() => {
                              const newTrophies = coachData.majorTrophies.filter((_, idx) => idx !== index);
                              handleUpdate("majorTrophies", newTrophies);
                            }}
                            className="text-gray-500 hover:text-red-500 transition-colors ml-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {canEdit && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newTrophy = {
                          name: "NEW TOURNAMENT CHAMPIONSHIP",
                          count: 1
                        };
                        handleUpdate("majorTrophies", [...coachData.majorTrophies, newTrophy]);
                      }}
                      className="w-full mt-4 border-dashed border-white/20 hover:border-primary hover:bg-transparent text-gray-400 hover:text-white flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add Trophy
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - PLAYER IMAGE */}
          <div className="col-span-12 xl:col-span-4 flex flex-col items-center">
            {/* Player Name */}
            <div className="text-center mb-8">
              <div className="flex items-center mb-8 justify-center">
                <div className="relative w-32 h-20">
                  <Image
                    src={getFlagUrl(coachData.birthCountry)}
                    alt="Birth Country"
                    layout="fill"
                    className="object-cover rounded shadow-lg border border-border"
                  />
                  {coachData.dualNationality && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-8 border-2 border-white rounded shadow-md overflow-hidden">
                      <Image
                        src={getFlagUrl(coachData.dualNationality)}
                        alt="Dual Nationality"
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2 uppercase flex items-center justify-center gap-2">
                <CMSField
                  value={coachData.fullName}
                  onUpdate={(val) => handleUpdate("fullName", val)}
                  canEdit={canEdit}
                  className="text-2xl font-bold font-heading uppercase"
                />
                <span className="text-primary">[{coachData.age ? coachData.age.replace(/\D/g, "") : ""}]</span>
              </h1>
            </div>

            {/* Position Selector */}
            <div className="mb-8">
              <CMSField
                value={coachData.coachType}
                onUpdate={(val) => handleUpdate("coachType", String(val))}
                canEdit={canEdit}
                type="combobox"
                options={COACH_TYPES}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900 bg-transparent text-foreground h-auto w-fit mx-auto"
              />
            </div>

            <div className="relative w-full h-[723px] mb-8 flex items-end justify-center">
              <EditableImage
                src={coachData.coachImage}
                alt={coachData.fullName}
                className="object-contain w-auto mx-auto h-full"
                width={800}
                height={800}
                field="coachImage"
              />
            </div>

            {/* Coach Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h3 className="text-2xl font-bold font-heading">
                    Coach Style
                  </h3>
                  {canEdit && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-cardBg border-border text-foreground">
                        <DialogHeader>
                          <DialogTitle>Select Coach Styles (Max 4)</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto">
                          {ALL_COACH_STYLES.map((style) => (
                            <div
                              key={style.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={style.id}
                                checked={(coachData.selectedStyleIds || []).includes(
                                  style.id
                                )}
                                onCheckedChange={() => toggleStyle(style.id)}
                                disabled={
                                  !(coachData.selectedStyleIds || []).includes(
                                    style.id
                                  ) && (coachData.selectedStyleIds || []).length >= 4
                                }
                              />
                              <Label
                                htmlFor={style.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {style.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                <div className="space-y-4">
                  {orderedSelectedStyles.map((style: any) => {
                    const icon = COACH_STYLE_ICONS[style.id];
                    const iconSrc = icon ? icon.src : badge2.src;

                    return (
                      <div key={style.id} className="space-y-4">
                        <div className="flex justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={iconSrc}
                            className="w-20 h-20 object-contain"
                            alt={style.label}
                          />
                        </div>
                        <p className="text-lg font-heading">{style.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 xl:col-span-4 space-y-6 bg-cardBg h-fit">
            {/* Current Season Stats */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Current Season Stats
              </h2>
              <div className="text-sm grid grid-cols-2 gap-4">
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-full mx-auto">
                  <CMSField
                    value={coachData.seasonStats.matches}
                    onUpdate={(val) => handleUpdate("seasonStats.matches", val)}
                    canEdit={canEdit}
                    isNumeric
                    className="text-2xl font-medium text-primary mb-2 justify-center"
                    inputClassName="text-center w-20"
                  />
                  <h3 className="text-[12px] uppercase">Matches Coached</h3>
                </div>
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-full mx-auto">
                  <CMSField
                    value={coachData.seasonStats.wins}
                    onUpdate={(val) => handleUpdate("seasonStats.wins", val)}
                    canEdit={canEdit}
                    isNumeric
                    className="text-2xl font-medium text-primary mb-2 justify-center"
                    inputClassName="text-center w-20"
                  />
                  <h3 className="text-[12px] uppercase">Win</h3>
                </div>
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-full mx-auto">
                  <CMSField
                    value={Math.max(2, coachData.seasonStats.losses || 0)}
                    onUpdate={(val) => handleUpdate("seasonStats.losses", Number(val))}
                    canEdit={canEdit}
                    isNumeric
                    className="text-2xl font-medium text-primary mb-2 justify-center"
                    inputClassName="text-center w-20"
                  />
                  <h3 className="text-[12px] uppercase">Losses</h3>
                </div>
                <div className="border flex flex-col min-w-37.5 items-center justify-center p-3 rounded-xl w-full mx-auto">
                  <CMSField
                    value={Math.max(2, coachData.seasonStats.draws || 0)}
                    onUpdate={(val) => handleUpdate("seasonStats.draws", Number(val))}
                    canEdit={canEdit}
                    isNumeric
                    className="text-2xl font-medium text-primary mb-2 justify-center"
                    inputClassName="text-center w-20"
                  />
                  <h3 className="text-[12px] uppercase">Draws</h3>
                </div>
              </div>
            </div>

            {/* Transfer Status */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-center font-heading font-normal">
                  Transfer Status
                </h2>
                <span className="text-xs bg-primary text-black px-2 py-1 rounded">
                  {coachData.transferStatus}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">
                    Football Agent Contract:
                  </span>
                  <span>No</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Contract Until</span>
                  <CMSField
                    value={coachData.contractUntil}
                    onUpdate={(val) => handleUpdate("contractUntil", val)}
                    canEdit={canEdit}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Agent</span>
                  <CMSField
                    value={coachData.agent}
                    onUpdate={(val) => handleUpdate("agent", val)}
                    canEdit={canEdit}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Agency</span>
                  <CMSField
                    value={coachData.agency}
                    onUpdate={(val) => handleUpdate("agency", val)}
                    canEdit={canEdit}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Salary</span>
                  <CMSField
                    value={coachData.salary}
                    onUpdate={(val) => handleUpdate("salary", val)}
                    canEdit={canEdit}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
              </div>
            </div>

            {/* CUP PLAYED */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                CUP PLAYED
              </h2>
              <div className="space-y-6 border-l-2 border-green-600 pl-4 mt-6">
                {coachData.cupHistory.map((cup, index) => {
                  const parts = cup.split(" - ");
                  const year = parts[0];
                  const title = parts.slice(1).join(" - ");

                  return (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                        <Image
                          src={trophyIcon}
                          alt="Achievement"
                          width={36}
                          height={36}
                          className="object-contain drop-shadow-md"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 w-full">
                        <CMSField
                          value={year}
                          onUpdate={(val) => {
                            const newCups = [...coachData.cupHistory];
                            newCups[index] = `${val} - ${title}`;
                            handleUpdate("cupHistory", newCups);
                          }}
                          canEdit={canEdit}
                          type="textarea"
                          className="text-xs font-black text-primary/80 tracking-widest leading-relaxed uppercase"
                          inputClassName="text-xs font-black min-h-[30px] py-0.5 uppercase"
                        />
                        <CMSField
                          value={title}
                          onUpdate={(val) => {
                            const newCups = [...coachData.cupHistory];
                            newCups[index] = `${year} - ${val}`;
                            handleUpdate("cupHistory", newCups);
                          }}
                          canEdit={canEdit}
                          type="textarea"
                          className="text-sm md:text-base text-gray-400 leading-relaxed tracking-tight uppercase"
                          inputClassName="text-base font-black min-h-[40px] py-1 uppercase"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Skills */}
            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Key Skills
              </h2>
              <div className="max-w-2xl">
                <div className="space-y-6">
                  {coachData.keySkills.map((item, index) => {
                    const IconComponent = ACCOMPLISHMENT_ICONS[item.icon || ""] || Trophy;
                    return (
                      <div
                        key={index}
                        className="flex gap-4 border border-white/10 rounded-xl p-3 relative group"
                      >
                        <div
                          className={cn(
                            "shrink-0 pt-1 text-white",
                            canEdit ? "cursor-pointer hover:text-primary transition-colors" : ""
                          )}
                          onClick={() => {
                            if (canEdit) {
                              setActiveSkillIconIndex(index);
                            }
                          }}
                        >
                          <IconComponent className="w-5 h-5 text-white hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 pr-6">
                          <CMSField
                            value={item.text}
                            onUpdate={(val) => {
                              const newSkills = [...coachData.keySkills];
                              newSkills[index] = { ...newSkills[index], text: String(val) };
                              handleUpdate("keySkills", newSkills);
                            }}
                            canEdit={canEdit}
                            type="textarea"
                            className="text-white text-sm leading-relaxed"
                          />
                        </div>
                        {canEdit && (
                          <button
                            onClick={() => {
                              const newSkills = coachData.keySkills.filter((_, idx) => idx !== index);
                              handleUpdate("keySkills", newSkills);
                            }}
                            className="absolute right-3 top-3 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {canEdit && (
                  <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-6 border-dashed border-white/20 hover:border-primary hover:bg-transparent text-gray-400 hover:text-white flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> Add Key Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0D0D0D] border-white/20 text-white max-w-md max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-heading uppercase italic">
                          Select Key Skill
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-4">
                        {PREDEFINED_KEY_SKILLS.map((skill, idx) => {
                          const Icon = ACCOMPLISHMENT_ICONS[skill.icon] || Trophy;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                const newSkill = {
                                  id: Date.now() + idx,
                                  text: skill.text,
                                  icon: skill.icon,
                                };
                                handleUpdate("keySkills", [...coachData.keySkills, newSkill]);
                                setIsAddSkillOpen(false);
                              }}
                              className="flex items-center gap-3 w-full text-left p-3 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group"
                            >
                              <div className="shrink-0 p-2 rounded bg-white/5 group-hover:bg-primary/20 text-gray-400 group-hover:text-primary transition-all">
                                <Icon size={18} />
                              </div>
                              <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                                {skill.text}
                              </span>
                            </button>
                          );
                        })}
                        <button
                          onClick={() => {
                            const newSkill = {
                              id: Date.now(),
                              text: "Double-click to edit key skill details.",
                              icon: "trophy",
                            };
                            handleUpdate("keySkills", [...coachData.keySkills, newSkill]);
                            setIsAddSkillOpen(false);
                          }}
                          className="flex items-center gap-3 w-full text-left p-3 rounded-lg border border-dashed border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all group text-gray-400 hover:text-white"
                        >
                          <div className="shrink-0 p-2 rounded bg-white/5 text-gray-400 group-hover:text-primary">
                            <Plus size={18} />
                          </div>
                          <span className="text-xs">Add Custom Key Skill</span>
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Skill Icon Picker Dialog */}
              <Dialog
                open={activeSkillIconIndex !== null}
                onOpenChange={(open) => !open && setActiveSkillIconIndex(null)}
              >
                <DialogContent className="bg-[#0D0D0D] border-white/20 text-white max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="font-heading uppercase italic">Select Icon</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {Object.entries(ACCOMPLISHMENT_ICONS).map(([name, Icon]) => (
                      <button
                        key={name}
                        onClick={() => {
                          if (activeSkillIconIndex !== null) {
                            const newSkills = [...coachData.keySkills];
                            newSkills[activeSkillIconIndex] = {
                              ...newSkills[activeSkillIconIndex],
                              icon: name,
                            };
                            handleUpdate("keySkills", newSkills);
                            setActiveSkillIconIndex(null);
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

          </div>
        </div>
      </div>
    </>
  );
};

export default CoachBioSection;
