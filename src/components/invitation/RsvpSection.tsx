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
          {/* ✅ FIX: Warna diubah menjadi emas Luxury (#D4AF37) agar kontras dan terbaca jelas */}
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">RSVP & Wishes</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Let us know you’ll be there and leave a note we’ll keep close.</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.75)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
            <div className="p-6 sm:p-8">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/75">Reserved for your presence</p>
                  <label className="text-sm text-muted-foreground">Full name</label>
                  <input 
                    type="text" 
                    value={form.guestName} 
                    onChange={(e) => setForm((prev) => ({ ...prev, guestName: e.target.value }))} 
                    placeholder="Type your beautiful name" 
                    className="h-12 w-full px-4 outline-none rounded-2xl bg-[hsl(var(--background)/0.7)]" 
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Number of guests</label>
                    <select 
                      value={form.guestCount} 
                      onChange={(e) => setForm((prev) => ({ ...prev, guestCount: e.target.value }))}
                      className="h-12 w-full px-4 outline-none rounded-2xl bg-[hsl(var(--background)/0.7)]"
                    >
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Attendance status</label>
                    <select 
                      value={form.attendanceStatus} 
                      onChange={(e) => setForm((prev) => ({ ...prev, attendanceStatus: e.target.value }))}
                      className="h-12 w-full px-4 outline-none rounded-2xl bg-[hsl(var(--background)/0.7)]"
                    >
                      <option value="attending">Will attend</option>
                      <option value="maybe">Maybe</option>
                      <option value="unable">Can’t attend</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Your wish</label>
                  <textarea 
                    value={form.message} 
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} 
                    placeholder="Share a warm message for the couple" 
                    className="min-h-[140px] w-full p-4 outline-none rounded-[1.5rem] bg-[hsl(var(--background)/0.7)]" 
                  />
                </div>
                <button type="submit" disabled={createRsvp.isPending} className="h-12 w-full rounded-full bg-primary text-primary-foreground active:scale-95 transition-transform">
                  {createRsvp.isPending ? 'Sending...' : 'Send RSVP'}
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