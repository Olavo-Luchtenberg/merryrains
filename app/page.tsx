"use client"

import dynamic from "next/dynamic"
import { RainEffect } from "@/components/rain-effect"
import { RainSound } from "@/components/rain-sound"
import { WelcomeScreen } from "@/components/welcome-screen"
import { FloatingNav } from "@/components/floating-nav"
import { MusicVinyl } from "@/components/music-vinyl"
import { SplashImage } from "@/components/splash-image"
import { HeroSection } from "@/components/hero-section"
import { SynopsisSection } from "@/components/synopsis-section"
import { useSoundtrack } from "@/lib/soundtrack-context"

const DiferencialSection = dynamic(
  () => import("@/components/diferencial-section").then((m) => ({ default: m.DiferencialSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)
const AuthorSection = dynamic(
  () => import("@/components/author-section").then((m) => ({ default: m.AuthorSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)
const FeaturesSection = dynamic(
  () => import("@/components/features-section").then((m) => ({ default: m.FeaturesSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)
const CtaSection = dynamic(
  () => import("@/components/cta-section").then((m) => ({ default: m.CtaSection })),
  { ssr: true, loading: () => <SectionSkeleton /> }
)
const Footer = dynamic(
  () => import("@/components/footer").then((m) => ({ default: m.Footer })),
  { ssr: true }
)

function SectionSkeleton() {
  return <div className="min-h-[200px] w-full" aria-hidden />
}

export default function Home() {
  const { hasChosen, choice } = useSoundtrack()

  return (
    <>
      <RainEffect showSplash={hasChosen} />
      {/* RainSound sempre montado para poder auto-iniciar no mesmo gesto do clique em Entrar */}
      <RainSound autoStart={hasChosen && choice === "rain"} visible={hasChosen} />

      {!hasChosen ? (
        <WelcomeScreen />
      ) : (
        <>
          <MusicVinyl />
          <FloatingNav />
          <main>
            <SplashImage />
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
