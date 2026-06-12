export type Profile = {
  id: string
  name: string
  age: number
  city: string
  bio: string
  photo: string
  isHer?: boolean
}

// Замените фото на свои в public/assets/profiles/
export const profiles: Profile[] = [
  {
    id: 'fake-1',
    name: 'Алина',
    age: 24,
    city: 'Москва',
    bio: 'Люблю путешествия и хороший кофе ☕',
    photo: 'https://picsum.photos/seed/mamba1/400/600',
  },
  {
    id: 'fake-2',
    name: 'Катя',
    age: 26,
    city: 'Санкт-Петербург',
    bio: 'Ищу интересного собеседника',
    photo: 'https://picsum.photos/seed/mamba2/400/600',
  },
  {
    id: 'fake-3',
    name: 'Мария',
    age: 23,
    city: 'Казань',
    bio: 'Фотограф и мечтательница 📷',
    photo: 'https://picsum.photos/seed/mamba3/400/600',
  },
  {
    id: 'fake-4',
    name: 'Дарья',
    age: 25,
    city: 'Екатеринбург',
    bio: 'Йога, книги и закаты',
    photo: 'https://picsum.photos/seed/mamba4/400/600',
  },
  {
    id: 'fake-5',
    name: 'София',
    age: 27,
    city: 'Новосибирск',
    bio: 'Живу в моменте ✨',
    photo: 'https://picsum.photos/seed/mamba5/400/600',
  },
  {
    id: 'her',
    name: 'Манечка',
    age: 24,
    city: 'Твой город',
    bio: 'Та самая, ради которой всё это 💕',
    photo: 'https://picsum.photos/seed/herlove/400/600',
    isHer: true,
  },
]
