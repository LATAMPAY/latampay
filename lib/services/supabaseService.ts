import { createClient } from "@supabase/supabase-js"
import { type User, TransactionType, CardType, CardStatus, type AccountType, type UserStatus } from "@/lib/types"

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Servicios para autenticación
export const authService = {
  // Iniciar sesión
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Registrar usuario
  async signUp(email: string, password: string, userData: Partial<User>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          account_type: userData.account_type,
          company_name: userData.company_name,
          tax_id: userData.tax_id,
          phone: userData.phone,
        },
      },
    })

    if (error) throw error

    // Crear perfil de usuario
    if (data.user) {
      await supabase.from("users").insert({
        id: data.user.id,
        email: data.user.email,
        full_name: userData.full_name,
        account_type: userData.account_type,
        company_name: userData.company_name,
        tax_id: userData.tax_id,
        phone: userData.phone,
        status: "active",
      })

      // Crear cuenta por defecto
      await supabase.from("accounts").insert({
        user_id: data.user.id,
        account_number: `AC${Date.now()}${Math.floor(Math.random() * 1000)}`,
        balance: 0,
        currency: "USD",
        is_default: true,
        status: "active",
      })
    }

    return data
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtener sesión actual
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  // Obtener usuario actual
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  },
}

// Servicios para usuarios
export const userService = {
  // Obtener perfil de usuario actual
  async getCurrentUserProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null

    const { data } = await supabase.from("users").select("*").eq("id", user.id).single()

    return data
  },

  // Obtener usuario por ID
  async getUserById(id: string) {
    const { data } = await supabase.from("users").select("*").eq("id", id).single()

    return data
  },

  // Actualizar usuario
  async updateUser(id: string, userData: Partial<User>) {
    const { data, error } = await supabase.from("users").update(userData).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  // Buscar usuarios con paginación
  async findUsers(search?: string, accountType?: AccountType, status?: UserStatus, page = 1, limit = 10) {
    let query = supabase.from("users").select("*", { count: "exact" })

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,company_name.ilike.%${search}%`)
    }

    if (accountType) {
      query = query.eq("account_type", accountType)
    }

    if (status) {
      query = query.eq("status", status)
    }

    // Paginación
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, count, error } = await query.order("created_at", { ascending: false }).range(from, to)

    if (error) throw error
    return { users: data || [], total: count || 0 }
  },
}

// Servicios para cuentas
export const accountService = {
  // Obtener cuentas del usuario actual
  async getUserAccounts() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  // Obtener cuenta por ID
  async getAccountById(id: string) {
    const { data, error } = await supabase.from("accounts").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  // Crear una nueva cuenta
  async createAccount(currency = "USD") {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    const accountNumber = `AC${Date.now()}${Math.floor(Math.random() * 1000)}`

    const { data, error } = await supabase
      .from("accounts")
      .insert({
        user_id: user.id,
        account_number: accountNumber,
        balance: 0,
        currency,
        is_default: false,
        status: "active",
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Realizar un depósito
  async deposit(accountId: string, amount: number, description?: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    // Iniciar transacción
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .eq("user_id", user.id)
      .single()

    if (accountError) throw accountError
    if (!account) throw new Error("Cuenta no encontrada")

    // Actualizar saldo
    const { error: updateError } = await supabase
      .from("accounts")
      .update({
        balance: account.balance + amount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", accountId)

    if (updateError) throw updateError

    // Registrar transacción
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        amount,
        description: description || "Depósito",
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.COMPLETED,
        account_id: accountId,
        user_id: user.id,
      })
      .select()
      .single()

    if (transactionError) throw transactionError
    return transaction
  },

  // Realizar un retiro
  async withdraw(accountId: string, amount: number, description?: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    // Obtener cuenta
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .eq("user_id", user.id)
      .single()

    if (accountError) throw accountError
    if (!account) throw new Error("Cuenta no encontrada")

    // Verificar saldo
    if (account.balance < amount) {
      throw new Error("Saldo insuficiente")
    }

    // Actualizar saldo
    const { error: updateError } = await supabase
      .from("accounts")
      .update({
        balance: account.balance - amount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", accountId)

    if (updateError) throw updateError

    // Registrar transacción
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        amount: -amount, // Monto negativo para retiros
        description: description || "Retiro",
        type: TransactionType.WITHDRAWAL,
        status: TransactionStatus.COMPLETED,
        account_id: accountId,
        user_id: user.id,
      })
      .select()
      .single()

    if (transactionError) throw transactionError
    return transaction
  },

  // Realizar una transferencia
  async transfer(fromAccountId: string, toAccountId: string, amount: number, description?: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    // Verificar que las cuentas sean diferentes
    if (fromAccountId === toAccountId) {
      throw new Error("No se puede transferir a la misma cuenta")
    }

    // Obtener cuenta origen
    const { data: fromAccount, error: fromError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", fromAccountId)
      .eq("user_id", user.id)
      .single()

    if (fromError) throw fromError
    if (!fromAccount) throw new Error("Cuenta origen no encontrada")

    // Verificar saldo
    if (fromAccount.balance < amount) {
      throw new Error("Saldo insuficiente")
    }

    // Obtener cuenta destino
    const { data: toAccount, error: toError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", toAccountId)
      .single()

    if (toError) throw toError
    if (!toAccount) throw new Error("Cuenta destino no encontrada")

    // Actualizar saldo cuenta origen
    const { error: fromUpdateError } = await supabase
      .from("accounts")
      .update({
        balance: fromAccount.balance - amount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", fromAccountId)

    if (fromUpdateError) throw fromUpdateError

    // Actualizar saldo cuenta destino
    const { error: toUpdateError } = await supabase
      .from("accounts")
      .update({
        balance: toAccount.balance + amount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", toAccountId)

    if (toUpdateError) throw toUpdateError

    // Registrar transacción saliente
    const { data: outTransaction, error: outError } = await supabase
      .from("transactions")
      .insert({
        amount: -amount,
        description: description || `Transferencia a cuenta ${toAccount.account_number}`,
        type: TransactionType.TRANSFER,
        status: TransactionStatus.COMPLETED,
        account_id: fromAccountId,
        user_id: user.id,
        sender_account_id: fromAccountId,
        receiver_account_id: toAccountId,
      })
      .select()
      .single()

    if (outError) throw outError

    // Registrar transacción entrante
    const { error: inError } = await supabase.from("transactions").insert({
      amount: amount,
      description: description || `Transferencia desde cuenta ${fromAccount.account_number}`,
      type: TransactionType.TRANSFER,
      status: TransactionStatus.COMPLETED,
      account_id: toAccountId,
      user_id: toAccount.user_id,
      sender_account_id: fromAccountId,
      receiver_account_id: toAccountId,
    })

    if (inError) throw inError

    return outTransaction
  },

  // Obtener transacciones de una cuenta
  async getAccountTransactions(accountId: string, page = 1, limit = 10) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    // Verificar propiedad de la cuenta
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .eq("user_id", user.id)
      .single()

    if (accountError) throw accountError
    if (!account) throw new Error("Cuenta no encontrada")

    // Paginación
    const from = (page - 1) * limit
    const to = from + limit - 1

    // Obtener transacciones
    const { data, count, error } = await supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .eq("account_id", accountId)
      .order("created_at", { ascending: false })
      .range(from, to)

    if (error) throw error
    return {
      transactions: data || [],
      total: count || 0,
      page,
      limit,
      pages: Math.ceil((count || 0) / limit),
    }
  },
}

// Servicios para tarjetas
export const cardService = {
  // Obtener tarjetas del usuario actual
  async getUserCards() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from("cards")
      .select("*, accounts(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  // Obtener tarjeta por ID
  async getCardById(id: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    const { data, error } = await supabase
      .from("cards")
      .select("*, accounts(*)")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (error) throw error
    return data
  },

  // Crear una nueva tarjeta
  async createCard(accountId: string, type: CardType, cardholderName: string, creditLimit?: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    // Generar número de tarjeta aleatorio
    const cardNumber =
      type === CardType.CREDIT
        ? `5${Math.floor(Math.random() * 1000000000000000)}`.substring(0, 16)
        : `4${Math.floor(Math.random() * 1000000000000000)}`.substring(0, 16)

    // Generar fecha de expiración (3 años desde ahora)
    const today = new Date()
    const expiryDate = new Date(today.getFullYear() + 3, today.getMonth(), 1)

    // Generar CVV aleatorio
    const cvv = Math.floor(Math.random() * 900 + 100).toString()

    const { data, error } = await supabase
      .from("cards")
      .insert({
        account_id: accountId,
        user_id: user.id,
        card_number: cardNumber,
        cardholder_name: cardholderName,
        expiry_date: expiryDate.toISOString(),
        cvv,
        type,
        status: CardStatus.ACTIVE,
        credit_limit: type === CardType.CREDIT ? creditLimit : null,
        available_credit: type === CardType.CREDIT ? creditLimit : null,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Actualizar estado de una tarjeta
  async updateCardStatus(cardId: string, status: CardStatus) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    const { data, error } = await supabase
      .from("cards")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cardId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// Servicios para transacciones
export const transactionService = {
  // Obtener todas las transacciones del usuario
  async getUserTransactions(page = 1, limit = 10) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    // Paginación
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, count, error } = await supabase
      .from("transactions")
      .select("*, accounts(*)", { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(from, to)

    if (error) throw error
    return {
      transactions: data || [],
      total: count || 0,
      page,
      limit,
      pages: Math.ceil((count || 0) / limit),
    }
  },

  // Obtener transacciones de una cuenta específica
  async getAccountTransactions(accountId: string, page = 1, limit = 10) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Usuario no autenticado")

    // Paginación
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, count, error } = await supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .eq("account_id", accountId)
      .order("created_at", { ascending: false })
      .range(from, to)

    if (error) throw error
    return {
      transactions: data || [],
      total: count || 0,
    }
  },

  // Realizar un depósito
  async deposit(accountId: string, userId: string, amount: number, description?: string) {
    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // Obtener la cuenta
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .single()

    if (accountError) throw new Error("Cuenta no encontrada")
    if (!account) throw new Error("Cuenta no encontrada")

    // Actualizar el saldo
    const { error: updateError } = await supabase
      .from("accounts")
      .update({ balance: account.balance + amount })
      .eq("id", accountId)

    if (updateError) throw new Error("Error al actualizar el saldo")

    // Registrar la transacción
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        amount,
        account_id: accountId,
        user_id: userId,
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.COMPLETED,
        description: description || "Depósito",
      })
      .select()
      .single()

    if (transactionError) throw new Error("Error al registrar la transacción")

    return transaction
  },

  // Realizar un retiro
  async withdraw(accountId: string, userId: string, amount: number, description?: string) {
    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // Obtener la cuenta
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", accountId)
      .single()

    if (accountError) throw new Error("Cuenta no encontrada")
    if (!account) throw new Error("Cuenta no encontrada")

    // Verificar saldo suficiente
    if (account.balance < amount) {
      throw new Error("Saldo insuficiente")
    }

    // Actualizar el saldo
    const { error: updateError } = await supabase
      .from("accounts")
      .update({ balance: account.balance - amount })
      .eq("id", accountId)

    if (updateError) throw new Error("Error al actualizar el saldo")

    // Registrar la transacción
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        amount: -amount,
        account_id: accountId,
        user_id: userId,
        type: TransactionType.WITHDRAWAL,
        status: TransactionStatus.COMPLETED,
        description: description || "Retiro",
      })
      .select()
      .single()

    if (transactionError) throw new Error("Error al registrar la transacción")

    return transaction
  },

  // Realizar una transferencia
  async transfer(fromAccountId: string, toAccountId: string, userId: string, amount: number, description?: string) {
    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // Verificar que las cuentas sean diferentes
    if (fromAccountId === toAccountId) {
      throw new Error("No se puede transferir a la misma cuenta")
    }

    // Obtener cuenta origen
    const { data: fromAccount, error: fromError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", fromAccountId)
      .single()

    if (fromError) throw new Error("Cuenta origen no encontrada")
    if (!fromAccount) throw new Error("Cuenta origen no encontrada")

    // Verificar saldo suficiente
    if (fromAccount.balance < amount) {
      throw new Error("Saldo insuficiente")
    }

    // Obtener cuenta destino
    const { data: toAccount, error: toError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", toAccountId)
      .single()

    if (toError) throw new Error("Cuenta destino no encontrada")
    if (!toAccount) throw new Error("Cuenta destino no encontrada")

    // Actualizar saldo cuenta origen
    const { error: fromUpdateError } = await supabase
      .from("accounts")
      .update({ balance: fromAccount.balance - amount })
      .eq("id", fromAccountId)

    if (fromUpdateError) throw new Error("Error al actualizar cuenta origen")

    // Actualizar saldo cuenta destino
    const { error: toUpdateError } = await supabase
      .from("accounts")
      .update({ balance: toAccount.balance + amount })
      .eq("id", toAccountId)

    if (toUpdateError) throw new Error("Error al actualizar cuenta destino")

    // Registrar transacción saliente
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        amount: -amount,
        account_id: fromAccountId,
        user_id: userId,
        type: TransactionType.TRANSFER,
        status: TransactionStatus.COMPLETED,
        description: description || "Transferencia enviada",
        sender_account_id: fromAccountId,
        receiver_account_id: toAccountId,
      })
      .select()
      .single()

    if (transactionError) throw new Error("Error al registrar transacción saliente")

    // Registrar transacción entrante
    const { error: inTransactionError } = await supabase.from("transactions").insert({
      amount: amount,
      account_id: toAccountId,
      user_id: toAccount.user_id,
      type: TransactionType.TRANSFER,
      status: TransactionStatus.COMPLETED,
      description: description || "Transferencia recibida",
      sender_account_id: fromAccountId,
      receiver_account_id: toAccountId,
    })

    if (inTransactionError) throw new Error("Error al registrar transacción entrante")

    return transaction
  },
}

