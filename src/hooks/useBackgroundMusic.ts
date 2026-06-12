import { useCallback, useEffect, useRef, useState } from 'react'
import { backgroundMusic } from '../data/siteConfig'

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mutedRef = useRef(false)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)

  const startMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || mutedRef.current) return false

    try {
      audio.volume = backgroundMusic.volume
      await audio.play()
      setPlaying(true)
      return true
    } catch {
      setPlaying(false)
      return false
    }
  }, [])

  useEffect(() => {
    const audio = new Audio(backgroundMusic.src)
    audio.loop = true
    audio.volume = backgroundMusic.volume
    audio.preload = 'auto'
    audioRef.current = audio

    void startMusic()

    const retryOnInteraction = () => {
      if (audio.paused && !mutedRef.current) void startMusic()
    }

    window.addEventListener('pointerdown', retryOnInteraction)
    window.addEventListener('touchstart', retryOnInteraction)

    return () => {
      window.removeEventListener('pointerdown', retryOnInteraction)
      window.removeEventListener('touchstart', retryOnInteraction)
      audio.pause()
      audioRef.current = null
    }
  }, [startMusic])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    setMuted((prev) => {
      const next = !prev
      mutedRef.current = next
      if (next) {
        audio.pause()
        setPlaying(false)
      } else {
        void startMusic()
      }
      return next
    })
  }, [startMusic])

  return { muted, playing, toggleMute }
}
