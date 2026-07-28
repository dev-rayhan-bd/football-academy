"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: Icon;
  }[];
}) {
  // const { isMobile } = useSidebar();

  const pathName = usePathname();
  console.log(pathName);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {/* <SidebarGroupLabel>Documents</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            className={cn(
              "mb-2",
              pathName === item.url
                ? "bg-[#E31B23] rounded-lg text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white rounded-lg",
            )}
            key={item.name}
          >
            <SidebarMenuButton className="py-6 hover:bg-transparent" asChild>
              <Link href={item.url}>
                <div className="w-7">
                  <item.icon size={24} />
                </div>

                <span className="text-[15px] font-medium">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <IconDots className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
