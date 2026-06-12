import { motion } from 'framer-motion'
import type { TimelineItem, TimelineSection } from '../../data/memories'
import {
  PARALLAX_MOTION_CLASS,
  PARALLAX_SECTION_TITLE_CLASS,
  PARALLAX_SLIDE_HEIGHT_VH,
  PARALLAX_STICKY_SHELL_CLASS,
  useParallaxSlide,
} from '../../hooks/useParallaxSlide'

export function StoryTimeline({ section }: { section: TimelineSection }) {
  return (
    <section className="relative">
      <div className={PARALLAX_SECTION_TITLE_CLASS}>
        <h2 className="font-display text-center text-3xl font-bold gradient-text sm:text-4xl">
          {section.title}
        </h2>
      </div>

      {section.items.map((item, index) => (
        <TimelineSlide key={item.title} item={item} index={index} />
      ))}
    </section>
  )
}

const TIMELINE_Z_OFFSET = 10

function TimelineSlide({ item, index }: { item: TimelineItem; index: number }) {
  const { ref, y, scale, opacity, rotate, pointerEvents } = useParallaxSlide(index)
  const isSub = item.variant === 'sub'

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${PARALLAX_SLIDE_HEIGHT_VH}vh` }}
    >
      <div
        className={PARALLAX_STICKY_SHELL_CLASS}
        style={{ zIndex: TIMELINE_Z_OFFSET + index + 1 }}
      >
        <motion.div
          className={PARALLAX_MOTION_CLASS}
          style={{ y, scale, opacity, rotate, pointerEvents }}
        >
          <div
            className={`rounded-2xl shadow-2xl shadow-black/50 ${
              isSub
                ? 'border border-white/15 bg-white/8 p-4 backdrop-blur-sm sm:p-5'
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
                  : 'rounded-[14px] bg-[#1a0a12]/95 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6'
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
                className={`font-bold text-white ${isSub ? 'text-lg' : 'mt-1 text-xl sm:text-2xl'}`}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-pretty break-words text-sm leading-relaxed text-white/70 sm:mt-3 sm:text-base">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
