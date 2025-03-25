import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function formatCardNumber(cardNumber: string): string {
  // Mostrar solo los últimos 4 dígitos
  return `**** **** **** ${cardNumber.slice(-4)}`
}

export function formatExpiryDate(dateString: string): string {
  const date = new Date(dateString)
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`
}

export function getCardTypeIcon(type: string) {
  return type === "credit" ? "credit-card" : "credit-card"
}

export function getCardStatusColor(status: string) {
  switch (status) {
    case "active":
      return "text-green-500"
    case "inactive":
      return "text-yellow-500"
    case "blocked":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

