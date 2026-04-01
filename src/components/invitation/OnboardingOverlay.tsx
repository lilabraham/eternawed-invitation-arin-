import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type OnboardingOverlayProps = {
  guestName: string
  onOpenInvitation: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function OnboardingOverlay({ guestName, onOpenInvitation }: OnboardingOverlayProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.22),transparent_38%),rgba(20,16,13,0.72)] px-4 backdrop-blur-xl"
    >
      <div className="invitation-shell soft-reveal relative mx-auto grid w-full max-w-xl gap-8 overflow-hidden rounded-[2rem] border border-white/35 bg-[hsl(var(--background)/0.18)] p-6 shadow-[0_30px_100px_rgba(70,49,35,0.22)] backdrop-blur-md md:p-8">
        <motion.div variants={itemVariants} className="space-y-5 text-center text-primary-foreground">
          <span className="inline-flex w-fit self-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-white/90 backdrop-blur-md">
            You are invited
          </span>
          <div className="space-y-4">
            <h1 className="luxury-section-title text-white">A Special Invitation</h1>
            {/* SURGICAL FIX: Menggunakan text-white/90 dan font-light agar terbaca jelas namun tetap elegan */}
            <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg">
              An intimate celebration of love, commitment, and beautifully slow moments meant to be shared with you.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center text-white">
          <p className="text-sm uppercase tracking-[0.32em] text-white/70">Reserved with love for</p>
          <p className="mt-3 font-serif text-3xl text-white sm:text-4xl">{guestName}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <button
            type="button"
            onClick={onOpenInvitation}
            className="pulse-glow pressable h-14 rounded-full bg-primary px-10 text-lg font-medium text-primary-foreground shadow-[0_18px_45px_rgba(190,118,85,0.35)] hover:scale-[1.02] active:scale-95"
          >
            Open Invitation
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-sm text-white/80">
          <Sparkles className="h-4 w-4 text-[hsl(var(--accent))]" />
          <p className="font-light">A new chapter begins in soft light.</p>
        </motion.div>
      </div>
    </motion.div>
  )
}