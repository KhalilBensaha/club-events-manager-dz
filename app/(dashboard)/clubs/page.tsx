"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Users, Calendar, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"

export default function ClubsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const clubs = [
    {
      id: 1,
      name: "Tech Club",
      description: "A community of technology enthusiasts exploring the latest in web development, AI, and innovation.",
      members: 156,
      events: 24,
      category: "Technology",
      founded: "2020",
      location: "Downtown",
      rating: 4.8,
      avatar: "/placeholder.svg?height=80&width=80&text=TC",
    },
    {
      id: 2,
      name: "Design Club",
      description: "Creative minds coming together to share design knowledge, techniques, and inspiration.",
      members: 89,
      events: 18,
      category: "Design",
      founded: "2021",
      location: "Arts District",
      rating: 4.6,
      avatar: "/placeholder.svg?height=80&width=80&text=DC",
    },
    {
      id: 3,
      name: "Business Club",
      description: "Networking and professional development for business professionals and entrepreneurs.",
      members: 234,
      events: 32,
      category: "Business",
      founded: "2019",
      location: "Business District",
      rating: 4.9,
      avatar: "/placeholder.svg?height=80&width=80&text=BC",
    },
    {
      id: 4,
      name: "Photography Club",
      description: "Capture the world through your lens with fellow photography enthusiasts and professionals.",
      members: 67,
      events: 15,
      category: "Arts",
      founded: "2022",
      location: "City Center",
      rating: 4.7,
      avatar: "/placeholder.svg?height=80&width=80&text=PC",
    },
    {
      id: 5,
      name: "Entrepreneur Club",
      description: "Supporting startup founders and aspiring entrepreneurs with mentorship and resources.",
      members: 123,
      events: 28,
      category: "Business",
      founded: "2020",
      location: "Innovation Hub",
      rating: 4.5,
      avatar: "/placeholder.svg?height=80&width=80&text=EC",
    },
    {
      id: 6,
      name: "Literature Club",
      description: "Book lovers unite! Discuss literature, share recommendations, and explore new genres.",
      members: 45,
      events: 12,
      category: "Education",
      founded: "2021",
      location: "University Campus",
      rating: 4.4,
      avatar: "/placeholder.svg?height=80&width=80&text=LC",
    },
  ]

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">{t("clubs.title")}</h1>
          <p className="text-muted-foreground">{t("clubs.subtitle")}</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t("clubs.createClub")}
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
            placeholder={t("clubs.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          {t("clubs.filter")}
        </Button>
      </motion.div>

      {/* Clubs Grid */}
      {filteredClubs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={club.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{club.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1">{club.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{club.rating}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{club.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{club.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {club.members} {t("clubs.members")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {club.events} {t("clubs.events")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{club.location}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("clubs.founded")} {club.founded}
                    </div>
                  </div>
                  <Button className="w-full">{t("clubs.joinClub")}</Button>
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
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("clubs.noClubs")}</h3>
          <p className="text-muted-foreground">{t("clubs.noClubsDesc")}</p>
        </motion.div>
      )}
    </div>
  )
}
