"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, CreditCard, Wallet, BarChart3, ArrowRightLeft, Settings, LogOut, Menu, X, User } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function DashboardNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function getUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from("users").select("full_name").eq("id", user.id).single()

        if (data) {
          setUserName(data.full_name)
        }
      }
    }

    getUserProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const navItems = [
    { href: "/dashboard", label: "Inicio", icon: Home },
    { href: "/dashboard/cards", label: "Tarjetas", icon: CreditCard },
    { href: "/dashboard/accounts", label: "Cuentas", icon: Wallet },
    { href: "/dashboard/transactions", label: "Transacciones", icon: ArrowRightLeft },
    { href: "/dashboard/analytics", label: "Análisis", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Configuración", icon: Settings },
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col h-screen bg-gray-50 border-r w-64 p-4">
        <div className="flex items-center mb-8 px-2">
          <div className="font-bold text-xl text-primary">LatamPay</div>
        </div>

        <div className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                className={`w-full justify-start ${isActive(item.href) ? "" : "text-muted-foreground"}`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t mt-4">
          <div className="flex items-center px-2 py-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">{userName || "Usuario"}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl text-primary">LatamPay</div>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="p-4 bg-background border-b">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`w-full justify-start ${isActive(item.href) ? "" : "text-muted-foreground"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground mt-4"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

