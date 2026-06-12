import { motion } from 'framer-motion'
import type { TimelineItem, TimelineSection } from '../../data/memories'
import {
  PARALLAX_SLIDE_HEIGHT_VH,
  useParallaxSlide,
} from '../../hooks/useParallaxSlide'

export function StoryTimeline({ section }: { section: TimelineSection }) {
  return (
    <section className="relative">
      <div className="flex h-[20vh] items-end justify-center px-6 pb-6">
        <h2 className="font-display text-center text-4xl font-bold gradient-text">
          {section.title}
        </h2>
      </div>

      {section.items.map((item, index) => (
        <TimelineSlide key={item.title} item={item} index={index} />
      ))}
    </section>
  )
}

function TimelineSlide({ item, index }: { item: TimelineItem; index: number }) {
  const { ref, y, scale, opacity, rotate } = useParallaxSlide(index)
  const isSub = item.variant === 'sub'

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
          style={{ y, scale, opacity, rotate }}
        >
          <div
            className={`rounded-2xl shadow-2xl shadow-black/50 ${
              isSub
                ? 'border border-white/15 bg-white/8 p-5 backdrop-blur-sm'
                : 'shimmer-border-frame p-[2px]'
            }`}
            style={
              isSub
                ? undefined
                : {
                    boxShadow:
                      '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
                  }
            }
          >
            <div
              className={
                isSub
                  ? undefined
                  : 'rounded-[14px] bg-[#1a0a12]/95 px-6 py-6 backdrop-blur-sm'
              }
            >
              {isSub && (
                <span className="mb-2 block text-lg" aria-hidden>💕</span>
              )}
              {item.date && (
                <p className="text-xs font-semibold uppercase tracking-wider text-[#ff4d8d]">
                  {item.date}
                </p>
              )}
              <h3
                className={`font-bold text-white ${isSub ? 'text-lg' : 'mt-1 text-2xl'}`}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
