import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { HeroSection } from '../../data/memories'

export function HeroSectionView({ section }: { section: HeroSection }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  return (
    <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden">
      <motion.div className="absolute inset-0 flex items-center justify-center bg-[#1a0a12]" style={{ y }}>
        <img
          src={section.photo}
          alt={section.title}
          className="h-full w-full object-contain object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a12] via-[#1a0a12]/30 to-transparent" />
      </motion.div>

      <motion.div
        className="relative flex h-full flex-col items-center justify-end px-6 pb-20 text-center safe-bottom"
        style={{ opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#ff4d8d]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {section.date}
        </motion.p>
        <h1 className="font-display max-w-sm text-3xl font-bold leading-tight gradient-text sm:max-w-md sm:text-4xl">
          {section.title}
        </h1>
        <TypewriterText text={section.subtitle} />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span className="text-2xl text-white/50">↓</span>
      </motion.div>
    </section>
  )
}

function TypewriterText({ text }: { text: string }) {
  const chars = text.split('')

  return (
    <p className="mt-4 max-w-xs text-lg text-white/80">
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.04 }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  )
}
