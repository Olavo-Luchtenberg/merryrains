"use client"

import { ScrollReveal } from "./scroll-reveal"
import { Star } from "lucide-react"

const testimonials = [
  {
    text: "Eu nunca fiquei tão focada lendo um livro. Ele trabalha com estímulos visuais o tempo todo — não é aquela leitura automática, sabe? Aqui isso simplesmente não acontece. Você se sente dentro da história. É como se estivesse na pele da protagonista. Cada página parece uma experiência, não apenas palavras na tela. Não é só leitura. É vivência. Sério… é animal.",
    author: "Emanuelle Pereira",
    role: "Leitora Beta",
    stars: 5,
  },
  {
    text: "Eu tenho sérios problemas de concentração, mas esse autor sabe prender a gente. O ritmo dos capítulos é muito bem pensado, parece que você tá assistindo uma série daquelas que não dá pra parar no primeiro episódio. Terminei e nem vi o tempo passar, o tempo voou real.",
    author: "Agatha Rafaela",
    role: "Leitora Beta",
    stars: 5,
  },
  {
    text: "Olha, eu já li muita ficção desse gênero e achei que seria 'mais do mesmo'. Me enganei feio. Tem uns plot twists aqui, principalmente do meio pro fim, que eu nunca vi em lugar nenhum. Me deu vários estalos mentais, fiquei em choque com aquela virada!",
    author: "Yas Santorini",
    role: "Leitora Beta",
    stars: 5,
  },
  {
    text: "Vou falar a real: eu relutei pra comprar por ser digital. Mas quando comecei a ler... meu deus. A experiência é muito sensorial, você se sente dentro da cena. Dá pra perceber o capricho na edição visual do arquivo, é coisa de colecionador mesmo, só que na palma da mão.",
    author: "Bruna Schroeder",
    role: "Leitora Beta",
    stars: 5,
  },
  {
    text: "O que eu mais amei foi como eu me vi na protagonista. O autor pega uns sentimentos humanos muito complexos e traduz pra jornada dela de um jeito muito forte. Se você tá na dúvida se vai se conectar, só vai. É impossível não torcer por ela.",
    author: "Tati Silva",
    role: "Leitora Beta",
    stars: 5,
  },
  {
    text: "Leitura densa na medida certa, mas sem ser maçante. O texto respira, a história te carrega. Fazia tempo que eu não perdia a hora de dormir porque simplesmente não conseguia 'fechar' o tablet e abandonar a protagonista naquele momento.",
    author: "Léo Jibrain",
    role: "Leitor Beta",
    stars: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.05), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <p className="text-center text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans">
            O Que Dizem
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-8 sm:mb-12 md:mb-16 text-balance">
          Leitores Beta que já tiveram um gostinho amargo dessa jornada.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 150} direction="up">
              <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed flex-1 font-sans">
                  {'"'}{testimonial.text}{'"'}
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-semibold text-foreground font-sans">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground font-sans">{testimonial.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
