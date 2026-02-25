"use client"

import { ScrollReveal } from "./scroll-reveal"

export function SynopsisSection() {
  return (
    <section id="previa" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 w-px h-24 bg-gradient-to-b from-transparent to-primary/40" aria-hidden="true" />

      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            Previa
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-muted-foreground font-sans text-lg">
            Em desenvolvimento
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
