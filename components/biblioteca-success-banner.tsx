"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BibliotecaSuccessBanner() {
  return (
    <div className="mb-6 p-4 rounded-lg border border-green-500/50 bg-green-500/10 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
        <span className="text-sm font-medium">
          Compra confirmada! O livro está disponível abaixo.
        </span>
      </div>
      <Button asChild size="sm">
        <Link href="/livro">Ler agora</Link>
      </Button>
    </div>
  )
}
