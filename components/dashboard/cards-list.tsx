"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CreditCard } from "lucide-react"
import { cardService } from "@/lib/services/supabaseService"
import type { Card as CardType } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CardsList() {
  const [cards, setCards] = useState<CardType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await cardService.getUserCards()
        setCards(data)
      } catch (err: any) {
        setError(err.message || "Error al cargar las tarjetas")
      } finally {
        setLoading(false)
      }
    }

    loadCards()
  }, [])

  const handleCardClick = (cardId: string) => {
    router.push(`/dashboard/cards/${cardId}`)
  }

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})/g, "$1 ").trim()
  }

  const formatExpiryDate = (date: string) => {
    const expiryDate = new Date(date)
    return `${(expiryDate.getMonth() + 1).toString().padStart(2, "0")}/${expiryDate.getFullYear().toString().slice(2)}`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Activa</Badge>
      case "inactive":
        return <Badge variant="outline">Inactiva</Badge>
      case "blocked":
        return <Badge variant="destructive">Bloqueada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">{error}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (cards.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No tienes tarjetas</CardTitle>
          <CardDescription>Crea una tarjeta para comenzar</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <CreditCard className="h-16 w-16 text-muted-foreground" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/dashboard/cards/new">
            <Button>Crear Tarjeta</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={`w-full cursor-pointer transition-all hover:shadow-md ${
            card.type === "credit" ? "border-blue-200" : "border-green-200"
          }`}
          onClick={() => handleCardClick(card.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className={card.type === "credit" ? "text-blue-700" : "text-green-700"}>
                Tarjeta de {card.type === "credit" ? "Crédito" : "Débito"}
              </CardTitle>
              {getStatusBadge(card.status)}
            </div>
            <CardDescription>{formatCardNumber(card.card_number)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Titular</p>
                <p>{card.cardholder_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vencimiento</p>
                <p>{formatExpiryDate(card.expiry_date)}</p>
              </div>
              {card.type === "credit" && (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Límite</p>
                    <p>{formatCurrency(card.credit_limit || 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Disponible</p>
                    <p>{formatCurrency(card.available_credit || 0)}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {card.accounts ? `Cuenta: ${card.accounts.account_number}` : ""}
            </div>
            <Button variant="ghost" size="sm">
              Ver detalles
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

