"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconFileText, 
  IconPhotoVideo, 
  IconReportAnalytics, 
  IconChartBar, 
  IconBell, 
  IconSettings 
} from "@tabler/icons-react";
import { ReactNode } from "react";

const playerSidebarItems = [
  { name: "Dashboard", url: "/dashboard/player", icon: IconDashboard },
  { name: "My CV", url: "/dashboard/player/my-cv", icon: IconFileText },
  { name: "My Images & Videos", url: "/dashboard/player/images&videos", icon: IconPhotoVideo },
  { name: "Game Reports", url: "/dashboard/player/game-reports", icon: IconReportAnalytics },
  { name: "Analytics", url: "/dashboard/player/analytics", icon: IconChartBar },
  { name: "Notification", url: "/dashboard/player/notifications", icon: IconBell },
  { name: "Settings", url: "/dashboard/player/settings", icon: IconSettings },
];

export default function PlayerLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={playerSidebarItems}
      tier={{ name: "GOLD", color: "var(--gold)" }}
    >
      {children}
    </DashboardLayout>
  );
}
