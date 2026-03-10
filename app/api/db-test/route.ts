import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ ok: true, message: "Conexão com o banco OK" })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error("[DB-TEST] Erro:", err.message)
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    )
  }
}
