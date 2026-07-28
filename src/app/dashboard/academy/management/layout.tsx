"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconMessage, 
  IconUsers, 
  IconUserCheck, 
  IconCalendarEvent, 
  IconCreditCard, 
  IconBallFootball, 
  IconStar, 
  IconUsersGroup, 
  IconNews, 
  IconTrophy, 
  IconFileText, 
  IconChartBar, 
  IconBuildingStore, 
  IconSettings,
  IconCoins,
  IconInbox
} from "@tabler/icons-react";
import { ReactNode } from "react";

const managementSidebarItems = [
  { name: "Dashboard", url: "/dashboard/academy/management", icon: IconDashboard },
  { name: "Chat", url: "/dashboard/academy/management/chat", icon: IconMessage },
  { name: "Coach & Players", url: "/dashboard/academy/management/coach-players", icon: IconUsers },
  { name: "Transfer Requests", url: "/dashboard/academy/management/transfer-requests", icon: IconInbox },
  { name: "Parents Management", url: "/dashboard/academy/management/parents-management", icon: IconUserCheck },
  { name: "Training Sessions", url: "/dashboard/academy/management/training-sessions", icon: IconCalendarEvent },
  { name: "Fees & Payments", url: "/dashboard/academy/management/fees-payments", icon: IconCreditCard },
  { name: "Finance Committee", url: "/dashboard/academy/management/finance-committee", icon: IconCoins },
  { name: "Matches", url: "/dashboard/academy/management/matches", icon: IconBallFootball },
  { name: "Extra Events", url: "/dashboard/academy/management/extra-events", icon: IconStar },
  { name: "Sponsors", url: "/dashboard/academy/management/sponsors", icon: IconUsersGroup },
  { name: "Academy News", url: "/dashboard/academy/management/academy-news", icon: IconNews },
  { name: "Success Story", url: "/dashboard/academy/management/success-story", icon: IconTrophy },
  { name: "Game Reports", url: "/dashboard/academy/management/game-reports", icon: IconFileText },
  { name: "Validate CV", url: "/dashboard/academy/management/validate-cv", icon: IconFileText },
  { name: "Analytics Report", url: "/dashboard/academy/management/analytics-report", icon: IconChartBar },
  { name: "Product Store", url: "/dashboard/academy/management/product-store", icon: IconBuildingStore },
  { name: "Settings", url: "/dashboard/academy/management/settings", icon: IconSettings },
];

export default function AcademyManagementLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={managementSidebarItems}
      showToggle={true}
    >
      {children}
    </DashboardLayout>
  );
}
