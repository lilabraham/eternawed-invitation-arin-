import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, ExternalLink, Heart, Sparkles } from 'lucide-react'

import { AudioOrb } from '@/components/invitation/AudioOrb'
import { events, invitationData } from '@/content/invitationData'
import { useCountdown } from '@/hooks/useCountdown'
import { OnboardingOverlay } from '@/components/invitation/OnboardingOverlay'

// --- NEW LUXURY SECTIONS ---
import { MemoryTimelineSection } from '@/components/invitation/MemoryTimelineSection'
import { FamilyMessageSection } from '@/components/invitation/FamilyMessageSection'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 }, 
  transition: { duration: 0.6, ease: "easeOut" as const } 
}

// --- EFEK LUXURY (Di-copy dari HomePage agar FamilyPage mandiri) ---
const Stardust = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, 
      size: Math.random() * 2.5 + 1.5, duration: Math.random() * 20 + 15, 
      delay: Math.random() * 5, opacity: Math.random() * 0.6 + 0.2, 
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-[30] pointer-events-none touch-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37] shadow-[0_0_12px_3px_rgba(212,175,55,0.6)]" 
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -1000], x: p.id % 2 === 0 ? [0, 40, -40, 0] : [0, -40, 40, 0], opacity: [0, p.opacity, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
        />
      ))}
    </div>
  )
}

