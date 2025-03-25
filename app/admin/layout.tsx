"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldAlert,
  Users,
  Database,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Usuarios", href: "/admin/usuarios", icon: Users },
    { name: "Transacciones", href: "/admin/transacciones", icon: CreditCard },
    { name: "Riesgos", href: "/admin/riesgos", icon: ShieldAlert },
    { name: "Soporte", href: "/admin/soporte", icon: HelpCircle },
    { name: "Informes", href: "/admin/informes", icon: FileText },
    { name: "Análisis", href: "/admin/analisis", icon: BarChart3 },
  ]

  return (
    <SidebarProvider>
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
                  <span className="text-xl font-bold">LatamPay Admin</span>
                </div>
                <Separator className="my-4" />
                <nav className="grid gap-2 px-2 text-lg font-medium">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/supabase-demo"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <Database className="h-5 w-5" />
                    Supabase Demo
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 md:mr-4">
              <Globe className="h-6 w-6 text-primary hidden md:block" />
              <span className="text-xl font-bold hidden md:block">LatamPay Admin</span>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="sr-only">Notifications</span>
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                        5
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[300px] overflow-auto">
                      <div className="flex items-start gap-4 p-3 hover:bg-muted rounded-md">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Alerta de riesgo</p>
                          <p className="text-xs text-muted-foreground">
                            Se ha detectado actividad sospechosa en la cuenta #12345
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Hace 5 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 hover:bg-muted rounded-md">
                        <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Nuevo usuario registrado</p>
                          <p className="text-xs text-muted-foreground">
                            El usuario María González ha completado su registro
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Hace 15 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 hover:bg-muted rounded-md">
                        <CreditCard className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Transacción de alto valor</p>
                          <p className="text-xs text-muted-foreground">
                            Transacción de $50,000 completada para la cuenta #67890
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Hace 30 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 hover:bg-muted rounded-md">
                        <HelpCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Nuevo ticket de soporte</p>
                          <p className="text-xs text-muted-foreground">
                            Ticket #4321 creado: "Problema con transferencia internacional"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Hace 45 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 hover:bg-muted rounded-md">
                        <ShieldAlert className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Intento de acceso fallido</p>
                          <p className="text-xs text-muted-foreground">
                            Múltiples intentos fallidos de acceso a la cuenta #54321
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Hace 1 hora</p>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Ver todas las notificaciones
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
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
        <div className="flex-1 flex">
          <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/supabase-demo"}>
                    <Link href="/supabase-demo">
                      <Database className="h-4 w-4" />
                      <span>Supabase Demo</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/configuracion">
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

