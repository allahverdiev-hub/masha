import { useEffect } from 'react'
import { motion } from 'framer-motion'

type HeartLoaderProps = {
  onComplete: () => void
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function HeartLoader({ onComplete }: HeartLoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3200)
    return () => clearTimeout(timer)
  }, [onComplete])

  useEffect(() => {
    try {
      navigator.vibrate?.([30, 50, 80])
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a0a12]/95 backdrop-blur-md">
      <div className="relative flex h-40 w-full max-w-xs items-center justify-center">
        {/* Dual loader bars */}
        <motion.div
          className="absolute left-0 h-1 rounded-full gradient-mamba"
          initial={{ width: 0, x: 0 }}
          animate={{ width: '45%', x: '5%' }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.div
          className="absolute right-0 h-1 rounded-full gradient-mamba"
          initial={{ width: 0, x: 0 }}
          animate={{ width: '45%', x: '-5%' }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* Left heart */}
        <motion.div
          className="absolute text-[#ff4d8d]"
          initial={{ x: -140, opacity: 0, scale: 0.6 }}
          animate={{ x: -22, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
        >
          <HeartIcon className="h-14 w-14 drop-shadow-[0_0_12px_rgba(255,77,141,0.8)]" />
        </motion.div>

        {/* Right heart */}
        <motion.div
          className="absolute text-[#ff6b35]"
          initial={{ x: 140, opacity: 0, scale: 0.6 }}
          animate={{ x: 22, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
        >
          <HeartIcon className="h-14 w-14 drop-shadow-[0_0_12px_rgba(255,107,53,0.8)]" />
        </motion.div>

        {/* Merge flash */}
        <motion.div
          className="absolute text-[#ffb347]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.9] }}
          transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
        >
          <HeartIcon className="h-20 w-20 drop-shadow-[0_0_24px_rgba(255,179,71,0.9)]" />
        </motion.div>
      </div>

      <motion.p
        className="mt-10 text-lg font-medium text-white/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Соединяем сердца...
      </motion.p>
    </div>
  )
}
