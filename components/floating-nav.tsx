"use client"

import { useState, useEffect, useRef } from "react"
import { Menu } from "lucide-react"
import { useSoundtrack } from "@/lib/soundtrack-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const links: { href: string; label: string; external?: boolean }[] = [
  { href: "#previa", label: "Previa" },
  { href: "#diferencial", label: "Diferencial" },
  { href: "#autor", label: "Autor" },
  { href: "/login?callbackUrl=/checkout", label: "Comprar", external: true },
  { href: "/login", label: "Entrar", external: true },
]

export function FloatingNav() {
  const { setHasChosen } = useSoundtrack()
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false)

  const goToWelcome = () => {
    setSheetOpen(false)
    setHasChosen(false)
  }

  useEffect(() => {
    let ticking = false
    let rafId: number | null = null

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        setVisible(y > 500)

        const sections = ["previa", "diferencial", "autor", "comprar"]
        const halfH = window.innerHeight / 2
        for (const section of sections.reverse()) {
          const el = document.getElementById(section)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= halfH) {
              setActiveSection(section)
              break
            }
          }
        }
        ticking = false
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const navLinks = (
    <>
      <button
        type="button"
        onClick={goToWelcome}
        className="block w-full text-left px-4 py-2 text-sm font-semibold tracking-wider uppercase rounded-full transition-colors font-sans text-muted-foreground hover:text-foreground"
      >
        Página inicial
      </button>
      {links.map((link) =>
        link.external ? (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setSheetOpen(false)}
            className="block px-4 py-2 text-sm font-semibold tracking-wider uppercase rounded-full transition-colors font-sans text-muted-foreground hover:text-foreground"
          >
            {link.label}
          </a>
        ) : (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setSheetOpen(false)}
            className={`block px-4 py-2 text-sm font-semibold tracking-wider uppercase rounded-full transition-colors font-sans ${
              activeSection === link.href.slice(1)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </a>
        ),
      )}
    </>
  )

  return (
    <>
      {/* Desktop nav */}
      <nav
        className="fixed top-4 sm:top-6 z-40 transition-all duration-500 hidden md:block"
        style={{
          left: "50%",
          opacity: visible ? 1 : 0,
          transform: `translateX(-50%) translateY(${visible ? 0 : -20}px)`,
          pointerEvents: visible ? "auto" : "none",
        }}
        aria-label="Navegacao principal"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-border bg-card/80 backdrop-blur-xl shadow-lg">
          <button
            type="button"
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={() => setHasChosen(false)}
            aria-label="Página inicial"
          >
            <span className="text-sm font-semibold tracking-wider text-foreground">Merry Rains</span>
          </button>
          <div className="w-px h-4 bg-border" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setHasChosen(false)}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-colors font-sans text-muted-foreground hover:text-foreground"
          >
            Início
          </button>
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-colors font-sans text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-colors font-sans ${
                  activeSection === link.href.slice(1)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ),
          )}
        </div>
      </nav>

      {/* Mobile nav - hamburger (always visible on mobile for access) */}
      <div className="fixed left-2 right-2 sm:left-4 sm:right-4 md:hidden z-40 flex justify-between items-center px-3 py-2.5 rounded-2xl mx-2 border border-border/50 bg-card/80 backdrop-blur-xl" style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }}>
        <button
          type="button"
          className="flex items-center hover:opacity-80 transition-opacity"
          onClick={() => setHasChosen(false)}
          aria-label="Página inicial"
        >
          <span className="text-sm font-semibold tracking-wider text-foreground">Merry Rains</span>
        </button>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border bg-card/80 backdrop-blur-xl shrink-0"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle className="text-left font-serif">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-8" aria-label="Navegacao mobile">
              {navLinks}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
