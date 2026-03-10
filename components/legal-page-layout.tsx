"use client"

import Link from "next/link"

interface LegalPageLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function LegalPageLayout({ title, subtitle, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-serif font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            Merry Rains
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Voltar ao site
          </Link>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-8 prose prose-invert prose-sm max-w-none [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-xl [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-sans [&_h3]:text-base [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_ul]:my-4 [&_li]:my-1">
          {children}
        </div>
      </article>
    </div>
  )
}
