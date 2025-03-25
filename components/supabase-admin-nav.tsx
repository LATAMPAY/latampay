"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Database, Settings, Users, BarChart } from "lucide-react"

export function SupabaseAdminNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto py-3 gap-1">
          <Link
            href="/admin/supabase-config"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/admin/supabase-config")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </Link>

          <Link
            href="/admin/supabase-schema"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/admin/supabase-schema")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Database className="mr-2 h-4 w-4" />
            <span>Esquema</span>
          </Link>

          <Link
            href="/admin/supabase-seed"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/admin/supabase-seed")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Datos de Ejemplo</span>
          </Link>

          <Link
            href="/supabase-demo"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/supabase-demo")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <BarChart className="mr-2 h-4 w-4" />
            <span>Demo</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

