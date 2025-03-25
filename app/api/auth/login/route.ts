import { type NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/services/userService"
import { cookies } from "next/headers"
import { SignJWT } from "jose"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validar los datos requeridos
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Correo electrónico y contraseña son requeridos" }, { status: 400 })
    }

    // Buscar el usuario por email
    const user = await userService.getUserByEmail(body.email)
    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Verificar la contraseña
    const isPasswordValid = await userService.verifyPassword(user, body.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Verificar que el usuario esté activo
    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Tu cuenta está " + (user.status === "BLOCKED" ? "bloqueada" : "inactiva") },
        { status: 403 },
      )
    }

    // Actualizar la fecha del último login
    await userService.updateUser(user.id, {
      lastLoginAt: new Date(),
    })

    // Crear token JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key-change-in-production")

    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      accountType: user.accountType,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    // Guardar el token en una cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 24 horas
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })

    // Obtener cuentas del usuario
    const accounts = await userService.getUserById(user.id)

    // Excluir la contraseña hash de la respuesta
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      accounts: accounts?.accounts,
    })
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 })
  }
}

