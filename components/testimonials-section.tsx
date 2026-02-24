"use client"

import { ScrollReveal } from "./scroll-reveal"
import { Star } from "lucide-react"

const testimonials = [
  {
    text: "MERRY RAINS e o tipo de livro que voce nao consegue largar. A forma como a chuva e usada como metafora e mecanismo narrativo e brilhante.",
    author: "Ana Beatriz",
    role: "Leitora Beta",
    stars: 5,
  },
  {
    text: "Uma fusao perfeita entre ficcao cientifica e fantasia. Me lembrou os melhores momentos de Asimov com a magia de Ursula K. Le Guin.",
    author: "Carlos Eduardo",
    role: "Leitor Beta",
    stars: 5,
  },
  {
    text: "Chorei, ri e fiquei sem dormir tentando descobrir o misterio. MERRY RAINS e uma obra-prima que merece ser lida e relida.",
    author: "Marina Costa",
    role: "Leitora Beta",
    stars: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.05), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <p className="text-center text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            O Que Dizem
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-8 sm:mb-12 md:mb-16 text-balance">
            Leitores que ja viveram essa jornada
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 150} direction="up">
              <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed flex-1 font-sans">
                  {'"'}{testimonial.text}{'"'}
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-semibold text-foreground font-sans">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground font-sans">{testimonial.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
