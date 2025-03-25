"use client"

import { useEffect, useState } from "react"
import { transactionService } from "@/lib/services/supabaseService"
import type { Transaction } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowDownCircle, ArrowUpCircle, RefreshCw } from "lucide-react"

interface TransactionsListProps {
  accountId: string
}

export function TransactionsList({ accountId }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchTransactions = async () => {
    try {
      const { transactions, total } = await transactionService.getAccountTransactions(accountId, page)
      setTransactions(transactions)
      setTotal(total)
    } catch (err: any) {
      setError(err.message || "Error al cargar las transacciones")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [accountId, page])

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  const getTransactionIcon = (type: string, amount: number) => {
    if (type === "deposit" || amount > 0) {
      return <ArrowDownCircle className="h-5 w-5 text-green-500" />
    } else if (type === "withdrawal" || amount < 0) {
      return <ArrowUpCircle className="h-5 w-5 text-red-500" />
    } else {
      return <RefreshCw className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Últimas Transacciones</h2>

      {error && <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">{error}</div>}

      {transactions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No hay transacciones para mostrar.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type, transaction.amount)}
                    <div>
                      <p className="font-medium">
                        {transaction.type === "deposit"
                          ? "Depósito"
                          : transaction.type === "withdrawal"
                            ? "Retiro"
                            : transaction.type === "transfer"
                              ? "Transferencia"
                              : transaction.type === "payment"
                                ? "Pago"
                                : transaction.type === "investment"
                                  ? "Inversión"
                                  : "Pago de préstamo"}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.description || "Sin descripción"}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(transaction.created_at)}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount, "USD")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

