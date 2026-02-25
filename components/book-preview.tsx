"use client"

import { useRef, useEffect, useState } from "react"

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
  const flipbookRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === "undefined" || !flipbookRef.current) return

    const el = flipbookRef.current
    let cancelled = false
    let doCleanup: (() => void) | undefined

    void Promise.all([import("jquery"), import("turn.js")]).then(([jquery]) => {
      if (cancelled || !flipbookRef.current) return

      const $ = jquery.default
      ;($ as (el: HTMLElement) => { turn: (opts: object) => void })(el).turn({
        width: Math.min(400, window.innerWidth - 48),
        height: Math.min(560, window.innerHeight - 120),
        autoCenter: true,
        duration: 600,
        gradients: true,
        display: "single",
      })

      const handleResize = () => {
        try {
          ;($ as (el: HTMLElement) => { turn: (cmd: string) => void })(el).turn("resize")
        } catch {
          // ignore
        }
      }

      window.addEventListener("resize", handleResize)

      doCleanup = () => {
        window.removeEventListener("resize", handleResize)
        try {
          ;($ as (el: HTMLElement) => { turn: (cmd: string) => void })(el).turn("destroy")
        } catch {
          // ignore
        }
      }
    })

    return () => {
      cancelled = true
      doCleanup?.()
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div className="w-full max-w-[400px] aspect-[400/560] mx-auto bg-card border border-border rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando preview...</p>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center overflow-x-auto py-8">
      <div
        ref={flipbookRef}
        id="merry-rains-flipbook"
        className="flipbook turnjs-container shadow-2xl"
      >
        {PREVIEW_PAGES.map((page, i) => (
          <div
            key={i}
            className={`turn-page ${page.isCover ? "hard" : ""} bg-card`}
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
                <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed text-left">
                  {page.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
