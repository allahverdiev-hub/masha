import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProfileCard } from '../../components/ProfileCard'
import { getHerProfile } from '../../components/SwipeStack'
import { profiles } from '../../data/profiles'

type RevealPhaseProps = {
  onContinue: () => void
}

export function RevealPhase({ onContinue }: RevealPhaseProps) {
  const her = getHerProfile(profiles)

  useEffect(() => {
    try {
      navigator.vibrate?.(50)
    } catch {
      /* ignore */
    }

    const timer = setTimeout(onContinue, 2200)
    return () => clearTimeout(timer)
  }, [onContinue])

  if (!her) return null

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col bg-gradient-to-b from-[#2a1020] via-[#1a0a12] to-[#0d0610] safe-top safe-bottom safe-x"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onContinue}
    >
      <header className="flex shrink-0 items-center justify-center px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl font-extrabold tracking-tight gradient-text">Mamba</h1>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 px-4 pb-4 pt-2">
        <motion.div
          className="mx-auto h-full max-w-sm"
          initial={{ scale: 0.92 }}
          animate={{ scale: [0.92, 1.03, 1] }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <ProfileCard profile={her} glow />
        </motion.div>
      </div>

      <motion.div
        className="shrink-0 px-6 pb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="font-display text-3xl font-bold gradient-text">Нашёл тебя</p>
        <p className="mt-2 text-sm text-white/60">Это ты — та самая ✨</p>
      </motion.div>
    </motion.div>
  )
}
