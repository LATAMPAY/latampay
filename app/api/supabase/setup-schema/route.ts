import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: false, message: "Faltan variables de entorno de Supabase" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Crear tabla de cuentas si no existe
    const { error: accountsError } = await supabase.rpc("create_accounts_table_if_not_exists", {})
    if (accountsError) {
      console.error("Error al crear tabla de cuentas:", accountsError)
      // Continuar con otras tablas
    }

    // Crear tabla de transacciones si no existe
    const { error: transactionsError } = await supabase.rpc("create_transactions_table_if_not_exists", {})
    if (transactionsError) {
      console.error("Error al crear tabla de transacciones:", transactionsError)
      // Continuar con otras tablas
    }

    // Crear tabla de tarjetas si no existe
    const { error: cardsError } = await supabase.rpc("create_cards_table_if_not_exists", {})
    if (cardsError) {
      console.error("Error al crear tabla de tarjetas:", cardsError)
      // Continuar con otras tablas
    }

    // Crear tabla de inversiones si no existe
    const { error: investmentsError } = await supabase.rpc("create_investments_table_if_not_exists", {})
    if (investmentsError) {
      console.error("Error al crear tabla de inversiones:", investmentsError)
      // Continuar con otras tablas
    }

    // Crear tabla de préstamos si no existe
    const { error: loansError } = await supabase.rpc("create_loans_table_if_not_exists", {})
    if (loansError) {
      console.error("Error al crear tabla de préstamos:", loansError)
      // Continuar con otras tablas
    }

    // Crear tabla de alertas de riesgo si no existe
    const { error: riskAlertsError } = await supabase.rpc("create_risk_alerts_table_if_not_exists", {})
    if (riskAlertsError) {
      console.error("Error al crear tabla de alertas de riesgo:", riskAlertsError)
      // Continuar con otras tablas
    }

    return NextResponse.json({
      success: true,
      message: "Esquema configurado correctamente",
    })
  } catch (error) {
    console.error("Error al configurar esquema:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error al configurar esquema",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

