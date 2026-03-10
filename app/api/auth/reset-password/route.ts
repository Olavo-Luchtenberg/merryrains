import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const schema = z.object({
  token: z.string().min(1, "Token inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      )
    }

    const { token, password } = parsed.data

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Link expirado ou inválido. Solicite um novo." },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[RESET_PASSWORD]", error)
    return NextResponse.json(
      { error: "Erro ao redefinir senha. Tente novamente." },
      { status: 500 },
    )
  }
}
