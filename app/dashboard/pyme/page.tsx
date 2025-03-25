"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Bell,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function DashboardPymePage() {
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
                  href="/dashboard/pyme/finanzas"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <DollarSign className="h-5 w-5" />
                  Finanzas
                </Link>
                <Link
                  href="/dashboard/pyme/nomina"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  Nómina
                </Link>
                <Link
                  href="/dashboard/pyme/facturas"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  Facturas
                </Link>
                <Link
                  href="/dashboard/pyme/creditos"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <CreditCard className="h-5 w-5" />
                  Créditos
                </Link>
                <Link
                  href="/dashboard/pyme/configuracion"
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
            <span className="text-xl font-bold hidden md:block">LatamPay PyME</span>
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
                    <AvatarFallback>MP</AvatarFallback>
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
                  href="/dashboard/pyme/finanzas"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <DollarSign className="h-4 w-4" />
                  Finanzas
                </Link>
                <Link
                  href="/dashboard/pyme/nomina"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Nómina
                </Link>
                <Link
                  href="/dashboard/pyme/facturas"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  Facturas
                </Link>
                <Link
                  href="/dashboard/pyme/creditos"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CreditCard className="h-4 w-4" />
                  Créditos
                </Link>
                <Separator className="my-4" />
                <Link
                  href="/dashboard/pyme/configuracion"
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
            <h1 className="text-lg font-semibold md:text-2xl">Bienvenido, Empresa ABC</h1>
            <Button className="ml-auto" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nueva transacción
            </Button>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="transactions">Transacciones</TabsTrigger>
              <TabsTrigger value="employees">Empleados</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo disponible</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+5.2% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gastos mensuales</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,543.00</div>
                    <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Nómina mensual</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$18,750.00</div>
                    <p className="text-xs text-muted-foreground">12 empleados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Crédito disponible</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$75,000.00</div>
                    <p className="text-xs text-muted-foreground">Límite: $100,000.00</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Flujo de caja</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px] flex items-center justify-center text-muted-foreground">
                      Gráfico de flujo de caja
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Transacciones recientes</CardTitle>
                    <CardDescription>Últimas 5 transacciones realizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Pago a proveedor XYZ</p>
                          <p className="text-xs text-muted-foreground">Hoy, 10:30 AM</p>
                        </div>
                        <div className="text-sm font-medium">-$2,500.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Pago de cliente ABC</p>
                          <p className="text-xs text-muted-foreground">Ayer, 9:15 AM</p>
                        </div>
                        <div className="text-sm font-medium text-green-500">+$5,850.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Pago de nómina</p>
                          <p className="text-xs text-muted-foreground">Ayer, 2:45 PM</p>
                        </div>
                        <div className="text-sm font-medium">-$18,750.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Pago de impuestos</p>
                          <p className="text-xs text-muted-foreground">22 Jun, 8:30 PM</p>
                        </div>
                        <div className="text-sm font-medium">-$3,450.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Pago de cliente DEF</p>
                          <p className="text-xs text-muted-foreground">21 Jun, 11:20 AM</p>
                        </div>
                        <div className="text-sm font-medium text-green-500">+$4,200.00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Facturas pendientes</CardTitle>
                    <CardDescription>Facturas por cobrar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Cliente GHI</p>
                          <p className="text-xs text-muted-foreground">Vence: 28 Jun, 2023</p>
                        </div>
                        <div className="font-medium">$3,500.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Cliente JKL</p>
                          <p className="text-xs text-muted-foreground">Vence: 01 Jul, 2023</p>
                        </div>
                        <div className="font-medium">$2,850.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Cliente MNO</p>
                          <p className="text-xs text-muted-foreground">Vence: 05 Jul, 2023</p>
                        </div>
                        <div className="font-medium">$4,125.00</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver todas las facturas
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Límite de crédito</CardTitle>
                    <CardDescription>Uso actual de tu línea de crédito</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Utilizado: $25,000.00</div>
                        <div className="text-right">Disponible: $75,000.00</div>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        Solicitar aumento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Próximos pagos</CardTitle>
                    <CardDescription>Pagos programados para los próximos días</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Proveedor RST</p>
                          <p className="text-xs text-muted-foreground">28 Jun, 2023</p>
                        </div>
                        <div className="font-medium">$1,250.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Alquiler oficina</p>
                          <p className="text-xs text-muted-foreground">01 Jul, 2023</p>
                        </div>
                        <div className="font-medium">$2,500.00</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Servicios públicos</p>
                          <p className="text-xs text-muted-foreground">05 Jul, 2023</p>
                        </div>
                        <div className="font-medium">$850.00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de transacciones</CardTitle>
                  <CardDescription>Visualiza y filtra todas tus transacciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        Todos
                      </Button>
                      <Button variant="outline" size="sm">
                        Ingresos
                      </Button>
                      <Button variant="outline" size="sm">
                        Gastos
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                          <div>Descripción</div>
                          <div>Fecha</div>
                          <div>Categoría</div>
                          <div className="text-right">Monto</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="p-4 space-y-4">
                        {/* Transacciones */}
                        <div className="grid grid-cols-4 text-sm">
                          <div>Pago a proveedor XYZ</div>
                          <div>Hoy, 10:30 AM</div>
                          <div>Proveedores</div>
                          <div className="text-right">-$2,500.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-4 text-sm">
                          <div>Pago de cliente ABC</div>
                          <div>Ayer, 9:15 AM</div>
                          <div>Ventas</div>
                          <div className="text-right text-green-500">+$5,850.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-4 text-sm">
                          <div>Pago de nómina</div>
                          <div>Ayer, 2:45 PM</div>
                          <div>Nómina</div>
                          <div className="text-right">-$18,750.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-4 text-sm">
                          <div>Pago de impuestos</div>
                          <div>22 Jun, 8:30 PM</div>
                          <div>Impuestos</div>
                          <div className="text-right">-$3,450.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-4 text-sm">
                          <div>Pago de cliente DEF</div>
                          <div>21 Jun, 11:20 AM</div>
                          <div>Ventas</div>
                          <div className="text-right text-green-500">+$4,200.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-center w-full gap-2">
                    <Button variant="outline" size="sm">
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm">
                      Siguiente
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="employees" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de empleados</CardTitle>
                  <CardDescription>Administra la información de tus empleados y nómina</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          Todos
                        </Button>
                        <Button variant="outline" size="sm">
                          Activos
                        </Button>
                        <Button variant="outline" size="sm">
                          Inactivos
                        </Button>
                      </div>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo empleado
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                          <div>Nombre</div>
                          <div>Cargo</div>
                          <div>Departamento</div>
                          <div>Fecha de ingreso</div>
                          <div className="text-right">Salario</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="p-4 space-y-4">
                        {/* Empleados */}
                        <div className="grid grid-cols-5 text-sm">
                          <div>Ana Martínez</div>
                          <div>Gerente de Ventas</div>
                          <div>Ventas</div>
                          <div>15 Ene, 2020</div>
                          <div className="text-right">$3,500.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Carlos Rodríguez</div>
                          <div>Desarrollador Senior</div>
                          <div>Tecnología</div>
                          <div>03 Mar, 2021</div>
                          <div className="text-right">$2,800.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Laura Gómez</div>
                          <div>Contadora</div>
                          <div>Finanzas</div>
                          <div>10 Jul, 2019</div>
                          <div className="text-right">$2,500.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Miguel Sánchez</div>
                          <div>Diseñador UX</div>
                          <div>Tecnología</div>
                          <div>22 Sep, 2022</div>
                          <div className="text-right">$2,200.00</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-5 text-sm">
                          <div>Patricia López</div>
                          <div>Asistente Administrativo</div>
                          <div>Administración</div>
                          <div>05 Feb, 2023</div>
                          <div className="text-right">$1,800.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">Mostrando 5 de 12 empleados</div>
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

