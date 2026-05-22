import React from 'react';
import { motion } from 'framer-motion';

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
// CORNER ACCENTS
// ============================================================
const CornerAccent = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop  = position === 'tl' || position === 'tr';
  const isLeft = position === 'tl' || position === 'bl';
  return (
    <div
      style={{
        position: 'absolute',
        [isTop ? 'top' : 'bottom']: '24px',
        [isLeft ? 'left' : 'right']: '24px',
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        borderTop:    isTop    ? '1px solid rgba(193,168,106,0.18)' : 'none',
        borderBottom: !isTop   ? '1px solid rgba(193,168,106,0.18)' : 'none',
        borderLeft:   isLeft   ? '1px solid rgba(193,168,106,0.18)' : 'none',
        borderRight:  !isLeft  ? '1px solid rgba(193,168,106,0.18)' : 'none',
      }} />
      <div style={{
        position: 'absolute',
        top:    isTop    ? '5px' : 'auto',
        bottom: !isTop   ? '5px' : 'auto',
        left:   isLeft   ? '5px' : 'auto',
        right:  !isLeft  ? '5px' : 'auto',
        width: '16px',
        height: '16px',
        borderTop:    isTop    ? '1px solid rgba(193,168,106,0.1)' : 'none',
        borderBottom: !isTop   ? '1px solid rgba(193,168,106,0.1)' : 'none',
        borderLeft:   isLeft   ? '1px solid rgba(193,168,106,0.1)' : 'none',
        borderRight:  !isLeft  ? '1px solid rgba(193,168,106,0.1)' : 'none',
      }} />
      <div style={{
        position: 'absolute',
        top:    isTop    ? '-2px' : 'auto',
        bottom: !isTop   ? '-2px' : 'auto',
        left:   isLeft   ? '-2px' : 'auto',
        right:  !isLeft  ? '-2px' : 'auto',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'rgba(193,168,106,0.45)',
        boxShadow: '0 0 6px rgba(193,168,106,0.25)',
      }} />
    </div>
  );
};

// ============================================================
// PENDULUM BRIDGE (between emblem and card)
// ============================================================
const PendulumBridge = () => (
  <div
    style={{
      position: 'relative',
      zIndex: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '30vh',
      overflow: 'hidden',
    }}
  >
    {/* Ghost ampersand */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 3 }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '22rem',
        fontFamily: 'serif',
        fontStyle: 'italic',
        color: 'rgba(193,168,106,0.018)',
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
      }}
    >
      &amp;
    </motion.div>

    {/* Top thread */}
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '10vh' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(193,168,106,0.22))',
      }}
    />

    {/* Central jewel */}
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 1.0 }}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '44px',
          height: '44px',
          border: '1px solid rgba(193,168,106,0.1)',
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          border: '1px solid rgba(193,168,106,0.18)',
        }} />
      </motion.div>
      <div style={{
        position: 'absolute',
        width: '6px',
        height: '6px',
        background: 'rgba(209,176,107,0.5)',
        transform: 'rotate(45deg)',
        boxShadow: '0 0 12px rgba(209,176,107,0.35), 0 0 24px rgba(209,176,107,0.12)',
      }} />
    </motion.div>

    {/* Bottom thread */}
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '10vh' }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
      style={{
        width: '1px',
        background: 'linear-gradient(to bottom, rgba(193,168,106,0.22), transparent)',
      }}
    />
  </div>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
export const HeartfeltNote: React.FC = () => {
  return (
    <section
      id="heartfelt-note"
      className="relative w-full flex flex-col items-center justify-center"
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >

      {/* ── BACKGROUND: HARD HEX BLEND TO AVOID SAFARI/CHROME BANDING BUG ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          // Dimulai dari warna terakhir section sebelumnya (#0d0b09) tanpa transparansi
          background: 'linear-gradient(to bottom, #0d0b09 0%, #0f0c0a 50%, #0a0806 100%)',
        }}
      />
      
      {/* Subtle center warm bloom */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(
            ellipse 55% 45% at 50% 38%,
            rgba(193,168,106,0.022) 0%,
            transparent 65%
          )`,
        }}
      />

      {/* ── PARTICLES ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left, top: p.top,
              width: `${p.size}px`, height: `${p.size}px`,
              background: `rgba(209,176,107, ${p.opacity})`,
              filter: p.blur,
            }}
            animate={{
              y: ['-15px', '15px', '-15px'],
              opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      {/* ── PENDULUM BRIDGE ── */}
      <PendulumBridge />

      {/* ── GLASS CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '90%',
          maxWidth: '680px',
          margin: '0 auto',
          padding: '80px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(22,19,17,0.55) 0%, rgba(16,13,11,0.35) 100%)',
          border: '1px solid rgba(193,168,106,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.75), inset 0 1px 0 rgba(193,168,106,0.08)',
          borderRadius: '3px',
        }}
      >
        <CornerAccent position="tl" />
        <CornerAccent position="tr" />
        <CornerAccent position="bl" />
        <CornerAccent position="br" />

        {/* Opening mark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px', zIndex: 10 }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(193,168,106,0.35)', marginBottom: '16px' }}>✦</span>
          <span style={{ fontFamily: 'serif', fontSize: '4rem', color: 'rgba(193,168,106,0.12)', lineHeight: 1, marginTop: '-12px' }}>❝</span>
        </motion.div>

        {/* Primary body */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.0 }}
          style={{
            fontFamily: 'serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#E6DDD2',
            fontWeight: 300,
            lineHeight: 2.2,
            letterSpacing: '0.05em',
            marginBottom: '32px',
            zIndex: 10,
          }}
        >
          <p>
            Though distance or circumstance may keep us apart on this special day,
            please know that your presence in our lives has shaped the love we share.
          </p>
          <span style={{
            display: 'block',
            marginTop: '16px',
            fontStyle: 'italic',
            color: '#C2AE96',
            fontWeight: 400,
            letterSpacing: '0.06em',
          }}>
            Your love and blessings echo deeply in our hearts.
          </span>
        </motion.div>

        {/* Secondary body */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.2 }}
          style={{
            fontFamily: 'serif',
            fontSize: 'clamp(0.82rem, 1.8vw, 0.98rem)',
            color: '#988B7D',
            fontWeight: 300,
            lineHeight: 2.0,
            letterSpacing: '0.06em',
            marginBottom: '48px',
            zIndex: 10,
          }}
        >
          <p>Thank you for being a beautiful, indelible part of our story.</p>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.4 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(193,168,106,0.3))' }} />
            <div style={{ width: '4px', height: '4px', border: '1px solid rgba(193,168,106,0.45)', transform: 'rotate(45deg)' }} />
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(193,168,106,0.3))' }} />
          </div>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#8A7C6E',
            fontWeight: 300,
            marginBottom: '16px',
          }}>
            With all our love
          </span>
          <h3 style={{
            fontFamily: 'serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#EAE2D8',
            fontWeight: 100,
            fontStyle: 'italic',
            textShadow: '0 0 40px rgba(193,168,106,0.12)',
          }}>
            Arin &amp; Afif
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
};