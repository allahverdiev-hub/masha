import { useEffect, type ComponentProps, type ReactNode } from 'react'
import { motion } from 'framer-motion'

type HeartLoaderProps = {
  onComplete: () => void
}

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

/** Padding in viewBox units so scaled glow layers are not clipped by the SVG box */
const VIEW_BOX = '-8 -8 40 40'

const GLOW_LAYERS = [
  { scale: 1.45, opacity: 0.1 },
  { scale: 1.28, opacity: 0.18 },
  { scale: 1.12, opacity: 0.3 },
]

function HeartIcon({
  className,
  fill,
}: {
  className?: string
  fill: string
}) {
  return (
    <svg
      viewBox={VIEW_BOX}
      className={`block overflow-visible ${className ?? ''}`}
      style={{ overflow: 'visible' }}
      aria-hidden
    >
      {GLOW_LAYERS.map(({ scale, opacity }) => (
        <path
          key={scale}
          d={HEART_PATH}
          fill={fill}
          opacity={opacity}
          transform={`translate(12 12) scale(${scale}) translate(-12 -12)`}
        />
      ))}
      <path d={HEART_PATH} fill={fill} />
    </svg>
  )
}

function HeartSlot({
  className,
  children,
  ...motionProps
}: {
  className?: string
  children: ReactNode
} & ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className={`absolute flex items-center justify-center overflow-visible ${className ?? ''}`}
      style={{ background: 'transparent', overflow: 'visible' }}
      {...motionProps}
    >
      {children}
    </motion.div>
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
      <div className="relative flex h-40 w-full max-w-xs items-center justify-center overflow-visible">
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

        <HeartSlot
          className="h-16 w-16"
          initial={{ x: -140, opacity: 0, scale: 0.6 }}
          animate={{ x: -22, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
        >
          <HeartIcon className="h-14 w-14" fill="#ff4d8d" />
        </HeartSlot>

        <HeartSlot
          className="h-16 w-16"
          initial={{ x: 140, opacity: 0, scale: 0.6 }}
          animate={{ x: 22, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
        >
          <HeartIcon className="h-14 w-14" fill="#ff6b35" />
        </HeartSlot>

        <HeartSlot
          className="h-24 w-24"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.35, 1], opacity: [0, 1, 0.9] }}
          transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
        >
          <HeartIcon className="h-20 w-20" fill="#ffb347" />
        </HeartSlot>
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
