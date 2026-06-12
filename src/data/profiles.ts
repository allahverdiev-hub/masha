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
    id: 'her',
    name: 'Манечка',
    city: 'Пермь',
    bio: 'Занимаюсь в зале и танцую на пилоне',
    photo: '/assets/profiles/masha.jpg',
    footerCaption: 'Моя самая любимая чудо-девушка',
    isHer: true,
  },
]
