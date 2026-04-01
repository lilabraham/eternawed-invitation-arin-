import { useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { CalendarDays, ExternalLink, Heart, MapPin, Sparkles } from 'lucide-react'

import { AudioOrb } from '@/components/invitation/AudioOrb'
import { GiftRegistrySection } from '@/components/invitation/GiftRegistrySection'
import { RsvpSection } from '@/components/invitation/RsvpSection'
import { events, invitationData } from '@/content/invitationData'
import { useCountdown } from '@/hooks/useCountdown'
import { OnboardingOverlay } from '@/components/invitation/OnboardingOverlay'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 }, 
  // FIX TS ERROR: Tambahkan 'as const' agar TypeScript tidak marah
  transition: { duration: 0.6, ease: "easeOut" as const } 
}

// --- KOMPONEN EFEK LUXURY: GOLDEN STARDUST (DI DEPAN LAYAR) ---
const Stardust = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, 
      y: Math.random() * 100, 
      size: Math.random() * 2.5 + 1.5, 
      duration: Math.random() * 20 + 15, 
      delay: Math.random() * 5, 
      opacity: Math.random() * 0.6 + 0.2, 
    }))
  }, [])

  return (
    // FIX IOS: Tambahkan 'touch-none' agar partikel tidak menangkap sentuhan jari
    <div className="fixed inset-0 z-[30] pointer-events-none touch-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37] shadow-[0_0_12px_3px_rgba(212,175,55,0.6)]" 
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -1000], 
            x: p.id % 2 === 0 ? [0, 40, -40, 0] : [0, -40, 40, 0], 
            opacity: [0, p.opacity, 0], 
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
// --- AKHIR KOMPONEN STARDUST ---

