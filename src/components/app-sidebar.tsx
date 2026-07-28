"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import logo from "@/assets/logo.png";
import { NavDocuments } from "@/components/nav-documents";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Icon } from "@tabler/icons-react";

export type SidebarItem = {
  name: string;
  url: string;
  icon: Icon;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  sidebarItems: SidebarItem[];
  tier?: {
    name: string;
    color: string;
  };
};

export function AppSidebar({ sidebarItems, tier, ...props }: AppSidebarProps) {
  const router = useRouter();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    router.replace("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-[#111111]" {...props}>
      <SidebarHeader className="pt-6 px-4 bg-[#111111] flex justify-between items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2 px-2">
              <div className="flex h-full w-full items-center justify-start">
                <Image src={logo} className="h-full w-auto object-contain" alt="K10 football logo" />
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        
      </SidebarHeader>
      <SidebarContent className={`px-2 mt-4 bg-[#111111] overflow-hidden ${collapsed ? 'flex-col items-center' : ''}`}>
        <ScrollArea className="flex-1 px-2">
          <NavDocuments items={sidebarItems} />
        </ScrollArea>
      </SidebarContent>
      <div className="mt-auto p-4 flex flex-col gap-6 bg-[#111111]">
        {tier && !collapsed && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Current Tier</p>
            <p className="text-xl font-heading font-bold italic" style={{ color: tier.color }}>{tier.name}</p>
          </div>
        )}

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-[#E31B23] hover:text-red-400 transition-colors px-2 mb-4 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </Sidebar>
  );
}