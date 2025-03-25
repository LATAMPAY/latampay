import { type NextRequest, NextResponse } from "next/server"
import { accountService } from "@/lib/services/accountService"
import { TransactionType } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    // Obtener el ID del usuario del header (establecido por el middleware)
    const userId = req.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await req.json()

    // Validar los datos requeridos
    if (!body.amount || !body.accountId) {
      return NextResponse.json({ error: "Monto y cuenta son requeridos" }, { status: 400 })
    }

    // Validar que el monto sea un número positivo
    const amount = Number.parseFloat(body.amount)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "El monto debe ser un número positivo" }, { status: 400 })
    }

    // Verificar que la cuenta exista y pertenezca al usuario
    const account = await accountService.getAccountById(body.accountId)

    if (!account) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 })
    }

    if (account.userId !== userId) {
      return NextResponse.json({ error: "No autorizado para retirar de esta cuenta" }, { status: 403 })
    }

    // Realizar el retiro
    try {
      const transaction = await accountService.withdraw({
        amount,
        accountId: body.accountId,
        userId,
        type: TransactionType.WITHDRAWAL,
        description: body.description || "Retiro",
        reference: body.reference,
      })

      return NextResponse.json(transaction, { status: 201 })
    } catch (error: any) {
      // Capturar error específico de saldo insuficiente
      if (error.message === "Saldo insuficiente") {
        return NextResponse.json({ error: "Saldo insuficiente para realizar el retiro" }, { status: 400 })
      }
      throw error // Propagar otros errores
    }
  } catch (error) {
    console.error("Error al realizar retiro:", error)
    return NextResponse.json({ error: "Error al procesar el retiro" }, { status: 500 })
  }
}

