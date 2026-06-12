import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ParallaxSection } from '../../data/memories'

type CardConfig = {
  top: string
  left: string
  width: string
  speed: number
  rotate: number
  zIndex: number
}

const CARD_LAYOUTS: CardConfig[] = [
  { top: '8%', left: '5%', width: '42%', speed: 0.3, rotate: -6, zIndex: 2 },
  { top: '5%', left: '52%', width: '38%', speed: 0.7, rotate: 4, zIndex: 3 },
  { top: '28%', left: '30%', width: '50%', speed: 1.0, rotate: -2, zIndex: 5 },
  { top: '22%', left: '-2%', width: '35%', speed: 0.5, rotate: 8, zIndex: 1 },
  { top: '35%', left: '68%', width: '32%', speed: 0.9, rotate: -5, zIndex: 2 },
  { top: '50%', left: '10%', width: '40%', speed: 1.2, rotate: 3, zIndex: 4 },
  { top: '48%', left: '48%', width: '38%', speed: 0.6, rotate: -4, zIndex: 3 },
  { top: '62%', left: '25%', width: '45%', speed: 1.4, rotate: 2, zIndex: 5 },
  { top: '58%', left: '70%', width: '30%', speed: 0.8, rotate: -7, zIndex: 2 },
  { top: '75%', left: '5%', width: '36%', speed: 1.1, rotate: 5, zIndex: 3 },
  { top: '72%', left: '42%', width: '42%', speed: 0.4, rotate: -3, zIndex: 4 },
  { top: '80%', left: '60%', width: '34%', speed: 1.3, rotate: 6, zIndex: 2 },
]

export function ParallaxGallery({ section }: { section: ParallaxSection }) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const photos = section.photos.slice(0, CARD_LAYOUTS.length)

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <motion.h2
          className="font-display absolute left-0 right-0 top-8 z-20 px-6 text-center text-4xl font-bold gradient-text safe-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {section.title}
        </motion.h2>

        <div className="absolute inset-0">
          {photos.map((photo, i) => {
            const layout = CARD_LAYOUTS[i]
            return (
              <ParallaxCard
                key={photo.src}
                src={photo.src}
                layout={layout}
                scrollYProgress={scrollYProgress}
                index={i}
              />
            )
          })}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a0a12] to-transparent" />
      </div>
    </section>
  )
}

function ParallaxCard({
  src,
  layout,
  scrollYProgress,
  index,
}: {
  src: string
  layout: CardConfig
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [layout.speed * 80, -layout.speed * 120],
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6])
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [layout.rotate, layout.rotate + layout.speed * 10],
  )

  return (
    <motion.div
      className="absolute overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
      style={{
        top: layout.top,
        left: layout.left,
        width: layout.width,
        zIndex: layout.zIndex,
        y,
        scale,
        opacity,
        rotate,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
    >
      <img
        src={src}
        alt=""
        className="aspect-[3/4] w-full object-cover"
        draggable={false}
      />
    </motion.div>
  )
}
