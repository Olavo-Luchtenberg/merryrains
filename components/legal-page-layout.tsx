"use client"

import Link from "next/link"

interface LegalPageLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const TERM_LINKS = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/cookies", label: "Cookies" },
  { href: "/termos", label: "Termos" },
  { href: "/reembolso", label: "Reembolso" },
  { href: "/entrega", label: "Entrega" },
  { href: "/anti-pirataria", label: "Anti-pirataria" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/faq-juridico", label: "FAQ Jurídico" },
  { href: "/acessibilidade", label: "Acessibilidade" },
]

export function LegalPageLayout({ title, subtitle, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border py-4 px-4 sm:px-6 shrink-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/inicio"
            className="font-serif font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            Merry Rains
          </Link>
          <Link
            href="/inicio"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Voltar ao site
          </Link>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-8 prose prose-invert prose-sm max-w-none [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-xl [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-sans [&_h3]:text-base [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_ul]:my-4 [&_li]:my-1">
          {children}
        </div>
      </article>
      <footer className="border-t border-border py-8 px-4 sm:px-6 mt-auto shrink-0" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-1 text-xs text-muted-foreground mb-4">
            {TERM_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-sans text-center">
            MERRY RAINS. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
