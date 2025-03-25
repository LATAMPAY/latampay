import { type NextRequest, NextResponse } from "next/server"
import { accountService } from "@/lib/services/accountService"

export async function GET(req: NextRequest) {
  try {
    // Obtener el ID del usuario del header (establecido por el middleware)
    const userId = req.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener las cuentas del usuario
    const accounts = await accountService.getUserAccounts(userId)

    return NextResponse.json({ accounts })
  } catch (error) {
    console.error("Error al obtener cuentas:", error)
    return NextResponse.json({ error: "Error al obtener las cuentas" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Obtener el ID del usuario del header (establecido por el middleware)
    const userId = req.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await req.json()

    // Crear una nueva cuenta
    const account = await accountService.createAccount(userId, body.currency || "USD")

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    console.error("Error al crear cuenta:", error)
    return NextResponse.json({ error: "Error al crear la cuenta" }, { status: 500 })
  }
}

