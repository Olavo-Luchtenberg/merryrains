"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useRef, useState, useEffect } from "react"

const features = [
  {
    number: "01",
    title: "Mundos Interligados",
    description:
      "Uma trama que conecta multiplas dimensoes, onde cada escolha ressoa em realidades paralelas. A chuva e o fio condutor entre todos os mundos.",
  },
  {
    number: "02",
    title: "Personagens Inesqueciveis",
    description:
      "Lira, a cientista rebelde. Kael, o guardiao da chuva. Nyx, a entidade que habita entre as gotas. Cada um com segredos que mudarao tudo.",
  },
  {
    number: "03",
    title: "Ciencia e Magia",
    description:
      "Uma fusao unica de ficcao cientifica hard com elementos de fantasia. A tecnologia encontra o sobrenatural em uma narrativa que desafia os limites da imaginacao.",
  },
  {
    number: "04",
    title: "Misterio Cosmico",
    description:
      "Quem enviou as mensagens na chuva? Por que agora? A resposta vai mudar tudo o que voce acredita sobre o universo e o nosso lugar nele.",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <ScrollReveal delay={index * 150} direction="scale">
      <div
        ref={cardRef}
        className="relative p-5 sm:p-6 md:p-8 rounded-xl border border-border bg-card overflow-hidden group cursor-default h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mouse follow glow */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full pointer-events-none transition-opacity duration-500"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            background:
              "radial-gradient(circle, rgba(80, 180, 220, 0.12) 0%, transparent 70%)",
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span className="text-5xl font-bold text-primary/20 font-serif">
            {feature.number}
          </span>
          <h3 className="mt-4 text-xl sm:text-2xl font-bold text-foreground font-serif group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground font-sans">
            {feature.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500"
          style={{ width: isHovered ? "100%" : "0%" }}
          aria-hidden="true"
        />
      </div>
    </ScrollReveal>
  )
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height * 0.3) / windowHeight))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      {/* Horizontal reveal line */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16">
        <div className="h-px bg-border relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${scrollProgress * 100}%`, transition: "width 0.15s linear" }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            Por que Ler
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-8 sm:mb-12 md:mb-16 text-balance">
            Uma experiencia que vai{" "}
            <span className="text-primary">alem das paginas</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.number} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
