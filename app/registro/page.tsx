"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Briefcase, Check, Globe, ShieldCheck, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Step, Stepper } from "@/components/stepper"
// Import the useSupabaseAuth hook
import { useSupabaseAuth } from "@/components/supabase-auth-provider"
import { useRouter } from "next/navigation"

export default function RegistroPage() {
  const [step, setStep] = useState(0)
  const [accountType, setAccountType] = useState<string | null>(null)

  // Add state for form fields
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [telefono, setTelefono] = useState("")
  const [nombreEmpresa, setNombreEmpresa] = useState("")
  const [numeroRegistro, setNumeroRegistro] = useState("")

  // Add the useSupabaseAuth hook to the component
  const { signUp } = useSupabaseAuth()
  const router = useRouter()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  // Add a submit handler for the final step
  const handleSubmit = async () => {
    if (step === 3) {
      try {
        // Create user in Supabase
        const { data, error } = await signUp(email, password, {
          full_name: `${nombre} ${apellido}`,
          account_type: accountType,
          phone: telefono,
          // Add other metadata as needed
        })

        if (error) throw error

        // Show success message and redirect
        alert("Cuenta creada exitosamente. Por favor verifica tu correo electrónico.")
        router.push("/")
      } catch (err: any) {
        alert(err.message || "Error al crear la cuenta")
      }
    } else {
      handleNext()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">LatamPay</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="#">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver al inicio
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Crear una cuenta</h1>
            <p className="text-muted-foreground mt-2">
              Completa el formulario para abrir tu cuenta en LatamPay y acceder a todos nuestros servicios financieros.
            </p>
          </div>

          <Stepper value={step} className="mb-10">
            <Step>Tipo de cuenta</Step>
            <Step>Información personal</Step>
            <Step>Verificación</Step>
            <Step>Confirmación</Step>
          </Stepper>

          {step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Selecciona el tipo de cuenta</CardTitle>
                <CardDescription>Elige el tipo de cuenta que mejor se adapte a tus necesidades</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={accountType || ""}
                  onValueChange={setAccountType}
                  className="grid gap-4 md:grid-cols-3"
                >
                  <div>
                    <RadioGroupItem value="personal" id="personal" className="peer sr-only" />
                    <Label
                      htmlFor="personal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
                    >
                      <User className="mb-3 h-8 w-8 text-primary" />
                      <div className="text-center">
                        <p className="font-medium">Cuenta Personal</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Para individuos que buscan gestionar sus finanzas personales
                        </p>
                      </div>
                      <div className="rounded-full bg-primary/10 p-1 mt-4">
                        <Check className="h-4 w-4 text-primary hidden peer-data-[state=checked]:block" />
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="pyme" id="pyme" className="peer sr-only" />
                    <Label
                      htmlFor="pyme"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
                    >
                      <Users className="mb-3 h-8 w-8 text-primary" />
                      <div className="text-center">
                        <p className="font-medium">Cuenta PyME</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Para pequeñas y medianas empresas con necesidades específicas
                        </p>
                      </div>
                      <div className="rounded-full bg-primary/10 p-1 mt-4">
                        <Check className="h-4 w-4 text-primary hidden peer-data-[state=checked]:block" />
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="empresarial" id="empresarial" className="peer sr-only" />
                    <Label
                      htmlFor="empresarial"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
                    >
                      <Briefcase className="mb-3 h-8 w-8 text-primary" />
                      <div className="text-center">
                        <p className="font-medium">Cuenta Empresarial</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Para empresas y corporaciones con operaciones complejas
                        </p>
                      </div>
                      <div className="rounded-full bg-primary/10 p-1 mt-4">
                        <Check className="h-4 w-4 text-primary hidden peer-data-[state=checked]:block" />
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={step === 0}>
                  Atrás
                </Button>
                <Button onClick={handleNext} disabled={!accountType}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Información personal</CardTitle>
                <CardDescription>Ingresa tus datos personales para crear tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      placeholder="Ingresa tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      placeholder="Ingresa tu apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Número de teléfono</Label>
                  <Input
                    id="telefono"
                    placeholder="+123456789"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                {accountType === "pyme" || accountType === "empresarial" ? (
                  <div className="space-y-2">
                    <Label htmlFor="nombreEmpresa">Nombre de la empresa</Label>
                    <Input
                      id="nombreEmpresa"
                      placeholder="Ingresa el nombre de tu empresa"
                      value={nombreEmpresa}
                      onChange={(e) => setNombreEmpresa(e.target.value)}
                    />
                  </div>
                ) : null}

                {accountType === "empresarial" ? (
                  <div className="space-y-2">
                    <Label htmlFor="numeroRegistro">Número de registro fiscal</Label>
                    <Input
                      id="numeroRegistro"
                      placeholder="Ingresa el número de registro fiscal"
                      value={numeroRegistro}
                      onChange={(e) => setNumeroRegistro(e.target.value)}
                    />
                  </div>
                ) : null}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Atrás
                </Button>
                <Button onClick={handleNext}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Verificación de identidad</CardTitle>
                <CardDescription>
                  Para garantizar la seguridad de tu cuenta, necesitamos verificar tu identidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Verificación segura</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tus datos están protegidos con los más altos estándares de seguridad y encriptación.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de documento</Label>
                  <select
                    id="tipoDocumento"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Selecciona un tipo de documento</option>
                    <option value="dni">DNI / Cédula de Identidad</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="licencia">Licencia de conducir</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numeroDocumento">Número de documento</Label>
                  <Input id="numeroDocumento" placeholder="Ingresa el número de tu documento" />
                </div>

                <div className="space-y-2">
                  <Label>Sube una foto de tu documento</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-3">
                        <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                      </div>
                      <p className="text-sm font-medium mb-1">Arrastra y suelta tu archivo aquí</p>
                      <p className="text-xs text-muted-foreground mb-3">O haz clic para seleccionar un archivo</p>
                      <Button variant="outline" size="sm">
                        Seleccionar archivo
                      </Button>
                    </div>
                  </div>
                </div>

                {accountType === "pyme" || accountType === "empresarial" ? (
                  <div className="space-y-2">
                    <Label>Documentación de la empresa</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-primary/10 p-3 mb-3">
                          <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                        </div>
                        <p className="text-sm font-medium mb-1">Sube documentos de registro de la empresa</p>
                        <p className="text-xs text-muted-foreground mb-3">Formatos aceptados: PDF, JPG, PNG</p>
                        <Button variant="outline" size="sm">
                          Seleccionar archivo
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Atrás
                </Button>
                <Button onClick={handleNext}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirmación</CardTitle>
                <CardDescription>Revisa tus datos antes de crear tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tipo de cuenta</h3>
                    <p className="font-medium mt-1">
                      {accountType === "personal" && "Cuenta Personal"}
                      {accountType === "pyme" && "Cuenta PyME"}
                      {accountType === "empresarial" && "Cuenta Empresarial"}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Información personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Nombre completo</p>
                        <p>Juan Pérez</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Correo electrónico</p>
                        <p>juan.perez@ejemplo.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <p>+123456789</p>
                      </div>
                      {(accountType === "pyme" || accountType === "empresarial") && (
                        <div>
                          <p className="text-sm text-muted-foreground">Empresa</p>
                          <p>Empresa Ejemplo S.A.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Verificación</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Tipo de documento</p>
                        <p>DNI / Cédula de Identidad</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Número de documento</p>
                        <p>12345678</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-gray-300 text-primary focus:ring-primary mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acepto los términos y condiciones
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Al crear una cuenta, aceptas nuestros{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Términos de servicio
                      </Link>{" "}
                      y{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Política de privacidad
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Atrás
                </Button>
                <Button onClick={step === 3 ? handleSubmit : handleNext} disabled={!accountType}>
                  {step === 3 ? "Crear cuenta" : "Continuar"}
                  {step !== 3 && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 LatamPay. Todos los derechos reservados. RM INTERNATIONAL GROUP SAS.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Términos y condiciones
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Política de privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

