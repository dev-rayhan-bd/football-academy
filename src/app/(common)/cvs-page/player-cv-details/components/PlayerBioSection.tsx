/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import positionMap from "@/assets/cvs-page/id/position-map.png";
import technicalIcon from "@/assets/cvs-page/id/player-styles-icons/technical.png";
import finesseShotIcon from "@/assets/cvs-page/id/player-styles-icons/finesse shot.png";
import incisivePassIcon from "@/assets/cvs-page/id/player-styles-icons/incisiver pass.png";
import longBallIcon from "@/assets/cvs-page/id/player-styles-icons/long ball specialist.png";
import speedsterIcon from "@/assets/cvs-page/id/player-styles-icons/speedster.png";
import powerHeaderIcon from "@/assets/cvs-page/id/player-styles-icons/power header.png";
import interceptorIcon from "@/assets/cvs-page/id/player-styles-icons/interceptor.png";
import blockIcon from "@/assets/cvs-page/id/player-styles-icons/block specialist.png";
import clinicalFinisherIcon from "@/assets/cvs-page/id/player-styles-icons/clinical finisher.png";
import dribblingIcon from "@/assets/cvs-page/id/player-styles-icons/dribbling wizard.png";
import setPieceIcon from "@/assets/cvs-page/id/player-styles-icons/set piece specialist.png";
import playmakerIcon from "@/assets/cvs-page/id/player-styles-icons/playmark.png";
import acrobaticIcon from "@/assets/cvs-page/id/player-styles-icons/acrobatic.png";
import deadballIcon from "@/assets/cvs-page/id/player-styles-icons/dead ball specialist.png";
import relentlessIcon from "@/assets/cvs-page/id/player-styles-icons/relentless.png";
import quickStepIcon from "@/assets/cvs-page/id/player-styles-icons/quick step.png";
import tricksterIcon from "@/assets/cvs-page/id/player-styles-icons/trickster.png";
import whippedCrossIcon from "@/assets/cvs-page/id/player-styles-icons/whipped cross.png";

const STYLE_ICONS: Record<string, any> = {
  "technical": technicalIcon,
  "finesse-shot": finesseShotIcon,
  "incisive-pass": incisivePassIcon,
  "long-ball": longBallIcon,
  "speedster": speedsterIcon,
  "power-header": powerHeaderIcon,
  "interceptor": interceptorIcon,
  "block": blockIcon,
  "clinical-finisher": clinicalFinisherIcon,
  "dribbling": dribblingIcon,
  "set-piece": setPieceIcon,
  "playmaker": playmakerIcon,
  "acrobatic": acrobaticIcon,
  "deadball": deadballIcon,
  "relentless": relentlessIcon,
  "quick-step": quickStepIcon,
  "trickster": tricksterIcon,
  "whipped-cross": whippedCrossIcon,
};
import positionIcon from "@/assets/cvs-page/id/positionIcon.png";
import trofeeIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import { CMSField } from "@/components/shared/CMSField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { cn, getShortForm, getFullWithShortForm, getVeryShortPosition } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { usePlayerStats } from "./FullEditablePage";

const ALL_STYLES = [
  { id: "technical", label: "Technical" },
  { id: "finesse-shot", label: "Finesse Shot" },
  { id: "incisive-pass", label: "Incisive Pass" },
  { id: "long-ball", label: "Long Ball Specialist" },
  { id: "speedster", label: "Speedster" },
  { id: "power-header", label: "Power Header" },
  { id: "interceptor", label: "Interceptor" },
  { id: "block", label: "Block Specialist" },
  { id: "clinical-finisher", label: "Clinical Finisher" },
  { id: "dribbling", label: "Dribbling Wizard" },
  { id: "set-piece", label: "Set Piece Specialist" },
  { id: "playmaker", label: "Playmaker" },
  { id: "acrobatic", label: "Acrobatic" },
  { id: "deadball", label: "Dead Ball Specialist" },
  { id: "relentless", label: "Relentless" },
  { id: "quick-step", label: "Quick Step" },
  { id: "trickster", label: "Trickster" },
  { id: "whipped-cross", label: "Whipped Cross" },
];


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

const _getMarkersForPosition = (position: string, isFutsal: boolean) => {
  const pos = position?.trim() || "";
  const cleanPos = pos.toLowerCase();

  if (isFutsal) {
    if (cleanPos.includes("goalkeeper") || cleanPos.includes("gk")) {
      return [
        { id: "gk-1", name: "Goalkeeper", x: 50, y: 90 },
        { id: "gk-2", name: "Sweeper Keeper", x: 50, y: 80 },
        { id: "gk-3", name: "Shot Stopper", x: 42, y: 88 }
      ];
    }
    if (cleanPos.includes("fixo")) {
      return [
        { id: "fixo-1", name: "Fixo (Defender)", x: 50, y: 75 },
        { id: "fixo-2", name: "Center Back", x: 50, y: 82 },
        { id: "fixo-3", name: "Defensive Midfielder", x: 50, y: 62 }
      ];
    }
    if (cleanPos.includes("alas") && (cleanPos.includes("right") || cleanPos.includes("rw") || cleanPos.includes("(r)"))) {
      return [
        { id: "alasr-1", name: "Alas (Right Wing)", x: 80, y: 45 },
        { id: "alasr-2", name: "Right Winger", x: 82, y: 25 },
        { id: "alasr-3", name: "Right Midfielder", x: 75, y: 58 }
      ];
    }
    if (cleanPos.includes("alas") && (cleanPos.includes("left") || cleanPos.includes("lw") || cleanPos.includes("(l)"))) {
      return [
        { id: "alasl-1", name: "Alas (Left Wing)", x: 20, y: 45 },
        { id: "alasl-2", name: "Left Winger", x: 18, y: 25 },
        { id: "alasl-3", name: "Left Midfielder", x: 25, y: 58 }
      ];
    }
    if (cleanPos.includes("pivot")) {
      return [
        { id: "pivot-1", name: "Pivot (Forward)", x: 50, y: 20 },
        { id: "pivot-2", name: "Striker", x: 50, y: 12 },
        { id: "pivot-3", name: "Center Forward", x: 50, y: 32 }
      ];
    }
    // Fallbacks if a soccer position is selected but Futsal map is showing:
    return [
      { id: "f-1", name: pos || "Futsal Player", x: 50, y: 50 },
      { id: "f-2", name: "Fixo", x: 50, y: 75 },
      { id: "f-3", name: "Pivot", x: 50, y: 25 }
    ];
  } else {
    // Football (soccer) positions:
    const basePos = pos.split("(")[0].trim();
    switch (basePos) {
      case "Goalkeeper":
        return [
          { id: "gk-1", name: "Goalkeeper", x: 50, y: 92 },
          { id: "gk-2", name: "Sweeper Keeper", x: 50, y: 82 },
          { id: "gk-3", name: "Shot Stopper", x: 42, y: 90 }
        ];
      case "Center Back":
        return [
          { id: "cb-1", name: "Center Back", x: 50, y: 78 },
          { id: "cb-2", name: "Sweeper", x: 50, y: 88 },
          { id: "cb-3", name: "Defensive Midfielder", x: 50, y: 62 }
        ];
      case "Right Back":
        return [
          { id: "rb-1", name: "Right Back", x: 80, y: 78 },
          { id: "rb-2", name: "Right Wing-Back", x: 85, y: 65 },
          { id: "rb-3", name: "Center Back", x: 50, y: 78 }
        ];
      case "Left Back":
        return [
          { id: "lb-1", name: "Left Back", x: 20, y: 78 },
          { id: "lb-2", name: "Left Wing-Back", x: 15, y: 65 },
          { id: "lb-3", name: "Center Back", x: 50, y: 78 }
        ];
      case "Wing Back":
      case "Left Wing Back":
      case "Right Wing Back":
        return [
          { id: "wb-1", name: basePos, x: 82, y: 65 },
          { id: "wb-2", name: "Full-Back", x: 80, y: 78 },
          { id: "wb-3", name: "Side Midfielder", x: 80, y: 50 }
        ];
      case "Defensive Midfielder":
        return [
          { id: "dm-1", name: "Defensive Midfielder", x: 50, y: 62 },
          { id: "dm-2", name: "Central Midfielder", x: 50, y: 50 },
          { id: "dm-3", name: "Center Back", x: 50, y: 78 }
        ];
      case "Central Midfielder":
        return [
          { id: "cm-1", name: "Central Midfielder", x: 50, y: 50 },
          { id: "cm-2", name: "Attacking Midfielder", x: 50, y: 35 },
          { id: "cm-3", name: "Defensive Midfielder", x: 50, y: 62 }
        ];
      case "Attacking Midfielder":
        return [
          { id: "am-1", name: "Attacking Midfielder", x: 50, y: 35 },
          { id: "am-2", name: "Central Midfielder", x: 50, y: 50 },
          { id: "am-3", name: "Second Striker", x: 50, y: 25 }
        ];
      case "Left Midfielder":
        return [
          { id: "lm-1", name: "Left Midfielder", x: 20, y: 50 },
          { id: "lm-2", name: "Left Winger", x: 18, y: 25 },
          { id: "lm-3", name: "Central Midfielder", x: 50, y: 50 }
        ];
      case "Right Midfielder":
        return [
          { id: "rm-1", name: "Right Midfielder", x: 80, y: 50 },
          { id: "rm-2", name: "Right Winger", x: 82, y: 25 },
          { id: "rm-3", name: "Central Midfielder", x: 50, y: 50 }
        ];
      case "Striker":
        return [
          { id: "st-1", name: "Striker", x: 50, y: 15 },
          { id: "st-2", name: "Center Forward", x: 50, y: 25 },
          { id: "st-3", name: "Second Striker", x: 50, y: 32 }
        ];
      case "Center Forward":
        return [
          { id: "cf-1", name: "Center Forward", x: 50, y: 25 },
          { id: "cf-2", name: "Striker", x: 50, y: 15 },
          { id: "cf-3", name: "Attacking Midfielder", x: 50, y: 38 }
        ];
      case "Second Striker":
      case "Left Forward":
      case "Right Forward":
        return [
          { id: "ss-1", name: basePos, x: 50, y: 28 },
          { id: "ss-2", name: "Center Forward", x: 50, y: 20 },
          { id: "ss-3", name: "Attacking Midfielder", x: 50, y: 38 }
        ];
      case "Left Winger":
        return [
          { id: "lw-1", name: "Left Winger", x: 18, y: 25 },
          { id: "lw-2", name: "Left Midfielder", x: 20, y: 50 },
          { id: "lw-3", name: "Forward", x: 50, y: 20 }
        ];
      case "Right Winger":
        return [
          { id: "rw-1", name: "Right Winger", x: 82, y: 25 },
          { id: "rw-2", name: "Right Midfielder", x: 80, y: 50 },
          { id: "rw-3", name: "Forward", x: 50, y: 20 }
        ];
      default:
        return [
          { id: "def-1", name: basePos || "Player", x: 50, y: 50 },
          { id: "def-2", name: "Central Defender", x: 50, y: 75 },
          { id: "def-3", name: "Central Midfielder", x: 50, y: 50 }
        ];
    }
  }
};

const getMarkersForPosition = (position: string, isFutsal: boolean) => {
  const markers = _getMarkersForPosition(position, isFutsal);
  return markers.map((m, idx) => ({
    ...m,
    name: `position${idx + 1}`
  }));
};

