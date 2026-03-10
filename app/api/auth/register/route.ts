import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

import { isValidCPF, unformatCPF } from "@/lib/cpf"

function is18Plus(birthDate: Date): boolean {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
  return age >= 18
}

const registerSchema = z.object({
  name: z.string().min(4, "Nome completo deve ter pelo menos 4 caracteres"),
  cpf: z.string().refine((v) => isValidCPF(v), "CPF inválido"),
  birthDate: z.string().refine((v) => {
    const d = new Date(v)
    if (isNaN(d.getTime())) return false
    return is18Plus(d)
  }, "Você precisa ter 18 anos ou mais para comprar"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      )
    }

    const { name, cpf, birthDate, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        name,
        cpf: unformatCPF(cpf),
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error("[REGISTER] Error:", err.message)
    console.error("[REGISTER] Stack:", err.stack)
    return NextResponse.json(
      { error: "Erro ao criar conta. Tente novamente." },
      { status: 500 },
    )
  }
}
