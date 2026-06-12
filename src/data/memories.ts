export type HeroSection = {
  type: 'hero'
  id: string
  title: string
  subtitle: string
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

export type ParallaxPhoto = {
  src: string
  caption: string
}

export type ParallaxSection = {
  type: 'parallax'
  id: string
  title: string
  photos: ParallaxPhoto[]
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

const parallaxCaptions = [
  'Это мы с масочками лежим довольные.',
  'А это мы в кертис впервые пришли компанией.',
  'Это мы тоже в кертис любим друг друга.',
  'А это наш первый новый год совместный, мы тогда шикарный стол накрыли)',
  'А это мы в медузу пришли)',
  'Ой, а тут наш первый курорт горнолыжный)))',
  'А это мы в бар пришли)',
  'А тут мы впервые пришли в клуб.',
  'Такс, это снова в баре любим друг друга :*/',
  'А тут мы впервые посетили заведение Партизан. Было весело в этот день)',
  'Тут мы на набережной прогуливаемся мило после Партизана)',
  'А это мы пришли в Ред, отведать техаской кухни.',
  'А тут мы прогуливаемся в парке.',
  'Это без комментариев просто :D',
  'Снова прогуливаемся)',
  'А это наша первая поездка в Дагестан. Ох уж эти страшные, но красивые виды)',
  'Такс, а тут мы в Питере в 10D кинотеатре.',
  'И это мы тоже в Питере)',
  'И это тоже Питер пришли в бар)',
  'А тут мы мило сфоткались напротив елки',
  'Отлично отдохнули в Сочи на Красной поляне и у моих родителей.',
  'А это мы поднялись на гору в Красной поляне.',
]

const parallaxPhotos: ParallaxPhoto[] = parallaxCaptions.map((caption, i) => {
  const num = String(i + 1).padStart(2, '0')
  return { src: `/assets/memories/${num}.jpg`, caption }
})

export const memorySections: MemorySection[] = [
  {
    type: 'hero',
    id: 'hero',
    title: 'История, которая началась с одного свайпа',
    subtitle: 'Мы с тобой',
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
      'Я тебя сильно люблю и мне грустно, что я не был с тобою рядом в важный для тебя день.',
      'А ещё я понял, что в последнее время сильно зацикливался на работе и своей сложившейся ситуации, позабыв про наши отношения. Забыв про сюрпризики тебе и наши совместные ритуалы.',
      'Извини меня, солнышко.',
      'Я хочу и дальше продолжать строить активную и здоровую историю нашей жизни вместе. А все трудности легко и быстро преодолевать, поддерживая друг друга.',
      'Очень скучаю и жду тебя дома ❤️😘',
    ],
    closingLine: 'Надеюсь, что и ты тоже 🥰 Если да, нажми на кнопочку ниже.',
    buttonText: 'Давай продолжать строить историю вместе',
  },
  {
    type: 'finale',
    id: 'finale',
    title: 'Люблю тебя',
    subtitle: 'Навсегда твой ❤️',
    message: 'Жду тебя дома, солнышко ❤️',
  },
]
