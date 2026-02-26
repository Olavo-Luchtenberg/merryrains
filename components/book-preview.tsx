"use client"

import React, { useRef, useState, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"

// Páginas do livro: Livro 1–8, depois 9–38 (ordem de leitura)
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

export function BookPreview() {
  const bookRef = useRef<HTMLFlipBook>(null)
  const [dimensions, setDimensions] = useState({ width: 400, height: 560 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const updateSize = () => {
      setDimensions({
        width: Math.min(400, window.innerWidth - 48),
        height: Math.min(560, window.innerHeight - 120),
      })
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [mounted])

  if (!mounted) {
    return (
      <div className="w-full max-w-[400px] aspect-[400/560] mx-auto bg-card border border-border rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando preview...</p>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center overflow-x-auto py-8 px-4 scrollbar-hide">
      <div className="flipbook-container shadow-2xl [&_.stf__wrapper]:!bg-transparent [&_.stf__block]:!bg-transparent">
        <HTMLFlipBook
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={0}
          maxWidth={0}
          minHeight={0}
          maxHeight={0}
          showCover
          mobileScrollSupport={false}
          flippingTime={600}
          usePortrait={false}
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.5}
          drawShadow
          className="flipbook"
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
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}
