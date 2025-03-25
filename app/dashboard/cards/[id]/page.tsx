import { CardDetails } from "@/components/dashboard/card-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CardPageProps {
  params: {
    id: string
  }
}

export default function CardPage({ params }: CardPageProps) {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/dashboard/cards">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Tarjetas
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Detalles de la Tarjeta</h1>

      <div className="max-w-3xl mx-auto">
        <CardDetails cardId={params.id} />
      </div>
    </div>
  )
}

