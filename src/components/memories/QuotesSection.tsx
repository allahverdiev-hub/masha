import { motion } from 'framer-motion'
import type { QuoteSection } from '../../data/memories'

export function QuotesSection({ section }: { section: QuoteSection }) {
  return (
    <section className="px-6 py-16 safe-x">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        {section.quotes.map((quote, i) => (
          <motion.blockquote
            key={quote.text}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <p className="font-display text-lg italic leading-relaxed text-white/90">
              «{quote.text}»
            </p>
            {quote.author && (
              <footer className="mt-3 text-sm text-white/50">— {quote.author}</footer>
            )}
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}
