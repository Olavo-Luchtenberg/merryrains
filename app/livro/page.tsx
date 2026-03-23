"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookReader } from "@/components/book-reader"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { CHAPTERS } from "@/lib/chapters"
import { Suspense } from "react"

function LivroContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const chapterParam = searchParams.get("chapter")
  const chapterId = chapterParam ? parseInt(chapterParam, 10) : null
  const chapter = chapterId
    ? CHAPTERS.find((ch) => ch.id === chapterId)
    : null

  // Se não tiver capítulo selecionado, manda direto para a nova página de capítulos
  if (!chapter) {
    router.replace("/biblioteca")
    return null
  }

  // Se tem capítulo válido, mostra o leitor (apenas páginas desse capítulo)
  return (
    <BookReader chapter={chapter} />
  )
}

export default function LivroPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        }
      >
        <LivroContent />
      </Suspense>
    </div>
  )
}
