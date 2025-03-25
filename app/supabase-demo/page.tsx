import SupabaseConnectionChecker from "@/components/supabase-connection-checker"
import SupabaseLogin from "@/components/supabase-login"
import EnvChecker from "@/components/env-checker"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function SupabaseDemoPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Demostración de Integración con Supabase</h1>

      <div className="max-w-md mx-auto space-y-8">
        <div className="flex justify-end">
          <Link href="/admin/supabase-config">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurar Supabase
            </Button>
          </Link>
        </div>

        <EnvChecker />
        <SupabaseConnectionChecker />
        <SupabaseLogin />

        <div className="p-4 bg-gray-50 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Credenciales de Prueba</h2>
          <p className="text-sm text-gray-600 mb-4">Usa estas credenciales para probar la autenticación de Supabase:</p>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded border">
              <p className="font-medium">Cuenta Personal</p>
              <p className="text-sm">Email: personal@example.com</p>
              <p className="text-sm">Contraseña: Password123</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <p className="font-medium">Cuenta PyME</p>
              <p className="text-sm">Email: pyme@example.com</p>
              <p className="text-sm">Contraseña: Password123</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <p className="font-medium">Cuenta Empresarial</p>
              <p className="text-sm">Email: empresarial@example.com</p>
              <p className="text-sm">Contraseña: Password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

