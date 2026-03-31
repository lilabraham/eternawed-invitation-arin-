import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Gift, QrCode } from 'lucide-react'

// Import @blinkdotnew/ui dihapus karena tidak tersedia di lokal

import { useGiftRegistries } from '@/hooks/useInvitationData'

export function GiftRegistrySection() {
  const { data: registries = [] } = useGiftRegistries()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const primaryGift = useMemo(() => registries[0], [registries])

  const handleCopy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedId(id)
    // Mengganti toast.success dengan alert bawaan untuk notifikasi minimal
    alert('Copied!\nAccount number copied to clipboard.')
    window.setTimeout(() => setCopiedId(null), 1800)
  }

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="invitation-shell mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/80">Wedding Gift</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">For those who wish to celebrate with a thoughtful digital gift.</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.75)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
            <div className="space-y-5 p-6 sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--accent)/0.65)] text-primary">
                <Gift className="h-5 w-5" />
              </div>
              {primaryGift ? (
                <>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-primary/75">{primaryGift.label}</p>
                    <h3 className="mt-3 font-serif text-3xl text-foreground">{primaryGift.bankName}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">Account holder: {primaryGift.accountName}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/50 bg-[hsl(var(--background)/0.65)] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Account Number</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-mono text-2xl text-foreground">{primaryGift.accountNumber}</p>
                      <button type="button" onClick={() => handleCopy(primaryGift.id, primaryGift.accountNumber)} className="h-11 rounded-full bg-primary px-5 text-primary-foreground">
                        <Copy className="mr-2 h-4 w-4" />
                        {copiedId === primaryGift.id ? 'Copied!' : 'Copy Number'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--primary)/0.24)] bg-[hsl(var(--background)/0.55)] p-8 text-sm leading-7 text-muted-foreground">
                  Gift registry details will appear here once configured.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border-white/45 bg-[hsl(var(--card)/0.75)] shadow-[0_24px_80px_rgba(88,66,49,0.11)] backdrop-blur-2xl">
            <div className="flex h-full flex-col items-center justify-center p-6 text-center sm:p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-dashed border-[hsl(var(--primary)/0.24)] bg-[hsl(var(--background)/0.65)] text-primary">
                <QrCode className="h-9 w-9" />
              </div>
              <h3 className="mt-6 font-serif text-3xl text-foreground">QRIS</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                Scan-ready QR support can be added here anytime, keeping the gift experience simple on mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}