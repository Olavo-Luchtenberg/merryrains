import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const schema = z.object({
  currentPassword: z.string().min(1, "Senha atual obrigatória"),
  newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      )
    }

    const { currentPassword, newPassword } = parsed.data

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user?.password) {
      return NextResponse.json(
        { error: "Conta sem senha (login por rede social)" },
        { status: 400 },
      )
    }

    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) {
      return NextResponse.json(
        { error: "Senha atual incorreta" },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[CHANGE_PASSWORD]", error)
    return NextResponse.json(
      { error: "Erro ao alterar senha. Tente novamente." },
      { status: 500 },
    )
  }
}
