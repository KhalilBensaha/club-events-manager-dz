"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userType, setUserType] = useState<"user" | "club" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const type = localStorage.getItem("userType") as "user" | "club" | null
    if (!type) {
      router.push("/")
      return
    }
    setUserType(type)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!userType) {
    return null
  }

  // Get page title from pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean)
    const lastSegment = segments[segments.length - 1] || "dashboard"
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }

  return (
    <SidebarProvider>
      <AppSidebar userType={userType} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="h-8 w-8" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col p-6">
          <div className="min-h-[calc(100vh-8rem)] flex-1">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
