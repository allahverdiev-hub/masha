import { motion } from 'framer-motion'
import type { ParallaxPhoto, ParallaxSection } from '../../data/memories'
import {
  PARALLAX_MOTION_CLASS,
  PARALLAX_SECTION_TITLE_CLASS,
  PARALLAX_SLIDE_HEIGHT_VH,
  PARALLAX_STICKY_SHELL_CLASS,
  useParallaxSlide,
} from '../../hooks/useParallaxSlide'

const TITLE_CLASS = {
  section: 'text-3xl sm:text-4xl',
  highlight: 'text-xl sm:text-2xl md:text-3xl',
} as const

/** First slides stay eager; rest lazy to reduce memory on long scroll */
const EAGER_PHOTO_COUNT = 3

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const photos = section.photos
  const titleStyle = section.titleStyle ?? 'section'

  return (
    <section className="relative">
      <div className={PARALLAX_SECTION_TITLE_CLASS}>
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
        className={PARALLAX_STICKY_SHELL_CLASS}
        style={{ zIndex: index + 1 }}
      >
        <motion.div
          className={PARALLAX_MOTION_CLASS}
          style={{
            y,
            scale,
            opacity,
            rotate,
          }}
        >
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
            style={{
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption ?? ''}
              className="aspect-[3/4] w-full max-h-[min(50svh,520px)] object-cover sm:max-h-none"
              draggable={false}
              loading={index < EAGER_PHOTO_COUNT ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : undefined}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>

          {photo.caption && (
            <div
              className="mt-2 rounded-xl border border-white/15 bg-[#1a0a12]/90 px-3 py-2.5 shadow-lg shadow-black/30 backdrop-blur-sm sm:mt-3 sm:px-4 sm:py-3"
            >
              {photo.emoji && (
                <p className="mb-1.5 text-center text-xl sm:mb-2 sm:text-2xl" aria-hidden>
                  {photo.emoji}
                </p>
              )}
              <p className="text-pretty break-words text-sm leading-relaxed text-white/85 sm:text-base">
                {photo.caption}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
