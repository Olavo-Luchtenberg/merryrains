"use client"

import React, { useRef, useState, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"

const PREVIEW_PAGES = [
  { content: "MERRY RAINS", isCover: true },
  { content: "", isCover: true },
  {
    content:
      "Em um futuro distante, a Terra é banhada por chuvas misteriosas que carregam memórias de civilizações extintas. Cada gota contém fragmentos de histórias, emoções e segredos de mundos que já não existem mais.",
    isCover: false,
  },
  {
    content:
      "Quando Lira, uma jovem cientista, descobre que pode decodificar essas mensagens, ela desencadeia uma série de eventos que colocam toda a humanidade em perigo.",
    isCover: false,
  },
  {
    content:
      '"As gotas batiam no vidro como dedos impacientes, cada uma carregando o último suspiro de uma estrela que morreu há bilhões de anos. Lira sabia que não era coincidência. A chuva estava esperando por ela."',
    isCover: false,
  },
  {
    content:
      "A chuva não é apenas água. É uma ponte entre dimensões, uma mensagem cósmica que levou milênios para chegar até nós. E agora, alguém está respondendo.",
    isCover: false,
  },
  { content: "", isCover: true },
  { content: "MERRY RAINS", isCover: true },
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
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.5}
          drawShadow
          className="flipbook"
        >
          {PREVIEW_PAGES.map((page, i) => (
            <div
              key={i}
              className="book-page-wrapper bg-card w-full h-full"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
              }}
            >
              <div className="flex flex-col justify-center items-center p-6 sm:p-8 h-full text-center">
                {page.isCover ? (
                  page.content ? (
                    <div>
                      <h2 className="text-2xl sm:text-4xl font-bold font-serif text-foreground tracking-tight">
                        MERRY
                      </h2>
                      <h2 className="text-2xl sm:text-4xl font-bold font-serif text-primary tracking-tight mt-1">
                        RAINS
                      </h2>
                      <p className="text-xs text-muted-foreground mt-4 font-sans">
                        Preview do Livro
                      </p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-card" />
                  )
                ) : (
                  <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed text-left w-full">
                    {page.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}
