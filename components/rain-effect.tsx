"use client"

import { useEffect, useRef, useCallback } from "react"

interface RainDrop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  thickness: number
  wind: number
}

interface Splash {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
}

// Guarda-chuva: semicírculo definido por centro, raio e posição Y do topo
interface UmbrellaShape {
  cx: number   // centro X
  cy: number   // centro Y (centro do círculo completo, a borda fica em cy)
  r: number    // raio do semicírculo
}

function createDrop(width: number, height: number, randomY: boolean): RainDrop {
  const baseSpeed = Math.random() * 6 + 6
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -(Math.random() * 100),
    length: Math.random() * 25 + 12,
    speed: baseSpeed,
    opacity: Math.random() * 0.35 + 0.08,
    thickness: Math.random() * 1.5 + 0.5,
    wind: Math.random() * 1.5 - 0.3,
  }
}

// Retorna a Y da superfície do guarda-chuva para um dado X, ou null se fora do raio
function umbrellaYAt(x: number, umbrella: UmbrellaShape): number | null {
  const dx = x - umbrella.cx
  if (Math.abs(dx) > umbrella.r) return null
  // semicírculo superior: y = cy - sqrt(r² - dx²)
  const surfaceY = umbrella.cy - Math.sqrt(umbrella.r * umbrella.r - dx * dx)
  return surfaceY
}

export function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dropsRef = useRef<RainDrop[]>([])
  const splashesRef = useRef<Splash[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const splashVisibleRef = useRef(false)
  const umbrellaRef = useRef<UmbrellaShape>({ cx: 0, cy: 0, r: 0 })

  const initDrops = useCallback((width: number, height: number) => {
    const drops: RainDrop[] = []
    const divisor = width < 640 ? 12000 : 5000
    const count = Math.floor((width * height) / divisor)
    for (let i = 0; i < count; i++) {
      drops.push(createDrop(width, height, true))
    }
    return drops
  }, [])

  // Calcula a posição do guarda-chuva na tela com base no scroll e tamanho da viewport
  const updateUmbrellaShape = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const vw = canvas.width
    const vh = canvas.height

    // A imagem é 16:9 (1920×1080), object-contain centralizada
    // O guarda-chuva ocupa ~55% da largura e está centrado horizontalmente
    // O domo (semicírculo) vai do topo da imagem até ~55% da altura da imagem
    // Ajuste fino baseado na imagem real

    const imgAspect = 16 / 9
    const screenAspect = vw / vh

    let renderedW: number, renderedH: number
    if (screenAspect > imgAspect) {
      // barras laterais
      renderedH = vh
      renderedW = vh * imgAspect
    } else {
      // barras em cima/baixo
      renderedW = vw
      renderedH = vw / imgAspect
    }

    const offsetX = (vw - renderedW) / 2
    const offsetY = (vh - renderedH) / 2

    // Imagem 16:9, object-contain. Guarda-chuva medido na tela:
    // Domo: ~30% a ~70% da largura renderizada, base do domo em ~59% da altura
    // Centro X = 50%, raio = 20% da largura renderizada
    const umbCX = offsetX + renderedW * 0.50
    const umbCY = offsetY + renderedH * 0.59
    const umbR  = renderedW * 0.20

    umbrellaRef.current = { cx: umbCX, cy: umbCY, r: umbR }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      dropsRef.current = initDrops(canvas.width, canvas.height)
      updateUmbrellaShape()
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Colisão ativa apenas quando no topo da página (sem scroll)
    const handleScroll = () => {
      splashVisibleRef.current = window.scrollY === 0
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    const createSplashAt = (x: number, y: number) => {
      const count = Math.floor(Math.random() * 3) + 2
      for (let s = 0; s < count; s++) {
        splashesRef.current.push({
          x,
          y,
          radius: 0,
          maxRadius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 2 + 1,
        })
      }
      if (Math.random() > 0.6) {
        ripplesRef.current.push({
          x,
          y,
          radius: 0,
          maxRadius: Math.random() * 14 + 6,
          opacity: Math.random() * 0.25 + 0.1,
        })
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current++

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseRadius = 150
      const globalWind = Math.sin(timeRef.current * 0.005) * 0.5
      const umbrella = umbrellaRef.current
      const splashVisible = splashVisibleRef.current

      for (let i = 0; i < dropsRef.current.length; i++) {
        const drop = dropsRef.current[i]

        const dx = drop.x - mx
        const dy = drop.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        let offsetX = 0
        let offsetY = 0
        let extraOpacity = 0

        if (dist < mouseRadius) {
          const force = (1 - dist / mouseRadius) * 40
          offsetX = (dx / dist) * force
          offsetY = (dy / dist) * force * 0.3
          extraOpacity = (1 - dist / mouseRadius) * 0.2
        }

        const windOffset = drop.wind + globalWind
        const startX = drop.x + offsetX
        const startY = drop.y + offsetY
        const endX = startX + windOffset * drop.length * 0.3
        const endY = startY + drop.length

        // Colisão com guarda-chuva quando splash visível
        if (splashVisible && umbrella.r > 0) {
          // Verifica a ponta da gota (endX, endY)
          const surfaceY = umbrellaYAt(endX, umbrella)
          if (surfaceY !== null && endY >= surfaceY) {
            // Cria splash na superfície do domo e reseta a gota
            createSplashAt(endX, surfaceY)
            dropsRef.current[i] = createDrop(canvas.width, canvas.height, false)
            continue
          }
          // Verifica também o corpo da gota (startX, startY) para gotas rápidas
          const surfaceYStart = umbrellaYAt(startX, umbrella)
          if (surfaceYStart !== null && startY >= surfaceYStart) {
            createSplashAt(startX, surfaceYStart)
            dropsRef.current[i] = createDrop(canvas.width, canvas.height, false)
            continue
          }
        }

        // Draw drop
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        const alpha = drop.opacity + extraOpacity
        gradient.addColorStop(0, `rgba(180, 220, 255, 0)`)
        gradient.addColorStop(0.3, `rgba(180, 220, 255, ${alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(200, 230, 255, ${alpha})`)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = drop.thickness
        ctx.lineCap = "round"
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(endX, endY, drop.thickness * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 240, 255, ${alpha * 0.8})`
        ctx.fill()

        drop.y += drop.speed
        drop.x += windOffset * 0.5

        if (drop.y > canvas.height) {
          createSplashAt(drop.x, canvas.height - Math.random() * 4)
          dropsRef.current[i] = createDrop(canvas.width, canvas.height, false)
        }

        if (drop.x < -50 || drop.x > canvas.width + 50) {
          dropsRef.current[i] = createDrop(canvas.width, canvas.height, false)
        }
      }

      // Draw splash particles
      for (let i = splashesRef.current.length - 1; i >= 0; i--) {
        const splash = splashesRef.current[i]
        splash.radius += splash.speed * 0.15
        splash.opacity -= 0.02

        if (splash.opacity <= 0 || splash.radius >= splash.maxRadius) {
          splashesRef.current.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(
          splash.x + (Math.random() - 0.5) * 6,
          splash.y - splash.radius * 2,
          splash.radius,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = `rgba(200, 230, 255, ${splash.opacity})`
        ctx.fill()
      }

      // Draw ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i]
        ripple.radius += 0.5
        ripple.opacity -= 0.005

        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
          ripplesRef.current.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.ellipse(
          ripple.x,
          ripple.y,
          ripple.radius,
          ripple.radius * 0.3,
          0,
          0,
          Math.PI * 2
        )
        ctx.strokeStyle = `rgba(180, 220, 255, ${ripple.opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initDrops, updateUmbrellaShape])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  )
}
