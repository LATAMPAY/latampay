"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpCircle, ArrowDownCircle, RefreshCw } from "lucide-react"
import { transactionService } from "@/lib/services/supabaseService"
import type { Transaction } from "@/lib/types"
import { formatCurrency, formatShortDate } from "@/lib/utils"
import Link from "next/link"

export function TransactionsSummary() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTransactions() {
      try {
        const { transactions } = await transactionService.getUserTransactions(1, 5)
        setTransactions(transactions)
      } catch (error) {
        console.error("Error loading transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  const getTransactionIcon = (type: string, amount: number) => {
    if (amount > 0 || type === "deposit") {
      return <ArrowUpCircle className="h-5 w-5 text-green-500" />
    }
    return <ArrowDownCircle className="h-5 w-5 text-red-500" />
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
        <CardTitle className="text-lg">Últimas Transacciones</CardTitle>
        <CardDescription>Movimientos recientes de tus cuentas</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-6">
            <RefreshCw className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No hay transacciones recientes</p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
                <div className="p-2 rounded-md bg-gray-100 mr-3">
                  {getTransactionIcon(transaction.type, transaction.amount)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{transaction.description || transaction.type}</p>
                  <p className="text-sm text-muted-foreground">{formatShortDate(transaction.created_at)}</p>
                </div>
                <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(Math.abs(transaction.amount))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/transactions">
          <Button variant="outline" size="sm">
            Ver todas
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

