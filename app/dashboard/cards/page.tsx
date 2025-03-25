"use client"

import { CardsList } from "@/components/dashboard/cards-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function CardsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Tarjetas</h1>
        <Link href="/dashboard/cards/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Tarjeta
          </Button>
        </Link>
      </div>

      <CardsList />
    </div>
  )
}

