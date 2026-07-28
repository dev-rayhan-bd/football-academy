import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import clubImage from "@/assets/cvs-page/club1.png";
import badge1 from "@/assets/cvs-page/id/coach-badge1.png";
import badge2 from "@/assets/cvs-page/id/coach-badge2.png";
import badge3 from "@/assets/cvs-page/id/coach-badge3.png";
import flagImage from "@/assets/cvs-page/id/coach-bio-flag.png";
import coachStyleImage from "@/assets/cvs-page/id/coach-style-image.png";
import flagFr from "@/assets/cvs-page/id/flag-fr.png";
import flagIt from "@/assets/cvs-page/id/flag-itally.png";
import trophyIcon from "@/assets/cvs-page/id/trofeeIcon.png";
import courseLogo1 from "@/assets/cvs-page/id/courses-logo1.png";
import courseLogo2 from "@/assets/cvs-page/id/courses-logo2.png";
import courseLogo3 from "@/assets/cvs-page/id/courses-logo3.png";
import courseLogo4 from "@/assets/cvs-page/id/courses-logo4.png";

export interface CoachLanguage {
  name: string;
  level: string;
  color: string;
}

export interface CoachData {
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
  clubs: { id: string; name: string; from: string; to: string; logo?: any; color?: string }[];
  qualifications: { id: number; text: string; icon?: string }[];
  coachImage: any;
  mainFlag: any;
  coachType: string;
  selectedStyleIds: string[];
  complementaryLogos: { id: number; name: string; image: any }[];
  complementaryCourses: { id: number; title: string; icon?: string }[];
  formationMarkers: { id: number; x: number; y: number }[][];
  testimonials: { id: number; name: string; role: string; text: string; avatar: string }[];
}

const initialState: CoachData = {
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
  languages: [
    { name: "Portuguese", level: "NATIVE", color: "text-primary" },
    { name: "English", level: "FLUENT", color: "text-yellow" },
    { name: "Spanish", level: "INTERMEDIATE", color: "text-orange" },
  ],
  seasonStats: {
    matches: 32,
    wins: 21,
    losses: 7,
    draws: 4,
    cleanSheets: 9,
  },
  transferStatus: "Active",
  contractUntil: "June, 2026",
  agent: "John Morrison",
  agency: "Elite Sports Mgmt",
  salary: "$ 20,000.00",
  majorTrophies: [
    { name: "K10 FOOTBALL CHAMPIONSHIP", count: 3 },
    { name: "K10 FOOTBALL CUP", count: 7 },
    { name: "K10 FOOTBALL LEAGUE", count: 12 },
    { name: "K10 FOOTBALL YOUTH CUP", count: 5 },
    { name: "GBN CFN B", count: 2 },
    { name: "GBN CFN B", count: 2 },
    { name: "GBN CFN B", count: 4 },
  ],
  coachImage: coachStyleImage,
  mainFlag: flagImage,
  cupHistory: [
    "2021 - K10 FOOTBALL LEAGUE - K10 FOOTBALL FC",
    "2019 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
    "2018 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
    "2017 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
    "2016 - K10 FOOTBALL CUP - K10 FOOTBALL FC",
  ],
  keySkills: [
    { id: 1, text: "Tactical planning and game strategy", icon: "target" },
    { id: 2, text: "Player development and mentoring", icon: "users" },
    { id: 3, text: "Match analysis and opponent scouting", icon: "trendingUp" },
    { id: 4, text: "Training session design", icon: "calendar" },
  ],
  clubs: [
    { id: "1", name: "Manchester City", from: "2020", to: "Present", logo: clubImage },
    { id: "2", name: "Manchester City", from: "2020", to: "Present", logo: clubImage },
    { id: "3", name: "Manchester City", from: "2020", to: "Present", logo: clubImage },
  ],
  qualifications: [
    {
      id: 1,
      text: "Strong communication skills, empathy and high expectations combine to create strong individuals and winning teams.",
      icon: "users",
    },
    {
      id: 2,
      text: "Highly skilled professional with 15 years of experience developing improvement programs for athletes of all age groups.",
      icon: "activity",
    },
    {
      id: 3,
      text: "Five years of experience assistant coach at the college level",
      icon: "graduationCap",
    },
  ],
  coachType: "Head Coach",
  selectedStyleIds: ["tiki-taka", "motivator", "youth-development"],
  complementaryLogos: [
    { id: 1, name: 'Logo 1', image: courseLogo1 },
    { id: 2, name: 'Logo 2', image: courseLogo2 },
    { id: 3, name: 'Logo 3', image: courseLogo3 },
    { id: 4, name: 'Logo 4', image: courseLogo4 },
  ],
  complementaryCourses: [
    { id: 1, title: 'UEFA Pro Licence', icon: 'award' },
    { id: 2, title: 'UEFA A Licence', icon: 'award' },
    { id: 3, title: 'UEFA B Licence', icon: 'award' },
    { id: 4, title: 'UEFA C Licence', icon: 'award' },
    { id: 5, title: 'Level 3 Coaching Certificate', icon: 'award' },
    { id: 6, title: 'Level 2 Coaching Certificate', icon: 'award' },
    { id: 7, title: 'Level 1 Coaching Certificate', icon: 'award' },
    { id: 8, title: 'Football Management & Leadership', icon: 'award' },
    { id: 9, title: 'Performance Analysis in Professional Football', icon: 'award' },
    { id: 10, title: 'Technical Coordination in the Base Categories', icon: 'award' },
    { id: 11, title: 'Strength, Power and Speed from Base to Professional', icon: 'award' },
    { id: 12, title: 'Talent Identification in Football', icon: 'award' },
    { id: 13, title: 'Injury Prevention & Recovery in Football', icon: 'award' },
    { id: 14, title: 'Sports Psychology & Athlete Mentorship', icon: 'award' },
    { id: 15, title: 'FA Safeguarding Children Course', icon: 'award' },
    { id: 16, title: 'Elite Player Scouting & Assessment', icon: 'award' },
  ],
  formationMarkers: [[], [], []],
  testimonials: [
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
  ]
};

export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCoachData: (state, action: PayloadAction<Partial<CoachData>>) => {
      return { ...state, ...action.payload };
    },
    updateCoachField: (state, action: PayloadAction<{ field: string; value: any }>) => {
      const { field, value } = action.payload;
      const keys = field.split(".");
      if (keys.length === 1) {
        (state as any)[field] = value;
      } else {
        let current = state as any;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      }
    },
  },
});

export const { setCoachData, updateCoachField } = coachSlice.actions;

export default coachSlice.reducer;
