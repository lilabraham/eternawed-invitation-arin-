export const invitationData = {
  bride: {
    name: 'Alya Nadine',
    role: 'The Bride',
    description:
      'A warm-hearted architect who turns quiet moments into beautiful stories and finds magic in thoughtful details.',
    instagram: 'https://instagram.com/alya.nadine',
    image:
      'https://images.unsplash.com/photo-1705041217531-4443b6ecf8bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  groom: {
    name: 'Raka Mahendra',
    role: 'The Groom',
    description:
      'A calm creative strategist with a love for timeless design, soft jazz, and making every promise feel intentional.',
    instagram: 'https://instagram.com/raka.mahendra',
    image:
      'https://images.unsplash.com/photo-1710587384936-b6d796c0eb58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  heroImage:
    'https://images.unsplash.com/photo-1761211488173-a7154314420a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
  quote:
    'And over all these virtues put on love, which binds them all together in perfect unity.',
  quoteSource: 'Colossians 3:14',
  weddingDateIso: '2026-09-12T09:00:00+07:00',
  musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
}

export const events = [
  {
    title: 'Akad Nikah',
    dateLabel: 'Saturday, 12 September 2026',
    timeLabel: '09.00 WIB - 11.00 WIB',
    venue: 'Bumi Aruna Pavilion, Jakarta Selatan',
    address: 'Jl. Aruna Raya No. 18, Cilandak, Jakarta Selatan',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Bumi+Aruna+Pavilion+Jakarta+Selatan',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Alya+%26+Raka&dates=20260912T020000Z/20260912T040000Z&details=Join+our+akad+nikah+celebration.&location=Bumi+Aruna+Pavilion+Jakarta+Selatan',
  },
  {
    title: 'Resepsi',
    dateLabel: 'Saturday, 12 September 2026',
    timeLabel: '18.30 WIB - 21.00 WIB',
    venue: 'Atelier Garden Hall, Jakarta Selatan',
    address: 'Jl. Taman Senja No. 27, Kebayoran Baru, Jakarta Selatan',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Atelier+Garden+Hall+Jakarta+Selatan',
    calendarUrl:
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Alya+%26+Raka&dates=20260912T113000Z/20260912T140000Z&details=Celebrate+with+us+at+our+wedding+reception.&location=Atelier+Garden+Hall+Jakarta+Selatan',
  },
] as const

export const loveStory = [
  {
    year: '2021',
    title: 'First Met',
    description:
      'We met through a mutual friend at a small coffee tasting and ended up talking long after everyone else had left.',
  },
  {
    year: '2022',
    title: 'Our First Date',
    description:
      'A gallery date turned into dinner, a city walk, and the first time we both felt life slow down in the best way.',
  },
  {
    year: '2024',
    title: 'The Proposal',
    description:
      'At golden hour, in the middle of our favorite quiet escape, one question made every chapter feel destined.',
  },
  {
    year: '2026',
    title: 'Forever Begins',
    description:
      'Now we are counting down to the day we celebrate love, family, and a lifetime of growing together.',
  },
] as const

export const galleryPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1549578117-eee85f4c009b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    alt: 'Bride and groom standing together in warm natural light',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1511405889574-b01de1da5441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    alt: 'Couple silhouette during sunset for wedding gallery',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1652195720148-4f6d3d761aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    alt: 'Romantic close wedding portrait of the couple',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1761211488173-a7154314420a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    alt: 'Elegant wedding couple embracing at sunset',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    alt: 'Bride portrait with dramatic soft shadows',
    className: 'md:col-span-1 md:row-span-1',
  },
] as const
