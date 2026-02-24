"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useState, useEffect, useRef } from "react"

const chapters = [
  { number: "I", title: "A Primeira Gota", teaser: "A chuva comecou como qualquer outra. Mas Lira sabia que algo era diferente. O padrao das gotas... era matematicamente impossivel." },
  { number: "II", title: "O Codigo nas Nuvens", teaser: "Cada gota carregava uma sequencia. Juntas, formavam algo que nenhum computador poderia ter criado. Uma mensagem de alem do tempo." },
  { number: "III", title: "A Resposta", teaser: "Quando Lira decifrou a primeira frase, o ceu escureceu e a chuva parou pela primeira vez em seculos. Alguem sabia que ela estava ouvindo." },
  { number: "IV", title: "O Guardiao", teaser: "Kael apareceu na porta do laboratorio, encharcado e com olhos que pareciam conter galaxias inteiras. Ele disse apenas: 'Eles estao vindo.'" },
  { number: "V", title: "Entre Mundos", teaser: "A fronteira entre as dimensoes nao era feita de espaco ou tempo. Era feita de agua. E agora, ela estava se rompendo." },
]

export function ChapterPreview() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const startTimer = () => {
      setProgress(0)
      if (timerRef.current) clearInterval(timerRef.current)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveChapter((c) => (c + 1) % chapters.length)
            return 0
          }
          return prev + 1
        })
      }, 50)
      timerRef.current = interval
    }

    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeChapter])

  const handleChapterClick = (index: number) => {
    setActiveChapter(index)
    setProgress(0)
  }

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            Primeiros Capitulos
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-16 text-balance">
            Um vislumbre do que <span className="text-primary">te espera</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          {/* Chapter list */}
          <ScrollReveal direction="left" delay={200}>
            <div className="space-y-2">
              {chapters.map((chapter, i) => (
                <button
                  key={i}
                  onClick={() => handleChapterClick(i)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 font-sans ${
                    i === activeChapter
                      ? "border-primary/40 bg-primary/5"
                      : "border-transparent hover:border-border hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-2xl font-serif font-bold transition-colors ${
                        i === activeChapter ? "text-primary" : "text-muted-foreground/40"
                      }`}
                    >
                      {chapter.number}
                    </span>
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        i === activeChapter ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {chapter.title}
                    </span>
                  </div>
                  {/* Progress bar */}
                  {i === activeChapter && (
                    <div className="mt-3 h-[2px] bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active chapter content */}
          <ScrollReveal direction="right" delay={300}>
            <div className="relative p-8 md:p-12 rounded-xl border border-border bg-card min-h-[300px] flex flex-col justify-center overflow-hidden">
              {/* Decorative accent */}
              <div
                className="absolute top-0 right-0 w-1/3 h-full opacity-5"
                style={{
                  background: "linear-gradient(135deg, transparent, rgba(80, 180, 220, 0.5))",
                }}
                aria-hidden="true"
              />
              
              <div className="relative z-10">
                <span className="text-7xl md:text-8xl font-serif font-bold text-primary/10">
                  {chapters[activeChapter].number}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold font-serif text-foreground mt-2 mb-6">
                  {chapters[activeChapter].title}
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-lg font-sans">
                  {chapters[activeChapter].teaser}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
