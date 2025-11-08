"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { ChevronsUpDown, Home } from "lucide-react";

const data = {
  user: {
    name: "Bucchaltung",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Invoice",
    url: "#",
    icon: IconFileDescription,
  },
  {
    title: "Other files",
    url: "#",
    icon: IconFolder,
  },
  {
    title: "Departments",
    url: "#",
    icon: IconInnerShadowTop,
  },
  {
    title: "Users",
    url: "#",
    icon: IconUsers,
  },
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b h-16 items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-10"
            >
              <a href="#" className="flex flex-row justify-between">
                <div className="flex gap-2">
                  <Image
                    src="/images/logo.svg"
                    alt="Bucchaltung"
                    width={32}
                    height={32}
                    className="rounded-md bg-cover "
                  />
                  <span className="text-sm font-semibold">
                    Bucchaltung
                    <p className="font-normal text-xs text-gray-400">
                      12 members
                    </p>
                  </span>
                </div>
                <span className=""><ChevronsUpDown className="h-4"/> </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <p className="text-xs font-medium text-black tracking-widest mb-1 px-2">GENERAL</p>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
