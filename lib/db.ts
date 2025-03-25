import { createClient } from "@supabase/supabase-js"

// Obtener las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Crear cliente de Supabase para el servidor (con clave de servicio)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Crear cliente de Supabase para el cliente (con clave anónima)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Función para verificar la conexión a Supabase
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabaseAdmin.from("users").select("count").limit(1)
    if (error) throw error
    return { connected: true, message: "Conexión a Supabase establecida correctamente" }
  } catch (error) {
    console.error("Error al conectar con Supabase:", error)
    return { connected: false, message: "Error al conectar con Supabase", error }
  }
}

