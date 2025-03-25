import Link from "next/link"
import { ArrowRight, CreditCard, Globe, Shield, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginModal } from "@/components/login-modal"

export default function TarjetasPage() {
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
              className="text-sm font-medium text-primary transition-colors hover:text-primary"
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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tarjetas LatamPay</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Descubre nuestras tarjetas diseñadas para adaptarse a tus necesidades financieras
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>LatamPay Classic</CardTitle>
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>Tarjeta de débito básica</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="rounded-lg bg-gradient-to-r from-slate-700 to-slate-900 p-4 text-white mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs opacity-85">LatamPay Classic</p>
                        <p className="text-lg font-bold mt-4">**** **** **** 1234</p>
                      </div>
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <div className="mt-4 flex justify-between text-xs">
                      <div>
                        <p className="opacity-85">TITULAR</p>
                        <p>NOMBRE APELLIDO</p>
                      </div>
                      <div>
                        <p className="opacity-85">VENCE</p>
                        <p>12/28</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Sin costo de mantenimiento
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Retiros gratuitos en cajeros de la red
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Tecnología contactless
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
                    <CardTitle>LatamPay Gold</CardTitle>
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>Tarjeta de crédito premium</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="rounded-lg bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs opacity-85">LatamPay Gold</p>
                        <p className="text-lg font-bold mt-4">**** **** **** 5678</p>
                      </div>
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <div className="mt-4 flex justify-between text-xs">
                      <div>
                        <p className="opacity-85">TITULAR</p>
                        <p>NOMBRE APELLIDO</p>
                      </div>
                      <div>
                        <p className="opacity-85">VENCE</p>
                        <p>12/28</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Programa de puntos y recompensas
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Seguro de viaje y compras
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Acceso a salas VIP en aeropuertos
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Descuentos exclusivos en comercios
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
                    <CardTitle>LatamPay Platinum</CardTitle>
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>Tarjeta de crédito exclusiva</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="rounded-lg bg-gradient-to-r from-slate-800 to-slate-950 p-4 text-white mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs opacity-85">LatamPay Platinum</p>
                        <p className="text-lg font-bold mt-4">**** **** **** 9012</p>
                      </div>
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <div className="mt-4 flex justify-between text-xs">
                      <div>
                        <p className="opacity-85">TITULAR</p>
                        <p>NOMBRE APELLIDO</p>
                      </div>
                      <div>
                        <p className="opacity-85">VENCE</p>
                        <p>12/28</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Límites de crédito elevados
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Concierge personal 24/7
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Seguro premium de viaje y compras
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Beneficios exclusivos en hoteles y restaurantes
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
              <h2 className="text-3xl font-bold tracking-tighter">Beneficios de nuestras tarjetas</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Todas nuestras tarjetas incluyen características diseñadas para brindarte seguridad y conveniencia
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Protección contra fraudes, alertas de transacciones en tiempo real y tecnología de chip EMV.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    Cobertura global
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Utiliza tu tarjeta en cualquier parte del mundo con tarifas competitivas en cambio de divisas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-primary" />
                    Recompensas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Acumula puntos con cada compra y canjéalos por productos, servicios o viajes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Gestiona tu tarjeta desde nuestra app, establece límites de gasto y bloquea/desbloquea tu tarjeta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Preguntas frecuentes</h2>
              <p className="max-w-[700px] text-muted-foreground">Resolvemos tus dudas sobre nuestras tarjetas</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">¿Cómo solicito una tarjeta?</h3>
                <p className="text-sm text-muted-foreground">
                  Puedes solicitar tu tarjeta registrándote en nuestra plataforma. El proceso es 100% digital y solo te
                  tomará unos minutos.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">¿Cuáles son los requisitos?</h3>
                <p className="text-sm text-muted-foreground">
                  Los requisitos varían según el tipo de tarjeta. Para tarjetas de débito necesitas un documento de
                  identidad válido. Para tarjetas de crédito evaluaremos tu historial crediticio.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">¿Cuánto tiempo tarda la aprobación?</h3>
                <p className="text-sm text-muted-foreground">
                  La aprobación de tarjetas de débito es inmediata. Para tarjetas de crédito, el proceso puede tomar
                  entre 24 y 48 horas hábiles.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">¿Cómo funciona el programa de puntos?</h3>
                <p className="text-sm text-muted-foreground">
                  Por cada compra realizada con tu tarjeta Gold o Platinum acumulas puntos que puedes canjear por
                  productos, servicios o viajes a través de nuestra plataforma.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">¿Listo para comenzar?</h2>
              <p className="max-w-[700px] opacity-90">
                Solicita tu tarjeta LatamPay hoy mismo y comienza a disfrutar de todos sus beneficios
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/registro">Solicitar tarjeta</Link>
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

