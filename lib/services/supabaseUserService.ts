import { createClient } from "@supabase/supabase-js"

// Tipos
export interface CreateUserInput {
  email: string
  password: string
  name: string
  lastName?: string
  phone?: string
  accountType: "PERSONAL" | "PYME" | "EMPRESARIAL"
  companyName?: string
  taxId?: string
}

export interface UpdateUserInput {
  name?: string
  lastName?: string
  phone?: string
  companyName?: string
  taxId?: string
  status?: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED"
}

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Servicios para usuarios
export const supabaseUserService = {
  // Crear un nuevo usuario
  async createUser(input: CreateUserInput) {
    const { email, password, name, lastName, phone, accountType, companyName, taxId } = input

    // Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: `${name} ${lastName || ""}`.trim(),
        phone,
        account_type: accountType.toLowerCase(),
        company_name: companyName,
        tax_id: taxId,
      },
    })

    if (authError) throw new Error(`Error al crear usuario: ${authError.message}`)

    // Crear perfil de usuario en la tabla users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email,
        full_name: `${name} ${lastName || ""}`.trim(),
        account_type: accountType.toLowerCase(),
      })
      .select()
      .single()

    if (userError) throw new Error(`Error al crear perfil de usuario: ${userError.message}`)

    // Crear cuenta por defecto para el usuario
    const accountNumber = `AC${Date.now()}${Math.floor(Math.random() * 1000)}`
    const { data: accountData, error: accountError } = await supabase.from("accounts").insert({
      user_id: authData.user.id,
      account_number: accountNumber,
      balance: 0,
      currency: "USD",
      is_default: true,
    })

    if (accountError) throw new Error(`Error al crear cuenta: ${accountError.message}`)

    return { user: authData.user, profile: userData }
  },

  // Obtener un usuario por email
  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from("users")
      .select(`
        *,
        accounts:accounts(*)
      `)
      .eq("email", email)
      .single()

    if (error) return null
    return data
  },

  // Obtener un usuario por ID
  async getUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select(`
        *,
        accounts:accounts(*),
        cards:cards(*)
      `)
      .eq("id", id)
      .single()

    if (error) return null
    return data
  },

  // Actualizar un usuario
  async updateUser(id: string, input: UpdateUserInput) {
    const { data, error } = await supabase
      .from("users")
      .update({
        full_name: input.name ? (input.lastName ? `${input.name} ${input.lastName}` : input.name) : undefined,
        company_name: input.companyName,
        tax_id: input.taxId,
        status: input.status?.toLowerCase(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw new Error(`Error al actualizar usuario: ${error.message}`)
    return data
  },

  // Buscar usuarios con paginación
  async findUsers(search?: string, accountType?: string, status?: string, page = 1, limit = 10) {
    let query = supabase.from("users").select("*, accounts!inner(*)", { count: "exact" })

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,company_name.ilike.%${search}%`)
    }

    if (accountType) {
      query = query.eq("account_type", accountType.toLowerCase())
    }

    if (status) {
      query = query.eq("status", status.toLowerCase())
    }

    // Paginación
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, count, error } = await query.order("created_at", { ascending: false }).range(from, to)

    if (error) throw new Error(`Error al buscar usuarios: ${error.message}`)

    return {
      users: data || [],
      total: count || 0,
    }
  },

  // Verificar contraseña (esto se maneja directamente con Supabase Auth)
  async verifyPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return !error && !!data.user
  },
}

