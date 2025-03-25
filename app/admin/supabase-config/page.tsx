import SupabaseAutoConfig from "@/components/supabase-auto-config"
import EnvDisplay from "@/components/env-display"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupabaseConfigPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Configuración de Supabase</h1>

      <div className="max-w-md mx-auto space-y-8">
        <EnvDisplay />
        <SupabaseAutoConfig />

        <Card>
          <CardHeader>
            <CardTitle>Configuración Manual</CardTitle>
            <CardDescription>
              Si la configuración automática no funciona, puedes configurar manualmente las variables de entorno
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">1. Abre la configuración de Vercel</h3>
                <p className="text-sm text-gray-600">
                  Ve a la configuración de tu proyecto en Vercel:
                  <a
                    href="https://vercel.com/rmintersolutions-gmailcoms-projects/v0-latampay-clone/stores/integration/store_kcHLq4lAaodOgOCX/settings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Configuración de Supabase
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">2. Copia las variables de entorno</h3>
                <p className="text-sm text-gray-600">
                  Copia los valores de <code className="bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
                  y <code className="bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">3. Configura las variables en tu proyecto</h3>
                <p className="text-sm text-gray-600">
                  Ve a la configuración de variables de entorno de tu proyecto y añade las variables copiadas
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">4. Redespliega tu aplicación</h3>
                <p className="text-sm text-gray-600">
                  Después de configurar las variables, redespliega tu aplicación para aplicar los cambios
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

