"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

// Estrutura para as páginas do livro
// As imagens ficarão em: public/livro/pagina-001.jpg, pagina-002.jpg, etc.
// Você adiciona as +1000 páginas depois; por agora usamos placeholder

const TOTAL_PAGES = 3 // Placeholder - altere para o total real quando adicionar as páginas

export function BookReader() {
  const [currentPage, setCurrentPage] = useState(1)

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const goNext = () => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentPage((p) => Math.max(1, p - 1))
      if (e.key === "ArrowRight") setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Caminho da página (você vai usar: /livro/pagina-001.jpg, pagina-002.jpg, etc.)
  const pagePath = `/livro/pagina-${String(currentPage).padStart(3, "0")}.jpg`

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
            Página {currentPage} de {TOTAL_PAGES}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={currentPage >= TOTAL_PAGES}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Área da página do livro */}
      <div className="border border-border rounded-lg bg-muted/30 aspect-[3/4] flex items-center justify-center overflow-hidden">
        {/* Placeholder - substitua por <Image> quando tiver as páginas reais */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pagePath}
          alt={`Página ${currentPage}`}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            // Fallback quando a imagem não existe (placeholder)
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            target.nextElementSibling?.classList.remove("hidden")
          }}
        />
        <div className="hidden text-center text-muted-foreground p-8">
          <p className="text-lg font-medium">Página {currentPage}</p>
          <p className="text-sm mt-2">
            Adicione as imagens em{" "}
            <code className="bg-muted px-2 py-1 rounded">
              public/livro/pagina-XXX.jpg
            </code>
          </p>
          <p className="text-xs mt-4">
            Ex: pagina-001.jpg, pagina-002.jpg ... pagina-1000.jpg
          </p>
        </div>
      </div>

      {/* Navegação por teclado (opcional) */}
      <p className="text-center text-xs text-muted-foreground">
        Use as setas do teclado ou os botões para navegar
      </p>
    </div>
  )
}
