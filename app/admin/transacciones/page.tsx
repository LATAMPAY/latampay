"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, Download, Filter, MoreHorizontal, Search } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para la tabla de transacciones
const transactions = [
  {
    id: "TRX-12345",
    type: "Transferencia",
    subtype: "Recibida",
    amount: 1250.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-15T10:30:00",
    user: {
      id: "1",
      name: "Juan Díaz",
      email: "juan.diaz@ejemplo.com",
    },
    description: "Pago de servicios",
    fee: 0.0,
  },
  {
    id: "TRX-12344",
    type: "Transferencia",
    subtype: "Enviada",
    amount: -850.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-15T09:45:00",
    user: {
      id: "2",
      name: "María González",
      email: "maria.gonzalez@ejemplo.com",
    },
    description: "Pago de alquiler",
    fee: 2.5,
  },
  {
    id: "TRX-12343",
    type: "Pago",
    subtype: "Tarjeta",
    amount: -125.5,
    currency: "USD",
    status: "Completada",
    date: "2023-12-15T08:15:00",
    user: {
      id: "1",
      name: "Juan Díaz",
      email: "juan.diaz@ejemplo.com",
    },
    description: "Compra en supermercado",
    fee: 0.0,
  },
  {
    id: "TRX-12342",
    type: "Depósito",
    subtype: "Efectivo",
    amount: 5000.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-15T07:30:00",
    user: {
      id: "3",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@pyme.com",
    },
    description: "Depósito en cuenta",
    fee: 0.0,
  },
  {
    id: "TRX-12341",
    type: "Inversión",
    subtype: "Compra",
    amount: -2500.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-15T06:45:00",
    user: {
      id: "5",
      name: "Global Solutions S.A.",
      email: "contacto@globalsolutions.com",
    },
    description: "Compra de acciones",
    fee: 5.0,
  },
  {
    id: "TRX-12340",
    type: "Transferencia",
    subtype: "Internacional",
    amount: -3500.0,
    currency: "USD",
    status: "Pendiente",
    date: "2023-12-15T05:30:00",
    user: {
      id: "9",
      name: "Corporación Financiera Internacional",
      email: "contacto@cfi.com",
    },
    description: "Pago a proveedor internacional",
    fee: 25.0,
  },
  {
    id: "TRX-12339",
    type: "Pago",
    subtype: "Servicio",
    amount: -150.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-14T16:15:00",
    user: {
      id: "7",
      name: "Tecnología Avanzada Ltda.",
      email: "info@tecnologiaavanzada.com",
    },
    description: "Pago de servicios de internet",
    fee: 0.0,
  },
  {
    id: "TRX-12338",
    type: "Transferencia",
    subtype: "Recibida",
    amount: 750.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-14T14:30:00",
    user: {
      id: "10",
      name: "Roberto Méndez",
      email: "roberto.mendez@ejemplo.com",
    },
    description: "Devolución de préstamo",
    fee: 0.0,
  },
  {
    id: "TRX-12337",
    type: "Retiro",
    subtype: "ATM",
    amount: -200.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-14T12:45:00",
    user: {
      id: "2",
      name: "María González",
      email: "maria.gonzalez@ejemplo.com",
    },
    description: "Retiro de efectivo",
    fee: 1.5,
  },
  {
    id: "TRX-12336",
    type: "Pago",
    subtype: "Préstamo",
    amount: -450.0,
    currency: "USD",
    status: "Completada",
    date: "2023-12-14T10:15:00",
    user: {
      id: "6",
      name: "Pedro Sánchez",
      email: "pedro.sanchez@ejemplo.com",
    },
    description: "Pago de cuota de préstamo",
    fee: 0.0,
  },
]

