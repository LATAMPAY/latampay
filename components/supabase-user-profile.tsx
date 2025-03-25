"use client"

import { useState, useEffect } from "react"
import { supabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle, LogOut } from "lucide-react"

export default function SupabaseUserProfile() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabaseClient.auth.getUser()

        if (userError) throw userError
        if (!user) return setLoading(false)

        setUser(user)

        // Get user profile from our custom table
        const { data: userData, error: profileError } = await supabaseClient
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") throw profileError

        if (userData) {
          setFullName(userData.full_name || "")
        }

        // Get extended profile
        const { data: profileData, error: extendedProfileError } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (extendedProfileError && extendedProfileError.code !== "PGRST116") throw extendedProfileError

        if (profileData) {
          setProfile(profileData)
          setPhone(profileData.phone || "")
          setAddress(profileData.address || "")
        }
      } catch (err) {
        console.error("Error fetching user profile:", err)
        setError("Failed to load user profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndProfile()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null)
        setProfile(null)
      } else if (event === "SIGNED_IN" && session) {
        setUser(session.user)
        fetchUserAndProfile()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const updateProfile = async () => {
    if (!user) return

    setUpdating(true)
    setError(null)
    setSuccess(null)

    try {
      // Update user metadata
      const { error: userUpdateError } = await supabaseClient
        .from("users")
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (userUpdateError) throw userUpdateError

      // Update profile
      const { error: profileUpdateError } = await supabaseClient
        .from("profiles")
        .update({
          phone,
          address,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)

      if (profileUpdateError) throw profileUpdateError

      setSuccess("Profile updated successfully")
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err.message || "Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <p className="text-center mt-2">Loading profile...</p>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-center">Please log in to view your profile</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your LatamPay account information</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              <span className="font-medium">Account Type:</span>{" "}
              {profile?.account_type || user.user_metadata?.account_type || "Not specified"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your address"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={updateProfile} disabled={updating} className="w-full">
          {updating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

