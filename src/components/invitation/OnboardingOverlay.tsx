import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type OnboardingOverlayProps = {
  guestName?: string
  onOpenInvitation: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
}

export function OnboardingOverlay({
  guestName = 'Tamu Spesial',
  onOpenInvitation,
}: OnboardingOverlayProps) {
  const [displayName, setDisplayName] = useState(guestName)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nameFromUrl = params.get('to')

    if (nameFromUrl) {
      setDisplayName(nameFromUrl)
    }
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        overflow-hidden
        px-4
        backdrop-blur-xl
      "
      style={{
        background:
          'radial-gradient(circle at top, rgba(212,175,55,0.16), transparent 32%), rgba(18,14,12,0.45)',
      }}
    >
      {/* Ambient cinematic gold */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* top glow */}
        <div className="absolute left-1/2 top-[-15%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.10] blur-[120px]" />

        {/* bottom gold bloom */}
        <div className="absolute bottom-[-20%] left-1/2 h-[260px] w-[400px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.08] blur-[130px]" />

        {/* floating particles */}
        <div className="absolute left-[18%] top-[30%] h-1 w-1 rounded-full bg-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
        <div className="absolute right-[22%] top-[20%] h-1.5 w-1.5 rounded-full bg-[#D4AF37]/50 shadow-[0_0_18px_rgba(212,175,55,0.8)]" />
        <div className="absolute bottom-[28%] left-[26%] h-1 w-1 rounded-full bg-[#D4AF37]/55 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
      </div>

      {/* Main Card */}
      <div
        className="
          invitation-shell soft-reveal
          relative mx-auto grid
          w-full max-w-[470px]
          gap-7 overflow-hidden
          rounded-[2.2rem]
          border border-[#D4AF37]/25
          p-6 md:p-7
          backdrop-blur-[16px]
        "
        style={{
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 45%, rgba(212,175,55,0.03) 100%)',
          boxShadow:
            '0 20px 80px rgba(0,0,0,0.25), 0 0 50px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >

        {/* Gold frame accents */}
        <div className="pointer-events-none absolute inset-0">

          {/* top line */}
          <div className="absolute left-[14%] top-0 h-px w-[72%] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          {/* bottom line */}
          <div className="absolute bottom-0 left-[14%] h-px w-[72%] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />

          {/* left line */}
          <div className="absolute left-0 top-[18%] h-[64%] w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />

          {/* right line */}
          <div className="absolute right-0 top-[18%] h-[64%] w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />

          {/* corner accents */}
          <div className="absolute left-5 top-5 h-9 w-9 border-l border-t border-[#D4AF37]/45" />
          <div className="absolute right-5 top-5 h-9 w-9 border-r border-t border-[#D4AF37]/45" />
          <div className="absolute bottom-5 left-5 h-9 w-9 border-b border-l border-[#D4AF37]/35" />
          <div className="absolute bottom-5 right-5 h-9 w-9 border-b border-r border-[#D4AF37]/35" />

          {/* soft radial */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_40%)]" />
        </div>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 space-y-5 text-center"
        >

          {/* Gold pill */}
          <div className="flex justify-center">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-[#D4AF37]/35
                bg-[linear-gradient(135deg,rgba(212,175,55,0.10),rgba(255,255,255,0.03))]
                px-5 py-2
                text-[0.64rem]
                font-medium uppercase
                tracking-[0.34em]
                text-[#f3d998]
                shadow-[0_0_25px_rgba(212,175,55,0.10)]
                backdrop-blur-md
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
              You are invited
            </span>
          </div>

          {/* Title */}
          <div className="space-y-5">

            <h1
              className="
                luxury-section-title
                leading-[0.92]
                tracking-[-0.055em]
                text-[#fffaf5]
              "
              style={{
                textShadow:
                  '0 0 30px rgba(212,175,55,0.10)',
              }}
            >
              A Special
              <br />
              Invitation
            </h1>

            {/* divider */}
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

            {/* desc */}
            <p
              className="
                mx-auto max-w-md
                text-base
                font-light
                leading-relaxed
                text-[#f8efe4]/82
                sm:text-lg
              "
            >
              An intimate celebration of love, commitment,
              and beautifully slow moments meant to be shared with you.
            </p>
          </div>
        </motion.div>

        {/* Guest Name */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 text-center"
        >
          <p className="text-[0.72rem] uppercase tracking-[0.36em] text-[#D4AF37]/70">
            Reserved with love for
          </p>

          <p
            className="
              mt-4
              font-serif
              text-[2.4rem]
              italic
              tracking-[-0.03em]
              text-[#fffaf5]
              sm:text-[2.9rem]
            "
          >
            {displayName}
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 flex justify-center"
        >
          <button
            type="button"
            onClick={onOpenInvitation}
            className="
              group relative overflow-hidden
              rounded-full
              border border-[#D4AF37]/35
              px-9 py-3.5
              text-[0.9rem]
              font-medium
              tracking-[0.08em]
              text-[#241b12]
              transition-all duration-300
              hover:scale-[1.03]
              active:scale-95
            "
            style={{
              background:
                'linear-gradient(135deg,#cfa64a 0%,#f3d68c 50%,#c79b3b 100%)',
              boxShadow:
                '0 0 35px rgba(212,175,55,0.18), 0 10px 35px rgba(212,175,55,0.18)',
            }}
          >
            {/* Metallic reflection */}
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-50" />

            <span className="relative z-10">
              Open Invitation
            </span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 flex items-center justify-center gap-2 text-sm text-[#f6eadb]/65"
        >
          <Sparkles className="h-4 w-4 text-[#D4AF37]/80" />

          <p className="font-light">
            A new chapter begins in soft light.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}