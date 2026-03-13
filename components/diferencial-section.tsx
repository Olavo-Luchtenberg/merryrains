"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useRef, useState } from "react"
import Image from "next/image"

const diferenciais = [
  {
    icon: "/Simbulo 1.png",
    title: "A nova era do suspense: menos peças, mais jogo",
    description:
      'Esqueça as tramas inchadas com mil personagens e cenários que você nem lembra o nome. MERRY RAINS veio para quebrar o mercado com uma proposta que você nunca viu antes.\n\nAqui, cada elemento foi colocado com precisão cirúrgica. Temos poucos personagens e poucos lugares, mas todos estrategicamente posicionados para te encurralar. Nada é figurante: um objeto sobre a mesa, uma cor na parede ou uma única linha de diálogo são peças de um quebra-cabeça de manipulação pura.\n\nÉ um texto refinado, denso e visualmente explosivo, nunca um livro usou as cores com tanta intenção.\n\nNão estamos entregando uma leitura passiva; estamos entregando um ambiente de pressão psicológica constante. Cada detalhe foi escolhido a dedo para que, quando a armadilha fechar, você perceba que a pista estava na sua cara o tempo todo.\n\nMinimalista na forma, brutal no impacto.',
    comparison: "Cada frase lida é uma facada na mente do leitor.",
  },
  {
    icon: "/Simbulo 2.png",
    title: "Wordbuilding: Aqui a ciência não é enfeite",
    description:
      'Em MERRY RAINS, esqueça aquela fantasia onde as coisas acontecem "porque sim" ou por pura conveniência do roteiro. Aqui, o buraco é mais embaixo.\n\nCada engrenagem, cada fenômeno e cada detalhe desse universo foi levantado do zero em cima de teorias científicas reais. A gente não criou só um cenário; a gente construiu um sistema com uma lógica interna tão amarrada que chega a ser fascinante. Se algo acontece, existe um "porquê" físico, químico ou biológico por trás.\n\nÉ o tipo de worldbuilding feito para quem gosta de entender as regras do jogo e se perder nos detalhes. Se você é do time que ama quando a ficção faz sentido de verdade e respeita a sua inteligência... parabéns, você acabou de encontrar o seu lugar.',
    comparison: "Antes de pensar em escrever sequer uma palavra Yharus prezou pela coesão e lógica da obra.",
  },
  {
    icon: "/Simbulo 3.png",
    title: "Psicologia das cores: Um gatilho para cada página",
    description:
      'Esqueça a ideia de que as cores em MERRY RAINS são só decorativas. Elas são armas.\n\nPara escrever esta obra, não bastou criatividade; foi preciso mergulhar fundo em estudos psicológicos e psiquiátricos. Cada cena foi desenhada para atingir picos emocionais específicos através da manipulação cromática e do comportamento humano real.\n\nA gente não quer apenas que você leia a história; a gente quer que o seu cérebro reaja a ela.\n\nO tom de azul não está lá por acaso, e aquela sensação de desconforto que surge do nada tem uma explicação científica por trás. É uma experiência literária pensada para mexer com o seu subconsciente e te levar do êxtase à angústia em segundos.\n\nPrepare o psicológico: você não está apenas lendo um livro, está entrando em um laboratório de emoções.',
    comparison: "Prepare-se para sair da zona de conforto, aqui você mudará do topo ao poço em poucas páginas, ou vice-versa.",
  },
  {
    icon: "/Simbulo 4.png",
    title: "Protagonista fora do comum",
    description:
      "Ela não está aqui para ser salva. Ela dita o ritmo, resolve a parada e bota pra fuder porque o mundo é de quem faz.",
    comparison: "Esqueça amiguinhos ou família, aqui ela mesmo resolve seus B.O.",
  },
  {
    icon: "/Simbulo 5.png",
    title: "Experiência Sensorial Imersiva",
    description:
      "Esqueça o papel e a tela. Nossa narrativa sensorial ativa seus sentidos de forma profunda: do ritmo da escrita ao impacto visual das artes. Sinta a umidade do ar, o eco dos passos e a pulsação de cada lugar. Uma jornada completa, feita para quem não quer apenas ler, mas viver a obra.",
    comparison: "Você sente que ele é mais físico do que muitos livros físicos, mesmo sendo digital.",
  },
  {
    icon: "/Simbulo 6.png",
    title: "Plottwist Nível ***** ** ****",
    description:
      'Sabe aquela mania de ler um livro e já querer adivinhar o final no terceiro capítulo porque você "já viu de tudo"? Pois é, aqui essa sua confiança morre.\n\nNesta categoria, o autor não está tentando ser seu amigo; ele está tentando te fazer de otário. Ele te pega pela mão, te faz acreditar que você é o mestre da dedução, e no último segundo ele puxa o tapete com tanta força que você esquece até como respira.\n\nNão é um suspense comum de "quem matou?". É uma quebra de realidade total.\n\nÉ aquele tipo de livro que, quando você termina e deixa ele de lado, o silêncio da sala fica pesado. Você vai ficar encarando a parede por meia hora, sentindo aquela ponta de raiva por ter sido tão cego, e vai ser obrigado a reabrir na primeira página só pra entender onde foi que você perdeu o fio da meada.\n\nNível Ilha do Medo, Clube da Luta e O Sexto Sentido. Se você não aguenta ter suas certezas destruídas ou detesta se sentir enganado, passe longe. Mas se você busca aquele livro que não sai da sua cabeça nem depois de uma semana... prepare-se para o seu próximo trauma favorito.',
    comparison: "Antes de falar qualquer coisa sobre o livro, leia até chegar na contracapa, após isso fique á vontade para dar a sua opinião.",
  },
]

