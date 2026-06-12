import { useCallback, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import type { GallerySection } from '../../data/memories'

const SWIPE_THRESHOLD = 80

type PhotoSwipeGalleryProps = {
  section: GallerySection
}

export function PhotoSwipeGallery({ section }: PhotoSwipeGalleryProps) {
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18])

  const total = section.photos.length
  const current = section.photos[index]
  const next = section.photos[index + 1]
  const isLast = index === total - 1

  useEffect(() => {
    const preload = section.photos[index + 1] ?? section.photos[index - 1]
    if (preload) {
      const img = new Image()
      img.src = preload.src
    }
  }, [index, section.photos])

  const flyOut = useCallback(
    async (direction: 'left' | 'right') => {
      if (exiting || !current) return

      if (direction === 'right' && index <= 0) {
        animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
        return
      }
      if (direction === 'left' && index >= total - 1) {
        animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
        return
      }

      setExiting(true)
      const targetX = direction === 'right' ? 500 : -500
      await animate(x, targetX, { duration: 0.35, ease: 'easeIn' })

      setExiting(false)
      x.set(0)
      setIndex((i) => (direction === 'left' ? i + 1 : i - 1))
    },
    [current, exiting, index, total, x],
  )

  const bind = useDrag(
    ({ active, movement: [mx], direction: [dx], velocity: [vx] }) => {
      if (exiting) return

      if (active) {
        if (index <= 0 && mx > 0) {
          x.set(mx * 0.35)
          return
        }
        if (index >= total - 1 && mx < 0) {
          x.set(mx * 0.35)
          return
        }
        x.set(mx)
        return
      }

      const shouldSwipe = Math.abs(mx) > SWIPE_THRESHOLD || Math.abs(vx) > 0.5
      if (!shouldSwipe) {
        animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
        return
      }

      const direction = dx > 0 || mx > 0 ? 'right' : 'left'
      void flyOut(direction)
    },
    { axis: 'x', filterTaps: true, touchAction: 'none' },
  )

  if (!current) return null

  const likeOpacity = useTransform(x, (v) => Math.min(Math.max(v / 80, 0), 1))
  const nopeOpacity = useTransform(x, (v) => Math.min(Math.max(-v / 80, 0), 1))

  return (
    <section className="py-16 safe-x">
      <motion.h2
        className="font-display mb-6 px-6 text-4xl font-bold gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {section.title}
      </motion.h2>

      <div className="relative mx-auto h-[70dvh] max-w-sm touch-none px-4">
        {next && (
          <div className="absolute inset-4 scale-[0.96] opacity-50">
            <div className="h-full overflow-hidden rounded-3xl">
              <img
                src={next.src}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.src}
            className="absolute inset-4 cursor-grab active:cursor-grabbing touch-none"
            style={{ x, rotate }}
            {...(bind() as object)}
          >
            <div className="relative h-full overflow-hidden rounded-3xl bg-[#2a1520] shadow-2xl shadow-black/50">
              <img
                src={current.src}
                alt={current.caption ?? `Фото ${index + 1}`}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <motion.div
                className="absolute left-6 top-8 rotate-[-20deg] rounded-lg border-4 border-green-400 px-3 py-1 text-xl font-extrabold uppercase tracking-wider text-green-400"
                style={{ opacity: likeOpacity }}
              >
                →
              </motion.div>
              <motion.div
                className="absolute right-6 top-8 rotate-[20deg] rounded-lg border-4 border-red-400 px-3 py-1 text-xl font-extrabold uppercase tracking-wider text-red-400"
                style={{ opacity: nopeOpacity }}
              >
                ←
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-4 top-0 z-10 h-1 rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full gradient-mamba"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2 px-6">
        <p className="text-sm text-white/60">
          {index + 1} / {total}
        </p>
        <p className="text-center text-xs text-white/40">
          {isLast
            ? 'Прокрути вниз — там финал ❤️'
            : 'Свайпай влево — дальше, вправо — назад'}
        </p>
      </div>
    </section>
  )
}
