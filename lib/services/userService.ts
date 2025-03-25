import prisma from "../db"
import type { Prisma, User, AccountType, UserStatus } from "@prisma/client"
import bcrypt from "bcryptjs"

// Interfaces para los datos que se reciben al crear o actualizar
interface CreateUserInput {
  email: string
  password: string
  name: string
  lastName?: string
  phone?: string
  accountType: AccountType
  companyName?: string
  taxId?: string
}

interface UpdateUserInput {
  name?: string
  lastName?: string
  phone?: string
  companyName?: string
  taxId?: string
  status?: UserStatus
}

// Servicios para usuarios
export const userService = {
  // Crear un nuevo usuario
  async createUser(input: CreateUserInput): Promise<User> {
    const { password, ...rest } = input

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10)

    return prisma.user.create({
      data: {
        ...rest,
        passwordHash,
        // Crear una cuenta por defecto para cada usuario nuevo
        accounts: {
          create: {
            accountNumber: `AC${Date.now()}${Math.floor(Math.random() * 1000)}`,
            balance: 0,
            isDefault: true,
          },
        },
      },
      include: {
        accounts: true,
      },
    })
  },

  // Obtener un usuario por email (para login)
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    })
  },

  // Obtener un usuario por ID
  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
        cards: true,
      },
    })
  },

  // Actualizar un usuario
  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: input,
    })
  },

  // Buscar usuarios con paginación
  async findUsers(
    search?: string,
    accountType?: AccountType,
    status?: UserStatus,
    page = 1,
    limit = 10,
  ): Promise<{ users: User[]; total: number }> {
    const skip = (page - 1) * limit

    // Configurar filtros
    const where: Prisma.UserWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
      ]
    }

    if (accountType) {
      where.accountType = accountType
    }

    if (status) {
      where.status = status
    }

    // Realizar consulta con conteo
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          accounts: {
            where: { isDefault: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ])

    return { users, total }
  },

  // Verificar contraseña
  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash)
  },
}

