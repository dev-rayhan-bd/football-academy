"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconUser, 
  IconSearch, 
  IconFileText, 
  IconStar, 
  IconChartBar, 
  IconSettings,
  IconMessageCircle
} from "@tabler/icons-react";
import { ReactNode } from "react";

const clubSidebarItems = [
  { name: "Dashboard", url: "/dashboard/club", icon: IconDashboard },
  { name: "Club Profile", url: "/dashboard/club/club-profile", icon: IconUser },
  { name: "Scouting Board", url: "/dashboard/club/scouting-board", icon: IconSearch },
  { name: "CVs Library", url: "/dashboard/club/cvs-library", icon: IconFileText },
  { name: "Success Story", url: "/dashboard/club/success-story", icon: IconStar },
  { name: "Analytics", url: "/dashboard/club/analytics", icon: IconChartBar },
  { name: "Chat", url: "/dashboard/club/chat", icon: IconMessageCircle },
  { name: "Settings", url: "/dashboard/club/settings", icon: IconSettings },
];

export default function ClubLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={clubSidebarItems}
      tier={{ name: "ACTIVE CLUB", color: "#00FF62" }}
    >
      {children}
    </DashboardLayout>
  );
}
