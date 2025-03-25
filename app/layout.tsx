import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import SupabaseNav from "@/components/supabase-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LatamPay - Plataforma Fintech Integral",
  description: "Democratizando el acceso a servicios financieros en Latinoamérica",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SupabaseNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'