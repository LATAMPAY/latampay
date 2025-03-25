import { type NextRequest, NextResponse } from "next/server"
import { accountService } from "@/lib/services/accountService"

export async function POST(req: NextRequest) {
  try {
    // Obtener el ID del usuario del header (establecido por el middleware)
    const userId = req.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await req.json()

    // Validar los datos requeridos
    if (!body.amount || !body.fromAccountId || !body.toAccountId) {
      return NextResponse.json({ error: "Monto, cuenta origen y cuenta destino son requeridos" }, { status: 400 })
    }

    // Validar que el monto sea un número positivo
    const amount = Number.parseFloat(body.amount)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "El monto debe ser un número positivo" }, { status: 400 })
    }

    // Realizar la transferencia
    try {
      const transaction = await accountService.transfer({
        amount,
        fromAccountId: body.fromAccountId,
        toAccountId: body.toAccountId,
        description: body.description,
        userId,
      })

      return NextResponse.json(transaction, { status: 201 })
    } catch (error: any) {
      // Capturar errores específicos
      if (error.message === "Saldo insuficiente") {
        return NextResponse.json({ error: "Saldo insuficiente para realizar la transferencia" }, { status: 400 })
      } else if (error.message === "No autorizado para transferir desde esta cuenta") {
        return NextResponse.json({ error: "No autorizado para transferir desde esta cuenta" }, { status: 403 })
      } else if (error.message === "Cuenta origen no encontrada" || error.message === "Cuenta destino no encontrada") {
        return NextResponse.json({ error: error.message }, { status: 404 })
      } else if (error.message === "No se puede transferir a la misma cuenta") {
        return NextResponse.json({ error: "No se puede transferir a la misma cuenta" }, { status: 400 })
      }
      throw error // Propagar otros errores
    }
  } catch (error) {
    console.error("Error al realizar transferencia:", error)
    return NextResponse.json({ error: "Error al procesar la transferencia" }, { status: 500 })
  }
}

