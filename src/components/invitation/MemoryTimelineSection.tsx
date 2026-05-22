import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// ============================================================
// PARTICLES
// ============================================================
const generateDepthParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const layer = Math.random();
    let size, opacity, duration, blur;
    if (layer < 0.5) {
      size = Math.random() * 1.2 + 0.4;
      opacity = Math.random() * 0.03 + 0.01;
      duration = Math.random() * 30 + 30;
      blur = 'blur(1px)';
    } else {
      size = Math.random() * 1.8 + 0.8;
      opacity = Math.random() * 0.05 + 0.015;
      duration = Math.random() * 22 + 18;
      blur = 'blur(0px)';
    }
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size, opacity, duration, blur,
      delay: Math.random() * 8,
    };
  });
};

const particles = generateDepthParticles(10);

// ============================================================
// CINEMATIC MARQUEE — Credits style, Quiet Luxury
// Teks masuk dari ujung kanan, keluar di ujung kiri.
// Loop mathematically seamless via Web Animations API.
// ============================================================
const MARQUEE_ITEMS = [
  "Arin & Afif",
  "✦",
  "A love written in stillness",
  "✦",
  "Arin & Afif",
  "✦",
  "A love written in stillness",
  "✦",
];

// Satu strip — akan di-render 2x berdampingan untuk seamless loop
const MarqueeStrip = () => (
  <>
    {MARQUEE_ITEMS.map((item, i) => {
      const isDiamond = item === '✦';
      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            fontFamily: 'Georgia, serif',
            fontSize: isDiamond ? '0.5rem' : '0.6rem',
            fontWeight: 300,
            letterSpacing: isDiamond ? '0.1em' : '0.45em',
            textTransform: isDiamond ? 'none' : 'uppercase',
            color: isDiamond
              ? 'rgba(209,176,107,0.50)'
              : 'rgba(193,168,106,0.35)',
            textShadow: isDiamond
              ? '0 0 12px rgba(209,176,107,0.35)'
              : '0 0 20px rgba(193,168,106,0.15)',
            marginRight: isDiamond ? '3.5rem' : '3rem',
          }}
        >
          {item}
        </span>
      );
    })}
  </>
);

const CinematicMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Ukur lebar aktual setelah render
    const C = container.offsetWidth;           // lebar viewport/container
    const W = track.scrollWidth / 2;          // lebar SATU strip (track = 2 strip)

    // Matematika seamless credits dari kanan:
    //   startX = C - W  → karakter pertama strip-1 tepat di ujung kanan
    //   endX   = C - 2W → strip-1 habis keluar kiri, strip-2 mengisi posisi
    //   loop kembali ke startX = seamless karena strip-1 & strip-2 identik
    const startX = C - W;
    const endX   = C - 2 * W;

    // Kecepatan ~30px/s — pelan, anggun, quiet luxury
    // Min 38 detik agar tidak terlalu cepat pada layar kecil
    const duration = Math.max(38_000, (W / 30) * 1000);

    const anim = track.animate(
      [
        { transform: `translateX(${startX}px)` },
        { transform: `translateX(${endX}px)` },
      ],
      {
        duration,
        iterations: Infinity,
        easing: 'linear',
      }
    );

    return () => anim.cancel();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        borderTop: '1px solid rgba(193,168,106,0.10)',
        borderBottom: '1px solid rgba(193,168,106,0.10)',
        padding: '14px 0',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      {/* 2 strip identik — seamless loop saat strip-1 keluar, strip-2 masuk */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        <MarqueeStrip />
        <MarqueeStrip />
      </div>
    </div>
  );
};

