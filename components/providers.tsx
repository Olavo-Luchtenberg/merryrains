"use client"

import { type ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { SoundtrackProvider } from "@/lib/soundtrack-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SoundtrackProvider>{children}</SoundtrackProvider>
    </SessionProvider>
  )
}
