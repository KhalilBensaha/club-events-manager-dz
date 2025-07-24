"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Calendar, MapPin, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

export default function EventsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const events = [
    {
      id: 1,
      title: "Tech Meetup 2024",
      description: "Join us for an exciting tech meetup featuring the latest in web development and AI.",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      location: "Tech Hub, Downtown",
      attendees: 45,
      maxAttendees: 100,
      organizer: "Tech Club",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=400&text=Tech+Meetup",
    },
    {
      id: 2,
      title: "Design Workshop",
      description: "Learn the fundamentals of UI/UX design in this hands-on workshop.",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Design Studio, Arts District",
      attendees: 23,
      maxAttendees: 30,
      organizer: "Design Club",
      category: "Design",
      image: "/placeholder.svg?height=200&width=400&text=Design+Workshop",
    },
    {
      id: 3,
      title: "Networking Event",
      description: "Connect with professionals from various industries in a relaxed setting.",
      date: "Dec 22, 2024",
      time: "7:00 PM",
      location: "Business Center, Midtown",
      attendees: 67,
      maxAttendees: 150,
      organizer: "Business Club",
      category: "Networking",
      image: "/placeholder.svg?height=200&width=400&text=Networking+Event",
    },
    {
      id: 4,
      title: "Photography Walk",
      description: "Explore the city through your lens with fellow photography enthusiasts.",
      date: "Dec 25, 2024",
      time: "10:00 AM",
      location: "City Park, Central",
      attendees: 18,
      maxAttendees: 25,
      organizer: "Photography Club",
      category: "Arts",
      image: "/placeholder.svg?height=200&width=400&text=Photography+Walk",
    },
    {
      id: 5,
      title: "Startup Pitch Night",
      description: "Watch innovative startups pitch their ideas to investors and mentors.",
      date: "Dec 28, 2024",
      time: "6:30 PM",
      location: "Innovation Hub, Tech District",
      attendees: 89,
      maxAttendees: 200,
      organizer: "Entrepreneur Club",
      category: "Business",
      image: "/placeholder.svg?height=200&width=400&text=Startup+Pitch",
    },
    {
      id: 6,
      title: "Book Club Meeting",
      description: "Discuss this month's book selection in a cozy, intellectual environment.",
      date: "Dec 30, 2024",
      time: "3:00 PM",
      location: "Library, University Campus",
      attendees: 12,
      maxAttendees: 20,
      organizer: "Literature Club",
      category: "Education",
      image: "/placeholder.svg?height=200&width=400&text=Book+Club",
    },
  ]

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">{t("events.title")}</h1>
          <p className="text-muted-foreground">{t("events.subtitle")}</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t("events.createEvent")}
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("events.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          {t("events.filter")}
        </Button>
      </motion.div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {event.category}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.attendees}/{event.maxAttendees} {t("events.attendees")}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full">{t("events.joinEvent")}</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12"
        >
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("events.noEvents")}</h3>
          <p className="text-muted-foreground">{t("events.noEventsDesc")}</p>
        </motion.div>
      )}
    </div>
  )
}
