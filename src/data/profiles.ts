export type Profile = {
  id: string
  name: string
  age: number
  city: string
  bio: string
  photo: string
  isHer?: boolean
  footerCaption?: string
}

export const profiles: Profile[] = [
  {
    id: 'fake-1',
    name: 'Алина',
    age: 24,
    city: 'Москва',
    bio: 'Люблю путешествия и хороший кофе ☕',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 'fake-2',
    name: 'Катя',
    age: 26,
    city: 'Санкт-Петербург',
    bio: 'Ищу интересного собеседника',
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: 'fake-3',
    name: 'Мария',
    age: 23,
    city: 'Казань',
    bio: 'Фотограф и мечтательница 📷',
    photo: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: 'fake-4',
    name: 'Дарья',
    age: 25,
    city: 'Екатеринбург',
    bio: 'Йога, книги и закаты',
    photo: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: 'fake-5',
    name: 'София',
    age: 27,
    city: 'Новосибирск',
    bio: 'Живу в моменте ✨',
    photo: 'https://randomuser.me/api/portraits/women/71.jpg',
  },
  {
    id: 'her',
    name: 'Маша',
    age: 24,
    city: 'Пермь',
    bio: 'Занимаюсь в зале и танцую на пилоне',
    photo: '/assets/profiles/masha.jpg',
    footerCaption: 'Моя самая любимая чудо-девушка',
    isHer: true,
  },
]
