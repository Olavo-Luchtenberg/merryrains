"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "scale"
}

export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )

    const current = ref.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)"
    switch (direction) {
      case "up":
        return "translate3d(0, 60px, 0) scale(1)"
      case "left":
        return "translate3d(-60px, 0, 0) scale(1)"
      case "right":
        return "translate3d(60px, 0, 0) scale(1)"
      case "scale":
        return "translate3d(0, 30px, 0) scale(0.95)"
      default:
        return "translate3d(0, 60px, 0) scale(1)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  )
}
