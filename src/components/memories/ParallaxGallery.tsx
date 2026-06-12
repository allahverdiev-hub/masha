import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ParallaxSection } from '../../data/memories'

const SLIDE_HEIGHT_VH = 88

const SPRING = { stiffness: 55, damping: 22, mass: 1.1, restDelta: 0.0005 }

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const photos = section.photos

  return (
    <section className="relative">
      <div className="flex h-[20vh] items-end justify-center px-6 pb-6">
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
    offset: ['start 0.92', 'end 0.08'],
  })

  const smooth = useSpring(scrollYProgress, SPRING)

  const y = useTransform(smooth, (v) => {
    const enter = smoothstep(v / 0.45)
    const exit = smoothstep((1 - v) / 0.45)
    const drift = (v - 0.5) * 22
    return `${(1 - enter) * 10 - (1 - exit) * 10 + drift}vh`
  })

  const scale = useTransform(smooth, (v) => {
    const peak = smoothstep(1 - Math.abs(v - 0.5) * 2)
    return 0.93 + peak * 0.07
  })

  const opacity = useTransform(smooth, (v) => {
    const edge = smoothstep(Math.min(v / 0.18, 1)) * smoothstep(Math.min((1 - v) / 0.18, 1))
    return edge * 0.92 + 0.08 * smoothstep(1 - Math.abs(v - 0.5) * 2)
  })

  const rotate = useTransform(smooth, (v) => {
    const tilt = index % 2 === 0 ? 1.5 : -1.5
    return tilt * (1 - smoothstep(1 - Math.abs(v - 0.5) * 2))
  })

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
          className="relative w-full max-w-sm overflow-hidden rounded-2xl will-change-transform shadow-2xl shadow-black/50"
          style={{
            y,
            scale,
            opacity,
            rotate,
            boxShadow:
              '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
          }}
        >
          <img
            src={src}
            alt=""
            className="aspect-[3/4] w-full object-cover"
            draggable={false}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}
