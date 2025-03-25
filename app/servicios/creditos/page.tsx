import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Calculator,
  CreditCard,
  DollarSign,
  Globe,
  Home,
  Landmark,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LoginModal } from "@/components/login-modal"

export default function CreditosPage() {
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
          <nav className="hidden md:flex gap-6">
            <Link
              href="/servicios/tarjetas"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tarjetas
            </Link>
            <Link
              href="/servicios/transferencias"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Transferencias
            </Link>
            <Link
              href="/servicios/inversiones"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Inversiones
            </Link>
            <Link
              href="/servicios/creditos"
              className="text-sm font-medium text-primary transition-colors hover:text-primary"
            >
              Créditos
            </Link>
            <Link
              href="/acerca"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Acerca de
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LoginModal
              trigger={
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              }
            />
            <Button size="sm" asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Soluciones de Crédito LatamPay
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Financiamiento a tu medida para individuos, PyMEs y empresas
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Crédito Personal</CardTitle>
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>Para tus proyectos personales</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="rounded-lg bg-muted p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium">Monto máximo</p>
                        <p className="text-2xl font-bold">$50,000</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary opacity-80" />
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tasa desde</p>
                        <p className="font-medium">12% anual</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Plazo hasta</p>
                        <p className="font-medium">60 meses</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Aprobación rápida
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Sin garantía para montos menores
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Cuotas fijas mensuales
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/registro">
                      Solicitar ahora <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Crédito PyME</CardTitle>
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>Impulsa el crecimiento de tu negocio</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="rounded-lg bg-muted p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium">Monto máximo</p>
                        <p className="text-2xl font-bold">$500,000</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary opacity-80" />
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tasa desde</p>
                        <p className="font-medium">10% anual</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Plazo hasta</p>
                        <p className="font-medium">84 meses</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Evaluación personalizada
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Opciones de garantía flexibles
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Períodos de gracia disponibles
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Asesoría financiera incluida
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/registro">
                      Solicitar ahora <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Crédito Empresarial</CardTitle>
                    <Landmark className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>Soluciones a gran escala</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="rounded-lg bg-muted p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium">Monto máximo</p>
                        <p className="text-2xl font-bold">$10,000,000+</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary opacity-80" />
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tasa desde</p>
                        <p className="font-medium">8% anual</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Plazo hasta</p>
                        <p className="font-medium">120 meses</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Estructuración a medida
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Financiamiento de proyectos
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Opciones en múltiples divisas
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      Equipo de asesores dedicado
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/registro">
                      Solicitar ahora <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Créditos especializados</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Soluciones específicas para necesidades particulares
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    Crédito Hipotecario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Financia la compra de tu vivienda con tasas competitivas y plazos extendidos de hasta 30 años.
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span>Tasa desde:</span>
                      <span className="font-medium">7.5% anual</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Financiamiento hasta:</span>
                      <span className="font-medium">80% del avalúo</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/servicios/creditos/hipotecario">Más información</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Línea de Crédito
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Accede a fondos cuando los necesites con nuestra línea de crédito flexible. Paga intereses solo por
                    lo que utilizas.
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span>Tasa desde:</span>
                      <span className="font-medium">14% anual</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disponibilidad:</span>
                      <span className="font-medium">Inmediata</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/servicios/creditos/linea">Más información</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-primary" />
                    Leasing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Adquiere activos para tu empresa con beneficios fiscales y opciones flexibles al final del contrato.
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span>Plazo:</span>
                      <span className="font-medium">Hasta 10 años</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Opción de compra:</span>
                      <span className="font-medium">Desde 1%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/servicios/creditos/leasing">Más información</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Calcula tu crédito</h2>
                <p className="text-muted-foreground mb-6">
                  Utiliza nuestra calculadora para estimar las cuotas de tu crédito según el monto, plazo y tasa de
                  interés.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="monto" className="text-sm font-medium">
                      Monto del crédito
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        id="monto"
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="10000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="plazo" className="text-sm font-medium">
                      Plazo en meses
                    </label>
                    <input
                      id="plazo"
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="36"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tasa" className="text-sm font-medium">
                      Tasa de interés anual (%)
                    </label>
                    <input
                      id="tasa"
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="12"
                    />
                  </div>
                  <Button className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular cuota
                  </Button>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Resultado</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Cuota mensual estimada</p>
                    <p className="text-3xl font-bold">$332.14</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total a pagar:</span>
                      <span className="font-medium">$11,957.04</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Intereses totales:</span>
                      <span className="font-medium">$1,957.04</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-xs text-muted-foreground">
                      Este cálculo es solo una estimación. La cuota final puede variar según la evaluación crediticia y
                      otros factores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">¿Listo para financiar tus proyectos?</h2>
              <p className="max-w-[700px] opacity-90">
                Solicita tu crédito LatamPay hoy mismo y recibe una respuesta en menos de 24 horas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/registro">Solicitar crédito</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/servicios">Explorar más servicios</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
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

