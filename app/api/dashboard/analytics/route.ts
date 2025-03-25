import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { AccountType } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    // Obtener el ID del usuario del header (establecido por el middleware)
    const userId = req.headers.get("x-user-id")
    const userRole = req.headers.get("x-user-role") as AccountType | null

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener parámetros
    const url = new URL(req.url)
    const period = url.searchParams.get("period") || "30d" // 7d, 30d, 90d, 1y

    // Calcular fecha de inicio según el período
    const startDate = new Date()
    switch (period) {
      case "7d":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "30d":
        startDate.setDate(startDate.getDate() - 30)
        break
      case "90d":
        startDate.setDate(startDate.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        startDate.setDate(startDate.getDate() - 30)
    }

    // Obtener las cuentas del usuario
    const accounts = await prisma.account.findMany({
      where: { userId },
    })

    const accountIds = accounts.map((account) => account.id)

    // Obtener estadísticas básicas
    const [totalIncome, totalExpenses, totalTransactions] = await Promise.all([
      // Ingresos
      prisma.transaction.aggregate({
        where: {
          accountId: { in: accountIds },
          amount: { gt: 0 },
          createdAt: { gte: startDate },
        },
        _sum: { amount: true },
        _count: true,
      }),
      // Gastos
      prisma.transaction.aggregate({
        where: {
          accountId: { in: accountIds },
          amount: { lt: 0 },
          createdAt: { gte: startDate },
        },
        _sum: { amount: true },
        _count: true,
      }),
      // Total de transacciones
      prisma.transaction.count({
        where: {
          accountId: { in: accountIds },
          createdAt: { gte: startDate },
        },
      }),
    ])

    // Datos para la gráfica de transacciones por mes
    const transactionsByMonth = await getTransactionsByMonth(userId, accountIds, startDate)

    // Datos para la gráfica de distribución de gastos por tipo
    const expensesByType = await getExpensesByType(userId, accountIds, startDate)

    // Datos para la gráfica de balance
    const balanceData = await getBalanceData(userId, accountIds, startDate, period)

    // Datos adicionales según el tipo de cuenta
    let additionalData = {}

    if (userRole === AccountType.PYME || userRole === AccountType.EMPRESARIAL) {
      // Datos específicos para empresas
      const cashFlow = await getCashFlowData(userId, accountIds, startDate, period)

      additionalData = {
        cashFlow,
      }
    }

    return NextResponse.json({
      summary: {
        totalIncome: totalIncome._sum.amount || 0,
        totalExpenses: Math.abs(totalExpenses._sum.amount || 0),
        totalTransactions,
        incomeTransactions: totalIncome._count,
        expenseTransactions: totalExpenses._count,
      },
      transactionsByMonth,
      expensesByType,
      balanceData,
      ...additionalData,
    })
  } catch (error) {
    console.error("Error al obtener analytics:", error)
    return NextResponse.json({ error: "Error al obtener análisis del dashboard" }, { status: 500 })
  }
}

// Función para obtener transacciones agrupadas por mes
async function getTransactionsByMonth(userId: string, accountIds: string[], startDate: Date) {
  // Esto es un ejemplo simplificado - en producción se debería hacer directamente con SQL crudo
  // para mejor rendimiento y precisión

  // Obtener todas las transacciones del período
  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: { in: accountIds },
      createdAt: { gte: startDate },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  // Agrupar por mes
  const groupedByMonth: Record<string, { income: number; expenses: number }> = {}

  transactions.forEach((transaction) => {
    const date = transaction.createdAt
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = { income: 0, expenses: 0 }
    }

    if (transaction.amount > 0) {
      groupedByMonth[monthYear].income += transaction.amount
    } else {
      groupedByMonth[monthYear].expenses += Math.abs(transaction.amount)
    }
  })

  // Convertir a array para la respuesta
  return Object.entries(groupedByMonth).map(([month, data]) => ({
    month,
    income: data.income,
    expenses: data.expenses,
  }))
}

// Función para obtener gastos por tipo
async function getExpensesByType(userId: string, accountIds: string[], startDate: Date) {
  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: { in: accountIds },
      amount: { lt: 0 },
      createdAt: { gte: startDate },
    },
    select: {
      amount: true,
      type: true,
    },
  })

  // Agrupar por tipo
  const groupedByType: Record<string, number> = {}

  transactions.forEach((transaction) => {
    const type = transaction.type.toString()
    groupedByType[type] = (groupedByType[type] || 0) + Math.abs(transaction.amount)
  })

  // Convertir a array para la respuesta
  return Object.entries(groupedByType).map(([type, amount]) => ({
    type,
    amount,
  }))
}

// Función para obtener datos de balance
async function getBalanceData(userId: string, accountIds: string[], startDate: Date, period: string) {
  // Este es un ejemplo simplificado - en producción se debería hacer directamente con SQL
  // para calcular el balance diario/semanal acumulativo

  // Obtener todas las transacciones del período
  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: { in: accountIds },
      createdAt: { gte: startDate },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  // Determinar la granularidad según el período
  let granularity: "day" | "week" | "month" = "day"
  if (period === "90d" || period === "1y") {
    granularity = "week"
  }

  // Agrupar por la granularidad correspondiente
  const groupedData: Record<string, number> = {}
  let balance = 0

  transactions.forEach((transaction) => {
    const date = transaction.createdAt
    let key: string

    if (granularity === "day") {
      key = date.toISOString().split("T")[0] // YYYY-MM-DD
    } else if (granularity === "week") {
      // Obtener el lunes de la semana
      const day = date.getDay()
      const diff = date.getDate() - day + (day === 0 ? -6 : 1)
      const monday = new Date(date)
      monday.setDate(diff)
      key = monday.toISOString().split("T")[0]
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    }

    balance += transaction.amount
    groupedData[key] = balance
  })

  // Convertir a array para la respuesta
  return Object.entries(groupedData).map(([date, balance]) => ({
    date,
    balance,
  }))
}

// Función para obtener datos de flujo de caja (para cuentas empresariales)
async function getCashFlowData(userId: string, accountIds: string[], startDate: Date, period: string) {
  // Obtener todas las transacciones del período
  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: { in: accountIds },
      createdAt: { gte: startDate },
    },
    select: {
      amount: true,
      createdAt: true,
      type: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  // Determinar la granularidad según el período
  let granularity: "day" | "week" | "month" = "day"
  if (period === "90d" || period === "1y") {
    granularity = "week"
  }

  // Agrupar por la granularidad correspondiente
  const inflows: Record<string, number> = {}
  const outflows: Record<string, number> = {}

  transactions.forEach((transaction) => {
    const date = transaction.createdAt
    let key: string

    if (granularity === "day") {
      key = date.toISOString().split("T")[0] // YYYY-MM-DD
    } else if (granularity === "week") {
      // Obtener el lunes de la semana
      const day = date.getDay()
      const diff = date.getDate() - day + (day === 0 ? -6 : 1)
      const monday = new Date(date)
      monday.setDate(diff)
      key = monday.toISOString().split("T")[0]
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    }

    if (transaction.amount > 0) {
      inflows[key] = (inflows[key] || 0) + transaction.amount
    } else {
      outflows[key] = (outflows[key] || 0) + Math.abs(transaction.amount)
    }
  })

  // Combinar los datos
  const allDates = new Set([...Object.keys(inflows), ...Object.keys(outflows)])

  return Array.from(allDates)
    .map((date) => ({
      date,
      inflow: inflows[date] || 0,
      outflow: outflows[date] || 0,
      netFlow: (inflows[date] || 0) - (outflows[date] || 0),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

