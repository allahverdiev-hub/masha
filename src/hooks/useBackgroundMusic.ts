import { useCallback, useEffect, useRef, useState } from 'react'
import { backgroundMusic } from '../data/siteConfig'

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio(backgroundMusic.src)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    audioRef.current = audio

    const onCanPlay = () => setReady(true)
    audio.addEventListener('canplaythrough', onCanPlay)

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const fadeIn = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || startedRef.current || muted) return

    try {
      await audio.play()
      startedRef.current = true
      const target = backgroundMusic.volume
      const steps = 20
      for (let i = 1; i <= steps; i++) {
        audio.volume = (target * i) / steps
        await new Promise((r) => setTimeout(r, 40))
      }
    } catch {
      startedRef.current = false
    }
  }, [muted])

  useEffect(() => {
    const startOnInteraction = () => {
      void fadeIn()
    }

    window.addEventListener('pointerdown', startOnInteraction, { once: true })
    window.addEventListener('touchstart', startOnInteraction, { once: true })
    window.addEventListener('wheel', startOnInteraction, { once: true })

    return () => {
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('touchstart', startOnInteraction)
      window.removeEventListener('wheel', startOnInteraction)
    }
  }, [fadeIn])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    setMuted((prev) => {
      const next = !prev
      if (next) {
        audio.volume = 0
        audio.pause()
        startedRef.current = false
      } else {
        startedRef.current = false
        void fadeIn()
      }
      return next
    })
  }, [fadeIn])

  return { muted, toggleMute, ready }
}
