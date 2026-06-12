import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import type { GallerySection } from '../../data/memories'

const SWIPE_THRESHOLD = 50

type VerticalPhotoSliderProps = {
  section: GallerySection
}

export function VerticalPhotoSlider({ section }: VerticalPhotoSliderProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = section.photos.length
  const current = section.photos[index]
  const isLast = index === total - 1

  const goNext = useCallback(() => {
    if (index >= total - 1) return
    setDirection(1)
    setIndex((i) => i + 1)
  }, [index, total])

  const goPrev = useCallback(() => {
    if (index <= 0) return
    setDirection(-1)
    setIndex((i) => i - 1)
  }, [index])

  useEffect(() => {
    const next = section.photos[index + 1]
    if (next) {
      const img = new Image()
      img.src = next.src
    }
  }, [index, section.photos])

  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], direction: [, dy], last }) => {
      if (!last) return
      const shouldSwipe = Math.abs(my) > SWIPE_THRESHOLD || Math.abs(vy) > 0.4
      if (!shouldSwipe) return
      if (dy < 0 || my < 0) goNext()
      else goPrev()
    },
    { axis: 'y', filterTaps: true },
  )

  const variants = {
    enter: (d: number) => ({
      y: d > 0 ? '100%' : '-100%',
      opacity: 0.85,
      scale: 0.96,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      y: d > 0 ? '-100%' : '100%',
      opacity: 0.85,
      scale: 0.96,
    }),
  }

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

      <div
        className="relative mx-auto h-[78dvh] max-w-md touch-none overflow-hidden rounded-3xl bg-[#2a1520] shadow-2xl shadow-black/50"
        {...bind()}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current.src}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.src}
              alt={current.caption ?? `Фото ${index + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-white/10">
          <motion.div
            className="h-full gradient-mamba"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 text-center text-sm text-white/60">
          {index + 1} / {total}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 px-6">
        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm text-white/80 backdrop-blur-sm transition active:scale-95 disabled:opacity-30"
        >
          {isLast ? 'Это все моменты ✨' : 'Следующий ↑'}
        </button>
        <p className="text-center text-xs text-white/40">
          {isLast ? 'Прокрути вниз — там финал ❤️' : 'Свайпай вверх для следующего фото'}
        </p>
      </div>
    </section>
  )
}
