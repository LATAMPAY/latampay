"use client"

import { useEffect, useState } from "react"
import { Loader2, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSupabaseAuth } from "@/components/supabase-auth-provider"
import { supabaseClient } from "@/lib/supabase/client"

export function UserProfile() {
  const { user } = useSupabaseAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      loadUserProfile()
    }
  }, [user])

  const loadUserProfile = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Get user data from the users table
      const { data: userData, error: userError } = await supabaseClient
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single()

      if (userError) throw userError

      if (userData) {
        setFullName(userData.full_name || "")
      }

      // Get profile data from the profiles table
      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single()

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError
      }

      if (profileData) {
        setPhone(profileData.phone || "")
        setAddress(profileData.address || "")
      }
    } catch (err: any) {
      console.error("Error loading profile:", err)
      setError(err.message || "Error al cargar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return

    try {
      setIsSaving(true)
      setError(null)
      setSuccess(false)

      // Update user data
      const { error: userError } = await supabaseClient.from("users").update({ full_name: fullName }).eq("id", user.id)

      if (userError) throw userError

      // Check if profile exists
      const { data: existingProfile, error: checkError } = await supabaseClient
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError
      }

      if (existingProfile) {
        // Update existing profile
        const { error: updateError } = await supabaseClient
          .from("profiles")
          .update({ phone, address })
          .eq("user_id", user.id)

        if (updateError) throw updateError
      } else {
        // Create new profile
        const { error: insertError } = await supabaseClient
          .from("profiles")
          .insert({ user_id: user.id, phone, address })

        if (insertError) throw insertError
      }

      setSuccess(true)
    } catch (err: any) {
      console.error("Error saving profile:", err)
      setError(err.message || "Error al guardar el perfil")
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-4">
            <p>Debes iniciar sesión para ver tu perfil</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tu perfil</CardTitle>
        <CardDescription>Actualiza tu información personal</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" value={user.email} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}

            {success && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md border border-green-200">
                Perfil actualizado correctamente
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveProfile} disabled={isLoading || isSaving} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar cambios
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

