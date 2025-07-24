"use client"

import type * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Calendar, Home, Settings, Building2, User, LogOut, Sparkles } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userType: "user" | "club"
}

export function AppSidebar({ userType, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  const userNavItems = [
    {
      title: t("nav.dashboard"),
      url: "/dashboard",
      icon: Home,
    },
    {
      title: t("nav.events"),
      url: "/events",
      icon: Calendar,
    },
    {
      title: t("nav.clubs"),
      url: "/clubs",
      icon: Building2,
    },
    {
      title: t("nav.profile"),
      url: "/profile",
      icon: User,
    },
    {
      title: t("nav.settings"),
      url: "/settings",
      icon: Settings,
    },
  ]

  const clubNavItems = [
    {
      title: t("nav.dashboard"),
      url: "/dashboard",
      icon: Home,
    },
    {
      title: t("nav.events"),
      url: "/events",
      icon: Calendar,
    },
    {
      title: t("nav.clubInfo"),
      url: "/clubs",
      icon: Building2,
    },
    {
      title: t("nav.settings"),
      url: "/settings",
      icon: Settings,
    },
  ]

  const navItems = userType === "user" ? userNavItems : clubNavItems

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push("/")
  }

  const handleNavigation = (url: string) => {
    router.push(url)
  }

  return (
    <Sidebar side="left" collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Club Events</span>
                <span className="text-xs text-muted-foreground capitalize">{userType} Portal</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.navigation")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    className="w-full cursor-pointer"
                    onClick={() => handleNavigation(item.url)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{userType === "user" ? "JD" : "TC"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userType === "user" ? "John Doe" : "Tech Club"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {userType === "user" ? "john@example.com" : "tech@club.com"}
                </p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t("nav.logout")}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
