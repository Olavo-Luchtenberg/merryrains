"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useThrottledScroll } from "@/lib/use-throttled-scroll"

export function HeroSection() {
  const scrollY = useThrottledScroll()
  const [viewportHeight, setViewportHeight] = useState(800)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const heroRef = useRef<HTMLElement>(null)
  const [titleRevealed, setTitleRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTitleRevealed(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight)
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener("mousemove", handleMouse, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  const heroScrollY = Math.max(0, scrollY - viewportHeight)
  const parallaxBg = heroScrollY * 0.4
  const titleOpacity = Math.max(0.9, 1 - heroScrollY / 2000)
  const titleScale = Math.max(0.95, 1 - heroScrollY / 4000)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
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
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent)",
            left: `${20 + mousePos.x * 10}%`,
            top: `${10 + mousePos.y * 10}%`,
            transition: "left 1.5s ease-out, top 1.5s ease-out",
          }}
        />
        <div
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(166, 166, 166, 0.06), transparent)",
            right: `${15 + (1 - mousePos.x) * 10}%`,
            bottom: `${20 + (1 - mousePos.y) * 8}%`,
            transition: "right 2s ease-out, bottom 2s ease-out",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 pt-20 sm:pt-24 pb-8 max-w-2xl mx-auto text-center"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Title & CTA */}
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
          <p
            className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-sans max-w-[90vw]"
            style={{
              color: "#ffffff",
              textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6)",
              opacity: titleRevealed ? 1 : 0,
              transform: titleRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            Merry Rains - Algumas pessoas sentem a chuva, outras apenas se molham
          </p>

          <h1 className="font-serif">
            {"MERRY".split("").map((letter, i) => (
              <span
                key={`m-${i}`}
                className="inline-block text-4xl min-[400px]:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
                style={{
                  color: "#ffffff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.9), 2px 2px 0 #a6a6a6",
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
                className="inline-block text-4xl min-[400px]:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
                style={{
                  color: "#ffffff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.9), 2px 2px 0 #a6a6a6",
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
            className="max-w-md text-base sm:text-lg leading-relaxed font-sans space-y-4 sm:space-y-6 mx-auto px-2 text-white/90"
            style={{
              opacity: titleRevealed ? 1 : 0,
              transform: titleRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s",
              textShadow: "0 1px 2px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
            }}
          >
            <p>Não é sobre personagens.<br />É sobre pessoas.</p>
            <p>Uma história que não termina<br />quando o livro acaba.</p>
            <p>Algumas páginas machucam.<br />Outras curam.</p>
            <p>Você não sai ileso dessa leitura.</p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none px-2"
            style={{
              opacity: titleRevealed ? 1 : 0,
              transform: titleRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s",
            }}
          >
            <a
              href="/login?callbackUrl=/checkout"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold tracking-wider uppercase rounded-lg overflow-hidden font-sans w-full sm:w-auto"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              <span className="relative z-10">Garanta Sua Experiência</span>
              <div className="absolute inset-0 bg-accent/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#previa"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold tracking-wider uppercase border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-sans w-full sm:w-auto"
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
          opacity: Math.max(0, 1 - heroScrollY / 200),
        }}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: '#ffffff' }} />
      </div>
    </section>
  )
}
