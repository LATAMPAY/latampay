"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function SupabaseNav() {
  const pathname = usePathname()

  return (
    <div className="fixed top-4 right-4 z-50">
      {pathname !== "/supabase-demo" ? (
        <Link href="/supabase-demo">
          <Button variant="outline" size="sm">
            Demo Supabase
          </Button>
        </Link>
      ) : (
        <Link href="/">
          <Button variant="outline" size="sm">
            Volver al Inicio
          </Button>
        </Link>
      )}
    </div>
  )
}

