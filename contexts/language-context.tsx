"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "english" | "french"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

type TranslationStrings = {
  [key: string]: string
}

const translations: Record<Language, TranslationStrings> = {
  english: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.events": "Events",
    "nav.clubs": "Clubs",
    "nav.profile": "Profile",
    "nav.settings": "Settings",
    "nav.clubInfo": "Club Info",
    "nav.navigation": "Navigation",
    "nav.logout": "Logout",

    // Home page
    "home.subtitle": "Connect, Discover, Participate",
    "home.badge": "New Platform",
    "home.title": "Welcome to Club Events",
    "home.description":
      "Discover amazing events, connect with like-minded people, and build lasting relationships in your community.",
    "home.userCard.title": "Join as User",
    "home.userCard.subtitle": "Discover & Participate",
    "home.userCard.description": "Find exciting events, join clubs, and connect with your community.",
    "home.userCard.feature1": "Browse and join events",
    "home.userCard.feature2": "Connect with clubs",
    "home.userCard.feature3": "Track your participation",
    "home.userCard.button": "Get Started",
    "home.clubCard.title": "Join as Club",
    "home.clubCard.subtitle": "Organize & Manage",
    "home.clubCard.description": "Create events, manage members, and grow your community.",
    "home.clubCard.feature1": "Create and manage events",
    "home.clubCard.feature2": "Manage club members",
    "home.clubCard.feature3": "Analytics and insights",
    "home.clubCard.button": "Start Managing",
    "home.features.title": "Why Choose Club Events?",
    "home.features.description": "Everything you need to manage and participate in club events.",
    "home.features.feature1.title": "Easy Event Management",
    "home.features.feature1.description": "Create, manage, and track events with our intuitive interface.",
    "home.features.feature2.title": "Community Building",
    "home.features.feature2.description": "Connect with like-minded people and build lasting relationships.",
    "home.features.feature3.title": "Smart Recommendations",
    "home.features.feature3.description": "Discover events and clubs that match your interests.",

    // Dashboard
    "dashboard.welcome": "Welcome back,",
    "dashboard.userSubtitle": "Here's what's happening in your community",
    "dashboard.clubSubtitle": "Manage your club and engage with members",
    "dashboard.joinEvent": "Join Event",
    "dashboard.createEvent": "Create Event",
    "dashboard.upcomingEvents": "Upcoming Events",
    "dashboard.upcomingEventsDesc": "Events you're attending or managing",
    "dashboard.viewAll": "View All",
    "dashboard.activityOverview": "Activity Overview",
    "dashboard.activityOverviewDesc": "Your engagement metrics",
    "dashboard.eventParticipation": "Event Participation",
    "dashboard.clubEngagement": "Club Engagement",
    "dashboard.networkingScore": "Networking Score",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.recentActivityDesc": "Your latest actions and updates",
    "dashboard.activity1": "Joined Tech Meetup 2024",
    "dashboard.activity2": "Updated profile information",
    "dashboard.activity3": "Connected with Design Club",
    "dashboard.stats.eventsAttended": "Events Attended",
    "dashboard.stats.clubsJoined": "Clubs Joined",
    "dashboard.stats.upcomingEvents": "Upcoming Events",
    "dashboard.stats.eventsCreated": "Events Created",
    "dashboard.stats.totalMembers": "Total Members",
    "dashboard.stats.engagement": "Engagement Rate",

    // Events
    "events.title": "Discover Events",
    "events.subtitle": "Find and join exciting events in your community",
    "events.searchPlaceholder": "Search events...",
    "events.filter": "Filter",
    "events.createEvent": "Create Event",
    "events.noEvents": "No events found",
    "events.noEventsDesc": "Try adjusting your search or filters",
    "events.joinEvent": "Join Event",
    "events.eventDetails": "Event Details",
    "events.attendees": "attendees",
    "events.date": "Date",
    "events.time": "Time",
    "events.location": "Location",
    "events.organizer": "Organizer",

    // Clubs
    "clubs.title": "Explore Clubs",
    "clubs.subtitle": "Discover and join amazing clubs",
    "clubs.searchPlaceholder": "Search clubs...",
    "clubs.filter": "Filter",
    "clubs.createClub": "Create Club",
    "clubs.noClubs": "No clubs found",
    "clubs.noClubsDesc": "Try adjusting your search or filters",
    "clubs.joinClub": "Join Club",
    "clubs.clubDetails": "Club Details",
    "clubs.members": "members",
    "clubs.events": "events",
    "clubs.category": "Category",
    "clubs.founded": "Founded",

    // Profile
    "profile.title": "Profile",
    "profile.subtitle": "Manage your personal information",
    "profile.edit": "Edit Profile",
    "profile.personalInfo": "Personal Information",
    "profile.personalInfoDesc": "Update your personal details",
    "profile.name": "Name",
    "profile.email": "Email",
    "profile.phone": "Phone",
    "profile.location": "Location",
    "profile.bio": "Bio",
    "profile.joinedIn": "Joined in",
    "profile.activityStats": "Activity Statistics",
    "profile.activityStatsDesc": "Your participation overview",
    "profile.eventsAttended": "Events Attended",
    "profile.clubsJoined": "Clubs Joined",
    "profile.recentActivity": "Recent Activity",
    "profile.recentActivityDesc": "Your latest actions",
    "profile.activity1": "Attended Web Development Workshop",
    "profile.activity2": "Joined Photography Club",
    "profile.activity3": "Updated profile information",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Customize your experience",
    "settings.language": "Language",
    "settings.languageDesc": "Choose your preferred language",
    "settings.theme": "Theme",
    "settings.themeDesc": "Choose your preferred theme",
    "settings.notifications": "Notifications",
    "settings.notificationsDesc": "Manage your notification preferences",
    "settings.emailNotifications": "Email Notifications",
    "settings.pushNotifications": "Push Notifications",
    "settings.eventReminders": "Event Reminders",
    "settings.clubUpdates": "Club Updates",
    "settings.privacy": "Privacy",
    "settings.privacyDesc": "Control your privacy settings",
    "settings.profileVisibility": "Profile Visibility",
    "settings.showEmail": "Show Email",
    "settings.showPhone": "Show Phone",
    "settings.account": "Account",
    "settings.accountDesc": "Manage your account settings",
    "settings.changePassword": "Change Password",
    "settings.deleteAccount": "Delete Account",
    "settings.dangerZone": "Danger Zone",
    "settings.dangerZoneDesc": "Irreversible actions",

    // Common
    "common.loading": "Loading...",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.confirm": "Confirm",
    "common.close": "Close",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.reset": "Reset",
    "common.clear": "Clear",
    "common.apply": "Apply",
    "common.accept": "Accept",
    "common.decline": "Decline",
  },
  french: {
    // Navigation
    "nav.dashboard": "Tableau de bord",
    "nav.events": "Événements",
    "nav.clubs": "Clubs",
    "nav.profile": "Profil",
    "nav.settings": "Paramètres",
    "nav.clubInfo": "Info Club",
    "nav.navigation": "Navigation",
    "nav.logout": "Déconnexion",

    // Home page
    "home.subtitle": "Connectez, Découvrez, Participez",
    "home.badge": "Nouvelle Plateforme",
    "home.title": "Bienvenue aux Événements Club",
    "home.description":
      "Découvrez des événements incroyables, connectez-vous avec des personnes partageant les mêmes idées et construisez des relations durables dans votre communauté.",
    "home.userCard.title": "Rejoindre en tant qu'Utilisateur",
    "home.userCard.subtitle": "Découvrir et Participer",
    "home.userCard.description":
      "Trouvez des événements passionnants, rejoignez des clubs et connectez-vous avec votre communauté.",
    "home.userCard.feature1": "Parcourir et rejoindre des événements",
    "home.userCard.feature2": "Se connecter avec des clubs",
    "home.userCard.feature3": "Suivre votre participation",
    "home.userCard.button": "Commencer",
    "home.clubCard.title": "Rejoindre en tant que Club",
    "home.clubCard.subtitle": "Organiser et Gérer",
    "home.clubCard.description": "Créez des événements, gérez les membres et développez votre communauté.",
    "home.clubCard.feature1": "Créer et gérer des événements",
    "home.clubCard.feature2": "Gérer les membres du club",
    "home.clubCard.feature3": "Analyses et insights",
    "home.clubCard.button": "Commencer à Gérer",
    "home.features.title": "Pourquoi Choisir Club Events?",
    "home.features.description": "Tout ce dont vous avez besoin pour gérer et participer aux événements de club.",
    "home.features.feature1.title": "Gestion d'Événements Facile",
    "home.features.feature1.description": "Créez, gérez et suivez les événements avec notre interface intuitive.",
    "home.features.feature2.title": "Construction de Communauté",
    "home.features.feature2.description":
      "Connectez-vous avec des personnes partageant les mêmes idées et construisez des relations durables.",
    "home.features.feature3.title": "Recommandations Intelligentes",
    "home.features.feature3.description": "Découvrez des événements et des clubs qui correspondent à vos intérêts.",

    // Dashboard
    "dashboard.welcome": "Bon retour,",
    "dashboard.userSubtitle": "Voici ce qui se passe dans votre communauté",
    "dashboard.clubSubtitle": "Gérez votre club et engagez-vous avec les membres",
    "dashboard.joinEvent": "Rejoindre l'Événement",
    "dashboard.createEvent": "Créer un Événement",
    "dashboard.upcomingEvents": "Événements à Venir",
    "dashboard.upcomingEventsDesc": "Événements auxquels vous assistez ou que vous gérez",
    "dashboard.viewAll": "Voir Tout",
    "dashboard.activityOverview": "Aperçu de l'Activité",
    "dashboard.activityOverviewDesc": "Vos métriques d'engagement",
    "dashboard.eventParticipation": "Participation aux Événements",
    "dashboard.clubEngagement": "Engagement du Club",
    "dashboard.networkingScore": "Score de Réseautage",
    "dashboard.recentActivity": "Activité Récente",
    "dashboard.recentActivityDesc": "Vos dernières actions et mises à jour",
    "dashboard.activity1": "Rejoint Tech Meetup 2024",
    "dashboard.activity2": "Informations de profil mises à jour",
    "dashboard.activity3": "Connecté avec Design Club",
    "dashboard.stats.eventsAttended": "Événements Assistés",
    "dashboard.stats.clubsJoined": "Clubs Rejoints",
    "dashboard.stats.upcomingEvents": "Événements à Venir",
    "dashboard.stats.eventsCreated": "Événements Créés",
    "dashboard.stats.totalMembers": "Total des Membres",
    "dashboard.stats.engagement": "Taux d'Engagement",

    // Events
    "events.title": "Découvrir les Événements",
    "events.subtitle": "Trouvez et rejoignez des événements passionnants dans votre communauté",
    "events.searchPlaceholder": "Rechercher des événements...",
    "events.filter": "Filtrer",
    "events.createEvent": "Créer un Événement",
    "events.noEvents": "Aucun événement trouvé",
    "events.noEventsDesc": "Essayez d'ajuster votre recherche ou vos filtres",
    "events.joinEvent": "Rejoindre l'Événement",
    "events.eventDetails": "Détails de l'Événement",
    "events.attendees": "participants",
    "events.date": "Date",
    "events.time": "Heure",
    "events.location": "Lieu",
    "events.organizer": "Organisateur",

    // Clubs
    "clubs.title": "Explorer les Clubs",
    "clubs.subtitle": "Découvrez et rejoignez des clubs formidables",
    "clubs.searchPlaceholder": "Rechercher des clubs...",
    "clubs.filter": "Filtrer",
    "clubs.createClub": "Créer un Club",
    "clubs.noClubs": "Aucun club trouvé",
    "clubs.noClubsDesc": "Essayez d'ajuster votre recherche ou vos filtres",
    "clubs.joinClub": "Rejoindre le Club",
    "clubs.clubDetails": "Détails du Club",
    "clubs.members": "membres",
    "clubs.events": "événements",
    "clubs.category": "Catégorie",
    "clubs.founded": "Fondé",

    // Profile
    "profile.title": "Profil",
    "profile.subtitle": "Gérez vos informations personnelles",
    "profile.edit": "Modifier le Profil",
    "profile.personalInfo": "Informations Personnelles",
    "profile.personalInfoDesc": "Mettez à jour vos détails personnels",
    "profile.name": "Nom",
    "profile.email": "Email",
    "profile.phone": "Téléphone",
    "profile.location": "Lieu",
    "profile.bio": "Bio",
    "profile.joinedIn": "Rejoint en",
    "profile.activityStats": "Statistiques d'Activité",
    "profile.activityStatsDesc": "Aperçu de votre participation",
    "profile.eventsAttended": "Événements Assistés",
    "profile.clubsJoined": "Clubs Rejoints",
    "profile.recentActivity": "Activité Récente",
    "profile.recentActivityDesc": "Vos dernières actions",
    "profile.activity1": "Assisté à l'Atelier de Développement Web",
    "profile.activity2": "Rejoint le Club de Photographie",
    "profile.activity3": "Informations de profil mises à jour",

    // Settings
    "settings.title": "Paramètres",
    "settings.subtitle": "Personnalisez votre expérience",
    "settings.language": "Langue",
    "settings.languageDesc": "Choisissez votre langue préférée",
    "settings.theme": "Thème",
    "settings.themeDesc": "Choisissez votre thème préféré",
    "settings.notifications": "Notifications",
    "settings.notificationsDesc": "Gérez vos préférences de notification",
    "settings.emailNotifications": "Notifications Email",
    "settings.pushNotifications": "Notifications Push",
    "settings.eventReminders": "Rappels d'Événements",
    "settings.clubUpdates": "Mises à Jour du Club",
    "settings.privacy": "Confidentialité",
    "settings.privacyDesc": "Contrôlez vos paramètres de confidentialité",
    "settings.profileVisibility": "Visibilité du Profil",
    "settings.showEmail": "Afficher l'Email",
    "settings.showPhone": "Afficher le Téléphone",
    "settings.account": "Compte",
    "settings.accountDesc": "Gérez vos paramètres de compte",
    "settings.changePassword": "Changer le Mot de Passe",
    "settings.deleteAccount": "Supprimer le Compte",
    "settings.dangerZone": "Zone de Danger",
    "settings.dangerZoneDesc": "Actions irréversibles",

    // Common
    "common.loading": "Chargement...",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.edit": "Modifier",
    "common.delete": "Supprimer",
    "common.confirm": "Confirmer",
    "common.close": "Fermer",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.submit": "Soumettre",
    "common.reset": "Réinitialiser",
    "common.clear": "Effacer",
    "common.apply": "Appliquer",
    "common.accept": "Accepter",
    "common.decline": "Refuser",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("english")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "english" || savedLanguage === "french")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
