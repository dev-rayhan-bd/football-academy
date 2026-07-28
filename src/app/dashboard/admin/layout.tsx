"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  IconDashboard, 
  IconUsers, 
  IconSchool, 
  IconBuildingStore, 
  IconFileText, 
  IconCheckupList, 
  IconCreditCard, 
  IconChartBar, 
  IconSettings,
  IconUserSearch,
  IconBuildingCommunity,
  IconAward
} from "@tabler/icons-react";
import { ReactNode } from "react";
 
const adminSidebarItems = [
  { name: "Dashboard", url: "/dashboard/admin", icon: IconDashboard },
  { name: "Players", url: "/dashboard/admin/players", icon: IconUsers },
  { name: "Coaches", url: "/dashboard/admin/coaches", icon: IconUserSearch },
  { name: "Academies", url: "/dashboard/admin/academies", icon: IconSchool },
  { name: "Agents", url: "/dashboard/admin/agents", icon: IconUserSearch },
  { name: "Clubs", url: "/dashboard/admin/clubs", icon: IconBuildingCommunity },
  { name: "Membership Plans", url: "/dashboard/admin/membership-plans", icon: IconFileText },
  { name: "Grant Membership", url: "/dashboard/admin/grant-membership", icon: IconAward },
  { name: "Approvals", url: "/dashboard/admin/approvals", icon: IconCheckupList },
  { name: "Payments", url: "/dashboard/admin/payments", icon: IconCreditCard },
  { name: "Analytics", url: "/dashboard/admin/analytics", icon: IconChartBar },
  { name: "Settings", url: "/dashboard/admin/settings", icon: IconSettings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout 
      sidebarItems={adminSidebarItems}
      tier={{ name: "SUPER ADMIN", color: "#FF1010" }}
    >
      {children}
    </DashboardLayout>
  );
}
