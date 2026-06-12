import { motion } from 'framer-motion'
import type { ParallaxSection } from '../../data/memories'
import {
  PARALLAX_SLIDE_HEIGHT_VH,
  useParallaxSlide,
} from '../../hooks/useParallaxSlide'

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
  const { ref, y, scale, opacity, rotate } = useParallaxSlide(index)

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${PARALLAX_SLIDE_HEIGHT_VH}vh` }}
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
