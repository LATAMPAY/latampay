"use client"

import { useState, useEffect } from "react"
import { supabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function SupabaseConnectionChecker() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const checkConnection = async () => {
    setStatus("checking")
    setErrorMessage(null)

    try {
      // Verificar la conexión obteniendo la sesión actual
      const { data, error } = await supabaseClient.auth.getSession()

      if (error) {
        throw error
      }

      setStatus("connected")
    } catch (error) {
      console.error("Supabase connection error:", error)
      setStatus("error")
      setErrorMessage(error.message || "Failed to connect to Supabase")
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Estado de Conexión con Supabase</CardTitle>
        <CardDescription>Verifica la conexión con los servicios de Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {status === "checking" && (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              <span>Verificando conexión...</span>
            </>
          )}

          {status === "connected" && (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700">¡Conectado a Supabase correctamente!</span>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700">Error de conexión</span>
            </>
          )}
        </div>

        {errorMessage && <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">{errorMessage}</div>}
      </CardContent>
      <CardFooter>
        <Button onClick={checkConnection} disabled={status === "checking"} variant="outline" size="sm">
          Reintentar Conexión
        </Button>
      </CardFooter>
    </Card>
  )
}

