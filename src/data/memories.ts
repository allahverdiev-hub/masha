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

export type QuoteSection = {
  type: 'quote'
  id: string
  quotes: { text: string; author?: string }[]
}

export type FinaleSection = {
  type: 'finale'
  id: string
  title: string
  subtitle: string
}

export type MemorySection =
  | HeroSection
  | TimelineSection
  | GallerySection
  | QuoteSection
  | FinaleSection

export const memorySections: MemorySection[] = [
  {
    type: 'hero',
    id: 'hero',
    title: 'Мы',
    subtitle: 'История, которая началась с одного свайпа',
    date: 'День, когда мы познакомились',
    photo: 'https://picsum.photos/seed/ourlove/800/1200',
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
    photos: [
      { src: 'https://picsum.photos/seed/mem1/600/800', caption: 'Момент 1' },
      { src: 'https://picsum.photos/seed/mem2/600/800', caption: 'Момент 2' },
      { src: 'https://picsum.photos/seed/mem3/600/800', caption: 'Момент 3' },
      { src: 'https://picsum.photos/seed/mem4/600/800', caption: 'Момент 4' },
      { src: 'https://picsum.photos/seed/mem5/600/800', caption: 'Момент 5' },
      { src: 'https://picsum.photos/seed/mem6/600/800', caption: 'Момент 6' },
    ],
  },
  {
    type: 'quote',
    id: 'quotes',
    quotes: [
      {
        text: 'С тобой даже обычный день становится особенным.',
      },
      {
        text: 'Ты — лучший сюрприз, который случился со мной.',
      },
      {
        text: 'Люблю тебя больше, чем слова могут передать.',
      },
    ],
  },
  {
    type: 'finale',
    id: 'finale',
    title: 'Люблю тебя',
    subtitle: 'Навсегда твой ❤️',
  },
]
