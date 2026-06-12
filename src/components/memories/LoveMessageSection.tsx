import { motion } from 'framer-motion'
import type { LoveMessageSection as LoveMessageSectionType } from '../../data/memories'
import { getTelegramUrl } from '../../data/siteConfig'

export function LoveMessageSection({ section }: { section: LoveMessageSectionType }) {
  return (
    <section className="px-6 py-16 safe-x">
      <div className="mx-auto max-w-md">
        <div className="mb-10 flex items-center justify-center gap-3 sm:gap-4">
          <motion.div
            className="w-[46%] overflow-hidden rounded-2xl shadow-lg shadow-[#ff4d8d]/20"
            style={{ rotate: -2 }}
            initial={{ opacity: 0, x: -30, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <img
              src={section.photos[0]}
              alt=""
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>

          <span className="text-xl text-[#ff4d8d]/60">💕</span>

          <motion.div
            className="w-[46%] overflow-hidden rounded-2xl shadow-lg shadow-[#ff4d8d]/20"
            style={{ rotate: 2 }}
            initial={{ opacity: 0, x: 30, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring', delay: 0.1 }}
          >
            <img
              src={section.photos[1]}
              alt=""
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          className="shimmer-border-frame rounded-3xl p-[10px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="rounded-[calc(1.5rem-10px)] bg-[#2a2a2e] px-6 py-8">
          <h2 className="font-display text-center text-2xl font-bold gradient-text sm:text-3xl">
            {section.highlight}
          </h2>

          <div className="mt-6 space-y-4">
            {section.paragraphs.map((text, i) => (
              <motion.p
                key={i}
                className="text-center text-base leading-relaxed text-white/80"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              >
                {highlightKeywords(text)}
              </motion.p>
            ))}
          </div>

          <motion.p
            className="mt-6 text-center text-lg text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {section.closingLine}
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5, type: 'spring' }}
          >
            <a
              href={getTelegramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-mamba rounded-full px-8 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-[#ff4d8d]/30 transition active:scale-95 sm:text-base"
            >
              {section.buttonText}
            </a>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const KEYWORDS = ['солнышко', 'манюнька']

function highlightKeywords(text: string) {
  const parts = text.split(new RegExp(`(${KEYWORDS.join('|')})`, 'gi'))

  return parts.map((part, i) => {
    if (KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase())) {
      return (
        <span key={i} className="font-medium text-[#ff4d8d]">
          {part}
        </span>
      )
    }
    return part
  })
}
