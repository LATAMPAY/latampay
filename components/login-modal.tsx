"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Globe, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Import the useSupabaseAuth hook
import { useSupabaseAuth } from "@/components/supabase-auth-provider"

interface LoginModalProps {
  trigger?: React.ReactNode
}

export function LoginModal({ trigger }: LoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)

  // Add the useSupabaseAuth hook to the component
  const { signIn } = useSupabaseAuth()

  // Update the handleLogin function to use Supabase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { error } = await signIn(email, password)

      if (error) {
        throw error
      }

      // Determine the type of user based on the email (only for demo)
      let dashboardPath = "/dashboard"
      if (email.includes("pyme")) {
        dashboardPath = "/dashboard/pyme"
      } else if (email.includes("empresa")) {
        dashboardPath = "/dashboard/empresarial"
      }

      // Close the modal and redirect
      setOpen(false)
      router.push(dashboardPath)
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button variant="outline">Iniciar Sesión</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LatamPay</span>
          </div>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>Ingresa tus credenciales para acceder a tu cuenta</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Button variant="link" className="p-0 h-auto text-xs" type="button">
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-sm text-destructive">{error}</div>}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </DialogFooter>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => {
              setOpen(false)
              router.push("/registro")
            }}
          >
            Regístrate aquí
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

