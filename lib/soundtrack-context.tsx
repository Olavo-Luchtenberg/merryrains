"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export type SoundtrackChoice = "rain" | "silence" | null

const STORAGE_KEY = "merry-rains-welcome"

interface SoundtrackContextType {
  choice: SoundtrackChoice
  setChoice: (c: SoundtrackChoice) => void
  hasChosen: boolean
  setHasChosen: (v: boolean, choiceOverride?: SoundtrackChoice) => void
}

const SoundtrackContext = createContext<SoundtrackContextType | null>(null)

export function SoundtrackProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<SoundtrackChoice>(null)
  const [hasChosen, setHasChosenState] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const { choice: c } = JSON.parse(stored) as { choice?: SoundtrackChoice }
        if (c) setChoiceState(c)
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  const setChoice = useCallback((c: SoundtrackChoice) => {
    setChoiceState(c)
  }, [])

  const setHasChosen = useCallback((h: boolean, choiceOverride?: SoundtrackChoice) => {
    setHasChosenState(h)
    setChoiceState((prev) => {
      const c = choiceOverride ?? prev
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: c }))
      } catch {
        // ignore
      }
      return c ?? prev
    })
  }, [])

  return (
    <SoundtrackContext.Provider
      value={{
        choice,
        setChoice,
        hasChosen: hydrated ? hasChosen : false,
        setHasChosen,
      }}
    >
      {children}
    </SoundtrackContext.Provider>
  )
}

export function useSoundtrack() {
  const ctx = useContext(SoundtrackContext)
  if (!ctx) throw new Error("useSoundtrack must be used within SoundtrackProvider")
  return ctx
}
