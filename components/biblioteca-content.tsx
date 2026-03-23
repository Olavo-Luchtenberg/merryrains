"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ShoppingBag, ChevronRight, Layers, Square, Box } from "lucide-react"
import Image from "next/image"
import {
  CHAPTERS,
  calcChapterProgress,
  getChapterByIndex,
} from "@/lib/chapters"

const LIVRO = {
  id: "merry-rains",
  title: "MERRY RAINS: A ORIGEM",
  description: "",
  href: "/livro",
  cover: "/book-pages/DESIGN LIVRO.png",
}

const VERSOES = [
  {
    id: "padrao",
    name: "Versão padrão",
    description: "Leitura contínua recomendada",
  },
  {
    id: "comentada",
    name: "Versão comentada",
    description: "Notas do autor (em breve)",
    comingSoon: true,
  },
]

export function BibliotecaContent({ hasPurchase }: { hasPurchase: boolean }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [expanded, setExpanded] = useState(true)
  const [selectedLivroId, setSelectedLivroId] = useState<string>(LIVRO.id)
  const [selectedVersaoId, setSelectedVersaoId] = useState<string>(VERSOES[0]?.id ?? "padrao")
  const [view, setView] = useState<"overview" | "chapters">("overview")
  const [visualMode, setVisualMode] = useState<"2d" | "3d">("2d")

  useEffect(() => {
    if (!hasPurchase) return
    fetch("/api/reading-progress")
      .then((res) => res.ok ? res.json() : { progress: {} })
      .then((data) => setProgress(data.progress ?? {}))
      .catch(() => {})
  }, [hasPurchase])

  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-[calc(100vh-4rem)] w-full bg-background/80">
      <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col border-r border-border/60 bg-background">
        <div className="px-4 py-3 border-b border-border/60">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Minha biblioteca
          </p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-6 text-sm">
          <div>
            <p className="px-2 mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
              Livros
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedLivroId(LIVRO.id)
                setView("overview")
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 transition-colors ${
                selectedLivroId === LIVRO.id
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <span className="h-6 w-1 rounded-full bg-primary/80" aria-hidden />
              <span className="flex flex-col items-start leading-tight">
                <span className="font-medium">{LIVRO.title}</span>
              </span>
            </button>
          </div>

          {/* Versões agora são escolhidas na área principal */}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-x-hidden">{children}</div>
    </div>
  )

  if (!hasPurchase) {
    return (
      <LayoutWrapper>
        <div className="flex flex-1 items-center justify-center p-6">
          <Card className="border-border max-w-md w-full">
            <CardContent className="p-6 text-center space-y-4">
              <div className="space-y-1">
                <h2 className="font-serif text-lg font-semibold">
                  Nenhum livro ainda
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sua estante aparecerá aqui assim que você adquirir MERRY RAINS.
                </p>
              </div>
              <Button asChild>
                <Link href="/login?callbackUrl=/checkout">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Comprar MERRY RAINS
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
        {view === "overview" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="group relative w-full max-w-[320px] md:max-w-[380px] aspect-[3/5] max-h-[520px] overflow-hidden rounded-xl border border-border/60 bg-black">
                  <Image
                    src={LIVRO.cover}
                    alt={LIVRO.title}
                    fill
                    className="object-cover object-center pointer-events-none transition-transform duration-300 group-hover:scale-[1.03]"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 top-3 flex justify-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-black/80 px-4 py-1.5 text-[12px] uppercase tracking-[0.25em] text-white/90 border border-white/10">
                      Standard Version
                    </span>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      size="lg"
                      className="w-full max-w-[220px] bg-background/90 hover:bg-background text-foreground border border-border/80 backdrop-blur"
                      onClick={() => setView("chapters")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Entrar no livro
                    </Button>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setVisualMode("2d")}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                        visualMode === "2d"
                          ? "bg-background text-foreground border-primary"
                          : "bg-black/70 text-white/70 border-white/20 hover:text-white"
                      }`}
                    >
                      <Square className="h-3.5 w-3.5" />
                      2D
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisualMode("3d")}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                        visualMode === "3d"
                          ? "bg-background text-foreground border-primary"
                          : "bg-black/70 text-white/70 border-white/20 hover:text-white"
                      }`}
                    >
                      <Box className="h-3.5 w-3.5" />
                      3D
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "chapters" && (
          <div className="space-y-1">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                Capítulos
              </p>
              <h3 className="font-serif text-lg font-semibold leading-snug">
                Estrutura de leitura de {LIVRO.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                Selecione um capítulo para começar.
              </p>
            </div>
          </div>
        )}

        {view === "chapters" && (
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
          {Array.from({ length: 10 }).map((_, index) => {
            const numero = index + 1
            const isDisponivel = numero === 6 || numero === 7
            const chapter = isDisponivel ? getChapterByIndex(numero) : null
            const coverSrc = encodeURI(`/book-pages/CAP ${numero}.png`)

            const lastPage =
              isDisponivel && chapter ? progress[chapter.id] ?? -1 : -1
            const percent =
              isDisponivel && chapter
                ? calcChapterProgress(lastPage, chapter)
                : 0

            // Bloqueia capítulos seguintes se o anterior não estiver 100%
            const prevChapter = getChapterByIndex(numero - 1)
            const prevLastPage =
              prevChapter && typeof progress[prevChapter.id] === "number"
                ? progress[prevChapter.id]
                : -1
            const prevPercent =
              prevChapter && prevLastPage >= 0
                ? calcChapterProgress(prevLastPage, prevChapter)
                : 100
            // Libera o próximo capítulo quando a leitura do anterior estiver >= 90%
            const isLocked = isDisponivel && prevChapter && prevPercent < 90

            return (
              <Card
                key={numero}
                className={`h-full flex flex-col justify-between border-border overflow-hidden ${
                  !isDisponivel ? "opacity-80" : ""
                }`}
              >
                <div className="relative w-full h-[30vh] bg-black/80">
                  <Image
                    src={coverSrc}
                    alt={`Capa do capítulo ${numero}`}
                    fill
                    className={`object-cover object-center pointer-events-none ${
                      !isDisponivel ? "grayscale-[0.4] opacity-80" : ""
                    }`}
                    draggable={false}
                  />
                </div>
                <CardContent className="px-3 pb-3 pt-2 flex flex-col gap-1.5 flex-1">
                  <div>
                    <h4 className="font-medium text-sm">
                      {isDisponivel && chapter
                        ? chapter.title
                        : `Capítulo ${numero} · Em criação`}
                    </h4>
                  </div>

                  {isDisponivel && chapter && !isLocked ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Progress value={percent} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                          {percent}%
                        </span>
                      </div>
                      <Button asChild size="sm" className="w-full">
                        <Link href={`/livro?chapter=${chapter.id}`}>
                          Continuar leitura
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Progress value={0} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                          0%
                        </span>
                      </div>
                      <Button size="sm" className="w-full" disabled>
                        {isDisponivel && isLocked
                          ? "Conclua o capítulo anterior"
                          : "Em criação"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
        )}

        {view === "chapters" && expanded && (
          <p className="text-xs text-muted-foreground">
            Os capítulos marcados como &quot;Em criação&quot; serão liberados
            automaticamente aqui na sua biblioteca assim que forem concluídos.
          </p>
        )}
      </section>
    </LayoutWrapper>
  )
}
