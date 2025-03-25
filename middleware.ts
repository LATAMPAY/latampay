import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

// Rutas que no requieren autenticación
const publicRoutes = [
  "/",
  "/registro",
  "/supabase-demo",
  "/api/auth/login",
  "/api/auth/register",
  "/setup",
  "/admin/db-setup",
  "/admin/supabase-setup",
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Si la ruta es pública, permitir el acceso sin verificación
  const path = req.nextUrl.pathname
  if (publicRoutes.some((route) => path === route || path.startsWith(route + "/"))) {
    return res
  }

  try {
    // Inicializar el cliente de Supabase
    const supabase = createMiddlewareClient({ req, res })

    // Verificar la sesión
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Si no hay sesión y la ruta requiere autenticación, redirigir al inicio
    if (!session && !path.startsWith("/api/")) {
      const redirectUrl = new URL("/", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Si es una ruta de API y no hay sesión, devolver error 401
    if (!session && path.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Si hay sesión, agregar el ID del usuario a los headers para uso en las APIs
    if (session && session.user) {
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-user-id", session.user.id)
      requestHeaders.set("x-user-email", session.user.email || "")
      requestHeaders.set("x-user-role", session.user.user_metadata?.account_type || "personal")

      // Crear una nueva respuesta con los headers modificados
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
  } catch (error) {
    // En caso de error, permitir el acceso para evitar bloqueos
    console.error("Error en middleware:", error)
  }

  // Continuar con la petición
  return res
}

// Configurar qué rutas deben pasar por el middleware
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}

