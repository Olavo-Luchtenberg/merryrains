"use client"

import { type ReactNode } from "react"
import { SoundtrackProvider } from "@/lib/soundtrack-context"

export function Providers({ children }: { children: ReactNode }) {
  return <SoundtrackProvider>{children}</SoundtrackProvider>
}
