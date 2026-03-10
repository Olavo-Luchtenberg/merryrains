"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/checkout")
    }
  }, [status, router])

  const handleCheckout = () => {
    window.location.href = "https://pay.kiwify.com.br/NFkbaJY"
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background py-12">
      <Card className="w-full max-w-lg border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">Finalizar compra</CardTitle>
          <CardDescription>
            Você será redirecionado para o pagamento seguro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {session?.user?.email && (
            <p className="text-sm text-muted-foreground">
              Email da conta:{" "}
              <span className="font-medium text-foreground">
                {session.user.email}
              </span>
              <br />
              <span className="text-xs">
                O livro será liberado nesta conta após a confirmação do pagamento.
              </span>
            </p>
          )}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30">
            <div className="relative w-16 h-24 rounded overflow-hidden shrink-0">
              <Image
                src="/images/book-cover.jpg"
                alt="MERRY RAINS"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-serif font-bold">MERRY RAINS</p>
              <p className="text-sm text-muted-foreground">
                Acesso digital completo
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleCheckout}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Ir para pagamento
          </Button>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Voltar ao início
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
