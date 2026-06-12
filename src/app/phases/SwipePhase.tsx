import { useEffect, useRef, useState, useCallback } from 'react'
import { SwipeStack, type SwipeStackHandle } from '../../components/SwipeStack'
import { ActionButtons } from '../../components/ActionButtons'
import { profiles } from '../../data/profiles'

type SwipePhaseProps = {
  onHerFound: () => void
}

export function SwipePhase({ onHerFound }: SwipePhaseProps) {
  const stackRef = useRef<SwipeStackHandle>(null)
  const [onHerCard, setOnHerCard] = useState(false)

  const handleIndexChange = useCallback((index: number) => {
    setOnHerCard(profiles[index]?.isHer ?? false)
  }, [])

  useEffect(() => {
    profiles.slice(0, 2).forEach((p) => {
      const img = new Image()
      img.src = p.photo
    })
  }, [])

  return (
    <div className="flex min-h-dvh h-full flex-col bg-gradient-to-b from-[#2a1020] via-[#1a0a12] to-[#0d0610] safe-top safe-bottom safe-x">
      <header className="flex shrink-0 items-center justify-center px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl font-extrabold tracking-tight gradient-text">Mamba</h1>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 px-4 pb-2 pt-2">
        <SwipeStack
          ref={stackRef}
          profiles={profiles}
          onHerFound={onHerFound}
          onIndexChange={handleIndexChange}
        />
      </div>

      <div className="shrink-0 px-4 pb-6 pt-2">
        <ActionButtons
          onNope={() => stackRef.current?.nope()}
          onLike={() => stackRef.current?.like()}
          disableNope={onHerCard}
        />
        <p className="mt-4 text-center text-xs text-white/40">
          {onHerCard ? 'Лайкни, чтобы продолжить ❤️' : 'Свайпай влево или вправо'}
        </p>
      </div>
    </div>
  )
}
