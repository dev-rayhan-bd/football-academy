"use client";
import { AppSidebar, SidebarItem } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  tier?: {
    name: string;
    color: string;
  };
  showToggle?: boolean;
  customToggle?: ReactNode;
}

export function DashboardLayout({ children, sidebarItems, tier, showToggle = false, customToggle }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" sidebarItems={sidebarItems} tier={tier} />
      <SidebarInset className="bg-[#0A0A0A] text-white">
        <SiteHeader showToggle={showToggle} customToggle={customToggle} />
        <main className="p-4 md:p-6 lg:p-8 pb-0 md:pb-0 lg:pb-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
