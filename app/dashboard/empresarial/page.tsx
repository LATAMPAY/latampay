"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  DollarSign,
  FileText,
  Globe,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  User,
  Wallet,
  GlobeIcon as World,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardEmpresarialPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex items-center gap-2 px-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">LatamPay</span>
              </div>
              <Separator className="my-4" />
              <nav className="grid gap-2 px-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/empresarial/tesoreria"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Wallet className="h-5 w-5" />
                  Tesorería
                </Link>
                <Link
                  href="/dashboard/empresarial/internacional"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <World className="h-5 w-5" />
                  Comercio Internacional
                </Link>
                <Link
                  href="/dashboard/empresarial/financiamiento"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Building2 className="h-5 w-5" />
                  Financiamiento
                </Link>
                <Link
                  href="/dashboard/empresarial/analisis"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <BarChart3 className="h-5 w-5" />
                  Análisis Financiero
                </Link>
                <Link
                  href="/dashboard/empresarial/configuracion"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  Configuración
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 md:mr-4">
            <Globe className="h-6 w-6 text-primary hidden md:block" />
            <span className="text-xl font-bold hidden md:block">LatamPay Empresarial</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Messages</span>
              </Button>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>CE</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/empresarial/tesoreria"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Wallet className="h-4 w-4" />
                  Tesorería
                </Link>
                <Link
                  href="/dashboard/empresarial/internacional"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <World className="h-4 w-4" />
                  Comercio Internacional
                </Link>
                <Link
                  href="/dashboard/empresarial/financiamiento"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Building2 className="h-4 w-4" />
                  Financiamiento
                </Link>
                <Link
                  href="/dashboard/empresarial/analisis"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <BarChart3 className="h-4 w-4" />
                  Análisis Financiero
                </Link>
                <Separator className="my-4" />
                <Link
                  href="/dashboard/empresarial/configuracion"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
              </nav>
            </div>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Bienvenido, Corporación Global S.A.</h1>
            <Button className="ml-auto" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nueva operación
            </Button>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="treasury">Tesorería</TabsTrigger>
              <TabsTrigger value="international">Internacional</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo consolidado</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,458,231.89</div>
                    <p className="text-xs text-muted-foreground">+3.2% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Operaciones internacionales</CardTitle>
                    <World className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$4,325,750.00</div>
                    <p className="text-xs text-muted-foreground">+8.5% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inversiones</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$8,750,000.00</div>
                    <p className="text-xs text-muted-foreground">+4.7% de rendimiento</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Líneas de crédito</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15,000,000.00</div>
                    <p className="text-xs text-muted-foreground">Disponible: $10,000,000.00</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Análisis financiero</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px] flex items-center justify-center text-muted-foreground">
                      Gráfico de análisis financiero
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Operaciones recientes</CardTitle>
                    <CardDescription>Últimas 5 operaciones realizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <World className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Transferencia internacional</p>
                          <p className="text-xs text-muted-foreground">Hoy, 10:30 AM</p>
                        </div>
                        <div className="text-sm font-medium">-$250,000.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Cobro exportación</p>
                          <p className="text-xs text-muted-foreground">Ayer, 9:15 AM</p>
                        </div>
                        <div className="text-sm font-medium text-green-500">+$585,000.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Pago financiamiento</p>
                          <p className="text-xs text-muted-foreground">Ayer, 2:45 PM</p>
                        </div>
                        <div className="text-sm font-medium">-$187,500.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Pago impuestos corporativos</p>
                          <p className="text-xs text-muted-foreground">22 Jun, 8:30 PM</p>
                        </div>
                        <div className="text-sm font-medium">-$345,000.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Rendimiento inversiones</p>
                          <p className="text-xs text-muted-foreground">21 Jun, 11:20 AM</p>
                        </div>
                        <div className="text-sm font-medium text-green-500">+$420,000.00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Posición de divisas</CardTitle>
                    <CardDescription>Saldos por moneda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">USD - Dólar americano</p>
                          <p className="text-xs text-muted-foreground">Principal</p>
                        </div>
                        <div className="font-medium">$8,500,000.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">EUR - Euro</p>
                          <p className="text-xs text-muted-foreground">Secundaria</p>
                        </div>
                        <div className="font-medium">€2,850,000.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">BRL - Real brasileño</p>
                          <p className="text-xs text-muted-foreground">Regional</p>
                        </div>
                        <div className="font-medium">R$4,125,000.00</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver todas las divisas
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Financiamiento</CardTitle>
                    <CardDescription>Uso actual de líneas de crédito</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Utilizado: $5,000,000.00</div>
                        <div className="text-right">Disponible: $10,000,000.00</div>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        Solicitar financiamiento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Próximos vencimientos</CardTitle>
                    <CardDescription>Operaciones con vencimiento próximo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Forward USD/EUR</p>
                          <p className="text-xs text-muted-foreground">28 Jun, 2023</p>
                        </div>
                        <div className="font-medium">$1,250,000.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Préstamo sindicado</p>
                          <p className="text-xs text-muted-foreground">01 Jul, 2023</p>
                        </div>
                        <div className="font-medium">$2,500,000.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Bono corporativo</p>
                          <p className="text-xs text-muted-foreground">05 Jul, 2023</p>
                        </div>
                        <div className="font-medium">$850,000.00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="treasury" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de tesorería</CardTitle>
                  <CardDescription>Administra los flujos de efectivo y liquidez</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          Todos
                        </Button>
                        <Button variant="outline" size="sm">
                          Ingresos
                        </Button>
                        <Button variant="outline" size="sm">
                          Egresos
                        </Button>
                      </div>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva operación
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                          <div>Descripción</div>
                          <div>Fecha</div>
                          <div>Tipo</div>
                          <div>Estado</div>
                          <div className="text-right">Monto</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="p-4 space-y-4">
                        {/* Operaciones */}
                        <div className="grid grid-cols-5 text-sm">
                          <div>Transferencia internacional</div>
                          <div>Hoy, 10:30 AM</div>
                          <div>Egreso</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right">-$250,000.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Cobro exportación</div>
                          <div>Ayer, 9:15 AM</div>
                          <div>Ingreso</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right text-green-500">+$585,000.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Pago financiamiento</div>
                          <div>Ayer, 2:45 PM</div>
                          <div>Egreso</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right">-$187,500.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Pago impuestos corporativos</div>
                          <div>22 Jun, 8:30 PM</div>
                          <div>Egreso</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right">-$345,000.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Rendimiento inversiones</div>
                          <div>21 Jun, 11:20 AM</div>
                          <div>Ingreso</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right text-green-500">+$420,000.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">Mostrando 5 de 120 operaciones</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm">
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="international" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comercio Internacional</CardTitle>
                  <CardDescription>Gestiona tus operaciones internacionales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          Todos
                        </Button>
                        <Button variant="outline" size="sm">
                          Importaciones
                        </Button>
                        <Button variant="outline" size="sm">
                          Exportaciones
                        </Button>
                      </div>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva operación
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                          <div>Descripción</div>
                          <div>Fecha</div>
                          <div>País</div>
                          <div>Estado</div>
                          <div className="text-right">Monto</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="p-4 space-y-4">
                        {/* Operaciones internacionales */}
                        <div className="grid grid-cols-5 text-sm">
                          <div>Exportación maquinaria</div>
                          <div>15 Jun, 2023</div>
                          <div>Brasil</div>
                          <div>
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                              En tránsito
                            </Badge>
                          </div>
                          <div className="text-right">$850,000.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Importación materias primas</div>
                          <div>10 Jun, 2023</div>
                          <div>China</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right">$425,000.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Exportación productos terminados</div>
                          <div>05 Jun, 2023</div>
                          <div>México</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right">$320,000.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Importación equipos</div>
                          <div>01 Jun, 2023</div>
                          <div>Alemania</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right">$750,000.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Exportación servicios</div>
                          <div>28 May, 2023</div>
                          <div>Colombia</div>
                          <div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completada
                            </Badge>
                          </div>
                          <div className="text-right">$180,000.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">Mostrando 5 de 42 operaciones</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm">
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