export default function TransactionsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // Filtrar transacciones según la pestaña seleccionada
  const filteredTransactions = transactions
    .filter((transaction) => {
      if (selectedTab === "all") return true
      if (selectedTab === "incoming") return transaction.amount > 0
      if (selectedTab === "outgoing") return transaction.amount < 0
      if (selectedTab === "pending") return transaction.status === "Pendiente"
      return true
    })
    .filter((transaction) => {
      if (!searchTerm) return true
      return (
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (selectedRows.length === filteredTransactions.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredTransactions.map((transaction) => transaction.id))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Transacciones</h2>
          <p className="text-muted-foreground">Monitorea y analiza las transacciones de la plataforma LatamPay</p>
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
            <CardTitle className="text-sm font-medium">Total de Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234,567</div>
            <p className="text-xs text-muted-foreground">+12.5% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volumen Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,678,912</div>
            <p className="text-xs text-muted-foreground">+8.3% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comisiones Generadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$345,678</div>
            <p className="text-xs text-muted-foreground">+15.2% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">+0.2% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Transacciones</CardTitle>
          <CardDescription>Gestiona y analiza las transacciones realizadas en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="incoming">Entrantes</TabsTrigger>
                <TabsTrigger value="outgoing">Salientes</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar transacciones..."
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
                          <Checkbox id="type-transfer" />
                          <label
                            htmlFor="type-transfer"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Transferencia
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="type-payment" />
                          <label
                            htmlFor="type-payment"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Pago
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="type-deposit" />
                          <label
                            htmlFor="type-deposit"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Depósito
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <h4 className="text-sm font-medium">Estado</h4>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-completed" />
                          <label
                            htmlFor="status-completed"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Completada
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-pending" />
                          <label
                            htmlFor="status-pending"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Pendiente
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-failed" />
                          <label
                            htmlFor="status-failed"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Fallida
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
                          checked={
                            selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0
                          }
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
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end">
                          Monto
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Comisión</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className={selectedRows.includes(transaction.id) ? "bg-muted/50" : ""}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(transaction.id)}
                            onCheckedChange={() => toggleSelectRow(transaction.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{transaction.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{transaction.user.name}</div>
                              <div className="text-xs text-muted-foreground">{transaction.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{transaction.type}</span>
                            <span className="text-xs text-muted-foreground">{transaction.subtype}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Completada"
                                ? "default"
                                : transaction.status === "Pendiente"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={`flex items-center justify-end ${transaction.amount > 0 ? "text-green-500" : ""}`}
                          >
                            {transaction.amount > 0 ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : transaction.amount < 0 ? (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            ) : null}
                            ${Math.abs(transaction.amount).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${transaction.fee.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/transacciones/${transaction.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {transaction.status === "Pendiente" ? (
                                <>
                                  <DropdownMenuItem className="text-green-500">Aprobar</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">Rechazar</DropdownMenuItem>
                                </>
                              ) : null}
                              <DropdownMenuItem>Generar recibo</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="incoming" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={
                            selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0
                          }
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
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end">
                          Monto
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Comisión</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className={selectedRows.includes(transaction.id) ? "bg-muted/50" : ""}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(transaction.id)}
                            onCheckedChange={() => toggleSelectRow(transaction.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{transaction.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{transaction.user.name}</div>
                              <div className="text-xs text-muted-foreground">{transaction.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{transaction.type}</span>
                            <span className="text-xs text-muted-foreground">{transaction.subtype}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Completada"
                                ? "default"
                                : transaction.status === "Pendiente"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end text-green-500">
                            <ArrowUp className="mr-1 h-3 w-3" />${Math.abs(transaction.amount).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${transaction.fee.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/transacciones/${transaction.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {transaction.status === "Pendiente" ? (
                                <>
                                  <DropdownMenuItem className="text-green-500">Aprobar</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">Rechazar</DropdownMenuItem>
                                </>
                              ) : null}
                              <DropdownMenuItem>Generar recibo</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="outgoing" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={
                            selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0
                          }
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
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end">
                          Monto
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Comisión</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className={selectedRows.includes(transaction.id) ? "bg-muted/50" : ""}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(transaction.id)}
                            onCheckedChange={() => toggleSelectRow(transaction.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{transaction.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{transaction.user.name}</div>
                              <div className="text-xs text-muted-foreground">{transaction.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{transaction.type}</span>
                            <span className="text-xs text-muted-foreground">{transaction.subtype}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Completada"
                                ? "default"
                                : transaction.status === "Pendiente"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <ArrowDown className="mr-1 h-3 w-3" />${Math.abs(transaction.amount).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${transaction.fee.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/transacciones/${transaction.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {transaction.status === "Pendiente" ? (
                                <>
                                  <DropdownMenuItem className="text-green-500">Aprobar</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">Rechazar</DropdownMenuItem>
                                </>
                              ) : null}
                              <DropdownMenuItem>Generar recibo</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="pending" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={
                            selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0
                          }
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
                      <TableHead>
                        <div className="flex items-center">
                          Fecha
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end">
                          Monto
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Comisión</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className={selectedRows.includes(transaction.id) ? "bg-muted/50" : ""}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(transaction.id)}
                            onCheckedChange={() => toggleSelectRow(transaction.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{transaction.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{transaction.user.name}</div>
                              <div className="text-xs text-muted-foreground">{transaction.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{transaction.type}</span>
                            <span className="text-xs text-muted-foreground">{transaction.subtype}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={`flex items-center justify-end ${transaction.amount > 0 ? "text-green-500" : ""}`}
                          >
                            {transaction.amount > 0 ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : transaction.amount < 0 ? (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            ) : null}
                            ${Math.abs(transaction.amount).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${transaction.fee.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/transacciones/${transaction.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-green-500">Aprobar</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">Rechazar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Generar recibo</DropdownMenuItem>
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
              Mostrando <strong>{filteredTransactions.length}</strong> de <strong>{transactions.length}</strong>{" "}
              transacciones
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

