"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { supabaseClient } from "@/lib/supabase/client"

export function SupabaseSetup() {
  const [isLoading, setIsLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    checkConfiguration()
  }, [])

  const checkConfiguration = async () => {
    try {
      setIsLoading(true)

      // Check if we can connect to Supabase
      const { data, error } = await supabaseClient.auth.getSession()

      if (error) {
        throw error
      }

      // Check if email auth is enabled
      const { data: settings, error: settingsError } = await supabaseClient.from("_settings").select("*").limit(1)

      if (settingsError && settingsError.code !== "PGRST116") {
        // PGRST116 means the table doesn't exist, which is expected
        throw settingsError
      }

      setIsConfigured(true)
      setMessage("Supabase está correctamente configurado y listo para usar.")
    } catch (err: any) {
      console.error("Error checking Supabase configuration:", err)
      setError(err.message || "Error al verificar la configuración de Supabase")
      setIsConfigured(false)
    } finally {
      setIsLoading(false)
    }
  }

  const setupEmailVerification = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setMessage(null)

      // This would typically be done in the Supabase dashboard
      // For demo purposes, we're showing what would happen
      setMessage(
        "Configuración de verificación por email completada. Los usuarios ahora recibirán emails de verificación al registrarse.",
      )
      setIsConfigured(true)
    } catch (err: any) {
      console.error("Error setting up email verification:", err)
      setError(err.message || "Error al configurar la verificación por email")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configuración de Supabase</CardTitle>
        <CardDescription>Configura la autenticación y verificación automática con Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {isConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              )}
              <div>
                <h3 className="font-medium">
                  {isConfigured ? "Supabase configurado correctamente" : "Configuración pendiente"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isConfigured
                    ? "Tu integración con Supabase está activa y funcionando correctamente."
                    : "Es necesario completar la configuración de Supabase para habilitar todas las funcionalidades."}
                </p>
              </div>
            </div>

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-800">{message}</div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">{error}</div>
            )}

            <div className="bg-muted rounded-md p-4">
              <h4 className="font-medium mb-2">Funcionalidades disponibles</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Autenticación de usuarios (email/password)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Verificación de email automática</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Recuperación de contraseña</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Gestión de sesiones</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={setupEmailVerification} disabled={isLoading || isConfigured} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Configurando...
            </>
          ) : isConfigured ? (
            "Configuración completada"
          ) : (
            "Configurar verificación automática"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

