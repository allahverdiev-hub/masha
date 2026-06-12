import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ParallaxSection } from '../../data/memories'

/** Scroll distance per photo — drives how long each card stays on screen */
const VH_PER_PHOTO = 90

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const containerRef = useRef<HTMLElement>(null)
  const [scrollRoot, setScrollRoot] = useState<HTMLElement | null>(null)
  const photos = section.photos
  const total = photos.length

  useEffect(() => {
    setScrollRoot(document.scrollingElement as HTMLElement | null)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    container: scrollRoot ? { current: scrollRoot } : undefined,
  })

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${total * VH_PER_PHOTO}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <motion.h2
          className="font-display absolute left-0 right-0 top-8 z-40 px-6 text-center text-4xl font-bold gradient-text safe-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {section.title}
        </motion.h2>

        <div className="absolute inset-0 pt-14 pb-20">
          {photos.map((photo, i) => (
            <FloatingCard
              key={photo.src}
              src={photo.src}
              index={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <PhotoCounter scrollYProgress={scrollYProgress} total={total} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-28 bg-gradient-to-t from-[#1a0a12] to-transparent" />
      </div>
    </section>
  )
}

function FloatingCard({
  src,
  index,
  total,
  scrollYProgress,
}: {
  src: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const segment = 1 / total
  const start = index * segment
  const end = (index + 1) * segment
  const rise = start + segment * 0.22
  const peak = start + segment * 0.5
  const fall = start + segment * 0.78

  const opacity = useTransform(
    scrollYProgress,
    [start, rise, peak, fall, end],
    [0, 0.85, 1, 0.85, 0],
  )

  const y = useTransform(
    scrollYProgress,
    [start, peak, end],
    ['42vh', '0vh', '-42vh'],
  )

  const scale = useTransform(
    scrollYProgress,
    [start, peak, end],
    [0.86, 1, 0.9],
  )

  const rotate = useTransform(
    scrollYProgress,
    [start, peak, end],
    [index % 2 === 0 ? 5 : -5, 0, index % 2 === 0 ? -3 : 3],
  )

  const zIndex = useTransform(scrollYProgress, (v) => {
    const local = v * total - index
    if (local < 0 || local > 1) return index
    return index + Math.round((1 - Math.abs(local - 0.5) * 2) * 100)
  })

  const boxShadow = useTransform(scrollYProgress, (v) => {
    const local = v * total - index
    if (local < 0.15 || local > 0.85) return '0 20px 40px rgba(0,0,0,0.15)'
    const peakness = 1 - Math.abs(local - 0.5) * 2
    const o = 0.2 + peakness * 0.4
    const glow = peakness * 0.35
    return `0 28px 60px rgba(0,0,0,${o}), 0 0 40px rgba(255,77,141,${glow})`
  })

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 will-change-transform"
      style={{ opacity, y, scale, rotate, zIndex }}
    >
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl"
        style={{ boxShadow }}
      >
        <img
          src={src}
          alt=""
          className="aspect-[3/4] w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </motion.div>
    </motion.div>
  )
}

function PhotoCounter({
  scrollYProgress,
  total,
}: {
  scrollYProgress: MotionValue<number>
  total: number
}) {
  const [current, setCurrent] = useState(1)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(Math.floor(v * total), total - 1) + 1)
  })

  return (
    <div className="absolute bottom-10 left-0 right-0 z-40 text-center safe-bottom">
      <p className="text-sm font-medium text-white/60">
        {current} / {total}
      </p>
      <p className="mt-1 text-xs text-white/35">Прокрути — следующее фото</p>
    </div>
  )
}
