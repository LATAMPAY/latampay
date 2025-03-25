"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

export default function EnvChecker() {
  const [envStatus, setEnvStatus] = useState({
    supabaseUrl: false,
    supabaseAnonKey: false,
  })

  useEffect(() => {
    // Verificar si las variables de entorno están definidas en el cliente
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Estado de Variables de Entorno</CardTitle>
        <CardDescription>Verifica si las variables de entorno necesarias están configuradas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {envStatus.supabaseUrl ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className={envStatus.supabaseUrl ? "text-green-700" : "text-red-700"}>NEXT_PUBLIC_SUPABASE_URL</span>
          </div>

          <div className="flex items-center gap-2">
            {envStatus.supabaseAnonKey ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className={envStatus.supabaseAnonKey ? "text-green-700" : "text-red-700"}>
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

