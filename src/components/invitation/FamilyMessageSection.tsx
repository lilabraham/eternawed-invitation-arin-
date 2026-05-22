// src/components/invitation/FamilyMessageSection.tsx
import { motion } from 'framer-motion'

export function FamilyMessageSection() {
  return (
    <section className="relative px-4 py-32 sm:px-6 lg:px-10 flex items-center justify-center min-h-[80vh] overflow-hidden">
      
      {/* Deep Dark Filmic Background */}
      <div className="absolute inset-0 bg-[#070605]" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl p-12 sm:p-20 text-center rounded-lg border border-[#D4AF37]/10 bg-[#0f0c0a]/60 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
      >
        {/* Elegant Architectural Framing Corners */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-[0.5px] border-l-[0.5px] border-[#D4AF37]/40" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-[0.5px] border-r-[0.5px] border-[#D4AF37]/40" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-[0.5px] border-l-[0.5px] border-[#D4AF37]/40" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-[0.5px] border-r-[0.5px] border-[#D4AF37]/40" />

        <p className="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]/70 font-semibold mb-8">
          A Heartfelt Note
        </p>

        {/* Cinematic Loro Piana Typography Rule: Off-white, extralight, airy */}
        <blockquote className="font-serif text-2xl sm:text-3xl leading-relaxed text-[#E6E1D6] font-light mb-12">
          "Though distance may keep us apart on this special day, your love and blessings echo deeply in our hearts. Thank you for being a beautiful part of our lives."
        </blockquote>

        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-px bg-[#D4AF37]/30 mb-2" />
          <p className="font-script text-3xl sm:text-4xl text-[#D4AF37] italic opacity-90">
            Arin & Afif
          </p>
          <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 mt-2">
            Forever Begins
          </p>
        </div>
      </motion.div>
    </section>
  )
}