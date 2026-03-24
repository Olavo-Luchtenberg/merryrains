"use client"

import { useEffect, useRef, useState, useCallback } from "react"

/**
 * Hook para scroll otimizado com throttling via requestAnimationFrame.
 * Evita múltiplos re-renders por frame e reduz travamentos no scroll.
 */
export function useThrottledScroll() {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number | null>(null)
  const tickingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true

      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        tickingRef.current = false
      })
    }

    handleScroll() // valor inicial
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return scrollY
}

/**
 * Retorna um callback que só executa durante requestAnimationFrame (throttled).
 */
export function useThrottledCallback<T extends (...args: unknown[]) => void>(
  callback: T
) {
  const rafRef = useRef<number | null>(null)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  return useCallback(
    ((...args: Parameters<T>) => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        callbackRef.current(...args)
        rafRef.current = null
      })
    }) as T,
    []
  )
}