// ============================================================
// SACRED EMBLEM — fine jewelry centerpiece
// ============================================================
const SacredEmblem = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    className="relative flex flex-col items-center"
  >
    {/* Top thread */}
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '10vh' }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      style={{
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(193,168,106,0.25))',
      }}
    />

    {/* Sacred geometry cluster */}
    <div className="relative flex items-center justify-center my-3">

      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '52px',
          height: '52px',
          border: '1px solid rgba(193,168,106,0.12)',
          borderRadius: '50%',
          position: 'absolute',
        }}
      />

      {/* Outer diamond frame */}
      <div style={{
        width: '36px',
        height: '36px',
        border: '1px solid rgba(193,168,106,0.22)',
        transform: 'rotate(45deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Inner diamond */}
        <div style={{
          width: '18px',
          height: '18px',
          border: '1px solid rgba(193,168,106,0.35)',
          transform: 'rotate(0deg)',
        }} />
      </div>

      {/* Horizontal line accents */}
      <div style={{
        position: 'absolute',
        width: '60px',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(193,168,106,0.18), transparent)',
      }} />

      {/* Vertical line accents */}
      <div style={{
        position: 'absolute',
        width: '1px',
        height: '60px',
        background: 'linear-gradient(to bottom, transparent, rgba(193,168,106,0.18), transparent)',
      }} />

      {/* Glowing center jewel */}
      <div style={{
        position: 'absolute',
        width: '4px',
        height: '4px',
        background: 'rgba(209,176,107,0.9)',
        transform: 'rotate(45deg)',
        boxShadow: '0 0 10px rgba(209,176,107,0.6), 0 0 20px rgba(209,176,107,0.2)',
      }} />

      {/* Four corner micro-dots */}
      {[
        { top: '-3px', left: '50%', transform: 'translateX(-50%)' },
        { bottom: '-3px', left: '50%', transform: 'translateX(-50%)' },
        { left: '-3px', top: '50%', transform: 'translateY(-50%)' },
        { right: '-3px', top: '50%', transform: 'translateY(-50%)' },
      ].map((style, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: 'rgba(193,168,106,0.5)',
          ...style,
        }} />
      ))}
    </div>

    {/* Bottom thread */}
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '5vh' }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay: 1.2, ease: 'easeOut' }}
      style={{
        width: '1px',
        background: 'linear-gradient(to bottom, rgba(193,168,106,0.25), transparent)',
        marginTop: '12px',
      }}
    />
  </motion.div>
);

// ============================================================
// LUXURY DIVIDER
// ============================================================
const LuxuryDivider = () => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    className="flex items-center justify-center gap-3 my-2"
    style={{ width: '180px' }}
  >
    <div style={{
      flex: 1,
      height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(193,168,106,0.35))',
    }} />
    <div style={{
      width: '5px',
      height: '5px',
      border: '1px solid rgba(193,168,106,0.5)',
      transform: 'rotate(45deg)',
      background: 'rgba(209,176,107,0.1)',
      boxShadow: '0 0 6px rgba(209,176,107,0.2)',
    }} />
    <div style={{
      flex: 1,
      height: '1px',
      background: 'linear-gradient(to left, transparent, rgba(193,168,106,0.35))',
    }} />
  </motion.div>
);

// ============================================================
// FRAGMENT TYPES & DATA
// ============================================================
type FragmentType = 'XL' | 'LG' | 'MD' | 'SM';
interface Fragment {
  id: number;
  type: FragmentType;
  text: string;
  align: 'left' | 'center' | 'right';
  offset?: string;
}

