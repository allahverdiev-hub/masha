import { useEffect, useId } from 'react'
import { motion } from 'framer-motion'

type HeartLoaderProps = {
  onComplete: () => void
}

function GlowingHeart({
  className,
  fill,
  glow,
}: {
  className?: string
  fill: string
  glow: string
}) {
  const rawId = useId()
  const filterId = `heart-glow-${rawId.replace(/:/g, '')}`

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x="-6"
          y="-6"
          width="36"
          height="36"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.8" result="blur" />
          <feFlood floodColor={glow} floodOpacity="0.85" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feGaussianBlur in="glow" stdDeviation="3.5" result="glowBlur" />
          <feMerge>
            <feMergeNode in="glowBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={fill}
        filter={`url(#${filterId})`}
      />
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a0a12]/95">
      <div className="relative flex h-40 w-full max-w-xs items-center justify-center">
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

        <motion.div
          className="absolute"
          initial={{ x: -140, opacity: 0, scale: 0.6 }}
          animate={{ x: -22, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
        >
          <GlowingHeart
            className="h-14 w-14"
            fill="#ff4d8d"
            glow="#ff4d8d"
          />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ x: 140, opacity: 0, scale: 0.6 }}
          animate={{ x: 22, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
        >
          <GlowingHeart
            className="h-14 w-14"
            fill="#ff6b35"
            glow="#ff6b35"
          />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.35, 1], opacity: [0, 1, 0.9] }}
          transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
        >
          <GlowingHeart
            className="h-20 w-20"
            fill="#ffb347"
            glow="#ffb347"
          />
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
