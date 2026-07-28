import flagFr from "@/assets/cvs-page/id/flag-fr.png";
import flagIt from "@/assets/cvs-page/id/flag-itally.png";
import flagImage from "@/assets/cvs-page/id/flag.png";
import futsalMap from "@/assets/cvs-page/id/Futsal Pitch.jpg";
// import leftLeg from "@/assets/cvs-page/id/left-leg-image.png";
import leftLeg from "@/assets/cvs-page/id/left_foot.png";
import playerImage from "@/assets/cvs-page/id/player-image.png";
import positionMap from "@/assets/cvs-page/id/position-map.png";
// import right from "@/assets/cvs-page/id/right-legt-image.png";
import right from "@/assets/cvs-page/id/right_foot.png";
import trofeeIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Club {
  id: string;
  name: string;
  from: string;
  to: string;
  logo: string;
  color: string;
  shortName: string;
  category?: string;
}

export interface PlayerData {
  fullName: string;
  dob: string;
  age: string;
  birthCountry: string;
  birthCountryFlag: any;
  dualNationality: string;
  dualNationalityFlag: any;
  email: string;
  phone: string;
  location: string;
  website: string;
  height: string;
  weight: string;
  leftLegUsage: number;
  rightLegUsage: number;
  leftLegImage: any;
  rightLegImage: any;
  languages: { name: string; level: string; color: string }[];
  rating: number;
  playerImage: any;
  cardImage?: string;
  strengths: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  performanceMetrics: {
    passAccuracy: number;
    shootAccuracy: number;
    dribbleSuccess: number;
    tackleSuccess: number;
  };
  marketValue: string;
  marketTrend: string;
  transferStatus: string;
  contractUntil: string;
  agent: string;
  agency: string;
  mainFlag: any;
  position: string;
  selectedStyleIds: string[];
  careerHighlights: {
    year: string;
    title: string;
    club: string;
    icon: any;
  }[];
  seasonStats: {
    matches: number;
    goals: number;
    assists: number;
    avgRating: number;
  };
  clubs: Club[];
  skillsCategories: SkillCategory[];
  futsalMap?: any;
  positionMap?: any;
  positionMarkers: Marker[];
  futsalMarkers: Marker[];
  coachName?: string;
  academyName?: string;
  coachLicenseNumber?: string;
  clubManaged?: string;
  evaluation?: any;
  evaluationDate?: string;
}

export interface Marker {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  name?: string;
}

export interface Skill {
  name: string;
  value: number;
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
  borderColor: string;
}

