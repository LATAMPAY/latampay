import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

export default function TransactionsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Transacciones</h1>
        <Link href="/dashboard/transactions/new">
          <Button>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Nueva Transacción
          </Button>
        </Link>
      </div>

      <p className="text-muted-foreground">Próximamente: Historial completo de transacciones y filtros avanzados.</p>
    </div>
  )
}

