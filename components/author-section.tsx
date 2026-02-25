"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Instagram } from "lucide-react"

const stats = [
  { target: 500, label: "Páginas profundas e sensíveis" },
  { target: 100, label: "Artes conceituais" },
  { target: 1000, label: "Dias investidos no projeto" },
]

const COUNT_UP_DURATION = 2000
const HOLD_DURATION = 3500

function useCountUp(target: number) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let rafId: number
    let holdTimeout: ReturnType<typeof setTimeout>

    const runCycle = () => {
      let startTime: number | null = null

      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / COUNT_UP_DURATION, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * target))

        if (progress < 1) {
          rafId = requestAnimationFrame(animate)
        } else {
          holdTimeout = setTimeout(() => {
            setCount(0)
            runCycle()
          }, HOLD_DURATION)
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    runCycle()
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(holdTimeout)
    }
  }, [target])

  return count
}

function StatItem({ target, label }: { target: number; label: string }) {
  const count = useCountUp(target)
  return (
    <div className="text-center">
      <p className="text-2xl font-bold font-serif text-primary">
        Mais De {count.toLocaleString("pt-BR")}
      </p>
      <p className="text-xs text-muted-foreground mt-1 font-sans">{label}</p>
    </div>
  )
}

export function AuthorSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const [lineIndex, setLineIndex] = useState(0)
  const quotes: { text: string; author?: string }[] = [
    { text: "Ou você trabalha pelos seus próprios sonhos, ou alguém vai te contratar para trabalhar pelos sonhos dele." },
    { text: "Insanidade é continuar fazendo sempre a mesma coisa e esperar resultados diferentes.", author: "Albert Einstein" },
    { text: "Se você quer ter o que os outros não têm, precisa fazer o que os outros não fazem.", author: "Zig Ziglar" },
    { text: "Fazendo ou não Fazendo, O Tempo Continua Passando." },
    { text: "Só aceite críticas de alguém com quem você trocaria de lugar.", author: "Brené Brown" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <section id="autor" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            O Criador
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-8 sm:mb-12 md:mb-16 text-balance">
            QUEM É <span className="text-primary">YHARUS</span>
          </h2>
        </ScrollReveal>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative rounded-2xl border border-border bg-card overflow-hidden"
        >
          {/* Interactive glow on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{
              opacity: isHovering ? 0.08 : 0,
              background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.06), transparent 60%)`,
            }}
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-0">
            {/* Author image side */}
            <ScrollReveal direction="left" delay={200}>
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden">
                <Image
                  src="/WhatsApp Image 2026-02-24 at 22.30.25.jpeg"
                  alt="Foto do autor de Merry Rains"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, transparent 50%, var(--card) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 md:hidden"
                  style={{
                    background: "linear-gradient(to bottom, transparent 50%, var(--card) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </ScrollReveal>

            {/* Author bio side */}
            <ScrollReveal direction="right" delay={300}>
              <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-foreground mb-2">
                  YHARUS
                </h3>
                <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-6 font-sans">
                  Escritor & Visionário
                </p>

                <div className="space-y-4 mb-8">
                  <p className="text-muted-foreground leading-relaxed font-sans">
                  Muitos esperavam o óbvio de mim.
Eu estudava em uma das melhores escolas do país. O caminho estava traçado: vestibular, faculdade, um diploma na parede e o resto da vida sendo "só mais um" com as asas cortadas pelo sistema. Minha família (cercada de médicos e advogados) via o futuro como algo garantido. Mas eu decidi que o meu futuro não seria um protocolo.

Aos 16 anos, abandonei a escola e as expectativas alheias. Troquei a redação nota 1000 do ENEM pela obsessão de criar algo revolucionário. Enquanto meus tios acumulavam mestrados e doutorados, eu acumulava noites em claro, trancado no quarto, sendo chamado de louco por quem não conseguia enxergar o que eu estava construindo.

Foram 1.000 dias sem ganhar um centavo. Três anos justificando para o mundo por que eu estava no computador enquanto os outros estavam na faculdade. Mas eu sabia: o que separa o louco do gênio é o resultado.

Este livro não é para todos.
Ele não oferece conforto; entrega o que restou da verdade de um jovem de 18 anos que peitou o sistema educacional, trabalhista e familiar para não deixar que seus sonhos fossem apenas sonhos.
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-sans">
                  Se você busca o tradicional, procure os doutores de 50 anos. Se você busca a verdade nua, crua e visceral de quem sacrificou tudo pela própria obra, você está no lugar certo.

Esse sou eu. O convite está feito. Aceite se tiver coragem.
                  </p>
                </div>

                {/* Rotating quote */}
                <div className="relative border-l-2 border-primary/30 pl-6 py-2 min-h-[80px]">
                  {quotes.map((q, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 pl-6 py-2 flex flex-col justify-center transition-all duration-700"
                      style={{
                        opacity: i === lineIndex ? 1 : 0,
                        transform: `translateY(${i === lineIndex ? 0 : 10}px)`,
                      }}
                    >
                      <p className="text-foreground/80 italic font-serif text-lg">
                        {`"${q.text}"`}
                      </p>
                      {q.author && (
                        <p className="text-sm text-muted-foreground mt-1 font-sans">
                          — {q.author}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border">
                  {stats.map((stat, i) => (
                    <StatItem key={i} target={stat.target} label={stat.label} />
                  ))}
                </div>

                {/* Instagram link */}
                <a
                  href="https://www.instagram.com/umbrellamerryrains/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 mt-8 p-3 rounded-full border border-border bg-card/50 hover:bg-card transition-colors group"
                  aria-label="Siga o Merry Rains no Instagram"
                >
                  <span
                    className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-border bg-gradient-to-br from-[#f09433] via-[#e1306c] to-[#405de6] p-2.5 text-white group-hover:scale-105 transition-transform duration-200"
                    aria-hidden
                  >
                    <Instagram className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-sans text-muted-foreground group-hover:text-foreground transition-colors">
                    Siga Merry Rains no Instagram
                  </span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
