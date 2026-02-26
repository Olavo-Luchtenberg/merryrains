"use client"

import { useSoundtrack } from "@/lib/soundtrack-context"

const VINYL_SIZE = 52

export function MusicVinyl() {
  const { choice } = useSoundtrack()

  if (choice !== "music") return null

  return (
    <div
      className="fixed top-4 left-4 z-50 flex items-center justify-center pointer-events-none"
      style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      aria-hidden
    >
      {/* Vitrola - disco girando (como no Instagram) */}
      <div
        className="relative rounded-full overflow-hidden border-2 border-border/50 shadow-lg animate-spin"
        style={{
          width: VINYL_SIZE,
          height: VINYL_SIZE,
          animationDuration: "3s",
          background: "radial-gradient(circle at 50% 50%, var(--card) 0%, var(--card) 35%, #0a0a0a 35%, #1a1a1a 100%)",
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Centro - capa da música (placeholder até enviar imagem) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ padding: 6 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-card border border-border/80 flex items-center justify-center">
            {/* Placeholder: trocar por <Image src="/capa-musica.png" alt="" fill className="object-cover" /> quando tiver */}
            <div className="w-full h-full bg-gradient-to-br from-primary/15 to-muted flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-muted-foreground"
              >
                <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18" cy="16" r="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
