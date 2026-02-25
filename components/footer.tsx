"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useSoundtrack } from "@/lib/soundtrack-context"
import { Instagram } from "lucide-react"

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
                href="#previa"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
              >
                Previa
              </a>
              <a
                href="#comprar"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
              >
                Comprar
              </a>
              <a
                href="https://www.instagram.com/umbrellamerryrains/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans group"
                aria-label="Instagram do livro Merry Rains"
              >
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border-2 border-border bg-gradient-to-br from-[#f09433] via-[#e1306c] to-[#405de6] p-1.5 text-white group-hover:scale-110 transition-transform duration-200"
                  aria-hidden
                >
                  <Instagram className="w-4 h-4" strokeWidth={2} />
                </span>
                <span className="hidden sm:inline">Instagram</span>
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
