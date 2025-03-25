"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSupabaseAuth } from "@/components/supabase-auth-provider"

export function UserRegistration() {
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<string>("personal")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { signUp } = useSupabaseAuth()
  const router = useRouter()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Register user with Supabase Auth
      const { data, error } = await signUp(email, password, {
        full_name: fullName,
        account_type: accountType,
        phone: phone,
      })

      if (error) throw error

      // Show success message
      setSuccess(true)

      // In a real app, you might want to redirect to a confirmation page
      // router.push('/registro/confirmacion')
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "Error al registrar el usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Registro con verificación automática</CardTitle>
        <CardDescription>Crea una cuenta con verificación de email automática</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">¡Registro exitoso!</h3>
            <p className="text-muted-foreground mb-4">
              Hemos enviado un correo de verificación a <strong>{email}</strong>. Por favor, revisa tu bandeja de
              entrada y sigue las instrucciones para verificar tu cuenta.
            </p>
            <Button onClick={() => router.push("/")} className="mt-2">
              Volver al inicio
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Tipo de cuenta</Label>
                  <RadioGroup value={accountType} onValueChange={setAccountType} className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="personal" id="personal" className="peer sr-only" />
                      <Label
                        htmlFor="personal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Personal</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="pyme" id="pyme" className="peer sr-only" />
                      <Label
                        htmlFor="pyme"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">PyME</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="empresarial" id="empresarial" className="peer sr-only" />
                      <Label
                        htmlFor="empresarial"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Empresarial</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">La contraseña debe tener al menos 6 caracteres</p>
                </div>

                {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}
              </div>
            )}
          </form>
        )}
      </CardContent>
      {!success && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1 || isLoading}>
            Atrás
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext}>
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                "Completar registro"
              )}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

