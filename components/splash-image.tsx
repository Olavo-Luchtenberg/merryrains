"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

const SPLASH_IMAGE = encodeURI("/Design sem nome (26).png")

export function SplashImage() {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black"
      aria-label="Merry Rains - Bem-vindo"
    >
      <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 sm:p-6">
        <Image
          src={SPLASH_IMAGE}
          alt="Merry Rains"
          fill
          className="object-contain object-center"
          priority
          sizes="100vw"
          unoptimized
        />
      </div>
      {/* Indicador de scroll */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-white/60"
        style={{ bottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))" }}
        aria-hidden
      >
        <span className="text-xs font-sans uppercase tracking-widest">Role para continuar</span>
        <ChevronDown className="w-6 h-6" strokeWidth={2} />
      </div>
    </section>
  )
}
