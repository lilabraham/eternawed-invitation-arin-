import { FormEvent, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// --- KOMPONEN EFEK LUXURY: GOLDEN ROSE CORNER (TIDAK DIUBAH) ---
const CornerRose = ({ className = "" }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 100C100 100 80 85 70 60C60 35 30 20 30 20C30 20 50 35 60 55C70 75 100 100 100 100Z" fill="url(#gold-grad-rsvp)" fillOpacity="0.12"/>
    <path d="M100 80C100 80 75 70 55 45C35 20 10 10 10 10C10 10 35 25 50 50C65 75 100 80 100 80Z" fill="url(#gold-grad-rsvp)" fillOpacity="0.08"/>
    <path d="M80 100C80 100 70 75 45 55C20 35 10 10 10 10C10 10 25 35 50 50C75 65 80 100 80 100Z" fill="url(#gold-grad-rsvp)" fillOpacity="0.08"/>
    <path d="M95 95C95 95 85 80 75 65" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3"/>
    <path d="M85 95C85 95 70 85 55 65" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3"/>
    <path d="M95 85C95 85 85 70 65 55" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3"/>
    <defs>
      <linearGradient id="gold-grad-rsvp" x1="100" y1="100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37"/>
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
)

const marquee = {
  animate: { x: ['0%', '-50%'] },
  transition: { duration: 24, repeat: Infinity, ease: 'linear' as const },
}

// Tipe data untuk Guest Book
type Wish = {
  id: string | number;
  guestName: string;
  attendanceStatus: string;
  message: string;
}

// TODO: Ganti URL ini dengan URL Web App Google Apps Script Anda nanti
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydLZdHofCJeSDDTldP8QPcn7-a2Yv4kpfsMzSN72KYyzqB9DtCRySy6-3hFPeM0BIx/exec';

export function RsvpSection() {
  // Mengganti Blink Hooks dengan React State bawaan
  const [wishes, setWishes] = useState<Wish[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    guestName: '',
    guestCount: '1',
    attendanceStatus: 'attending',
    message: '',
  })

  // Mengambil data dari Google Sheets saat komponen dimuat
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        setWishes(data);
      } catch (error) {
        console.error("Gagal mengambil data dari Google Sheets", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Jangan lakukan fetch jika URL belum diganti (masih default)
    if (GOOGLE_SCRIPT_URL !== 'https://script.google.com/macros/s/AKfycbydLZdHofCJeSDDTldP8QPcn7-a2Yv4kpfsMzSN72KYyzqB9DtCRySy6-3hFPeM0BIx/exec') {
      fetchWishes();
    } else {
      setIsLoading(false); 
    }
  }, [])

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

    setIsSubmitting(true)

    try {
      // Mengubah data form menjadi FormData agar mudah diterima Google Script (menghindari CORS)
      const formData = new FormData();
      formData.append('guestName', form.guestName.trim());
      formData.append('guestCount', form.guestCount);
      formData.append('attendanceStatus', form.attendanceStatus);
      formData.append('message', form.message.trim());

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Wajib menggunakan no-cors untuk Google Apps Script
      });

      // Update UI Guest Book secara instan tanpa harus refresh halaman
      const newWish: Wish = {
        id: Date.now(),
        guestName: form.guestName.trim(),
        attendanceStatus: form.attendanceStatus,
        message: form.message.trim()
      };
      setWishes((prev) => [newWish, ...prev]);

      setForm({ guestName: '', guestCount: '1', attendanceStatus: 'attending', message: '' })
      alert('RSVP sent\nThank you for sharing your presence and wishes.')
    } catch {
      alert('Could not send RSVP. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="invitation-shell mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mb-10 max-w-2xl">
          
          <p className="luxury-kicker text-[#E6C35C] font-semibold drop-shadow-[0_1.2px_1.2px_rgba(212,175,55,0.4)]">
            RSVP & Wishes
          </p>
          
          <h2 className="luxury-section-title mt-3 text-white/95 drop-shadow-[0_2px_2px_rgba(212,175,55,0.25)]">
            Be Our Guest
          </h2> 
          
          <p className="luxury-copy mt-4 text-foreground font-normal leading-relaxed text-white/90">
            Let us know you’ll be joining us, and kindly leave a heartfelt note we’ll keep close to our hearts.
          </p>
          
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* ✅ KARTU KIRI: FORM RSVP */}
          <div className="relative overflow-hidden rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.75)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
            <CornerRose className="-bottom-6 -left-6 w-56 h-56 opacity-50 scale-x-[-1]" />
            
            <div className="relative z-10 p-6 sm:p-8">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">Reserved for your presence</p>
                  <label className="text-sm text-white/80">Kindly provide your full name</label>
                  <input 
                    type="text" 
                    value={form.guestName} 
                    onChange={(e) => setForm((prev) => ({ ...prev, guestName: e.target.value }))} 
                    placeholder="e.g., Mr. & Mrs. Anderson" 
                    className="h-12 w-full px-4 outline-none rounded-2xl bg-black/30 border border-white/10 transition-colors focus:border-[#D4AF37]/60 text-white placeholder:text-white/30" 
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Party size</label>
                    <select 
                      value={form.guestCount} 
                      onChange={(e) => setForm((prev) => ({ ...prev, guestCount: e.target.value }))}
                      className="h-12 w-full px-4 outline-none rounded-2xl bg-black/30 border border-white/10 transition-colors focus:border-[#D4AF37]/60 text-white"
                    >
                      <option value="1" className="bg-[#1a1512]">1 seat reserved</option>
                      <option value="2" className="bg-[#1a1512]">2 seats reserved</option>
                      <option value="3" className="bg-[#1a1512]">3 seats reserved</option>
                      <option value="4" className="bg-[#1a1512]">4 seats reserved</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Will you be joining us?</label>
                    <select 
                      value={form.attendanceStatus} 
                      onChange={(e) => setForm((prev) => ({ ...prev, attendanceStatus: e.target.value }))}
                      className="h-12 w-full px-4 outline-none rounded-2xl bg-black/30 border border-white/10 transition-colors focus:border-[#D4AF37]/60 text-white"
                    >
                      <option value="attending" className="bg-[#1a1512]">Joyfully Accept</option>
                      <option value="unable" className="bg-[#1a1512]">Regretfully Decline</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Leave a blessing or advice</label>
                  <textarea 
                    value={form.message} 
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} 
                    placeholder="Write your warmest wishes here..." 
                    className="min-h-[140px] w-full p-4 outline-none rounded-[1.5rem] bg-black/30 border border-white/10 transition-colors focus:border-[#D4AF37]/60 text-white placeholder:text-white/30" 
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-full bg-[#D4AF37] text-black font-semibold active:scale-95 transition-transform hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:active:scale-100">
                  {isSubmitting ? 'Sending your regards...' : 'Confirm Attendance'}
                </button>
              </form>
            </div>
          </div>

          {/* ✅ KARTU KANAN: GUEST BOOK */}
          <div className="relative overflow-hidden rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.72)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
            <CornerRose className="-bottom-6 -right-6 w-56 h-56 opacity-50" />
            
            <div className="relative z-10 space-y-5 p-6 sm:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">Guest Book</p>
                <p className="mt-3 text-sm leading-7 text-white/80">Kind words from our favorite people, drifting softly across the page.</p>
              </div>

              {isLoading ? (
                <div className="grid gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="h-28 rounded-[1.5rem] bg-black/20 animate-pulse" />
                  ))}
                </div>
              ) : wishes.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-[#D4AF37]/40 bg-black/20 p-8 text-center text-sm leading-7 text-white/70 backdrop-blur-md">
                  Be the first to leave a heartfelt wish for Arin & Hisyam.
                </div>
              ) : (
                <div className="overflow-hidden rounded-[1.75rem] border border-white/20 bg-black/20 py-4 backdrop-blur-sm">
                  <motion.div {...marquee} className="flex w-max gap-4 px-4">
                    {marqueeItems.map((wish, index) => (
                      <div key={`${wish.id}-${index}`} className="w-[260px] rounded-[1.5rem] border border-white/30 bg-[#1a1512]/90 p-4 shadow-lg backdrop-blur-xl">
                        <p className="text-sm leading-7 text-white/95">“{wish.message || 'Wishing you endless love and joy always.'}”</p>
                        <div className="mt-4 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.22em] text-[#D4AF37]">
                          <span>{wish.guestName}</span>
                          <span>{wish.attendanceStatus === 'attending' ? 'Attending' : 'Declined'}</span>
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