const fragments: Fragment[] = [
  { id: 1,  type: 'MD', text: "Some things cannot be said.",                              align: 'left',   offset: 'pl-[14%]' },
  { id: 2,  type: 'LG', text: "In a single glance, held softly between breaths.",        align: 'right',  offset: 'pr-[16%]' },
  { id: 3,  type: 'SM', text: "✧",                                                       align: 'center' },
  { id: 4,  type: 'XL', text: "Not every love story needs words.",                       align: 'center' },
  { id: 5,  type: 'MD', text: "Only felt.",                                              align: 'right',  offset: 'pr-[12%]' },
  { id: 6,  type: 'SM', text: "· ✦ ·",                                                   align: 'center' },
  { id: 7,  type: 'LG', text: "A promise written tenderly in time.",                     align: 'left',   offset: 'pl-[10%]' },
  { id: 8,  type: 'MD', text: "The quiet certainty of you.",                             align: 'center' },
  { id: 9,  type: 'XL', text: "Two hearts, one quiet forever.",                          align: 'center' },
  { id: 10, type: 'SM', text: "✧",                                                       align: 'center' },
  { id: 11, type: 'LG', text: "The space between our hands, before they touch.",         align: 'right',  offset: 'pr-[14%]' },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export const FragmentsOfLove: React.FC = () => {
  return (
    <section
      id="story"
      className="relative w-full flex flex-col items-center pt-0 pb-0 overflow-hidden"
    >

      {/* ── BACKGROUND ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0a0806 0%, #120e0b 40%, #120e0b 70%, #0d0b09 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 35%,
              rgba(209,176,107,0.025) 0%,
              transparent 65%
            ),
            radial-gradient(ellipse 35% 25% at 20% 70%,
              rgba(234,219,195,0.012) 0%,
              transparent 60%
            )
          `,
        }}
      />

      {/* ── PARTICLES ── */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(209,176,107, ${p.opacity})`,
              filter: p.blur,
            }}
            animate={{
              y: ['-18px', '18px', '-18px'],
              opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* CINEMATIC MARQUEE                                      */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative z-30 w-full mt-0">
        <CinematicMarquee />
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SECTION 1: SACRED EMBLEM                               */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative z-30 flex flex-col items-center w-full mt-4">
        <SacredEmblem />
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SECTION 2: TITLE BLOCK                                 */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative z-30 flex flex-col items-center w-full max-w-4xl mx-auto px-6 text-center mb-28">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-2.5 mb-8 shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#D4AF37] pt-[1px]">
            Moments Before Forever
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontFamily: 'serif',
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 200,
            letterSpacing: '0.06em',
            color: '#F2E7D9',
            textShadow: `
              0 0 60px rgba(209,176,107,0.18),
              0 0 120px rgba(209,176,107,0.08),
              0 2px 40px rgba(0,0,0,0.6)
            `,
            marginBottom: '20px',
            lineHeight: 1.15,
          }}
        >
          Fragments of Love
        </motion.h2>

        <LuxuryDivider />
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SECTION 3: FRAGMENT POEMS                              */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative z-30 flex flex-col w-full max-w-5xl mx-auto px-6 gap-10 sm:gap-14 mb-16">
        {fragments.map((frag, index) => {

          let textStyle: React.CSSProperties = {};
          if (frag.type === 'XL') textStyle = {
            fontFamily: 'serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 200,
            color: '#F2E7D9',
            textShadow: '0 0 40px rgba(209,176,107,0.12), 0 2px 20px rgba(0,0,0,0.5)',
            letterSpacing: '0.02em',
          };
          if (frag.type === 'LG') textStyle = {
            fontFamily: 'serif',
            fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#CDBFAE',
            letterSpacing: '0.01em',
          };
          if (frag.type === 'MD') textStyle = {
            fontFamily: 'serif',
            fontSize: 'clamp(1.05rem, 2.2vw, 1.55rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#A89580',
          };
          if (frag.type === 'SM') textStyle = {
            fontFamily: 'serif',
            fontSize: '0.8rem',
            letterSpacing: '0.4em',
            color: 'rgba(184,156,94,0.45)',
          };

          let alignClass = 'text-center';
          if (frag.align === 'left')  alignClass = `text-left  ${frag.offset ?? 'pl-[10%]'}`;
          if (frag.align === 'right') alignClass = `text-right ${frag.offset ?? 'pr-[10%]'}`;

          const floatY = index % 2 === 0 ? ['0px', '-5px', '0px'] : ['0px', '5px', '0px'];
          const floatDuration = 13 + (index % 7);

          return (
            <div key={frag.id} className={`w-full ${alignClass}`}>
              <motion.div
                initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12 + index * 0.07,
                }}
                className="inline-block"
              >
                <motion.div
                  animate={{ y: floatY }}
                  transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
                  style={textStyle}
                >
                  {frag.text}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};