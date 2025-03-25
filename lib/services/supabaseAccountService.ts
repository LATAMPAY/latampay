import { createClient } from "@supabase/supabase-js"

// Tipos
interface TransferInput {
  amount: number
  fromAccountId: string
  toAccountId: string
  description?: string
  userId: string
}

interface TransactionInput {
  amount: number
  accountId: string
  userId: string
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT" | "INVESTMENT" | "LOAN_PAYMENT"
  description?: string
  reference?: string
  fee?: number
}

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Servicios para cuentas y transacciones
export const supabaseAccountService = {
  // Obtener cuenta por ID
  async getAccountById(id: string) {
    const { data, error } = await supabase
      .from("accounts")
      .select(`
        *,
        user:users(*)
      `)
      .eq("id", id)
      .single()

    if (error) return null
    return data
  },

  // Obtener cuentas de un usuario
  async getUserAccounts(userId: string) {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false })

    if (error) throw new Error(`Error al obtener cuentas: ${error.message}`)
    return data || []
  },

  // Crear una nueva cuenta
  async createAccount(userId: string, currency = "USD") {
    const accountNumber = `AC${Date.now()}${Math.floor(Math.random() * 1000)}`

    const { data, error } = await supabase
      .from("accounts")
      .insert({
        user_id: userId,
        account_number: accountNumber,
        balance: 0,
        currency,
        is_default: false,
      })
      .select()
      .single()

    if (error) throw new Error(`Error al crear cuenta: ${error.message}`)
    return data
  },

  // Realizar un depósito
  async deposit(input: TransactionInput) {
    const { amount, accountId, userId, type, description, reference, fee = 0 } = input

    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // Iniciar una transacción manual
    // Nota: Supabase no tiene transacciones nativas, así que tenemos que manejar esto cuidadosamente

    // 1. Obtener la cuenta actual
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .single()

    if (accountError || !account) throw new Error("Cuenta no encontrada")

    // 2. Actualizar el saldo de la cuenta
    const newBalance = account.balance + (amount - fee)
    const { error: updateError } = await supabase.from("accounts").update({ balance: newBalance }).eq("id", accountId)

    if (updateError) throw new Error(`Error al actualizar saldo: ${updateError.message}`)

    // 3. Registrar la transacción
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        amount,
        account_id: accountId,
        user_id: userId,
        type: type.toLowerCase(),
        status: "COMPLETED",
        description,
        reference,
        fee,
      })
      .select()
      .single()

    if (transactionError) throw new Error(`Error al registrar transacción: ${transactionError.message}`)

    return transaction
  },

  // Realizar un retiro
  async withdraw(input: TransactionInput) {
    const { amount, accountId, userId, type, description, reference, fee = 0 } = input

    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // 1. Obtener la cuenta
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .single()

    if (accountError || !account) throw new Error("Cuenta no encontrada")

    // Verificar que haya saldo suficiente
    const totalAmount = amount + fee
    if (account.balance < totalAmount) {
      throw new Error("Saldo insuficiente")
    }

    // 2. Actualizar el saldo de la cuenta
    const newBalance = account.balance - totalAmount
    const { error: updateError } = await supabase.from("accounts").update({ balance: newBalance }).eq("id", accountId)

    if (updateError) throw new Error(`Error al actualizar saldo: ${updateError.message}`)

    // 3. Registrar la transacción
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        amount: -amount, // Monto negativo para retiros
        account_id: accountId,
        user_id: userId,
        type: type.toLowerCase(),
        status: "COMPLETED",
        description,
        reference,
        fee,
      })
      .select()
      .single()

    if (transactionError) throw new Error(`Error al registrar transacción: ${transactionError.message}`)

    return transaction
  },

  // Obtener transacciones de una cuenta
  async getAccountTransactions(accountId: string, page = 1, limit = 10) {
    // Calcular el rango para la paginación
    const from = (page - 1) * limit
    const to = from + limit - 1

    // Obtener transacciones
    const { data, count, error } = await supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .eq("account_id", accountId)
      .order("created_at", { ascending: false })
      .range(from, to)

    if (error) throw new Error(`Error al obtener transacciones: ${error.message}`)

    return {
      transactions: data || [],
      total: count || 0,
    }
  },
}

