"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconUser, 
  IconRosetteFilled, 
  IconSearch, 
  IconHeart, 
  IconShare, 
  IconStar, 
  IconChartBar, 
  IconSettings,
  IconMessageCircle
} from "@tabler/icons-react";
import { ReactNode } from "react";

const agentSidebarItems = [
  { name: "Dashboard", url: "/dashboard/agent", icon: IconDashboard },
  { name: "My Profile", url: "/dashboard/agent/my-profile", icon: IconUser },
  { name: "Licensed Verification", url: "/dashboard/agent/licensed-verification", icon: IconRosetteFilled },
  { name: "Discover Players", url: "/dashboard/agent/discover-players", icon: IconSearch },
  { name: "Liked CVs", url: "/dashboard/agent/liked-cvs", icon: IconHeart },
  { name: "Shared Profiles", url: "/dashboard/agent/shared-profiles", icon: IconShare },
  { name: "Success Story", url: "/dashboard/agent/success-story", icon: IconStar },
  { name: "Analytics", url: "/dashboard/agent/analytics", icon: IconChartBar },
  { name: "Chat", url: "/dashboard/agent/chat", icon: IconMessageCircle },
  { name: "Settings", url: "/dashboard/agent/settings", icon: IconSettings },
];

export default function AgentLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={agentSidebarItems}
      tier={{ name: "ACTIVE AGENT", color: "#00FF62" }}
    >
      {children}
    </DashboardLayout>
  );
}
