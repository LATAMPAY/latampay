"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Wallet, PlusCircle } from "lucide-react"
import { accountService } from "@/lib/services/supabaseService"
import type { Account } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

export function AccountsSummary() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAccounts() {
      try {
        const data = await accountService.getUserAccounts()
        setAccounts(data)
      } catch (error) {
        console.error("Error loading accounts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAccounts()
  }, [])

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

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Mis Cuentas</CardTitle>
        <CardDescription>Gestiona tus cuentas bancarias</CardDescription>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <div className="text-center py-6">
            <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No tienes cuentas</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Balance Total</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
            </div>

            {accounts.slice(0, 3).map((account) => (
              <Link key={account.id} href={`/dashboard/accounts/${account.id}`} className="block">
                <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
                  <div className="p-2 rounded-md bg-green-100 text-green-700 mr-3">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{account.account_number}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(account.balance, account.currency)}</p>
                  </div>
                </div>
              </Link>
            ))}

            {accounts.length > 3 && (
              <p className="text-sm text-center text-muted-foreground pt-2">Y {accounts.length - 3} cuenta(s) más...</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/accounts">
          <Button variant="outline" size="sm">
            {accounts.length > 0 ? "Ver todas" : "Crear cuenta"}
            {accounts.length === 0 && <PlusCircle className="ml-2 h-4 w-4" />}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

