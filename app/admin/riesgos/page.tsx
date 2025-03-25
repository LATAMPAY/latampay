"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowUpDown,
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  ShieldAlert,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para la tabla de alertas de riesgo
const riskAlerts = [
  {
    id: "RISK-5432",
    type: "Acceso",
    description: "Múltiples intentos fallidos desde IP desconocida",
    severity: "Alta",
    status: "Abierta",
    date: "2023-12-15T10:30:00",
    user: {
      id: "1",
      name: "Juan Díaz",
      email: "juan.diaz@ejemplo.com",
    },
    details: "Se detectaron 5 intentos fallidos de acceso desde la IP 203.0.113.1 en un período de 10 minutos.",
  },
  {
    id: "RISK-5431",
    type: "Transacción",
    description: "Monto superior al patrón habitual del usuario",
    severity: "Media",
    status: "Abierta",
    date: "2023-12-15T09:15:00",
    user: {
      id: "2",
      name: "María González",
      email: "maria.gonzalez@ejemplo.com",
    },
    details: "Transferencia de $5,000 cuando el promedio histórico del usuario es de $500.",
  },
  {
    id: "RISK-5430",
    type: "Fraude",
    description: "Patrón de transacciones sospechosas detectado",
    severity: "Alta",
    status: "En investigación",
    date: "2023-12-15T08:00:00",
    user: {
      id: "3",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@pyme.com",
    },
    details: "Múltiples transacciones pequeñas seguidas de un retiro grande. Posible caso de 'smurfing'.",
  },
  {
    id: "RISK-5429",
    type: "Verificación",
    description: "Usuario con documentación incompleta",
    severity: "Media",
    status: "Abierta",
    date: "2023-12-15T07:30:00",
    user: {
      id: "6",
      name: "Pedro Sánchez",
      email: "pedro.sanchez@ejemplo.com",
    },
    details:
      "El usuario ha realizado transacciones por más de $1,000 sin completar la verificación de identidad nivel 2.",
  },
  {
    id: "RISK-5428",
    type: "Datos",
    description: "Información de contacto desactualizada",
    severity: "Baja",
    status: "Abierta",
    date: "2023-12-15T06:45:00",
    user: {
      id: "4",
      name: "Laura Martínez",
      email: "laura.martinez@ejemplo.com",
    },
    details: "El número de teléfono registrado no está activo. Se requiere actualización de datos de contacto.",
  },
  {
    id: "RISK-5427",
    type: "Transacción",
    description: "Transferencia a país de alto riesgo",
    severity: "Alta",
    status: "En investigación",
    date: "2023-12-14T16:30:00",
    user: {
      id: "9",
      name: "Corporación Financiera Internacional",
      email: "contacto@cfi.com",
    },
    details: "Transferencia de $25,000 a una cuenta en un país clasificado como de alto riesgo por GAFI.",
  },
  {
    id: "RISK-5426",
    type: "Acceso",
    description: "Acceso desde ubicación inusual",
    severity: "Media",
    status: "Cerrada",
    date: "2023-12-14T15:15:00",
    user: {
      id: "10",
      name: "Roberto Méndez",
      email: "roberto.mendez@ejemplo.com",
    },
    details:
      "Acceso a la cuenta desde una ubicación a 500 km de la ubicación habitual del usuario. Verificado con el usuario, estaba de viaje.",
  },
  {
    id: "RISK-5425",
    type: "Fraude",
    description: "Posible suplantación de identidad",
    severity: "Alta",
    status: "Cerrada",
    date: "2023-12-14T14:00:00",
    user: {
      id: "8",
      name: "Ana López",
      email: "ana.lopez@ejemplo.com",
    },
    details:
      "Intento de cambio de contraseña y datos de contacto. Se contactó al usuario y confirmó que no realizó estas acciones. Cuenta bloqueada preventivamente.",
  },
  {
    id: "RISK-5424",
    type: "Cumplimiento",
    description: "Posible actividad de lavado de dinero",
    severity: "Alta",
    status: "En investigación",
    date: "2023-12-14T12:30:00",
    user: {
      id: "7",
      name: "Tecnología Avanzada Ltda.",
      email: "info@tecnologiaavanzada.com",
    },
    details:
      "Múltiples depósitos en efectivo seguidos de transferencias internacionales. Patrón consistente con posible lavado de dinero.",
  },
  {
    id: "RISK-5423",
    type: "Verificación",
    description: "Documentos de identidad potencialmente falsificados",
    severity: "Alta",
    status: "En investigación",
    date: "2023-12-14T11:15:00",
    user: {
      id: "5",
      name: "Global Solutions S.A.",
      email: "contacto@globalsolutions.com",
    },
    details:
      "El sistema de verificación automática ha detectado inconsistencias en los documentos de identidad proporcionados por el representante legal.",
  },
]

