import { motion } from 'framer-motion'
import type { TimelineSection } from '../../data/memories'

export function StoryTimeline({ section }: { section: TimelineSection }) {
  return (
    <section className="px-6 py-20 safe-x">
      <motion.h2
        className="font-display mb-12 text-center text-4xl font-bold gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        {section.title}
      </motion.h2>

      <div className="relative mx-auto max-w-md">
        <div className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-gradient-to-b from-[#ff6b35] via-[#ff4d8d] to-[#7b2cbf]" />

        {section.items.map((item, i) => (
          <motion.div
            key={item.title}
            className="relative mb-10 pl-10 last:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="absolute left-0 top-1 h-6 w-6 rounded-full gradient-mamba shadow-lg shadow-[#ff4d8d]/30" />
            <p className="text-xs font-semibold uppercase tracking-wider text-[#ff4d8d]">
              {item.date}
            </p>
            <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
