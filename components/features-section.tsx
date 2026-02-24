"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useRef, useState, useEffect } from "react"

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height * 0.3) / windowHeight))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      {/* Horizontal reveal line */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16">
        <div className="h-px bg-border relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${scrollProgress * 100}%`, transition: "width 0.15s linear" }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            Por que Ler
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-8 sm:mb-12 md:mb-16 text-balance">
            Uma experiencia que vai{" "}
            <span className="text-primary">alem das paginas</span>
          </h2>
        </ScrollReveal>

        {/* Bloco 1 */}
        <ScrollReveal delay={150}>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-foreground mb-6">
              CHEGA DE TIJOLOS DE PAPEL: O LIVRO QUE RESPEITA O SEU CÉREBRO
            </h3>
            <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
              <p>
                Esqueça esses PDFs sem vida ou aqueles livros físicos que parecem um bloco de concreto cheio de letras miúdas. Convenhamos: ninguém mais aguenta quinhentas páginas brancas com um amontoado de texto jogado, onde você lê, lê e sente que não saiu do lugar.
              </p>
              <p>
                Yharus decidiu chutar o balde e inovar. Em um mundo de TikTok, vício em telas e TDAH, a leitura não pode ser um sacrifício sem estímulo.
              </p>
              <p>
                Em MERRY RAINS, a imersão é real, mesmo no digital:
              </p>
              <p className="font-semibold text-foreground">ESTÍMULO VISUAL CONSTANTE:</p>
              <p>Chega de páginas idênticas. Aqui, o design joga junto com a história.</p>
              <p className="font-semibold text-foreground">CORES COM PROPÓSITO:</p>
              <p>Cada personagem tem sua própria identidade visual. Você sente a presença deles antes mesmo de ler.</p>
              <p className="font-semibold text-foreground">ADEUS, CONFUSÃO:</p>
              <p>Esqueça aqueles travessões bregas ou aspas antigas que te fazem voltar três vezes para saber quem está falando. Aqui, o nome do personagem abre a fala. É direto, limpo e cinematográfico.</p>
              <p>
                Se os livros tradicionais pararam no tempo, a gente resolveu acelerar. Você não vai apenas ler; você vai ter uma experiência física de imersão que muito &quot;livro de prateleira&quot; não consegue entregar.
              </p>
              <p>É leitura para quem vive no agora.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Bloco 2 */}
        <ScrollReveal delay={200}>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-foreground mb-6">
              MERRY RAINS NÃO É UM PRODUTO. É UMA OBSESSÃO.
            </h3>
            <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
              <p>
                Yharus não teve pressa. E ele faz questão que você saiba disso.
              </p>
              <p>
                Foram mais de 1.000 dias de puro isolamento, pensamento, escrita e uma diagramação gráfica feita à mão, detalhe por detalhe. Enquanto o mercado editorial cospe livros genéricos a cada seis meses, ele decidiu seguir o caminho difícil.
              </p>
              <p>Ele disse não.</p>
              <p>
                Disse não para o caminho tradicional das editoras, disse não para a facilidade de ser &quot;só mais um&quot; jogado no mar da Amazon ou do Kindle. Ele não quis ser um PDF genérico que você baixa e esquece. MERRY RAINS foi tratado com exclusividade cirúrgica, como algo que não pertence ao &quot;comum&quot;.
              </p>
              <p>
                Você não vai achar essa experiência em nenhum outro lugar. Nenhuma livraria física, nenhum buscador de promoções.
              </p>
              <p>
                <strong className="text-foreground">MERRY RAINS você só encontra aqui, no merryrains.com. E ponto final.</strong>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
