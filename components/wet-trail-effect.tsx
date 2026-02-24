"use client"

import { useEffect, useRef, useState } from "react"

/** Efeito de textura molhada onde o cursor passou - o texto fica com aspecto de
 * papel molhado (escurece como água absorvida), sem partículas ou gotas visíveis.
 * A mancha seca (some) em ~6s. */
function useShouldShow() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const check = () => {
      const fine = window.matchMedia("(pointer: fine)").matches
      const hover = window.matchMedia("(hover: hover)").matches
      setShow(fine || hover)
    }
    check()
    const m1 = window.matchMedia("(pointer: fine)")
    const m2 = window.matchMedia("(hover: hover)")
    m1.addEventListener("change", check)
    m2.addEventListener("change", check)
    return () => {
      m1.removeEventListener("change", check)
      m2.removeEventListener("change", check)
    }
  }, [])
  return show
}

export function WetTrailEffect() {
  const shouldShow = useShouldShow()
  const spotsRef = useRef<Array<{ id: number; x: number; y: number; el: HTMLDivElement }>>([])
  const lastSpotRef = useRef({ time: 0, x: -999, y: -999 })
  const idRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!shouldShow) return

    const THROTTLE_MS = 50
    const MIN_DISTANCE = 6
    const DRY_MS = 6000
    const MAX_SPOTS = 30
    const CURSOR_SIZE = 16

    const tryAddStain = (clientX: number, clientY: number) => {
      const now = Date.now()
      const { time, x: lastX, y: lastY } = lastSpotRef.current

      if (now - time < THROTTLE_MS) return

      const dx = clientX - lastX
      const dy = clientY - lastY
      if (Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE) return

      const el = document.elementFromPoint(clientX, clientY)
      if (!el) return

      const hasText = (el.textContent?.trim().length ?? 0) > 0
      const isInteractive = el.closest("a, button, [role='button']")
      if (!hasText && !isInteractive) return

      lastSpotRef.current = { time: now, x: clientX, y: clientY }
      const container = containerRef.current
      if (!container) return

      const stain = document.createElement("div")
      stain.className = "wet-stain"
      stain.setAttribute("aria-hidden", "true")
      stain.style.cssText = `
        position: fixed;
        left: ${clientX}px;
        top: ${clientY}px;
        width: ${CURSOR_SIZE * 2}px;
        height: ${CURSOR_SIZE * 2}px;
        margin-left: -${CURSOR_SIZE}px;
        margin-top: -${CURSOR_SIZE}px;
        border-radius: 50%;
        background: radial-gradient(
          circle at 50% 50%,
          rgba(0, 0, 0, 0.38) 0%,
          rgba(0, 0, 0, 0.24) 40%,
          rgba(0, 0, 0, 0.1) 65%,
          transparent 88%
        );
        filter: blur(2px);
        mix-blend-mode: multiply;
        pointer-events: none;
        z-index: 99;
        will-change: opacity;
        backface-visibility: hidden;
        animation: wet-spot-dry ${DRY_MS}ms ease-out forwards;
      `

      container.appendChild(stain)
      spotsRef.current.push({ id: ++idRef.current, x: clientX, y: clientY, el: stain })

      if (spotsRef.current.length > MAX_SPOTS) {
        const oldest = spotsRef.current.shift()
        if (oldest?.el.parentNode) oldest.el.remove()
      }

      setTimeout(() => {
        stain.remove()
        spotsRef.current = spotsRef.current.filter((s) => s.el !== stain)
      }, DRY_MS)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const x = e.clientX
      const y = e.clientY
      rafRef.current = requestAnimationFrame(() => tryAddStain(x, y))
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [shouldShow])

  if (!shouldShow) return null

  return (
    <div
      ref={containerRef}
      className="wet-spots-container pointer-events-none fixed inset-0 z-[98] isolate"
      aria-hidden="true"
    />
  )
}