const basePlayerData: PlayerData = {
  fullName: "Marcus Silva",
  dob: "15/03/1996",
  age: "24",
  birthCountry: "France",
  birthCountryFlag: flagFr,
  dualNationality: "Italy",
  dualNationalityFlag: flagIt,
  email: "marcus.silva@email.com",
  phone: "+351 912 345 678",
  location: "France",
  website: "www.k10football.com",
  height: "1.82",
  weight: "76",
  leftLegUsage: 31,
  rightLegUsage: 87,
  leftLegImage: leftLeg,
  rightLegImage: right,
  languages: [
    { name: "Portuguese", level: "Native", color: "text-primary" },
    { name: "English", level: "Fluent", color: "text-yellow" },
    { name: "Spanish", level: "Intermediate", color: "text-orange" },
  ],
  rating: 94,
  playerImage: playerImage,
  strengths: {
    pace: 82,
    shooting: 84,
    passing: 89,
    dribbling: 85,
    defending: 78,
    physical: 70,
  },
  performanceMetrics: {
    passAccuracy: 92,
    shootAccuracy: 78,
    dribbleSuccess: 85,
    tackleSuccess: 72,
  },
  marketValue: "45M",
  marketTrend: "5 Mln last season",
  transferStatus: "Active",
  contractUntil: "June, 2026",
  agent: "John Morrison",
  agency: "Elite Sports Mgmt",
  mainFlag: flagImage,
  position: "Defensive Midfielder",
  selectedStyleIds: ["technical", "finesse-shot", "incisive-pass"],
  careerHighlights: [
    {
      year: "2019",
      title: "BRAZILIAN CHAMPIONSHIP",
      club: "FLAMENGO",
      icon: trofeeIcon,
    },
    {
      year: "2010",
      title: "CAMPEONATA - PAULISTA",
      club: "CORINTHIANS",
      icon: trofeeIcon,
    },
    {
      year: "2015",
      title: "BRAZILIAN CHAMPIONSHIP",
      club: "FLAMENGO FC",
      icon: trofeeIcon,
    },
    {
      year: "2014",
      title: "PAULISTA CUP",
      club: "SAO PAULO FC",
      icon: trofeeIcon,
    },
    {
      year: "2017/2020",
      title: "CAMPEONATO CARIOCA",
      club: "VASCO FC",
      icon: trofeeIcon,
    },
  ],
  seasonStats: {
    matches: 28,
    goals: 8,
    assists: 16,
    avgRating: 8.4,
  },
  clubs: [
    {
      id: "1",
      name: "Manchester City",
      from: "2020",
      to: "Present",
      logo: "bg-blue-600",
      color: "border-blue-400",
      shortName: "MC",
    },
    {
      id: "2",
      name: "Liverpool FC",
      from: "2016",
      to: "2020",
      logo: "bg-red-700",
      color: "border-red-500",
      shortName: "LFC",
      category: "U-10 to U-14",
    },
    {
      id: "3",
      name: "Chelsea FC",
      from: "2020",
      to: "Present",
      logo: "bg-blue-700",
      color: "border-blue-500",
      shortName: "CFC",
    },
  ],
  skillsCategories: [
    {
      category: "Technical",
      color: "#0077FF",
      borderColor: "border-l-blue-500",
      skills: [
        { name: "Ball Control", value: 90 },
        { name: "Dribbling", value: 85 },
        { name: "Short Passing", value: 92 },
        { name: "Long Passing", value: 88 },
        { name: "Crossing", value: 82 },
        { name: "Shooting", value: 78 },
        { name: "Finishing", value: 75 },
        { name: "Long Shots", value: 80 },
      ],
    },
    {
      category: "Tactical",
      color: "#00FF62",
      borderColor: "border-l-green-500",
      skills: [
        { name: "Positioning", value: 88 },
        { name: "Vision", value: 91 },
        { name: "Anticipation", value: 86 },
        { name: "Composition", value: 84 },
        { name: "Teamwork", value: 89 },
        { name: "Work Rate", value: 87 },
        { name: "Decisions", value: 85 },
        { name: "Att. Position", value: 83 },
      ],
    },
    {
      category: "Physical",
      color: "#FF1010",
      borderColor: "border-l-red-500",
      skills: [
        { name: "Acceleration", value: 78 },
        { name: "Sprint Speed", value: 76 },
        { name: "Stamina", value: 85 },
        { name: "Strength", value: 72 },
        { name: "Balance", value: 83 },
        { name: "Agility", value: 81 },
        { name: "Reactions", value: 86 },
        { name: "Jumping", value: 70 },
      ],
    },
    {
      category: "Mental",
      color: "#ffffff",
      borderColor: "border-l-yellow-500",
      skills: [
        { name: "Aggression", value: 65 },
        { name: "Interceptions", value: 74 },
        { name: "Marking", value: 87 },
        { name: "Leadership", value: 79 },
        { name: "Bravery", value: 73 },
        { name: "Determination", value: 88 },
        { name: "Heading", value: 85 },
        { name: "Influence", value: 82 },
      ],
    },
  ],
  futsalMap: futsalMap,
  positionMap: positionMap,
  positionMarkers: [{ id: "1", x: 50, y: 50 }],
  futsalMarkers: [{ id: "1", x: 50, y: 50 }],
  coachName: "Pep Guardiola",
  academyName: "Manchester City Academy",
  coachLicenseNumber: "CBF-2026-4587",
  clubManaged: "Manchester City Academy",
};

export interface PlayerStateItem extends PlayerData {
  id: number;
  validationStatus: "pending" | "verified" | "expired" | "not_needed";
  assignedMonthsAgo?: number;
  requestedValidation?: boolean;
  lastValidatedDate?: string;
}

export interface PlayerSliceState {
  players: PlayerStateItem[];
  selectedPlayerId: number;
}

const createMockPlayer = (
  id: number,
  fullName: string,
  position: string,
  birthCountry: string,
  rating: number,
  validationStatus: "pending" | "verified" | "expired" | "not_needed",
  assignedMonthsAgo?: number,
  requestedValidation?: boolean,
  lastValidatedDate?: string,
  coachName?: string,
  academyName?: string
) => {
  // Clone base categories
  const categories = JSON.parse(JSON.stringify(basePlayerData.skillsCategories));
  // Set all skill values to rating to ensure average is exact
  categories.forEach((cat: any) => {
    cat.skills.forEach((skill: any) => {
      skill.value = rating;
    });
  });

  return {
    ...basePlayerData,
    id,
    fullName,
    position,
    birthCountry,
    rating,
    validationStatus,
    assignedMonthsAgo,
    requestedValidation,
    lastValidatedDate,
    skillsCategories: categories,
    coachName: coachName || "N/A",
    academyName: academyName || "N/A",
    coachLicenseNumber: "CBF-2026-4587",
    clubManaged: academyName || "Atlético Nacional",
    // Add variations to make stats realistic
    strengths: {
      pace: Math.min(100, rating + 5),
      shooting: Math.max(0, rating - 3),
      passing: rating,
      dribbling: Math.min(100, rating + 2),
      defending: Math.max(0, rating - 5),
      physical: rating,
    },
    // Keep player image same as original template
    playerImage: basePlayerData.playerImage,
    cardImage: "",
  };
};

