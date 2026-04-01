import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import HomePage from '@/pages/HomePage'

// --- KOMPONEN LUXURY PRE-LOADER ---
const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#18120E]"
    >
      <div className="relative">
        {/* Lingkaran Pendar Cahaya (Glow) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-[#D4AF37] blur-[40px]"
        />

        {/* Ikon Hati dengan Animasi Denyut (Pulse) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: 1 
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: { duration: 1 }
          }}
          className="relative z-10 flex items-center justify-center text-[#D4AF37]"
        >
          <Heart size={64} strokeWidth={1} fill="currentColor" fillOpacity={0.15} />
        </motion.div>
      </div>

      {/* Teks Loading Minimalis */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50">
          The Wedding of
        </p>
        <p className="font-serif text-xl italic tracking-widest text-[#D4AF37]/90">
          Arin & Hisyam
        </p>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulasi loading selama 2.5 detik untuk membangun mood luxury
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="loader" />}
      </AnimatePresence>
      
      {/* HomePage hanya muncul/render setelah loading selesai untuk performa maksimal */}
      {!isLoading && <HomePage />}
    </>
  )
}

export default App