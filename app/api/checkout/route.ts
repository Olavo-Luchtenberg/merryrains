import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Faça login para continuar" },
        { status: 401 },
      )
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe não configurado. Adicione STRIPE_SECRET_KEY no .env" },
        { status: 500 },
      )
    }

    const origin = process.env.NEXTAUTH_URL ?? "http://localhost:3000"

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "brl",
            product_data: {
              name: "MERRY RAINS - Acesso digital",
              description: "Acesso completo ao livro digital Merry Rains",
              images: [
                `${origin}/images/book-cover.jpg`,
              ].filter(Boolean),
            },
            unit_amount: 2990, // R$ 29,90 em centavos
          },
        },
      ],
      success_url: `${origin}/biblioteca?success=1`,
      cancel_url: `${origin}/checkout?canceled=1`,
      metadata: {
        userId: (session.user as { id?: string }).id ?? "",
        email: session.user.email,
      },
    })

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: "Erro ao gerar URL de checkout" },
        { status: 500 },
      )
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (err) {
    console.error("Checkout error:", err)
    return NextResponse.json(
      { error: "Erro ao processar checkout" },
      { status: 500 },
    )
  }
}
