import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ParallaxSection } from '../../data/memories'

const SLIDE_HEIGHT_VH = 75

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const photos = section.photos

  return (
    <section className="relative">
      <div className="flex h-[22vh] items-end justify-center px-6 pb-6">
        <h2 className="font-display text-center text-4xl font-bold gradient-text">
          {section.title}
        </h2>
      </div>

      {photos.map((photo, index) => (
        <PhotoSlide key={photo.src} src={photo.src} index={index} />
      ))}
    </section>
  )
}

function PhotoSlide({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], ['18vh', '0vh', '0vh', '-18vh'])
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.35])
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? 4 : -4, 0, index % 2 === 0 ? -3 : 3],
  )

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${SLIDE_HEIGHT_VH}vh` }}
    >
      <div
        className="sticky top-0 flex h-[100dvh] items-center justify-center px-6 py-16"
        style={{ zIndex: index + 1 }}
      >
        <motion.div
          className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
          style={{
            y,
            scale,
            opacity,
            rotate,
            boxShadow:
              '0 28px 60px rgba(0,0,0,0.45), 0 0 36px rgba(255,77,141,0.25)',
          }}
        >
          <img
            src={src}
            alt=""
            className="aspect-[3/4] w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}
