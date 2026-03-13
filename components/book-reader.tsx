"use client"

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BOOK_PAGE_IMAGES } from "@/lib/book-pages"
import type { Chapter } from "@/lib/chapters"

const PAGE_RATIO = 400 / 560

function isMobile(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function lockLandscape(): void {
  try {
    const o = (screen as { orientation?: { lock?: (mode: string) => Promise<void> } }).orientation
    if (o?.lock) o.lock("landscape").catch(() => {})
  } catch { /* ignore */ }
}

function unlockOrientation(): void {
  try {
    const o = (screen as { orientation?: { unlock?: () => void } }).orientation
    if (o?.unlock) o.unlock()
  } catch { /* ignore */ }
}

interface BookReaderProps {
  chapter: Chapter
}

const saveProgressDebounceMs = 800
let saveTimeout: ReturnType<typeof setTimeout> | null = null

function saveProgress(chapterId: number, lastPage: number) {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    fetch("/api/reading-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId, lastPage }),
    }).catch(() => {})
    saveTimeout = null
  }, saveProgressDebounceMs)
}

export function BookReader({ chapter }: BookReaderProps) {
  const bookRef = useRef<HTMLFlipBook>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(400)
  const [pageHeight, setPageHeight] = useState(560)
  const [currentPage, setCurrentPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Apenas as páginas deste capítulo
  const pageImages = useMemo(
    () => BOOK_PAGE_IMAGES.slice(chapter.startPage, chapter.endPage + 1),
    [chapter]
  )
  const totalPages = pageImages.length

  useEffect(() => setMounted(true), [])

  // Calcula dimensões para caber na tela sem scroll (85% do espaço disponível)
  const calcSize = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const navH = 56
    const extraH = 180 // título + controles + textos + gaps
    const availH = (vh - navH - extraH) * 0.85
    const availW = (vw - 48) * 0.9 // margens laterais

    const ratio = 400 / 560
    let w = Math.floor(availW / 2) // duas páginas lado a lado
    let h = Math.round(w / ratio)
    if (h > availH) {
      h = Math.floor(availH)
      w = Math.round(h * ratio)
    }
    setPageWidth(w)
    setPageHeight(h)
  }, [])

  // Em fullscreen: ocupa toda a tela
  // Mobile: otimizado para landscape, duas páginas lado a lado, sem cortes
  const calcFullscreenSize = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const mobile = isMobile()
    const extraH = mobile ? 120 : 80
    const availH = vh - extraH
    const availW = vw - (mobile ? 8 : 32)

    // Duas páginas lado a lado: escala para caber na tela
    let w = Math.floor(availW / 2)
    let h = Math.round(w / PAGE_RATIO)
    if (h > availH) {
      h = Math.floor(availH)
      w = Math.round(h * PAGE_RATIO)
    }
    setPageWidth(w)
    setPageHeight(h)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const onResize = () => (isFullscreen ? calcFullscreenSize() : calcSize())
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [mounted, isFullscreen, calcSize, calcFullscreenSize])

  useEffect(() => {
    const onFsChange = () => {
      const isFull = !!document.fullscreenElement
      setIsFullscreen(isFull)
      if (isFull) {
        if (isMobile()) lockLandscape()
        calcFullscreenSize()
      } else {
        if (isMobile()) unlockOrientation()
        calcSize()
      }
    }
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [calcSize, calcFullscreenSize])

  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen && fullscreenRef.current) {
      try {
        await fullscreenRef.current.requestFullscreen()
        if (isMobile()) lockLandscape()
        calcFullscreenSize()
      } catch { /* ignore */ }
    } else {
      try {
        if (isMobile()) unlockOrientation()
        await document.exitFullscreen()
      } catch { /* ignore */ }
    }
  }, [isFullscreen, calcFullscreenSize])

  const handleFlip = useCallback(
    (e: { data: number }) => {
      const localPage = e.data
      setCurrentPage(localPage)
      const globalPageIndex = chapter.startPage + (localPage - 1)
      saveProgress(chapter.id, globalPageIndex)
    },
    [chapter]
  )

  const goPrev = useCallback(() => {
    if (currentPage <= 1) return
    bookRef.current?.pageFlip()?.flipPrev()
  }, [currentPage])

  const goNext = useCallback(() => {
    if (currentPage >= totalPages) return
    bookRef.current?.pageFlip()?.flipNext()
  }, [currentPage, totalPages])

  // Teclado: setas e WASD (A/W = anterior, D/S = próxima)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isPrev = e.key === "ArrowLeft" || e.key === "a" || e.key === "A" || e.key === "w" || e.key === "W"
      const isNext = e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === "s" || e.key === "S"
      if (isPrev) {
        e.preventDefault()
        e.stopPropagation()
        goPrev()
      } else if (isNext) {
        e.preventDefault()
        e.stopPropagation()
        goNext()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goPrev, goNext])

  // Scroll do mouse para virar páginas (throttle para 1 página por gesto)
  const lastWheelRef = useRef(0)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastWheelRef.current < 600) return // espera animação da página
      if (e.deltaY > 20) {
        e.preventDefault()
        lastWheelRef.current = now
        goNext()
      } else if (e.deltaY < -20) {
        e.preventDefault()
        lastWheelRef.current = now
        goPrev()
      }
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [goPrev, goNext])

  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Carregando livro...</p>
      </div>
    )
  }

  return (
    <div
      ref={fullscreenRef}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden overflow-x-hidden ${
        isFullscreen ? "fixed inset-0 z-[9999] bg-black" : "flex-1 min-h-0 py-3 px-2"
      }`}
      style={
        isFullscreen && isMobile()
          ? { maxWidth: "100vw", maxHeight: "100dvh", touchAction: "none" as const }
          : undefined
      }
    >
      {/* Botão tela cheia */}
      <button
        type="button"
        onClick={toggleFullscreen}
        title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border/50 rounded-full px-3 py-1.5 hover:bg-white/5 bg-black/60 backdrop-blur-sm"
        style={isFullscreen ? { position: "fixed" as const, top: 16, right: 16 } : undefined}
      >
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        {isFullscreen ? "Sair" : "Tela cheia"}
      </button>

      {/* Livro: duas páginas lado a lado com efeito de virar */}
      <div
        ref={containerRef}
        className="shadow-2xl [&_.stf__wrapper]:!bg-transparent [&_.stf__block]:!bg-transparent"
        style={{ width: pageWidth * 2, height: pageHeight, flexShrink: 0 }}
      >
        <HTMLFlipBook
          key={`reader-${chapter.id}-${isFullscreen ? "fs" : "normal"}-${pageWidth}-${pageHeight}`}
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
          startPage={1}
        >
          {pageImages.map((src, i) => (
            <div
              key={i}
              className="book-page-wrapper w-full h-full overflow-hidden bg-[#1a1a1a]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Página ${i + 1} - ${chapter.title}`}
                className="w-full h-full object-contain object-center"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Título do capítulo e controles */}
      <p className="text-sm font-medium text-muted-foreground">{chapter.title}</p>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={currentPage <= 1}
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-muted-foreground text-sm tabular-nums min-w-[100px] text-center">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={currentPage >= totalPages}
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">
          Setas, WASD ou scroll do mouse para virar
        </p>
        <Link
          href="/livro"
          className="text-xs text-primary hover:underline"
        >
          Escolher outro capítulo
        </Link>
      </div>
    </div>
  )
}
