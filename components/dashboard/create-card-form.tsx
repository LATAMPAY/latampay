"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { cardService, accountService } from "@/lib/services/supabaseService"
import type { Account } from "@/lib/types"
import { useRouter } from "next/navigation"

export function CreateCardForm() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingAccounts, setLoadingAccounts] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    accountId: "",
    cardType: "debit",
    cardholderName: "",
    creditLimit: 1000,
  })

  useEffect(() => {
    async function loadAccounts() {
      try {
        const data = await accountService.getUserAccounts()
        setAccounts(data)
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, accountId: data[0].id }))
        }
      } catch (err: any) {
        setError(err.message || "Error al cargar las cuentas")
      } finally {
        setLoadingAccounts(false)
      }
    }

    loadAccounts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await cardService.createCard(
        formData.accountId,
        formData.cardType as "debit" | "credit",
        formData.cardholderName,
        formData.cardType === "credit" ? formData.creditLimit : undefined,
      )

      setSuccess(true)

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/dashboard/cards")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Error al crear la tarjeta")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (loadingAccounts) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cargando cuentas...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (accounts.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No tienes cuentas disponibles</CardTitle>
          <CardDescription>Necesitas al menos una cuenta para crear una tarjeta</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4">Crea una cuenta primero para poder solicitar una tarjeta.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push("/dashboard")}>Volver al Dashboard</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Solicitar Nueva Tarjeta</CardTitle>
        <CardDescription>Completa el formulario para crear una nueva tarjeta</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Tarjeta creada exitosamente. Serás redirigido en unos segundos...
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="accountId">Cuenta asociada</Label>
              <Select
                value={formData.accountId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, accountId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.account_number} - {account.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de tarjeta</Label>
              <RadioGroup
                value={formData.cardType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, cardType: value }))}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit">Débito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit">Crédito</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Nombre del titular</Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleChange}
                placeholder="Como aparecerá en la tarjeta"
                required
              />
            </div>

            {formData.cardType === "credit" && (
              <div className="space-y-2">
                <Label htmlFor="creditLimit">Límite de crédito</Label>
                <Input
                  id="creditLimit"
                  name="creditLimit"
                  type="number"
                  min="500"
                  step="100"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, creditLimit: Number(e.target.value) }))}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando tarjeta...
                </>
              ) : (
                "Crear Tarjeta"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

