export type HeroSection = {
  type: 'hero'
  id: string
  title: string
  subtitle: string
  date: string
  photo: string
}

export type TimelineItem = {
  date: string
  title: string
  description: string
}

export type TimelineSection = {
  type: 'timeline'
  id: string
  title: string
  items: TimelineItem[]
}

export type GallerySection = {
  type: 'gallery'
  id: string
  title: string
  photos: { src: string; caption?: string }[]
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
  | GallerySection
  | FinaleSection

const galleryPhotos = Array.from({ length: 22 }, (_, i) => {
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
          'Ты написала первой — или я? Главное, что мы нашли друг друга в бесконечной ленте анкет.',
      },
      {
        date: 'Первое сообщение',
        title: 'Тот самый чат',
        description:
          'Переписка, от которой не хотелось отрываться. Смайлики, шутки, и ощущение — вот оно.',
      },
      {
        date: 'Первое свидание',
        title: 'Встреча вживую',
        description:
          'Волнение, улыбки и понимание: всё это было не зря. Лучший день.',
      },
      {
        date: 'Сегодня',
        title: 'Каждый день с тобой',
        description:
          'Каждый момент рядом с тобой — маленькое чудо. И это только начало.',
      },
    ],
  },
  {
    type: 'gallery',
    id: 'gallery',
    title: 'Наши моменты',
    photos: galleryPhotos,
  },
  {
    type: 'finale',
    id: 'finale',
    title: 'Люблю тебя',
    subtitle: 'Навсегда твой ❤️',
    message: 'Я хочу продолжать и дальше строить эту историю с тобой.',
  },
]
