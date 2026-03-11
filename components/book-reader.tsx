"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BOOK_PAGE_IMAGES, TOTAL_BOOK_PAGES } from "@/lib/book-pages"
import { getChapterForPage } from "@/lib/chapters"

interface BookReaderProps {
  initialPage?: number
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

export function BookReader({ initialPage = 1 }: BookReaderProps) {
  const bookRef = useRef<HTMLFlipBook>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(400)
  const [pageHeight, setPageHeight] = useState(560)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => setMounted(true), [])

  // Calcula dimensões para preencher o viewport (duas páginas lado a lado)
  const calcSize = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const navH = 56
    const controlsH = 64
    const availH = vh - navH - controlsH - 24
    const availW = vw - 32

    // Duas páginas lado a lado: largura total = 2 * pageWidth
    const ratio = 400 / 560
    let h = availH
    let w = Math.round(h * ratio)
    if (w * 2 > availW) {
      w = Math.floor(availW / 2)
      h = Math.round(w / ratio)
    }
    setPageWidth(w)
    setPageHeight(h)
  }, [])

  // Em fullscreen: ocupa toda a tela
  const calcFullscreenSize = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const controlsH = 72
    const availH = vh - controlsH
    const availW = vw - 24

    const ratio = 400 / 560
    let h = availH
    let w = Math.round(h * ratio)
    if (w * 2 > availW) {
      w = Math.floor(availW / 2)
      h = Math.round(w / ratio)
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
      if (isFull) calcFullscreenSize()
      else calcSize()
    }
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [calcSize, calcFullscreenSize])

  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen && fullscreenRef.current) {
      try {
        await fullscreenRef.current.requestFullscreen()
        calcFullscreenSize()
      } catch { /* ignore */ }
    } else {
      try {
        await document.exitFullscreen()
      } catch { /* ignore */ }
    }
  }, [isFullscreen, calcFullscreenSize])

  const handleFlip = useCallback((e: { data: number }) => {
    const page = e.data
    setCurrentPage(page)
    const pageIndex = page - 1
    const chapter = getChapterForPage(pageIndex)
    if (chapter) {
      saveProgress(chapter.id, pageIndex)
    }
  }, [])

  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev()
  const goNext = () => bookRef.current?.pageFlip()?.flipNext()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

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
      className={`relative flex flex-col items-center justify-center gap-4 ${
        isFullscreen ? "fixed inset-0 z-[9999] bg-black" : "flex-1 min-h-0 py-4"
      }`}
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
          key={`reader-${isFullscreen ? "fs" : "normal"}-${pageWidth}-${pageHeight}`}
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
          startPage={currentPage}
        >
          {BOOK_PAGE_IMAGES.map((src, i) => (
            <div
              key={i}
              className="book-page-wrapper w-full h-full overflow-hidden bg-[#1a1a1a]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Página ${i + 1}`}
                className="w-full h-full object-contain object-center"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controles */}
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
          Página {currentPage} de {TOTAL_BOOK_PAGES}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={currentPage >= TOTAL_BOOK_PAGES}
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">
          Use as setas do teclado para virar as páginas
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
