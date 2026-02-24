"use client"

import { useState } from "react"
import { useSoundtrack, type SoundtrackChoice } from "@/lib/soundtrack-context"

const options: { id: Exclude<SoundtrackChoice, null>; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "rain",
    label: "Chuva",
    description: "Som ambiente de chuva caindo",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 14.5C4 14.5 5 18 5.5 20" />
        <path d="M9 12.5C9 12.5 10 16 10.5 18" />
        <path d="M14 14.5C14 14.5 15 18 15.5 20" />
        <path d="M19 12.5C19 12.5 20 16 20.5 18" />
        <path d="M20 8.5C20 5.46 16.42 3 12 3C7.58 3 4 5.46 4 8.5C4 8.5 4 10 6 10H18C20 10 20 8.5 20 8.5Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "silence",
    label: "Silêncio",
    description: "Sem trilha sonora",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        <line x1="22" y1="9" x2="16" y2="15" />
        <line x1="16" y1="9" x2="22" y2="15" />
      </svg>
    ),
  },
]

export function WelcomeScreen() {
  const { setChoice, setHasChosen } = useSoundtrack()
  const [selected, setSelected] = useState<SoundtrackChoice>(null)
  const [isEntering, setIsEntering] = useState(false)

  const handleEnter = () => {
    if (!selected) return
    setChoice(selected)
    setIsEntering(true)
    setTimeout(() => setHasChosen(true, selected), 800)
  }

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center px-6 transition-opacity duration-700 ${
        isEntering ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" aria-hidden="true" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Seja Bem Vindo
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Para que a experiência seja mais imersiva, comece escolhendo a sua trilha sonora
        </p>

        <div className="grid grid-cols-2 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelected(opt.id)}
              className={`group flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-300 ${
                selected === opt.id
                  ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(80,180,220,0.2)]"
                  : "border-border bg-card/50 hover:border-primary/40 hover:bg-card/80"
              }`}
            >
              <span className={selected === opt.id ? "text-primary" : "text-muted-foreground group-hover:text-primary/80"}>
                {opt.icon}
              </span>
              <span className="font-semibold text-foreground font-sans">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.description}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleEnter}
          disabled={!selected}
          className={`px-10 py-4 text-sm font-semibold tracking-wider uppercase rounded-lg font-sans transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 ${
            selected
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(80,180,220,0.3)]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
