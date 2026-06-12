import { HeartLoader } from '../../components/HeartLoader'

type TransitionPhaseProps = {
  onComplete: () => void
}

export function TransitionPhase({ onComplete }: TransitionPhaseProps) {
  return <HeartLoader onComplete={onComplete} />
}
