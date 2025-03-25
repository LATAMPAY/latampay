"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function EnvDisplay() {
  const [showValues, setShowValues] = useState(false)

  // Obtener valores de las variables de entorno
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "No configurado"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "No configurado"

  // Función para ocultar parcialmente los valores
  const maskValue = (value: string) => {
    if (value === "No configurado") return value
    if (value.length <= 8) return "••••••••"
    return value.substring(0, 4) + "••••••••" + value.substring(value.length - 4)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Variables de Entorno Actuales</CardTitle>
        <CardDescription>Valores actuales de las variables de entorno de Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</span>
              <Button variant="ghost" size="sm" onClick={() => setShowValues(!showValues)} className="h-6 w-6 p-0">
                {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
              {showValues ? supabaseUrl : maskValue(supabaseUrl)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
            </div>
            <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
              {showValues ? supabaseAnonKey : maskValue(supabaseAnonKey)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

