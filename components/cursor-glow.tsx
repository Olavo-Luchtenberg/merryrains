"use client"

import { useEffect, useRef, useState } from "react"

/** Mostra o cursor customizado apenas quando o usuário tem mouse (pointer fino ou hover).
 * Esconde em celulares/tablets onde o input principal é touch. */
function useShouldShowCursor() {
  const [show, setShow] = useState(true) // começa true para evitar flash
  useEffect(() => {
    const check = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches
      const canHover = window.matchMedia("(hover: hover)").matches
      setShow(hasFinePointer || canHover)
    }
    check()
    const mq1 = window.matchMedia("(pointer: fine)")
    const mq2 = window.matchMedia("(hover: hover)")
    mq1.addEventListener("change", check)
    mq2.addEventListener("change", check)
    return () => {
      mq1.removeEventListener("change", check)
      mq2.removeEventListener("change", check)
    }
  }, [])
  return show
}

export function CursorGlow() {
  const showCursor = useShouldShowCursor()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const smoothMouse = useRef({ x: -100, y: -100 })
  const velocity = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        hoveringRef.current = true
        setIsHovering(true)
      } else {
        hoveringRef.current = false
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    let animId: number

    const drawWaterDrop = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smooth follow with easing
      const ease = 0.15
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * ease
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * ease

      // Calculate velocity for squish effect
      velocity.current.x = mouse.current.x - prevMouse.current.x
      velocity.current.y = mouse.current.y - prevMouse.current.y
      prevMouse.current = { ...mouse.current }

      const cx = smoothMouse.current.x
      const cy = smoothMouse.current.y
      const baseRadius = hoveringRef.current ? 22 : 16
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)

      // Squish based on movement
      const squish = Math.min(speed * 0.015, 0.25)
      const angle = Math.atan2(velocity.current.y, velocity.current.x)

      // Subtle wobble animation
      const wobble = Math.sin(time * 0.004) * 0.5

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)

      const rx = baseRadius * (1 + squish) + wobble
      const ry = baseRadius * (1 - squish * 0.5) - wobble * 0.5

      // Outer glow - mais transparente para parecer gota de água
      const outerGlow = ctx.createRadialGradient(0, 0, rx * 0.8, 0, 0, rx * 2.5)
      outerGlow.addColorStop(0, "rgba(100, 200, 255, 0.05)")
      outerGlow.addColorStop(1, "rgba(100, 200, 255, 0)")
      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.ellipse(0, 0, rx * 2.5, ry * 2.5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Main water body - circular droplet
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)

      // Water gradient - gota mais transparente, aspecto de água real
      const waterGrad = ctx.createRadialGradient(
        -rx * 0.3, -ry * 0.3, rx * 0.1,
        0, 0, rx
      )
      waterGrad.addColorStop(0, "rgba(180, 230, 255, 0.35)")
      waterGrad.addColorStop(0.3, "rgba(100, 190, 240, 0.28)")
      waterGrad.addColorStop(0.6, "rgba(50, 140, 210, 0.24)")
      waterGrad.addColorStop(0.85, "rgba(30, 100, 180, 0.3)")
      waterGrad.addColorStop(1, "rgba(20, 70, 150, 0.32)")
      ctx.fillStyle = waterGrad
      ctx.fill()

      // Borda sutil - mais transparente
      ctx.strokeStyle = "rgba(160, 220, 255, 0.2)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Inner reflection - bottom right (refracted light)
      ctx.beginPath()
      ctx.ellipse(rx * 0.15, ry * 0.2, rx * 0.6, ry * 0.5, Math.PI * 0.2, 0, Math.PI * 2)
      const innerGrad = ctx.createRadialGradient(
        rx * 0.15, ry * 0.2, 0,
        rx * 0.15, ry * 0.2, rx * 0.55
      )
      innerGrad.addColorStop(0, "rgba(40, 120, 200, 0.1)")
      innerGrad.addColorStop(1, "rgba(40, 120, 200, 0)")
      ctx.fillStyle = innerGrad
      ctx.fill()

      // Main specular highlight (top-left bright spot)
      ctx.beginPath()
      ctx.ellipse(-rx * 0.28, -ry * 0.3, rx * 0.32, ry * 0.22, -Math.PI * 0.15, 0, Math.PI * 2)
      const specGrad = ctx.createRadialGradient(
        -rx * 0.28, -ry * 0.3, 0,
        -rx * 0.28, -ry * 0.3, rx * 0.32
      )
      specGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)")
      specGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
      specGrad.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = specGrad
      ctx.fill()

      // Small sharp highlight dot
      ctx.beginPath()
      ctx.ellipse(-rx * 0.2, -ry * 0.35, rx * 0.08, ry * 0.06, -Math.PI * 0.1, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
      ctx.fill()

      // Secondary highlight (bottom-right, softer)
      ctx.beginPath()
      ctx.ellipse(rx * 0.25, ry * 0.3, rx * 0.15, ry * 0.08, Math.PI * 0.3, 0, Math.PI * 2)
      const secHighlight = ctx.createRadialGradient(
        rx * 0.25, ry * 0.3, 0,
        rx * 0.25, ry * 0.3, rx * 0.15
      )
      secHighlight.addColorStop(0, "rgba(200, 240, 255, 0.25)")
      secHighlight.addColorStop(1, "rgba(200, 240, 255, 0)")
      ctx.fillStyle = secHighlight
      ctx.fill()

      // Caustic rim light at the edge
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
      const rimGrad = ctx.createRadialGradient(
        rx * 0.3, ry * 0.3, rx * 0.6,
        0, 0, rx
      )
      rimGrad.addColorStop(0, "rgba(100, 200, 255, 0)")
      rimGrad.addColorStop(0.85, "rgba(100, 200, 255, 0)")
      rimGrad.addColorStop(0.95, "rgba(140, 220, 255, 0.14)")
      rimGrad.addColorStop(1, "rgba(180, 240, 255, 0.07)")
      ctx.fillStyle = rimGrad
      ctx.fill()

      ctx.restore()

      animId = requestAnimationFrame(drawWaterDrop)
    }

    animId = requestAnimationFrame(drawWaterDrop)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      cancelAnimationFrame(animId)
    }
  }, [])

  if (!showCursor) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  )
}
