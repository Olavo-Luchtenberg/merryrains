import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateSchema = z.object({
  chapterId: z.number().int().positive(),
  lastPage: z.number().int().min(0),
})

/** GET: retorna progresso de todos os capítulos do usuário */
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const progress = await prisma.chapterProgress.findMany({
      where: { userId: user.id },
    })

    const byChapter: Record<number, number> = {}
    for (const p of progress) {
      byChapter[p.chapterId] = p.lastPage
    }

    return NextResponse.json({ progress: byChapter })
  } catch (error) {
    console.error("[READING_PROGRESS GET]", error)
    return NextResponse.json(
      { error: "Erro ao carregar progresso" },
      { status: 500 }
    )
  }
}

/** POST: salva progresso de um capítulo */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const body = await req.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    const { chapterId, lastPage } = parsed.data

    await prisma.chapterProgress.upsert({
      where: {
        userId_chapterId: { userId: user.id, chapterId },
      },
      create: { userId: user.id, chapterId, lastPage },
      update: { lastPage, updatedAt: new Date() },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[READING_PROGRESS POST]", error)
    return NextResponse.json(
      { error: "Erro ao salvar progresso" },
      { status: 500 }
    )
  }
}
