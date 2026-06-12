import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef, useState } from 'react'
import type { ParallaxSection } from '../../data/memories'

const SCROLL_PER_PHOTO_VH = 55

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const containerRef = useRef<HTMLElement>(null)
  const photos = section.photos
  const total = photos.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

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
          {photos.map((photo, i) => (
            <SequentialPhoto
              key={photo.src}
              src={photo.src}
              index={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <PhotoCounter scrollYProgress={scrollYProgress} total={total} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a0a12] to-transparent" />
      </div>
    </section>
  )
}

function SequentialPhoto({
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
  const enter = start + segment * 0.15
  const leave = end - segment * 0.15
  const mid = start + segment * 0.5

  const opacity = useTransform(
    scrollYProgress,
    [start, enter, leave, end],
    [0, 1, 1, 0],
  )

  const scale = useTransform(scrollYProgress, [start, mid, end], [0.88, 1, 0.92])

  const y = useTransform(scrollYProgress, [start, mid, end], [80, 0, -80])

  const rotate = useTransform(scrollYProgress, [start, mid, end], [index % 2 === 0 ? -4 : 4, 0, index % 2 === 0 ? 4 : -4])

  return (
    <motion.div
      className="absolute mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
      style={{
        opacity,
        scale,
        y,
        rotate,
        zIndex: index,
      }}
    >
      <img
        src={src}
        alt=""
        className="aspect-[3/4] w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
    <motion.div
      className="absolute bottom-10 left-0 right-0 z-30 text-center safe-bottom"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <p className="text-sm font-medium text-white/60">
        {current} / {total}
      </p>
      <p className="mt-1 text-xs text-white/35">Прокрути — следующее фото</p>
    </motion.div>
  )
}
