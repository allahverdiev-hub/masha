import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { ParallaxSection } from '../../data/memories'

const VH_PER_PHOTO = 90

function getSectionProgress(el: HTMLElement): number {
  const vh = window.innerHeight
  const height = el.offsetHeight
  const rect = el.getBoundingClientRect()

  if (rect.top > 0) return 0
  if (rect.bottom <= vh) return 1

  const scrollable = Math.max(height - vh, 1)
  return Math.max(0, Math.min(1, -rect.top / scrollable))
}

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const containerRef = useRef<HTMLElement>(null)
  const progress = useMotionValue(0)
  const photos = section.photos
  const total = photos.length

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false

    const update = () => {
      if (!containerRef.current) return
      progress.set(getSectionProgress(containerRef.current))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    const scrollEl = document.scrollingElement ?? document.documentElement
    scrollEl.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      scrollEl.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [progress])

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

        <div className="absolute inset-0 pt-14 pb-12">
          {photos.map((photo, i) => (
            <FloatingCard
              key={photo.src}
              src={photo.src}
              index={i}
              total={total}
              progress={progress}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-28 bg-gradient-to-t from-[#1a0a12] to-transparent" />
      </div>
    </section>
  )
}

function FloatingCard({
  src,
  index,
  total,
  progress,
}: {
  src: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, (v) => {
    const local = v * total - index
    if (local <= 0 || local >= 1) return 0
    if (local < 0.2) return (local / 0.2) * 0.9
    if (local < 0.5) return 0.9 + ((local - 0.2) / 0.3) * 0.1
    if (local < 0.8) return 1 - ((local - 0.5) / 0.3) * 0.1
    return ((1 - local) / 0.2) * 0.9
  })

  const y = useTransform(progress, (v) => {
    const local = v * total - index
    if (local <= 0) return '40vh'
    if (local >= 1) return '-40vh'
    if (local <= 0.5) {
      const t = local / 0.5
      return `${40 * (1 - t)}vh`
    }
    const t = (local - 0.5) / 0.5
    return `${-40 * t}vh`
  })

  const scale = useTransform(progress, (v) => {
    const local = v * total - index
    if (local <= 0 || local >= 1) return 0.86
    const peakness = 1 - Math.abs(local - 0.5) * 2
    return 0.86 + peakness * 0.14
  })

  const rotate = useTransform(progress, (v) => {
    const local = v * total - index
    if (local <= 0 || local >= 1) return index % 2 === 0 ? 5 : -5
    if (local <= 0.5) {
      const t = local / 0.5
      const start = index % 2 === 0 ? 5 : -5
      return start * (1 - t)
    }
    const t = (local - 0.5) / 0.5
    const end = index % 2 === 0 ? -3 : 3
    return end * t
  })

  const zIndex = useTransform(progress, (v) => {
    const local = v * total - index
    if (local < 0 || local > 1) return index
    return index + Math.round((1 - Math.abs(local - 0.5) * 2) * 200)
  })

  const boxShadow = useTransform(progress, (v) => {
    const local = v * total - index
    if (local < 0.12 || local > 0.88) return '0 20px 40px rgba(0,0,0,0.12)'
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
