import { useEffect, useRef } from 'react'
import { SwipeStack, type SwipeStackHandle } from '../../components/SwipeStack'
import { ActionButtons } from '../../components/ActionButtons'
import { profiles } from '../../data/profiles'

type SwipePhaseProps = {
  onHerFound: () => void
}

export function SwipePhase({ onHerFound }: SwipePhaseProps) {
  const stackRef = useRef<SwipeStackHandle>(null)

  useEffect(() => {
    profiles.forEach((p) => {
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
        />
      </div>

      <div className="shrink-0 px-4 pb-6 pt-2">
        <ActionButtons
          onNope={() => stackRef.current?.nope()}
          onLike={() => stackRef.current?.like()}
          showLike
          showNope={false}
        />
        <p className="mt-4 text-center text-xs text-white/40">
          Лайкни, чтобы продолжить ❤️
        </p>
      </div>
    </div>
  )
}
