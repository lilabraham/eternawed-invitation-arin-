import { FormEvent, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Import @blinkdotnew/ui dihapus karena module not found

import { useCreateRsvpEntry, useRsvpEntries } from '@/hooks/useInvitationData'

const marquee = {
  animate: { x: ['0%', '-50%'] },
  transition: { duration: 24, repeat: Infinity, ease: 'linear' as const },
}

export function RsvpSection() {
  const { data: wishes = [], isLoading } = useRsvpEntries()
  const createRsvp = useCreateRsvpEntry()
  const [form, setForm] = useState({
    guestName: '',
    guestCount: '1',
    attendanceStatus: 'attending',
    message: '',
  })

  const marqueeItems = useMemo(() => {
    if (wishes.length === 0) return []
    return [...wishes, ...wishes]
  }, [wishes])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.guestName.trim()) {
      alert('Please enter your name')
      return
    }

    try {
      await createRsvp.mutateAsync({
        guestName: form.guestName.trim(),
        guestCount: form.guestCount,
        attendanceStatus: form.attendanceStatus,
        message: form.message.trim(),
      })
      setForm({ guestName: '', guestCount: '1', attendanceStatus: 'attending', message: '' })
      alert('RSVP sent\nThank you for sharing your presence and wishes.')
    } catch {
      alert('Could not send RSVP')
    }
  }

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="invitation-shell mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mb-10 max-w-2xl">
          
          {/* ✅ 1. Kicker: Emas Terang dengan Text-Shadow Emas (Boost Kontras) */}
          <p className="luxury-kicker text-[#E6C35C] font-semibold drop-shadow-[0_1.2px_1.2px_rgba(212,175,55,0.4)]">
            RSVP & Wishes
          </p>
          
          {/* ✅ 2. Judul: Off-White Terang (text-white/95) dengan Text-Shadow Emas */}
          <h2 className="luxury-section-title mt-3 text-white/95 drop-shadow-[0_2px_2px_rgba(212,175,55,0.25)]">
            Be Our Guest
          </h2> {/* ✅ FIX: Ini sebelumnya tertulis </p>, sekarang sudah benar </h2> */}
          
          {/* ✅ 3. Deskripsi: Putih Terang agar mudah dibaca */}
          <p className="luxury-copy mt-4 text-foreground font-normal leading-relaxed text-white/90">
            Let us know you’ll be joining us, and kindly leave a heartfelt note we’ll keep close to our hearts.
          </p>
          
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.75)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
            <div className="p-6 sm:p-8">
              {/* ✅ FIX: Form Labels & Placeholders diganti menjadi bahasa Inggris Editorial yang elegan */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">Reserved for your presence</p>
                  <label className="text-sm text-muted-foreground">Kindly provide your full name</label>
                  <input 
                    type="text" 
                    value={form.guestName} 
                    onChange={(e) => setForm((prev) => ({ ...prev, guestName: e.target.value }))} 
                    placeholder="e.g., Mr. & Mrs. Anderson" 
                    className="h-12 w-full px-4 outline-none rounded-2xl bg-[hsl(var(--background)/0.7)] border border-transparent transition-colors focus:border-[#D4AF37]/50" 
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Party size</label>
                    <select 
                      value={form.guestCount} 
                      onChange={(e) => setForm((prev) => ({ ...prev, guestCount: e.target.value }))}
                      className="h-12 w-full px-4 outline-none rounded-2xl bg-[hsl(var(--background)/0.7)] border border-transparent transition-colors focus:border-[#D4AF37]/50"
                    >
                      <option value="1">1 seat reserved</option>
                      <option value="2">2 seats reserved</option>
                      <option value="3">3 seats reserved</option>
                      <option value="4">4 seats reserved</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Will you be joining us?</label>
                    <select 
                      value={form.attendanceStatus} 
                      onChange={(e) => setForm((prev) => ({ ...prev, attendanceStatus: e.target.value }))}
                      className="h-12 w-full px-4 outline-none rounded-2xl bg-[hsl(var(--background)/0.7)] border border-transparent transition-colors focus:border-[#D4AF37]/50"
                    >
                      <option value="attending">Joyfully Accept</option>
                      <option value="unable">Regretfully Decline</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Leave a blessing or advice</label>
                  <textarea 
                    value={form.message} 
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} 
                    placeholder="Write your warmest wishes here..." 
                    className="min-h-[140px] w-full p-4 outline-none rounded-[1.5rem] bg-[hsl(var(--background)/0.7)] border border-transparent transition-colors focus:border-[#D4AF37]/50" 
                  />
                </div>
                <button type="submit" disabled={createRsvp.isPending} className="h-12 w-full rounded-full bg-primary text-primary-foreground active:scale-95 transition-transform hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  {createRsvp.isPending ? 'Sending your regards...' : 'Confirm Attendance'}
                </button>
              </form>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.72)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
            <div className="space-y-5 p-6 sm:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary/75">Guest Book</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Kind words from our favorite people, drifting softly across the page.</p>
              </div>

              {isLoading ? (
                <div className="grid gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="h-28 rounded-[1.5rem] bg-[hsl(var(--background)/0.65)]" />
                  ))}
                </div>
              ) : wishes.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--primary)/0.24)] bg-[hsl(var(--background)/0.55)] p-8 text-center text-sm leading-7 text-muted-foreground">
                  {/* ✅ FIX: Ganti nama menjadi Arin & Hisyam */}
                  Be the first to leave a heartfelt wish for Arin & Hisyam.
                </div>
              ) : (
                <div className="overflow-hidden rounded-[1.75rem] border border-white/40 bg-[hsl(var(--background)/0.55)] py-4">
                  <motion.div {...marquee} className="flex w-max gap-4 px-4">
                    {marqueeItems.map((wish, index) => (
                      <div key={`${wish.id}-${index}`} className="w-[260px] rounded-[1.5rem] border border-white/60 bg-[hsl(var(--card)/0.88)] p-4 shadow-sm">
                        <p className="text-sm leading-7 text-foreground">“{wish.message || 'Wishing you endless love and joy always.'}”</p>
                        <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-muted-foreground">
                          <span>{wish.guestName}</span>
                          <span>{wish.attendanceStatus}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}