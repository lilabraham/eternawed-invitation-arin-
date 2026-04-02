import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Gift } from 'lucide-react'

// Data Rekening Manual (Surgical Fix: Anti-Mati & Mandiri-BCA Balance)
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
      alert('Tersalin!\nNomor rekening telah berhasil disalin.')
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
          {/* ✅ Kicker emas untuk memberi konteks section */}
          <p className="luxury-kicker text-[#D4AF37]">Wedding Gift</p>
          
          {/* ✅ Judul dibuat sangat pendek agar Serif raksasanya terlihat elegan */}
          <h2 className="luxury-section-title mt-3 text-foreground">A Token of Love</h2>
          
          {/* ✅ Kalimat panjang dipindah ke tag <p> dengan text-muted-foreground (abu-abu pudar) dan ukuran wajar */}
          <p className="luxury-copy mt-4 text-muted-foreground">
            Your presence is our greatest joy. Should you wish to bless us further, a digital token is deeply appreciated.
          </p>
        </motion.div>

        {/* Grid Layout: 2 Kolom untuk BCA & Mandiri */}
        <div className="grid gap-6 md:grid-cols-2">
          {MANUAL_REGISTRIES.map((registry, index) => (
            <motion.div
              key={registry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.75)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl"
            >
              <div className="space-y-5 p-6 sm:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--accent)/0.65)] text-primary">
                  <Gift className="h-5 w-5" />
                </div>
                
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary/75">{registry.label}</p>
                  <h3 className="mt-3 font-serif text-3xl text-foreground">{registry.bankName}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground italic">A/N {registry.accountName}</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/50 bg-[hsl(var(--background)/0.65)] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Nomor Rekening</p>
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-2xl tracking-wider text-foreground">{registry.accountNumber}</p>
                    <button 
                      type="button" 
                      onClick={() => handleCopy(registry.id, registry.accountNumber)} 
                      className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedId === registry.id ? 'Tersalin' : 'Salin Nomor'}
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