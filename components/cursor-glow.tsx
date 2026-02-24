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

      const ease = 0.14
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * ease
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * ease

      velocity.current.x = mouse.current.x - prevMouse.current.x
      velocity.current.y = mouse.current.y - prevMouse.current.y
      prevMouse.current = { ...mouse.current }

      const cx = smoothMouse.current.x
      const cy = smoothMouse.current.y
      const baseRadius = hoveringRef.current ? 20 : 14
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      const squish = Math.min(speed * 0.012, 0.15)
      const angle = Math.atan2(velocity.current.y, velocity.current.x)
      const wobble = Math.sin(time * 0.003) * 0.3

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)

      const rx = baseRadius * (1 + squish) + wobble
      const ry = baseRadius * (1 - squish * 0.4) - wobble * 0.3

      // 1) Corpo principal – gota escura azul-cinza, translúcida (como na referência)
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
      const bodyGrad = ctx.createRadialGradient(
        -rx * 0.2, -ry * 0.25, 0,
        0, 0, rx * 1.1
      )
      bodyGrad.addColorStop(0, "rgba(120, 160, 200, 0.5)")
      bodyGrad.addColorStop(0.35, "rgba(60, 100, 140, 0.45)")
      bodyGrad.addColorStop(0.7, "rgba(30, 60, 95, 0.5)")
      bodyGrad.addColorStop(1, "rgba(15, 35, 65, 0.55)")
      ctx.fillStyle = bodyGrad
      ctx.fill()

      // 2) Destaque principal – mancha branca forte no topo (luz direta)
      ctx.beginPath()
      ctx.ellipse(-rx * 0.22, -ry * 0.32, rx * 0.28, ry * 0.2, -Math.PI * 0.12, 0, Math.PI * 2)
      const mainSpec = ctx.createRadialGradient(
        -rx * 0.22, -ry * 0.32, 0,
        -rx * 0.22, -ry * 0.32, rx * 0.28
      )
      mainSpec.addColorStop(0, "rgba(255, 255, 255, 0.95)")
      mainSpec.addColorStop(0.4, "rgba(255, 255, 255, 0.4)")
      mainSpec.addColorStop(0.75, "rgba(220, 235, 255, 0.08)")
      mainSpec.addColorStop(1, "rgba(200, 220, 255, 0)")
      ctx.fillStyle = mainSpec
      ctx.fill()

      // 3) Ponto de brilho forte (reflexo mais seco)
      ctx.beginPath()
      ctx.ellipse(-rx * 0.18, -ry * 0.38, rx * 0.06, ry * 0.05, -Math.PI * 0.1, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fill()

      // 4) Segundo destaque – alongado e suave (abaixo do principal)
      ctx.beginPath()
      ctx.ellipse(rx * 0.2, ry * 0.25, rx * 0.35, ry * 0.12, Math.PI * 0.25, 0, Math.PI * 2)
      const secSpec = ctx.createRadialGradient(
        rx * 0.2, ry * 0.25, 0,
        rx * 0.2, ry * 0.25, rx * 0.35
      )
      secSpec.addColorStop(0, "rgba(255, 255, 255, 0.35)")
      secSpec.addColorStop(0.5, "rgba(240, 248, 255, 0.12)")
      secSpec.addColorStop(1, "rgba(220, 235, 255, 0)")
      ctx.fillStyle = secSpec
      ctx.fill()

      // 5) Reflexo interno (luz refratada – canto inferior)
      ctx.beginPath()
      ctx.ellipse(rx * 0.18, ry * 0.28, rx * 0.5, ry * 0.4, Math.PI * 0.22, 0, Math.PI * 2)
      const innerRef = ctx.createRadialGradient(
        rx * 0.18, ry * 0.28, 0,
        rx * 0.18, ry * 0.28, rx * 0.5
      )
      innerRef.addColorStop(0, "rgba(180, 210, 255, 0.2)")
      innerRef.addColorStop(0.6, "rgba(100, 140, 200, 0.06)")
      innerRef.addColorStop(1, "rgba(60, 90, 140, 0)")
      ctx.fillStyle = innerRef
      ctx.fill()

      // 6) Borda – linha de luz na beirada (caustic/rim)
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
      const rimGrad = ctx.createRadialGradient(
        rx * 0.35, ry * 0.35, rx * 0.4,
        0, 0, rx
      )
      rimGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
      rimGrad.addColorStop(0.7, "rgba(200, 220, 255, 0)")
      rimGrad.addColorStop(0.92, "rgba(255, 255, 255, 0.25)")
      rimGrad.addColorStop(1, "rgba(255, 255, 255, 0.4)")
      ctx.fillStyle = rimGrad
      ctx.fill()

      // 7) Contorno sutil da gota (define a borda)
      ctx.strokeStyle = "rgba(80, 120, 180, 0.35)"
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
      ctx.stroke()

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
