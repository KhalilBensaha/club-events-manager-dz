"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MapPin, Calendar, Edit, Save, X, Trophy, Award, Target, Activity, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"

export default function ProfilePage() {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate about technology and innovation. Love participating in hackathons and tech meetups.",
    joinDate: "January 2023",
    eventsAttended: 12,
    clubsJoined: 5,
  })

  const achievements = [
    {
      id: 1,
      title: "Event Enthusiast",
      description: "Attended 10+ events",
      icon: Trophy,
      date: "Nov 2024",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      id: 2,
      title: "Community Builder",
      description: "Joined 5+ clubs",
      icon: Users,
      date: "Oct 2024",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      id: 3,
      title: "Active Participant",
      description: "Consistent engagement",
      icon: Target,
      date: "Sep 2024",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      id: 4,
      title: "Early Adopter",
      description: "One of the first members",
      icon: Award,
      date: "Jan 2023",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Joined Tech Innovation Meetup",
      time: "2 hours ago",
      type: "event",
      color: "bg-green-500",
    },
    {
      id: 2,
      action: "Completed profile setup",
      time: "1 day ago",
      type: "profile",
      color: "bg-blue-500",
    },
    {
      id: 3,
      action: "Joined Design Thinking Club",
      time: "3 days ago",
      type: "club",
      color: "bg-purple-500",
    },
    {
      id: 4,
      action: "Attended Startup Workshop",
      time: "1 week ago",
      type: "event",
      color: "bg-orange-500",
    },
    {
      id: 5,
      action: "Updated location preferences",
      time: "2 weeks ago",
      type: "profile",
      color: "bg-gray-500",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to your backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Profile Summary Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-2xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-1">{profile.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">Member since {profile.joinDate}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {profile.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content with Tabs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-3"
        >
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and bio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          rows={4}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="flex items-center gap-2">
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                          <p className="mt-1 text-sm">{profile.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                          <p className="mt-1 text-sm">{profile.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                          <p className="mt-1 text-sm">{profile.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                          <p className="mt-1 text-sm">{profile.location}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                        <p className="mt-1 text-sm">{profile.bio}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${achievement.bgColor}`}>
                            <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            <Badge variant="secondary" className="text-xs">
                              {achievement.date}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Stats Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Stats</CardTitle>
                  <CardDescription>Your overall progress and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{profile.eventsAttended}</div>
                      <p className="text-sm text-muted-foreground">Events Attended</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{profile.clubsJoined}</div>
                      <p className="text-sm text-muted-foreground">Clubs Joined</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{achievements.length}</div>
                      <p className="text-sm text-muted-foreground">Achievements Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions and engagements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                      >
                        <div className={`w-3 h-3 rounded-full ${activity.color}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {activity.type}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Summary */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">24</div>
                    <p className="text-sm text-muted-foreground">Total Actions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">7d</div>
                    <p className="text-sm text-muted-foreground">Most Active</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">92%</div>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
