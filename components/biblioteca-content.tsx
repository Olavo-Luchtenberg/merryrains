"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ShoppingBag, ChevronRight } from "lucide-react"
import Image from "next/image"
import {
  CHAPTERS,
  calcChapterProgress,
  getChapterByIndex,
} from "@/lib/chapters"

const LIVRO = {
  id: "merry-rains",
  title: "MERRY RAINS",
  description: "Uma jornada além da imaginação",
  href: "/livro",
  cover: "/images/book-cover.jpg",
}

export function BibliotecaContent({ hasPurchase }: { hasPurchase: boolean }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (!hasPurchase) return
    fetch("/api/reading-progress")
      .then((res) => res.ok ? res.json() : { progress: {} })
      .then((data) => setProgress(data.progress ?? {}))
      .catch(() => {})
  }, [hasPurchase])

  if (!hasPurchase) {
    return (
      <Card className="border-border max-w-md">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Você ainda não possui nenhum livro. Compre MERRY RAINS para acessá-lo
            aqui.
          </p>
          <Button asChild>
            <Link href="/login?callbackUrl=/checkout">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Comprar MERRY RAINS
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl">
      <Card className="overflow-hidden border-border">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-auto sm:min-h-[220px] flex-shrink-0">
            <Image
              src={LIVRO.cover}
              alt={LIVRO.title}
              fill
              className="object-cover pointer-events-none"
              draggable={false}
            />
          </div>
          <CardContent className="flex-1 p-4 sm:p-6 flex flex-col">
            <h2 className="font-serif font-bold text-lg">{LIVRO.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{LIVRO.description}</p>
            <Button asChild className="w-full sm:w-auto self-start mb-4">
              <Link href={LIVRO.href}>
                <BookOpen className="h-4 w-4 mr-2" />
                Entrar no livro
              </Link>
            </Button>

            <div className="border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Capítulos {expanded ? "▼" : "▶"}
              </button>
              {expanded && (
                <ul className="mt-3 space-y-2">
                  {CHAPTERS.map((chapter) => {
                    const lastPage = progress[chapter.id] ?? -1
                    const percent = calcChapterProgress(lastPage, chapter)
                    return (
                      <li key={chapter.id}>
                        <Link
                          href={`/livro?chapter=${chapter.id}`}
                          className="flex items-center gap-2 group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate group-hover:text-primary transition-colors">
                              {chapter.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Progress value={percent} className="h-1.5 flex-1" />
                              <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                                {percent}%
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
