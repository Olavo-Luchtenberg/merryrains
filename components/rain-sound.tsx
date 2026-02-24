"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface RainSoundProps {
  autoStart?: boolean
  visible?: boolean
}

export function RainSound({ autoStart = false, visible = true }: RainSoundProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<{
    brown: AudioBufferSourceNode | null
    brownGain: GainNode | null
    pink: AudioBufferSourceNode | null
    pinkGain: GainNode | null
    masterGain: GainNode | null
    filter: BiquadFilterNode | null
  }>({
    brown: null,
    brownGain: null,
    pink: null,
    pinkGain: null,
    masterGain: null,
    filter: null,
  })
  const thunderIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const thunderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showControls, setShowControls] = useState(false)

  const playThunder = useCallback(() => {
    const ctx = audioContextRef.current
    if (!ctx) return

    const now = ctx.currentTime
    const duration = 5 + Math.random() * 3
    const intensity = 0.7 + Math.random() * 0.4
    const vol = Math.max(0.5, volume) * intensity
    const sr = ctx.sampleRate

    // Trovão real = rumble grave com ATAQUE LENTO (não batida) e decay longo
    // Brown noise filtrado em sub-grave, envelope suave
    const numSamples = Math.ceil(sr * duration)
    const buffer = ctx.createBuffer(2, numSamples, sr)
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      let last = 0
      for (let i = 0; i < numSamples; i++) {
        const t = i / sr
        const white = Math.random() * 2 - 1
        last = (last + 0.02 * white) / 1.02
        data[i] = last * 2.5
      }
      // Envelope: ataque lento (0.6s), pico, decay longo
      const attackSamples = Math.floor(sr * 0.6)
      const decayStart = Math.floor(sr * 1.2)
      for (let i = 0; i < numSamples; i++) {
        let env = 1
        if (i < attackSamples) {
          env = (i / attackSamples) * (i / attackSamples)
        } else if (i > decayStart) {
          const decayT = (i - decayStart) / sr
          env = Math.exp(-decayT * 0.35)
        }
        data[i] *= env
      }
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = "lowpass"
    lowpass.frequency.value = 55 + Math.random() * 25
    lowpass.Q.value = 0.5
    const gainNode = ctx.createGain()
    gainNode.gain.value = 0
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(vol * 0.7, now + 0.5)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)
    source.connect(lowpass)
    lowpass.connect(gainNode)
    gainNode.connect(ctx.destination)
    source.start(now)
    source.stop(now + duration)

    // Segunda camada mais grave (roll) com leve atraso – som de “rolar”
    const rollDuration = 4 + Math.random() * 2
    const rollSamples = Math.ceil(sr * rollDuration)
    const rollBuffer = ctx.createBuffer(2, rollSamples, sr)
    for (let ch = 0; ch < 2; ch++) {
      const data = rollBuffer.getChannelData(ch)
      let last = 0
      for (let i = 0; i < rollSamples; i++) {
        const white = Math.random() * 2 - 1
        last = (last + 0.015 * white) / 1.015
        data[i] = last * 2
      }
      const rollDecayStart = Math.floor(sr * 0.8)
      for (let i = 0; i < rollSamples; i++) {
        let env = i < rollDecayStart ? (i / rollDecayStart) * 0.8 : 0.8 * Math.exp(-(i - rollDecayStart) / (sr * 1.2))
        data[i] *= env
      }
    }
    const rollSource = ctx.createBufferSource()
    rollSource.buffer = rollBuffer
    const rollLowpass = ctx.createBiquadFilter()
    rollLowpass.type = "lowpass"
    rollLowpass.frequency.value = 35
    rollLowpass.Q.value = 0.4
    const rollGain = ctx.createGain()
    rollGain.gain.setValueAtTime(0, now)
    rollGain.gain.linearRampToValueAtTime(vol * 0.4, now + 0.7)
    rollGain.gain.exponentialRampToValueAtTime(0.001, now + rollDuration)
    rollSource.connect(rollLowpass)
    rollLowpass.connect(rollGain)
    rollGain.connect(ctx.destination)
    rollSource.start(now + 0.15)
    rollSource.stop(now + rollDuration)
  }, [volume])

  const scheduleThunder = useCallback(() => {
    if (thunderIntervalRef.current) clearInterval(thunderIntervalRef.current)
    if (thunderTimeoutRef.current) clearTimeout(thunderTimeoutRef.current)
    // Primeiro trovão entre 4 e 7 segundos
    const firstDelay = 4000 + Math.random() * 3000
    thunderTimeoutRef.current = setTimeout(() => {
      thunderTimeoutRef.current = null
      playThunder()
      // Próximos trovões a cada 10–22 segundos
      thunderIntervalRef.current = setInterval(() => {
        if (!audioContextRef.current) return
        playThunder()
      }, 10000 + Math.random() * 12000)
    }, firstDelay)
  }, [playThunder])

  const createRainNoise = useCallback(() => {
    const ctx = new AudioContext()
    audioContextRef.current = ctx
    const sampleRate = ctx.sampleRate
    const duration = 4

    // Brown noise – base da chuva (mais realista)
    const brownBuffer = ctx.createBuffer(2, sampleRate * duration, sampleRate)
    for (let channel = 0; channel < 2; channel++) {
      const data = brownBuffer.getChannelData(channel)
      let lastOut = 0
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1
        data[i] = (lastOut + 0.025 * white) / 1.02
        lastOut = data[i]
        data[i] *= 3.2
      }
    }

    // Pink noise – gotas/textura
    const pinkBuffer = ctx.createBuffer(2, sampleRate * duration, sampleRate)
    for (let channel = 0; channel < 2; channel++) {
      const data = pinkBuffer.getChannelData(channel)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.969 * b2 + white * 0.153852
        b3 = 0.8665 * b3 + white * 0.3104856
        b4 = 0.55 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.016898
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
        data[i] *= 0.13
        b6 = white * 0.115926
      }
    }

    const masterGain = ctx.createGain()
    masterGain.gain.value = volume
    masterGain.connect(ctx.destination)

    const filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 600
    filter.Q.value = 0.35
    filter.connect(masterGain)

    const highShelf = ctx.createBiquadFilter()
    highShelf.type = "highshelf"
    highShelf.frequency.value = 2500
    highShelf.gain.value = 3.5
    highShelf.connect(filter)

    const brownSource = ctx.createBufferSource()
    brownSource.buffer = brownBuffer
    brownSource.loop = true
    const brownGain = ctx.createGain()
    brownGain.gain.value = 0.65
    brownSource.connect(brownGain)
    brownGain.connect(highShelf)
    brownSource.start()

    const pinkSource = ctx.createBufferSource()
    pinkSource.buffer = pinkBuffer
    pinkSource.loop = true
    const pinkGain = ctx.createGain()
    pinkGain.gain.value = 0.85
    pinkSource.connect(pinkGain)
    pinkGain.connect(highShelf)
    pinkSource.start()

    nodesRef.current = {
      brown: brownSource,
      brownGain,
      pink: pinkSource,
      pinkGain,
      masterGain,
      filter,
    }
  }, [volume])

  const toggleSound = useCallback(() => {
    if (isPlaying) {
      if (thunderIntervalRef.current) {
        clearInterval(thunderIntervalRef.current)
        thunderIntervalRef.current = null
      }
      if (thunderTimeoutRef.current) {
        clearTimeout(thunderTimeoutRef.current)
        thunderTimeoutRef.current = null
      }
      const gain = nodesRef.current.masterGain
      if (gain && audioContextRef.current) {
        gain.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 0.5
        )
        setTimeout(() => {
          nodesRef.current.brown?.stop()
          nodesRef.current.pink?.stop()
          audioContextRef.current?.close()
          audioContextRef.current = null
        }, 600)
      }
      setIsPlaying(false)
    } else {
      createRainNoise()
      setIsPlaying(true)
      scheduleThunder()
    }
  }, [isPlaying, createRainNoise, scheduleThunder])

  useEffect(() => {
    if (nodesRef.current.masterGain) {
      nodesRef.current.masterGain.gain.value = volume
    }
  }, [volume])

  const hasAutoStarted = useRef(false)
  useEffect(() => {
    if (autoStart && !hasAutoStarted.current) {
      hasAutoStarted.current = true
      createRainNoise()
      setIsPlaying(true)
      scheduleThunder()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart])

  useEffect(() => {
    return () => {
      if (thunderIntervalRef.current) clearInterval(thunderIntervalRef.current)
      if (thunderTimeoutRef.current) clearTimeout(thunderTimeoutRef.current)
      nodesRef.current.brown?.stop()
      nodesRef.current.pink?.stop()
      audioContextRef.current?.close()
    }
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div
        className={`flex items-center gap-2 rounded-full bg-secondary/80 backdrop-blur-md px-4 py-2 border border-border/50 transition-all duration-300 ${
          showControls && isPlaying
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground shrink-0"
        >
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 h-1 accent-primary cursor-pointer"
          aria-label="Volume da chuva"
        />
      </div>

      <button
        onClick={toggleSound}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer ${
          isPlaying
            ? "bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            : "bg-secondary/80 border-border/50 hover:border-primary/30"
        }`}
        aria-label={isPlaying ? "Pausar som de chuva" : "Tocar som de chuva com trovões"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-colors ${
            isPlaying ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          }`}
        >
          <path
            d="M4 14.5C4 14.5 5 18 5.5 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 12.5C9 12.5 10 16 10.5 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14 14.5C14 14.5 15 18 15.5 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19 12.5C19 12.5 20 16 20.5 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 8.5C20 5.46 16.42 3 12 3C7.58 3 4 5.46 4 8.5C4 8.5 4 10 6 10H18C20 10 20 8.5 20 8.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
        )}
      </button>
    </div>
  )
}
