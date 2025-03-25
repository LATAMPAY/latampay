import prisma from "../db"
import { type Account, type Transaction, TransactionType, TransactionStatus } from "@prisma/client"

// Interfaces para las operaciones
interface TransferInput {
  amount: number
  fromAccountId: string
  toAccountId: string
  description?: string
  userId: string
}

interface TransactionInput {
  amount: number
  accountId: string
  userId: string
  type: TransactionType
  description?: string
  reference?: string
  fee?: number
}

// Servicios para cuentas y transacciones
export const accountService = {
  // Obtener cuenta por ID
  async getAccountById(id: string): Promise<Account | null> {
    return prisma.account.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })
  },

  // Obtener cuentas de un usuario
  async getUserAccounts(userId: string): Promise<Account[]> {
    return prisma.account.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    })
  },

  // Crear una nueva cuenta
  async createAccount(userId: string, currency = "USD"): Promise<Account> {
    return prisma.account.create({
      data: {
        userId,
        accountNumber: `AC${Date.now()}${Math.floor(Math.random() * 1000)}`,
        currency,
        balance: 0,
      },
    })
  },

  // Realizar un depósito
  async deposit(input: TransactionInput): Promise<Transaction> {
    const { amount, accountId, userId, type, description, reference, fee = 0 } = input

    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // Realizar la transacción en una operación atómica
    return prisma.$transaction(async (tx) => {
      // Actualizar el saldo de la cuenta
      const updatedAccount = await tx.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: amount - fee,
          },
        },
      })

      // Registrar la transacción
      const transaction = await tx.transaction.create({
        data: {
          amount,
          accountId,
          userId,
          type,
          status: TransactionStatus.COMPLETED,
          description,
          reference,
          fee,
        },
      })

      return transaction
    })
  },

  // Realizar un retiro
  async withdraw(input: TransactionInput): Promise<Transaction> {
    const { amount, accountId, userId, type, description, reference, fee = 0 } = input

    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // Realizar la transacción en una operación atómica
    return prisma.$transaction(async (tx) => {
      // Obtener la cuenta
      const account = await tx.account.findUnique({
        where: { id: accountId },
      })

      if (!account) {
        throw new Error("Cuenta no encontrada")
      }

      // Verificar que haya saldo suficiente
      const totalAmount = amount + fee
      if (account.balance < totalAmount) {
        throw new Error("Saldo insuficiente")
      }

      // Actualizar el saldo de la cuenta
      const updatedAccount = await tx.account.update({
        where: { id: accountId },
        data: {
          balance: {
            decrement: totalAmount,
          },
        },
      })

      // Registrar la transacción
      const transaction = await tx.transaction.create({
        data: {
          amount: -amount, // Monto negativo para retiros
          accountId,
          userId,
          type,
          status: TransactionStatus.COMPLETED,
          description,
          reference,
          fee,
        },
      })

      return transaction
    })
  },

  // Realizar una transferencia entre cuentas
  async transfer(input: TransferInput): Promise<Transaction> {
    const { amount, fromAccountId, toAccountId, description, userId } = input

    // Verificar que el monto sea positivo
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor que cero")
    }

    // Verificar que las cuentas sean diferentes
    if (fromAccountId === toAccountId) {
      throw new Error("No se puede transferir a la misma cuenta")
    }

    // Realizar la transacción en una operación atómica
    return prisma.$transaction(async (tx) => {
      // Obtener la cuenta origen
      const fromAccount = await tx.account.findUnique({
        where: { id: fromAccountId },
        include: { user: true },
      })

      if (!fromAccount) {
        throw new Error("Cuenta origen no encontrada")
      }

      // Verificar que el usuario sea el propietario de la cuenta origen
      if (fromAccount.userId !== userId) {
        throw new Error("No autorizado para transferir desde esta cuenta")
      }

      // Obtener la cuenta destino
      const toAccount = await tx.account.findUnique({
        where: { id: toAccountId },
        include: { user: true },
      })

      if (!toAccount) {
        throw new Error("Cuenta destino no encontrada")
      }

      // Verificar que haya saldo suficiente
      if (fromAccount.balance < amount) {
        throw new Error("Saldo insuficiente")
      }

      // Actualizar el saldo de la cuenta origen
      await tx.account.update({
        where: { id: fromAccountId },
        data: {
          balance: {
            decrement: amount,
          },
        },
      })

      // Actualizar el saldo de la cuenta destino
      await tx.account.update({
        where: { id: toAccountId },
        data: {
          balance: {
            increment: amount,
          },
        },
      })

      // Registrar la transacción como salida desde la cuenta origen
      const transaction = await tx.transaction.create({
        data: {
          amount: -amount, // Monto negativo para la cuenta origen
          accountId: fromAccountId,
          userId,
          senderUserId: userId,
          senderAccountId: fromAccountId,
          receiverAccountId: toAccountId,
          type: TransactionType.TRANSFER,
          status: TransactionStatus.COMPLETED,
          description: description || `Transferencia a ${toAccount.user.name}`,
        },
      })

      // Registrar la transacción como entrada en la cuenta destino
      await tx.transaction.create({
        data: {
          amount, // Monto positivo para la cuenta destino
          accountId: toAccountId,
          userId: toAccount.userId,
          senderUserId: userId,
          senderAccountId: fromAccountId,
          receiverAccountId: toAccountId,
          type: TransactionType.TRANSFER,
          status: TransactionStatus.COMPLETED,
          description: description || `Transferencia de ${fromAccount.user.name}`,
        },
      })

      return transaction
    })
  },

  // Obtener transacciones de una cuenta
  async getAccountTransactions(
    accountId: string,
    page = 1,
    limit = 10,
  ): Promise<{ transactions: Transaction[]; total: number }> {
    const skip = (page - 1) * limit

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: { accountId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.transaction.count({
        where: { accountId },
      }),
    ])

    return { transactions, total }
  },
}

