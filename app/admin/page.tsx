"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Download,
  LineChart,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
  ChartArea,
  ChartBar,
  ChartLine,
  ChartPie,
} from "@/components/ui/chart"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState("30d")

  // Datos para los gráficos
  const revenueData = [
    { date: "Ene", value: 4500 },
    { date: "Feb", value: 5200 },
    { date: "Mar", value: 4800 },
    { date: "Abr", value: 5800 },
    { date: "May", value: 6000 },
    { date: "Jun", value: 6500 },
    { date: "Jul", value: 7200 },
    { date: "Ago", value: 7800 },
    { date: "Sep", value: 8500 },
    { date: "Oct", value: 9200 },
    { date: "Nov", value: 9800 },
    { date: "Dic", value: 10500 },
  ]

  const transactionsByServiceData = [
    { name: "Transferencias", value: 35 },
    { name: "Tarjetas", value: 25 },
    { name: "Créditos", value: 20 },
    { name: "Inversiones", value: 15 },
    { name: "Otros", value: 5 },
  ]

  const usersBySegmentData = [
    { name: "Personal", value: 60 },
    { name: "PyME", value: 25 },
    { name: "Empresarial", value: 15 },
  ]

  const transactionVolumeData = [
    { name: "Transferencias", value: 450000 },
    { name: "Tarjetas", value: 320000 },
    { name: "Créditos", value: 280000 },
    { name: "Inversiones", value: 180000 },
    { name: "Otros", value: 70000 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard de Administración</h2>
          <p className="text-muted-foreground">Visión general del rendimiento de la plataforma LatamPay</p>
        </div>
        <div className="mt-4 flex items-center gap-2 md:mt-0">
          <Tabs defaultValue="30d" value={dateRange} onValueChange={setDateRange} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
              <TabsTrigger value="1y">1A</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volumen de Transacciones</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.3M</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$285,000</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+15.3%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Retención</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.8%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+2.1%</span>
              <span className="ml-1">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Evolución de Ingresos</CardTitle>
            <CardDescription>Ingresos mensuales durante el último año</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <Chart>
                  <ChartXAxis dataKey="date" />
                  <ChartYAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Mes</span>
                                <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Ingresos</span>
                                <span className="font-bold">${payload[0].value.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <ChartLine
                    dataKey="value"
                    stroke="#0088FE"
                    strokeWidth={2}
                    activeDot={{ r: 6, style: { fill: "#0088FE", opacity: 0.8 } }}
                    data={revenueData}
                  />
                  <ChartArea dataKey="value" fill="#0088FE" fillOpacity={0.1} stroke="transparent" data={revenueData} />
                </Chart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Transacciones por Servicio</CardTitle>
            <CardDescription>Distribución del volumen de transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <Chart>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Servicio</span>
                                <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Volumen</span>
                                <span className="font-bold">${payload[0].value.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <ChartBar dataKey="value" data={transactionVolumeData} fill="#0088FE" radius={[4, 4, 0, 0]} />
                </Chart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Distribución de Usuarios por Segmento</CardTitle>
            <CardDescription>Porcentaje de usuarios por tipo de cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-[300px] h-[300px]">
                <ChartContainer>
                  <Chart>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Segmento</span>
                                  <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Porcentaje</span>
                                  <span className="font-bold">{payload[0].value}%</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <ChartPie
                      dataKey="value"
                      nameKey="name"
                      data={usersBySegmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {usersBySegmentData.map((entry, index) => (
                        <ChartPie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </ChartPie>
                    <ChartLegend />
                  </Chart>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Distribución de Transacciones</CardTitle>
            <CardDescription>Porcentaje de transacciones por tipo de servicio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-[300px] h-[300px]">
                <ChartContainer>
                  <Chart>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Servicio</span>
                                  <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Porcentaje</span>
                                  <span className="font-bold">{payload[0].value}%</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <ChartPie
                      dataKey="value"
                      nameKey="name"
                      data={transactionsByServiceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {transactionsByServiceData.map((entry, index) => (
                        <ChartPie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </ChartPie>
                    <ChartLegend />
                  </Chart>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios Recientes</CardTitle>
            <CardDescription>Últimos usuarios registrados en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Juan Díaz</p>
                  <p className="text-xs text-muted-foreground">Personal • Registrado hace 2 horas</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/usuarios/1">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">María González</p>
                  <p className="text-xs text-muted-foreground">Personal • Registrada hace 5 horas</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/usuarios/2">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Carlos Rodríguez</p>
                  <p className="text-xs text-muted-foreground">PyME • Registrado hace 8 horas</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/usuarios/3">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Laura Martínez</p>
                  <p className="text-xs text-muted-foreground">Personal • Registrada hace 12 horas</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/usuarios/4">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>GS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Global Solutions S.A.</p>
                  <p className="text-xs text-muted-foreground">Empresarial • Registrado hace 1 día</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/usuarios/5">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/usuarios">Ver todos los usuarios</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transacciones Recientes</CardTitle>
            <CardDescription>Últimas transacciones realizadas en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Transferencia recibida</p>
                  <p className="text-xs text-muted-foreground">ID: #TRX-12345 • Hace 15 minutos</p>
                </div>
                <div className="text-sm font-medium text-green-500">+$1,250.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-red-500 rotate-180" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Transferencia enviada</p>
                  <p className="text-xs text-muted-foreground">ID: #TRX-12344 • Hace 45 minutos</p>
                </div>
                <div className="text-sm font-medium text-red-500">-$850.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Pago con tarjeta</p>
                  <p className="text-xs text-muted-foreground">ID: #TRX-12343 • Hace 2 horas</p>
                </div>
                <div className="text-sm font-medium">-$125.50</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Depósito</p>
                  <p className="text-xs text-muted-foreground">ID: #TRX-12342 • Hace 3 horas</p>
                </div>
                <div className="text-sm font-medium text-green-500">+$5,000.00</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <LineChart className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Inversión</p>
                  <p className="text-xs text-muted-foreground">ID: #TRX-12341 • Hace 5 horas</p>
                </div>
                <div className="text-sm font-medium">-$2,500.00</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/transacciones">Ver todas las transacciones</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Riesgo</CardTitle>
            <CardDescription>Alertas recientes que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Intento de acceso sospechoso</p>
                  <p className="text-xs text-muted-foreground">Múltiples intentos fallidos desde IP desconocida</p>
                  <p className="text-xs text-muted-foreground">ID: #RISK-5432 • Hace 30 minutos</p>
                </div>
                <Badge variant="destructive">Alta</Badge>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Transacción inusual</p>
                  <p className="text-xs text-muted-foreground">Monto superior al patrón habitual del usuario</p>
                  <p className="text-xs text-muted-foreground">ID: #RISK-5431 • Hace 2 horas</p>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                  Media
                </Badge>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Posible fraude</p>
                  <p className="text-xs text-muted-foreground">Patrón de transacciones sospechosas detectado</p>
                  <p className="text-xs text-muted-foreground">ID: #RISK-5430 • Hace 4 horas</p>
                </div>
                <Badge variant="destructive">Alta</Badge>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Verificación de identidad pendiente</p>
                  <p className="text-xs text-muted-foreground">Usuario con documentación incompleta</p>
                  <p className="text-xs text-muted-foreground">ID: #RISK-5429 • Hace 6 horas</p>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                  Media
                </Badge>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Actualización de datos requerida</p>
                  <p className="text-xs text-muted-foreground">Información de contacto desactualizada</p>
                  <p className="text-xs text-muted-foreground">ID: #RISK-5428 • Hace 12 horas</p>
                </div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                  Baja
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/riesgos">Ver todas las alertas</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

