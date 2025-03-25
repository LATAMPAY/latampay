import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardNav />
      <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
    </div>
  )
}

