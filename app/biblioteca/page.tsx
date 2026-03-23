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
      <main className="flex-1 flex flex-col">
        {showSuccess && (
          <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
            <BibliotecaSuccessBanner />
          </div>
        )}
        <BibliotecaContent hasPurchase={hasPurchase} />
      </main>
    </div>
  )
}
