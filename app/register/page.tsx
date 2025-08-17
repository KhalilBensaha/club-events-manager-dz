"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, ArrowLeft, User, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

function RegisterContent() {
  const [userType, setUserType] = useState<"PERSON" | "CLUB">("PERSON")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  // Person form fields
  const [personForm, setPersonForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
  lastName: "",
  phone: "",
  university: "",
  major: "",
  year: 1 as number,
  city: ""
  })

  // Club form fields
  const [clubForm, setClubForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  description: "",
  university: "",
  address: "",
  phone: ""
  })
  
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    const type = (searchParams?.get("type") || "PERSON").toUpperCase()
    if (type === "PERSON" || type === "CLUB") {
      setUserType(type as "PERSON" | "CLUB")
    }
  }, [searchParams])
  const { registerPerson, registerClub } = useAuth()
  const { t } = useLanguage()

  const handlePersonSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    if (personForm.password !== personForm.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const userData = {
        email: personForm.email,
        password: personForm.password
      }
      
      const personData = {
  full_name: `${personForm.firstName} ${personForm.lastName}`.trim(),
  university: personForm.university,
  phone: personForm.phone,
  major: personForm.major,
  year: Number(personForm.year),
  city: personForm.city
      }

      const success = await registerPerson(userData, personData)
      if (success) {
        setSuccess("Registration successful! You can now log in.")
        setPersonForm({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          phone: "",
          university: "",
          major: "",
          year: 1,
          city: ""
        })
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (error) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    if (clubForm.password !== clubForm.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const userData = {
        email: clubForm.email,
        password: clubForm.password
      }
      
      const clubData = {
  name: clubForm.name,
  description: clubForm.description,
  university: clubForm.university,
  address: clubForm.address,
  phone: clubForm.phone
      }

      const success = await registerClub(userData, clubData)
      if (success) {
        setSuccess("Registration successful! You can now log in.")
        setClubForm({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          description: "",
          university: "",
          address: "",
          phone: ""
        })
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (error) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* page content */}
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription>
              Join our community and start your journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "PERSON" | "CLUB")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="PERSON" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Person
                </TabsTrigger>
                <TabsTrigger value="CLUB" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Club
                </TabsTrigger>
              </TabsList>

              <TabsContent value="PERSON">
                <form onSubmit={handlePersonSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={personForm.firstName}
                        onChange={(e) => setPersonForm(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={personForm.lastName}
                        onChange={(e) => setPersonForm(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        placeholder="Enter university"
                        value={personForm.university}
                        onChange={(e) => setPersonForm(prev => ({ ...prev, university: e.target.value }))}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        placeholder="Enter major"
                        value={personForm.major}
                        onChange={(e) => setPersonForm(prev => ({ ...prev, major: e.target.value }))}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year (1-5)</Label>
                      <Input
                        id="year"
                        type="number"
                        min={1}
                        max={5}
                        placeholder="Enter year"
                        value={personForm.year}
                        onChange={(e) => setPersonForm(prev => ({ ...prev, year: Number(e.target.value) }))}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={personForm.city}
                        onChange={(e) => setPersonForm(prev => ({ ...prev, city: e.target.value }))}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={personForm.email}
                      onChange={(e) => setPersonForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={personForm.phone}
                      onChange={(e) => setPersonForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={personForm.password}
                      onChange={(e) => setPersonForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={personForm.confirmPassword}
                      onChange={(e) => setPersonForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Person Account"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="CLUB">
                <form onSubmit={handleClubSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clubName">Club Name</Label>
                    <Input
                      id="clubName"
                      placeholder="Enter club name"
                      value={clubForm.name}
                      onChange={(e) => setClubForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clubUniversity">University</Label>
                      <Input
                        id="clubUniversity"
                        placeholder="Enter university"
                        value={clubForm.university}
                        onChange={(e) => setClubForm(prev => ({ ...prev, university: e.target.value }))}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clubPhone">Phone</Label>
                      <Input
                        id="clubPhone"
                        placeholder="Enter phone"
                        value={clubForm.phone}
                        onChange={(e) => setClubForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clubAddress">Address</Label>
                    <Input
                      id="clubAddress"
                      placeholder="Enter address"
                      value={clubForm.address}
                      onChange={(e) => setClubForm(prev => ({ ...prev, address: e.target.value }))}
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your club"
                      value={clubForm.description}
                      onChange={(e) => setClubForm(prev => ({ ...prev, description: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clubEmail">Email</Label>
                    <Input
                      id="clubEmail"
                      type="email"
                      placeholder="Enter club email"
                      value={clubForm.email}
                      onChange={(e) => setClubForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clubPassword">Password</Label>
                    <Input
                      id="clubPassword"
                      type="password"
                      placeholder="Enter password"
                      value={clubForm.password}
                      onChange={(e) => setClubForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clubConfirmPassword">Confirm Password</Label>
                    <Input
                      id="clubConfirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={clubForm.confirmPassword}
                      onChange={(e) => setClubForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Club Account...
                      </>
                    ) : (
                      "Create Club Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                {success}
              </div>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>}>
      <RegisterContent />
    </Suspense>
  )
}
