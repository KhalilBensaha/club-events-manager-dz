"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Users, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"
import api from "@/lib/api"

type Club = {
  id: number
  name: string
  description: string
  phone: string
  university: string
  address: string
  image_url?: string | null
  user: { email: string }
}

export default function ClubsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      const res = await api.getAllClubs()
      if (res.error) setError(res.error)
      else setClubs(res.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return clubs.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.university.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q)
    )
  }, [clubs, searchQuery])

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
        {/* <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t("clubs.createClub")}
        </Button> */}
      </motion.div>

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

      {loading && <div className="text-muted-foreground">Loading clubs…</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (index + 1) }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={club.image_url ? `${process.env.NEXT_PUBLIC_API_URL || 'https://clubio.onrender.com'}/uploads/clubs/${club.image_url}` : "/placeholder.svg"} />
                        <AvatarFallback>{club.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="line-clamp-1">{club.name}</CardTitle>
                        <div className="text-xs text-muted-foreground">{club.university}</div>
                      </div>
                      <Badge variant="secondary">{club.phone}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{club.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{club.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{club.user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Contact</span>
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
        )
      )}
    </div>
  )
}
