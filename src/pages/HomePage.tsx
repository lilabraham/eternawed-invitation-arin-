import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarDays, ExternalLink, Heart, MapPin, Sparkles } from 'lucide-react'

// Import @blinkdotnew/ui dihapus

import { AudioOrb } from '@/components/invitation/AudioOrb'
import { GiftRegistrySection } from '@/components/invitation/GiftRegistrySection'
import { RsvpSection } from '@/components/invitation/RsvpSection'
import { events, galleryPhotos, invitationData, loveStory } from '@/content/invitationData'
import { useCountdown } from '@/hooks/useCountdown'
import { OnboardingOverlay } from '@/components/invitation/OnboardingOverlay'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 }, // Mengubah 0.25 jadi 0.1 (Scroll enteng)
  transition: { duration: 0.6 } // Menghapus parameter 'ease' yang bikin error
}

export default function HomePage() {
  const quoteRef = useRef<HTMLElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timelineRef = useRef<HTMLElement | null>(null)
  const [showOverlay, setShowOverlay] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const countdown = useCountdown(invitationData.weddingDateIso)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 35%'],
  })
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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

  const handleOpenInvitation = async () => {
    setShowOverlay(false)

    window.setTimeout(async () => {
      quoteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (!isPlaying) {
        try {
          await audioRef.current?.play()
          setIsPlaying(true)
        } catch {
          setIsPlaying(false)
        }
      }
    }, 80)
  }

  return (
    <div className="mesh-background min-h-screen overflow-x-hidden text-foreground">
      <main>
        <section className="relative flex min-h-screen items-end overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-12">
          <img
            src={invitationData.heroImage}
            alt="Romantic wedding couple embracing at sunset"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(54,40,32,0.12)_0%,rgba(54,40,32,0.58)_58%,rgba(247,243,237,0.9)_100%)]" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="invitation-shell relative mx-auto grid w-full max-w-6xl gap-8 overflow-hidden rounded-[2rem] border border-white/35 bg-[hsl(var(--background)/0.18)] p-6 shadow-[0_30px_100px_rgba(70,49,35,0.22)] backdrop-blur-md md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="space-y-5 text-primary-foreground">
              <span className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-white/85 backdrop-blur-md soft-reveal">
                The wedding of Arin & Hisyam
              </span>
              <div className="space-y-3 soft-reveal">
                <p className="text-sm uppercase tracking-[0.35em] text-white/80">A modern digital invitation</p>
                <h1 className="luxury-title text-white">
                  Imelia Arina Manasikana
                  <span className="mx-2 inline-block text-[hsl(var(--accent))]">&</span>
                  Afif Hisyam Arrasyid
                </h1>
              </div>
              <p className="luxury-copy max-w-xl text-white/82">
                An intimate celebration wrapped in warm light, soft textures, and heartfelt promises. You are invited to witness the beginning of our forever.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className="pulse-glow pressable h-12 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-[0_18px_45px_rgba(190,118,85,0.35)] hover:scale-[1.02] active:scale-95"
                >
                  Open Invitation
                </button>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-sm text-white/80 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--accent))]" />
                  Sabtu, 30 Mei 2026 · Randudongkal
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/30 bg-white/12 p-5 text-white backdrop-blur-xl sm:p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-white/70">{guestName}</p>
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
              <p className="luxury-kicker">The Couple</p>
              <h2 className="luxury-section-title mt-3 text-foreground">Two souls, one intentional story.</h2>
            </motion.div>
            <div className="grid gap-5 lg:grid-cols-2">
              {coupleCards.map((person, index) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
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

        <section className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-6xl space-y-8">
            <motion.div {...fadeUp} className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="luxury-kicker">Event Details</p>
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
                <motion.div key={event.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.1 }}>
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

        <section ref={timelineRef} className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 max-w-2xl">
              <p className="luxury-kicker">Love Story</p>
              <h2 className="luxury-section-title mt-3 text-foreground">A timeline of quiet beginnings and certain promises.</h2>
            </motion.div>

            <div className="relative">
              <div className="timeline-rail absolute bottom-0 left-[18px] top-0 w-[2px] md:left-1/2 md:-translate-x-1/2" />
              <motion.div
                style={{ height: timelineHeight }}
                className="absolute left-[18px] top-0 w-[2px] rounded-full bg-primary md:left-1/2 md:-translate-x-1/2"
              />

              <div className="space-y-10 md:space-y-2">
                {loveStory.map((story, index) => {
                  const isRight = index % 2 === 1

                  return (
                    <motion.div
                      key={story.title}
                      initial={{ opacity: 0, x: isRight ? 32 : -32, y: 24 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.7, delay: index * 0.08 }}
                      className="relative grid gap-4 md:grid-cols-2 md:gap-10"
                    >
                      <div className={isRight ? 'md:col-start-2' : 'md:col-start-1'}>
                        <div className="ml-12 rounded-[1.75rem] border border-white/45 bg-[hsl(var(--card)/0.72)] shadow-[0_22px_70px_rgba(88,66,49,0.1)] backdrop-blur-2xl md:ml-0">
                          <div className="space-y-3 p-6">
                            <p className="text-xs uppercase tracking-[0.35em] text-primary/75">{story.year}</p>
                            <h3 className="font-serif text-2xl text-foreground">{story.title}</h3>
                            <p className="text-sm leading-7 text-muted-foreground">{story.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-[18px] top-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[hsl(var(--background))] bg-primary shadow-[0_0_0_8px_hsl(var(--card)/0.7)] md:left-1/2" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-10 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 max-w-2xl">
              <p className="luxury-kicker">Gallery</p>
              <h2 className="luxury-section-title mt-3 text-foreground">Pre-wedding frames in a soft bento composition.</h2>
            </motion.div>

            <div className="grid auto-rows-[180px] gap-4 md:grid-cols-3 md:auto-rows-[220px]">
              {galleryPhotos.map((photo, index) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  className={`gallery-card group relative overflow-hidden rounded-[1.75rem] border border-white/40 bg-[hsl(var(--card)/0.5)] shadow-[0_22px_60px_rgba(88,66,49,0.12)] backdrop-blur-xl ${photo.className}`}
                >
                  <motion.img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <GiftRegistrySection />
        <RsvpSection />
      </main>
      <audio ref={audioRef} src={invitationData.musicUrl} loop preload="none" />
      {!showOverlay && <AudioOrb isPlaying={isPlaying} onToggle={toggleMusic} />}

      {showOverlay && (
        <OnboardingOverlay guestName={guestName} onOpenInvitation={handleOpenInvitation} />
      )}
    </div>
  )
}