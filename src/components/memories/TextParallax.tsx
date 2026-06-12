import { motion } from 'framer-motion'
import type { TextParallaxItem, TextParallaxSection } from '../../data/memories'
import { getTelegramUrl } from '../../data/siteConfig'
import {
  PARALLAX_MOTION_CLASS,
  PARALLAX_SLIDE_HEIGHT_VH,
  PARALLAX_STICKY_SHELL_CLASS,
  useParallaxSlide,
} from '../../hooks/useParallaxSlide'
import { highlightKeywords } from '../../utils/highlightKeywords'

export function TextParallax({ section }: { section: TextParallaxSection }) {
  return (
    <section className="relative">
      {section.items.map((item, index) => (
        <TextSlide key={index} item={item} index={index} />
      ))}
      <CtaSlide
        index={section.items.length}
        closingLine={section.closingLine}
        closingEmoji={section.closingEmoji}
        buttonText={section.buttonText}
      />
    </section>
  )
}

function PlaqueEmoji({ emoji }: { emoji?: string }) {
  if (!emoji) return null
  return (
    <p className="mb-2 text-center text-xl sm:mb-3 sm:text-2xl" aria-hidden>
      {emoji}
    </p>
  )
}

function TextSlide({ item, index }: { item: TextParallaxItem; index: number }) {
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
          style={{ y, scale, opacity, rotate }}
        >
          <div
            className="shimmer-border-frame rounded-2xl p-[2px] shadow-2xl shadow-black/50"
            style={{
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
            }}
          >
            <div className="rounded-[14px] bg-[#1a0a12]/95 px-5 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
              <PlaqueEmoji emoji={item.emoji} />
              <p className="text-pretty break-words text-center text-base leading-relaxed text-white/85 sm:text-lg">
                {highlightKeywords(item.text)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function CtaSlide({
  index,
  closingLine,
  closingEmoji,
  buttonText,
}: {
  index: number
  closingLine: string
  closingEmoji?: string
  buttonText: string
}) {
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
          style={{ y, scale, opacity, rotate }}
        >
          <div
            className="shimmer-border-frame rounded-2xl p-[2px] shadow-2xl shadow-black/50"
            style={{
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
            }}
          >
            <div className="rounded-[14px] bg-[#2a2a2e] px-5 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
              <PlaqueEmoji emoji={closingEmoji} />
              <p className="text-pretty break-words text-center text-base leading-relaxed text-white/90 sm:text-lg">
                {highlightKeywords(closingLine)}
              </p>
              <div className="mt-6 flex justify-center sm:mt-8">
                <a
                  href={getTelegramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-mamba max-w-full rounded-full px-5 py-3.5 text-center text-sm font-semibold leading-snug whitespace-normal text-white shadow-lg shadow-[#ff4d8d]/30 transition active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                >
                  {buttonText}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
