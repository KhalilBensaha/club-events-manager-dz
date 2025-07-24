"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Users, Sparkles, ArrowRight, Globe, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"

export default function HomePage() {
  const [userType, setUserType] = useState<"user" | "club" | null>(null)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const savedUserType = localStorage.getItem("userType") as "user" | "club" | null
    if (savedUserType) {
      router.push("/dashboard")
    }
  }, [router])

  const handleUserTypeSelect = (type: "user" | "club") => {
    setUserType(type)
    localStorage.setItem("userType", type)
    router.push("/dashboard")
  }

  const toggleLanguage = () => {
    const newLanguage = language === "english" ? "french" : "english"
    setLanguage(newLanguage)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Club Events</h1>
            <p className="text-sm text-muted-foreground">{t("home.subtitle")}</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-transparent"
          >
            <Globe className="w-4 h-4" />
            {language === "english" ? "Français" : "English"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Badge variant="secondary" className="mb-4">
              {t("home.badge")}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">{t("home.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{t("home.description")}</p>
          </motion.div>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t("home.userCard.title")}</CardTitle>
                    <CardDescription>{t("home.userCard.subtitle")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-6">{t("home.userCard.description")}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {t("home.userCard.feature1")}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {t("home.userCard.feature2")}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {t("home.userCard.feature3")}
                  </li>
                </ul>
                <Button
                  onClick={() => handleUserTypeSelect("user")}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
                >
                  {t("home.userCard.button")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t("home.clubCard.title")}</CardTitle>
                    <CardDescription>{t("home.clubCard.subtitle")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-6">{t("home.clubCard.description")}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {t("home.clubCard.feature1")}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {t("home.clubCard.feature2")}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {t("home.clubCard.feature3")}
                  </li>
                </ul>
                <Button
                  onClick={() => handleUserTypeSelect("club")}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0"
                >
                  {t("home.clubCard.button")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">{t("home.features.title")}</h3>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">{t("home.features.description")}</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">{t("home.features.feature1.title")}</h4>
              <p className="text-sm text-muted-foreground">{t("home.features.feature1.description")}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">{t("home.features.feature2.title")}</h4>
              <p className="text-sm text-muted-foreground">{t("home.features.feature2.description")}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">{t("home.features.feature3.title")}</h4>
              <p className="text-sm text-muted-foreground">{t("home.features.feature3.description")}</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
