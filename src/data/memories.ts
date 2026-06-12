export type HeroSection = {
  type: 'hero'
  id: string
  title: string
  subtitle: string
  date: string
  photo: string
}

export type TimelineItem = {
  date?: string
  title: string
  description: string
  variant?: 'default' | 'sub'
}

export type TimelineSection = {
  type: 'timeline'
  id: string
  title: string
  items: TimelineItem[]
}

export type ParallaxSection = {
  type: 'parallax'
  id: string
  title: string
  photos: { src: string }[]
}

export type LoveMessageSection = {
  type: 'loveMessage'
  id: string
  photos: [string, string]
  paragraphs: string[]
  highlight: string
  closingLine: string
  buttonText: string
}

export type FinaleSection = {
  type: 'finale'
  id: string
  title: string
  subtitle: string
  message?: string
}

export type MemorySection =
  | HeroSection
  | TimelineSection
  | ParallaxSection
  | LoveMessageSection
  | FinaleSection

const parallaxPhotos = Array.from({ length: 22 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0')
  return { src: `/assets/memories/${num}.jpg` }
})

export const memorySections: MemorySection[] = [
  {
    type: 'hero',
    id: 'hero',
    title: 'История, которая началась с одного свайпа',
    subtitle: 'Мы с тобой',
    date: 'День, когда мы познакомились',
    photo: '/assets/memories/hero.jpg',
  },
  {
    type: 'timeline',
    id: 'timeline',
    title: 'Наша история',
    items: [
      {
        date: 'Первый день',
        title: 'Знакомство в Mamba',
        description:
          'Среди всех девушек ты приглянулась мне сильнее всего, а моё любопытство ещё разожгло твой спортивный опыт',
      },
      {
        date: 'Переписка',
        title: 'Тот самый чат',
        description:
          'Я помню что мы могли по долгу переписываться и болтать о разном, даже помню как обсуждали тёмное нефильтрованное твоё в Белке 😂',
      },
      {
        date: 'Первое свидание',
        title: 'Встреча вживую',
        description:
          'Помню как мы встретились в Аймоле. Я слегка умилился, что ты небольшого роста, но меня это не беспокоило) Мы пошли в Пышку. Я тебя распрашивал обо всем будто мы на интервью) Но потом разговор пошёл сам по себе легко.',
      },
      {
        title: 'Начало наших крепких отношений',
        description:
          'Помню, как мы встретились в 62 лаундж в випке и я тебя впервые поцеловал 🥰. Ты тогда немного засмущалась 🥰',
        variant: 'sub',
      },
      {
        date: 'Сегодня',
        title: 'Каждый день с тобой',
        description:
          'Каждый момент рядом с тобой — маленькое чудо, как и ты моя манюнька ❤️. И это только начало 🥰',
      },
    ],
  },
  {
    type: 'parallax',
    id: 'parallax',
    title: 'Наши моменты',
    photos: parallaxPhotos,
  },
  {
    type: 'loveMessage',
    id: 'loveMessage',
    photos: ['/assets/memories/apology-1.jpg', '/assets/memories/apology-2.jpg'],
    highlight: 'Ты моя самая лучшая чудо-девушка!',
    paragraphs: [
      'Я тебя очень сильно люблю и мне очень грустно, что я не был с тобою рядом в важный для тебя день.',
      'Извини меня, солнышко. Надеюсь, что ты не сердишься.',
      'Я хочу и дальше продолжать строить историю нашей жизни вместе.',
    ],
    closingLine: 'Надеюсь, что и ты тоже 🥰 Если да, нажми на кнопочку ниже.',
    buttonText: 'Давай продолжать строить историю вместе',
  },
  {
    type: 'finale',
    id: 'finale',
    title: 'Люблю тебя',
    subtitle: 'Навсегда твой ❤️',
    message: 'Я хочу продолжать и дальше строить эту историю с тобой.',
  },
]
