"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CreditCard, Eye, EyeOff, CheckCircle, ShieldAlert } from "lucide-react"
import { cardService } from "@/lib/services/supabaseService"
import type { Card as CardType, CardStatus } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface CardDetailsProps {
  cardId: string
}

export function CardDetails({ cardId }: CardDetailsProps) {
  const [card, setCard] = useState<CardType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCVV, setShowCVV] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadCard() {
      try {
        const data = await cardService.getCardById(cardId)
        setCard(data)
      } catch (err: any) {
        setError(err.message || "Error al cargar la tarjeta")
      } finally {
        setLoading(false)
      }
    }

    loadCard()
  }, [cardId])

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

  const handleUpdateStatus = async (status: CardStatus) => {
    if (!card) return

    setUpdating(true)
    setUpdateSuccess(null)

    try {
      const updatedCard = await cardService.updateCardStatus(cardId, status)
      setCard(updatedCard)

      const statusMessages = {
        active: "Tarjeta activada exitosamente",
        inactive: "Tarjeta desactivada exitosamente",
        blocked: "Tarjeta bloqueada exitosamente",
      }

      setUpdateSuccess(statusMessages[status])

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setUpdateSuccess(null)
      }, 3000)
    } catch (err: any) {
      setError(
        err.message ||
          `Error al ${status === "active" ? "activar" : status === "inactive" ? "desactivar" : "bloquear"} la tarjeta`,
      )
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    )
  }

  if (error || !card) {
    return (
      <Card className="w-full border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">{error || "No se pudo cargar la información de la tarjeta"}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => router.push("/dashboard/cards")}>
            Volver a Tarjetas
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tarjeta de {card.type === "credit" ? "Crédito" : "Débito"}</CardTitle>
          {getStatusBadge(card.status)}
        </div>
        <CardDescription>Detalles de tu tarjeta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {updateSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{updateSuccess}</AlertDescription>
          </Alert>
        )}

        {/* Visualización de la tarjeta */}
        <div
          className={`p-6 rounded-xl shadow-md ${
            card.type === "credit"
              ? "bg-gradient-to-r from-blue-600 to-blue-800"
              : "bg-gradient-to-r from-green-600 to-green-800"
          } text-white`}
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs opacity-80">Tarjeta {card.type === "credit" ? "de Crédito" : "de Débito"}</p>
              <p className="text-lg font-bold">LatamPay</p>
            </div>
            <CreditCard className="h-8 w-8" />
          </div>

          <p className="text-xl font-mono tracking-wider mb-4">{formatCardNumber(card.card_number)}</p>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">Titular</p>
              <p className="font-medium uppercase">{card.cardholder_name}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Vence</p>
              <p className="font-medium">{formatExpiryDate(card.expiry_date)}</p>
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Información de la Tarjeta</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Número:</span>
                <span className="font-medium">{formatCardNumber(card.card_number)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Titular:</span>
                <span className="font-medium">{card.cardholder_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Vencimiento:</span>
                <span className="font-medium">{formatExpiryDate(card.expiry_date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">CVV:</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{showCVV ? card.cvv : "•••"}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowCVV(!showCVV)}>
                    {showCVV ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Estado:</span>
                <span className="font-medium">
                  {card.status === "active" ? "Activa" : card.status === "inactive" ? "Inactiva" : "Bloqueada"}
                </span>
              </div>
            </div>
          </div>

          {card.type === "credit" && (
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Información de Crédito</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Límite de crédito:</span>
                  <span className="font-medium">{formatCurrency(card.credit_limit || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Crédito disponible:</span>
                  <span className="font-medium">{formatCurrency(card.available_credit || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Crédito utilizado:</span>
                  <span className="font-medium">
                    {formatCurrency((card.credit_limit || 0) - (card.available_credit || 0))}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(100, (((card.credit_limit || 0) - (card.available_credit || 0)) / (card.credit_limit || 1)) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => router.push("/dashboard/cards")}>
          Volver a Tarjetas
        </Button>

        {card.status !== "active" && (
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleUpdateStatus("active")}
            disabled={updating}
          >
            {updating ? "Activando..." : "Activar Tarjeta"}
          </Button>
        )}

        {card.status !== "inactive" && card.status !== "blocked" && (
          <Button variant="outline" onClick={() => handleUpdateStatus("inactive")} disabled={updating}>
            {updating ? "Desactivando..." : "Desactivar Tarjeta"}
          </Button>
        )}

        {card.status !== "blocked" && (
          <Button variant="destructive" onClick={() => handleUpdateStatus("blocked")} disabled={updating}>
            <ShieldAlert className="mr-2 h-4 w-4" />
            {updating ? "Bloqueando..." : "Bloquear Tarjeta"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

