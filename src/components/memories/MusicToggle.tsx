type MusicToggleProps = {
  muted: boolean
  onToggle: () => void
}

export function MusicToggle({ muted, onToggle }: MusicToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? 'Включить музыку' : 'Выключить музыку'}
      className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg backdrop-blur-md safe-top safe-x transition active:scale-90"
      style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
