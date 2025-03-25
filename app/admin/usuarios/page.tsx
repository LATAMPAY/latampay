"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, Download, Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"

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

// Datos de ejemplo para la tabla de usuarios
const users = [
  {
    id: "1",
    name: "Juan Díaz",
    email: "juan.diaz@ejemplo.com",
    type: "Personal",
    status: "Activo",
    registrationDate: "2023-12-01",
    lastLogin: "2023-12-15",
    transactions: 24,
    balance: 3250.75,
  },
  {
    id: "2",
    name: "María González",
    email: "maria.gonzalez@ejemplo.com",
    type: "Personal",
    status: "Activo",
    registrationDate: "2023-11-15",
    lastLogin: "2023-12-14",
    transactions: 18,
    balance: 1850.5,
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@pyme.com",
    type: "PyME",
    status: "Activo",
    registrationDate: "2023-10-20",
    lastLogin: "2023-12-15",
    transactions: 45,
    balance: 12500.0,
  },
  {
    id: "4",
    name: "Laura Martínez",
    email: "laura.martinez@ejemplo.com",
    type: "Personal",
    status: "Inactivo",
    registrationDate: "2023-09-05",
    lastLogin: "2023-11-20",
    transactions: 12,
    balance: 750.25,
  },
  {
    id: "5",
    name: "Global Solutions S.A.",
    email: "contacto@globalsolutions.com",
    type: "Empresarial",
    status: "Activo",
    registrationDate: "2023-08-10",
    lastLogin: "2023-12-14",
    transactions: 87,
    balance: 125000.0,
  },
  {
    id: "6",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@ejemplo.com",
    type: "Personal",
    status: "Pendiente",
    registrationDate: "2023-12-10",
    lastLogin: "2023-12-10",
    transactions: 2,
    balance: 500.0,
  },
  {
    id: "7",
    name: "Tecnología Avanzada Ltda.",
    email: "info@tecnologiaavanzada.com",
    type: "PyME",
    status: "Activo",
    registrationDate: "2023-07-15",
    lastLogin: "2023-12-13",
    transactions: 56,
    balance: 28750.5,
  },
  {
    id: "8",
    name: "Ana López",
    email: "ana.lopez@ejemplo.com",
    type: "Personal",
    status: "Bloqueado",
    registrationDate: "2023-05-20",
    lastLogin: "2023-11-05",
    transactions: 32,
    balance: 0.0,
  },
  {
    id: "9",
    name: "Corporación Financiera Internacional",
    email: "contacto@cfi.com",
    type: "Empresarial",
    status: "Activo",
    registrationDate: "2023-03-10",
    lastLogin: "2023-12-15",
    transactions: 124,
    balance: 450000.0,
  },
  {
    id: "10",
    name: "Roberto Méndez",
    email: "roberto.mendez@ejemplo.com",
    type: "Personal",
    status: "Activo",
    registrationDate: "2023-06-18",
    lastLogin: "2023-12-12",
    transactions: 28,
    balance: 4200.75,
  },
]

