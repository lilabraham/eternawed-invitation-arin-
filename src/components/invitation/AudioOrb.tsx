import { motion } from 'framer-motion'
import { Pause, Play, Waves } from 'lucide-react'

// Menghapus import '@blinkdotnew/ui' karena menyebabkan module not found

type AudioOrbProps = {
  isPlaying: boolean
  onToggle: () => void
}

export function AudioOrb({ isPlaying, onToggle }: AudioOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-50"
    >
      {/* Mengganti <Button> dari library dengan tag HTML native <button> */}
      <button
        type="button"
        onClick={onToggle}
        className="group h-16 w-16 rounded-full border border-white/40 bg-[hsl(var(--background)/0.55)] p-0 text-foreground shadow-[0_18px_50px_rgba(77,54,38,0.18)] backdrop-blur-2xl transition-transform duration-300 hover:scale-105"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 5, ease: 'linear', repeat: Infinity } : { duration: 0.4 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--primary)/0.28)] bg-[hsl(var(--card)/0.78)]"
        >
          <Waves className="absolute h-5 w-5 text-primary/35" />
          {isPlaying ? <Pause className="h-4 w-4 text-primary" /> : <Play className="ml-0.5 h-4 w-4 text-primary" />}
        </motion.div>
      </button>
    </motion.div>
  )
}