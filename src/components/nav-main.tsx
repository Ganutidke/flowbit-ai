"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col ">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem className="" key={item.title}>
              <SidebarMenuButton className={`${item.isActive ? "bg-[#E3E6F0]" : ""} h-[52px] text-[#1B1464] hover:bg-[#E3E6F0]`} tooltip={item.title}>
                {item.icon && <item.icon  className="h-5 w-5"  />}
                <span className="font-semibold text-base">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
