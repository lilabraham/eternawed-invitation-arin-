import { FormEvent, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// --- KOMPONEN: SMOKED GLASS WISH CARD ---
const WishCard = ({ wish }: { wish: any }) => (
  <div className="w-full rounded-[1.5rem] border border-white/[0.03] bg-white/[0.02] p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-white/[0.08] transition-colors duration-500">
    <p className="text-[12px] leading-relaxed text-white/50 italic font-light mb-4">
      “{wish.message || 'Wishing you endless love.'}”
    </p>
    <div className="flex flex-col gap-1 border-t border-white/[0.05] pt-4">
      <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]/80 font-bold">
        {wish.guestName}
      </span>
      <span className="text-[8px] uppercase tracking-widest text-white/20">
        {wish.attendanceStatus === 'attending' ? '• Joyfully Accepted' : '• Sadly Declined'}
      </span>
    </div>
  </div>
);

const VerticalColumn = ({ items, direction = 'up', speed = 45 }: { items: any[], direction?: 'up' | 'down', speed?: number }) => {
  const duplicatedItems = [...items, ...items, ...items];
  return (
    <div className="relative h-[600px] overflow-hidden flex-1">
      <motion.div
        animate={{ y: direction === 'up' ? [0, -1200] : [-1200, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-5"
      >
        {duplicatedItems.map((wish, idx) => <WishCard key={`${wish.id}-${idx}`} wish={wish} />)}
      </motion.div>
    </div>
  );
};

export function RsvpSection() {
  const [wishes, setWishes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ guestName: '', guestCount: '1', attendanceStatus: 'attending', message: '', })

  const fetchWishes = async () => {
    try {
      const response = await fetch(`${'https://script.google.com/macros/s/AKfycbydLZdHofCJeSDDTldP8QPcn7-a2Yv4kpfsMzSN72KYyzqB9DtCRySy6-3hFPeM0BIx/exec'}?t=${Date.now()}`);
      const data = await response.json();
      setWishes(data);
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchWishes(); }, [])

  const columns = useMemo(() => {
    const cols: any[][] = [[], [], []];
    wishes.forEach((w, i) => cols[i % 3].push(w));
    return cols;
  }, [wishes]);

  return (
    <div className="px-4 pb-32 sm:px-6 lg:px-10">
      <div className="invitation-shell mx-auto max-w-7xl">
        <div className="grid gap-16 lg:gap-24 lg:grid-cols-[1fr_1.5fr] items-start">
          
          {/* ✅ KIRI: FORM RSVP (DITINGKATKAN MATERIALITASNYA) */}
          <div className="relative overflow-hidden rounded-[3rem] border border-[#D4AF37]/10 bg-[#14100e]/80 p-8 sm:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)] h-fit">
            <form className="relative z-10 space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Submission logic handled in RsvpSection.tsx'); }}>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">Registration</p>
                <label className="text-[12px] text-white/50 block">Full Name</label>
                <input type="text" className="h-14 w-full px-5 outline-none rounded-2xl bg-white/[0.02] border border-white/5 text-white placeholder:text-white/10 focus:border-[#D4AF37]/30 transition-all text-sm" placeholder="Your name" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-[12px] text-white/50 block">Seats</label>
                  <select className="h-14 w-full px-5 rounded-2xl bg-white/[0.02] border border-white/5 text-white focus:border-[#D4AF37]/30 transition-all text-sm">
                    {[1, 2, 3, 4].map(n => <option key={n} value={n} className="bg-[#1a1512]">{n} Person(s)</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[12px] text-white/50 block">Attendance</label>
                  <select className="h-14 w-full px-5 rounded-2xl bg-white/[0.02] border border-white/5 text-white focus:border-[#D4AF37]/30 transition-all text-sm">
                    <option value="attending" className="bg-[#1a1512]">Coming</option>
                    <option value="unable" className="bg-[#1a1512]">Unable</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[12px] text-white/50 block">Wishes</label>
                <textarea className="min-h-[120px] w-full p-5 outline-none rounded-2xl bg-white/[0.02] border border-white/5 text-white placeholder:text-white/10 focus:border-[#D4AF37]/30 transition-all text-sm" placeholder="Write your warmest wishes..." />
              </div>

              <button type="submit" className="h-14 w-full rounded-full bg-[#D4AF37] text-[#1a1512] font-bold tracking-[0.2em] text-[11px] uppercase shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all">
                Confirm Attendance
              </button>
            </form>
          </div>

          {/* ✅ KANAN: GUEST BOOK (CINEMATIC ATMOSPHERE) */}
          <div className="relative group">
            
            {/* THE GOLDEN ANCHOR: Cahaya samar di tengah area wishes */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
            </div>

            {/* MASKING LAYER */}
            <div className="absolute inset-0 z-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}></div>

            <div className="relative flex gap-4 sm:gap-6 h-[550px] z-10">
              {isLoading ? (
                <div className="flex w-full items-center justify-center text-[#D4AF37]/30 uppercase tracking-[0.3em] text-[10px]">Gathering wishes...</div>
              ) : (
                <>
                  <VerticalColumn items={columns[0]} direction="up" speed={60} />
                  <VerticalColumn items={columns[1]} direction="down" speed={70} />
                  <VerticalColumn items={columns[2]} direction="up" speed={65} />
                </>
              )}
            </div>
            
            <div className="mt-8 flex items-center justify-between px-2">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium italic">Drifting softly across the page</p>
              <div className="h-px flex-1 mx-6 bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
              <span className="text-[9px] text-[#D4AF37]/60 font-bold uppercase tracking-[0.2em]">{wishes.length} Recorded</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}