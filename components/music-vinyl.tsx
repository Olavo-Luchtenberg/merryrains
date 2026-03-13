"use client"

import { useSoundtrack } from "@/lib/soundtrack-context"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const VINYL_SIZE = 52
const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/embed/playlist/4tP5HudQXdKjRgkhhQkyDV?utm_source=generator"

// 46 capas de álbum para a vitrola
const ALBUM_COVERS = Array.from({ length: 46 }, (_, i) => `/${i + 1}.png`)

export function MusicVinyl() {
  const { choice } = useSoundtrack()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Troca de capa a cada 12 segundos
  useEffect(() => {
    if (choice !== "music") return
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % ALBUM_COVERS.length)
    }, 12000)
    return () => clearInterval(interval)
  }, [choice])

  if (choice !== "music") return null

  return (
    <>
      {/* Vitrola + Spotify: em mobile no canto inferior esquerdo; em desktop no canto superior esquerdo */}
      <div
        className="fixed left-4 z-50 flex gap-3 max-md:bottom-24 max-md:top-auto max-md:flex-col-reverse max-md:items-end md:bottom-auto md:top-4 md:items-start"
      >
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full shrink-0"
              aria-label="Abrir vitrola"
            >
            {/* Vitrola - disco girando */}
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
              {/* Centro - capa do álbum */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ padding: 6 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-card border border-border/80 relative">
                  <Image
                    key={currentIndex}
                    src={ALBUM_COVERS[currentIndex]}
                    alt=""
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="52px"
                  />
                </div>
              </div>
            </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[560px] w-[95vw] p-0 overflow-y-auto max-h-[95vh] border-border rounded-2xl">
            <DialogTitle className="sr-only">Vitrola - Capa do álbum</DialogTitle>
            <div className="flex flex-col">
              {/* Capa do álbum */}
              <div className="relative w-full aspect-square shrink-0">
                <Image
                  src={ALBUM_COVERS[currentIndex]}
                  alt="Capa do álbum"
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="560px"
                  priority
                />
              </div>
              {/* Spotify embed dentro do modal no mobile */}
              <div className="p-4 md:hidden">
                <iframe
                  className="rounded-xl border-0 w-full"
                  src={SPOTIFY_PLAYLIST_URL}
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Playlist"
                />
              </div>
              <p className="text-center text-muted-foreground text-sm py-3 px-4">
                Clique na vitrola para ver a capa
              </p>
            </div>
          </DialogContent>
        </Dialog>
        {/* Spotify embed ao lado da vitrola - apenas em desktop; em mobile fica no modal */}
        <iframe
          data-testid="embed-iframe"
          className="hidden md:block rounded-xl border-0 w-[280px] min-w-[280px] shrink-0"
          src={SPOTIFY_PLAYLIST_URL}
          width="280"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist"
        />
      </div>
    </>
  )
}
