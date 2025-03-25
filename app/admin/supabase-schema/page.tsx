import { SupabaseSchemaSetup } from "@/components/supabase-schema-setup"

export default function SupabaseSchemaPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Configuración de Esquema Supabase</h1>
      <p className="text-center text-muted-foreground mb-8">
        Configura las tablas necesarias para LatamPay en tu base de datos Supabase
      </p>

      <div className="max-w-md mx-auto">
        <SupabaseSchemaSetup />
      </div>
    </div>
  )
}

