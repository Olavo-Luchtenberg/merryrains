"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"

const BOOK_PAGE_IMAGES = [
  "/book-pages/Livro%201.png",
  "/book-pages/LIvro%202.png",
  "/book-pages/Livro%203.png",
  "/book-pages/Livro%204.png",
  "/book-pages/Livro%205.png",
  "/book-pages/Livro%206.png",
  "/book-pages/Livro%207.png",
  "/book-pages/Livro%208.png",
  ...Array.from({ length: 30 }, (_, i) => `/book-pages/${i + 9}.png`),
]

function emitBookRect(el: HTMLElement | null) {
  if (!el) return
  const rect = el.getBoundingClientRect()
  window.dispatchEvent(new CustomEvent("book-rect-update", {
    detail: {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
    }
  }))
}

export function BookPreview() {
  const bookRef = useRef<HTMLFlipBook>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(320)
  const [pageHeight, setPageHeight] = useState(448)
  const [coverWidth, setCoverWidth] = useState(320)
  const [coverHeight, setCoverHeight] = useState(448)
  const [currentPage, setCurrentPage] = useState(0)
  const [opened, setOpened] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Emite posição do livro para o RainEffect sempre que muda
  useEffect(() => {
    if (!mounted) return
    const el = containerRef.current
    const update = () => emitBookRect(el)
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      // Limpa a hitbox ao desmontar
      window.dispatchEvent(new CustomEvent("book-rect-update", {
        detail: { left: 0, top: -9999, right: 0, bottom: -9999, width: 0 }
      }))
    }
  }, [mounted, opened, coverWidth, coverHeight, pageWidth, pageHeight])

  useEffect(() => {
    if (!mounted) return
    const updateSize = () => {
      const availW = window.innerWidth - 64
      const availH = window.innerHeight - 160

      // Tamanho para livro ABERTO: 2 páginas lado a lado
      const maxPageW = Math.min(380, Math.floor(availW / 2))
      let w = maxPageW
      let h = Math.round(w * (560 / 400))
      if (h > availH) {
        h = availH
        w = Math.round(h * (400 / 560))
      }
      setPageWidth(w)
      setPageHeight(h)

      // Tamanho para CAPA fechada: ocupa toda a largura disponível (1 página)
      const maxCoverW = Math.min(400, availW)
      let cw = maxCoverW
      let ch = Math.round(cw * (560 / 400))
      if (ch > availH) {
        ch = availH
        cw = Math.round(ch * (400 / 560))
      }
      setCoverWidth(cw)
      setCoverHeight(ch)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [mounted])

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
  }, [])

  const handleOpenBook = () => {
    setOpened(true)
    // Pequeno delay para o flipbook montar antes de virar a página
    setTimeout(() => {
      bookRef.current?.pageFlip()?.flipNext()
    }, 100)
  }

  const goNext = () => bookRef.current?.pageFlip()?.flipNext()
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev()

  if (!mounted) {
    return (
      <div className="w-full max-w-[340px] aspect-[5/7] mx-auto bg-card border border-border rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando preview...</p>
      </div>
    )
  }

  // --- CAPA: livro fechado, centralizado como 1 página ---
  if (!opened) {
    return (
      <div className="w-full flex flex-col items-center gap-4 py-8">
        <div
          ref={containerRef}
          className="relative group cursor-pointer shadow-2xl rounded-sm overflow-hidden mx-auto"
          style={{ width: coverWidth, height: coverHeight, flexShrink: 0 }}
          onClick={handleOpenBook}
          role="button"
          aria-label="Abrir prévia do livro"
        >
          <img
            src={BOOK_PAGE_IMAGES[0]}
            alt="Capa do livro Merry Rains"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-sans tracking-widest uppercase border border-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
              Abrir livro
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-xs font-sans tracking-wider text-center">
          Clique na capa para abrir
        </p>
      </div>
    )
  }

  // --- LIVRO ABERTO: duas páginas lado a lado ---
  return (
    <div className="w-full flex flex-col items-center gap-6 py-8 px-4">
      <div
        ref={containerRef}
        className="shadow-2xl [&_.stf__wrapper]:!bg-transparent [&_.stf__block]:!bg-transparent"
        style={{ width: pageWidth * 2, height: pageHeight }}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={pageWidth}
          height={pageHeight}
          size="fixed"
          minWidth={0}
          maxWidth={0}
          minHeight={0}
          maxHeight={0}
          showCover
          mobileScrollSupport={false}
          flippingTime={700}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.5}
          drawShadow
          className="flipbook"
          onFlip={handleFlip}
        >
          {BOOK_PAGE_IMAGES.map((src, i) => (
            <div
              key={i}
              className="book-page-wrapper w-full h-full overflow-hidden bg-[#1a1a1a]"
            >
              <img
                src={src}
                alt={`Página ${i + 1}`}
                className="w-full h-full object-contain object-center"
                draggable={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-6">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="px-5 py-2 rounded-full border border-border text-sm font-sans text-foreground hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Anterior
        </button>
        <span className="text-muted-foreground text-xs font-sans tabular-nums">
          {currentPage === 0
            ? "Capa"
            : `${currentPage} / ${BOOK_PAGE_IMAGES.length - 1}`}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage >= BOOK_PAGE_IMAGES.length - 1}
          className="px-5 py-2 rounded-full border border-border text-sm font-sans text-foreground hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Próxima →
        </button>
      </div>

      <button
        onClick={() => { setOpened(false); setCurrentPage(0) }}
        className="text-muted-foreground text-xs hover:text-foreground transition-colors underline underline-offset-4"
      >
        Fechar livro
      </button>
    </div>
  )
}
