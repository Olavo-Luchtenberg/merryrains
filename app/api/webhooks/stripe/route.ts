import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Webhook não configurado" }, { status: 400 })
    }

    if (!stripe) {
      return NextResponse.json({ error: "Stripe não configurado" }, { status: 500 })
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      console.error("Webhook signature verification failed:", message)
      return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const email = session.customer_email ?? session.customer_details?.email
      const paymentId = session.payment_intent ?? session.id

      if (!email) {
        console.error("No email in checkout session")
        return NextResponse.json({ error: "Missing email" }, { status: 400 })
      }

      const user = await prisma.user.findUnique({
        where: { email },
        include: { purchase: true },
      })

      if (!user) {
        console.error("User not found for email:", email)
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      if (user.purchase) {
        // Já comprou antes - não duplicar
        return NextResponse.json({ received: true })
      }

      await prisma.purchase.create({
        data: {
          userId: user.id,
          email: user.email,
          paymentId: typeof paymentId === "string" ? paymentId : undefined,
        },
      })

      console.log("Purchase created for:", email)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
