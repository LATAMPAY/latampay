import { type NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/services/userService"
import { AccountType } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validar los datos requeridos
    if (!body.email || !body.password || !body.name || !body.accountType) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Validar el tipo de cuenta
    if (!Object.values(AccountType).includes(body.accountType)) {
      return NextResponse.json({ error: "Tipo de cuenta inválido" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await userService.getUserByEmail(body.email)
    if (existingUser) {
      return NextResponse.json({ error: "El correo electrónico ya está registrado" }, { status: 409 })
    }

    // Crear el usuario
    const user = await userService.createUser(body)

    // Excluir la contraseña hash de la respuesta
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return NextResponse.json({ error: "Error al crear el usuario" }, { status: 500 })
  }
}

