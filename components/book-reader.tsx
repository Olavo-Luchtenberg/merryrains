"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BOOK_PAGE_IMAGES, TOTAL_BOOK_PAGES } from "@/lib/book-pages"

export function BookReader() {
  const [currentPage, setCurrentPage] = useState(1)

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const goNext = () => setCurrentPage((p) => Math.min(TOTAL_BOOK_PAGES, p + 1))

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentPage((p) => Math.max(1, p - 1))
      if (e.key === "ArrowRight") setCurrentPage((p) => Math.min(TOTAL_BOOK_PAGES, p + 1))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const pageSrc = BOOK_PAGE_IMAGES[currentPage - 1]

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>
            Página {currentPage} de {TOTAL_BOOK_PAGES}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={currentPage >= TOTAL_BOOK_PAGES}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Área da página do livro - mesmas páginas da prévia */}
      <div className="border border-border rounded-lg bg-[#1a1a1a] aspect-[3/4] flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pageSrc}
          alt={`Página ${currentPage}`}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Navegação por teclado (opcional) */}
      <p className="text-center text-xs text-muted-foreground">
        Use as setas do teclado ou os botões para navegar
      </p>
    </div>
  )
}
