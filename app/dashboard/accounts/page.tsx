import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AccountsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Cuentas</h1>
        <Link href="/dashboard/accounts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Cuenta
          </Button>
        </Link>
      </div>

      <p className="text-muted-foreground">Próximamente: Listado completo de cuentas y funcionalidades avanzadas.</p>
    </div>
  )
}

