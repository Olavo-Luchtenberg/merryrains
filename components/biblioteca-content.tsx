"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ShoppingBag } from "lucide-react"
import Image from "next/image"

const LIVROS = [
  {
    id: "merry-rains",
    title: "MERRY RAINS",
    description: "Uma jornada além da imaginação",
    href: "/livro",
    cover: "/images/book-cover.jpg",
  },
]

export function BibliotecaContent({ hasPurchase }: { hasPurchase: boolean }) {
  if (hasPurchase) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LIVROS.map((livro) => (
          <Card key={livro.id} className="overflow-hidden border-border">
            <div className="relative aspect-[3/4] select-none">
              <Image
                src={livro.cover}
                alt={livro.title}
                fill
                className="object-cover pointer-events-none"
                draggable={false}
              />
            </div>
            <CardContent className="p-4">
              <h2 className="font-serif font-bold text-lg">{livro.title}</h2>
              <p className="text-sm text-muted-foreground mb-3">
                {livro.description}
              </p>
              <Button asChild className="w-full">
                <Link href={livro.href}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ler
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Card className="border-border max-w-md">
      <CardContent className="p-6 text-center">
        <p className="text-muted-foreground mb-4">
          Você ainda não possui nenhum livro. Compre MERRY RAINS para acessá-lo
          aqui.
        </p>
        <Button asChild>
          <Link href="/registro?returnTo=/checkout">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Comprar MERRY RAINS
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
