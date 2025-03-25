import { SupabaseSetup } from "@/components/supabase-setup"

export default function SupabaseSetupPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Configuración de Supabase</h1>
          <p className="text-muted-foreground">Configura la autenticación y verificación automática para LatamPay</p>
        </div>

        <div className="grid gap-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold mb-3 text-blue-800">Integración con Supabase</h2>
            <p className="text-blue-700 mb-4">
              Supabase proporciona autenticación robusta y verificación automática para tu aplicación LatamPay. Esta
              configuración te permitirá habilitar la verificación por email y otras funcionalidades de seguridad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-1">Beneficios</h3>
                <ul className="space-y-1 text-blue-700">
                  <li>✓ Verificación de email automática</li>
                  <li>✓ Recuperación de contraseña</li>
                  <li>✓ Autenticación segura</li>
                  <li>✓ Gestión de sesiones</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-1">Configuración</h3>
                <p className="text-blue-700">
                  La configuración se realiza automáticamente. Solo necesitas hacer clic en el botón "Configurar
                  verificación automática" para habilitar todas las funcionalidades.
                </p>
              </div>
            </div>
          </div>

          <SupabaseSetup />
        </div>
      </div>
    </div>
  )
}

