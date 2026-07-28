"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  IconDashboard,
  IconFileText,
  IconPhotoVideo,
  IconChartBar,
  IconSettings,
  IconUsers,
  IconReport,
  IconUserCheck,
  IconClipboardCheck
} from "@tabler/icons-react";
import { ReactNode, useState, createContext } from "react";

export const CoachContext = createContext<{ hasAcademy: boolean }>({ hasAcademy: false });

const coachSidebarItemsWithoutAcademy = [
  { name: "Dashboard", url: "/dashboard/coach", icon: IconDashboard },
  { name: "My CV", url: "/dashboard/coach/my-cv", icon: IconFileText },
  { name: "My Images & Videos", url: "/dashboard/coach/my-images&videos", icon: IconPhotoVideo },
  { name: "Analytics", url: "/dashboard/coach/analytics", icon: IconChartBar },
  { name: "Settings", url: "/dashboard/coach/settings", icon: IconSettings },
];

const coachSidebarItemsWithAcademy = [
  { name: "Dashboard", url: "/dashboard/coach", icon: IconDashboard },
  { name: "My CV", url: "/dashboard/coach/my-cv", icon: IconFileText },
  { name: "My Images & Videos", url: "/dashboard/coach/my-images&videos", icon: IconPhotoVideo },
  { name: "My Teams", url: "/dashboard/coach/my-teams", icon: IconUsers },
  { name: "Game Reports", url: "/dashboard/coach/game-reports", icon: IconReport },
  { name: "Player CV Validations", url: "/dashboard/coach/player-cv-validations", icon: IconUserCheck },
  { name: "Player Evaluation", url: "/dashboard/coach/player-evaluation", icon: IconClipboardCheck },
  { name: "Analytics", url: "/dashboard/coach/analytics", icon: IconChartBar },
  { name: "Settings", url: "/dashboard/coach/settings", icon: IconSettings },
];

export default function CoachLayout({ children }: { children: ReactNode }) {
  const [hasAcademy, setHasAcademy] = useState(false);

  const currentSidebarItems = hasAcademy ? coachSidebarItemsWithAcademy : coachSidebarItemsWithoutAcademy;

  const customToggle = (
    <div className="flex items-center bg-[#1a1a1a] rounded-lg p-1.5 gap-1.5 border border-white/5 ml-2">
      <button
        onClick={() => setHasAcademy(false)}
        className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${!hasAcademy ? 'bg-[#E31B23] text-white' : 'text-white/40 hover:text-white/60'}`}
      >
        Individual Coach
      </button>
      <div
        onClick={() => setHasAcademy(!hasAcademy)}
        className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer group border border-white/5"
      >
        <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 shadow-sm ${hasAcademy ? 'right-0.5' : 'left-0.5'}`}></div>
      </div>
      <button
        onClick={() => setHasAcademy(true)}
        className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${hasAcademy ? 'bg-[#E31B23] text-white' : 'text-white/40 hover:text-white/60'}`}
      >
        Club Coach
      </button>
    </div>
  );

  return (
    <CoachContext.Provider value={{ hasAcademy }}>
      <DashboardLayout
        sidebarItems={currentSidebarItems}
        tier={{ name: "Silver", color: "#C0C0C0" }}
        customToggle={customToggle}
      >
        {children}
      </DashboardLayout>
    </CoachContext.Provider>
  );
}