export default function HomePage() {
  const quoteRef = useRef<HTMLElement | null>(null)
  const detailsRef = useRef<HTMLElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timelineRef = useRef<HTMLElement | null>(null)
  const [showOverlay, setShowOverlay] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const countdown = useCountdown(invitationData.weddingDateIso)
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 35%'],
  })

  const guestName = useMemo(() => {
    if (typeof window === 'undefined') return 'Our Dearest Guest'
    const guestParam = new URLSearchParams(window.location.search).get('to')
    if (!guestParam) return 'Our Dearest Guest'
    return guestParam.replace(/\+/g, ' ').trim() || 'Our Dearest Guest'
  }, [])

  const coupleCards = useMemo(
    () => [
      { ...invitationData.bride, accent: 'from-[hsl(var(--primary)/0.2)] to-transparent' },
      { ...invitationData.groom, accent: 'from-[hsl(var(--secondary)/0.32)] to-transparent' },
    ],
    [],
  )

  const toggleMusic = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

 const handleOpenInvitation = () => {
    // 1. Memicu animasi keluar (exit) overlay secara instan
    setShowOverlay(false)

    // 2. Memberikan jeda 600ms sebelum memutar musik agar CPU ponsel tidak kaget (menghilangkan efek "deg")
    window.setTimeout(async () => {
      if (!isPlaying && audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch {
          setIsPlaying(false)
        }
      }
    }, 600) // Musik mulai mengalun saat tirai sudah setengah terbuka
  }

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    // FIX IOS STUCK 1: Ganti 'overflow-x-hidden' menjadi 'w-full overflow-clip' 
    // Ini mencegah error stuck momentum scroll di iPhone
    <div className="mesh-background relative min-h-screen w-full overflow-clip text-foreground">
      
      <Stardust />

      <main className="relative z-10">
        {/* FIX IOS STUCK 2: Ganti min-h-screen menjadi min-h-[100dvh] */}
        {/* dvh (Dynamic Viewport Height) mencegah layar meloncat saat address bar Safari hilang/muncul */}
        <section className="relative flex min-h-[100dvh] items-end overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-12">
          <img
            src={invitationData.heroImage}
            alt="Romantic wedding couple embracing at sunset"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(54,40,32,0.12)_0%,rgba(54,40,32,0.58)_58%,rgba(24,18,14,0.98)_100%)]" />
          
          <motion.div
            // Menambahkan scale agar ada efek kedalaman (depth)
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={showOverlay ? { opacity: 0, y: 30, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
            // Menggunakan custom bezier [0.25, 1, 0.5, 1] untuk efek berhenti perlahan (Deceleration)
            transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="invitation-shell relative z-10 mx-auto grid w-full max-w-6xl gap-8 overflow-hidden rounded-[2rem] border border-white/35 bg-[hsl(var(--background)/0.18)] p-6 shadow-[0_30px_100px_rgba(70,49,35,0.22)] backdrop-blur-md md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="space-y-5 text-primary-foreground">
                {/* Bumbu 1: Bismillah kecil elegan di atas untuk sentuhan sakral */}
                <div className="soft-reveal text-white/70 font-serif text-lg tracking-widest">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </div>

                <span className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-white/85 backdrop-blur-md soft-reveal">
                  The wedding of Arin & Hisyam
                </span>
                
                <div className="space-y-2 soft-reveal"> {/* ✅ Menggunakan space-y-2 agar lebih rapat & elegan */}
                  {/* Bumbu: A Celebration of Love dengan Font Script */}
                  <p className="font-script text-4xl md:text-5xl text-[#D4AF37] capitalize tracking-normal mb-1">
                    A Celebration of Love
                  </p>
                  
                  <h1 className="luxury-title text-white text-4xl md:text-5xl leading-tight">
                    Imelia Arina Manasikana
                    {/* Simbol '&' emas yang meliuk indah */}
                    <span className="mx-3 inline-block font-script text-5xl md:text-6xl text-[#D4AF37] align-middle">&</span>
                    Afif Hisyam Arrasyid
                  </h1>

                  {/* ✅ TAMBAHAN: Wedding Ring Icon Kecil - Pembeda Utama dengan Website Biasa */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="h-px w-8 bg-[#D4AF37]/40" />
                    <Heart className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]/20" />
                    <div className="h-px w-8 bg-[#D4AF37]/40" />
                  </div>
                </div>
              <p className="luxury-copy max-w-xl text-white/90 font-light leading-relaxed">
                An intimate celebration wrapped in warm light, soft textures, and heartfelt promises. You are invited to witness the beginning of our forever.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                {/* ✅ Fungsi onClick diganti ke scrollToDetails, teks diganti 'View Details' */}
                <button
                  type="button"
                  onClick={scrollToDetails}
                  className="pulse-glow pressable h-12 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-[0_18px_45px_rgba(190,118,85,0.35)] hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  View Details
                </button>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-sm text-white/80 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--accent))]" />
                  Sabtu, 30 Mei 2026 · Randudongkal
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/30 bg-white/12 p-5 text-white backdrop-blur-xl sm:p-6">
              {/* ✅ FIX: Nama tamu dibuat seperti tulisan tangan kaligrafi di amplop VIP */}
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50 mb-1">Dear,</p>
              <p className="font-script text-3xl md:text-4xl text-[#D4AF37] tracking-normal">{guestName}</p>
              
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm text-white/70">Join us in a day of vows, blessings, and a beautifully slow celebration.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {countdown.slice(0, 2).map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/20 bg-black/10 p-4">
                      <p className="text-3xl font-semibold">{String(item.value).padStart(2, '0')}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/60">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section ref={quoteRef} {...fadeUp} className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-4xl rounded-[2rem] border border-white/45 bg-[hsl(var(--card)/0.64)] px-6 py-12 text-center shadow-[0_20px_70px_rgba(100,77,59,0.09)] backdrop-blur-2xl sm:px-10">
            <Heart className="mx-auto h-8 w-8 text-primary" />
            <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-foreground sm:text-4xl">
              “{invitationData.quote}”
            </blockquote>
            <p className="mt-4 text-sm uppercase tracking-[0.32em] text-muted-foreground">{invitationData.quoteSource}</p>
          </div>
        </motion.section>

        <section className="px-4 py-8 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-8 max-w-2xl">
              <p className="luxury-kicker">Sang Mempelai</p>
              <h2 className="luxury-section-title mt-3 text-foreground">Dua jiwa yang dipersatukan dalam satu ikatan suci.</h2>
            </motion.div>
            <div className="grid gap-5 lg:grid-cols-2">
              {coupleCards.map((person, index) => (
                <motion.div
                  key={person.name}
                  {...fadeUp}
                  // FIX TS ERROR: Gunakan as any untuk membypass strict type checking
                  transition={{ ...(fadeUp.transition as any), delay: index * 0.12 }}
                >
                  <div className="overflow-hidden rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.66)] shadow-[0_28px_70px_rgba(88,66,49,0.12)] backdrop-blur-2xl">
                    <div className="relative p-6 sm:p-8">
                      <div className={`absolute inset-0 bg-gradient-to-br ${person.accent} opacity-70`} />
                      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                        <img src={person.image} alt={person.name} className="h-28 w-28 rounded-[2rem] object-cover shadow-lg" />
                        <div className="space-y-3">
                          <p className="text-xs uppercase tracking-[0.35em] text-primary/70">{person.role}</p>
                          <div>
                            <h3 className="font-serif text-3xl text-foreground">{person.name}</h3>
                            <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">{person.description}</p>
                          </div>
                          <a
                            href={person.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-foreground transition-colors duration-300 hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Follow on Instagram
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

       {/* ✅ Pasang detailsRef di sini agar layar tahu harus scroll ke mana */}
        <section ref={detailsRef} className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-6xl space-y-8">
            <motion.div {...fadeUp} className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="luxury-kicker">Rangkaian Acara</p>
                <h2 className="luxury-section-title mt-3 text-foreground">Save the date for our sacred and joyful day.</h2>
              </div>
              <div className="grid grid-cols-4 gap-2 rounded-[1.75rem] border border-white/45 bg-[hsl(var(--card)/0.72)] p-3 shadow-[0_20px_50px_rgba(89,69,52,0.1)] backdrop-blur-xl">
                {countdown.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[hsl(var(--background)/0.8)] px-3 py-4 text-center">
                    <p className="text-2xl font-semibold text-foreground sm:text-3xl">{String(item.value).padStart(2, '0')}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-2">
              {events.map((event, index) => (
                <motion.div 
                  key={event.title} 
                  {...fadeUp} 
                  // FIX TS ERROR: Gunakan as any
                  transition={{ ...(fadeUp.transition as any), delay: index * 0.1 }}
                >
                  <div className="h-full rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.7)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
                    <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.35em] text-primary/75">{event.title}</p>
                        <h3 className="font-serif text-3xl text-foreground">{event.venue}</h3>
                      </div>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="flex gap-3"><CalendarDays className="mt-0.5 h-4 w-4 text-primary" /><div><p>{event.dateLabel}</p><p>{event.timeLabel}</p></div></div>
                        <div className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><p>{event.address}</p></div>
                      </div>
                      <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                        <a href={event.calendarUrl} target="_blank" rel="noreferrer" className="flex h-11 flex-1 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-[1.02] transition-transform">
                          Save to Calendar
                        </a>
                        <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="flex h-11 flex-1 items-center justify-center rounded-full border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--background)/0.55)] hover:scale-[1.02] transition-transform">
                          Open Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section {...fadeUp} className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-4xl space-y-12 rounded-[2rem] border border-white/45 bg-[hsl(var(--card)/0.64)] px-6 py-16 text-center shadow-[0_20px_70px_rgba(100,77,59,0.09)] backdrop-blur-2xl sm:px-12 sm:py-20">
            <div className="space-y-6">
              <p className="luxury-kicker">Doa & Restu</p>
              <h2 className="font-serif text-3xl leading-relaxed text-foreground sm:text-4xl lg:text-5xl" style={{ lineHeight: '1.6' }}>
                بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
              </h2>
              <p className="luxury-copy mx-auto max-w-2xl text-muted-foreground">
                "Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, serta mengumpulkan kalian berdua dalam kebaikan."
              </p>
              <p className="text-sm uppercase tracking-[0.32em] text-primary/80">(HR. Abu Dawud)</p>
            </div>
            <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="space-y-6">
              <p className="luxury-copy mx-auto max-w-2xl text-foreground">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
              </p>
              <div className="space-y-1 pt-4">
                <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Kami yang berbahagia,</p>
                <p className="font-serif text-2xl italic text-foreground">
                  Keluarga Besar Arin & Hisyam
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <GiftRegistrySection />
        <RsvpSection />
        
        {/* ✅ FIX: Signature di paling bawah menggunakan warna emas Luxury untuk kedua teks */}
        <section className="pb-24 pt-10 text-center">
          <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }}>
            {/* "Imelia & Afif" menggunakan emas #D4AF37/70 agar kontras dan mewah */}
            <p className="font-script text-4xl md:text-5xl text-[#D4AF37]/70">Imelia & Hisyam</p>
            {/* ✅ "Forever Begins..." diganti dari putih menjadi emas transparan #D4AF37/70 agar kontras di area terang */}
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.4em] text-[#D4AF37]/70">Forever Begins • 30 Mei 2026</p>
          </motion.div>
        </section>

      </main>

      <audio ref={audioRef} src={invitationData.musicUrl} loop preload="none" />
      
      {/* Memastikan elemen interaktif overlay dan musik tetap di atas semuanya z-[50] */}
      <div className="relative z-[50]">
        {!showOverlay && <AudioOrb isPlaying={isPlaying} onToggle={toggleMusic} />}
      </div>

      {/* MENGGUNAKAN ANIMATE PRESENCE UNTUK TRANSISI "MEMBUKA UNDANGAN" YANG SANGAT HALUS */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            key="onboarding-overlay"
            // will-change-transform mengaktifkan Hardware Acceleration agar tidak lag
            className="fixed inset-0 z-[70] origin-center will-change-transform"
            // Efek Zoom-In ke dalam layar sambil nge-blur
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} 
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }} 
          >
            <OnboardingOverlay guestName={guestName} onOpenInvitation={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}