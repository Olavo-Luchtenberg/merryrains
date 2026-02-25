"use client"

import { RainEffect } from "@/components/rain-effect"
import { CursorGlow } from "@/components/cursor-glow"
import { RainSound } from "@/components/rain-sound"
import { WelcomeScreen } from "@/components/welcome-screen"
import { FloatingNav } from "@/components/floating-nav"
import { HeroSection } from "@/components/hero-section"
import { SynopsisSection } from "@/components/synopsis-section"
import { DiferencialSection } from "@/components/diferencial-section"
import { AuthorSection } from "@/components/author-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { useSoundtrack } from "@/lib/soundtrack-context"

export default function Home() {
  const { hasChosen, choice } = useSoundtrack()

  return (
    <>
      <RainEffect />
      <CursorGlow />

      {/* RainSound sempre montado para poder auto-iniciar no mesmo gesto do clique em Entrar */}
      <RainSound autoStart={hasChosen && choice === "rain"} visible={hasChosen} />

      {!hasChosen ? (
        <WelcomeScreen />
      ) : (
        <>
          <FloatingNav />
          <main>
            <HeroSection />
            <SynopsisSection />
            <DiferencialSection />
            <AuthorSection />
            <FeaturesSection />
            <TestimonialsSection />
            <CtaSection />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
