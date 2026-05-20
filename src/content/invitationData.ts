export const invitationData = {
  bride: {
    name: 'Imelia Arina Manasikana',
    role: 'The Bride',
    description: 'Putri tercinta dari Bapak & Ibu yang senantiasa menebar kebaikan dan kehangatan dalam setiap langkahnya.',
    instagram: 'https://www.instagram.com/hi_mnskn?igsh=MXRyNnRoZ3J5cWZucg%3D%3D&utm_source=qr',
    image: 'https://images.unsplash.com/photo-1705041217531-4443b6ecf8bc?q=80&w=900', // Gunakan foto Imelia
  },
  groom: {
    name: 'Afif Hisyam Arrasyid S.kom',
    role: 'The Groom',
    description: 'Putra kebanggaan keluarga yang berdedikasi, dan membangun masa depan dengan ketulusan hati.',
    instagram: 'https://www.instagram.com/affhisyam?igsh=MTkweG85a2ZsaDg3OA==',
    image: 'https://images.unsplash.com/photo-1710587384936-b6d796c0eb58?q=80&w=900', // Gunakan foto Afif
  },
  // PENGGANTI FOTO HERO: Menggunakan tekstur cahaya & bayangan estetik bernuansa hangat (Luxury Aesthetic)
  heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1600',
  quote: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
  quoteSource: 'QS. Ar-Rum: 21',
  weddingDateIso: '2026-05-30T09:00:00+07:00', // 30 Mei 2026
  musicUrl: '/musik.mp3',
}

export const events = [
  {
    id: 'akad',
    title: 'Akad Nikah', // Tetap mempertahankan istilah sakral/budaya
    dateLabel: 'Sunday May 31, 2026',
    timeLabel: '09:00 AM onwards', // Mengubah '09.00 WIB - Selesai' agar lebih elegan
    venue: 'Kediaman Mempelai Wanita',
    address: 'Jl. Lkr. Utara No.02, Dusun I, Randudongkal, Kec. Randudongkal, Kabupaten Pemalang, Jawa Tengah 52353 (Masuk gang Yuna Print)',
    mapsUrl: 'https://www.google.com/maps?q=-7.096988037704065,109.32443035659291',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Imelia+%26+Afif&dates=20260531T020000Z/20260531T050000Z',
    isHighlight: false,
  },
  {
    id: 'resepsi',
    title: 'Wedding Reception', // Diubah ke bahasa Inggris agar senada dengan "The Main Celebration"
    dateLabel: 'Monday June 1, 2026',
    timeLabel: '09:00 AM onwards',
    venue: 'Kediaman Mempelai Wanita',
    address: 'Jl. Lkr. Utara No.02, Dusun I, Randudongkal, Kec. Randudongkal, Kabupaten Pemalang, Jawa Tengah 52353 (Masuk gang Yuna Print)',
    mapsUrl: 'https://www.google.com/maps?q=-7.096988037704065,109.32443035659291',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception+Imelia+%26+Afif&dates=20260601T020000Z/20260601T070000Z',
    isHighlight: true,
  },
  {
    id: 'ngunduh',
    title: 'Ngunduh Mantu', // Tetap mempertahankan istilah budaya
    dateLabel: 'June 5 & 6, 2026', // Format simpel dan elegan untuk 2 hari
    timeLabel: '09:00 AM onwards',
    venue: 'Kediaman Mempelai Pria',
    address: 'Jl. Tlangu Tengah, Tlangu, Sukorejo, Kec. Sukorejo, Kabupaten Kendal, Jawa Tengah 51363',
    mapsUrl: 'https://www.google.com/maps?q=-7.080696,110.048975',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ngunduh+Mantu+Imelia+%26+Afif&dates=20260605T020000Z/20260606T100000Z',
    isHighlight: false,
  },
] as const;