export default function UsersPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // Filtrar usuarios según la pestaña seleccionada
  const filteredUsers = users
    .filter((user) => {
      if (selectedTab === "all") return true
      if (selectedTab === "personal") return user.type === "Personal"
      if (selectedTab === "pyme") return user.type === "PyME"
      if (selectedTab === "empresarial") return user.type === "Empresarial"
      return true
    })
    .filter((user) => {
      if (!searchTerm) return true
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.includes(searchTerm)
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
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredUsers.map((user) => user.id))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
          <p className="text-muted-foreground">Administra y analiza los usuarios de la plataforma LatamPay</p>
        </div>
        <div className="mt-4 flex items-center gap-2 md:mt-0">
          <Button asChild>
            <Link href="/admin/usuarios/nuevo">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+1,234 nuevos usuarios este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38,492</div>
            <p className="text-xs text-muted-foreground">85% del total de usuarios</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% respecto al mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Promedio por Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250</div>
            <p className="text-xs text-muted-foreground">+$125 respecto al mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Usuarios</CardTitle>
          <CardDescription>Gestiona los usuarios registrados en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="pyme">PyME</TabsTrigger>
                <TabsTrigger value="empresarial">Empresarial</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar usuarios..."
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
                        <h4 className="text-sm font-medium">Estado</h4>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-active" />
                          <label
                            htmlFor="status-active"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Activo
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-inactive" />
                          <label
                            htmlFor="status-inactive"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Inactivo
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="status-blocked" />
                          <label
                            htmlFor="status-blocked"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Bloqueado
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <h4 className="text-sm font-medium">Fecha de registro</h4>
                        <div className="grid gap-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar período" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7d">Últimos 7 días</SelectItem>
                              <SelectItem value="30d">Últimos 30 días</SelectItem>
                              <SelectItem value="90d">Últimos 90 días</SelectItem>
                              <SelectItem value="1y">Último año</SelectItem>
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
                          checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Usuario
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Registro
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Último acceso</TableHead>
                      <TableHead className="text-right">Transacciones</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className={selectedRows.includes(user.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(user.id)}
                            onCheckedChange={() => toggleSelectRow(user.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.type === "Personal"
                                ? "bg-blue-500/10 text-blue-500"
                                : user.type === "PyME"
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-purple-500/10 text-purple-500"
                            }
                          >
                            {user.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Activo"
                                ? "default"
                                : user.status === "Inactivo"
                                  ? "secondary"
                                  : user.status === "Pendiente"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{user.transactions}</TableCell>
                        <TableCell className="text-right">${user.balance.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/usuarios/${user.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Ver transacciones</DropdownMenuItem>
                              <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Activo" ? (
                                <DropdownMenuItem className="text-amber-500">Bloquear usuario</DropdownMenuItem>
                              ) : user.status === "Bloqueado" ? (
                                <DropdownMenuItem className="text-green-500">Desbloquear usuario</DropdownMenuItem>
                              ) : null}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="personal" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Usuario
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Registro
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Último acceso</TableHead>
                      <TableHead className="text-right">Transacciones</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className={selectedRows.includes(user.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(user.id)}
                            onCheckedChange={() => toggleSelectRow(user.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Activo"
                                ? "default"
                                : user.status === "Inactivo"
                                  ? "secondary"
                                  : user.status === "Pendiente"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{user.transactions}</TableCell>
                        <TableCell className="text-right">${user.balance.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/usuarios/${user.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Ver transacciones</DropdownMenuItem>
                              <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Activo" ? (
                                <DropdownMenuItem className="text-amber-500">Bloquear usuario</DropdownMenuItem>
                              ) : user.status === "Bloqueado" ? (
                                <DropdownMenuItem className="text-green-500">Desbloquear usuario</DropdownMenuItem>
                              ) : null}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="pyme" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Empresa
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Registro
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Último acceso</TableHead>
                      <TableHead className="text-right">Transacciones</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className={selectedRows.includes(user.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(user.id)}
                            onCheckedChange={() => toggleSelectRow(user.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Activo"
                                ? "default"
                                : user.status === "Inactivo"
                                  ? "secondary"
                                  : user.status === "Pendiente"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{user.transactions}</TableCell>
                        <TableCell className="text-right">${user.balance.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/usuarios/${user.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Ver transacciones</DropdownMenuItem>
                              <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Activo" ? (
                                <DropdownMenuItem className="text-amber-500">Bloquear usuario</DropdownMenuItem>
                              ) : user.status === "Bloqueado" ? (
                                <DropdownMenuItem className="text-green-500">Desbloquear usuario</DropdownMenuItem>
                              ) : null}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="empresarial" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Corporación
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Registro
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Último acceso</TableHead>
                      <TableHead className="text-right">Transacciones</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className={selectedRows.includes(user.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(user.id)}
                            onCheckedChange={() => toggleSelectRow(user.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Activo"
                                ? "default"
                                : user.status === "Inactivo"
                                  ? "secondary"
                                  : user.status === "Pendiente"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{user.transactions}</TableCell>
                        <TableCell className="text-right">${user.balance.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/usuarios/${user.id}`}>Ver detalles</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Ver transacciones</DropdownMenuItem>
                              <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Activo" ? (
                                <DropdownMenuItem className="text-amber-500">Bloquear usuario</DropdownMenuItem>
                              ) : user.status === "Bloqueado" ? (
                                <DropdownMenuItem className="text-green-500">Desbloquear usuario</DropdownMenuItem>
                              ) : null}
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
              Mostrando <strong>{filteredUsers.length}</strong> de <strong>{users.length}</strong> usuarios
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