const FloatingPetals = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 15,
      duration: Math.random() * 20 + 25, scale: Math.random() * 0.4 + 0.3,
      opacity: Math.random() * 0.15 + 0.05,
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-[25] pointer-events-none touch-none overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-[#D4AF37]"
          style={{ left: `${p.x}vw`, top: '-10vh', opacity: p.opacity, transform: `scale(${p.scale})` }}
          animate={{ y: ['0vh', '110vh'], x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50], rotate: [0, 180, 360] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C12 0 24 6 24 12C24 18 12 24 12 24C12 24 0 18 0 12C0 6 12 0 12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

const FloralCorner = ({ className = "" }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.35" fill="none" strokeLinecap="round">
      <path d="M0,0 C60,0 120,40 150,100 C180,160 190,200 190,200" />
      <path d="M20,0 C70,20 100,70 110,130" />
      <path d="M0,20 C20,70 70,100 130,110" />
      <path d="M50,15 C70,10 90,25 85,45 C65,50 45,35 50,15 Z" />
      <path d="M15,50 C10,70 25,90 45,85 C50,65 35,45 15,50 Z" />
      <path d="M100,50 C120,45 135,60 130,80 C110,85 95,70 100,50 Z" />
      <path d="M50,100 C45,120 60,135 80,130 C85,110 70,95 50,100 Z" />
    </g>
  </svg>
)

const SectionHeader = ({ kicker, title, subtitle, icon: Icon = Sparkles }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative flex flex-col items-center justify-center text-center mx-auto max-w-2xl mb-16"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none mix-blend-screen blur-xl" />
    <div className="flex flex-col items-center gap-3 mb-6">
      <div className="h-10 w-px bg-gradient-to-b from-transparent to-[#D4AF37]/50" />
      <Icon className="h-4 w-4 text-[#D4AF37] opacity-90 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
    </div>
    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-[#D4AF37] mb-5 font-semibold">{kicker}</p>
    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-md mb-6 leading-tight">{title}</h2>
    <p className="text-sm leading-relaxed text-white/60 font-light px-4">{subtitle}</p>
    <div className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />
  </motion.div>
);

export default function FamilyPage() {
  const quoteRef = useRef<HTMLElement | null>(null)
  const detailsRef = useRef<HTMLElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showOverlay, setShowOverlay] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const countdown = useCountdown()
  
  const guestName = useMemo(() => {
    if (typeof window === 'undefined') return 'Our Beloved Family'
    const guestParam = new URLSearchParams(window.location.search).get('to')
    return guestParam ? guestParam.replace(/\+/g, ' ').trim() : 'Our Beloved Family'
  }, [])

  const coupleCards = useMemo(() => [
    { ...invitationData.bride, accent: 'from-[hsl(var(--primary)/0.2)] to-transparent' },
    { ...invitationData.groom, accent: 'from-[hsl(var(--secondary)/0.32)] to-transparent' },
  ], [])

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { try { await audioRef.current.play(); setIsPlaying(true); } catch { setIsPlaying(false); } }
  }

  const handleOpenInvitation = () => {
    setShowOverlay(false)
    window.setTimeout(async () => {
      if (!isPlaying && audioRef.current) {
        try { await audioRef.current.play(); setIsPlaying(true); } 
        catch { setIsPlaying(false); }
      }
    }, 600) 
  }

  const scrollToDetails = () => {
    if (!detailsRef.current) return
    const offsetPosition = detailsRef.current.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  return (
    <div className="mesh-background relative min-h-screen w-full overflow-clip text-foreground">
      <Stardust />
      <FloatingPetals />

      <main className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="relative flex min-h-[100dvh] items-end overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-12">
          <img src={invitationData.heroImage} alt="Couple" className="absolute inset-0 z-0 h-full w-full object-cover" />
          <div className="absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(54,40,32,0.12)_0%,rgba(54,40,32,0.58)_58%,rgba(24,18,14,0.98)_100%)]" />
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={showOverlay ? { opacity: 0, y: 30, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="invitation-shell relative z-10 mx-auto grid w-full max-w-6xl gap-8 overflow-hidden rounded-[2rem] border border-white/35 bg-[hsl(var(--background)/0.18)] p-6 shadow-[0_30px_100px_rgba(70,49,35,0.22)] backdrop-blur-md md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="absolute inset-0 z-[-1] pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.12)_0%,transparent_70%)]" />
            
            <div className="space-y-5 text-primary-foreground relative z-10">
              <div className="soft-reveal text-white/70 font-serif text-lg tracking-widest">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
              <span className="inline-flex w-fit items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#D4AF37] backdrop-blur-md soft-reveal">
                The wedding of Arin & Afif
              </span>
              <div className="space-y-3 soft-reveal">
                <p className="font-script text-4xl md:text-5xl text-[#D4AF37] capitalize tracking-normal mb-1">A Celebration Of Love</p>
                <div className="flex flex-col w-fit">
                  <h1 className="luxury-title text-white text-3xl md:text-4xl leading-snug flex flex-col text-center sm:text-left">
                    <span>Imelia Arina Manasikana</span>
                    <span className="my-2 font-script text-4xl md:text-5xl text-[#D4AF37] self-center">&</span>
                    <span>Afif Hisyam Arrasyid S.Kom</span>
                  </h1>
                  <div className="flex items-center justify-center gap-3 pt-5 pb-2">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
                    <Heart className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]/20" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
                  </div>
                </div>
              </div>
              <p className="luxury-copy max-w-xl text-white/90 font-light leading-relaxed">
                With the grace and blessing of Allah SWT, we joyfully invite you to share in our happiness.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button type="button" onClick={scrollToDetails} className="pulse-glow pressable h-12 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-[0_18px_45px_rgba(190,118,85,0.35)] hover:scale-[1.02] active:scale-95 transition-transform">
                  View Details
                </button>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-3 text-sm font-medium tracking-wide text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-md">
                  <Sparkles className="h-4 w-4" />
                  Monday, June 1, 2026 • Randudongkal
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/30 bg-white/12 p-5 text-white backdrop-blur-xl sm:p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50 mb-1">Dear,</p>
              <p className="font-script text-3xl md:text-4xl text-[#D4AF37] tracking-normal">{guestName}</p>
              <div className="mt-5 space-y-4">
                <p className="text-sm text-white/70">Join us in a day of vows, blessings, and a beautifully slow celebration.</p>
                <div className="grid grid-cols-2 gap-4">
                  {countdown.slice(0, 2).map((item) => (
                    <div key={item.label} className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-white/[0.08] to-transparent p-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent opacity-60" />
                      <div className="relative z-10 flex flex-col items-center">
                        <p className="font-serif text-4xl text-[#D4AF37] drop-shadow-md">{String(item.value).padStart(2, '0')}</p>
                        <p className="mt-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/80">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. QUOTE SECTION */}
        <motion.section ref={quoteRef} {...fadeUp} className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-4xl rounded-[2rem] border border-white/45 bg-[hsl(var(--card)/0.64)] px-6 py-12 text-center shadow-[0_20px_70px_rgba(100,77,59,0.09)] backdrop-blur-2xl sm:px-10">
            <div className="flex flex-col items-center justify-center">
              <Heart className="h-8 w-8 text-[#D4AF37] fill-[#D4AF37]/10" />
              <div className="mt-5 flex items-center gap-3 opacity-70">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </div>
            <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-foreground sm:text-4xl">
              “{invitationData.quote}”
            </blockquote>
            <p className="mt-4 text-sm uppercase tracking-[0.32em] text-muted-foreground">{invitationData.quoteSource}</p>
          </div>
        </motion.section>

        {/* 3. BRIDE & GROOM SECTION */}
        <section className="px-4 py-16 sm:px-6 lg:px-10">
          <div className="invitation-shell mx-auto max-w-6xl">
            <SectionHeader kicker="The Bride & Groom" title={<>A Celebration<br/>Of Love</>} subtitle="Two souls beautifully intertwined in a single, sacred journey." icon={Heart} />
            <div className="grid gap-20 lg:gap-12 lg:grid-cols-2">
              {coupleCards.map((person, index) => (
                <motion.div key={person.name} {...fadeUp} transition={{ ...(fadeUp.transition as any), delay: index * 0.15 }}>
                  <div className="group relative flex flex-col items-center text-center">
                    <div className="relative mb-8 w-full max-w-[260px] sm:max-w-[300px]">
                      <div className={`absolute inset-0 bg-gradient-to-t ${person.accent} blur-3xl opacity-30 transition-opacity duration-700 group-hover:opacity-50`} />
                      <motion.img animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 2 }}
                        src={person.image} alt={person.name} className="relative z-10 aspect-[3/4] w-full object-cover rounded-t-full rounded-b-[2.5rem] border border-[#D4AF37]/30 shadow-[0_24px_50px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.02]" 
                      />
                    </div>
                    <div className="space-y-4 px-4 relative z-20">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">{person.role}</p>
                      <h3 className="font-serif text-4xl sm:text-5xl text-white drop-shadow-md">{person.name}</h3>
                      <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/60">{person.description}</p>
                      <a href={person.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 pt-4 text-[0.65rem] uppercase tracking-widest text-white/40 transition-colors duration-300 hover:text-[#D4AF37]">
                        <ExternalLink className="h-3 w-3" /> Follow on Instagram
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SACRED MOMENTS SECTION */}
        <section ref={detailsRef} className="relative px-4 py-28 sm:px-6 lg:px-10 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
          <div className="invitation-shell relative z-10 mx-auto max-w-6xl space-y-14">
            <div className="flex flex-col items-center justify-center gap-8">
              <SectionHeader kicker="Sacred Moments" title="The Sacred Milestones" subtitle={<>That mark the beginning<br className="hidden sm:block" /> of our forever.</>} icon={CalendarDays} />
              <div className="flex items-center gap-4 md:gap-6 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03] px-6 py-3 shadow-[0_0_30px_rgba(212,175,55,0.03)] backdrop-blur-md -mt-8 relative z-20">
                {countdown.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-4 md:gap-6">
                    <div className="flex flex-col items-center min-w-[2.5rem]">
                      <span className="font-serif text-2xl leading-none text-[#D4AF37]/90 drop-shadow-sm">{String(item.value).padStart(2, '0')}</span>
                      <span className="mt-1.5 text-[0.55rem] uppercase tracking-[0.4em] text-white/40">{item.label}</span>
                    </div>
                    {index < countdown.length - 1 && <div className="h-8 w-px bg-white/10" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-5 lg:gap-8 lg:grid-cols-2 pt-6">
              {[...events].sort((a, b) => (a.isHighlight === b.isHighlight ? 0 : a.isHighlight ? 1 : -1)).map((event, index) => (
                <motion.div key={event.title} {...fadeUp} transition={{ ...(fadeUp.transition as any), delay: index * 0.15 }} className={event.isHighlight ? "lg:col-span-2 mx-auto w-full max-w-[58rem]" : "flex flex-col h-full"}>
                  <div className={`relative flex h-full flex-col overflow-hidden transition-all duration-700 ${event.isHighlight ? "rounded-[2.5rem] bg-gradient-to-b from-[#1e1712] to-[#100d0b] border border-[#D4AF37]/25 shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_8px_80px_rgba(212,175,55,0.10),0_32px_100px_rgba(0,0,0,0.6)] p-8 sm:p-12 lg:p-16" : "rounded-[1.75rem] bg-white/[0.025] border border-white/[0.07] shadow-none p-6 sm:p-8 opacity-70 hover:opacity-90 transition-opacity duration-500"}`}>
                    {event.isHighlight && (
                      <>
                        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(212,175,55,0.07)_0%,transparent_70%)] mix-blend-screen" />
                        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 z-0 bg-gradient-to-t from-[rgba(212,175,55,0.04)] to-transparent" />
                      </>
                    )}
                    <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${event.isHighlight ? "opacity-100" : "opacity-40"}`}>
                      <FloralCorner className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 text-[#D4AF37]" />
                      <FloralCorner className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 text-[#D4AF37] scale-x-[-1]" />
                      <FloralCorner className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 text-[#D4AF37] scale-y-[-1]" />
                      <FloralCorner className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 text-[#D4AF37] scale-x-[-1] scale-y-[-1]" />
                    </div>
                    <div className="relative z-10 flex h-full flex-col">
                      <div className={`${event.isHighlight ? "mb-12 text-center" : "mb-7 text-left"}`}>
                        {event.isHighlight && (
                          <div className="mb-5 flex items-center justify-center gap-3">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                            <span className="text-[0.6rem] uppercase tracking-[0.5em] text-[#D4AF37]/80">The Main Celebration</span>
                            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
                          </div>
                        )}
                        <p className={`text-[0.6rem] uppercase tracking-[0.45em] ${event.isHighlight ? "text-white/45 mb-4" : "text-white/30 mb-3"}`}>{event.title}</p>
                        <h3 className={`font-serif leading-[1.1] ${event.isHighlight ? "text-4xl sm:text-5xl lg:text-6xl text-white" : "text-2xl sm:text-[1.65rem] text-white/65"}`}>{event.venue}</h3>
                        {event.isHighlight && <div className="mt-9 flex justify-center"><div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" /></div>}
                      </div>
                      <div className={`${event.isHighlight ? "mx-auto w-full max-w-2xl grid sm:grid-cols-2 gap-8 text-center sm:text-left" : "grid gap-5 text-left text-sm"}`}>
                        <div className={`flex flex-col gap-1 ${event.isHighlight ? "items-center sm:items-start" : "items-start"}`}>
                          <p className={`text-[0.58rem] uppercase tracking-[0.4em] ${event.isHighlight ? "text-[#D4AF37]/55 mb-1" : "text-white/25"}`}>When</p>
                          <p className={`font-serif ${event.isHighlight ? "text-xl text-[#D4AF37]" : "text-white/60 text-sm"}`}>{event.dateLabel}</p>
                          <p className={`mt-0.5 uppercase tracking-widest ${event.isHighlight ? "text-[0.68rem] text-white/45" : "text-[0.65rem] text-white/35"}`}>{event.timeLabel}</p>
                        </div>
                        <div className={`flex flex-col gap-1 ${event.isHighlight ? "items-center sm:items-start" : "items-start"}`}>
                          <p className={`text-[0.58rem] uppercase tracking-[0.4em] ${event.isHighlight ? "text-[#D4AF37]/55 mb-1" : "text-white/25"}`}>Where</p>
                          <p className={`leading-relaxed ${event.isHighlight ? "text-sm text-white/65 max-w-xs" : "text-sm text-white/45"}`}>{event.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. NEW: MEMORY TIMELINE SECTION */}
        <MemoryTimelineSection />

        {/* 6. NEW: FAMILY MESSAGE SECTION */}
        <FamilyMessageSection />

        {/* 7. FOOTER */}
        <section className="pb-24 pt-10 text-center">
          <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }}>
            <p className="font-script text-4xl md:text-5xl text-[#D4AF37]/70">Arin & Afif</p>
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.4em] text-[#D4AF37]/70">Forever Begins • 1 June 2026</p>
          </motion.div>
        </section>
      </main>

      <audio ref={audioRef} src={invitationData.musicUrl} loop preload="none" />
      
      <div className="relative z-[50]">
        {!showOverlay && <AudioOrb isPlaying={isPlaying} onToggle={toggleMusic} />}
      </div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            key="onboarding-overlay" className="fixed inset-0 z-[70] origin-center will-change-transform"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }} 
          >
            <OnboardingOverlay guestName={guestName} onOpenInvitation={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}