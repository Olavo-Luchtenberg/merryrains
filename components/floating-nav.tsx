"use client"

import { useState, useEffect } from "react"
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

const links = [
  { href: "#sinopse", label: "Historia" },
  { href: "#diferencial", label: "Diferencial" },
  { href: "#autor", label: "Autor" },
  { href: "#comprar", label: "Comprar" },
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
    const handleScroll = () => {
      setVisible(window.scrollY > 500)

      const sections = ["sinopse", "diferencial", "autor", "comprar"]
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
      {links.map((link) => (
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
      ))}
    </>
  )

  return (
    <>
      {/* Desktop nav */}
      <nav
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 hidden md:block"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateX(-50%) translateY(${visible ? 0 : -20}px)`,
          pointerEvents: visible ? "auto" : "none",
        }}
        aria-label="Navegacao principal"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-border bg-card/80 backdrop-blur-xl shadow-lg">
          <button
            type="button"
            className="px-4 py-2 text-xs font-bold tracking-wider text-primary font-serif hover:opacity-80 transition-opacity"
            onClick={() => setHasChosen(false)}
          >
            MR
          </button>
          <div className="w-px h-4 bg-border" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setHasChosen(false)}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-colors font-sans text-muted-foreground hover:text-foreground"
          >
            Início
          </button>
          {links.map((link) => (
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
          ))}
        </div>
      </nav>

      {/* Mobile nav - hamburger (always visible on mobile for access) */}
      <div className="fixed left-4 right-4 md:hidden z-40 flex justify-between items-center px-2 py-2 rounded-2xl mx-2 border border-border/50 bg-card/60 backdrop-blur-xl" style={{ top: 'max(1rem, env(safe-area-inset-top))' }}>
        <button
          type="button"
          className="px-4 py-2 text-sm font-bold tracking-wider text-primary font-serif"
          onClick={() => setHasChosen(false)}
        >
          MR
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
