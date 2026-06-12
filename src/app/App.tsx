import { AnimatePresence } from 'framer-motion'
import { useAppPhase } from '../hooks/useAppPhase'
import { SwipePhase } from './phases/SwipePhase'
import { RevealPhase } from './phases/RevealPhase'
import { TransitionPhase } from './phases/TransitionPhase'
import { MemoriesPhase } from './phases/MemoriesPhase'

export default function App() {
  const { phase, goToReveal, goToTransition, goToMemories } = useAppPhase()

  return (
    <div className="h-full w-full">
      {phase === 'swipe' && <SwipePhase onHerFound={goToReveal} />}

      <AnimatePresence>
        {phase === 'reveal' && (
          <RevealPhase key="reveal" onContinue={goToTransition} />
        )}
      </AnimatePresence>

      {phase === 'transition' && (
        <TransitionPhase onComplete={goToMemories} />
      )}

      {phase === 'memories' && <MemoriesPhase />}
    </div>
  )
}
