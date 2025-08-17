"use client"

import { useState, useEffect, useCallback } from "react"
import apiService from "@/lib/api"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Users, TrendingUp, Clock, Plus, ArrowRight, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/AuthContext"
// import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  // Clubs integration
  const [clubs, setClubs] = useState<any[]>([])
  const [loadingClubs, setLoadingClubs] = useState(false)
  const [clubError, setClubError] = useState<string | null>(null)

  // User profile integration
  const [profile, setProfile] = useState<any>(null)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  // Applications integration
  const [applications, setApplications] = useState<any[]>([])
  const [loadingApplications, setLoadingApplications] = useState(false)
  const [applicationsError, setApplicationsError] = useState<string | null>(null)

  // Membership integration
  const [members, setMembers] = useState<any[]>([])
  const [loadingMembers, setLoadingMembers] = useState(false)
  const [membersError, setMembersError] = useState<string | null>(null)
  const [memberEmail, setMemberEmail] = useState("")
  const [uploadingMembers, setUploadingMembers] = useState(false)

  // Fetch clubs
  const fetchClubs = useCallback(async () => {
    setLoadingClubs(true)
    setClubError(null)
  const res = await apiService.getAllClubs()
    if (res.error) setClubError(res.error)
    else setClubs(res.data || [])
    setLoadingClubs(false)
  }, [])

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true)
    setProfileError(null)
    const res = await apiService.getUserProfile()
    if (res.error) setProfileError(res.error)
    else setProfile(res.data)
    setLoadingProfile(false)
  }, [])

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    setLoadingApplications(true)
    setApplicationsError(null)
    const res = await apiService.getUserApplications()
    if (res.error) setApplicationsError(res.error)
    else setApplications(res.data ? Object.values(res.data).flat() : [])
    setLoadingApplications(false)
  }, [])

  // Fetch members (for clubs)
  const fetchMembers = useCallback(async (clubId?: number) => {
    setLoadingMembers(true)
    setMembersError(null)
    if (!clubId) {
      setMembers([])
      setLoadingMembers(false)
      return
    };
  const res = await apiService.getClubMembers(clubId)
    if (res.error) setMembersError(res.error)
    else setMembers(res.data || [])
    setLoadingMembers(false)
  }, [])

  const addMember = async () => {
    if (!memberEmail) return
    const res = await apiService.addMember(memberEmail)
    if (res.error) alert(res.error)
    else {
      if (user?.club?.id) fetchMembers(user.club.id)
      setMemberEmail("")
    }
  }

  const removeMember = async (email: string) => {
    const res = await apiService.removeMember(email)
    if (res.error) alert(res.error)
    else if (user?.club?.id) fetchMembers(user.club.id)
  }

  const uploadMembers = async (file: File) => {
    setUploadingMembers(true)
    const res = await apiService.uploadMembersCSV(file)
    if (res.error) alert(res.error)
    else alert('Upload processed: a ZIP report was returned by the server')
    setUploadingMembers(false)
  }

  // ...existing code...

  const { t } = useLanguage()
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  useEffect(() => {
    fetchClubs()
    fetchProfile()
    fetchApplications()
    if (user?.club?.id) fetchMembers(user.club.id)
  }, [fetchClubs, fetchProfile, fetchApplications, fetchMembers, user?.club?.id])

  const handleLogout = () => {
    logout()
    router.push('/')
  };

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

  const stats = user?.user_type === "PERSON" ? userStats : clubStats

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [eventError, setEventError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true)
      setEventError(null)
      const res = await apiService.getEvents()
      if (res.error) {
        setEventError(res.error)
      } else {
        setUpcomingEvents(res.data || [])
      }
      setLoadingEvents(false)
    }
    fetchEvents()
  }, [])

  // If not authenticated, redirect to login (client-side protection)
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return null
  }
  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite]">
              {t("dashboard.welcome")} {user?.user_type === "PERSON" ? user.person?.first_name || "KHALIL" : user?.club?.name || "Club"}!
            </h1>
            <p className="text-muted-foreground">
              {user?.user_type === "PERSON" ? t("dashboard.userSubtitle") : t("dashboard.clubSubtitle")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {user?.user_type === "PERSON" ? t("dashboard.joinEvent") : t("dashboard.createEvent")}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
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

      {/* Clubs Section */}
      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle>Clubs</CardTitle>
            <CardDescription>All clubs in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingClubs && <div className="text-muted-foreground">Loading clubs...</div>}
            {clubError && <div className="text-red-500">{clubError}</div>}
            {!loadingClubs && !clubError && clubs.length === 0 && <div className="text-muted-foreground">No clubs found.</div>}
            <ul className="space-y-2">
              {clubs.map((club: any) => (
                <li key={club.id} className="p-2 border rounded-lg flex justify-between items-center">
                  <span className="font-medium">{club.name}</span>
                  <span className="text-xs text-muted-foreground">{club.email}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* User Profile Section */}
      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingProfile && <div className="text-muted-foreground">Loading profile...</div>}
            {profileError && <div className="text-red-500">{profileError}</div>}
            {profile && (
              <div>
                <div className="font-medium">{profile.first_name} {profile.last_name}</div>
                <div className="text-xs text-muted-foreground">{profile.email}</div>
                <div className="text-xs text-muted-foreground">{profile.phone}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Applications Section */}
      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Your event applications</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingApplications && <div className="text-muted-foreground">Loading applications...</div>}
            {applicationsError && <div className="text-red-500">{applicationsError}</div>}
            {!loadingApplications && !applicationsError && applications.length === 0 && <div className="text-muted-foreground">No applications found.</div>}
            <ul className="space-y-2">
              {applications.map((app: any) => (
                <li key={app.id} className="p-2 border rounded-lg flex justify-between items-center">
                  <span className="font-medium">Event: {app.event?.title || app.event_id}</span>
                  <span className="text-xs text-muted-foreground">Status: {app.status}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Membership Section (for clubs) */}
      {user?.club?.id && (
        <div className="my-8">
          <Card>
            <CardHeader>
              <CardTitle>Club Members</CardTitle>
              <CardDescription>Members of your club</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingMembers && <div className="text-muted-foreground">Loading members...</div>}
              {membersError && <div className="text-red-500">{membersError}</div>}
              {!loadingMembers && !membersError && members.length === 0 && <div className="text-muted-foreground">No members found.</div>}
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <input
                  type="email"
                  placeholder="member@example.com"
                  className="border rounded px-3 py-2 flex-1 bg-background"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />
                <Button onClick={addMember}>Add member</Button>
                <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files && e.target.files[0] && uploadMembers(e.target.files[0])} />
                  <span className="border rounded px-3 py-2">{uploadingMembers ? 'Uploading…' : 'Upload CSV'}</span>
                </label>
              </div>
              <ul className="space-y-2">
                {members.map((member: any) => (
                  <li key={member.id} className="p-2 border rounded-lg flex justify-between items-center">
                    <span className="font-medium">{member.first_name} {member.last_name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-2">
                      {member.email}
                      <Button variant="outline" size="sm" onClick={() => removeMember(member.email)}>Remove</Button>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
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
              {loadingEvents && <div className="text-center text-muted-foreground">Loading events...</div>}
              {eventError && <div className="text-center text-red-500">{eventError}</div>}
              {!loadingEvents && !eventError && upcomingEvents.length === 0 && (
                <div className="text-center text-muted-foreground">No events found.</div>
              )}
              {upcomingEvents.map((event, index) => (
                <div key={event.id || index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title || event.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.date ? event.date : event.start_date} • {event.time ? event.time : event.start_time}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>{event.status || "upcoming"}</Badge>
                    {event.attendees && <p className="text-xs text-muted-foreground mt-1">{event.attendees} attendees</p>}
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
