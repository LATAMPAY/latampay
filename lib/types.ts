// Enumeraciones
export enum AccountType {
  PERSONAL = "personal",
  PYME = "pyme",
  EMPRESARIAL = "empresarial",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
}

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
  PAYMENT = "payment",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum CardType {
  DEBIT = "debit",
  CREDIT = "credit",
}

export enum CardStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  EXPIRED = "expired",
}

export enum RiskLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum RiskAlertStatus {
  OPEN = "open",
  IN_INVESTIGATION = "in_investigation",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

// Interfaces
export interface User {
  id: string
  email: string
  full_name: string
  account_type: AccountType | string
  status: UserStatus | string
  company_name?: string
  tax_id?: string
  phone?: string
  last_login_at?: string
  created_at: string
  updated_at: string
}

export interface Account {
  id: string
  user_id: string
  account_number: string
  balance: number
  currency: string
  is_default: boolean
  status: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  account_id: string
  user_id: string
  amount: number
  description?: string
  type: TransactionType | string
  status: TransactionStatus | string
  reference?: string
  sender_account_id?: string
  receiver_account_id?: string
  created_at: string
  updated_at: string
}

export interface Card {
  id: string
  account_id: string
  user_id: string
  card_number: string
  cardholder_name: string
  expiry_date: string
  cvv: string
  type: CardType | string
  status: CardStatus | string
  credit_limit?: number
  available_credit?: number
  created_at: string
  updated_at: string
}

export interface Investment {
  id: string
  user_id: string
  amount: number
  current_value: number
  start_date: string
  term?: number
  interest_rate: number
  description?: string
  created_at: string
  updated_at: string
}

export interface Loan {
  id: string
  user_id: string
  amount: number
  remaining_amount: number
  interest_rate: number
  term_months: number
  start_date: string
  status: string
  created_at: string
  updated_at: string
}

export interface RiskAlert {
  id: string
  user_id: string
  type: string
  description: string
  details?: string
  severity: RiskLevel | string
  status: RiskAlertStatus | string
  created_at: string
  updated_at: string
}

