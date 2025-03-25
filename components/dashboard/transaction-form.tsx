"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { transactionService, accountService } from "@/lib/services/supabaseService"
import type { Account } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatCurrency } from "@/lib/utils"

export function TransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [activeTab, setActiveTab] = useState("deposit")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [accountId, setAccountId] = useState("")
  const [toAccountId, setToAccountId] = useState("")
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await accountService.getUserAccounts()
        setAccounts(accounts)
        if (accounts.length > 0) {
          setAccountId(accounts[0].id)
        }
      } catch (err: any) {
        setError(err.message || "Error al cargar las cuentas")
      }
    }

    fetchAccounts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const amountValue = Number.parseFloat(amount)

      if (isNaN(amountValue) || amountValue <= 0) {
        throw new Error("El monto debe ser un número positivo")
      }

      switch (activeTab) {
        case "deposit":
          await transactionService.deposit(accountId, amountValue, description)
          setSuccess("Depósito realizado con éxito")
          break
        case "withdraw":
          await transactionService.withdraw(accountId, amountValue, description)
          setSuccess("Retiro realizado con éxito")
          break
        case "transfer":
          if (!toAccountId) {
            throw new Error("Selecciona una cuenta de destino")
          }
          if (accountId === toAccountId) {
            throw new Error("Las cuentas de origen y destino no pueden ser iguales")
          }
          await transactionService.transfer(accountId, toAccountId, amountValue, description)
          setSuccess("Transferencia realizada con éxito")
          break
      }

      // Limpiar formulario
      setAmount("")
      setDescription("")

      // Notificar éxito
      if (onSuccess) onSuccess()

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Error al procesar la operación")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Realizar Operación</CardTitle>
        <CardDescription>Deposita, retira o transfiere dinero entre tus cuentas</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deposit">Depósito</TabsTrigger>
            <TabsTrigger value="withdraw">Retiro</TabsTrigger>
            <TabsTrigger value="transfer">Transferencia</TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="account">Cuenta</Label>
              <Select value={accountId} onValueChange={setAccountId} disabled={accounts.length === 0}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.account_number} - {formatCurrency(account.balance, account.currency)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeTab === "transfer" && (
              <div className="space-y-2">
                <Label htmlFor="toAccount">Cuenta de destino</Label>
                <Select value={toAccountId} onValueChange={setToAccountId} disabled={accounts.length <= 1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una cuenta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts
                      .filter((account) => account.id !== accountId)
                      .map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.account_number} - {formatCurrency(account.balance, account.currency)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción de la operación"
                rows={2}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading || accounts.length === 0}>
              {loading
                ? "Procesando..."
                : activeTab === "deposit"
                  ? "Depositar"
                  : activeTab === "withdraw"
                    ? "Retirar"
                    : "Transferir"}
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

