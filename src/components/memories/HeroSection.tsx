import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { HeroSection } from '../../data/memories'

export function HeroSectionView({ section }: { section: HeroSection }) {
  const ref = useRef<HTMLElement>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = section.photo
    document.head.appendChild(link)
    return () => link.remove()
  }, [section.photo])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0])
  const imageOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.35])

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[100svh] w-full max-w-[100vw] overflow-hidden safe-x"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-[#1a0a12] px-4 pb-28 pt-[max(3rem,env(safe-area-inset-top))] sm:px-5 sm:pb-36 sm:pt-12">
        <motion.div
          className="relative w-full max-w-lg overflow-hidden rounded-[20px] bg-[#2a1520] shadow-2xl shadow-black/40"
          initial={{ rotate: -6, scale: 0.94, opacity: 0 }}
          animate={{ rotate: -3.5, scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.div className="relative will-change-[opacity]" style={{ opacity: imageOpacity }}>
          {!heroLoaded && (
            <div className="absolute inset-0 z-10 animate-pulse bg-[#2a1520]" />
          )}
          <img
            src={section.photo}
            alt={section.title}
            className="aspect-[16/10] w-full object-cover object-[center_22%] transition-opacity duration-300"
            style={{ opacity: heroLoaded ? 1 : 0 }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0a12]/50 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none relative flex h-full flex-col items-center justify-end px-4 pb-16 text-center safe-bottom sm:px-6 sm:pb-20 will-change-[opacity]"
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-display max-w-md text-[clamp(1.65rem,6.5vw,2.75rem)] font-bold leading-tight gradient-text sm:max-w-lg">
          {section.title}
        </h1>
        <TypewriterText text={section.subtitle} />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 sm:bottom-8"
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
