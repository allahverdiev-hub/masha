export const backgroundMusic = {
  src: '/assets/memories/ambient.mp3',
  volume: 0.28,
}

export const telegram = {
  username: 'allahverdiew',
  prefillText: 'Я тоже хочу ❤️',
}

export function getTelegramUrl() {
  return `https://t.me/${telegram.username}?text=${encodeURIComponent(telegram.prefillText)}`
}
