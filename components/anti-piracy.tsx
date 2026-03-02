"use client"

import { useEffect } from "react"

export function AntiPiracy() {
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault()
    const preventDrag = (e: DragEvent) => e.preventDefault()
    const preventKeyboard = (e: KeyboardEvent) => {
      // Impedir impressão (Ctrl+P / Cmd+P)
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault()
      }
      // Impedir salvar página (Ctrl+S / Cmd+S)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
      }
      // Impedir print screen (opcional - nem todos os browsers suportam)
      if (e.key === "PrintScreen") {
        e.preventDefault()
      }
    }

    document.addEventListener("contextmenu", preventContextMenu)
    document.addEventListener("dragstart", preventDrag)
    document.addEventListener("keydown", preventKeyboard, true)

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu)
      document.removeEventListener("dragstart", preventDrag)
      document.removeEventListener("keydown", preventKeyboard, true)
    }
  }, [])

  return null
}
