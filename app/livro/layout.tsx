import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LivroNav } from "@/components/livro-nav"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function LivroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login?callbackUrl=/livro")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { purchase: true },
  })

  const hasPurchase = !!user?.purchase

  if (!hasPurchase) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <LivroNav />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-2xl font-bold mb-2">
              Acesso ao livro
            </h1>
            <p className="text-muted-foreground mb-6">
              Você precisa comprar o livro para acessá-lo. Após a compra, ele
              aparecerá na sua biblioteca.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/login?callbackUrl=/checkout">Comprar agora</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/biblioteca">Minha biblioteca</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LivroNav />
      <main className="flex-1 flex flex-col min-h-0">{children}</main>
    </div>
  )
}
