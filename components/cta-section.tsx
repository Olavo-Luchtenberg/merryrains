"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  return (
    <section
      id="comprar"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Pulsing background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.04), transparent 60%)",
          animation: isVisible ? "pulse 4s ease-in-out infinite" : "none",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative text-center">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            Nao Espere Mais
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold font-serif text-foreground mb-4 sm:mb-6 text-balance">
          Algumas pessoas sentem a chuva, <span className="text-primary">outras apenas se molham</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-sans">
          MERRY RAINS não é para quem quer se molhar. É para quem aguenta o impacto de sentir a tempestade inteira. O seu lugar está garantido, ou você vai continuar no raso?.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300} direction="scale">
          <div className="relative inline-block mb-12">
            <div className="relative w-[160px] h-[240px] sm:w-[200px] sm:h-[300px] md:w-[240px] md:h-[360px] mx-auto rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/book-cover.jpg"
                alt="MERRY RAINS"
                fill
                className="object-cover"
              />
            </div>
            <div
              className="absolute -inset-6 rounded-2xl blur-3xl opacity-20 -z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(166, 166, 166, 0.08))",
                animation: isVisible ? "pulse 3s ease-in-out infinite" : "none",
              }}
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold tracking-wider uppercase bg-primary text-primary-foreground rounded-lg overflow-hidden font-sans whitespace-nowrap"
            >
              <span className="relative z-10">QUERO SENTIR A EXPERIENCIA</span>
              <div className="absolute inset-0 bg-accent/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <p className="text-sm text-muted-foreground font-sans">
              Disponivel em breve
            </p>
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.06;
          }
          50% {
            opacity: 0.12;
          }
        }
      `}</style>
    </section>
  )
}
