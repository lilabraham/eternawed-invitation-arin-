import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Gift } from 'lucide-react'

// --- KOMPONEN EFEK LUXURY: GOLDEN ROSE CORNER ---
const CornerRose = ({ className = "" }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 100C100 100 80 85 70 60C60 35 30 20 30 20C30 20 50 35 60 55C70 75 100 100 100 100Z" fill="url(#gold-grad-gift)" fillOpacity="0.12"/>
    <path d="M100 80C100 80 75 70 55 45C35 20 10 10 10 10C10 10 35 25 50 50C65 75 100 80 100 80Z" fill="url(#gold-grad-gift)" fillOpacity="0.08"/>
    <path d="M80 100C80 100 70 75 45 55C20 35 10 10 10 10C10 10 25 35 50 50C75 65 80 100 80 100Z" fill="url(#gold-grad-gift)" fillOpacity="0.08"/>
    <path d="M95 95C95 95 85 80 75 65" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3"/>
    <path d="M85 95C85 95 70 85 55 65" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3"/>
    <path d="M95 85C95 85 85 70 65 55" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3"/>
    <defs>
      <linearGradient id="gold-grad-gift" x1="100" y1="100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37"/>
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
)

const MANUAL_REGISTRIES = [
  {
    id: 'bca-1',
    bankName: 'BCA',
    accountNumber: '8030845839', 
    accountName: 'Afif Hisyam Arrasyid',
    label: 'Digital Gift'
  },
  {
    id: 'mandiri-2',
    bankName: 'MANDIRI',
    accountNumber: '1360034264959', 
    accountName: 'Imelia Arina Manasikana',
    label: 'Digital Gift'
  }
]

export function GiftRegistrySection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      alert('Copied!\nThe account number has been successfully copied.')
      window.setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="invitation-shell mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 24 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.2 }} 
          transition={{ duration: 0.7 }} 
          className="mb-10 max-w-2xl"
        >
          {/* ✅ CONTRAST BOOST: Emas Terang + Shadow */}
          <p className="luxury-kicker text-[#E6C35C] font-semibold drop-shadow-[0_1.2px_1.2px_rgba(212,175,55,0.4)]">
            Wedding Gift
          </p>
          
          {/* ✅ CONTRAST BOOST: Off-White + Shadow */}
          <h2 className="luxury-section-title mt-3 text-white/95 drop-shadow-[0_2px_2px_rgba(212,175,55,0.25)]">
            A Token of Love
          </h2>
          
          {/* ✅ CONTRAST BOOST: Teks putih terang agar mudah dibaca */}
          <p className="luxury-copy mt-4 text-foreground font-normal leading-relaxed text-white/90">
            Your presence is our greatest joy. Should you wish to bless us further, a digital token is deeply appreciated.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {MANUAL_REGISTRIES.map((registry, index) => (
            <motion.div
              key={registry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              // ✅ FIX: Tambahkan relative & overflow-hidden agar mawar tidak keluar dari kartu
              className="relative overflow-hidden rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.75)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl"
            >
              {/* ✅ Mawar di sudut kanan bawah */}
              <CornerRose className="-bottom-6 -right-6 w-40 h-40 opacity-70" />

              <div className="relative z-10 space-y-5 p-6 sm:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--accent)/0.65)] text-[#E6C35C] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Gift className="h-5 w-5" />
                </div>
                
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">{registry.label}</p>
                  <h3 className="mt-3 font-serif text-3xl text-foreground">{registry.bankName}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/80 italic">A/N {registry.accountName}</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/30 bg-black/20 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">Account Number</p>
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-2xl tracking-wider text-white/95 drop-shadow-md">{registry.accountNumber}</p>
                    <button 
                      type="button" 
                      onClick={() => handleCopy(registry.id, registry.accountNumber)} 
                      className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95 shadow-[0_5px_20px_rgba(212,175,55,0.3)]"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedId === registry.id ? 'Copied' : 'Copy Number'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}