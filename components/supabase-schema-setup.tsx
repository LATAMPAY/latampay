"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Database } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function SupabaseSchemaSetup() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [progress, setProgress] = useState(0)

  const handleSetupSchema = async () => {
    setLoading(true)
    setMessage("Configurando esquema de base de datos...")
    setSuccess(null)
    setProgress(10)

    try {
      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch("/api/supabase/setup-schema", {
        method: "POST",
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al configurar el esquema")
      }

      const result = await response.json()

      setProgress(100)
      setSuccess(true)
      setMessage(result.message || "Esquema configurado correctamente")
    } catch (error) {
      setSuccess(false)
      setMessage(`Error: ${error instanceof Error ? error.message : "Desconocido"}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Configuración de Esquema Supabase
        </CardTitle>
        <CardDescription>Configura las tablas necesarias para LatamPay en Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Este proceso creará todas las tablas necesarias para LatamPay en tu base de datos Supabase, incluyendo
          cuentas, transacciones, tarjetas, etc.
        </p>

        {message && (
          <div
            className={`p-3 text-sm rounded-md mb-4 ${
              success === true
                ? "bg-green-100 text-green-800"
                : success === false
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {message}
          </div>
        )}

        {loading && (
          <div className="mb-4">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs text-center text-muted-foreground">{progress}% completado</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSetupSchema} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Configurando...
            </>
          ) : (
            "Configurar Esquema"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