const PlayerBioSection = ({ editable = true }: { editable?: boolean }) => {
  const { playerData, handleUpdate } = usePlayer();

  const { setBioRating, role } = usePlayerStats();

  const [editingField, setEditingField] = useState<string | null>(null);

  const canEditBio = editable && (role === "player" || role === "parent" || role === "coach");
  const canEditEvaluation = editable && (role === "player" || role === "parent" || role === "coach");

  useEffect(() => {
    setBioRating(playerData.rating);
  }, [playerData.rating, setBioRating]);

  const [isPositionMap, setIsPositionMap] = useState(true);
  const [activeMarker, setActiveMarker] = useState<{ id: string, type: 'position' | 'futsal' } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const prevPositionRef = useRef<string>("");

  // Auto-switch maps when position changes
  useEffect(() => {
    if (!playerData || !playerData.position) return;

    const cleanPos = playerData.position.toLowerCase();
    const shouldBeFutsal = cleanPos.includes("goalkeeper") || cleanPos.includes("fixo") || cleanPos.includes("alas") || cleanPos.includes("pivot");

    // Only auto-switch the map if the position itself has changed
    if (playerData.position !== prevPositionRef.current) {
      setIsPositionMap(!shouldBeFutsal);
      prevPositionRef.current = playerData.position;
    } else if (!shouldBeFutsal && !isPositionMap) {
      // Force Position Map if it's a soccer position and Futsal Map is active
      setIsPositionMap(true);
    }
  }, [playerData.position, isPositionMap]);

  // Synchronize markers for the active map
  useEffect(() => {
    if (!playerData || !playerData.position) return;

    const expected = getMarkersForPosition(playerData.position, !isPositionMap);
    const field = isPositionMap ? 'positionMarkers' : 'futsalMarkers';
    const current = (isPositionMap ? playerData.positionMarkers : playerData.futsalMarkers) || [];

    const needsReset = current.length !== 3 || current.some((m, idx) => m.name !== expected[idx]?.name);

    if (needsReset) {
      handleUpdate(field, expected);
    }
  }, [playerData.position, isPositionMap]);

  const addMarker = () => {
    // Fixed to 3 markers, disabled manual addition
  };

  const updateMarkerPosition = (e: MouseEvent | React.MouseEvent) => {
    if (!activeMarker || !mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain to bounds
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    const field = activeMarker.type === 'position' ? 'positionMarkers' : 'futsalMarkers';
    const markers = (activeMarker.type === 'position' ? playerData.positionMarkers : playerData.futsalMarkers) || [];

    const newMarkers = markers.map(m =>
      m.id === activeMarker.id ? { ...m, x, y } : m
    );

    handleUpdate(field, newMarkers);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (activeMarker) {
        updateMarkerPosition(e);
      }
    };

    const handleGlobalMouseUp = () => {
      setActiveMarker(null);
    };

    if (activeMarker) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [activeMarker]);

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

  const handleImageUpload = async (
    file: File,
    field: string
  ) => {
    let processedFile = file;

    if (field === "playerImage") {
      try {
        toast.loading("Removing background... Please wait.", { id: "bg-removal" });
        const { removeBackground } = await import("@imgly/background-removal");
        const blob = await removeBackground(file);
        processedFile = new File([blob], file.name, { type: "image/png" });
        toast.success("Background removed!", { id: "bg-removal" });
      } catch (error) {
        console.error("Background removal failed:", error);
        toast.error("Background removal failed. Using original image.", { id: "bg-removal" });
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdate(field, reader.result);
    };
    reader.readAsDataURL(processedFile);
  };

  const EditableImage = ({
    src,
    alt,
    className,
    field,
    width,
    height,
    layout
  }: {
    src: any;
    alt: string;
    className?: string;
    field: string;
    width?: number;
    height?: number;
    layout?: "fill" | "responsive" | "intrinsic" | "fixed";
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const playerStats = usePlayerStats();
    const [role, setRole] = useState<string>("player");


    useEffect(() => {
      const currentRole = localStorage.getItem("userRole") || role || "player";
      setRole(currentRole);
    }, [role]);

    const canUpload = editable && ((field === "playerImage" || field === "birthCountryFlag" || field === "dualNationalityFlag")
      ? (role === "player" || role === "parent" || role === "coach")
      : canEditEvaluation);

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      if (!canUpload) return;
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file, field);
      }
    };

    return (
      <div
        className={`relative group w-full ${canUpload ? "cursor-pointer" : ""}`}
        onClick={() => canUpload && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Image
          src={src}
          alt={alt}
          className={className}
          width={width || 500}
          height={height || 500}
          layout={layout}
          draggable={false}
        />
        {canUpload && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
              <span className="text-[10px] text-white font-black uppercase tracking-widest">Drop or Click</span>
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

  const toggleStyle = (id: string) => {
    const currentStyles = playerData.selectedStyleIds;
    if (currentStyles.includes(id)) {
      handleUpdate(
        "selectedStyleIds",
        currentStyles.filter((styleId: any) => styleId !== id)
      );
    } else if (currentStyles.length < 4) {
      handleUpdate("selectedStyleIds", [...currentStyles, id]);
    }
  };

  // const handleShare = async () => {
  //   const shareUrl = window.location.href;
  //   const shareData = {
  //     title: `${playerData.fullName}'s Professional Football CV`,
  //     text: `Check out ${playerData.fullName}'s verified football profile on Eddie Ricci Management.`,
  //     url: shareUrl,
  //   };

  //   try {
  //     if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
  //       await navigator.share(shareData);
  //       toast.success("Shared successfully!");
  //     } else {
  //       await navigator.clipboard.writeText(shareUrl);
  //       toast.success("Profile link copied to clipboard!");
  //     }
  //   } catch (err) {
  //     if ((err as Error).name !== "AbortError") {
  //       await navigator.clipboard.writeText(shareUrl);
  //       toast.success("Profile link copied to clipboard!");
  //     }
  //   }
  // };

  const orderedSelectedStyles = playerData.selectedStyleIds.map(
    (id: any) => ALL_STYLES.find((s: any) => s.id === id)!
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


  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-1 xl:col-span-4 h-fit space-y-6 bg-cardBg">
            <div className=" p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Personal Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Full Name</span>
                  <CMSField
                    value={playerData.fullName}
                    onUpdate={(val) => handleUpdate("fullName", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Date of Birth</span>
                  <CMSField
                    value={playerData.dob}
                    type="date"
                    onUpdate={(val) => {
                      handleUpdate("dob", val);
                      const newAge = calculateAge(String(val));
                      if (newAge !== "") {
                        handleUpdate("age", newAge);
                      }
                    }}
                    canEdit={canEditBio}
                    className="w-1/2 justify-end"
                    inputClassName="text-right w-full bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-3 py-1.5 rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Age</span>
                  <div className="flex items-center gap-1">
                    <span>{playerData.age || 0}</span> <span className="text-gray-400 text-sm">Years</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birth Country</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={playerData.birthCountry}
                      onUpdate={(val) => handleUpdate("birthCountry", val)}
                      canEdit={canEditBio}
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(playerData.birthCountry)}
                        alt="birth country flag"
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dual Nationality</span>
                  <div className="flex items-center gap-2">
                    <CMSField
                      value={playerData.dualNationality}
                      onUpdate={(val) => handleUpdate("dualNationality", val)}
                      canEdit={canEditBio}
                      type="combobox"
                      options={ALL_COUNTRIES}
                      className="w-24 justify-end"
                      inputClassName="text-right"
                    />
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={getFlagUrl(playerData.dualNationality)}
                        alt="dual nationality flag"
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Academy</span>
                  <CMSField
                    value={playerData.academyName || "N/A"}
                    onUpdate={(val) => handleUpdate("academyName", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Coach</span>
                  <CMSField
                    value={playerData.coachName || "N/A"}
                    onUpdate={(val) => handleUpdate("coachName", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Club Managed</span>
                  <CMSField
                    value={playerData.clubManaged || "N/A"}
                    onUpdate={(val) => handleUpdate("clubManaged", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Coach License</span>
                  <CMSField
                    value={playerData.coachLicenseNumber || "N/A"}
                    onUpdate={(val) => handleUpdate("coachLicenseNumber", val)}
                    canEdit={canEditBio}
                    className="w-40 justify-end"
                    inputClassName="text-right"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Contact
              </h2>
              <div className="space-y-2 text-sm text-primary">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <CMSField
                    value={playerData.email}
                    onUpdate={(val) => handleUpdate("email", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <CMSField
                    value={playerData.phone}
                    onUpdate={(val) => handleUpdate("phone", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <CMSField
                    value={playerData.location}
                    onUpdate={(val) => handleUpdate("location", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <CMSField
                    value={playerData.website}
                    onUpdate={(val) => handleUpdate("website", val)}
                    canEdit={canEditBio}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Physical Stats
              </h2>
              <div className="flex justify-around text-center mb-6">
                <div>
                  <CMSField
                    value={playerData.height}
                    onUpdate={(val) => handleUpdate("height", val)}
                    canEdit={canEditBio}
                    isNumeric
                    className="text-2xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400">HEIGHT (m)</div>
                </div>
                <div>
                  <CMSField
                    value={playerData.weight}
                    onUpdate={(val) => handleUpdate("weight", val)}
                    canEdit={canEditBio}
                    isNumeric
                    className="text-2xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400">WEIGHT (kg)</div>
                </div>
              </div>

              <div className=" grid grid-cols-2 gap-6">
                <div className="border-2 bg-gray-600/30 p-3 rounded-xl">
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src={playerData.leftLegImage}
                      alt="left leg"
                      className="object-contain"
                      layout="fill"
                    />
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Left</span>
                    <CMSField
                      value={playerData.leftLegUsage}
                      onUpdate={(val) => handleUpdate("leftLegUsage", parseInt(String(val)))}
                      canEdit={canEditBio}
                      type="number"
                      editTrigger="doubleClick"
                      className="text-primary justify-end w-32"
                      inputClassName="text-right h-7 w-20 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-md"
                    />
                  </div>
                  {canEditBio ? (
                    <div className="relative flex items-center h-2 group translate-y-[5px]">
                      <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                        <div
                          className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(playerData.leftLegUsage))}
                          style={{ width: `${playerData.leftLegUsage}%` }}
                        />
                      </div>
                      {/* Visible Slider on Hover */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.leftLegUsage}
                        onChange={(e) =>
                          handleUpdate("leftLegUsage", parseInt(e.target.value))
                        }
                        style={{
                          background: `linear-gradient(to right, ${getHexColor(playerData.leftLegUsage)} ${playerData.leftLegUsage}%, #333 ${playerData.leftLegUsage}%)`,
                        }}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                      />
                      {/* Always Active Invisible Slider for Dragging */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.leftLegUsage}
                        onChange={(e) =>
                          handleUpdate("leftLegUsage", parseInt(e.target.value))
                        }
                        className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                      />
                    </div>
                  ) : (
                    <Progress
                      value={playerData.leftLegUsage}
                      style={{ backgroundColor: '#333' }}
                      indicatorClassName="bg-green-500"
                    />
                  )}
                </div>
                <div className="border-2 bg-gray-600/30 p-3 rounded-xl">
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src={playerData.rightLegImage}
                      alt="right leg"
                      className="object-contain"
                      layout="fill"
                    />
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Right</span>
                    <CMSField
                      value={playerData.rightLegUsage}
                      onUpdate={(val) => handleUpdate("rightLegUsage", parseInt(String(val)))}
                      canEdit={canEditBio}
                      type="number"
                      editTrigger="doubleClick"
                      className="text-primary justify-end w-32"
                      inputClassName="text-right h-7 w-20 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-md"
                    />
                  </div>
                  {canEditBio ? (
                    <div className="relative flex items-center h-2 group translate-y-[5px]">
                      <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                        <div
                          className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(playerData.rightLegUsage))}
                          style={{ width: `${playerData.rightLegUsage}%` }}
                        />
                      </div>
                      {/* Visible Slider on Hover */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.rightLegUsage}
                        onChange={(e) =>
                          handleUpdate("rightLegUsage", parseInt(e.target.value))
                        }
                        style={{
                          background: `linear-gradient(to right, ${getHexColor(playerData.rightLegUsage)} ${playerData.rightLegUsage}%, #333 ${playerData.rightLegUsage}%)`,
                        }}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                      />
                      {/* Always Active Invisible Slider for Dragging */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={playerData.rightLegUsage}
                        onChange={(e) =>
                          handleUpdate("rightLegUsage", parseInt(e.target.value))
                        }
                        className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                      />
                    </div>
                  ) : (
                    <Progress
                      value={playerData.rightLegUsage}
                      style={{ backgroundColor: '#333' }}
                      indicatorClassName="bg-green-500"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Languages
              </h2>
              <div className="space-y-3">
                {playerData.languages.map((lang: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-black/20 border border-border/50 rounded-lg group hover:bg-black/40 transition-all">
                    <CMSField
                      value={lang.name}
                      onUpdate={(val) => handleUpdate(`languages.${idx}.name`, val)}
                      canEdit={canEditBio}
                      className="flex-1 font-medium text-gray-200"
                    />
                    <CMSField
                      value={lang.level || "Fluent"}
                      onUpdate={(val) => handleUpdate(`languages.${idx}.level`, val)}
                      canEdit={canEditBio}
                      type="select"
                      options={["Native", "Fluent", "Intermediate", "Beginner"]}
                      className="w-32 justify-end"
                      inputClassName="text-right text-primary font-bold"
                      hideIcon={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Position Map */}
            <div className="p-6">
              {(() => {
                const cleanPos = (playerData.position || "").toLowerCase();
                const isFutsalPos = cleanPos.includes("goalkeeper") || cleanPos.includes("fixo") || cleanPos.includes("alas") || cleanPos.includes("pivot");

                return (
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setIsPositionMap(true)}
                      className={`${isPositionMap ? "px-3 py-1 bg-primary text-black text-xs text-center font-heading font-normal rounded" : "px-3 py-1 border border-border text-xs rounded hover:bg-gray-900"}`}
                    >
                      Position Map
                    </button>

                    <button
                      disabled={!isFutsalPos}
                      onClick={() => setIsPositionMap(false)}
                      className={cn(
                        "px-3 py-1 text-xs rounded transition-all",
                        !isPositionMap
                          ? "bg-primary text-black font-heading font-normal"
                          : "border border-border hover:bg-gray-900",
                        !isFutsalPos && "opacity-40 cursor-not-allowed hover:bg-transparent"
                      )}
                    >
                      Futsal Map
                    </button>
                  </div>
                );
              })()}

              {/* Add position icon button removed to keep exactly 3 markers */}

              <div
                ref={mapContainerRef}
                className="relative w-full h-auto overflow-hidden select-none"
              >
                <Image
                  src={isPositionMap ? (playerData.positionMap || positionMap) : (playerData.futsalMap || positionMap)}
                  alt={isPositionMap ? "position map" : "futsal map"}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded"
                  draggable={false}
                />

                {/* Render markers */}
                {((isPositionMap ? playerData.positionMarkers : playerData.futsalMarkers) || []).map((marker: any, idx: number) => (
                  <div
                    key={marker.id}
                    className="absolute z-20 cursor-move group/marker flex flex-col items-center"
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setActiveMarker({ id: marker.id, type: isPositionMap ? 'position' : 'futsal' });
                    }}
                  >
                    <Image
                      src={positionIcon}
                      alt="position icon"
                      width={idx === 0 ? 34 : 30}
                      height={idx === 0 ? 34 : 30}
                      className={cn(
                        "pointer-events-none drop-shadow-lg transition-transform group-hover/marker:scale-110",
                        idx === 0 ? "w-[32px] h-[32px] md:w-[34px] md:h-[34px]" : "w-[28px] h-[28px] md:w-[30px] md:h-[30px]"
                      )}
                    />
                    {marker.name && (
                      <div className={cn(
                        "mt-1 px-1.5 py-0.5 rounded bg-black/85 border border-white/10 text-white text-[9px] font-medium text-center whitespace-nowrap shadow-md pointer-events-none tracking-wide select-none transition-all",

                      )}>
                        position{idx + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - PLAYER IMAGE */}
          <div className="col-span-1 xl:col-span-4 flex flex-col items-center">
            {/* Player Name */}
            <div className="text-center mb-8">
              <div className="flex items-center mb-8 justify-center">
                <div className="relative w-32 h-20">
                  <Image
                    src={getFlagUrl(playerData.birthCountry)}
                    alt="Birth Country"
                    layout="fill"
                    className="object-cover rounded shadow-lg border border-border"
                  />
                  {playerData.dualNationality && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-8 border-2 border-white rounded shadow-md overflow-hidden">
                      <Image
                        src={getFlagUrl(playerData.dualNationality)}
                        alt="Dual Nationality"
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold font-heading mb-2 flex items-center justify-center gap-2">
                <CMSField
                  value={playerData.fullName}
                  onUpdate={(val) => handleUpdate("fullName", val)}
                  canEdit={canEditBio}
                  className="text-2xl font-bold font-heading"
                />
                <span className="text-green-500 ">[{playerData.age}]</span>
              </h1>
            </div>

            <div className="mb-8">
              <CMSField
                value={getFullWithShortForm(playerData.position)}
                onUpdate={(val) => handleUpdate("position", val)}
                canEdit={canEditBio}
                type="combobox"
                options={[
                  "--Futsal Positions--",
                  "Goalkeeper (GK)",
                  "Fixo (Defender / CB)",
                  "Alas (Right Wing / RW)",
                  "Alas (Left Wing / LW)",
                  "Pivot (Forward / CF)",
                  "--Football Positions--",
                  "Goalkeeper (GK)",
                  "Center Back (CB)",
                  "Right Back (RB)",
                  "Left Back (LB)",
                  "Left Wing Back (LWB)",
                  "Right Wing Back (RWB)",
                  "Defensive Midfielder (CDM)",
                  "Central Midfielder (CM)",
                  "Attacking Midfielder (CAM)",
                  "Left Midfielder (LM)",
                  "Right Midfielder (RM)",
                  "Striker (ST)",
                  "Center Forward (CF)",
                  "Left Forward (LF)",
                  "Right Forward (RF)",
                  "Left Winger (LW)",
                  "Right Winger (RW)"
                ]}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded hover:bg-gray-900 bg-transparent text-foreground h-auto w-fit mx-auto"
              />
            </div>

            {/* Player Image */}
            <div className="relative w-full h-[523px]  mb-8 flex  items-end justify-center">
              <EditableImage
                src={playerData.playerImage}
                alt={playerData.fullName}
                className="object-contain w-auto mx-auto h-[500px]"
                width={800}
                height={1000}
                field="playerImage"
              />
            </div>

            {/* Player Style Section */}
            <div className="w-full space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h3 className="text-2xl font-bold font-heading">
                    Player Style
                  </h3>
                  {canEditBio && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-cardBg border-border text-foreground">
                        <DialogHeader>
                          <DialogTitle>Select Player Styles (Max 4)</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          {ALL_STYLES.map((style) => (
                            <div
                              key={style.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={style.id}
                                checked={playerData.selectedStyleIds.includes(
                                  style.id
                                )}
                                onCheckedChange={() => toggleStyle(style.id)}
                                disabled={
                                  !playerData.selectedStyleIds.includes(
                                    style.id
                                  ) && playerData.selectedStyleIds.length >= 4
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
                    const badge = STYLE_ICONS[style.id];
                    const badgeSrc = typeof badge === "string" ? badge : badge?.src || "";
                    return (
                      <div key={style.id} className="space-y-4">
                        <div className="flex justify-center">
                          {badgeSrc ? (
                            <img
                              src={badgeSrc}
                              className="w-20 h-20 object-contain"
                              alt={style.label}
                            />
                          ) : (
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                              {style.label}
                            </div>
                          )}
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
          <div className="col-span-1 xl:col-span-4 space-y-6 bg-cardBg">
            {/* Certification Card */}
            <div className="p-6 bnorder-none rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-all">


              {/* SVG certificate container */}
              <div className="w-full aspect-square relative select-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
                  <defs>
                    <style>{`
                      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap');
                      .gold-text {
                        fill: url(#gold-grad-static);
                      }
                      .white-text {
                        fill: #FFFFFF;
                      }
                      .badge-heading {
                        font-family: 'Montserrat', 'Inter', sans-serif;
                        text-transform: uppercase;
                      }
                      .badge-content {
                        font-family: 'Inter', 'Montserrat', sans-serif;
                      }
                    `}</style>

                    <linearGradient id="gold-grad-static" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#BF953F" />
                      <stop offset="20%" stopColor="#FCF6BA" />
                      <stop offset="40%" stopColor="#B38728" />
                      <stop offset="60%" stopColor="#FBF5B7" />
                      <stop offset="80%" stopColor="#AA771C" />
                      <stop offset="100%" stopColor="#E2C175" />
                    </linearGradient>

                    <linearGradient id="gold-bright-static" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FCF6BA" />
                      <stop offset="35%" stopColor="#FFEFA6" />
                      <stop offset="70%" stopColor="#B38728" />
                      <stop offset="100%" stopColor="#FCF6BA" />
                    </linearGradient>

                    <linearGradient id="gold-dark-static" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8a6f27" />
                      <stop offset="50%" stopColor="#4e3a0b" />
                      <stop offset="100%" stopColor="#8a6f27" />
                    </linearGradient>

                    <linearGradient id="gold-divider-static" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#BF953F" stopOpacity="0" />
                      <stop offset="30%" stopColor="#FCF6BA" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#B38728" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#FCF6BA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#AA771C" stopOpacity="0" />
                    </linearGradient>

                    <radialGradient id="bg-radial-static" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                      <stop offset="0%" stopColor="#0a2a53" />
                      <stop offset="55%" stopColor="#05152e" />
                      <stop offset="90%" stopColor="#010615" />
                      <stop offset="100%" stopColor="#000207" />
                    </radialGradient>

                    <linearGradient id="ribbon-grad-static" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#020e24" />
                      <stop offset="12%" stopColor="#061b3b" />
                      <stop offset="34%" stopColor="#0f3468" />
                      <stop offset="50%" stopColor="#19488a" />
                      <stop offset="66%" stopColor="#0f3468" />
                      <stop offset="88%" stopColor="#061b3b" />
                      <stop offset="100%" stopColor="#020e24" />
                    </linearGradient>

                    <filter id="drop-shadow-static" x="-10%" y="-10%" width="120%" height="125%">
                      <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.65" />
                    </filter>

                    <filter id="glow-static" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <g id="leaf-node-static">
                      <path d="M 0,0 C -6,-10 -18,-18 -25,-14 C -18,1 -6,4 0,0" fill="url(#gold-grad-static)" stroke="url(#gold-dark-static)" strokeWidth="0.5" />
                      <path d="M 0,0 C 6,-10 18,-18 25,-14 C 18,1 6,4 0,0" fill="url(#gold-bright-static)" stroke="url(#gold-dark-static)" strokeWidth="0.5" />
                    </g>

                    <g id="wreath-half-static">
                      <path d="M -30,0 Q -95,-15 -136,-72" fill="none" stroke="url(#gold-grad-static)" strokeWidth="3" strokeLinecap="round" />
                      <g transform="translate(-42, -1) rotate(-15) scale(0.65)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-62, -6) rotate(-30) scale(0.75)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-82, -14) rotate(-45) scale(0.85)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-101, -24) rotate(-60) scale(0.95)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-118, -37) rotate(-75) scale(0.95)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-130, -52) rotate(-90) scale(0.85)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-136, -69) rotate(-105) scale(0.75)"><use href="#leaf-node-static" /></g>
                      <g transform="translate(-137, -86) rotate(-120) scale(0.60)"><use href="#leaf-node-static" /></g>
                    </g>

                    <path id="top-text-arc-shared" d="M 124,400 A 276,276 0 0,1 676,400" fill="none" />

                    <filter id="green-glow-static" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <radialGradient id="green-radar-glow-static" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="green-chart-fill-static" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="red-chart-fill-static" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  <polygon points="400.00,20.00 414.21,38.28 429.81,21.17 442.55,40.51 459.45,24.68 470.62,44.96 488.71,30.50 498.26,51.59 517.43,38.60 525.29,60.37 545.42,48.93 551.55,71.25 572.52,61.42 576.88,84.16 598.55,76.00 601.12,99.01 623.36,92.57 624.11,115.72 646.79,111.05 645.73,134.18 668.70,131.30 665.82,154.27 688.95,153.21 684.28,175.89 707.43,176.64 700.99,198.88 724.00,201.45 715.84,223.12 738.58,227.48 728.75,248.45 751.07,254.58 739.63,274.71 761.40,282.57 748.41,301.74 769.50,311.29 755.04,329.38 775.32,340.55 759.49,357.45 778.83,370.19 761.72,385.79 780.00,400.00 761.72,414.21 778.83,429.81 759.49,442.55 775.32,459.45 755.04,470.62 769.50,488.71 748.41,498.26 761.40,517.43 739.63,525.29 751.07,545.42 728.75,551.55 738.58,572.52 715.84,576.88 724.00,598.55 700.99,601.12 707.43,623.36 684.28,624.11 688.95,646.79 665.82,645.73 668.70,668.70 645.73,665.82 646.79,688.95 624.11,684.28 623.36,707.43 601.12,700.99 598.55,724.00 576.88,715.84 572.52,738.58 551.55,728.75 545.42,751.07 525.29,739.63 517.43,761.40 498.26,748.41 488.71,769.50 470.62,755.04 459.45,775.32 442.55,759.49 429.81,778.83 414.21,761.72 400.00,780.00 385.79,761.72 370.19,778.83 357.45,759.49 340.55,775.32 329.38,755.04 311.29,769.50 301.74,748.41 282.57,761.40 274.71,739.63 254.58,751.07 248.45,728.75 227.48,738.58 223.12,715.84 201.45,724.00 198.88,700.99 176.64,707.43 175.89,684.28 153.21,688.95 154.27,665.82 131.30,668.70 134.18,645.73 111.05,646.79 115.72,624.11 92.57,623.36 99.01,601.12 76.00,598.55 84.16,576.88 61.42,572.52 71.25,551.55 48.93,545.42 60.37,525.29 38.60,517.43 51.59,498.26 30.50,488.71 44.96,470.62 24.68,459.45 40.51,442.55 21.17,429.81 38.28,414.21 20.00,400.00 38.28,385.79 21.17,370.19 40.51,357.45 24.68,340.55 44.96,329.38 30.50,311.29 51.59,301.74 38.60,282.57 60.37,274.71 48.93,254.58 71.25,248.45 61.42,227.48 84.16,223.12 76.00,201.45 99.01,198.88 92.57,176.64 115.72,175.89 111.05,153.21 134.18,154.27 131.30,131.30 154.27,134.18 153.21,111.05 175.89,115.72 176.64,92.57 198.88,99.01 201.45,76.00 223.12,84.16 227.48,61.42 248.45,71.25 254.58,48.93 274.71,60.37 282.57,38.60 301.74,51.59 311.29,30.50 329.38,44.96 340.55,24.68 357.45,40.51 370.19,21.17 385.79,38.28" fill="url(#gold-grad-static)" filter="url(#drop-shadow-static)" />

                  <circle cx="400" cy="400" r="358" stroke="url(#gold-dark-static)" strokeWidth="1.5" fill="none" />
                  <circle cx="400" cy="400" r="352" stroke="url(#gold-grad-static)" strokeWidth="5" fill="none" />
                  <circle cx="400" cy="400" r="344" stroke="url(#gold-dark-static)" strokeWidth="1.5" fill="none" />

                  <circle cx="400" cy="400" r="342" fill="url(#bg-radial-static)" />

                  <circle cx="400" cy="400" r="328" stroke="url(#gold-grad-static)" strokeWidth="2" strokeDasharray="2 7" fill="none" opacity="0.85" />
                  <circle cx="400" cy="400" r="320" stroke="url(#gold-grad-static)" strokeWidth="1" fill="none" opacity="0.4" />
                  <circle cx="400" cy="400" r="316" stroke="url(#gold-grad-static)" strokeWidth="3" fill="none" />
                  <circle cx="400" cy="400" r="312" stroke="url(#gold-dark-static)" strokeWidth="1.5" fill="none" />
                  <circle cx="400" cy="400" r="276" stroke="url(#gold-grad-static)" strokeDasharray="1.5 5" strokeWidth="1" fill="none" opacity="0.3" />

                  <g opacity="0.08" stroke="url(#gold-grad-static)" strokeWidth="2.5" fill="none" transform="translate(570, 310)">
                    <circle cx="0" cy="0" r="130" strokeWidth="2" opacity="0.6" />
                    <polygon points="0,-32 30,-10 19,26 -19,26 -30,-10" fill="url(#gold-grad-static)" opacity="0.35" />
                    <line x1="0" y1="-32" x2="0" y2="-65" />
                    <line x1="30" y1="-10" x2="60" y2="-20" />
                    <line x1="19" y1="26" x2="38" y2="52" />
                    <line x1="-19" y1="26" x2="-38" y2="52" />
                    <line x1="-30" y1="-10" x2="-60" y2="-20" />
                    <polygon points="0,-65 35,-80 55,-55 60,-20 30,-10" />
                    <polygon points="60,-20 90,-10 95,25 65,45 38,52 19,26 30,-10" />
                    <polygon points="38,52 45,90 10,105 -25,95 -38,52 19,26" />
                    <polygon points="-38,52 -65,45 -95,25 -90,-10 -60,-20 -30,-10 -19,26" />
                    <polygon points="-60,-20 -55,-55 -35,-80 0,-65 -30,-10" />
                    <line x1="35" y1="-80" x2="45" y2="-115" />
                    <line x1="-35" y1="-80" x2="-45" y2="-115" />
                    <line x1="90" y1="-10" x2="118" y2="-15" />
                    <line x1="-90" y1="-10" x2="-118" y2="-15" />
                    <line x1="95" y1="25" x2="122" y2="35" />
                    <line x1="-95" y1="25" x2="-122" y2="35" />
                    <line x1="45" y1="90" x2="55" y2="118" />
                    <line x1="-45" y1="90" x2="-55" y2="118" />
                  </g>

                  <text fontSize="34" fontWeight="900" className="badge-heading" letterSpacing="11">
                    <textPath href="#top-text-arc-shared" startOffset="50%" textAnchor="middle" fill="url(#gold-bright-static)" filter="url(#glow-static)">
                      VERIFIED
                    </textPath>
                  </text>

                  <path d="M 168.32,207 L 168.32,207.00 L 171.26,214.95 L 179.73,215.29 L 173.08,220.55 L 175.37,228.71 L 168.32,224.00 L 161.27,228.71 L 163.56,220.55 L 156.91,215.29 L 165.38,214.95 Z" fill="url(#gold-bright-static)" />
                  <path d="M 631.68,207 L 631.68,207.00 L 634.62,214.95 L 643.09,215.29 L 636.44,220.55 L 638.73,228.71 L 631.68,224.00 L 624.63,228.71 L 626.92,220.55 L 620.27,215.29 L 628.74,214.95 Z" fill="url(#gold-bright-static)" />

                  <g transform="translate(350 160) scale(2)">
                    <path d="M.215 21.934V.214h56v60h-56v-38.28M24.59 57.359c.414.243.832.489 1.308.868.688.23 1.188 1.058 2.227.652 3.629-1.785 6.82-4.2 9.934-6.848.043-.031.066-.07.187-.222a92.486 92.486 0 0 1 2.399-2.399c.46-.55.917-1.105 1.503-1.722.317-.465.637-.93.961-1.422 0 0-.023-.012.106.02.09-.087.18-.173.34-.388.347-.53.695-1.062 1.172-1.664.304-.695 1.293-1.086 1.078-2.144.68-1.125 1.355-2.25 2.148-3.469.18-.426.363-.851.543-1.281 1.719-4.137 2.86-8.418 3.203-12.899.098-1.273.27-2.539.426-4.007a653.89 653.89 0 0 1-.004-5.563c-.066-.707-.21-1.414-.176-2.113.04-.778-.36-1.094-.988-1.293-1.855-.59-3.7-1.211-5.566-1.762a393.025 393.025 0 0 0-8.918-2.55c-1.641-.446-3.313-.766-5.024-1.286-.074-.23-.152-.465-.156-.816.352-1.09-.27-1.813-1.016-2.64-.715-.84-1.609-1.224-2.898-1.118-1.887-.332-4.332 1.96-4.27 4.332-1.547.504-3.093 1.004-4.64 1.512-1.805.597-3.598 1.25-5.418 1.804a251.347 251.347 0 0 1-8.766 2.473c-.207.14-.57.25-.601.422-.188 1.098-.461 2.219-.418 3.316.148 3.7.418 7.391.671 11.254.403 1.739.801 3.477 1.227 5.387.91 2.465 1.79 4.941 2.75 7.387.246.617.75 1.133 1.125 1.691 0 0 .008.008.024.125.058.05.12.098.183.223 0 0 .012.07.059.215.765 1.187 1.535 2.375 2.312 3.644 0 0 .012.086.043.227.418.453.836.91 1.266 1.515.492.528.984 1.055 1.496 1.73a159.15 159.15 0 0 1 3.082 3.212c.445.398.875.816 1.34 1.187 1.254 1 2.527 1.977 3.804 3.117.63.383 1.258.77 1.903 1.137 0 0-.012.016.039.156Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#000", fillOpacity: 0 }} />
                    <path d="M4.46 11.441c2.864-.832 5.735-1.632 8.59-2.5 1.821-.554 3.614-1.207 5.419-1.804a248.068 248.068 0 0 1 4.789-1.528c.328-.07.508-.12.75-.175.148-.012.234-.02.316.046.153.446.305.813.453 1.266.16.524.328.965.43 1.457-.918.317-1.777.57-2.621.86-1.613.546-3.219 1.117-4.895 1.671-.34.145-.617.301-.96.438-.31-.016-.56-.063-.778.008A612.005 612.005 0 0 0 8.63 13.5c-.246.078-.45.29-.762.45-.316.198-.722.363-.746.57-.371 3.41-.414 6.824.152 10.316.5 4.906 1.957 9.441 3.903 13.883a8.739 8.739 0 0 1-1.156-.332c-.52.386-.989.738-1.512 1.027a329.184 329.184 0 0 1-2.903-7.672c-.375-1.894-.753-3.703-1.128-5.582-.657-4.957-.84-9.84-.016-14.719Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#2c2c2c", fillOpacity: 1 }} />
                    <path d="M31.504 6.008c1.656.379 3.328.699 4.969 1.144 2.984.809 5.953 1.672 8.918 2.551 1.867.55 3.71 1.172 5.566 1.762.629.2 1.027.515.988 1.293-.035.699.11 1.406.114 2.277-.024 1.977.011 3.79.046 5.598-.136 1.27-.308 2.535-.406 3.808-.344 4.48-1.484 8.762-3.203 12.899-.18.43-.363.855-.66 1.324-.156.047-.195.047-.246.023-.012-.023-.07-.027-.07-.027s.082.05.02.106c-.708.183-1.345.347-1.993.43-.262.034-.543-.11-.8-.247.14-.328.265-.586.386-.844 2.449-5.261 3.828-10.785 4.008-16.68.015-.25.011-.417.007-.675-.02-.453-.039-.816-.043-1.277.004-1.04-.011-1.98-.011-3.024a35.843 35.843 0 0 0-.262-1.726c-.004-.012-.031-.036-.043-.07-.016-.032-.086-.048-.094-.044-.008 0 .016-.015.102.036.156-.051.23-.149.3-.25a1.522 1.522 0 0 1-.421-.297c-2.586-.953-5.168-1.825-7.79-2.746-.812-.29-1.581-.528-2.433-.797-2.187-.684-4.293-1.375-6.422-1.989-.445-.129-.972.016-1.511.04-.122.007-.165.046-.235.12-.125-.003-.195.008-.277-.035.039-.293.09-.511.176-.789.148-.16.265-.273.445-.41.234-.297.402-.562.605-.89.114-.243.192-.418.27-.594Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#2b2a2a", fillOpacity: 1 }} />
                    <path d="M38.137 51.914c-.012.047-.035.086-.211.11-1.219.097-2.278.152-2.735-1.196a3.5 3.5 0 0 0-.265-.887c-.883-.632-1.719-1.218-2.555-1.886-.262-.875-.52-1.668-.766-2.535-.242-.325-.457-.641-.753-.797-.493-.262-1.04-.422-1.582-.692-.223-.176-.418-.285-.625-.437-.016-.106-.043-.157-.125-.266-.457-.668-.883-1.266-1.336-1.93-.434-.449-.84-.832-1.254-1.293-.317-.468-.621-.859-.97-1.308-.374-.207-.71-.356-1.042-.578-.07-.262-.137-.446-.172-.692.645-.511 1.258-.96 2.113-1.582-.57 0-.812 0-1.054-.078.449-.957 1.238-1.191 2.105-1.152-.168.242-.297.426-.312.445.5-.043 1.105-.258 1.605-.11 1.742.513 3.45 1.15 5.211 1.805.79.38 1.543.688 2.313 1.055-.059.305-.13.547-.282.79a64.553 64.553 0 0 1-2.254-.759c.344.594.512.891.684 1.258.246.406.492.742.762 1.145.218.426.41.789.613 1.23.195.567.375 1.051.547 1.559-.016.027.027.066.02.148.093.617.195 1.153.288 1.778.165 1.097.34 2.105.516 3.183.211.317.422.563.633.805.004-.004.008.004 0 .074 0 .16.008.25.035.395.07.097.121.148.207.265.234.758.438 1.446.64 2.133m-5.855-9.535c-.394-.75-.789-1.5-1.183-2.254-.496 1.3.168 1.918 1.183 2.254Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#2b2c2a", fillOpacity: 1 }} />
                    <path d="M35.16 50.895c.488 1.28 1.547 1.226 2.73 1.144-2.945 2.64-6.136 5.055-9.859 6.773-.68-.37-1.265-.671-1.906-1.039a22.966 22.966 0 0 0-1.586-.554s.012-.016.074-.063c-.62-.445-1.3-.843-1.98-1.242-1.262-.988-2.535-1.965-3.79-2.965-.464-.37-.894-.789-1.37-1.328-.34-.668-.649-1.191-.993-1.785 1.102-.223 2.122-.773 3.075.195.097.098.343.047.574.078.152.114.254.215.36.356.062.066.12.094.241.144.63.438 1.196.852 1.805 1.325 1.55 1.023 3.063 1.976 4.55 2.957.606.398 1.145.441 1.77.035 2.094-1.36 4.204-2.692 6.305-4.031Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#913537", fillOpacity: 1 }} />
                    <path d="M4.375 11.426c-.738 4.894-.555 9.777.031 14.734-.218.074-.36.074-.5.074-.222-3.691-.492-7.382-.64-11.082-.043-1.097.23-2.218.418-3.316.03-.172.394-.281.691-.41Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d1cfcf", fillOpacity: 1 }} />
                    <path d="M44.73 39.02c.274.066.555.21.817.175.648-.082 1.285-.246 1.992-.43l.063-.054c.039 0 .078 0 .175.004a32.293 32.293 0 0 1-2.105 3.379c-.91-.086-1.805.504-2.418-.465.504-.918.992-1.766 1.476-2.61Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#352d2d", fillOpacity: 1 }} />
                    <path d="M8.559 39.473c.472-.348.941-.7 1.46-1.086.235.082.672.234 1.208.367.195.121.289.258.398.469.305.652.598 1.226.855 1.875-.402 1.332-1.726.312-2.21 1.027l-1.012-.836-.028-.164c-.074-.145-.128-.195-.183-.246 0 0-.008-.008.004-.082-.153-.492-.32-.91-.492-1.324Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#35302d", fillOpacity: 1 }} />
                    <path d="M20.074 50.094c-.176-.016-.422.035-.52-.063-.952-.968-1.972-.418-3.074-.195.344.594.653 1.117.957 1.719a37.392 37.392 0 0 1-2.972-3.121c.062-.34.086-.567.101-.704 1.07.07 2.098.133 3.114.208-.004.003-.012-.012.015.039.086.097.149.144.2.191-.012 0-.016-.023.027.031.129.098.21.137.36.196a70.93 70.93 0 0 1 1.792 1.699Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f3435", fillOpacity: 1 }} />
                    <path d="M9.281 41.363c.293.188.606.446.989.762.484-.715 1.808.305 2.27-.98.62.82 1.151 1.664 1.608 2.542-.418.063-.77.157-1.097.106-1.235-.191-1.36-.105-1.446 1.203-.765-1.187-1.535-2.375-2.324-3.633Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#403331", fillOpacity: 1 }} />
                    <path d="M43.234 41.703c.633.895 1.528.305 2.371.422.415 1.023-.574 1.414-1.015 2.152a19.198 19.198 0 0 1-2.79-.488c.493-.742.962-1.414 1.434-2.086Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#41302f", fillOpacity: 1 }} />
                    <path d="M30.566 7.52c-.117.109-.234.222-.464.382a3.807 3.807 0 0 1-1.293-.25 29.378 29.378 0 0 1-.192-1.765 9.768 9.768 0 0 1 1.238-1.176c.508.148.938.305 1.368.46.074.231.152.466.254.766-.051.247-.13.422-.32.665-.747.085-.973.335-.59.918Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d8d7dc", fillOpacity: 1 }} />
                    <path d="M17.688 47.93c-1.024-.067-2.051-.13-3.122-.2-.015.137-.039.364-.113.63A8.677 8.677 0 0 1 13 46.726a40 40 0 0 1 2.988-.782c0 .008-.02.012.004.07.086.106.153.15.203.2-.015 0-.015-.031.004.023.082.106.145.153.196.2-.008-.004 0-.024-.004.05.136.172.277.278.484.414.313.364.563.696.813 1.028Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#6c3231", fillOpacity: 1 }} />
                    <path d="M42.023 47.754c-.46.55-.918 1.105-1.5 1.637-.527-1.114-1.363-.832-2.16-.653-.37.086-.734.207-1.101.313 0 0-.004-.008.023-.07a19.315 19.315 0 0 1 1.73-1.645c1.122-.54 2.09-.293 3.008.418Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#793232", fillOpacity: 1 }} />
                    <path d="M37.254 49.121a5.501 5.501 0 0 1 1.11-.383c.796-.18 1.632-.46 2.097.688-.7.828-1.457 1.605-2.27 2.433-.257-.632-.46-1.32-.714-2.129a1.02 1.02 0 0 0-.207-.265c-.008-.094-.016-.184-.016-.344Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#853234", fillOpacity: 1 }} />
                    <path d="M41.777 43.86c.891.152 1.785.308 2.75.453a13.494 13.494 0 0 1-1.066 1.656c-.191.144-.285.215-.375.285 0 0 .023.012-.043-.035-.563-.164-1.055-.313-1.555-.387-.398-.059-.812-.023-1.195-.102.512-.667 1-1.27 1.484-1.87Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#543030", fillOpacity: 1 }} />
                    <path d="M15.992 45.938c-.972.23-1.949.464-3 .714a6.95 6.95 0 0 1-1.258-1.422 33.854 33.854 0 0 1 2.985-.914c.469.563.87 1.09 1.273 1.621Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#593230", fillOpacity: 1 }} />
                    <path d="M40.27 45.8c.406.009.82-.027 1.218.032.5.074.992.223 1.551.398-.254.528-.574.993-.953 1.489-.98-.676-1.95-.922-3.043-.45.398-.566.812-1.019 1.227-1.468Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#6c3231", fillOpacity: 1 }} />
                    <path d="M27.563 1.328c1.105-.14 2 .242 2.671 1.156a8.54 8.54 0 0 1-1.097.75 1.89 1.89 0 0 1-.54-.066c-.44-.156-.831-.258-1.222-.438-.227-.351-.453-.62-.656-.96a6.28 6.28 0 0 1 .843-.442Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#dbdbdd", fillOpacity: 1 }} />
                    <path d="M8.508 39.414c.222.473.39.89.55 1.383-.394-.484-.898-1-1.144-1.617-.96-2.446-1.84-4.922-2.703-7.453.164-.008.277.046.39.101.95 2.508 1.899 5.02 2.907 7.586Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d0d0cd", fillOpacity: 1 }} />
                    <path d="M27.473 1.313c-.188.14-.461.269-.825.496-.601.543-1.12.984-1.718 1.43-.383.734-.684 1.464-.989 2.195a6.842 6.842 0 0 1-.605.16c-.29-2.34 2.156-4.633 4.137-4.282Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f8fbf8", fillOpacity: 1 }} />
                    <path d="M29.207 3.23c.324-.222.652-.449 1.059-.683.757.691 1.379 1.414.992 2.566-.465-.097-.895-.254-1.43-.476-.277-.516-.45-.961-.621-1.407Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#323232", fillOpacity: 1 }} />
                    <path d="M14.652 44.285c-.949.293-1.898.582-2.933.875-.09.004-.102-.082-.106-.125.078-1.347.203-1.433 1.438-1.242.328.05.68-.043 1.148-.074a.98.98 0 0 1 .442.418c0 .05.011.148.011.148Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#4c3230", fillOpacity: 1 }} />
                    <path d="M5.605 31.742c-.117.031-.23-.023-.406-.101-.46-1.758-.86-3.496-1.277-5.32.125-.087.265-.087.48-.087.45 1.805.828 3.614 1.203 5.508Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c6c7c5", fillOpacity: 1 }} />
                    <path d="M26.184 57.836c.582.305 1.168.605 1.77.977-.868.472-1.368-.356-2.044-.711a.608.608 0 0 1 .274-.266Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#afafaf", fillOpacity: 1 }} />
                    <path d="M52.113 20.535c-.043-1.71-.078-3.523-.058-5.402.058 1.722.062 3.512.058 5.402Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#323232", fillOpacity: 1 }} />
                    <path d="M22.64 55.992c.672.32 1.352.719 1.965 1.172a12.25 12.25 0 0 1-1.964-1.172ZM26.125 57.773c-.027.11-.113.157-.242.258a6.29 6.29 0 0 1-1.32-.742c.488.094.996.258 1.562.484Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d1cfcf", fillOpacity: 1 }} />
                    <path d="M43.148 46.27c.028-.086.122-.157.278-.235-.031.078-.121.164-.278.235Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#6c3231", fillOpacity: 1 }} />
                    <path d="M9.055 40.938c.047-.008.101.042.172.152-.043.004-.106-.043-.172-.153Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#403331", fillOpacity: 1 }} />
                    <path d="M11.613 39.148c-.097-.136-.191-.273-.34-.449-2.043-4.422-3.5-8.957-3.914-13.867.204-.102.317-.102.473-.039.211.812.375 1.566.543 2.402a302.8 302.8 0 0 0 .93 4.485c1 2.539 1.972 5.004 2.863 7.465-.238 0-.398 0-.555.003Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c3d0c6", fillOpacity: 1 }} />
                    <path d="M7.785 24.727c-.11.003-.223.003-.418.011-.66-3.394-.617-6.808-.246-10.218.024-.207.43-.372.75-.516.098.082.102.121.047.226-.078 3.258-.098 6.446-.125 9.715-.012.32-.008.551-.008.782Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c6c7c5", fillOpacity: 1 }} />
                    <path d="M16.8 11.191c.274-.156.552-.312.99-.441 2.206-.57 4.253-1.18 6.312-1.746.335-.094.718-.004 1.007.027-3.03.969-5.98 1.938-8.945 2.836-2.074.63-4.172 1.16-6.215 1.668.38-.183.715-.3 1.051-.414 1.934-.644 3.867-1.285 5.8-1.93Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f7f7f", fillOpacity: 1 }} />
                    <path d="M16.73 11.172c-1.863.664-3.796 1.305-5.73 1.95-.336.112-.672.23-1.102.464-.699.273-1.312.426-1.921.574a5.75 5.75 0 0 1-.016-.168c.219-.203.422-.414.668-.492 2.437-.79 4.879-1.563 7.324-2.32.219-.07.469-.024.777-.008ZM25.184 9.004c-.364-.004-.747-.094-1.082 0-2.059.566-4.106 1.176-6.25 1.754a135.205 135.205 0 0 1 4.734-1.695c.844-.29 1.703-.543 2.687-.844.211.105.293.25.352.46-.16.15-.3.239-.441.325Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#afafaf", fillOpacity: 1 }} />
                    <path d="M25.645 8.613a2.014 2.014 0 0 0-.305-.445 4.61 4.61 0 0 1-.485-1.41c.442-.008.797.054 1.172.195.38.484.743.899 1.106 1.379-.008.195-.016.324-.102.461-.46-.059-.843-.121-1.265-.18-.04.004-.121 0-.121 0m-.563-1.41s.016-.008 0 0Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d8d7dc", fillOpacity: 1 }} />
                    <path d="M26.012 6.879c-.36-.066-.715-.129-1.153-.203a4.61 4.61 0 0 1-.52-1.258c.09-.254.161-.363.298-.465.23.078.398.145.597.274.375.378.72.699 1.055 1.09-.098.234-.187.398-.277.562Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e2e2e5", fillOpacity: 1 }} />
                    <path d="M24.57 4.945c-.07.11-.14.22-.226.395-.102.074-.188.082-.336.094.238-.73.539-1.461.941-2.125.125.257.156.445.117.691-.207.352-.351.648-.496.945Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#cccbd1", fillOpacity: 1 }} />
                    <path d="M25.625 8.68c.02-.067.102-.063.188-.004.5.238.914.418 1.417.594 1.051.156 1.934-.125 2.793-.508.067-.028.137-.04.336.008a4591.949 4591.949 0 0 1 18.164 5.835c.094.032.137.016.18 0 0 0 .07.016-.02.118-.07 1.683-.046 3.265-.038 4.933-.06.672-.102 1.258-.157 1.93-.011.32-.011.555-.023.875-.067.523-.13.96-.195 1.492-.665 3.188-1.32 6.281-2.047 9.36-.16-1.114-.141-2.235-.375-3.297-.317-1.426-.832-2.809-1.262-4.29.246-.398.46-.746.742-1.035.73-.753 1.477-1.449 1.434-2.66-.035-.902.14-1.812.23-2.785-1.152-.379-1.633-.207-1.86.785-.3-.156-.507-.312-.73-.441-.132-.078-.293-.117-.43-.219.012-.047-.019-.133-.038-.18-.157-.05-.29-.058-.5-.062-.383.078-.684.156-1.055.207-.297 0-.535.074-.758.05-.672-.077-1.492.016-1.973-.335-.71-.52-1.14-1.403-1.761-2.067-.766-.816-1.207-1.949-2.66-2.062-.973-.078-2.02-.547-2.82-1.137-1.216-.89-2.423-1.078-3.868-.664a3.633 3.633 0 0 1-.562-.465c-.07-.11-.125-.152-.247-.25-1.074-.699-2.05-.316-3.113.059-.613-.067-1.183-.29-1.66-.156-1.844.511-3.73.972-5.457 1.77-1.66.769-3.227 1.82-4.66 2.968-.988.793-1.68 1.96-2.582 2.96a7.49 7.49 0 0 0-.844.673 123.13 123.13 0 0 1-.805-.453c.086 1.12.153 2.062.153 3.015-.367.215-.664.418-.957.617.015-3.183.035-6.37.113-9.629.668-.218 1.281-.37 1.937-.574 2.137-.629 4.235-1.16 6.31-1.789 2.964-.898 5.913-1.867 8.944-2.836.215-.113.356-.203.516-.351Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#fcfcfc", fillOpacity: 1 }} />
                    <path d="M48.473 22.375c.004-.234.004-.469.078-.79.164-.081.246-.081.39-.081.102.004.141.004.18.004-.16 5.812-1.539 11.336-3.988 16.597-.121.258-.246.516-.387.844-.5.914-.988 1.762-1.492 2.68-.492.746-.961 1.418-1.453 2.16-.508.672-.996 1.273-1.508 1.941-.438.52-.852.973-1.297 1.489-.578.61-1.133 1.152-1.715 1.761a1.789 1.789 0 0 1-.582-.73c.89-.926 1.707-1.781 2.582-2.676 2.192-2.023 3.606-4.504 4.903-7.148.726-1.742 1.418-3.418 2.109-5.094a581.181 581.181 0 0 1 2.047-9.398c.101-.598.117-1.079.133-1.559Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d0d0cd", fillOpacity: 1 }} />
                    <path d="M48.469 14.563c-5.992-1.918-11.989-3.836-18.055-5.797-.059-.114-.016-.153.195-.164 2.414.691 4.692 1.394 6.98 2.062.282.082.626-.05.942-.082.774.242 1.543.48 2.371.844.36.281.645.484.965.594 1.883.62 3.778 1.199 5.656 1.843.352.121.633.461.946.7Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f7f7f", fillOpacity: 1 }} />
                    <path d="M30.008 8.691c-.844.454-1.727.735-2.778.5-.101-.187-.109-.296-.117-.406.004-.129.012-.258.102-.46a25.262 25.262 0 0 1 1.613-.59c.387.074.77.148 1.238.222.032.223-.02.441-.058.734Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d1cfcf", fillOpacity: 1 }} />
                    <path d="M48.523 14.605c-.367-.28-.648-.62-1-.742-1.878-.644-3.773-1.222-5.656-1.843-.32-.11-.605-.313-.926-.547 2.567.8 5.149 1.672 7.746 2.726l.024.395s-.023.015-.016.015c-.035.012-.078.028-.172-.004ZM38.453 10.555c-.238.058-.582.191-.863.11-2.29-.669-4.567-1.372-6.934-2.067.403-.016.93-.16 1.375-.032 2.13.614 4.235 1.305 6.422 1.989Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#afafaf", fillOpacity: 1 }} />
                    <path d="M48.664 19.574c-.027-1.586-.05-3.168.031-4.82.106-.066.133-.043.149.07l.238 1.727c.012.941.027 1.883-.047 2.918-.183.101-.277.101-.37.105Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bcbcbc", fillOpacity: 1 }} />
                    <path d="M48.645 19.656c.113-.086.207-.086.375-.086.09.364.109.727.07 1.227-.11.328-.156.52-.207.707-.086 0-.168 0-.32-.004-.02-.586.023-1.172.082-1.844Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c6c7c5", fillOpacity: 1 }} />
                    <path d="M30.629 7.492c-.445-.554-.219-.804.492-.828-.09.266-.258.531-.492.828Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d1cfcf", fillOpacity: 1 }} />
                    <path d="M49.094 16.45c-.086-.438-.16-.973-.246-1.614.078.437.168.976.246 1.613ZM48.941 21.504c-.007-.188.04-.379.145-.617.066.12.07.289.055.539-.059.082-.098.082-.2.078ZM48.797 14.645c-.09-.122-.094-.192-.106-.368.13-.03.266.043.407.118-.07.101-.145.199-.301.25Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d9d9d9", fillOpacity: 1 }} />
                    <path d="m47.602 38.71-.082-.05s.058.004.07.028l.012.023Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#352d2d", fillOpacity: 1 }} />
                    <path d="M24.703 12.469c.977-.38 1.953-.762 3.027.011.125.165.2.192.27.223.16.133.316.27.547.488a.754.754 0 0 1 .113.434c-.043.516-.062.95-.113 1.473.086.894.2 1.699.316 2.582.438.187.867.3 1.274.465-.227.804.304.601.675.664.172.285.348.507.567.796.426.965.805 1.86 1.187 2.836.387 1.102.77 2.122 1.168 3.207.118.309.223.555.325.887.203 1.395.34 2.715.656 3.992.14.559.652 1.02 1.031 1.59.461.375.879.692 1.332 1.082.184.746.324 1.414.387 2.102-.586-.614-1.094-1.246-1.598-1.875-.082.058-.16.12-.238.18.133.234.266.464.398.699-.043.05-.082.101-.125.152a39.133 39.133 0 0 0-.992-.496c-.004.004.012.012-.02-.05-.12-.11-.21-.15-.285-.263-.328-.867-.671-1.664-1.023-2.535-.352-.68-.7-1.285-1.039-1.883.004.008.016 0 .008-.078-.375-.879-.739-1.683-1.082-2.57a45.269 45.269 0 0 0-1.09-2.527c-.645 1.246-.297 3.16.558 4 .016.445.055.816.09 1.23 0 .043.008.125.004.211.145.332.293.578.457.875a1.3 1.3 0 0 1-.02.36c-.538 1.718.59 2.835 1.259 4.152.058.113.109.164.195.258.09.359.164.64.16.918a135.99 135.99 0 0 1-4.254-1.48.614.614 0 0 0-.277-.126c-.028.02-.086.016-.145-.05-.578-.184-1.144-.544-1.465.245a.04.04 0 0 0 .004.012c-.902.016-1.691.25-2.144 1.207-.012.074-.02.067-.098.063a3.54 3.54 0 0 0-.605.508c-.36.21-.672.374-1 .468-.04-.156-.063-.246-.098-.406-.195-.465-.383-.852-.578-1.324-.14-.531-.277-.985-.414-1.524-.215-1.027-.426-1.968-.637-2.996-.066-.61-.133-1.125-.2-1.73-.144-.66-.288-1.238-.44-1.903-.07-.324-.137-.554-.192-.867-.094-.758-.2-1.433-.352-2.41-.515.617-1.03.957-1.125 1.395-.265 1.203-.351 2.445-.523 3.757.016.7.043 1.313.094 1.993.14.207.258.347.394.562.121.95.22 1.824.246 2.7-.199.25-.332.488-.539.726-.277-.156-.48-.309-.629-.418-.128.312-.234.566-.394.789-.262-.09-.461-.152-.672-.254-.012-.101-.035-.152-.09-.293-.07-.691-.172-1.289-.172-1.883.008-2.113.055-4.23.118-6.425.214-1.18.402-2.278.628-3.415.063-.152.082-.27.13-.437.085-.156.144-.262.21-.45.305-.452.602-.827.899-1.206.004-.008.02-.008.062-.028.09-.058.121-.109.153-.238.078-.246.14-.422.253-.652 1.391-.793 2.696-1.614 4.086-2.25.633-.293.832-.547.614-1.254-.008-.531-.028-.969-.016-1.477-.059-.164-.144-.261-.223-.445.344-.746.676-1.41 1.012-2.074Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#292b29", fillOpacity: 1 }} />
                    <path d="M44.152 38.492c-1.265 2.578-2.68 5.059-4.93 7.028-1.117-.2-2.113-.375-3.105-.551-.105-.535-.207-1.07-.195-1.633.808.508 1.504 1.039 2.504 1.805 0-.84.207-1.512-.043-1.88-.64-.952-.332-1.574.48-2.199.246-.273.418-.542.664-.816.344.262.61.531.993.918.117-.457.207-.82.324-1.277l.863.984c.203-.578.395-1.11.535-1.504-.433 0-.84.086-1.16-.039-.145-.058-.121-.543-.113-.887.422-1.043.8-2.027 1.148-3.023.078-.227.028-.492.074-.73.075-.387.184-.77.27-1.153.125-.562.32-1.12.344-1.687.035-.817-.055-1.641-.102-2.461-.008-.192-.047-.387-.058-.66.652-2.106 1.32-4.09 2.714-5.79.586-.718.551-1.726-.16-2.582.02-.144.016-.23.016-.316.144-1 .625-1.172 1.777-.793-.09.973-.265 1.883-.23 2.785.043 1.211-.703 1.907-1.434 2.66-.281.29-.496.637-.82 1.051-.196.606-.52 1.168-.399 1.61.899 3.25 1.078 6.457-.312 9.617-.285.644-.25 1.129.355 1.523Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#eef5ee", fillOpacity: 1 }} />
                    <path d="M32.375 48.14c.832.583 1.668 1.169 2.508 1.872-2.188 1.57-4.375 3.02-6.574 4.449-.157.102-.465.156-.598.074a71.99 71.99 0 0 1-3.805-2.558c.004-.188.008-.293.102-.387.512.055.941.152 1.36.12 1.554-.108 2.468-1.003 2.968-2.456.566.094 1.05.246 1.539.254 1.07.015 1.914-.457 2.5-1.367Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f9fbf9", fillOpacity: 1 }} />
                    <path d="M32.371 48.055c-.582.996-1.426 1.468-2.496 1.453-.488-.008-.973-.16-1.55-.344-.15-.523-.208-.95-.173-1.387.434-.152.813-.242 1.11-.445.797-.555 1.558-1.152 2.332-1.734.258.789.515 1.582.777 2.457Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#ebf5eb", fillOpacity: 1 }} />
                    <path d="M23.902 52.055c1.266.832 2.524 1.672 3.809 2.48.133.082.441.028.598-.074 2.199-1.43 4.386-2.879 6.62-4.395.13.184.212.442.262.762-2.132 1.406-4.242 2.738-6.336 4.098-.625.406-1.164.363-1.77-.035-1.487-.98-3-1.934-4.46-2.97.168-.077.29-.085.484-.085.313.078.555.148.793.219Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e2d6d5", fillOpacity: 1 }} />
                    <path d="M31.605 45.52a32.307 32.307 0 0 1-2.343 1.812c-.297.203-.676.293-1.149.395a6.1 6.1 0 0 1-.953-1.313c.293-.094.559-.172.8-.133.267.043.509.196.763.301.07-.3.164-.602.195-.91.023-.238-.035-.484-.055-.797 0-.168 0-.262.067-.371.164-.145.261-.274.36-.406.523.203 1.07.363 1.562.625.296.156.511.472.753.797Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#dfecdf", fillOpacity: 1 }} />
                    <path d="M28.55 43.398c.052.04.079.09.095.278.003.293 0 .457-.086.625-1.051-.133-2.012-.266-2.977-.399-.309.051-.531-.246-.832-.406-.945-.508-1.938-.941-2.879-1.46-.187-.106-.226-.474-.293-.774.156-.094.274-.137.43-.114.582.446 1.097.883 1.676 1.204 1.406.785 3.238-.188 4.554 1.066.051.047.207-.012.313-.02Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c0e1c6", fillOpacity: 1 }} />
                    <path d="M36.105 45.059c1.004.086 2 .261 3.055.496a30.27 30.27 0 0 1-2.46 2.62c-.255-1.01-.43-2.019-.595-3.116Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f2f7f2", fillOpacity: 1 }} />
                    <path d="M28.52 43.328c-.075.078-.23.137-.282.09-1.316-1.254-3.148-.281-4.554-1.066-.579-.32-1.094-.758-1.676-1.258-.035-.157-.035-.192.027-.239.168-.074.27-.136.445-.203.165 0 .254-.004.364.07 1.351 1.255 3.218 1.544 4.367.747.426.593.852 1.191 1.309 1.86Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b8dcbd", fillOpacity: 1 }} />
                    <path d="M38.79 41.066c-.74.621-1.048 1.243-.407 2.196.25.367.043 1.039.043 1.879-1-.766-1.696-1.297-2.496-1.887-.106-.055-.149-.094-.004-.094 1.332.035 1.418-.117 1.094-1.203-.079-.254.199-.61.378-.937.57-.266 1.075-.516 1.563-.696-.066.293-.121.516-.172.742Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e2efe3", fillOpacity: 1 }} />
                    <path d="M23.715 37.586c.066.187.133.371.168.691-.313.36-.59.586-.871.82-.004.008-.024.008-.086.02-.293.184-.524.363-.832.559-1.313.707-2.54 1.398-3.778 2.011.07-.316.149-.554.297-.812.262-.133.457-.25.723-.387.422-.312.781-.61 1.133-.914-.008-.004 0 .012.066.031.168-.066.266-.156.363-.246-.007-.004-.003.008.075.008.457-.285.836-.578 1.215-.87-.004-.005 0 .007.058-.005.094-.078.133-.144.238-.238.32-.227.578-.426.899-.629.156-.012.242-.023.332-.04Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#355f3c", fillOpacity: 1 }} />
                    <path d="M35.523 38.7c.075-.243.145-.485.278-.798.246-.129.433-.191.672-.21 1.136 1.222 1.132 1.222 1.726-.305.074-.192.211-.36.36-.578.093-.094.14-.153.254-.223.097-.027.136-.043.21.008.707 1.011-.23 1.75-.382 2.59-.578.02-1.196-.375-1.504.398-.121-.02-.192-.023-.309-.086-.46-.309-.883-.555-1.305-.797Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#65b872", fillOpacity: 1 }} />
                    <path d="M27.184 41.398c-1.122.868-2.989.579-4.247-.68 1.07-.105 2.145.368 3-.538.407.386.813.77 1.247 1.218Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#aed5b1", fillOpacity: 1 }} />
                    <path d="M28.465 34.469s.058.004.12.031c.138.059.208.094.278.125 1.383.477 2.762.95 4.274 1.477.164.078.199.105.234.203 0 .207 0 .347.004.488-1.723-.594-3.43-1.23-5.172-1.742-.5-.149-1.105.066-1.605.11.015-.02.144-.204.312-.446.035-.055.031-.063.106-.074.535-.067.992-.118 1.449-.172Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#a03d3f", fillOpacity: 1 }} />
                    <path d="M22.172 39.656c.23-.176.46-.355.773-.515.102.027.121.039.137.05l-.07-.105c.281-.223.558-.45.875-.73.363.085.699.234 1.058.519-.828.688-1.68 1.234-2.535 1.781-.105.063-.207.125-.426.149-.011-.414.086-.782.188-1.149Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7fbf89", fillOpacity: 1 }} />
                    <path d="M37.332 41.04c-.113.308-.39.663-.312.917.324 1.086.238 1.238-1.079 1.18a4.522 4.522 0 0 1-.609-1.563c.477-.363.879-.648 1.355-.93.22.008.364.02.528.09l.117.305Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#dfecdf", fillOpacity: 1 }} />
                    <path d="M22.48 40.652c.786-.543 1.637-1.09 2.508-1.718.32.312.625.703.942 1.171-.848.98-1.922.508-3.008.54-.188.003-.277.007-.442.007Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#a1d3a8", fillOpacity: 1 }} />
                    <path d="M37.195 40.672a2.943 2.943 0 0 1-.562-.082 39.766 39.766 0 0 0-2.02-.313c-.246-.336-.492-.672-.656-1.078 1.027.074 1.973.219 2.918.36.07 0 .14.004.277.113.055.398.047.7.043 1Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#9acba0", fillOpacity: 1 }} />
                    <path d="M33.414 36.855a.863.863 0 0 1 .031-.542c1.024.261 1.973.582 2.93.972.02.168.035.266.047.363-.188.063-.375.125-.637.196-.828-.301-1.582-.61-2.37-.989Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b96450", fillOpacity: 1 }} />
                    <path d="M36.828 39.496c-.898-.078-1.844-.223-2.871-.367-.254-.297-.422-.594-.766-1.188.918.32 1.547.54 2.254.758.5.242.922.489 1.383.797Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bbd6b5", fillOpacity: 1 }} />
                    <path d="M23.746 37.527c-.121.075-.207.086-.422.075-.18-.09-.23-.157-.277-.29.023-.16.043-.246.062-.335.317-.164.63-.329 1.055-.555.281-.207.45-.348.617-.488 0 0 .008.007.016.011h1.062a59.527 59.527 0 0 0-2.113 1.582Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#a03d3f", fillOpacity: 1 }} />
                    <path d="M34.637 40.344c.61.02 1.238.105 1.925.246a6.407 6.407 0 0 1-1.238.902c-.277-.36-.469-.722-.687-1.148Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c9e3cd", fillOpacity: 1 }} />
                    <path d="M32.234 42.445c-.968-.402-1.632-1.02-1.136-2.32.394.754.789 1.504 1.136 2.32Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c3d0c6", fillOpacity: 1 }} />
                    <path d="M28.645 44.3c0-.167.003-.331.007-.581.2.027.395.136.618.312a.74.74 0 0 1-.368.43c-.136-.09-.195-.133-.257-.16Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d2e9d5", fillOpacity: 1 }} />
                    <path d="M37.29 49.516c.03-.004.085.047.155.144-.035.004-.086-.047-.156-.144Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#793232", fillOpacity: 1 }} />
                    <path d="M23.035 51.828c-.12.008-.242.016-.457.035-.652-.402-1.219-.816-1.883-1.3-.14-.098-.175-.118-.21-.141-.102-.098-.204-.2-.356-.313-.629-.574-1.207-1.132-1.887-1.773-.187-.117-.277-.152-.363-.191 0 0 .004.023-.008-.036-.07-.097-.137-.14-.203-.183 0 0 .008.015.012.011a27.18 27.18 0 0 0-.828-1.097c-.207-.203-.332-.313-.457-.426 0 0-.008.02-.016-.035a.658.658 0 0 0-.2-.195v-.032a.602.602 0 0 0-.21-.195s.02-.004.02-.012c-.4-.539-.802-1.066-1.27-1.629-.067-.03-.078-.129-.004-.183.168-.051.262-.051.394.015.301.235.57.41.871.649.579.594 1.122 1.125 1.672 1.734.575.676 1.145 1.274 1.75 1.934 1.235 1.164 2.434 2.262 3.633 3.363Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d0d6c8", fillOpacity: 1 }} />
                    <path d="M20.488 50.465c.032-.02.067 0 .14.07-.019.024-.077-.004-.14-.07Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f3435", fillOpacity: 1 }} />
                    <path d="M15.074 44.086c-.097-.004-.191-.004-.36-.004-.179-.121-.28-.242-.437-.398-.586-.875-1.117-1.72-1.703-2.61-.351-.625-.644-1.199-.949-1.851.145-.078.305-.078.602-.067.175.016.214.02.27.098.491 1.02.972 1.969 1.468 2.953.441-.332.68-.512.95-.637.093.207.148.364.187.602-.02.191-.028.3-.102.43-.105.203-.195.398-.172.578.047.308.16.605.246.906Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bbd0be", fillOpacity: 1 }} />
                    <path d="M17.695 47.977c.04-.008.106.035.188.132-.04.012-.102-.035-.188-.132ZM17.922 48.2c.043-.016.133.019.258.112-.047.024-.13-.015-.258-.113Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#6c3231", fillOpacity: 1 }} />
                    <path d="M28.809 7.652c-.489.254-.997.426-1.59.606a9.967 9.967 0 0 1-1.192-1.305c.075-.238.164-.402.317-.68.101-.28.14-.453.261-.628.368.027.645.058.997.117.382.093.691.152 1 .21.062.536.125 1.067.207 1.68Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#323232", fillOpacity: 1 }} />
                    <path d="M28.617 5.887c-.324.027-.633-.032-1-.207.594-.766 1.297-1.387 1.035-2.461.137.004.278.011.485.015.242.442.414.887.613 1.407-.355.437-.734.8-1.133 1.246Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#eae9ed", fillOpacity: 1 }} />
                    <path d="M16.39 46.488c.13.04.255.149.4.32-.122-.042-.263-.148-.4-.32ZM16.2 46.238c.042-.011.109.035.19.145-.046.008-.109-.04-.19-.145ZM15.992 46.016c.047-.016.117.03.203.136-.05.012-.117-.03-.203-.136Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#593230", fillOpacity: 1 }} />
                    <path d="M28.598 3.168c.316 1.125-.387 1.746-1.051 2.48-.297.055-.574.024-.985-.062-.542-.18-.953-.3-1.363-.422a9.681 9.681 0 0 0-.562-.21 2.13 2.13 0 0 1 .492-.907c1.223.246 1.523-.867 2.25-1.242.387.105.777.207 1.219.363m-2.375 1.664c.043-.059.082-.117.125-.18-.063.04-.125.078-.125.18Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f2f7f2", fillOpacity: 1 }} />
                    <path d="M27.375 2.73c-.723.45-1.023 1.563-2.18 1.262-.09-.238-.12-.426-.168-.687.5-.512 1.02-.953 1.606-1.43.289.234.515.504.742.855Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#323232", fillOpacity: 1 }} />
                    <path d="M12.48 39.18c-.039-.004-.078-.008-.175-.024-1.028-2.472-2-4.937-2.918-7.488.21-.48.449-.863.504-1.27.16-1.148-.032-2.437.43-3.43.48-1.03.206-1.304-.63-1.593l-.011-.066c-.149-.164-.282-.266-.418-.454-.07-.601-.14-1.117-.137-1.628.27.246.469.488.66.734.309.398.613.797.953 1.27.23.398.434.722.637 1.128.016.301.027.516-.012.786.047.312.14.57.246.906.028.293.043.508.047.797.117.261.246.445.38.699.01.156.019.246-.028.398-.09.38-.121.7-.238 1.047-.122 1.445-.348 2.89-.141 4.278.176 1.183.844 2.296 1.258 3.496-.164.172-.285.293-.407.414Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e4f2e5", fillOpacity: 1 }} />
                    <path d="M9.691 25.375c.836.29 1.11.563.63 1.594-.462.992-.27 2.281-.43 3.43-.055.406-.293.788-.532 1.195a38.91 38.91 0 0 1-.906-4.418c.227-.403.383-.696.57-1.047.157.14.317.281.668.598v-1.352Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#edf6ed", fillOpacity: 1 }} />
                    <path d="M9.691 25.375v1.352c-.351-.317-.511-.457-.668-.598-.187.351-.343.644-.574.96-.242-.73-.406-1.484-.617-2.296a4.036 4.036 0 0 1-.039-.848 4.153 4.153 0 0 1 1.023-.703c.16-.015.196-.015.23-.015.075.511.145 1.027.227 1.695.149.254.286.355.418.453Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f2f7f2", fillOpacity: 1 }} />
                    <path d="M27.031 8.793c.09.102.098.21.11.398-.414-.097-.828-.277-1.29-.515.337-.004.72.058 1.18.117Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#cccbd1", fillOpacity: 1 }} />
                    <path d="M25.234 5.227c.375.058.786.18 1.243.363.007.23-.032.402-.125.617-.399-.281-.743-.602-1.118-.98Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f1f4ef", fillOpacity: 1 }} />
                    <path d="M24.617 12.465c-.25.668-.582 1.332-.972 2.098a1.269 1.269 0 0 1-.262.285c-1.762.004-3.426.09-4.883 1.086-1.27.863-2.508 1.773-3.8 2.601-.794.508-1.657.914-2.505 1.332-.308.149-.664.203-1.074.317-.23.023-.387.035-.59.015-.097-.082-.144-.137-.191-.191.82-1 1.512-2.168 2.5-2.961 1.433-1.149 3-2.2 4.66-2.969 1.727-.797 3.613-1.258 5.457-1.77.477-.132 1.047.09 1.66.157Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f3f9f3", fillOpacity: 1 }} />
                    <path d="M28.68 13.543c-.02-.09-.04-.18-.067-.336 1.371-.5 2.578-.312 3.793.578.801.59 1.848 1.059 2.82 1.137 1.454.113 1.895 1.246 2.66 2.062.622.664 1.051 1.547 1.762 2.067.48.351 1.301.258 1.973.336.223.023.461-.051.746.023a3.385 3.385 0 0 1-.398 1.25c-.211.012-.328.024-.524.016-1.808-.664-3.539-1.309-5.246-2.012-.726-1.41-1.047-1.516-2.828-1.004-.004.004-.016-.004-.008-.09-.265-.613-.543-1.136-.84-1.734-.628-1.504-.941-1.652-2.535-1.684-.441-.007-.87-.394-1.308-.609m4.976 1.996c-.066.078-.136.16-.203.242l.285.047c.012-.09.028-.18-.082-.289Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f1f4ef", fillOpacity: 1 }} />
                    <path d="M44.184 38.426c-.637-.328-.672-.813-.387-1.457 1.39-3.16 1.21-6.367.312-9.617-.12-.442.203-1.004.399-1.528.508 1.383 1.023 2.766 1.34 4.192.234 1.062.215 2.183.375 3.297-.621 1.695-1.313 3.37-2.04 5.113Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f8fbf8", fillOpacity: 1 }} />
                    <path d="M10.258 20.008c.129.055.176.11.262.238.043.074.058.168.02.234-.177.543-.47 1.032-.423 1.489.11 1.074.383 2.129.59 3.191-.309-.402-.613-.8-.922-1.2a5.597 5.597 0 0 0-.66-.733h-.238c-.125-.938-.192-1.88-.278-3 .38.214.602.34.805.453a7.49 7.49 0 0 1 .844-.672Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#ecefe5", fillOpacity: 1 }} />
                    <path d="M42.059 20.66c.12-.379.242-.762.379-1.219.312-.156.613-.234 1.035-.261.238.054.359.058.48.058 0 0 .031.086.047.215a5.637 5.637 0 0 1-.129.95c-.023-.016-.078-.016-.133-.075a1.453 1.453 0 0 0-.558-.176c-.004.106.05.184.144.317-.195.11-.43.168-.71.21-.09-.011-.126-.003-.208.009-.047.003-.136.03-.187.015-.09-.023-.125-.031-.16-.043Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bbd0be", fillOpacity: 1 }} />
                    <path d="M43.895 20.418c.039-.281.078-.559.093-.922a.639.639 0 0 1 .414.094c.223.129.43.285.73.441.083.094.087.18-.01.313-.302.27-.505.492-.806.726-.156 0-.218-.011-.265-.093a3.183 3.183 0 0 0-.156-.559Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#47533d", fillOpacity: 1 }} />
                    <path d="M48.465 22.46a8.744 8.744 0 0 1-.113 1.38c-.016-.418.046-.856.113-1.38Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c6c7c5", fillOpacity: 1 }} />
                    <path d="M43.934 19.191c-.102.047-.223.043-.383-.011.094-.047.226-.04.383.011ZM27.977 12.656c-.047.016-.122-.011-.192-.11.067-.042.121 0 .192.11Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f1f4ef", fillOpacity: 1 }} />
                    <path d="M11.2 20.172c.331-.102.687-.156.995-.305.848-.418 1.711-.824 2.504-1.332 1.293-.828 2.531-1.738 3.801-2.601 1.457-.996 3.121-1.082 4.922-1.04.234.075.348.118.46.16.02.442.04.88-.034 1.403-.262.031-.473-.11-.598-.055-1.832.797-3.977.836-5.531 2.297-.168.16-.36.297-.547.434-.617.437-1.215.91-1.863 1.293-.278.16-.692.226-1.008.16-.496-.106-.961-.36-1.512-.55-.215.202-.36.413-.562.609-.098-.012-.137-.008-.243-.036-.238-.082-.414-.132-.59-.242-.062-.11-.128-.152-.195-.195Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#ebf5eb", fillOpacity: 1 }} />
                    <path d="M32.566 22.363c-.382-.898-.761-1.793-1.097-2.746 1.316.367 2.582.793 3.898 1.274.45.238.848.414 1.211.664-.086.48-.289.965-.144 1.289.113.246.675.41 1.03.402 1.114-.027 1.798.863 1.391 1.89-.117.29-.203.59-.378.907-.63.637-.36 1.176.078 1.77v.445c.07.96.144 1.836.136 2.691-.21-.176-.425-.312-.468-.492-.34-1.332-.649-2.672-.953-4.086.632-.68-.11-1.16-.114-1.66-.004-1.027-.386-.856-1.031-.606-.285.11-.754.204-.922.055-.191-.172-.234-.629-.183-.933.09-.508.101-.86-.555-.852-.633.008-1.266-.008-1.899-.012Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d2e9d5", fillOpacity: 1 }} />
                    <path d="M17.48 23.02c-.183 1.097-.37 2.195-.68 3.37a12.45 12.45 0 0 1-1.648-.074c.07 1.274.184 2.407.164 3.54-.007.523-.289 1.042-.511 1.554-.164-.012-.258-.015-.364-.11-.55-2.34-1.093-4.593-1.55-6.843.472-.145.863-.293 1.336-.43 1.14-.328 2.199-.668 3.253-1.007Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#cbe2c9", fillOpacity: 1 }} />
                    <path d="M12.86 20.035c.48.192.945.445 1.44.55.317.067.731 0 1.009-.16.648-.382 1.246-.855 1.863-1.292.187-.137.379-.274.547-.434 1.554-1.46 3.699-1.5 5.531-2.297.125-.054.336.086.586.149.312.62.113.875-.52 1.168-1.39.636-2.695 1.457-4.168 2.258a239.94 239.94 0 0 1-5.691 1.992c-.219-.098-.379-.176-.535-.32-.004-.16-.012-.254 0-.434a19.121 19.121 0 0 0-.063-1.18Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e2ecdf", fillOpacity: 1 }} />
                    <path d="M14.871 31.418c.156-.52.438-1.04.445-1.563.02-1.132-.093-2.265-.164-3.539.395.04.961.094 1.618.157.062 2.117.015 4.234.007 6.347 0 .594.102 1.192.102 1.895-.168.187-.277.265-.387.344.024.046.051.093.078.136.16-.05.32-.105.48-.156.2.059.4.121.63.316.011.274-.004.415-.067.61-.75.738-1.101-.336-1.691-.356-.074-.464-.078-.87-.219-1.222-.152-.383-.43-.719-.676-1.121-.043-.121-.027-.188.032-.34a39.75 39.75 0 0 0-.188-1.508Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b2d8b6", fillOpacity: 1 }} />
                    <path d="M32.566 22.441c.633-.074 1.266-.058 1.899-.066.656-.008.644.344.555.852-.051.304-.008.761.183.933.168.149.637.055.922-.055.645-.25 1.027-.421 1.031.606.004.5.746.98.035 1.687-.105.657-.16 1.22-.136 1.778.05 1.027 1.148 1.992.125 3.097.672.672.683 1.305-.137 1.852-.418-.316-.836-.633-1.227-1.008.07-.066.114-.07.246-.074.797.039.844-.457.754-.93-.257-1.304-.57-2.593-.882-3.992.8-1.058.8-1.058-.371-2.281-.622.25-1.231.5-1.84.746a138.75 138.75 0 0 1-1.157-3.145Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c6e2c9", fillOpacity: 1 }} />
                    <path d="M21.371 30.746c.211.938.422 1.879.574 2.938-.32.32-.578.523-.902.734-.168.145-.27.277-.371.414 0 .004-.004 0-.078-.016-.465-.234-.86-.453-1.25-.668a89.944 89.944 0 0 1-.278-2.742c-.02-.297-.062-.476-.105-.722 0-.168 0-.262.086-.36.86.012 1.808-.941 2.324.422Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#74be77", fillOpacity: 1 }} />
                    <path d="M30.82 18.742c-.379.004-.91.207-.687-.61.023-.062.035-.081.094-.05.234-.062.41-.156.648-.254a.788.788 0 0 1 .219.012c.039.02.12.058.148.082.086.008.149-.008.293-.04.883.278 1.684.567 2.52.923 2.597 1.027 5.16 1.988 7.77 2.988.167.074.284.105.44.184.075.226.118.41.145.601-.012.008.004.035-.082.024-.601-.114-1.117-.22-1.672-.403-1.683-.68-3.328-1.289-5.031-1.949-1.64-.535-3.223-1.02-4.805-1.508Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#414d3e", fillOpacity: 1 }} />
                    <path d="M33.734 25.648c.598-.308 1.207-.558 1.828-.808 1.172 1.223 1.172 1.223.372 2.281.312 1.399.625 2.688.882 3.992.09.473.043.969-.746.852-.129-.66-.117-1.254-.238-1.817-.2-.925-.582-1.816-.695-2.746-.09-.75-.387-1.004-1.075-.957a17.08 17.08 0 0 1-.328-.797Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bddec1", fillOpacity: 1 }} />
                    <path d="M37.078 33.2c.785-.622.774-1.255.102-1.927 1.023-1.105-.075-2.07-.125-3.097a8.461 8.461 0 0 1 .125-1.703c.394 1.312.703 2.652 1.043 3.984.043.18.257.316.457.578.074 1.055.086 2.004.093 2.95-.003-.008.008.003-.074.023-.172.472-.258.922-.336 1.43a.612.612 0 0 1-.289.28c-.101-.007-.14-.011-.203-.066a4.194 4.194 0 0 0-.324-.367c-.145-.672-.285-1.34-.469-2.086Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#cfe7d0", fillOpacity: 1 }} />
                    <path d="M37.895 35.703c.039.004.078.008.18.098.034.304.007.523-.095.742-.757-.164-1.378-.188-1.613.672-.949-.32-1.898-.64-2.922-.973a.61.61 0 0 1-.234-.133c-.125-.328-.2-.609-.211-1a9.293 9.293 0 0 1 1.941-.648c.387 1.043 1.633 1.555 2.954 1.242Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#abd2a9", fillOpacity: 1 }} />
                    <path d="M34.059 26.535c.691-.137.988.117 1.078.867.113.93.496 1.82.695 2.746.121.563.11 1.157.152 1.817-.054.082-.097.086-.21.09-.407-.508-.919-.97-1.06-1.528-.316-1.277-.452-2.597-.655-3.992Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#acd3af", fillOpacity: 1 }} />
                    <path d="M17.664 35.914a5.31 5.31 0 0 1 .07-.531c.137-.356.243-.61.371-.922.149.11.352.262.68.453.582.148 1.035.254 1.477.426-.016.16-.024.254-.102.36a3.022 3.022 0 0 0-.39.523c.234-.098.468-.196.773-.293.16-.004.254-.008.348.078.02.77-.684 1.699.586 1.996-.22.2-.399.344-.653.48-.445-.418-.816-.828-1.254-1.308a118 118 0 0 0-.715.234c-.078-.508-.136-.91-.19-1.277-.38-.086-.692-.153-1-.219Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#aed5b1", fillOpacity: 1 }} />
                    <path d="M28.66 13.625c.457.133.887.52 1.328.527 1.594.032 1.907.18 2.524 1.758-.2.512-.41.875-.707 1.246-.32.02-.551.028-.785-.058.199-.996.335-1.887-.598-2.477a3.272 3.272 0 0 1-.707.332c-.492-.883-.738.328-1.137.059.02-.438.04-.871.082-1.387Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c8dbc9", fillOpacity: 1 }} />
                    <path d="M18.96 30.324c0 .098 0 .192-.085.371-.148.098-.207.114-.266.133-.027-.617-.054-1.23 0-1.941.203-.309.387-.512.434-.739.18-.878.312-1.765.492-2.816.406.367.7.637.992.906.067.23.133.461.121.785-.992.602-1.011.922-.27 2.008-.956-.008-1.605.215-1.417 1.293Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#95cf9a", fillOpacity: 1 }} />
                    <path d="M18.758 20.895c-.293.37-.59.746-.965 1.19-.242.142-.402.208-.64.294-.942.32-1.805.625-2.747.918-.383.015-.683.047-1.168.094.364-.461.567-.72.852-.993 1.613-.511 3.14-1.007 4.668-1.503Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#47533d", fillOpacity: 1 }} />
                    <path d="M18.762 20.887c-1.532.504-3.059 1-4.742 1.492-.266-.133-.383-.262-.5-.39a587.49 587.49 0 0 1 5.578-1.962c.02.172-.043.348-.16.614-.102.132-.137.18-.157.238 0 0-.015 0-.02.008Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c25b57", fillOpacity: 1 }} />
                    <path d="M20.54 26.156c-.306-.187-.599-.457-1.005-.824-.18 1.05-.312 1.938-.492 2.816-.047.227-.23.43-.422.653.09-1.215.176-2.457.442-3.66.093-.438.609-.778 1.125-1.395.152.977.257 1.652.351 2.41Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#96bf9e", fillOpacity: 1 }} />
                    <path d="M30.957 27.98c-.875-.765-1.223-2.68-.578-3.925.406.89.758 1.668 1.016 2.53-.2.274-.352.45-.403.65-.058.238-.027.5-.035.745Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#8fc194", fillOpacity: 1 }} />
                    <path d="M37.871 35.652c-1.297.364-2.543-.148-2.93-1.265a1.262 1.262 0 0 1-.023-.434l.984.504c.043-.05.082-.102.125-.152-.132-.235-.265-.465-.398-.7.078-.058.156-.12.238-.18.504.63 1.012 1.263 1.598 1.876.183.09.285.195.406.351Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b1cfb5", fillOpacity: 1 }} />
                    <path d="M21.523 37.95c-1.316-.243-.613-1.173-.59-1.997.31-.254.57-.36.829-.387-.02.977.398 1.286 1.25 1.004l.086.336a.71.71 0 0 1-.133.414c-.535.262-.988.446-1.442.63Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#95cf9a", fillOpacity: 1 }} />
                    <path d="M30.813 18.809c1.59.421 3.171.906 4.746 1.496-.086.246-.164.386-.239.53-1.27-.425-2.535-.85-3.894-1.288a2.888 2.888 0 0 1-.613-.738Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#a4c6ad", fillOpacity: 1 }} />
                    <path d="M31.488 30.64c.004-.07.012-.144.008-.347a6.02 6.02 0 0 0-.46-.883s-.009-.082.054-.16c.562-.723 1.004-.105 1.469-.02 0 0-.012.008-.024.09-.008.317-.012.551-.012.875.028.364.016.653.09.918.192.7-.16.938-.828.918-.133-.508-.215-.949-.297-1.39Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#74be77", fillOpacity: 1 }} />
                    <path d="M28.547 15.098c.43.183.676-1.028 1.16-.051.031.91.035 1.672-.004 2.473-.312.054-.578.07-.844.085-.113-.808-.226-1.613-.312-2.507Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#92b88f", fillOpacity: 1 }} />
                    <path d="M34.91 33.96c-.004.095-.012.192-.023.368-.61.277-1.219.477-1.903.707-.148.012-.199-.039-.254-.222-.074-.278-.125-.446-.09-.618.395-.023.7-.043 1.176-.078-.156-.812-.296-1.55-.437-2.36 0-.167-.004-.26.023-.398a.433.433 0 0 1 .184-.172c.348.797.691 1.594 1.074 2.504a.925.925 0 0 0 .262.282s-.016-.008-.012-.012Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#9acba0", fillOpacity: 1 }} />
                    <path d="M19.047 30.324c-.274-1.078.375-1.3 1.328-1.293.086 0 .086 0 .121.043.152.016.274-.012.465-.043l.21-.02c.067.52.134 1.036.2 1.645-.516-1.273-1.465-.32-2.324-.332ZM32.55 29.152c-.456-.007-.898-.625-1.456.055-.102-.336-.14-.707-.157-1.152.028-.32-.003-.582.055-.82.051-.2.203-.376.387-.567.433.8.797 1.605 1.172 2.484ZM21.766 35.484c-.262.11-.524.215-.832.38-.137.058-.23.062-.442.03a.75.75 0 0 1-.265-.21c.011-.09.02-.184.101-.356.16-.219.25-.36.34-.496 0 0 .004.004.074-.008.168-.144.27-.281.367-.418.258-.199.516-.402.836-.636.2.421.336.875.414 1.433-.238.168-.418.223-.593.281Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#88c48e", fillOpacity: 1 }} />
                    <path d="M14.484 23.309c.864-.305 1.727-.61 2.704-.883.218.078.328.125.437.172-.02.113-.04.23-.102.382-1.097.38-2.156.72-3.27.989.04-.266.138-.461.231-.66Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#aed5b1", fillOpacity: 1 }} />
                    <path d="M21.172 28.926c-.047.09-.094.094-.281.105h-.43c-.824-1.086-.805-1.406.195-1.918.227.575.371 1.153.516 1.813Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7ab87d", fillOpacity: 1 }} />
                    <path d="M32.555 34.2c.05.167.101.335.144.57-.64-1.204-1.77-2.32-1.23-4.04.101.352.183.793.324 1.375.082.293.105.446.129.653.05.11.101.16.176.265.132.149.242.243.367.422.039.309.066.532.09.754Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#243d28", fillOpacity: 1 }} />
                    <path d="M21.762 35.566c.18-.14.36-.195.601-.28.254.362.442.75.637 1.214-.84.352-1.258.043-1.238-.934Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#74be77", fillOpacity: 1 }} />
                    <path d="M20.594 34.816c-.016.153-.106.293-.258.442-.516-.09-.969-.196-1.473-.34.078-.277.211-.516.41-.766.461.211.856.43 1.32.664Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#9acba0", fillOpacity: 1 }} />
                    <path d="M33.582 31.113c-.059.106-.113.145-.25.227-.336-.395-.57-.813-.809-1.23 0-.239.004-.473.012-.797.348.515.695 1.12 1.047 1.8Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#88c48e", fillOpacity: 1 }} />
                    <path d="M28.863 17.68c.262-.09.528-.106.903-.172.214.004.32.058.418.183l-.016.36s-.012.02-.008.027c-.43-.098-.86-.21-1.297-.398Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#29964f", fillOpacity: 1 }} />
                    <path d="M28.406 34.402c-.398.121-.855.172-1.39.235.246-.778.812-.418 1.39-.235Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#2b2c2a", fillOpacity: 1 }} />
                    <path d="M31.031 29.496c.157.164.305.414.45.742-.157-.164-.305-.41-.45-.742Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#243d28", fillOpacity: 1 }} />
                    <path d="M18.633 30.89c.035-.081.094-.097.242-.124.129.164.172.343.172.566-.156-.094-.274-.234-.414-.441Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#88c48e", fillOpacity: 1 }} />
                    <path d="M17.652 22.543c-.136.008-.246-.04-.39-.133.129-.117.289-.183.523-.246.012.117-.047.223-.133.379Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#78aa7a", fillOpacity: 1 }} />
                    <path d="M17.04 34.996a1.968 1.968 0 0 1-.47.2 1.552 1.552 0 0 1-.078-.137c.11-.079.219-.157.399-.246.113.03.136.082.148.183Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#aed5b1", fillOpacity: 1 }} />
                    <path d="M24.703 35.93c-.09.144-.258.285-.492.441.094-.137.254-.289.492-.441Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#2b2c2a", fillOpacity: 1 }} />
                    <path d="M23.914 14.988c-.144.024-.258-.02-.414-.11-.012-.112.031-.167.133-.23a.585.585 0 0 1 .281.34Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e2ecdf", fillOpacity: 1 }} />
                    <path d="M34.89 33.91c-.042.008-.117-.047-.245-.144.035-.004.125.035.246.144Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b1cfb5", fillOpacity: 1 }} />
                    <path d="M18.824 20.86c-.023-.04.012-.087.098-.15.023.04-.008.09-.098.15Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#47533d", fillOpacity: 1 }} />
                    <path d="M28.828 34.578c-.035.016-.105-.02-.215-.094.032-.015.106.016.215.094Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#2b2c2a", fillOpacity: 1 }} />
                    <path d="M44.414 21.059c.203-.223.406-.446.688-.657.808.809.843 1.817.257 2.535-1.394 1.7-2.062 3.684-2.77 5.844-.69 1.957-1.308 3.782-1.995 5.633-.153.133-.274.23-.317.356-.3.859-.629 1.66-.492 2.66.121.91-.207 1.879-.336 2.82-.168.27-.34.54-.586.813-.023-.223.032-.446.137-.79a5.045 5.045 0 0 0-.27-1.078c.063-.851 1-1.59.305-2.675.262-.786.582-1.415.828-2.075 1.29-3.449 2.555-6.906 3.907-10.379.425-.52.851-.996 1.101-1.546.254-.547.375-1.192-.457-1.461Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b8c4ae", fillOpacity: 1 }} />
                    <path d="M40.664 34.387a293.597 293.597 0 0 1 1.91-5.524c.082.137.121.332.13.524.046.82.136 1.644.1 2.46-.023.567-.218 1.126-.343 1.688-.086.383-.195.766-.27 1.153-.046.238.004.503-.074.73-.347.996-.726 1.98-1.203 2.96-.402-1.327-.852-2.644-.25-3.991Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e9f5e9", fillOpacity: 1 }} />
                    <path d="M40.594 34.414c-.532 1.32-.082 2.637.261 4.02.106.351.083.836.227.894.32.125.727.04 1.16.04-.14.394-.332.925-.535 1.503l-.863-.984c-.117.457-.207.82-.324 1.277-.383-.387-.649-.656-.993-.918.051-.937.38-1.906.258-2.816-.137-1 .192-1.801.492-2.66.043-.125.164-.223.317-.356Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c8dbc9", fillOpacity: 1 }} />
                    <path d="m27.125 46.48.898 1.254c.094.48.153.907.223 1.422-.41 1.551-1.324 2.446-2.879 2.555-.418.031-.847-.066-1.387-.191-1.492-.508-1.675-1.727-1.984-2.875-.004-.004 0 .011.067-.008.093-.098.12-.176.187-.32.176-.442.313-.817.508-1.231a39.31 39.31 0 0 1 1.781-1.191c.121.011.184-.02.316-.063.813.223 1.543.434 2.27.648Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#2d2e2d", fillOpacity: 1 }} />
                    <path d="M22.004 48.652c.3 1.141.484 2.36 1.887 2.856.023.176.02.281.015.469-.242.007-.484-.063-.797-.141-1.273-1.11-2.472-2.207-3.648-3.426.219-.137.523-.254.605-.164.563.613 1.254.473 1.938.406Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f3f9f3", fillOpacity: 1 }} />
                    <path d="M28.559 44.3c.148.028.207.071.277.173a.577.577 0 0 1-.055.414c-1.398.117-2.722.476-3.984-.305-.664-.41-1.45-.625-2.266-.926h-.918l.082-.355a11.527 11.527 0 0 0-1.058-.281c-.106.062-.149.117-.223.187-.055 0-.152.04-.207.04-.09.01-.121.023-.16-.052.058-.343.121-.605.2-.937.44-.363.866-.653 1.292-.946.106.25.145.618.332.723.942.52 1.934.953 2.879 1.461.3.16.523.457.832.406.965.133 1.926.266 2.977.399Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c9e3cd", fillOpacity: 1 }} />
                    <path d="M22.613 43.656c.735.301 1.52.516 2.184.926 1.262.781 2.586.422 3.984.375.102.23.16.477.137.715-.031.308-.125.61-.195.91-.254-.105-.496-.258-.762-.3-.242-.04-.508.038-.8.132a14.633 14.633 0 0 1-2.31-.66c-.55-.52-1.011-.95-1.472-1.379-.254-.238-.508-.48-.766-.719Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d2e9d5", fillOpacity: 1 }} />
                    <path d="M21.578 41.262c-.465.343-.89.633-1.41 1.008-.39.16-.688.246-1.008.25-.289-.172-.555-.274-.82-.438l-.016-.32c1.23-.688 2.457-1.38 3.77-2.086-.024.347-.121.715-.172 1.136.05.09.05.126.05.22-.12.093-.238.136-.394.23Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#9acba0", fillOpacity: 1 }} />
                    <path d="M38.64 39.184c.2.332.305.652.376 1.023-.543.297-1.047.547-1.618.813-.097-.063-.128-.141-.183-.286-.016-.363-.008-.664-.012-1.054.242-.871.86-.477 1.438-.496Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#446747", fillOpacity: 1 }} />
                    <path d="M18.316 41.688a.885.885 0 0 1-.046.43 9.784 9.784 0 0 1-1.543.722c-.165-.028-.262-.035-.38-.102a4.859 4.859 0 0 1-.19-.441.977.977 0 0 0-.485-.172 4.52 4.52 0 0 1-.555-.035c-.055-.156-.11-.313-.191-.567-.028-.097-.028-.195.023-.199.051-.004.156-.02.235-.023.226-.301.37-.598.515-.973.008-.242.016-.402.082-.531.164.105.278.172.39.293.013.09.017.125.071.219.133.53.223 1.004.348 1.699.656-.375 1.305-.746 1.953-1.113a7.796 7.796 0 0 0-.227.792Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#65b872", fillOpacity: 1 }} />
                    <path d="M18.613 40.875c-.718.387-1.367.758-2.023 1.133-.125-.696-.215-1.168-.281-1.723.125-.293.226-.5.402-.703.64.285 1.21.566 1.879.852.289.03.484.054.68.074-.2.117-.395.234-.657.367Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#93bc76", fillOpacity: 1 }} />
                    <path d="M21.477 38.004c.5-.238.953-.422 1.484-.613.133.054.184.12.297.21-.195.227-.453.426-.828.672-.16.106-.203.168-.242.23 0 0-.004-.01-.075-.01-.453.288-.836.581-1.218.874 0 0-.004-.012-.067-.015-.16.074-.262.152-.36.234 0 0-.007-.016-.081-.016-.551.149-1.02.293-1.461.364a45.302 45.302 0 0 1 1.976-1.438c.176-.148.356-.293.575-.492Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b96450", fillOpacity: 1 }} />
                    <path d="M18.895 40.008c.472-.145.94-.29 1.496-.43-.274.3-.633.598-1.055.91-.262 0-.457-.023-.719-.105.047-.164.164-.27.278-.375ZM20.973 39.367a6.995 6.995 0 0 1 1.144-.87 7.168 7.168 0 0 1-1.144.87ZM20.535 39.605c.031-.101.133-.18.297-.253-.031.097-.129.187-.297.253ZM22.246 38.492c-.02-.05.024-.113.117-.195.016.05-.023.117-.117.195Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bca98e", fillOpacity: 1 }} />
                    <path d="M38.055 36.543c.027-.219.054-.438.082-.734.078-.16.152-.239.285-.434.152-.543.254-.965.36-1.387 0 0-.012-.011.062-.043.39-1.008.707-1.988 1.093-3.004.235-.582.399-1.125.633-1.707.7-1.742 1.332-3.453 2-5.214-.015-.243-.066-.438-.11-.665.013-.03.02-.097.099-.101.285-.004.488-.008.699.07-1.344 3.805-2.707 7.524-4.035 11.254-.23.649-.317 1.344-.473 2.02-.05.058-.098.117-.254.183a1.41 1.41 0 0 1-.441-.238Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#be5752", fillOpacity: 1 }} />
                    <path d="M38.813 36.586c.093-.664.18-1.36.41-2.008 1.328-3.73 2.691-7.45 4.09-11.305.16.184.269.497.382.809-1.277 3.457-2.543 6.914-3.832 10.363-.246.66-.566 1.29-.863 2.008-.05.09-.09.106-.188.133Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#653930", fillOpacity: 1 }} />
                    <path d="M37.98 36.543c.184.082.297.164.473.277-.043.207-.18.375-.254.567-.594 1.527-.59 1.527-1.726.304a1.216 1.216 0 0 1-.098-.406c.227-.93.848-.906 1.605-.742Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#89be75", fillOpacity: 1 }} />
                    <path d="M23.012 39.098a.65.65 0 0 1 .07.093c-.016-.011-.035-.023-.074-.058-.02-.028 0-.028.004-.035Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#9acba0", fillOpacity: 1 }} />
                    <path d="M24.492 45.883c-.558.387-1.117.773-1.828 1.195-.453-.027-.816-.004-1.05-.164-1.25-.867-2.548-1.129-3.966-.457-.546-.535-1.09-1.066-1.605-1.684.344-.214.66-.343 1.043-.472.168-.012.262-.02.328.047-.293 1.27.352.84.95.593.054.004.156-.011.222-.004.105-.113.148-.234.262-.37.308-.087.543-.16.828-.235.047-.004.125-.059.187-.062.137.03.211.062.285.175.106.235.215.387.375.594.336-.137.622-.328.938-.473.906.762 2.309.235 3.031 1.317m-1.418-.356c-.015 0-.035 0 0 0Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e2efe3", fillOpacity: 1 }} />
                    <path d="M17.652 46.531c1.414-.746 2.711-.484 3.961.383.235.16.598.137.992.203-.043.383-.18.758-.406 1.235a2.403 2.403 0 0 0-.203.304s-.004-.015 0-.011c-.676.074-1.367.214-1.93-.399-.082-.09-.386.027-.644.102a16.629 16.629 0 0 1-1.77-1.817Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#edf6ed", fillOpacity: 1 }} />
                    <path d="M17.016 44.3a58.49 58.49 0 0 1-1.008.407 4.283 4.283 0 0 1-.899-.559c-.12-.363-.234-.66-.28-.968-.024-.18.066-.375.206-.512.27.441.395.848.606 1.207.347.582.761.723 1.21.055.09.144.13.258.165.37Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d3e5d7", fillOpacity: 1 }} />
                    <path d="M14.898 41.328s0 .098-.011.145c-.242.222-.48.402-.922.734-.496-.984-.977-1.934-1.469-2.953.106-.195.227-.316.465-.508 1.191-.625.605-1.379.43-2.156-.371-1.649-.621-3.32-.86-4.93.172.52.281.985.422 1.531a218.68 218.68 0 0 1 1.05 3.883c.153.89.302 1.692.454 2.574.133.454.266.832.395 1.266l.007.23c.016.102.028.145.04.184Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d2e9d5", fillOpacity: 1 }} />
                    <path d="M16.8 43.898c-.398.7-.812.559-1.16-.023-.21-.36-.335-.766-.538-1.223a1.65 1.65 0 0 1 0-.48c.183-.063.351-.047.601.012.211.086.336.129.461.171.055.11.106.22.184.438.172.148.312.187.488.277.016.309-.012.57-.035.828Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#add1ac", fillOpacity: 1 }} />
                    <path d="M26.191 4.8c.032-.07.094-.109.157-.148-.043.063-.082.121-.157.149Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f1f4ef", fillOpacity: 1 }} />
                    <path d="M12.469 31.61c.3 1.66.55 3.331.922 4.98.175.777.761 1.531-.391 2.105-.527-1.129-1.195-2.242-1.371-3.425-.207-1.387.02-2.833.2-4.25.3.058.46.117.628.246.008.16.012.25.012.343Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#dfefe0", fillOpacity: 1 }} />
                    <path d="M12.531 31.66c-.062-.144-.066-.234-.066-.476a12.606 12.606 0 0 0-.402-1.301c-.008-.09-.016-.18-.02-.41-.125-.328-.25-.516-.375-.703-.016-.211-.031-.426-.047-.797-.07-.399-.14-.637-.207-.88-.012-.218-.023-.433-.027-.82.14-.48.27-.793.445-1.062.102.09.164.14.246.273.016.352.012.625.004.965.059.188.113.309.188.469a.71.71 0 0 1 .02.227c.269 1.117.55 2.144.87 3.242.246.863.453 1.652.606 2.508a4.908 4.908 0 0 1-.844.218 15.99 15.99 0 0 0-.39-1.453Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#cebea6", fillOpacity: 1 }} />
                    <path d="M11.79 25.168c-.134.312-.263.625-.407 1.027-.211-.242-.414-.566-.645-.965-.238-1.132-.511-2.187-.62-3.261-.048-.457.245-.946.487-1.434.133.45.165.906.176 1.45-.539 1.081.067 1.632.836 2.144.04.012.113-.027.121.055.04.296.075.515.094.793-.027.105-.035.148-.043.191Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bbd6b5", fillOpacity: 1 }} />
                    <path d="M12.008 29.945c.191.32.324.703.449 1.168-.168.024-.328-.035-.547-.117a3.385 3.385 0 0 1 .098-1.05ZM11.363 27.145c.117.19.188.43.246.75-.105-.18-.199-.438-.246-.75ZM11.656 28.848c.137.109.262.297.38.558-.134-.113-.263-.297-.38-.558Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d2e9d5", fillOpacity: 1 }} />
                    <path d="M9.68 25.309c-.121-.032-.258-.133-.403-.297.121.031.254.133.403.297Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#edf6ed", fillOpacity: 1 }} />
                    <path d="M10.797 21.902c-.027-.46-.059-.918-.152-1.433a.228.228 0 0 1-.075-.196c.164-.054.32-.066.551-.09.145.032.211.075.203.212-.062.277-.043.46-.023.64l.75-.398c.039 0 .078-.004.187.082.27.254.469.418.664.586a.59.59 0 0 1-.054.34c-.243.14-.407.214-.653.277-.515-.012-.957-.016-1.398-.02Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#446747", fillOpacity: 1 }} />
                    <path d="M31.023 17.188c.23-.004.461-.012.844.015.598.172 1.043.313 1.488.453 0 0 .012.008.067.059.957.37 1.855.691 2.758 1.008 1.726.644 3.457 1.289 5.265 2.03-.226.11-.562.212-.832.122-1.25-.422-2.476-.93-3.73-1.348-.938-.312-1.906-.53-2.86-.793-.804-.285-1.605-.574-2.55-.855-.18.012-.22.016-.258.02 0 0-.082-.04-.133-.137a2.46 2.46 0 0 1-.059-.575Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c95d5d", fillOpacity: 1 }} />
                    <path d="M34.055 18.805c.922.191 1.89.41 2.828.722 1.254.418 2.48.926 3.73 1.348.27.09.606-.012.907-.102.12-.09.238-.101.449-.113.125.012.16.02.234.106.09.304.14.539.156.824a2.63 2.63 0 0 1-.578.164 447.954 447.954 0 0 1-7.726-2.95Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#e2bab1", fillOpacity: 1 }} />
                    <path d="M36.2 18.664a28.071 28.071 0 0 1-2.77-.953c1.722-.563 2.043-.457 2.77.953ZM33.363 17.57c-.453-.054-.898-.195-1.41-.379.149-.406.36-.77.582-1.207.285.45.563.973.828 1.586Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#ecefe5", fillOpacity: 1 }} />
                    <path d="M33.719 15.547c.047.101.031.191.02.281-.098-.015-.192-.031-.286-.047a.838.838 0 0 1 .266-.234Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f7f7f", fillOpacity: 1 }} />
                    <path d="M43.238 20.129c.149.047.297.094.5.281.051.246.043.352-.015.504-.18.106-.301.176-.496.227-.168-.016-.266-.016-.426-.047-.133-.098-.203-.164-.23-.266a.56.56 0 0 0 .093-.133c.23-.058.465-.117.652-.3a1.652 1.652 0 0 1-.078-.266Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#355f3c", fillOpacity: 1 }} />
                    <path d="M42.527 20.863c.07.067.141.133.27.293a.864.864 0 0 1 .062.344c-.004 0-.007.004-.082.004-.18.012-.277.02-.379.031a7.43 7.43 0 0 1-.144-.754c.016-.062.105-.09.156-.062.063.074.086.113.117.144Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bca98e", fillOpacity: 1 }} />
                    <path d="M43.777 20.871c.004-.11.012-.215.016-.406 0-.078.055-.078.078-.063.082.176.137.34.149.559-.114.004-.176-.043-.243-.09Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f7f7f", fillOpacity: 1 }} />
                    <path d="M43.18 20.152c.066.024.078.07.097.192-.047-.008-.101-.086-.097-.192Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#615945", fillOpacity: 1 }} />
                    <path d="M42.57 20.828c-.074.004-.097-.035-.113-.113.031-.04.066-.047.156-.035.035.047.016.082-.043.148Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f7f7f", fillOpacity: 1 }} />
                    <path d="M43.723 20.914c.12.004.183.05.28.117.095.028.157.04.313.04.93.257.809.902.555 1.449-.25.55-.676 1.027-1.101 1.546-.188-.296-.297-.609-.465-.87-.258.05-.461.054-.774.007-.113-.23-.113-.41-.117-.59 0 0-.016-.027.063 0 .28.059.488.094.859.157-.215-.395-.34-.625-.469-.922a43.59 43.59 0 0 1-.015-.344s.003-.004.066-.012c.172-.117.277-.226.383-.336.12-.066.242-.136.422-.242Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#8dc185", fillOpacity: 1 }} />
                    <path d="M12.922 21.215c-.215-.078-.414-.242-.625-.485.133-.28.277-.492.492-.695.098.363.125.727.133 1.18Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#78aa7a", fillOpacity: 1 }} />
                    <path d="M11.984 20.61c-.183.16-.433.292-.683.425-.02-.18-.04-.363.015-.578.254.02.43.07.668.152Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c8dbc9", fillOpacity: 1 }} />
                    <path d="M40.5 29.273c-.164.543-.328 1.086-.621 1.61-.527-.914-.926-1.813-1.324-2.711 0-.094 0-.192.054-.418.016-.664-.02-1.2-.058-1.734.101-.293.187-.594.304-.883.407-1.028-.277-1.918-1.39-1.89-.356.007-.918-.157-1.031-.403-.145-.324.058-.809.234-1.29.527.04.941.118 1.34.25.758.247 1.508.52 2.273.833.008.047.02.144-.043.18-.039.453-.015.87.004 1.206-.11.602-.332 1.168-.281 1.707.105 1.188.352 2.364.539 3.543Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#dfefe0", fillOpacity: 1 }} />
                    <path d="M40.27 22.59c-.754-.266-1.504-.54-2.262-.785-.399-.133-.813-.211-1.309-.317-.484-.183-.883-.36-1.332-.597.028-.2.106-.34.25-.536a48.796 48.796 0 0 1 4.957 1.883c-.129.192-.215.27-.304.352Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bbd0be", fillOpacity: 1 }} />
                    <path d="M38.555 28.258c.398.812.797 1.71 1.254 2.668a26.378 26.378 0 0 1-.961 3.027c-.082-.914-.094-1.863-.094-2.898-.055-.961-.129-1.836-.2-2.797ZM38.477 26.043c.113.512.148 1.047.132 1.64-.492-.464-.761-1.003-.132-1.64Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#dee9d7", fillOpacity: 1 }} />
                    <path d="M15.05 33.023c-.05.055-.066.122-.023.329.305 1.128.586 2.117.856 3.187-.012.23-.016.387-.094.512-.367-.5-.66-.969-.992-1.469a1.098 1.098 0 0 1-.184-.39c-.207-.837-.418-1.587-.62-2.43-.095-.934-.122-1.79-.302-2.61-.425-1.937-.925-3.859-1.34-5.808.188.02.32.062.454.105.543 2.258 1.086 4.512 1.644 6.93.211.656.406 1.152.602 1.644Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b4514a", fillOpacity: 1 }} />
                    <path d="M12.89 24.457c-.218-.05-.35-.094-.605-.16-.265-.082-.41-.14-.555-.195 0 0-.074.039-.097-.043 0-.184-.004-.352.055-.38 1.23-.546 1.238-.554.585-1.75.168-.07.332-.144.575-.214.23.078.39.156.609.254.18.148.297.277.48.426-.132.277-.335.535-.699.996.485-.047.785-.078 1.168-.094-.015.21-.113.406-.234.66a8.086 8.086 0 0 1-1.281.5Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#78aa7a", fillOpacity: 1 }} />
                    <path d="M15.059 32.926c-.204-.395-.399-.89-.598-1.461.086-.07.18-.067.344-.055.133.48.195.95.254 1.516Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d7c8af", fillOpacity: 1 }} />
                    <path d="M15.863 37.082c.004-.156.008-.312.032-.64.027-.364.035-.555.043-.747.574-.066.925 1.008 1.675.27.36.015.672.082 1.051.168.055.367.113.77.191 1.277a118 118 0 0 1 .715-.234c.438.48.809.89 1.254 1.308-.57.465-1.222.922-1.898 1.45-.145.18-.262.285-.406.441-.598-.227-1.168-.508-1.836-.863-.149-.32-.2-.563-.176-.82 1.242-.434 1.36-.86.61-2.118-.34.219-.684.434-1.075.637-.05-.012-.152-.043-.152-.066-.004-.024-.028-.063-.028-.063Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c2ddbe", fillOpacity: 1 }} />
                    <path d="M15.922 35.61c.008.277 0 .468-.016.753a50.812 50.812 0 0 1-.855-2.96c.222.265.5.6.652.984.14.351.145.758.219 1.222Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d7c8af", fillOpacity: 1 }} />
                    <path d="M21.043 34.418c-.031.125-.133.262-.3.402.03-.125.132-.258.3-.402Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#9acba0", fillOpacity: 1 }} />
                    <path d="M31.02 17.098c.003.25.007.406.02.644-.028.082-.067.082-.216.04-.285-.083-.457-.122-.633-.165-.105-.05-.21-.105-.382-.148-.067-.75-.07-1.512-.067-2.367.235-.227.465-.356.68-.48.933.589.797 1.48.598 2.476Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#8dc185", fillOpacity: 1 }} />
                    <path d="M40.281 22.637c.078-.13.164-.207.332-.325.598.07 1.114.176 1.715.29.09.191.09.37.125.605.027.05.02.117-.035.195-.535-.078-1.016-.234-1.563-.406-.226-.078-.39-.148-.554-.215 0 0-.012-.097-.02-.144Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b1cfb5", fillOpacity: 1 }} />
                    <path d="M42.867 21.914c.13.23.254.461.469.856a9.022 9.022 0 0 1-.848-.168 1.276 1.276 0 0 1-.144-.625c.203-.051.363-.059.523-.063Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#65b872", fillOpacity: 1 }} />
                    <path d="M30.184 17.691c.183-.03.355.008.582.094-.13.14-.305.235-.54.297-.054-.129-.05-.223-.042-.39Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#446747", fillOpacity: 1 }} />
                    <path d="M42.867 21.848c-.16.07-.32.078-.558.082a1.702 1.702 0 0 1-.485-.137c.137-.074.317-.11.535-.203.141-.067.239-.074.418-.086.078.094.082.183.09.344Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7ab87d", fillOpacity: 1 }} />
                    <path d="M31.242 17.922c.012-.027.051-.031.153-.031-.004.023-.067.039-.153.03Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#446747", fillOpacity: 1 }} />
                    <path d="M38.7 34.008c-.024.402-.126.824-.286 1.312.027-.39.113-.84.285-1.312Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#dee9d7", fillOpacity: 1 }} />
                    <path d="M20.16 35.7c.117.046.168.105.266.198-.188.13-.422.227-.656.325.105-.168.214-.34.39-.524Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#95cf9a", fillOpacity: 1 }} />
                    <path d="M32.523 30.195c.239.332.473.75.782 1.188.07.113.074.207.023.426-.328.601-.601 1.078-.875 1.554-.113-.097-.223-.191-.367-.39-.063-.172-.106-.23-.164-.274-.024-.148-.047-.3-.078-.523.61-.125.96-.364.77-1.063-.075-.265-.063-.554-.09-.918Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7fbf89", fillOpacity: 1 }} />
                    <path d="M32.465 33.445c.262-.558.535-1.035.863-1.562.192.683.332 1.422.488 2.234-.476.035-.78.055-1.175.078-.11-.218-.137-.441-.176-.75Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#88c48e", fillOpacity: 1 }} />
                    <path d="M20.496 29.074c.063-.043.156-.043.324-.039a.629.629 0 0 1-.324.04Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#95cf9a", fillOpacity: 1 }} />
                    <path d="M31.922 32.758c.058-.016.101.043.14.16-.039 0-.09-.05-.14-.16Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#88c48e", fillOpacity: 1 }} />
                    <path d="M24.54 45.895c-.77-1.094-2.173-.567-3.173-1.329-.37-.054-.617-.058-.875-.144-.004-.309.012-.531.098-.762.207-.129.344-.25.48-.375l-.386-.293c.336.106.675.207 1.011.309l-.082.355h.918c.34.239.594.48.848.719.46.43.922.86 1.387 1.367-.043.133-.106.164-.227.153Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d3e5d7", fillOpacity: 1 }} />
                    <path d="M22.063 48.637c-.028-.051.011-.117.101-.223.02.047-.008.125-.102.223Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#f3f9f3", fillOpacity: 1 }} />
                    <path d="M19.18 42.598c.3-.082.597-.168.972-.258.016.25-.047.512-.12.95-.02.233-.024.296-.083.308-.125-.114-.195-.176-.308-.282-.114-.05-.188-.062-.328-.09-.204-.038-.34-.058-.442-.163.047-.145.059-.208.106-.31a.575.575 0 0 1 .203-.155Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c0e1c6", fillOpacity: 1 }} />
                    <path d="M20.637 43.02c.175.07.304.167.433.265-.136.125-.273.246-.496.3a.821.821 0 0 1-.11-.378c.024-.07.067-.125.173-.187Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#bbd0be", fillOpacity: 1 }} />
                    <path d="M20.414 43.207c.059.102.066.203.09.379 0 .305-.016.527-.027.914 0 .27-.004.379-.004.484-.11-.152-.22-.304-.285-.625.05-.48.062-.797.074-1.113 0 0 .097-.039.152-.039Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#292b29", fillOpacity: 1 }} />
                    <path d="M20.207 43.246c.043.316.031.633-.02 1.031-.113.055-.187.024-.32-.066.004-.223.067-.395.133-.566.008-.06.012-.122.035-.274.05-.101.082-.113.172-.125Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7f7f7f", fillOpacity: 1 }} />
                    <path d="M19.16 42.52c-.043.105-.101.144-.242.28-.14.169-.191.255-.277.384-.078.191-.121.332-.215.523-.274.156-.5.266-.762.344-.102.05-.16.136-.223.222-.093.008-.187.016-.355.028-.106-.114-.145-.227-.234-.371-.028-.29 0-.551-.016-.903-.035-.09-.04-.175-.04-.175.47-.211.934-.426 1.47-.672.34.066.605.168.894.34Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#88c48e", fillOpacity: 1 }} />
                    <path d="M14.453 39.57c-.148-.804-.297-1.605-.375-2.472.184.28.246.656.422.972.156.285.328.934.844.25.101.27.148.496.187.797.047.203.098.332.164.508.016.043.028.137.028.137a1.812 1.812 0 0 1-.102.574c-.238.082-.394.082-.582.016a17.644 17.644 0 0 0-.586-.782Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b2c7a4", fillOpacity: 1 }} />
                    <path d="M15.781 39.797c-.058-.035-.07-.129-.078-.242-.055-.25-.11-.38-.164-.512a7.531 7.531 0 0 0-.2-.793 1.508 1.508 0 0 1-.093-.469c-.117-.484-.242-.886-.363-1.351-.02-.137-.047-.211-.07-.375.011-.203.015-.32.023-.438.293.465.586.934.953 1.434.074.031.098.07.094.11 0 .034.015.058-.04.112.044.52.141.985.255 1.543.03.47.05.844.07 1.22-.11-.067-.223-.134-.387-.24Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#653930", fillOpacity: 1 }} />
                    <path d="M16.172 40.09a9.88 9.88 0 0 1-.012-1.278c.09-.093.133-.093.195-.101.028-.008.079-.004.079-.004.05.242.101.484.18.797-.079.281-.18.488-.352.723-.075-.012-.078-.047-.09-.137Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#be5752", fillOpacity: 1 }} />
                    <path d="M15.066 40.414c.16.004.317.004.555 0-.066.29-.21.586-.473.84a1.606 1.606 0 0 1-.293-.176c0-.035 0-.07.047-.203a3.64 3.64 0 0 0 .164-.46ZM16.156 42.297c-.117.016-.242-.027-.398-.133.105-.016.25.027.398.133ZM16.727 42.84c.07.012.074.097.074.14a.765.765 0 0 1-.426-.132c.09-.043.188-.035.352-.008Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#8ec78a", fillOpacity: 1 }} />
                    <path d="M14.86 41.145c.058-.02.117.023.21.117.035.043-.07.058-.12.062-.063-.035-.075-.078-.09-.18Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#add1ac", fillOpacity: 1 }} />
                    <path d="M40.238 22.816c.227.032.39.102.621.262.32.895.938 1.05 1.672.992a186.144 186.144 0 0 1-1.96 5.164c-.258-1.14-.505-2.316-.61-3.504-.05-.539.172-1.105.281-1.707a8.203 8.203 0 0 1-.004-1.207Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#ecefe5", fillOpacity: 1 }} />
                    <path d="M42.57 24.02c-.773.109-1.39-.047-1.644-.93.476.078.957.234 1.48.344.098.148.149.343.164.586Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#cfe7d0", fillOpacity: 1 }} />
                    <path d="M18.477 43.66c.043-.144.085-.285.203-.46.074-.028.156-.052.156-.052.137.02.273.04.477.122.066.062.07.152-.012.156-.223.27-.367.535-.52.89-.008.149-.008.207-.008.266-.039.121-.082.242-.18.266-.081-.461-.097-.825-.116-1.188Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#243d28", fillOpacity: 1 }} />
                    <path d="M18.426 43.707c.07.316.086.68.101 1.133-.007.09-.109.105-.21.047a7.59 7.59 0 0 1-.618-.805c.227-.11.453-.219.727-.375Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#92b88f", fillOpacity: 1 }} />
                    <path d="M17.664 44.05c.207.282.379.528.598.829-.496.309-1.14.738-.848-.531.09-.16.148-.246.25-.297Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d3e5d7", fillOpacity: 1 }} />
                    <path d="M20.523 45.04c-.05-.161-.046-.27-.03-.454.257-.078.503-.074.843-.07a2.454 2.454 0 0 1-.813.523Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b8c4ae", fillOpacity: 1 }} />
                    <path d="M19.95 43.598c-.016.218-.079.39-.145.617-.004.058-.082.113-.133.11-.055-.005-.063-.013-.09-.095a2.92 2.92 0 0 1-.012-.757c.035-.04.11-.114.11-.114.074.063.144.125.27.239ZM18.848 44.566c-.075-.043-.075-.101.015-.242.309-.058.528-.035.746-.011 0 0 .008.007.012.015-.23.078-.465.152-.773.238Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#47533d", fillOpacity: 1 }} />
                    <path d="M15.242 37.863c.016.09.028.18.047.34-.46.8-.633.152-.789-.133-.176-.316-.238-.691-.426-1.058-.414-1.262-.754-2.504-1.12-3.82.233-.13.495-.18.855-.294.093-.054.175-.046.175-.046.211.753.422 1.503.586 2.394.047.39.145.645.239.899.027.074.054.148.07.378.113.547.238.942.363 1.34Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#c6c5a6", fillOpacity: 1 }} />
                    <path d="M15.04 40.352a.936.936 0 0 1-.138.468c-.18-.34-.312-.718-.445-1.172.184.16.367.399.582.704Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#add1ac", fillOpacity: 1 }} />
                    <path d="M13.992 32.762c-.008.09-.09.082-.133.074a41.916 41.916 0 0 1-.683-2.535 227.186 227.186 0 0 0-.883-3.25s-.008-.09-.012-.207a1.99 1.99 0 0 0-.199-.461c.008-.274.012-.547 0-.973a1.97 1.97 0 0 0-.234-.496c-.036-.215-.07-.434-.11-.73.137-.028.282.03.492.136.536 1.973 1.036 3.895 1.461 5.832.18.82.207 1.676.301 2.61Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#615945", fillOpacity: 1 }} />
                    <path d="M12.29 27.145c.288.933.573 1.964.843 3.082a48.526 48.526 0 0 1-.844-3.082Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d7c8af", fillOpacity: 1 }} />
                    <path d="M11.832 24.977c.09.054.16.168.23.355-.066.02-.128-.031-.23-.121-.035-.086-.027-.129 0-.234Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#8ec78a", fillOpacity: 1 }} />
                    <path d="M12.082 26.45c.066.05.129.163.184.35-.07-.042-.125-.163-.184-.35Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#d7c8af", fillOpacity: 1 }} />
                    <path d="M12.195 21.922c.73 1.203.723 1.21-.508 1.758-.058.027-.054.195-.093.367-.746-.43-1.352-.98-.813-2.063.457-.078.899-.074 1.414-.062Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#8ec78a", fillOpacity: 1 }} />
                    <path d="M43.227 21.14c-.032.126-.137.235-.305.348-.063-.074-.063-.156-.063-.297.102-.066.2-.066.368-.05Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#7ab87d", fillOpacity: 1 }} />
                    <path d="M14.813 36.055a2.148 2.148 0 0 1-.247-.727c.094.04.145.129.23.254.032.152.028.27.017.473Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b2c7a4", fillOpacity: 1 }} />
                    <path d="M16.094 37.227c.34-.22.683-.434 1.023-.653.75 1.258.633 1.684-.61 2.117-.073.016-.124.012-.144-.05-.086-.235-.152-.403-.21-.66-.016-.31-.04-.532-.06-.754Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#cfe7d0", fillOpacity: 1 }} />
                    <path d="M16.043 37.21c.07.24.094.462.059.716-.106-.215-.157-.461-.204-.707 0 0-.015-.024-.011-.035.004-.016.105.015.156.027Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#be5752", fillOpacity: 1 }} />
                    <path d="M19.383 43.422s-.004-.09-.004-.133c.074-.035.148-.023.262.027.039.043-.036.118-.114.141-.078.023-.144-.035-.144-.035Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#47533d", fillOpacity: 1 }} />
                    <path d="M18.871 43.063c-.035.085-.117.109-.156.093.012-.101.062-.187.172-.316.043.015.031.078-.016.222Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#9acba0", fillOpacity: 1 }} />
                    <path d="M15.531 39.117c.063.059.117.188.16.39-.062-.058-.113-.187-.16-.39Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#8ec78a", fillOpacity: 1 }} />
                    <path d="M15.844 37.273c.101.192.152.438.25.739.117.226.183.394.242.636-.043.07-.086.07-.191.07a5.757 5.757 0 0 1-.301-1.445Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b4514a", fillOpacity: 1 }} />
                    <path d="M15.246 37.781a8.406 8.406 0 0 1-.371-1.199c.129.313.254.715.371 1.2Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#b2c7a4", fillOpacity: 1 }} />
                    <path d="M19.3 43.426c.083-.004.15.054.188.07.051.227.059.441.094.734-.191.06-.41.036-.71.004.062-.273.206-.539.429-.808Zm0 0" style={{ stroke: "none", fillRule: "nonzero", fill: "#a4c6ad", fillOpacity: 1 }} />
                  </g>

                  {/* 8. Display Field Rows (Coach, License, Club) */}
                  <g transform="translate(15, -45)">
                    {/* Row 1: Coach */}
                    <g transform="translate(0, 0)">
                      {/* Icon Envelope */}
                      <circle cx="220" cy="365" r="28" fill="#010c1e" stroke="url(#gold-grad-static)" strokeWidth="2.5" />
                      <circle cx="220" cy="365" r="24" fill="none" stroke="url(#gold-bright-static)" strokeWidth="0.5" opacity="0.4" />
                      {/* User profiles icon silhouettes */}
                      <circle cx="220" cy="358" r="7" fill="url(#gold-bright-static)" />
                      <path d="M 205,376 Q 205,367 220,367 Q 235,367 235,376" fill="url(#gold-bright-static)" stroke="url(#gold-dark-static)" strokeWidth="0.5" />

                      {/* Labels and bold value */}
                      <text x="265" y="354" fontSize="14" fontWeight="800" className="badge-heading gold-text" letterSpacing="1.5" opacity="0.95">HEAD COACH NAME</text>
                      <text x="265" y="382" fontSize="28" fontWeight="900" className="badge-content white-text" letterSpacing="0.5">{playerData.coachName || "N/A"}</text>

                      {/* Dividing Tapered Line */}
                      <line x1="210" y1="408" x2="590" y2="408" stroke="url(#gold-divider-static)" strokeWidth="1.5" />
                    </g>

                    {/* Row 2: License */}
                    <g transform="translate(0, 88)">
                      {/* Icon Envelope */}
                      <circle cx="220" cy="365" r="28" fill="#010c1e" stroke="url(#gold-grad-static)" strokeWidth="2.5" />
                      <circle cx="220" cy="365" r="24" fill="none" stroke="url(#gold-bright-static)" strokeWidth="0.5" opacity="0.4" />
                      {/* ID Card Profile Outline with Gold elements */}
                      <rect x="204" y="352" width="32" height="24" rx="3.5" fill="none" stroke="url(#gold-bright-static)" strokeWidth="2" />
                      <rect x="209" y="358" width="8" height="11" rx="1" fill="none" stroke="url(#gold-bright-static)" strokeWidth="1.2" />
                      <circle cx="213" cy="361" r="2" fill="url(#gold-bright-static)" />
                      <path d="M 210,367 Q 210,365 213,365 Q 216,365 216,367" fill="none" stroke="url(#gold-bright-static)" strokeWidth="1.2" />
                      <line x1="222" y1="358" x2="231" y2="358" stroke="url(#gold-bright-static)" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="222" y1="364" x2="231" y2="364" stroke="url(#gold-bright-static)" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="222" y1="370" x2="228" y2="370" stroke="url(#gold-bright-static)" strokeWidth="1.8" strokeLinecap="round" />

                      {/* Labels and bold value */}
                      <text x="265" y="354" fontSize="14" fontWeight="800" className="badge-heading gold-text" letterSpacing="1.5" opacity="0.95">LICENSE NUMBER</text>
                      <text x="265" y="382" fontSize="28" fontWeight="900" className="badge-content white-text" letterSpacing="0.5">{playerData.coachLicenseNumber || "CBF-2026-4587"}</text>

                      {/* Dividing Tapered Line */}
                      <line x1="210" y1="408" x2="590" y2="408" stroke="url(#gold-divider-static)" strokeWidth="1.5" />
                    </g>

                    {/* Row 3: Club Managed */}
                    <g transform="translate(0, 176)">
                      {/* Icon Envelope */}
                      <circle cx="220" cy="365" r="28" fill="#010c1e" stroke="url(#gold-grad-static)" strokeWidth="2.5" />
                      <circle cx="220" cy="365" r="24" fill="none" stroke="url(#gold-bright-static)" strokeWidth="0.5" opacity="0.4" />
                      {/* Football Shield Logo Outline */}
                      <path d="M 207,352 Q 220,348 233,352 L 233,366 Q 233,378 220,383 Q 207,378 207,366 Z" fill="none" stroke="url(#gold-bright-static)" strokeWidth="2.2" strokeLinejoin="round" />
                      <circle cx="220" cy="366" r="6" fill="none" stroke="url(#gold-bright-static)" strokeWidth="1.5" />
                      <line x1="220" y1="360" x2="220" y2="372" stroke="url(#gold-bright-static)" strokeWidth="1" />
                      <line x1="214" y1="366" x2="226" y2="366" stroke="url(#gold-bright-static)" strokeWidth="1" />

                      {/* Labels and bold value */}
                      <text x="265" y="354" fontSize="14" fontWeight="800" className="badge-heading gold-text" letterSpacing="1.5" opacity="0.95">CLUB MANAGED</text>
                      <text x="265" y="382" fontSize="28" fontWeight="900" className="badge-content white-text" letterSpacing="0.5">{playerData.clubManaged || "Atlético Nacional"}</text>
                    </g>
                  </g>

                  {/* 9. 3D Ribbon / Banner Overlay */}
                  <g filter="url(#drop-shadow-static)">
                    {/* Left ribbon shadow folded corner under center */}
                    <polygon points="175,615 175,655 150,635" fill="url(#gold-dark-static)" />
                    {/* Right ribbon shadow folded corner under center */}
                    <polygon points="625,615 625,655 650,635" fill="url(#gold-dark-static)" />

                    {/* Left side wing of ribbon (behind center, folded) */}
                    <path d="M 175,615 L 80,635 L 110,665 L 85,695 L 175,655 Z" fill="url(#ribbon-grad-static)" stroke="url(#gold-grad-static)" strokeWidth="2" />
                    {/* Right side wing of ribbon (behind center, folded) */}
                    <path d="M 625,615 L 720,635 L 690,665 L 715,695 L 625,655 Z" fill="url(#ribbon-grad-static)" stroke="url(#gold-grad-static)" strokeWidth="2" />

                    {/* Center plate of ribbon with gold boundaries */}
                    <path d="M 148,595 Q 400,565 652,595 L 642,675 Q 400,645 158,675 Z" fill="url(#ribbon-grad-static)" stroke="url(#gold-grad-static)" strokeWidth="3" />

                    {/* Text paths on ribbon curves */}
                    <path id="ribbon-text-path-static" d="M 160,635 Q 400,605 640,635" fill="none" />
                    <path id="ribbon-subtext-path-static" d="M 175,662 Q 400,632 625,662" fill="none" />

                    {/* Player CV Title text */}
                    <text fontSize="42" fontWeight="900" className="badge-content">
                      <textPath href="#ribbon-text-path-static" startOffset="50%" textAnchor="middle" fill="#FFFFFF">
                        Player CV
                      </textPath>
                    </text>

                    {/* Sub text: VERIFIED BY FOOTBALL COACH */}
                    <text fontSize="18" fontWeight="800" className="badge-heading" letterSpacing="3.5">
                      <textPath href="#ribbon-subtext-path-static" startOffset="50%" textAnchor="middle" fill="url(#gold-bright-static)">
                        VERIFIED BY FOOTBALL COACH
                      </textPath>
                    </text>
                  </g>

                  {/* 10. Center-Bottom Checkmark Coin Emblem with olive branches flanking */}

                  {/* Left Laurel Olive wreath half */}
                  <use href="#wreath-half-static" transform="translate(400, 712) scale(0.60)" />
                  {/* Right Laurel Olive wreath half (Perfect Symmetrical Mirror) */}
                  <use href="#wreath-half-static" transform="translate(400, 712) scale(-0.60, 0.60)" />

                  {/* The Medal Checkmark Coin */}
                  <g filter="url(#drop-shadow-static)">
                    {/* Outer gold ring */}
                    <circle cx="400" cy="712" r="30" fill="url(#bg-radial-static)" stroke="url(#gold-grad-static)" strokeWidth="4.5" />
                    <circle cx="400" cy="712" r="24" fill="url(#bg-radial-static)" stroke="url(#gold-bright-static)" strokeWidth="1.2" opacity="0.6" />

                    {/* Bold Metallic Checkmark */}
                    <path d="M 386,713 L 396,723 L 416,700" fill="none" stroke="url(#gold-bright-static)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>

                  {/* 11. Redundant bottom stars */}
                  <path d="M 400,728 L 400.00,728.00 L 402.65,734.36 L 409.51,734.91 L 404.28,739.39 L 405.88,746.09 L 400.00,742.50 L 394.12,746.09 L 395.72,739.39 L 390.49,734.91 L 397.35,734.36 Z" fill="url(#gold-bright-static)" />
                  <path d="M 478.9,720.66 L 478.90,720.66 L 480.96,725.83 L 486.51,726.19 L 482.23,729.74 L 483.60,735.13 L 478.90,732.16 L 474.20,735.13 L 475.57,729.74 L 471.29,726.19 L 476.84,725.83 Z" fill="url(#gold-bright-static)" />
                  <path d="M 321.1,720.66 L 321.10,720.66 L 323.16,725.83 L 328.71,726.19 L 324.43,729.74 L 325.80,735.13 L 321.10,732.16 L 316.40,735.13 L 317.77,729.74 L 313.49,726.19 L 319.04,725.83 Z" fill="url(#gold-bright-static)" />
                  <path d="M 553.45,694.16 L 553.45,694.16 L 555.21,698.73 L 560.11,699.00 L 556.30,702.09 L 557.56,706.82 L 553.45,704.16 L 549.34,706.82 L 550.60,702.09 L 546.79,699.00 L 551.69,698.73 Z" fill="url(#gold-bright-static)" />
                  <path d="M 246.55,694.16 L 246.55,694.16 L 248.31,698.73 L 253.21,699.00 L 249.40,702.09 L 250.66,706.82 L 246.55,704.16 L 242.44,706.82 L 243.70,702.09 L 239.89,699.00 L 244.79,698.73 Z" fill="url(#gold-bright-static)" />

                  {/* 12. Stamp year (2026) */}
                  <text x="400" y="768" fontSize="19" fontWeight="800" className="badge-heading gold-text" textAnchor="middle" letterSpacing="4.5">2026</text>
                </svg>

                {/* Not Verified Overlay */}
                {playerData.validationStatus !== "verified" && (
                  <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-3 z-20 backdrop-blur-xs rounded-xl">
                    <div className="text-[#E31B23] font-black uppercase text-[10px] tracking-widest mb-1.5 flex items-center gap-1">
                      <span>⚠️</span> Pending Validation
                    </div>
                    <p className="text-[8px] text-gray-400 max-w-[180px] text-center">
                      A coach must validate your CV details from the academy dashboard to unlock your certificate.
                    </p>
                  </div>
                )}
              </div>
            </div>


            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Strength
              </h2>
              <div className="space-y-2 text-sm">
                {Object.entries(playerData.strengths).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[80px_1fr_auto] items-center gap-2 p-2 bg-[#1a1a1a]/50 border border-border/50 rounded-lg group hover:bg-[#1a1a1a]/80 transition-colors">
                    <div className="truncate">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">{key}</p>
                    </div>

                    <div className="min-w-0 translate-y-[5px]">
                      {canEditEvaluation ? (
                        <div className="relative flex items-center h-2 group">
                          <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                            <div
                              className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(value as number))}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value as any}
                            onChange={(e) =>
                              handleUpdate(`strengths.${key}`, parseInt(e.target.value))
                            }
                            style={{
                              background: `linear-gradient(to right, ${getHexColor(value as number)} ${value}%, #333 ${value}%)`,
                            }}
                            className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value as any}
                            onChange={(e) =>
                              handleUpdate(`strengths.${key}`, parseInt(e.target.value))
                            }
                            className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                          />
                        </div>
                      ) : (
                        <Progress
                          value={value as any}
                          className="h-1.5"
                          style={{ backgroundColor: '#333' }}
                          indicatorClassName={getIndicatorColor(value as number)}
                        />
                      )}
                    </div>

                    <div className="flex justify-end">
                      <CMSField
                        value={value as any}
                        onUpdate={(val) => handleUpdate(`strengths.${key}`, parseInt(String(val)))}
                        canEdit={canEditEvaluation}
                        type="number"
                        editTrigger="doubleClick"
                        className="font-bold text-xs justify-end"
                        style={{ color: getHexColor(value as number) }}
                        inputClassName="text-right h-7 w-16 bg-gray-900 border-primary/50 focus:border-primary transition-all px-2 rounded-md"
                        hideIcon={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Performance Metrics
              </h2>
              <div className="space-y-2 text-sm">
                {Object.entries(playerData.performanceMetrics).map(
                  ([key, value]) => (
                    <div key={key} className="grid grid-cols-[80px_1fr_auto] items-center gap-2 p-2 bg-[#1a1a1a]/50 border border-border/50 rounded-lg group hover:bg-[#1a1a1a]/80 transition-colors">
                      <div className="truncate">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">{key.replace(/([A-Z])/g, " $1")}</p>
                      </div>

                      <div className="min-w-0 translate-y-[5px]">
                        {canEditEvaluation ? (
                          <div className="relative flex items-center h-2 group">
                            <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden relative">
                              <div
                                className={cn("h-full transition-all duration-300 ease-out", getIndicatorColor(value as number))}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={value as any}
                              onChange={(e) =>
                                handleUpdate(`performanceMetrics.${key}`, parseInt(e.target.value))
                              }
                              style={{
                                background: `linear-gradient(to right, ${getHexColor(value as number)} ${value}%, #333 ${value}%)`,
                              }}
                              className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all absolute inset-0 z-10 opacity-0 group-hover:opacity-100 accent-primary"
                            />
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={value as any}
                              onChange={(e) =>
                                handleUpdate(`performanceMetrics.${key}`, parseInt(e.target.value))
                              }
                              className="w-full h-6 opacity-0 cursor-pointer absolute inset-0 z-20"
                            />
                          </div>
                        ) : (
                          <Progress
                            value={value as any}
                            className="h-1.5"
                            style={{ backgroundColor: '#333' }}
                            indicatorClassName={getIndicatorColor(value as number)}
                          />
                        )}
                      </div>

                      <div className="flex justify-end">
                        <CMSField
                          value={value as any}
                          onUpdate={(val) => handleUpdate(`performanceMetrics.${key}`, parseInt(String(val)))}
                          canEdit={canEditEvaluation}
                          type="number"
                          editTrigger="doubleClick"
                          className="font-bold text-xs justify-end"
                          style={{ color: getHexColor(value as number) }}
                          inputClassName="text-right h-7 w-16 bg-gray-900 border-primary/50 focus:border-primary transition-all px-2 rounded-md"
                          hideIcon={true}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div> */}


            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Market Value
              </h2>
              <div className="mb-4">
                <CMSField
                  value={playerData.marketValue}
                  onUpdate={(val) => handleUpdate("marketValue", val)}
                  canEdit={canEditBio}
                  className="text-3xl font-bold text-primary mb-1"
                  inputClassName="text-3xl font-bold h-12"
                />
                <p className="text-xs text-gray-400">Current Market Value</p>
                <CMSField
                  value={playerData.marketTrend}
                  onUpdate={(val) => handleUpdate("marketTrend", val)}
                  canEdit={canEditBio}
                  className="text-xs text-primary mt-2"
                  inputClassName="h-7 text-xs"
                />
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-center font-heading font-normal">
                  Transfer Status
                </h2>
                <span className="text-xs bg-primary text-black px-2 py-1 rounded">
                  {playerData.transferStatus}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Contract Until</span>
                  <CMSField
                    value={playerData.contractUntil}
                    onUpdate={(val) => handleUpdate("contractUntil", val)}
                    canEdit={canEditBio}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Agent</span>
                  <CMSField
                    value={playerData.agent}
                    onUpdate={(val) => handleUpdate("agent", val)}
                    canEdit={canEditBio}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Agency</span>
                  <CMSField
                    value={playerData.agency}
                    onUpdate={(val) => handleUpdate("agency", val)}
                    canEdit={canEditBio}
                    className="w-28 justify-end"
                    inputClassName="text-right"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-4">
                Accomplishments
              </h2>
              <div className="space-y-6 border-l-2 border-green-600 pl-4 mt-6">
                {playerData.careerHighlights.map((highlight: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                      <Image
                        src={trofeeIcon}
                        alt="Achievement"
                        width={36}
                        height={36}
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <CMSField
                        value={highlight.year}
                        onUpdate={(val) => handleUpdate(`careerHighlights.${idx}.year`, val)}
                        canEdit={canEditBio}
                        type="textarea"
                        className="text-xs font-black text-primary/80 tracking-widest leading-relaxed uppercase"
                        inputClassName="text-xs font-black min-h-[30px] py-0.5 uppercase"
                      />
                      <CMSField
                        value={highlight.title}
                        onUpdate={(val) => handleUpdate(`careerHighlights.${idx}.title`, val)}
                        canEdit={canEditBio}
                        type="textarea"
                        className="text-sm md:text-base text-gray-400 leading-relaxed tracking-tight uppercase"
                        inputClassName="text-base font-black min-h-[40px] py-1 uppercase"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg text-center font-heading font-normal mb-6">
                Current Season Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <CMSField
                    value={playerData.seasonStats.matches}
                    onUpdate={(val) => handleUpdate("seasonStats.matches", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400 mt-1">MATCHES</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={playerData.seasonStats.goals}
                    onUpdate={(val) => handleUpdate("seasonStats.goals", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400 mt-1">GOALS</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={playerData.seasonStats.assists}
                    onUpdate={(val) => handleUpdate("seasonStats.assists", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400 mt-1">ASSISTS</div>
                </div>
                <div className="text-center">
                  <CMSField
                    value={playerData.seasonStats.avgRating}
                    onUpdate={(val) => handleUpdate("seasonStats.avgRating", val)}
                    canEdit={canEditEvaluation}
                    isNumeric
                    className="text-3xl font-bold text-primary justify-center"
                    inputClassName="text-center w-24 h-10 bg-gray-900/50 border-gray-700 focus:border-primary transition-all px-2 rounded-lg"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    AVERAGE RATING
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Certificate is not downloadable */}
    </>
  );
};

export default PlayerBioSection;
