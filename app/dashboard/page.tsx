"use client"

import { CardsSummary } from "@/components/dashboard/cards-summary"
import { AccountsSummary } from "@/components/dashboard/accounts-summary"
import { TransactionsSummary } from "@/components/dashboard/transactions-summary"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { userService, accountService } from "@/lib/services/supabaseService"
import type { User, Account } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchUserData = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push("/login")
        return
      }

      const userData = await userService.getCurrentUser()
      if (userData) {
        setUser(userData)

        // Cargar cuentas
        const accountsData = await accountService.getUserAccounts(userData.id)
        setAccounts(accountsData)

        // Seleccionar la cuenta por defecto
        const defaultAccount = accountsData.find((acc) => acc.is_default)
        if (defaultAccount) {
          setSelectedAccount(defaultAccount.id)
        } else if (accountsData.length > 0) {
          setSelectedAccount(accountsData[0].id)
        }
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchUserData()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full max-w-md" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccountsSummary />
        <CardsSummary />
        <TransactionsSummary />
      </div>

      {/* Aquí puedes añadir más componentes como gráficos, actividad reciente, etc. */}
    </div>
  )
}

