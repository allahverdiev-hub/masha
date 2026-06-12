import { motion } from 'framer-motion'
import type { ParallaxPhoto, ParallaxSection } from '../../data/memories'
import {
  PARALLAX_SLIDE_HEIGHT_VH,
  useParallaxSlide,
} from '../../hooks/useParallaxSlide'

const TITLE_CLASS = {
  section: 'text-4xl',
  highlight: 'text-2xl sm:text-3xl',
} as const

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const photos = section.photos
  const titleStyle = section.titleStyle ?? 'section'

  return (
    <section className="relative">
      <div className="flex h-[20vh] items-end justify-center px-6 pb-6">
        <h2
          className={`font-display text-center font-bold gradient-text ${TITLE_CLASS[titleStyle]}`}
        >
          {section.title}
        </h2>
      </div>

      {photos.map((photo, index) => (
        <PhotoSlide key={photo.src} photo={photo} index={index} />
      ))}
    </section>
  )
}

function PhotoSlide({ photo, index }: { photo: ParallaxPhoto; index: number }) {
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
          className="relative w-full max-w-sm will-change-transform"
          style={{
            y,
            scale,
            opacity,
            rotate,
          }}
        >
          <div
            className="overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
            style={{
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption ?? ''}
              className="aspect-[3/4] w-full object-cover"
              draggable={false}
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>

          {(photo.emoji || photo.caption) && (
            <div className="mt-3">
              {photo.emoji && (
                <p className="mb-2 text-center text-2xl sm:text-3xl" aria-hidden>
                  {photo.emoji}
                </p>
              )}
              {photo.caption && (
                <div
                  className="rounded-xl border border-white/15 bg-[#1a0a12]/90 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur-sm"
                >
                  <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                    {photo.caption}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
