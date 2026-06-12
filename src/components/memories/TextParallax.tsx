import { motion } from 'framer-motion'
import type { TextParallaxSection } from '../../data/memories'
import { getTelegramUrl } from '../../data/siteConfig'
import {
  PARALLAX_SLIDE_HEIGHT_VH,
  useParallaxSlide,
} from '../../hooks/useParallaxSlide'
import { highlightKeywords } from '../../utils/highlightKeywords'

export function TextParallax({ section }: { section: TextParallaxSection }) {
  return (
    <section className="relative">
      {section.items.map((text, index) => (
        <TextSlide key={index} text={text} index={index} />
      ))}
      <CtaSlide
        index={section.items.length}
        closingLine={section.closingLine}
        buttonText={section.buttonText}
      />
    </section>
  )
}

function TextSlide({ text, index }: { text: string; index: number }) {
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
          style={{ y, scale, opacity, rotate }}
        >
          <div
            className="shimmer-border-frame rounded-2xl p-[2px] shadow-2xl shadow-black/50"
            style={{
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
            }}
          >
            <div className="rounded-[14px] bg-[#1a0a12]/95 px-6 py-8 backdrop-blur-sm">
              <p className="text-center text-base leading-relaxed text-white/85 sm:text-lg">
                {highlightKeywords(text)}
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
  buttonText,
}: {
  index: number
  closingLine: string
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
        className="sticky top-0 flex h-[100dvh] items-center justify-center px-6 py-16"
        style={{ zIndex: index + 1 }}
      >
        <motion.div
          className="relative w-full max-w-sm will-change-transform"
          style={{ y, scale, opacity, rotate }}
        >
          <div
            className="shimmer-border-frame rounded-2xl p-[2px] shadow-2xl shadow-black/50"
            style={{
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.4), 0 0 32px rgba(255,77,141,0.2)',
            }}
          >
            <div className="rounded-[14px] bg-[#2a2a2e] px-6 py-8 backdrop-blur-sm">
              <p className="text-center text-lg leading-relaxed text-white/90">
                {highlightKeywords(closingLine)}
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href={getTelegramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-mamba rounded-full px-8 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-[#ff4d8d]/30 transition active:scale-95 sm:text-base"
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
