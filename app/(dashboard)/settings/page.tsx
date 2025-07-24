"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, Moon, Sun, Bell, Shield, User, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    eventReminders: true,
    clubUpdates: true,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">{t("settings.title")}</h1>
          <p className="text-muted-foreground">{t("settings.subtitle")}</p>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Language & Theme */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t("settings.language")}
              </CardTitle>
              <CardDescription>{t("settings.languageDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={(value: "english" | "french") => setLanguage(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                {t("settings.theme")}
              </CardTitle>
              <CardDescription>{t("settings.themeDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t("settings.privacy")}
              </CardTitle>
              <CardDescription>{t("settings.privacyDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="profile-visible">{t("settings.profileVisibility")}</Label>
                <Switch
                  id="profile-visible"
                  checked={privacy.profileVisible}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-email">{t("settings.showEmail")}</Label>
                <Switch
                  id="show-email"
                  checked={privacy.showEmail}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-phone">{t("settings.showPhone")}</Label>
                <Switch
                  id="show-phone"
                  checked={privacy.showPhone}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications & Account */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t("settings.notifications")}
              </CardTitle>
              <CardDescription>{t("settings.notificationsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">{t("settings.emailNotifications")}</Label>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">{t("settings.pushNotifications")}</Label>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="event-reminders">{t("settings.eventReminders")}</Label>
                <Switch
                  id="event-reminders"
                  checked={notifications.eventReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, eventReminders: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="club-updates">{t("settings.clubUpdates")}</Label>
                <Switch
                  id="club-updates"
                  checked={notifications.clubUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, clubUpdates: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t("settings.account")}
              </CardTitle>
              <CardDescription>{t("settings.accountDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                {t("settings.changePassword")}
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                {t("settings.dangerZone")}
              </CardTitle>
              <CardDescription>{t("settings.dangerZoneDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                {t("settings.deleteAccount")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
