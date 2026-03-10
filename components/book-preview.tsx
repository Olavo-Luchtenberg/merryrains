"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"
import { BOOK_PAGE_IMAGES } from "@/lib/book-pages"

// Ícones inline para fullscreen
function IconExpand() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}
function IconShrink() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
      <line x1="10" y1="14" x2="3" y2="21" /><line x1="21" y1="3" x2="14" y2="10" />
    </svg>
  )
}

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
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(320)
  const [pageHeight, setPageHeight] = useState(448)
  const [fsPageWidth, setFsPageWidth] = useState(400)
  const [fsPageHeight, setFsPageHeight] = useState(560)
  const [coverWidth, setCoverWidth] = useState(320)
  const [coverHeight, setCoverHeight] = useState(448)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [opened, setOpened] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Calcula dimensões para tela cheia: maximiza o livro na tela
  const calcFsSize = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const controlsH = 72 // altura dos controles embaixo
    const availH = vh - controlsH
    const availW = vw - 16 // margem mínima

    // Tenta preencher pela altura primeiro
    let h = availH
    let w = Math.round(h * (400 / 560))
    // Se as duas páginas não cabem na largura, limita pela largura
    if (w * 2 > availW) {
      w = Math.floor(availW / 2)
      h = Math.round(w * (560 / 400))
    }
    setFsPageWidth(w)
    setFsPageHeight(h)
  }, [])

  // Escuta mudanças de fullscreen (ESC do browser)
  useEffect(() => {
    const onFsChange = () => {
      const isFull = !!document.fullscreenElement
      setIsFullscreen(isFull)
      if (isFull) calcFsSize()
    }
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [calcFsSize])

  // Recalcula ao redimensionar em fullscreen
  useEffect(() => {
    if (!isFullscreen) return
    const onResize = () => calcFsSize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [isFullscreen, calcFsSize])

  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen) {
      try {
        await fullscreenRef.current?.requestFullscreen()
        calcFsSize()
      } catch { /* ignore */ }
    } else {
      try {
        await document.exitFullscreen()
      } catch { /* ignore */ }
    }
  }, [isFullscreen, calcFsSize])

  // Emite posição do livro para o RainEffect sempre que muda
  useEffect(() => {
    if (!mounted) return
    const update = () => emitBookRect(containerRef.current)
    const rafUpdate = () => requestAnimationFrame(update)
    rafUpdate()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", rafUpdate)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", rafUpdate)
    }
  }, [mounted, opened, coverWidth, coverHeight, pageWidth, pageHeight])

  // Limpa a hitbox ao desmontar o componente
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent("book-rect-update", {
        detail: { left: 0, top: -9999, right: 0, bottom: -9999, width: 0 }
      }))
    }
  }, [])

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
    setIsFlipping(false)
  }, [])

  const handleOpenBook = () => {
    setOpened(true)
    // Pequeno delay para o flipbook montar antes de virar a página
    setTimeout(() => {
      bookRef.current?.pageFlip()?.flipNext()
    }, 100)
  }

  const FLIP_DURATION_MS = 700

  const isFirstPage = currentPage === 0

  const goNext = useCallback(() => {
    if (isFlipping || isFirstPage) return
    setIsFlipping(true)
    bookRef.current?.pageFlip()?.flipNext()
    // Fallback: se onFlip não disparar (ex: fim do livro), libera após a animação
    setTimeout(() => setIsFlipping((v) => (v ? false : v)), FLIP_DURATION_MS + 50)
  }, [isFlipping, isFirstPage])

  const goPrev = useCallback(() => {
    if (isFlipping || isFirstPage) return
    setIsFlipping(true)
    bookRef.current?.pageFlip()?.flipPrev()
    setTimeout(() => setIsFlipping((v) => (v ? false : v)), FLIP_DURATION_MS + 50)
  }, [isFlipping, isFirstPage])

  // Navegação: setas, WASD (A/← anterior, D/→/W/espaço próxima), scroll do mouse
  useEffect(() => {
    if (!opened) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (isFirstPage) return
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return
      const prevKeys = ["ArrowLeft", "KeyA", "KeyS"]
      const nextKeys = ["ArrowRight", "KeyD", "KeyW", "Space"]
      if (prevKeys.includes(e.code)) {
        e.preventDefault()
        goPrev()
      } else if (nextKeys.includes(e.code)) {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [opened, goPrev, goNext, isFlipping, isFirstPage])

  // Scroll do mouse: precisa passive: false para preventDefault
  useEffect(() => {
    if (!opened) return
    const el = containerRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      if (isFirstPage) return
      e.preventDefault()
      if (e.deltaY > 0) goNext()
      else if (e.deltaY < 0) goPrev()
    }
    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [opened, goPrev, goNext, isFlipping, isFirstPage])

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

  const activeW = isFullscreen ? fsPageWidth : pageWidth
  const activeH = isFullscreen ? fsPageHeight : pageHeight

  // --- LIVRO ABERTO: duas páginas lado a lado ---
  return (
    <div
      ref={fullscreenRef}
      className={`relative flex flex-col items-center justify-center gap-4 ${
        isFullscreen
          ? "fixed inset-0 z-[9999] bg-black"
          : "w-full py-8 px-4"
      }`}
    >
      {/* Botão tela cheia — fixo no canto superior direito */}
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 text-xs font-sans text-muted-foreground hover:text-foreground transition-colors border border-border/50 rounded-full px-3 py-1.5 hover:bg-white/5 bg-black/60 backdrop-blur-sm"
        style={{ position: isFullscreen ? "fixed" : "absolute" }}
      >
        {isFullscreen ? <IconShrink /> : <IconExpand />}
        {isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
      </button>

      <div
        ref={containerRef}
        className={`shadow-2xl [&_.stf__wrapper]:!bg-transparent [&_.stf__block]:!bg-transparent ${isFirstPage ? "pointer-events-none" : ""}`}
        style={{ width: activeW * 2, height: activeH, flexShrink: 0 }}
      >
        <HTMLFlipBook
          key={`book-${isFullscreen ? "fs" : "normal"}-${activeW}-${activeH}`}
          ref={bookRef}
          width={activeW}
          height={activeH}
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
          startPage={currentPage}
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

      {/* Controles — na primeira página só Fechar livro funciona */}
      <div className={`flex items-center gap-6 ${isFirstPage ? "pointer-events-none opacity-50" : ""}`}>
        <button
          onClick={goPrev}
          disabled={currentPage <= 1 || isFlipping || isFirstPage}
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
          disabled={currentPage >= BOOK_PAGE_IMAGES.length - 1 || isFlipping || isFirstPage}
          className="px-5 py-2 rounded-full border border-border text-sm font-sans text-foreground hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Próxima →
        </button>
      </div>

      <p className="text-muted-foreground text-[10px] text-center">
        Scroll · Setas · WASD · Espaço
      </p>
      <button
        onClick={() => {
          if (isFullscreen) document.exitFullscreen().catch(() => {})
          setOpened(false)
          setCurrentPage(0)
        }}
        className="text-muted-foreground text-xs hover:text-foreground transition-colors underline underline-offset-4"
      >
        Fechar livro
      </button>
    </div>
  )
}
