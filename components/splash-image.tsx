"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

const Book3DModel = dynamic(() => import("./book-3d-model").then((m) => m.Book3DModel), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[4/5] min-h-[240px] sm:min-h-[280px] flex items-center justify-center bg-transparent" />
  ),
})

const SPLASH_IMAGE = encodeURI("/Design sem nome (26).png")

export function SplashImage() {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center bg-black pt-[max(0px,calc((100vh-56.25vw)/2))] pb-12 sm:pb-16 z-0"
      aria-label="Merry Rains - Bem-vindo"
    >
      {/* Área 16:9 igual à hitbox da chuva (object-contain no viewport) - guarda-chuva em tamanho original */}
      <div
        className="relative flex-shrink-0 bg-black"
        style={{
          width: "min(100vw, 177.78vh)",
          height: "min(100vh, 56.25vw)",
        }}
      >
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
      <div className="relative w-full flex flex-col items-center flex-1 p-4 sm:p-6 pt-8 sm:pt-10 gap-4 sm:gap-6 justify-center">
        {/* Indicador de scroll - entre guarda-chuva e livro */}
        <div
          className="flex flex-col items-center gap-2 animate-bounce text-white/60 flex-shrink-0"
          aria-hidden
        >
          <span className="text-xs font-sans uppercase tracking-widest">Role para continuar</span>
          <ChevronDown className="w-6 h-6" strokeWidth={2} />
        </div>
        {/* Livro 3D - abaixo da mensagem de scroll */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex-shrink-0">
          <Book3DModel />
        </div>
      </div>
    </section>
  )
}
