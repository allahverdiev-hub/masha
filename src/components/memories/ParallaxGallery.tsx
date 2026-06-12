import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ParallaxSection } from '../../data/memories'

const SCROLL_PER_PHOTO_VH = 50

function getScrollTop() {
  return document.scrollingElement?.scrollTop ?? window.scrollY
}

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const containerRef = useRef<HTMLElement>(null)
  const photos = section.photos
  const total = photos.length

  const [progress, setProgress] = useState(0)
  const activeIndex = Math.min(Math.floor(progress * total), total - 1)
  const segmentProgress =
    total > 0 ? (progress * total - activeIndex) : 0

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return

      const scrollTop = getScrollTop()
      const top = el.offsetTop
      const height = el.offsetHeight
      const viewport = window.innerHeight
      const scrollable = Math.max(height - viewport, 1)
      const raw = (scrollTop - top) / scrollable

      setProgress(Math.max(0, Math.min(1, raw)))
    }

    update()
    const scrollEl = document.scrollingElement ?? window
    scrollEl.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      scrollEl.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [total])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${total * SCROLL_PER_PHOTO_VH}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <motion.h2
          className="font-display absolute left-0 right-0 top-8 z-30 px-6 text-center text-4xl font-bold gradient-text safe-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {section.title}
        </motion.h2>

        <div className="absolute inset-0 flex items-center justify-center px-6 pt-16 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={photos[activeIndex]?.src ?? activeIndex}
              className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
              initial={{ opacity: 0, y: 60, scale: 0.92, rotate: activeIndex % 2 === 0 ? -3 : 3 }}
              animate={{
                opacity: 1,
                y: -segmentProgress * 40,
                scale: 1 - segmentProgress * 0.04,
                rotate: 0,
              }}
              exit={{ opacity: 0, y: -60, scale: 0.92, rotate: activeIndex % 2 === 0 ? 3 : -3 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <img
                src={photos[activeIndex]?.src}
                alt=""
                className="aspect-[3/4] w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-30 text-center safe-bottom">
          <p className="text-sm font-medium text-white/60">
            {activeIndex + 1} / {total}
          </p>
          <p className="mt-1 text-xs text-white/35">Прокрути — следующее фото</p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a0a12] to-transparent" />
      </div>
    </section>
  )
}
