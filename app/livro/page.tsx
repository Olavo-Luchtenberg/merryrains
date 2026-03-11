"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookReader } from "@/components/book-reader"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { CHAPTERS } from "@/lib/chapters"
import { Suspense } from "react"

function LivroContent() {
  const searchParams = useSearchParams()
  const chapterParam = searchParams.get("chapter")
  const chapterId = chapterParam ? parseInt(chapterParam, 10) : null
  const chapter = chapterId
    ? CHAPTERS.find((ch) => ch.id === chapterId)
    : null

  // Se tem capítulo válido, mostra o leitor
  if (chapter) {
    return (
      <BookReader initialPage={chapter.startPage + 1} />
    )
  }

  // Senão, mostra seletor de capítulos
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <h1 className="font-serif text-2xl font-bold mb-2">Escolha o capítulo</h1>
      <p className="text-muted-foreground mb-6 text-center">
        Selecione o capítulo que deseja ler
      </p>
      <ul className="w-full max-w-md space-y-2">
        {CHAPTERS.map((ch) => (
          <li key={ch.id}>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link href={`/livro?chapter=${ch.id}`}>
                <span>{ch.title}</span>
                <BookOpen className="h-4 w-4" />
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
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
