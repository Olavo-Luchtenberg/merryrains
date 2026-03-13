"use client"

import { useEffect } from "react"

export function AntiPiracy() {
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault()
    const preventDrag = (e: DragEvent) => e.preventDefault()

    const preventKeyboard = (e: KeyboardEvent) => {
      // Impedir F12
      if (e.keyCode === 123) {
        e.preventDefault()
        return false
      }
      // Impedir Ctrl+Shift+I (Inspecionar)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        return false
      }
      // Impedir Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault()
        return false
      }
      // Impedir Ctrl+Shift+C (Selecionar elemento)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault()
        return false
      }
      // Impedir Ctrl+U (Ver código fonte)
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
      // Impedir Ctrl+A (Selecionar tudo)
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 65) {
        e.preventDefault()
        return false
      }
      // Impedir Ctrl+X (Recortar)
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 88) {
        e.preventDefault()
        return false
      }
      // Impedir impressão (Ctrl+P / Cmd+P)
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault()
      }
      // Impedir salvar página (Ctrl+S / Cmd+S)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
      }
      // Impedir Win+Shift+S (atalho Windows para captura) - o Windows pode interceptar antes
      if (e.shiftKey && e.key?.toLowerCase() === "s" && (e.metaKey || e.code === "MetaLeft" || e.code === "MetaRight")) {
        e.preventDefault()
      }
      // Impedir Print Screen
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault()
      }
    }

    // Handler para PrintScreen (limpa clipboard e alerta)
    const handlePrintScreen = async (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        try {
          await navigator.clipboard.writeText("")
        } catch {
          // Clipboard pode estar bloqueado
        }
        alert("Capturas de tela não são permitidas neste site.")
      }
    }

    // Anti-debugger: trava enquanto o DevTools estiver aberto
    const debuggerInterval =
      process.env.NODE_ENV === "production"
        ? setInterval(() => {
            // eslint-disable-next-line no-debugger
            debugger
          }, 100)
        : null

    document.addEventListener("contextmenu", preventContextMenu)
    document.addEventListener("dragstart", preventDrag)
    document.addEventListener("keydown", preventKeyboard, true)
    document.addEventListener("keyup", handlePrintScreen)

    return () => {
      if (debuggerInterval) clearInterval(debuggerInterval)
      document.removeEventListener("contextmenu", preventContextMenu)
      document.removeEventListener("dragstart", preventDrag)
      document.removeEventListener("keydown", preventKeyboard, true)
      document.removeEventListener("keyup", handlePrintScreen)
    }
  }, [])

  return null
}
