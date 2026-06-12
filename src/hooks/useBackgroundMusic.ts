import { useCallback, useEffect, useRef } from 'react'
import { backgroundMusic } from '../data/siteConfig'

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const unmutedRef = useRef(false)

  const tryPlay = useCallback(async (unmute = false) => {
    const audio = audioRef.current
    if (!audio) return false

    if (unmute) {
      audio.muted = false
      unmutedRef.current = true
    }

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
    audio.muted = true
    audioRef.current = audio

    audio.load()

    const onCanPlay = () => {
      if (!unmutedRef.current) void tryPlay(false)
    }

    audio.addEventListener('canplaythrough', onCanPlay)

    void tryPlay(false)

    const onInteract = () => {
      void tryPlay(true)
    }

    window.addEventListener('load', onCanPlay)
    document.addEventListener('pointerdown', onInteract, { passive: true })
    document.addEventListener('touchstart', onInteract, { passive: true })
    document.addEventListener('click', onInteract, { passive: true })

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay)
      window.removeEventListener('load', onCanPlay)
      document.removeEventListener('pointerdown', onInteract)
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('click', onInteract)
      audio.pause()
      audioRef.current = null
    }
  }, [tryPlay])
}
