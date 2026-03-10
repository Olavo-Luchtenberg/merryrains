"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut, Home, BookMarked, User } from "lucide-react"

export function LivroNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between w-full pl-4 pr-1">
        <Link
          href="/livro"
          className="flex items-center gap-2 font-serif font-bold text-primary"
        >
          <BookOpen className="h-5 w-5" />
          Merry Rains
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/biblioteca">
              <BookMarked className="h-4 w-4 mr-1" />
              Biblioteca
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/conta">
              <User className="h-4 w-4 mr-1" />
              Usuário
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-1" />
              Início
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </Button>
        </nav>
      </div>
    </header>
  )
}
