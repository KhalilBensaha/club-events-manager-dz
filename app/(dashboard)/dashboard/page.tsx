"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, TrendingUp, Clock, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"

export default function DashboardPage() {
  const { t } = useLanguage()
  const [userType, setUserType] = useState<"user" | "club" | null>(null)

  useEffect(() => {
    const type = localStorage.getItem("userType") as "user" | "club" | null
    setUserType(type)
  }, [])

  const userStats = [
    {
      title: t("dashboard.stats.eventsAttended"),
      value: "12",
      change: "+2",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: t("dashboard.stats.clubsJoined"),
      value: "5",
      change: "+1",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: t("dashboard.stats.upcomingEvents"),
      value: "8",
      change: "+3",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const clubStats = [
    {
      title: t("dashboard.stats.eventsCreated"),
      value: "24",
      change: "+4",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: t("dashboard.stats.totalMembers"),
      value: "156",
      change: "+12",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: t("dashboard.stats.engagement"),
      value: "89%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const stats = userType === "user" ? userStats : clubStats

  const upcomingEvents = [
    {
      title: "Tech Meetup 2024",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      attendees: 45,
      status: "confirmed",
    },
    {
      title: "Design Workshop",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      attendees: 23,
      status: "pending",
    },
    {
      title: "Networking Event",
      date: "Dec 22, 2024",
      time: "7:00 PM",
      attendees: 67,
      status: "confirmed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            {t("dashboard.welcome")} {userType === "user" ? "John!" : "Tech Club!"}
          </h1>
          <p className="text-muted-foreground">
            {userType === "user" ? t("dashboard.userSubtitle") : t("dashboard.clubSubtitle")}
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {userType === "user" ? t("dashboard.joinEvent") : t("dashboard.createEvent")}
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Events */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t("dashboard.upcomingEvents")}
                <Button variant="ghost" size="sm" className="text-xs">
                  {t("dashboard.viewAll")}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardTitle>
              <CardDescription>{t("dashboard.upcomingEventsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>{event.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{event.attendees} attendees</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Overview */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.activityOverview")}</CardTitle>
              <CardDescription>{t("dashboard.activityOverviewDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{t("dashboard.eventParticipation")}</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{t("dashboard.clubEngagement")}</span>
                  <span className="text-sm text-muted-foreground">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{t("dashboard.networkingScore")}</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
            <CardDescription>{t("dashboard.recentActivityDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("dashboard.activity1")}</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("dashboard.activity2")}</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("dashboard.activity3")}</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
