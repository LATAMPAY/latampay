"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PlusCircle } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

export function WelcomeBanner() {
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUserProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          const { data } = await supabase.from("users").select("full_name").eq("id", user.id).single()

          if (data) {
            setUserName(data.full_name)
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
      } finally {
        setLoading(false)
      }
    }

    getUserProfile()
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-500 to-blue-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40 bg-white/20" />
              <Skeleton className="h-8 w-64 bg-white/20" />
            </div>
            <Skeleton className="h-10 w-32 bg-white/20" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-blue-100">{getGreeting()}</p>
            <h1 className="text-2xl font-bold">Bienvenido, {userName || "Usuario"}</h1>
          </div>
          <Link href="/dashboard/accounts/new">
            <Button className="bg-white text-blue-700 hover:bg-blue-50">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Cuenta
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

