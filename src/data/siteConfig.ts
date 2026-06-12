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

export function getTelegramAppUrl() {
  return `tg://resolve?domain=${telegram.username}&text=${encodeURIComponent(telegram.prefillText)}`
}

export function openTelegramChat() {
  const webUrl = getTelegramUrl()
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (isMobile) {
    window.location.href = getTelegramAppUrl()
    window.setTimeout(() => {
      window.location.href = webUrl
    }, 600)
    return
  }

  window.open(webUrl, '_blank', 'noopener,noreferrer')
}
