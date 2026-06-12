import { useCallback, useEffect, useRef } from 'react'
import { backgroundMusic } from '../data/siteConfig'

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false

    try {
      audio.volume = backgroundMusic.volume
      await audio.play()
      return true
    } catch {
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
      if (audio.paused) void startMusic()
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
}
