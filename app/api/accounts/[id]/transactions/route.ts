import { type NextRequest, NextResponse } from "next/server"
import { accountService } from "@/lib/services/accountService"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Obtener el ID del usuario del header (establecido por el middleware)
    const userId = req.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener la cuenta para verificar propiedad
    const account = await accountService.getAccountById(params.id)

    if (!account) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 })
    }

    // Verificar que el usuario sea propietario de la cuenta
    if (account.userId !== userId) {
      return NextResponse.json({ error: "No autorizado para acceder a esta cuenta" }, { status: 403 })
    }

    // Obtener parámetros de paginación
    const url = new URL(req.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")

    // Obtener las transacciones
    const { transactions, total } = await accountService.getAccountTransactions(params.id, page, limit)

    return NextResponse.json({
      transactions,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error al obtener transacciones:", error)
    return NextResponse.json({ error: "Error al obtener las transacciones" }, { status: 500 })
  }
}

