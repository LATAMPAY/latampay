import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    // <div className="flex min-h-screen flex-col">
    //   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    //     <div className="container flex h-16 items-center justify-between">
    //       <div className="flex items-center gap-2">
    //         <Globe className="h-6 w-6 text-primary" />
    //         <span className="text-xl font-bold">LatamPay</span>
    //       </div>
    //       <nav className="hidden md:flex gap-6">
    //         <Link
    //           href="/servicios/tarjetas"
    //           className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //         >
    //           Tarjetas
    //         </Link>
    //         <Link
    //           href="/servicios/transferencias"
    //           className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //         >
    //           Transferencias
    //         </Link>
    //         <Link
    //           href="/servicios/inversiones"
    //           className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //         >
    //           Inversiones
    //         </Link>
    //         <Link
    //           href="/servicios/creditos"
    //           className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //         >
    //           Créditos
    //         </Link>
    //         <Link
    //           href="/acerca"
    //           className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //         >
    //           Acerca de
    //         </Link>
    //       </nav>
    //       <div className="flex items-center gap-4">
    //         <LoginModal
    //           trigger={
    //             <Button variant="outline" size="sm">
    //               Iniciar Sesión
    //             </Button>
    //           }
    //         />
    //         <Button size="sm" asChild>
    //           <Link href="/registro">Registrarse</Link>
    //         </Button>
    //       </div>
    //     </div>
    //   </header>
    //   <main className="flex-1">
    //     <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
    //       <div className="container px-4 md:px-6">
    //         <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
    //           <div className="flex flex-col justify-center space-y-4">
    //             <div className="space-y-2">
    //               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
    //                 Democratizando el acceso a servicios financieros en Latinoamérica
    //               </h1>
    //               <p className="max-w-[600px] text-muted-foreground md:text-xl">
    //                 LatamPay ofrece soluciones financieras integrales para usuarios individuales, PyMEs, empresas y
    //                 corporaciones.
    //               </p>
    //             </div>
    //             <div className="flex flex-col gap-2 min-[400px]:flex-row">
    //               <Button size="lg" className="gap-1" asChild>
    //                 <Link href="/registro">
    //                   Comenzar ahora <ArrowRight className="h-4 w-4" />
    //                 </Link>
    //               </Button>
    //               <Button size="lg" variant="outline" asChild>
    //                 <Link href="/servicios">Conocer más</Link>
    //               </Button>
    //             </div>
    //           </div>
    //           <div className="flex items-center justify-center">
    //             <Card className="w-full max-w-md">
    //               <CardHeader>
    //                 <CardTitle>Accede a tu cuenta</CardTitle>
    //                 <CardDescription>Ingresa tus credenciales para acceder a tu cuenta LatamPay</CardDescription>
    //               </CardHeader>
    //               <CardContent className="space-y-4">
    //                 <div className="space-y-2">
    //                   <label
    //                     htmlFor="email"
    //                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                   >
    //                     Email
    //                   </label>
    //                   <input
    //                     id="email"
    //                     type="email"
    //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //                     placeholder="nombre@ejemplo.com"
    //                   />
    //                 </div>
    //                 <div className="space-y-2">
    //                   <div className="flex items-center justify-between">
    //                     <label
    //                       htmlFor="password"
    //                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                     >
    //                       Contraseña
    //                     </label>
    //                     <Link href="#" className="text-sm text-primary hover:underline">
    //                       ¿Olvidaste tu contraseña?
    //                     </Link>
    //                   </div>
    //                   <input
    //                     id="password"
    //                     type="password"
    //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //                   />
    //                 </div>
    //               </CardContent>
    //               <CardFooter>
    //                 <LoginModal trigger={<Button className="w-full">Iniciar sesión</Button>} />
    //               </CardFooter>
    //             </Card>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //     <section className="w-full py-12 md:py-24 lg:py-32">
    //       <div className="container px-4 md:px-6">
    //         <div className="flex flex-col items-center justify-center space-y-4 text-center">
    //           <div className="space-y-2">
    //             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Servicios</h2>
    //             <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
    //               Soluciones financieras completas para todas tus necesidades
    //             </p>
    //           </div>
    //         </div>
    //         <Tabs defaultValue="personal" className="mt-8">
    //           <div className="flex justify-center mb-8">
    //             <TabsList>
    //               <TabsTrigger value="personal">Personal</TabsTrigger>
    //               <TabsTrigger value="pyme">PyME</TabsTrigger>
    //               <TabsTrigger value="empresarial">Empresarial</TabsTrigger>
    //             </TabsList>
    //           </div>
    //           <TabsContent value="personal" className="space-y-4">
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <CreditCard className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Tarjetas</CardTitle>
    //                     <CardDescription>Débito y crédito con beneficios exclusivos</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Accede a nuestras tarjetas con tecnología contactless, control de gastos en tiempo real y
    //                     beneficios exclusivos.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/tarjetas">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <Send className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Transferencias</CardTitle>
    //                     <CardDescription>Nacionales e internacionales</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Envía dinero de forma rápida y segura a cualquier parte de Latinoamérica con tarifas
    //                     competitivas.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/transferencias">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <PieChart className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Inversiones</CardTitle>
    //                     <CardDescription>Haz crecer tu dinero</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Accede a oportunidades de inversión personalizadas según tu perfil de riesgo y objetivos
    //                     financieros.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/inversiones">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //             </div>
    //           </TabsContent>
    //           <TabsContent value="pyme" className="space-y-4">
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <Globe className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Gestión Financiera</CardTitle>
    //                     <CardDescription>Control total de tus finanzas</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Herramientas para administrar tus finanzas, controlar gastos y optimizar el flujo de caja de tu
    //                     PyME.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/pyme/gestion">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <DollarSign className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Créditos PyME</CardTitle>
    //                     <CardDescription>Financiamiento a tu medida</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Soluciones de financiamiento adaptadas a las necesidades de tu pequeña o mediana empresa.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/creditos">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <Users className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Nómina</CardTitle>
    //                     <CardDescription>Gestión de pagos a empleados</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Simplifica el pago de nómina y gestiona los beneficios de tus empleados de manera eficiente.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/pyme/nomina">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //             </div>
    //           </TabsContent>
    //           <TabsContent value="empresarial" className="space-y-4">
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <Globe className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Comercio Internacional</CardTitle>
    //                     <CardDescription>Soluciones globales</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Facilita tus operaciones internacionales con cuentas multidivisa y servicios especializados.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/empresarial/comercio-internacional">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <Shield className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Tesorería Corporativa</CardTitle>
    //                     <CardDescription>Gestión avanzada</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Herramientas avanzadas para la gestión de tesorería, liquidez y riesgos financieros.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/empresarial/tesoreria">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //               <Card>
    //                 <CardHeader className="flex flex-row items-center gap-4">
    //                   <DollarSign className="h-8 w-8 text-primary" />
    //                   <div>
    //                     <CardTitle>Financiamiento Empresarial</CardTitle>
    //                     <CardDescription>Soluciones a gran escala</CardDescription>
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent>
    //                   <p className="text-sm text-muted-foreground">
    //                     Opciones de financiamiento estructurado para proyectos de gran envergadura y expansión.
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter>
    //                   <Button variant="outline" size="sm" className="w-full" asChild>
    //                     <Link href="/servicios/empresarial/financiamiento">Conocer más</Link>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //             </div>
    //           </TabsContent>
    //         </Tabs>
    //       </div>
    //     </section>
    //     <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
    //       <div className="container px-4 md:px-6">
    //         <div className="flex flex-col items-center justify-center space-y-4 text-center">
    //           <div className="space-y-2">
    //             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
    //               ¿Por qué elegir LatamPay?
    //             </h2>
    //             <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
    //               Nuestra propuesta de valor
    //             </p>
    //           </div>
    //         </div>
    //         <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
    //           <Card className="bg-background">
    //             <CardHeader>
    //               <CardTitle className="text-center">Inclusión financiera</CardTitle>
    //             </CardHeader>
    //             <CardContent className="text-center">
    //               <p className="text-sm text-muted-foreground">
    //                 Democratizamos el acceso a servicios financieros para todos los segmentos de la población.
    //               </p>
    //             </CardContent>
    //           </Card>
    //           <Card className="bg-background">
    //             <CardHeader>
    //               <CardTitle className="text-center">Simplicidad</CardTitle>
    //             </CardHeader>
    //             <CardContent className="text-center">
    //               <p className="text-sm text-muted-foreground">
    //                 Interfaz intuitiva y procesos simplificados para una experiencia de usuario excepcional.
    //               </p>
    //             </CardContent>
    //           </Card>
    //           <Card className="bg-background">
    //             <CardHeader>
    //               <CardTitle className="text-center">Personalización</CardTitle>
    //             </CardHeader>
    //             <CardContent className="text-center">
    //               <p className="text-sm text-muted-foreground">
    //                 Soluciones adaptadas a las necesidades específicas de cada cliente y segmento.
    //               </p>
    //             </CardContent>
    //           </Card>
    //           <Card className="bg-background">
    //             <CardHeader>
    //               <CardTitle className="text-center">Presencia regional</CardTitle>
    //             </CardHeader>
    //             <CardContent className="text-center">
    //               <p className="text-sm text-muted-foreground">
    //                 Cobertura en toda Latinoamérica con adaptación a las particularidades de cada mercado.
    //               </p>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    //   <footer className="w-full border-t py-6 md:py-0">
    //     <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
    //       <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
    //         © 2023 LatamPay. Todos los derechos reservados. RM INTERNATIONAL GROUP SAS.
    //       </p>
    //       <div className="flex gap-4">
    //         <Link href="#" className="text-sm text-muted-foreground hover:underline">
    //           Términos y condiciones
    //         </Link>
    //         <Link href="#" className="text-sm text-muted-foreground hover:underline">
    //           Política de privacidad
    //         </Link>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8 text-center">LatamPay</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link href="/admin/db-setup" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col">
              <span className="text-lg font-medium">Configuración Neon DB</span>
              <span className="text-xs text-muted-foreground mt-1">Configurar base de datos Neon</span>
            </Button>
          </Link>

          <Link href="/admin/supabase-config" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col">
              <span className="text-lg font-medium">Configuración Supabase</span>
              <span className="text-xs text-muted-foreground mt-1">Configurar autenticación con Supabase</span>
            </Button>
          </Link>

          <Link href="/registro" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col">
              <span className="text-lg font-medium">Registro</span>
              <span className="text-xs text-muted-foreground mt-1">Crear una nueva cuenta</span>
            </Button>
          </Link>

          <Link href="/dashboard" className="w-full">
            <Button variant="outline" className="w-full h-24 flex flex-col">
              <span className="text-lg font-medium">Dashboard</span>
              <span className="text-xs text-muted-foreground mt-1">Acceder al dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

