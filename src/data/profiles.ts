export type Profile = {
  id: string
  name: string
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
    city: 'Москва',
    bio: 'Люблю путешествия и хороший кофе ☕',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 'fake-2',
    name: 'Катя',
    city: 'Санкт-Петербург',
    bio: 'Ищу интересного собеседника',
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: 'fake-3',
    name: 'Мария',
    city: 'Казань',
    bio: 'Фотограф и мечтательница 📷',
    photo: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: 'fake-4',
    name: 'Дарья',
    city: 'Екатеринбург',
    bio: 'Йога, книги и закаты',
    photo: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: 'fake-5',
    name: 'София',
    city: 'Новосибирск',
    bio: 'Живу в моменте ✨',
    photo: 'https://randomuser.me/api/portraits/women/71.jpg',
  },
  {
    id: 'her',
    name: 'Манечка',
    city: 'Пермь',
    bio: 'Занимаюсь в зале и танцую на пилоне',
    photo: '/assets/profiles/masha.jpg',
    footerCaption: 'Моя самая любимая чудо-девушка',
    isHer: true,
  },
]
