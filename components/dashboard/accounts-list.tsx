"use client"

import { useEffect, useState } from "react"
import { accountService } from "@/lib/services/supabaseService"
import type { Account } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PlusCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function AccountsList() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creatingAccount, setCreatingAccount] = useState(false)

  const fetchAccounts = async () => {
    try {
      const data = await accountService.getUserAccounts()
      setAccounts(data)
    } catch (err: any) {
      setError(err.message || "Error al cargar las cuentas")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAccount = async () => {
    setCreatingAccount(true)
    try {
      await accountService.createAccount()
      fetchAccounts()
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta")
    } finally {
      setCreatingAccount(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mis Cuentas</h2>
        <Button onClick={handleCreateAccount} disabled={creatingAccount} size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Nueva Cuenta
        </Button>
      </div>

      {error && <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">{error}</div>}

      {accounts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No tienes cuentas. Crea una para comenzar.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {accounts.map((account) => (
            <Card key={account.id} className={account.is_default ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span>
                    {account.is_default && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full mr-2">
                        Principal
                      </span>
                    )}
                    Cuenta {account.account_number}
                  </span>
                  <span>{account.currency}</span>
                </CardTitle>
                <CardDescription>{account.status === "active" ? "Activa" : "Inactiva"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(account.balance, account.currency)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

