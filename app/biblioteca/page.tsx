import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { BibliotecaContent } from "@/components/biblioteca-content"
import { BibliotecaNav } from "@/components/biblioteca-nav"
import { BibliotecaSuccessBanner } from "@/components/biblioteca-success-banner"

export default async function BibliotecaPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/biblioteca")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { purchase: true },
  })

  const hasPurchase = !!user?.purchase

  const params = await searchParams
  const showSuccess = params.success === "1"

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BibliotecaNav />
      <main className="flex-1 container py-8 px-4">
        {showSuccess && <BibliotecaSuccessBanner />}
        <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6">
          Minha biblioteca
        </h1>
        <BibliotecaContent hasPurchase={hasPurchase} />
      </main>
    </div>
  )
}
