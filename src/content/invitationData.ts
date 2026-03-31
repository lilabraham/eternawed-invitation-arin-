export const invitationData = {
  bride: {
    name: 'Imelia Arina Manasikana',
    role: 'The Bride',
    description: 'Putri tercinta dari Bapak & Ibu yang senantiasa menebar kebaikan dan kehangatan dalam setiap langkahnya.',
    instagram: 'https://instagram.com/imelia.arina',
    image: 'https://images.unsplash.com/photo-1705041217531-4443b6ecf8bc?q=80&w=900', // Gunakan foto Imelia
  },
  groom: {
    name: 'Afif Hisyam Arrasyid',
    role: 'The Groom',
    description: 'Putra kebanggaan keluarga yang berdedikasi, penuh tanggung jawab, dan membangun masa depan dengan ketulusan hati.',
    instagram: 'https://instagram.com/afif.hisyam',
    image: 'https://images.unsplash.com/photo-1710587384936-b6d796c0eb58?q=80&w=900', // Gunakan foto Afif
  },
  heroImage: 'https://images.unsplash.com/photo-1761211488173-a7154314420a?q=80&w=1600',
  quote: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
  quoteSource: 'QS. Ar-Rum: 21',
  weddingDateIso: '2026-05-30T09:00:00+07:00', // 30 Mei 2026
  musicUrl: '/musik.mp3',
}

export const events = [
  {
    title: 'Akad Nikah',
    dateLabel: 'Sabtu, 30 Mei 2026',
    timeLabel: '09.00 WIB - Selesai',
    venue: 'Kediaman Mempelai Wanita',
    address: 'Jl. Lkr. Utara No.02, Dusun I, Randudongkal, Kec. Randudongkal, Kabupaten Pemalang, Jawa Tengah 52353 (Masuk gang Yuna Print)',
    mapsUrl: 'https://www.google.com/maps?q=-7.096988037704065, 109.32443035659291', // Sesuai alamat Pemalang
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Imelia+%26+Afif&dates=20260530T020000Z/20260530T040000Z',
  },
  {
    title: 'Resepsi',
    dateLabel: 'Minggu, 31 Mei 2026',
    timeLabel: '09.00 WIB - Selesai',
    venue: 'Kediaman Mempelai Wanita',
    address: 'Jl. Lkr. Utara No.02, Dusun I, Randudongkal, Kabupaten Pemalang, Jawa Tengah 52353 (Masuk gang Yuna Print).',
    mapsUrl: 'https://www.google.com/maps?q=-7.096988037704065, 109.32443035659291',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Imelia+%26+Afif&dates=20260530T060000Z/20260530T090000Z',
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
