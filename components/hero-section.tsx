"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const heroRef = useRef<HTMLElement>(null)
  const [titleRevealed, setTitleRevealed] = useState(false)
  const [bookFloat, setBookFloat] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setTitleRevealed(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let animId: number
    const animate = () => {
      setBookFloat(Math.sin(Date.now() / 2000) * 5)
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouse)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [])

  const parallaxBg = scrollY * 0.4
  const titleOpacity = Math.max(0, 1 - scrollY / 600)
  const titleScale = Math.max(0.8, 1 - scrollY / 3000)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background orbs */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translateY(${parallaxBg}px)` }}
        aria-hidden="true"
      >
        <div
          className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(80, 180, 220, 0.5), transparent)",
            left: `${20 + mousePos.x * 10}%`,
            top: `${10 + mousePos.y * 10}%`,
            transition: "left 1.5s ease-out, top 1.5s ease-out",
          }}
        />
        <div
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(180, 160, 80, 0.5), transparent)",
            right: `${15 + (1 - mousePos.x) * 10}%`,
            bottom: `${20 + (1 - mousePos.y) * 8}%`,
            transition: "right 2s ease-out, bottom 2s ease-out",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-4 pt-20 sm:pt-24 pb-8 lg:flex-row lg:gap-16 lg:pt-0 lg:pb-0 max-w-6xl mx-auto"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Book Cover with 3D tilt */}
        <div className="relative group">
          <div
            className="relative w-[200px] h-[300px] min-[400px]:w-[240px] min-[400px]:h-[360px] sm:w-[260px] sm:h-[390px] md:w-[320px] md:h-[480px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              transform: `perspective(1000px) rotateY(${(mousePos.x - 0.5) * 10}deg) rotateX(${(0.5 - mousePos.y) * 5}deg) translateY(${bookFloat}px)`,
              transition: "transform 0.3s ease-out",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(80, 180, 220, 0.15)",
            }}
          >
            <Image
              src="/images/book-cover.jpg"
              alt="Capa do livro MERRY RAINS"
              fill
              className="object-cover"
              priority
            />
            {/* Shine effect */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${105 + mousePos.x * 50}deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
          </div>
          {/* Book glow */}
          <div
            className="absolute -inset-4 rounded-xl blur-2xl opacity-20 -z-10"
            style={{
              background: "linear-gradient(135deg, rgba(80, 180, 220, 0.5), rgba(180, 160, 80, 0.3))",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Title & CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <p
            className="text-sm tracking-[0.4em] uppercase text-primary font-sans"
            style={{
              opacity: titleRevealed ? 1 : 0,
              transform: titleRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            Algumas dores não gritam. Elas Chovem.
          </p>

          <h1 className="font-serif">
            {"MERRY".split("").map((letter, i) => (
              <span
                key={`m-${i}`}
                className="inline-block text-4xl min-[400px]:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground"
                style={{
                  opacity: titleRevealed ? 1 : 0,
                  transform: titleRevealed ? "translateY(0) rotateX(0)" : "translateY(40px) rotateX(40deg)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.06}s`,
                }}
              >
                {letter}
              </span>
            ))}
            <br />
            {"RAINS".split("").map((letter, i) => (
              <span
                key={`r-${i}`}
                className="inline-block text-4xl min-[400px]:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-primary"
                style={{
                  opacity: titleRevealed ? 1 : 0,
                  transform: titleRevealed ? "translateY(0) rotateX(0)" : "translateY(40px) rotateX(40deg)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.06}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>

          <div
            className="max-w-md text-lg leading-relaxed text-muted-foreground font-sans space-y-6"
            style={{
              opacity: titleRevealed ? 1 : 0,
              transform: titleRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s",
            }}
          >
            <p>Não é sobre personagens.<br />É sobre pessoas.</p>
            <p>Uma história que não termina<br />quando o livro acaba.</p>
            <p>Algumas páginas machucam.<br />Outras curam.</p>
            <p>Você não sai ileso dessa leitura.</p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: titleRevealed ? 1 : 0,
              transform: titleRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s",
            }}
          >
            <a
              href="#comprar"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase bg-primary text-primary-foreground rounded-lg overflow-hidden font-sans"
            >
              <span className="relative z-10">Garanta Seu Exemplar</span>
              <div className="absolute inset-0 bg-accent/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#sinopse"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-sans"
            >
              ENTRAR NA HISTÓRIA
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: Math.max(0, 1 - scrollY / 200),
        }}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
      </div>
    </section>
  )
}
