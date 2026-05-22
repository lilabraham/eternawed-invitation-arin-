// src/components/invitation/MemoryTimelineSection.tsx
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const milestones = [
  {
    year: '2020',
    title: 'The First Chapter',
    description: 'A serendipitous meeting that turned an ordinary day into the beginning of a lifetime story.',
  },
  {
    year: '2023',
    title: 'A Promise Made',
    description: 'Under a sky full of stars, a quiet question was asked, and a tearful "Yes" sealed our forever.',
  },
  {
    year: '2026',
    title: 'The Sacred Union',
    description: 'Two souls, completely intertwined. Standing together, ready to embrace the journey ahead.',
  }
]

export function MemoryTimelineSection() {
  return (
    <section className="relative px-4 py-32 sm:px-6 lg:px-10 overflow-hidden">
      {/* Subtle Atmospheric Light Leak */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center mb-24">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]/70 font-semibold mb-4">
            Our Journey
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white drop-shadow-sm mb-6">
            A Story of Us
          </h2>
          <div className="mx-auto w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </div>

        {/* The Timeline Track */}
        <div className="relative">
          {/* Central Gold Line (Cinematic Fade Edge) */}
          <div 
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" 
            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
          />

          <div className="space-y-16 sm:space-y-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 ${isEven ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Smoked Glass Card */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-16 text-left sm:text-right' : 'sm:pl-16 text-left'}`}>
                    <div className="p-8 rounded-[1.5rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/[0.08] transition-colors duration-500">
                      <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="font-serif text-2xl text-white mb-3 tracking-wide">
                        {milestone.title}
                      </h3>
                      <p className="text-[12px] font-light leading-relaxed text-white/50 tracking-wide">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-24 flex justify-center opacity-30">
          <Heart className="w-4 h-4 text-[#D4AF37]" />
        </div>
      </div>
    </section>
  )
}