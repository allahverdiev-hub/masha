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

    const onReady = () => {
      if (audio.paused) void startMusic()
    }

    window.addEventListener('load', onReady)
    document.addEventListener('pointerdown', onReady, { passive: true })
    document.addEventListener('touchstart', onReady, { passive: true })
    document.addEventListener('click', onReady, { passive: true })

    return () => {
      window.removeEventListener('load', onReady)
      document.removeEventListener('pointerdown', onReady)
      document.removeEventListener('touchstart', onReady)
      document.removeEventListener('click', onReady)
      audio.pause()
      audioRef.current = null
    }
  }, [startMusic])
}
