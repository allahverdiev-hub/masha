import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { FinaleSection } from '../../data/memories'

export function FinaleSection({ section }: { section: FinaleSection }) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff6b35', '#ff4d8d', '#ffb347', '#7b2cbf'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff6b35', '#ff4d8d', '#ffb347', '#7b2cbf'],
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) frame()
      },
      { threshold: 0.5 },
    )

    const el = document.getElementById('finale-section')
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="finale-section"
      className="relative flex min-h-[70dvh] flex-col items-center justify-center px-6 py-24 text-center safe-x safe-bottom"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
      >
        <motion.span
          className="mb-6 block text-6xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          ❤️
        </motion.span>
        <h2 className="font-display text-5xl font-bold gradient-text">{section.title}</h2>
        <p className="mt-4 text-lg text-white/70">{section.subtitle}</p>
        {section.message && (
          <motion.p
            className="mt-8 max-w-sm text-base leading-relaxed text-white/85 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {section.message}
          </motion.p>
        )}
      </motion.div>

      <HeartsRain />
    </section>
  )
}

function HeartsRain() {
  const hearts = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-60"
          style={{ left: `${(i * 8.3) % 100}%` }}
          initial={{ y: '-10%', opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 0.6, 0] }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'linear',
          }}
        >
          💕
        </motion.span>
      ))}
    </div>
  )
}
