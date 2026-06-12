type ActionButtonsProps = {
  onNope: () => void
  onLike: () => void
  showLike?: boolean
  showNope?: boolean
  disabled?: boolean
}

export function ActionButtons({
  onNope,
  onLike,
  showLike = false,
  showNope = true,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div
      className={`flex items-center justify-center ${showLike && showNope ? 'gap-8' : ''}`}
    >
      {showNope && (
        <button
          type="button"
          onClick={onNope}
          disabled={disabled}
          aria-label="Пропустить"
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-2xl shadow-lg backdrop-blur-sm transition-transform active:scale-90 disabled:opacity-40"
        >
          ✕
        </button>
      )}
      {showLike && (
        <button
          type="button"
          onClick={onLike}
          disabled={disabled}
          aria-label="Нравится"
          className="flex h-20 w-20 items-center justify-center rounded-full gradient-mamba-shimmer text-3xl shadow-lg shadow-[#ff4d8d]/40 transition-transform active:scale-90 disabled:opacity-40"
        >
          <span className="heart-pulse" aria-hidden>❤️</span>
        </button>
      )}
    </div>
  )
}
