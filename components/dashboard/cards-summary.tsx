"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard, PlusCircle } from "lucide-react"
import { cardService } from "@/lib/services/supabaseService"
import type { Card as CardType } from "@/lib/types"
import Link from "next/link"

export function CardsSummary() {
  const [cards, setCards] = useState<CardType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await cardService.getUserCards()
        setCards(data)
      } catch (error) {
        console.error("Error loading cards:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCards()
  }, [])

  const formatCardNumber = (cardNumber: string) => {
    return `•••• ${cardNumber.slice(-4)}`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-28" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Mis Tarjetas</CardTitle>
        <CardDescription>Gestiona tus tarjetas de crédito y débito</CardDescription>
      </CardHeader>
      <CardContent>
        {cards.length === 0 ? (
          <div className="text-center py-6">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No tienes tarjetas</p>
          </div>
        ) : (
          <div className="space-y-2">
            {cards.slice(0, 3).map((card) => (
              <Link key={card.id} href={`/dashboard/cards/${card.id}`} className="block">
                <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
                  <div
                    className={`p-2 rounded-md mr-3 ${
                      card.type === "credit" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {card.type === "credit" ? "Crédito" : "Débito"}: {formatCardNumber(card.card_number)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {card.status === "active" ? "Activa" : card.status === "inactive" ? "Inactiva" : "Bloqueada"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {cards.length > 3 && (
              <p className="text-sm text-center text-muted-foreground pt-2">Y {cards.length - 3} tarjeta(s) más...</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/cards">
          <Button variant="outline" size="sm">
            {cards.length > 0 ? "Ver todas" : "Crear tarjeta"}
            {cards.length === 0 && <PlusCircle className="ml-2 h-4 w-4" />}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

