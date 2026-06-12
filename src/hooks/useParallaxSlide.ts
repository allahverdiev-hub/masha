import { useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const PARALLAX_SLIDE_HEIGHT_VH = 88

export const PARALLAX_SECTION_TITLE_CLASS =
  'flex min-h-[12svh] items-end justify-center px-4 pb-4 pt-2 sm:min-h-[16svh] sm:px-6 sm:pb-6'

export const PARALLAX_STICKY_SHELL_CLASS =
  'sticky top-0 flex h-[100svh] max-h-[100svh] items-center justify-center overflow-hidden px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-8'

export const PARALLAX_MOTION_CLASS =
  'relative w-full min-w-0 max-w-sm will-change-transform'

const SPRING = { stiffness: 55, damping: 22, mass: 1.1, restDelta: 0.0005 }

export function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

export function useParallaxSlide(index: number) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'end 0.08'],
  })

  const smooth = useSpring(scrollYProgress, SPRING)

  const y = useTransform(smooth, (v) => {
    const enter = smoothstep(v / 0.45)
    const exit = smoothstep((1 - v) / 0.45)
    const drift = (v - 0.5) * 22
    return `${(1 - enter) * 10 - (1 - exit) * 10 + drift}vh`
  })

  const scale = useTransform(smooth, (v) => {
    const peak = smoothstep(1 - Math.abs(v - 0.5) * 2)
    return 0.93 + peak * 0.07
  })

  const opacity = useTransform(smooth, (v) => {
    const edge =
      smoothstep(Math.min(v / 0.18, 1)) * smoothstep(Math.min((1 - v) / 0.18, 1))
    return edge * 0.92 + 0.08 * smoothstep(1 - Math.abs(v - 0.5) * 2)
  })

  const rotate = useTransform(smooth, (v) => {
    const tilt = index % 2 === 0 ? 1.5 : -1.5
    return tilt * (1 - smoothstep(1 - Math.abs(v - 0.5) * 2))
  })

  return { ref, y, scale, opacity, rotate }
}
