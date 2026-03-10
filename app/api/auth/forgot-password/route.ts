import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import crypto from "crypto"

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://merryrains.com"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 },
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    })

    // Sempre retorna sucesso para não revelar se o email existe
    if (!user?.password) {
      return NextResponse.json({ success: true })
    }

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token,
        expires,
      },
    })

    if (!resend) {
      console.warn("[FORGOT_PASSWORD] RESEND_API_KEY não configurado. Link:", `${baseUrl}/redefinir-senha?token=${token}`)
      return NextResponse.json({ success: true })
    }

    const resetUrl = `${baseUrl}/redefinir-senha?token=${token}`
    const from = process.env.RESEND_FROM ?? "noreply@merryrains.com"

    await resend.emails.send({
      from: from.includes("@") ? from : `Merry Rains <${from}>`,
      to: user.email,
      subject: "Redefinir senha - Merry Rains",
      html: `
        <p>Olá,</p>
        <p>Você solicitou a redefinição de senha no Merry Rains.</p>
        <p>Clique no link abaixo para definir uma nova senha (válido por 1 hora):</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Se você não solicitou isso, ignore este email.</p>
        <p>— Merry Rains</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[FORGOT_PASSWORD]", error)
    return NextResponse.json(
      { error: "Erro ao enviar email. Tente novamente." },
      { status: 500 },
    )
  }
}
