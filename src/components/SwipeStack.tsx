import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { ProfileCard } from './ProfileCard'
import type { Profile } from '../data/profiles'

const SWIPE_THRESHOLD = 80

export type SwipeStackHandle = {
  nope: () => void
  like: () => void
  isOnHerCard: () => boolean
}

type SwipeStackProps = {
  profiles: Profile[]
  onHerFound: () => void
  onIndexChange?: (index: number) => void
  onCelebratingChange?: (celebrating: boolean) => void
  disabled?: boolean
}

function CardWithDrag({
  profile,
  x,
  scale,
  celebrate,
  bind,
}: {
  profile: Profile
  x: MotionValue<number>
  scale: MotionValue<number>
  celebrate?: boolean
  bind: ReturnType<typeof useDrag>[0]
}) {
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18])

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, scale }}
      {...bind()}
    >
      <ProfileCard profile={profile} celebrate={celebrate} dragX={x} />
    </motion.div>
  )
}

export const SwipeStack = forwardRef<SwipeStackHandle, SwipeStackProps>(
  function SwipeStack(
    {
      profiles,
      onHerFound,
      onIndexChange,
      onCelebratingChange,
      disabled = false,
    },
    ref,
  ) {
    const [index, setIndex] = useState(0)
    const [exiting, setExiting] = useState(false)
    const [isCelebrating, setIsCelebrating] = useState(false)

    const x = useMotionValue(0)
    const scale = useMotionValue(1)

    const current = profiles[index]
    const next = profiles[index + 1]
    const isHer = current?.isHer ?? false

    useEffect(() => {
      onIndexChange?.(index)
    }, [index, onIndexChange])

    useEffect(() => {
      onCelebratingChange?.(isCelebrating)
    }, [isCelebrating, onCelebratingChange])

    const snapBack = useCallback(() => {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
    }, [x])

    const celebrateHerMatch = useCallback(async () => {
      if (!current || disabled || exiting || isCelebrating) return

      setExiting(true)
      setIsCelebrating(true)

      try {
        navigator.vibrate?.([40, 60, 100])
      } catch {
        /* ignore */
      }

      await Promise.all([
        animate(x, 50, { duration: 0.9, ease: 'easeOut' }),
        animate(scale, [1, 1.1, 1.04], { duration: 1.2, ease: 'easeInOut' }),
      ])

      setIsCelebrating(false)
      onHerFound()
    }, [current, disabled, exiting, isCelebrating, onHerFound, scale, x])

    const flyOut = useCallback(
      async (direction: 'left' | 'right') => {
        if (!current || disabled || exiting) return

        if (isHer) {
          if (direction === 'right') {
            await celebrateHerMatch()
          }
          return
        }

        if (direction === 'right') {
          snapBack()
          return
        }

        setExiting(true)
        await animate(x, -500, { duration: 0.35, ease: 'easeIn' })

        setExiting(false)
        x.set(0)
        scale.set(1)
        setIndex((i) => i + 1)
      },
      [current, disabled, exiting, isHer, celebrateHerMatch, snapBack, scale, x],
    )

    useImperativeHandle(ref, () => ({
      nope: () => void flyOut('left'),
      like: () => void flyOut('right'),
      isOnHerCard: () => isHer,
    }))

    const bind = useDrag(
      ({ active, movement: [mx], direction: [dx], velocity: [vx] }) => {
        if (disabled || exiting || isCelebrating) return

        if (active) {
          if (isHer) {
            if (mx < 0) return
            x.set(mx)
            return
          }

          x.set(Math.min(mx, 0))
          return
        }

        const shouldSwipe =
          Math.abs(mx) > SWIPE_THRESHOLD || Math.abs(vx) > 0.5

        if (!shouldSwipe) {
          snapBack()
          return
        }

        const direction = dx > 0 || mx > 0 ? 'right' : 'left'
        void flyOut(direction)
      },
      { axis: 'x', filterTaps: true },
    )

    if (!current) return null

    return (
      <>
        {isCelebrating && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100] bg-[#ff4d8d]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-hidden
          />
        )}

        <div className="relative mx-auto h-full w-full max-w-sm min-h-[min(68dvh,640px)] touch-none">
          {next && !isCelebrating && (
            <div className="absolute inset-0 scale-[0.96] opacity-60">
              <ProfileCard profile={next} />
            </div>
          )}

          <AnimatePresence mode="popLayout">
            <CardWithDrag
              key={current.id}
              profile={current}
              x={x}
              scale={scale}
              celebrate={isCelebrating}
              bind={bind}
            />
          </AnimatePresence>
        </div>
      </>
    )
  },
)

export function getHerProfile(profiles: Profile[]): Profile | undefined {
  return profiles.find((p) => p.isHer)
}
