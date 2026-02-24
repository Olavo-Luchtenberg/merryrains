"use client"

import { ScrollReveal } from "./scroll-reveal"
import { ParallaxSection } from "./parallax-section"

export function SynopsisSection() {
  return (
    <section id="sinopse" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 w-px h-24 bg-gradient-to-b from-transparent to-primary/40" aria-hidden="true" />

      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            A Historia
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-center text-2xl sm:text-4xl md:text-6xl font-bold font-serif text-foreground mb-8 sm:mb-12 md:mb-16 text-balance">
            Quando a chuva comecou a falar,<br />
            <span className="text-primary">o mundo nunca mais foi o mesmo</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <ParallaxSection speed={0.05}>
            <ScrollReveal direction="left" delay={200}>
              <div className="space-y-6">
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                  Em um futuro distante, a Terra e banhada por chuvas misteriosas que carregam memorias de civilizacoes extintas. Cada gota contem fragmentos de historias, emocoes e segredos de mundos que ja nao existem mais.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                  Quando Lira, uma jovem cientista, descobre que pode decodificar essas mensagens, ela desencadeia uma serie de eventos que colocam toda a humanidade em perigo.
                </p>
              </div>
            </ScrollReveal>
          </ParallaxSection>

          <ParallaxSection speed={0.1}>
            <ScrollReveal direction="right" delay={300}>
              <div className="space-y-6">
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                  A chuva nao e apenas agua. E uma ponte entre dimensoes, uma mensagem cosmica que levou milenios para chegar ate nos. E agora, alguem esta respondendo.
                </p>
                <div className="relative p-4 sm:p-6 rounded-2xl border border-border bg-secondary/50">
                  <div className="absolute -top-3 left-6 px-3 bg-background text-primary text-xs tracking-widest uppercase font-sans">
                    Trecho do Livro
                  </div>
                  <blockquote className="italic text-foreground/90 leading-relaxed font-serif text-base sm:text-lg">
                    {'"'}As gotas batiam no vidro como dedos impacientes, cada uma carregando o ultimo suspiro de uma estrela que morreu ha bilhoes de anos. Lira sabia que nao era coincidencia. A chuva estava esperando por ela.{'"'}
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          </ParallaxSection>
        </div>
      </div>
    </section>
  )
}
