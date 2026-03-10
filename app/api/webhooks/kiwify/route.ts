import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Extrai email do payload Kiwify (estrutura pode variar)
function extractEmail(data: unknown): string | null {
  if (!data || typeof data !== "object") return null
  const raw = data as Record<string, unknown>
  const obj = (raw.originalData ?? raw.data ?? raw) as Record<string, unknown>

  // Caminhos comuns em webhooks de pagamento
  const paths = [
    obj.customer && typeof obj.customer === "object" && "email" in obj.customer
      ? (obj.customer as Record<string, unknown>).email
      : null,
    obj.buyer && typeof obj.buyer === "object" && "email" in obj.buyer
      ? (obj.buyer as Record<string, unknown>).email
      : null,
    obj.email,
    obj.customer_email,
    obj.buyer_email,
    obj.data && typeof obj.data === "object"
      ? extractEmail(obj.data)
      : null,
    obj.order && typeof obj.order === "object" && "customer_email" in obj.order
      ? (obj.order as Record<string, unknown>).customer_email
      : null,
    obj.order && typeof obj.order === "object" && "customer" in obj.order
      ? extractEmail((obj.order as Record<string, unknown>).customer)
      : null,
  ]

  for (const val of paths) {
    if (typeof val === "string" && val.includes("@")) return val
  }
  return null
}

// Extrai ID do pagamento para referência
function extractPaymentId(data: unknown): string | null {
  if (!data || typeof data !== "object") return null
  const raw = data as Record<string, unknown>
  const obj = (raw.originalData ?? raw.data ?? raw) as Record<string, unknown>
  const candidates = [
    obj.id,
    obj.order_id,
    obj.transaction_id,
    obj.purchase_id,
    obj.data && typeof obj.data === "object"
      ? extractPaymentId(obj.data)
      : null,
  ]
  for (const val of candidates) {
    if (typeof val === "string") return val
  }
  return null
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validação opcional por token (configure no Kiwify ao criar o webhook)
    const token = process.env.KIWIFY_WEBHOOK_TOKEN
    if (token) {
      const reqToken =
        req.headers.get("x-kiwify-token") ??
        (body as Record<string, unknown>).token ??
        (body as Record<string, unknown>).webhook_token
      if (reqToken !== token) {
        console.error("[Kiwify] Token inválido")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const email = extractEmail(body)
    if (!email) {
      console.error("[Kiwify] Email não encontrado no payload:", JSON.stringify(body).slice(0, 500))
      return NextResponse.json(
        { error: "Email não encontrado no payload" },
        { status: 400 }
      )
    }

    const paymentId = extractPaymentId(body) ?? `kiwify-${Date.now()}`

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { purchase: true },
    })

    if (!user) {
      console.error("[Kiwify] Usuário não encontrado:", email)
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    if (user.purchase) {
      // Já comprou antes
      return NextResponse.json({ received: true, message: "Compra já registrada" })
    }

    await prisma.purchase.create({
      data: {
        userId: user.id,
        email: user.email,
        paymentId,
      },
    })

    console.log("[Kiwify] Compra liberada para:", email)
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("[Kiwify] Erro:", err)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