export default function RiskManagementPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // Filtrar alertas según la pestaña seleccionada
  const filteredAlerts = riskAlerts
    .filter((alert) => {
      if (selectedTab === "all") return true
      if (selectedTab === "high") return alert.severity === "Alta"
      if (selectedTab === "medium") return alert.severity === "Media"
      if (selectedTab === "low") return alert.severity === "Baja"
      return true
    })
    .filter((alert) => {
      if (!searchTerm) return true
      return (
        alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredAlerts.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredAlerts.map((alert) => alert.id))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Riesgos</h2>
          <p className="text-muted-foreground">Monitorea y gestiona las alertas de riesgo de la plataforma LatamPay</p>
        </div>
        <div className="mt-4 flex items-center gap-2 md:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Fraude</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.05%</div>
            <div className="mt-2">
              <Progress value={5} max={100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">-0.02% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Morosidad</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <div className="mt-2">
              <Progress value={28} max={100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+0.3% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-2">+12 desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Resolución</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 horas</div>
            <p className="text-xs text-muted-foreground mt-2">-0.5 horas desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas de Riesgo</CardTitle>
          <CardDescription>Gestiona y resuelve las alertas de riesgo detectadas en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="high">Alta Prioridad</TabsTrigger>
                <TabsTrigger value="medium">Media Prioridad</TabsTrigger>
                <TabsTrigger value="low">Baja Prioridad</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar alertas..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Tipo</h4>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="type-access" />
                          <label
                            htmlFor="type-access"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Acceso
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="type-transaction" />
                          <label
                            htmlFor="type-transaction"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Transacción
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="type-fraud" />
                          <label
                            htmlFor="type-fraud"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Fraude
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <h4 className="text-sm font-medium">Estado</h4>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-open" />
                          <label
                            htmlFor="status-open"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Abierta
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-investigation" />
                          <label
                            htmlFor="status-investigation"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            En investigación
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-closed" />
                          <label
                            htmlFor="status-closed"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Cerrada
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <h4 className="text-sm font-medium">Fecha</h4>
                        <div className="grid gap-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar período" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">Hoy</SelectItem>
                              <SelectItem value="yesterday">Ayer</SelectItem>
                              <SelectItem value="7d">Últimos 7 días</SelectItem>
                              <SelectItem value="30d">Últimos 30 días</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button size="sm" className="w-full">
                        Aplicar filtros
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedRows.length === filteredAlerts.length && filteredAlerts.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Usuario
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Severidad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id} className={selectedRows.includes(alert.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(alert.id)}
                            onCheckedChange={() => toggleSelectRow(alert.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{alert.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{alert.user.name}</div>
                              <div className="text-xs text-muted-foreground">{alert.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={alert.description}>
                          {alert.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(alert.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alert.severity === "Alta"
                                ? "destructive"
                                : alert.severity === "Media"
                                  ? "outline"
                                  : "secondary"
                            }
                            className={
                              alert.severity === "Media"
                                ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                : alert.severity === "Baja"
                                  ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                  : ""
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alert.status === "Abierta"
                                ? "outline"
                                : alert.status === "En investigación"
                                  ? "secondary"
                                  : "default"
                            }
                            className={
                              alert.status === "Abierta"
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                : alert.status === "En investigación"
                                  ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                  : ""
                            }
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/riesgos/${alert.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {alert.status !== "Cerrada" && (
                                <>
                                  <DropdownMenuItem>Asignar a analista</DropdownMenuItem>
                                  <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                                  <DropdownMenuItem>Cerrar alerta</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="high" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedRows.length === filteredAlerts.length && filteredAlerts.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Usuario
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id} className={selectedRows.includes(alert.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(alert.id)}
                            onCheckedChange={() => toggleSelectRow(alert.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{alert.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{alert.user.name}</div>
                              <div className="text-xs text-muted-foreground">{alert.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={alert.description}>
                          {alert.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(alert.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alert.status === "Abierta"
                                ? "outline"
                                : alert.status === "En investigación"
                                  ? "secondary"
                                  : "default"
                            }
                            className={
                              alert.status === "Abierta"
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                : alert.status === "En investigación"
                                  ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                  : ""
                            }
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/riesgos/${alert.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {alert.status !== "Cerrada" && (
                                <>
                                  <DropdownMenuItem>Asignar a analista</DropdownMenuItem>
                                  <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                                  <DropdownMenuItem>Cerrar alerta</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="medium" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedRows.length === filteredAlerts.length && filteredAlerts.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Usuario
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id} className={selectedRows.includes(alert.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(alert.id)}
                            onCheckedChange={() => toggleSelectRow(alert.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{alert.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{alert.user.name}</div>
                              <div className="text-xs text-muted-foreground">{alert.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={alert.description}>
                          {alert.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(alert.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alert.status === "Abierta"
                                ? "outline"
                                : alert.status === "En investigación"
                                  ? "secondary"
                                  : "default"
                            }
                            className={
                              alert.status === "Abierta"
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                : alert.status === "En investigación"
                                  ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                  : ""
                            }
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/riesgos/${alert.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {alert.status !== "Cerrada" && (
                                <>
                                  <DropdownMenuItem>Asignar a analista</DropdownMenuItem>
                                  <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                                  <DropdownMenuItem>Cerrar alerta</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="low" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedRows.length === filteredAlerts.length && filteredAlerts.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Usuario
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id} className={selectedRows.includes(alert.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(alert.id)}
                            onCheckedChange={() => toggleSelectRow(alert.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{alert.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{alert.user.name}</div>
                              <div className="text-xs text-muted-foreground">{alert.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={alert.description}>
                          {alert.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(alert.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alert.status === "Abierta"
                                ? "outline"
                                : alert.status === "En investigación"
                                  ? "secondary"
                                  : "default"
                            }
                            className={
                              alert.status === "Abierta"
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                : alert.status === "En investigación"
                                  ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                  : ""
                            }
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/riesgos/${alert.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {alert.status !== "Cerrada" && (
                                <>
                                  <DropdownMenuItem>Asignar a analista</DropdownMenuItem>
                                  <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                                  <DropdownMenuItem>Cerrar alerta</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando <strong>{filteredAlerts.length}</strong> de <strong>{riskAlerts.length}</strong> alertas
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

