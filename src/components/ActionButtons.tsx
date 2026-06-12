type ActionButtonsProps = {
  onNope: () => void
  onLike: () => void
  showLike?: boolean
  disabled?: boolean
  disableNope?: boolean
}

export function ActionButtons({
  onNope,
  onLike,
  showLike = false,
  disabled = false,
  disableNope = false,
}: ActionButtonsProps) {
  return (
    <div
      className={`flex items-center justify-center ${showLike ? 'gap-8' : ''}`}
    >
      <button
        type="button"
        onClick={onNope}
        disabled={disabled || disableNope}
        aria-label="Пропустить"
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-2xl shadow-lg backdrop-blur-sm transition-transform active:scale-90 disabled:opacity-40"
      >
        ✕
      </button>
      {showLike && (
        <button
          type="button"
          onClick={onLike}
          disabled={disabled}
          aria-label="Нравится"
          className="flex h-20 w-20 items-center justify-center rounded-full gradient-mamba text-3xl shadow-lg shadow-[#ff4d8d]/40 transition-transform active:scale-90 disabled:opacity-40"
        >
          ❤️
        </button>
      )}
    </div>
  )
}