export function DiferencialSection() {
  return (
    <section id="diferencial" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-sans text-center">
            Por que este livro
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-4 sm:mb-6 text-balance text-center px-2">
            O que torna MERRY RAINS <span className="text-primary">diferente</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20 leading-relaxed font-sans text-sm sm:text-base px-2">
            Em um mercado repleto de fantasias genericas e ficcao cientifica formulaica,
            MERRY RAINS quebra todos os moldes.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {diferenciais.map((item, i) => (
            <DiferencialCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DiferencialCard({
  item,
  index,
}: {
  item: (typeof diferenciais)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <ScrollReveal delay={index * 100} direction={index % 2 === 0 ? "left" : "right"}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setExpanded(!expanded)
          }
        }}
        className="group relative rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 hover:border-primary/30 overflow-hidden"
      >
        {/* Interactive glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovering ? 0.06 : 0,
            background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.05), transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Number accent */}
        <span
          className="absolute top-4 right-4 sm:top-6 sm:right-8 text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-primary/[0.04] select-none transition-all duration-500 group-hover:text-primary/[0.08]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
          {/* Icon */}
          <div className="shrink-0 transition-transform duration-500 group-hover:scale-110 w-10 h-10 sm:w-12 sm:h-12 relative">
            <Image
              src={item.icon}
              alt=""
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-foreground break-words">
                {item.title}
              </h3>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-muted-foreground shrink-0 transition-transform duration-300"
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                aria-hidden="true"
              >
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="text-muted-foreground leading-relaxed font-sans text-sm sm:text-base break-words">
              {item.description}
            </p>

            {/* Expandable comparison */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: expanded ? "200px" : "0px",
                opacity: expanded ? 1 : 0,
                marginTop: expanded ? "16px" : "0px",
              }}
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-1 h-8 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <p className="text-sm font-semibold text-primary font-sans">
                  {item.comparison}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-b-2xl transition-all duration-700"
          style={{ width: isHovering ? "100%" : "0%" }}
          aria-hidden="true"
        />
      </div>
    </ScrollReveal>
  )
}
