"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, Plus, Search, Filter, ChevronDown, ChevronUp, Check, X as XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { ProtectedRoute } from "@/components/protected-route"
import { apiService } from "@/lib/api"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Event {
  id: number
  name: string
  description: string
  date_start: string
  date_end: string
  venue: string
  event_type: string
  club_name: string
  image_url?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { user } = useAuth()
  const isClub = user?.user_type === "CLUB"
  const [creating, setCreating] = useState(false)
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    venue: "",
    date_start: "",
    date_end: "",
    event_type: "INTERNAL",
    content: "",
    sheet: "",
  })
  const [submittingCreate, setSubmittingCreate] = useState(false)
  const [expandingApps, setExpandingApps] = useState<Record<number, boolean>>({})
  const [appsByEvent, setAppsByEvent] = useState<Record<number, any[]>>({})
  const [loadingAppsFor, setLoadingAppsFor] = useState<number | null>(null)
  const [uploadingImageFor, setUploadingImageFor] = useState<number | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await apiService.getEvents()
      if (response.data) {
        setEvents(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplyToEvent = async (eventId: number) => {
    try {
      const application = {
        motivation: "I'm interested in this event and would like to participate.",
      }
      const responses: any[] = []
      const response = await apiService.applyToEvent(eventId, application)
      if (response.data) {
        alert("Application submitted successfully!")
      } else {
        alert("Failed to submit application. Please try again.")
      }
    } catch (error) {
      console.error('Failed to apply to event:', error)
      alert("Failed to submit application. Please try again.")
    }
  }

  const toggleApplications = async (eventId: number) => {
    setExpandingApps(prev => ({ ...prev, [eventId]: !prev[eventId] }))
    if (!appsByEvent[eventId]) {
      setLoadingAppsFor(eventId)
      const res = await apiService.getEventApplications(eventId)
      if (!res.error) {
        setAppsByEvent(prev => ({ ...prev, [eventId]: res.data || [] }))
      }
      setLoadingAppsFor(null)
    }
  }

  const acceptApp = async (appId: number, eventId: number) => {
    const res = await apiService.acceptApplication(appId)
    if (!res.error) {
      // update local
      setAppsByEvent(prev => ({
        ...prev,
        [eventId]: (prev[eventId] || []).map(a => a.id === appId ? { ...a, status: 'ACCEPTED' } : a)
      }))
    } else alert(res.error)
  }

  const rejectApp = async (appId: number, eventId: number) => {
    const res = await apiService.rejectApplication(appId)
    if (!res.error) {
      setAppsByEvent(prev => ({
        ...prev,
        [eventId]: (prev[eventId] || []).map(a => a.id === appId ? { ...a, status: 'REJECTED' } : a)
      }))
    } else alert(res.error)
  }

  const submitCreate = async () => {
    setSubmittingCreate(true)
    try {
      const payload = {
        ...createForm,
        date_start: new Date(createForm.date_start).toISOString(),
        date_end: new Date(createForm.date_end).toISOString(),
      }
      const res = await apiService.createEvent(payload)
      if (res.error) throw new Error(res.error)
      await fetchEvents()
      setCreating(false)
      setCreateForm({ name: "", description: "", venue: "", date_start: "", date_end: "", event_type: "INTERNAL", content: "", sheet: "" })
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to create event')
    } finally {
      setSubmittingCreate(false)
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.event_type === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "INTERNAL", label: "Internal" },
    { value: "EXTERNAL", label: "External" }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const uploadEventImage = async (eventId: number, file?: File) => {
    if (!file) return
    setUploadingImageFor(eventId)
    const res = await apiService.attachImageToEvent(eventId, file)
    if (res.error) alert(res.error)
    else await fetchEvents()
    setUploadingImageFor(null)
  }

  const deleteEventImage = async (eventId: number) => {
    const res = await apiService.deleteEventImage(eventId)
    if (res.error) alert(res.error)
    else await fetchEvents()
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p>Loading events...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.user_type === "PERSON" ? "Discover and join exciting events" : "Manage your club events"}
            </p>
          </div>
          {isClub && (
            <Button onClick={() => setCreating(v => !v)} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {creating ? 'Close' : 'Create Event'}
            </Button>
          )}
        </div>

        {isClub && creating && (
          <Card className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Venue</Label>
                <Input value={createForm.venue} onChange={(e) => setCreateForm({ ...createForm, venue: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Start</Label>
                <Input type="datetime-local" value={createForm.date_start} onChange={(e) => setCreateForm({ ...createForm, date_start: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>End</Label>
                <Input type="datetime-local" value={createForm.date_end} onChange={(e) => setCreateForm({ ...createForm, date_end: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Type</Label>
                <select className="w-full rounded-md border px-3 py-2 bg-background" value={createForm.event_type} onChange={(e) => setCreateForm({ ...createForm, event_type: e.target.value })}>
                  <option value="INTERNAL">INTERNAL</option>
                  <option value="EXTERNAL">EXTERNAL</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label>Sheet</Label>
                <Input value={createForm.sheet} onChange={(e) => setCreateForm({ ...createForm, sheet: e.target.value })} placeholder="e.g. Google Sheet link or ref" />
              </div>
            </div>
            <div className="space-y-1 mt-4">
              <Label>Description</Label>
              <Textarea rows={3} value={createForm.description} onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })} />
            </div>
            <div className="space-y-1 mt-4">
              <Label>Content</Label>
              <Textarea rows={4} value={createForm.content} onChange={(e) => setCreateForm({ ...createForm, content: e.target.value })} />
            </div>
            <div className="mt-4">
              <Button disabled={submittingCreate} onClick={submitCreate}>{submittingCreate ? 'Creating...' : 'Create'}</Button>
            </div>
          </Card>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {event.image_url && (
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL || 'https://clubio.onrender.com'}/uploads/events/${event.image_url}`}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {event.description}
                        </CardDescription>
                      </div>
                      <Badge variant={event.event_type === "INTERNAL" ? "secondary" : "default"}>
                        {event.event_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date_start)} - {formatDate(event.date_end)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>Organized by {event.club_name}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      {user?.user_type === "PERSON" ? (
                        <Button 
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          onClick={() => handleApplyToEvent(event.id)}
                        >
                          Apply Now
                        </Button>
                      ) : (
                        <div className="flex-1 flex gap-2 flex-wrap">
                          <Button variant="outline" className="flex-1" onClick={() => toggleApplications(event.id)}>
                            {expandingApps[event.id] ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                            Applications
                          </Button>
                          <label className="flex-1">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadEventImage(event.id, e.target.files?.[0])} />
                            <span className="inline-flex w-full h-9 py-2 items-center justify-center rounded-md border px-3 text-sm cursor-pointer">
                              {uploadingImageFor === event.id ? 'Uploading…' : 'Upload Image'}
                            </span>
                          </label>
                          {event.image_url && (
                            <Button variant="outline" className="flex-1" onClick={() => deleteEventImage(event.id)}>
                              <XIcon className="w-4 h-4 mr-1" /> Delete Image
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    {isClub && expandingApps[event.id] && (
                      <div className="mt-4 border-t pt-4">
                        {loadingAppsFor === event.id ? (
                          <div className="text-sm text-muted-foreground">Loading applications...</div>
                        ) : (appsByEvent[event.id]?.length ?? 0) === 0 ? (
                          <div className="text-sm text-muted-foreground">No applications yet.</div>
                        ) : (
                          <div className="space-y-2">
                            {(appsByEvent[event.id] || []).map((app) => (
                              <div key={app.id} className="flex items-center justify-between p-2 rounded-md border">
                                <div>
                                  <div className="font-medium">{app.email || app.user_email || 'Applicant'}</div>
                                  <div className="text-xs text-muted-foreground">{app.motivation}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">{app.status}</Badge>
                                  <Button size="sm" variant="outline" onClick={() => acceptApp(app.id, event.id)} disabled={app.status !== 'PENDING'}>
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => rejectApp(app.id, event.id)} disabled={app.status !== 'PENDING'}>
                                    <XIcon className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </ProtectedRoute>
  )
}
