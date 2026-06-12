import { useCallback, useEffect, useState } from 'react'

export type Phase = 'swipe' | 'reveal' | 'transition' | 'memories'

const STORAGE_KEY = 'mamba-surprise-phase'

function readStoredPhase(): Phase | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored === 'memories') return 'memories'
  } catch {
    /* ignore */
  }
  return null
}

export function useAppPhase() {
  const [phase, setPhase] = useState<Phase>(() => readStoredPhase() ?? 'swipe')

  useEffect(() => {
    if (phase === 'memories') {
      document.documentElement.classList.add('memories-mode')
      document.body.classList.add('memories-mode')
      try {
        sessionStorage.setItem(STORAGE_KEY, 'memories')
      } catch {
        /* ignore */
      }
    } else {
      document.documentElement.classList.remove('memories-mode')
      document.body.classList.remove('memories-mode')
    }
  }, [phase])

  const goToReveal = useCallback(() => setPhase('reveal'), [])
  const goToTransition = useCallback(() => setPhase('transition'), [])
  const goToMemories = useCallback(() => setPhase('memories'), [])

  return { phase, goToReveal, goToTransition, goToMemories }
}
