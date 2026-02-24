"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useSoundtrack } from "@/lib/soundtrack-context"

export function Footer() {
  const { setHasChosen } = useSoundtrack()

  return (
    <footer className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold font-serif text-foreground">
                MERRY <span className="text-primary">RAINS</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-sans">
                Uma jornada alem da imaginacao
              </p>
            </div>

            <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => setHasChosen(false)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
              >
                Página inicial
              </button>
              <a
                href="#sinopse"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
              >
                Historia
              </a>
              <a
                href="#comprar"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
              >
                Comprar
              </a>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground font-sans">
              MERRY RAINS. Todos os direitos reservados.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
