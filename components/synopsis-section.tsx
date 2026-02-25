"use client"

import { ScrollReveal } from "./scroll-reveal"
import { BookPreview } from "./book-preview"

export function SynopsisSection() {
  return (
    <section id="previa" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 w-px h-24 bg-gradient-to-b from-transparent to-primary/40" aria-hidden="true" />

      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            Previa
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground font-sans text-lg mb-8">
            Navegue pelas páginas e veja um trecho do livro
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <BookPreview />
        </ScrollReveal>
      </div>
    </section>
  )
}
