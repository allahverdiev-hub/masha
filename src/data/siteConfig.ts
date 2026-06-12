export const site = {
  url: 'https://allahverdiev-hub.github.io/masha',
  title: 'Для тебя, манюнька',
  description: 'История, которая началась с одного свайпа',
}

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