const playersDataList = [
  createMockPlayer(1, "Marcus Silva", "Defensive Midfielder", "France", 88, "verified", 1, false, undefined, "Pep Guardiola", "Manchester City Academy"),
  createMockPlayer(2, "David Chen", "Forward", "China", 74, "pending", 4, false, undefined, "Zheng Zhi", "Guangzhou Youth Academy"),
  createMockPlayer(3, "Alex Jonson", "Defender", "United Kingdom", 52, "pending", 1, true, undefined, "Frank Lampard", "Chelsea Academy"),
  createMockPlayer(4, "James Brown", "Goalkeeper", "United States", 68, "expired", 2, false, "2026-01-10", "Greg Vanney", "LA Galaxy Academy"),
  createMockPlayer(5, "Lucas Hernandez", "Forward", "Spain", 84, "verified", 2, false, undefined, "Raul Gonzalez", "Real Madrid Academy"),
  createMockPlayer(6, "Yuki Tanaka", "Midfielder", "Japan", 48, "pending", 5, false, undefined, "N/A", "N/A"),
  createMockPlayer(7, "Gabriel Barbosa", "Forward", "Brazil", 82, "pending", 1, true, undefined, "Filipe Luis", "Flamengo Academy"),
  createMockPlayer(8, "Mateo Kovacic", "Midfielder", "Croatia", 78, "verified", 1, false, undefined, "Zlatko Dalic", "Dinamo Zagreb Academy"),
  createMockPlayer(9, "Kofi Mensah", "Defender", "Ghana", 56, "verified", 2, false, undefined, "N/A", "Right to Dream Academy"),
  createMockPlayer(10, "Liam O'Connor", "Goalkeeper", "Ireland", 71, "pending", 6, false, undefined, "Roy Keane", "Irish Elite Academy"),
  createMockPlayer(11, "Antoine Dupont", "Midfielder", "France", 86, "expired", 2, false, "2026-02-15", "Didier Deschamps", "INF Clairefontaine"),
  createMockPlayer(12, "Santi Cazorla", "Forward", "Spain", 65, "verified", 1, false, undefined, "Unai Emery", "Villarreal Academy"),
  createMockPlayer(13, "Ivan Petrovic", "Defender", "Serbia", 45, "verified", 2, false, undefined, "N/A", "Red Star Belgrade Academy"),
  createMockPlayer(14, "Diego Maradona", "Forward", "Argentina", 92, "verified", 1, false, undefined, "N/A", "Argentinos Juniors Academy"),
  createMockPlayer(15, "John Doe", "Midfielder", "United States", 79, "pending", 1, true, undefined, "Gregg Berhalter", "US Soccer DA"),
];

const initialState: PlayerSliceState = {
  players: playersDataList,
  selectedPlayerId: 1,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerData: (state, action: PayloadAction<Partial<PlayerData>>) => {
      const activePlayer = state.players.find((p) => p.id === state.selectedPlayerId);
      if (activePlayer) {
        Object.assign(activePlayer, action.payload);
      }
    },
    updatePlayerField: (state, action: PayloadAction<{ field: string; value: any }>) => {
      const { field, value } = action.payload;
      const activePlayer = state.players.find((p) => p.id === state.selectedPlayerId);
      if (activePlayer) {
        const keys = field.split(".");
        if (keys.length === 1) {
          (activePlayer as any)[field] = value;
        } else {
          let current = activePlayer as any;
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
        }
      }
    },
    setSelectedPlayerId: (state, action: PayloadAction<number>) => {
      state.selectedPlayerId = action.payload;
    },
    validatePlayerCv: (state, action: PayloadAction<number>) => {
      const player = state.players.find((p) => p.id === action.payload);
      if (player) {
        player.validationStatus = "verified";
        player.requestedValidation = false;
        player.lastValidatedDate = new Date().toISOString().split("T")[0];
        player.assignedMonthsAgo = 0; // reset assignment counter
      }
    },
    savePlayerEvaluation: (state, action: PayloadAction<{ id: number; evaluation: any; date: string }>) => {
      const player = state.players.find((p) => p.id === action.payload.id);
      if (player) {
        player.evaluation = action.payload.evaluation;
        player.evaluationDate = action.payload.date;
      }
    },
  },
});

export const {
  setPlayerData,
  updatePlayerField,
  setSelectedPlayerId,
  validatePlayerCv,
  savePlayerEvaluation,
} = playerSlice.actions;

export default playerSlice.reducer;

