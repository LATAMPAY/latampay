"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function SupabaseAutoConfig() {
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [configStatus, setConfigStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Verificar si las variables de entorno ya están configuradas
  const supabaseUrlConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKeyConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const handleAutoConfig = async () => {
    setIsConfiguring(true)
    setConfigStatus("idle")
    setErrorMessage(null)

    try {
      // Llamar a la API para configurar automáticamente
      const response = await fetch("/api/supabase/auto-config", {
        method: "POST",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al configurar Supabase")
      }

      setConfigStatus("success")

      // Recargar la página después de 2 segundos para aplicar los cambios
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Error al configurar Supabase:", error)
      setConfigStatus("error")
      setErrorMessage(error.message || "Error desconocido")
    } finally {
      setIsConfiguring(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configuración Automática de Supabase</CardTitle>
        <CardDescription>Configura automáticamente las variables de entorno de Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {supabaseUrlConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={supabaseUrlConfigured ? "text-green-700" : "text-red-700"}>
                NEXT_PUBLIC_SUPABASE_URL
              </span>
            </div>

            <div className="flex items-center gap-2">
              {supabaseAnonKeyConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={supabaseAnonKeyConfigured ? "text-green-700" : "text-red-700"}>
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </span>
            </div>
          </div>

          {configStatus === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                ¡Configuración completada con éxito! Recargando página...
              </AlertDescription>
            </Alert>
          )}

          {configStatus === "error" && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage || "Error al configurar Supabase"}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAutoConfig}
          disabled={isConfiguring || (supabaseUrlConfigured && supabaseAnonKeyConfigured)}
          className="w-full"
        >
          {isConfiguring ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Configurando...
            </>
          ) : supabaseUrlConfigured && supabaseAnonKeyConfigured ? (
            "Ya configurado"
          ) : (
            "Configurar Automáticamente"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

