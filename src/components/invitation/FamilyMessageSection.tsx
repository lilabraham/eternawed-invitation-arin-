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
      opacity = Math.random() * 0.04 + 0.015;
      duration = Math.random() * 30 + 30;
      blur = 'blur(1px)';
    } else {
      size = Math.random() * 2 + 1;
      opacity = Math.random() * 0.07 + 0.02;
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

const particles = generateDepthParticles(14);

// ============================================================
// CORNER ACCENTS — luxury gen-Z gold
// ============================================================
const CornerAccent = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop  = position === 'tl' || position === 'tr';
  const isLeft = position === 'tl' || position === 'bl';
  return (
    <div
      style={{
        position: 'absolute',
        [isTop ? 'top' : 'bottom']: '20px',
        [isLeft ? 'left' : 'right']: '20px',
        width: '48px',
        height: '48px',
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      {/* Outer L-bracket */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderTop:    isTop    ? '1.5px solid rgba(209,176,107,0.55)' : 'none',
        borderBottom: !isTop   ? '1.5px solid rgba(209,176,107,0.55)' : 'none',
        borderLeft:   isLeft   ? '1.5px solid rgba(209,176,107,0.55)' : 'none',
        borderRight:  !isLeft  ? '1.5px solid rgba(209,176,107,0.55)' : 'none',
        filter: 'drop-shadow(0 0 4px rgba(209,176,107,0.4))',
      }} />
      {/* Inner L-bracket */}
      <div style={{
        position: 'absolute',
        top:    isTop    ? '7px' : 'auto',
        bottom: !isTop   ? '7px' : 'auto',
        left:   isLeft   ? '7px' : 'auto',
        right:  !isLeft  ? '7px' : 'auto',
        width: '22px',
        height: '22px',
        borderTop:    isTop    ? '1px solid rgba(209,176,107,0.25)' : 'none',
        borderBottom: !isTop   ? '1px solid rgba(209,176,107,0.25)' : 'none',
        borderLeft:   isLeft   ? '1px solid rgba(209,176,107,0.25)' : 'none',
        borderRight:  !isLeft  ? '1px solid rgba(209,176,107,0.25)' : 'none',
      }} />
      {/* Corner dot with glow */}
      <div style={{
        position: 'absolute',
        top:    isTop    ? '-3px' : 'auto',
        bottom: !isTop   ? '-3px' : 'auto',
        left:   isLeft   ? '-3px' : 'auto',
        right:  !isLeft  ? '-3px' : 'auto',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'rgba(209,176,107,0.9)',
        boxShadow: '0 0 8px rgba(209,176,107,0.7), 0 0 16px rgba(209,176,107,0.35)',
      }} />
    </div>
  );
};

// ============================================================
// SIDE ORNAMENT — thin vertical line with diamond
// ============================================================
const SideOrnament = ({ side }: { side: 'left' | 'right' }) => (
  <div style={{
    position: 'absolute',
    top: '50%',
    [side]: '-1px',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    pointerEvents: 'none',
    zIndex: 30,
  }}>
    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(209,176,107,0.4))' }} />
    <div style={{
      width: '5px',
      height: '5px',
      background: 'rgba(209,176,107,0.7)',
      transform: 'rotate(45deg)',
      boxShadow: '0 0 6px rgba(209,176,107,0.5)',
    }} />
    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to top, transparent, rgba(209,176,107,0.4))' }} />
  </div>
);

// ============================================================
// TOP / BOTTOM CENTER ORNAMENT
// ============================================================
const EdgeOrnament = ({ edge }: { edge: 'top' | 'bottom' }) => (
  <div style={{
    position: 'absolute',
    [edge]: '-1px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    pointerEvents: 'none',
    zIndex: 30,
  }}>
    <div style={{ width: '40px', height: '1px', background: `linear-gradient(to ${edge === 'top' ? 'left' : 'right'}, transparent, rgba(209,176,107,0.4))` }} />
    <div style={{
      width: '5px',
      height: '5px',
      background: 'rgba(209,176,107,0.7)',
      transform: 'rotate(45deg)',
      boxShadow: '0 0 8px rgba(209,176,107,0.55), 0 0 16px rgba(209,176,107,0.2)',
    }} />
    <div style={{ width: '40px', height: '1px', background: `linear-gradient(to ${edge === 'top' ? 'right' : 'left'}, transparent, rgba(209,176,107,0.4))` }} />
  </div>
);

// ============================================================
// PENDULUM BRIDGE — WITH GOLD GLOW
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
        color: 'rgba(193,168,106,0.022)',
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
      }}
    >
      &amp;
    </motion.div>

    {/* Top thread with gold glow */}
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '10vh' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(209,176,107,0.6))',
        boxShadow: '0 0 6px rgba(209,176,107,0.35), 0 0 12px rgba(209,176,107,0.15)',
        filter: 'drop-shadow(0 0 3px rgba(209,176,107,0.5))',
      }}
    />

    {/* Central jewel — glowing gold */}
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 1.0 }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0',
        // Gold aura around entire jewel
        filter: 'drop-shadow(0 0 12px rgba(209,176,107,0.65)) drop-shadow(0 0 24px rgba(209,176,107,0.3))',
      }}
    >
      {/* Outer rotating square */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '48px',
          height: '48px',
          border: '1.5px solid rgba(209,176,107,0.45)',
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 0 8px rgba(209,176,107,0.1)',
        }}
      >
        <div style={{
          width: '30px',
          height: '30px',
          border: '1px solid rgba(209,176,107,0.3)',
        }} />
      </motion.div>

      {/* Inner jewel dot */}
      <div style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        background: 'radial-gradient(circle, rgba(255,220,130,1) 0%, rgba(209,176,107,0.8) 60%, transparent 100%)',
        transform: 'rotate(45deg)',
        boxShadow: '0 0 10px rgba(209,176,107,0.9), 0 0 20px rgba(209,176,107,0.5), 0 0 40px rgba(209,176,107,0.2)',
      }} />

      {/* Pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '52px',
          height: '52px',
          border: '1px solid rgba(209,176,107,0.3)',
          transform: 'rotate(45deg)',
        }}
      />
    </motion.div>

    {/* Bottom thread with gold glow */}
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: '10vh' }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
      style={{
        width: '1px',
        background: 'linear-gradient(to bottom, rgba(209,176,107,0.6), transparent)',
        boxShadow: '0 0 6px rgba(209,176,107,0.35), 0 0 12px rgba(209,176,107,0.15)',
        filter: 'drop-shadow(0 0 3px rgba(209,176,107,0.5))',
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

      {/* ── BACKGROUND ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0d0b09 0%, #0f0c0a 50%, #0a0806 100%)',
        }}
      />

      {/* Subtle center warm bloom */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(
            ellipse 55% 45% at 50% 38%,
            rgba(193,168,106,0.028) 0%,
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
              boxShadow: `0 0 ${p.size * 3}px rgba(209,176,107,${p.opacity * 1.5})`,
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
          padding: '80px 52px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          // Slightly more luminous glass
          background: 'linear-gradient(135deg, rgba(28,23,18,0.72) 0%, rgba(18,14,10,0.55) 100%)',
          border: '1px solid rgba(209,176,107,0.18)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          // Gold edge glow
          boxShadow: `
            0 40px 100px rgba(0,0,0,0.80),
            inset 0 1px 0 rgba(209,176,107,0.18),
            inset 0 -1px 0 rgba(209,176,107,0.08),
            0 0 0 1px rgba(209,176,107,0.06),
            0 0 40px rgba(209,176,107,0.06),
            0 0 80px rgba(209,176,107,0.03)
          `,
          borderRadius: '2px',
        }}
      >
        {/* Corner accents */}
        <CornerAccent position="tl" />
        <CornerAccent position="tr" />
        <CornerAccent position="bl" />
        <CornerAccent position="br" />

        {/* Side ornaments */}
        <SideOrnament side="left" />
        <SideOrnament side="right" />

        {/* Edge ornaments */}
        <EdgeOrnament edge="top" />
        <EdgeOrnament edge="bottom" />

        {/* Inner card frame glow line */}
        <div style={{
          position: 'absolute',
          inset: '16px',
          border: '1px solid rgba(209,176,107,0.06)',
          borderRadius: '1px',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Opening mark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px', zIndex: 10 }}
        >
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.45em',
            color: 'rgba(209,176,107,0.55)',
            marginBottom: '12px',
            textShadow: '0 0 8px rgba(209,176,107,0.4)',
          }}>✦</span>
          <span style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '4.5rem',
            color: 'rgba(209,176,107,0.18)',
            lineHeight: 1,
            marginTop: '-10px',
            textShadow: '0 0 20px rgba(209,176,107,0.1)',
          }}>❝</span>
        </motion.div>

        {/* ── PRIMARY BODY — more pop, higher contrast ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.0 }}
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            color: '#F5EDE2',          // brighter warm white
            fontWeight: 400,
            lineHeight: 2.3,
            letterSpacing: '0.04em',
            marginBottom: '28px',
            zIndex: 10,
            // Subtle text glow for pop
            textShadow: '0 0 30px rgba(209,176,107,0.08), 0 1px 2px rgba(0,0,0,0.6)',
          }}
        >
          <p>
            Though distance or circumstance may keep us apart on this special day,
            please know that your presence in our lives has shaped the love we share.
          </p>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 1.3 }}
            style={{
              display: 'block',
              marginTop: '20px',
              fontStyle: 'italic',
              // Gold-tinted italic line — the hero sentence
              color: '#D4A84B',
              fontWeight: 400,
              letterSpacing: '0.07em',
              fontSize: 'clamp(1rem, 2.1vw, 1.15rem)',
              textShadow: '0 0 20px rgba(209,176,107,0.45), 0 0 40px rgba(209,176,107,0.2)',
            }}
          >
            Your love and blessings echo deeply in our hearts.
          </motion.span>
        </motion.div>

        {/* ── DIVIDER LINE ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2 }}
          style={{
            width: '120px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(209,176,107,0.5), transparent)',
            marginBottom: '28px',
            boxShadow: '0 0 8px rgba(209,176,107,0.3)',
            zIndex: 10,
          }}
        />

        {/* ── SECONDARY BODY ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.2 }}
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(0.9rem, 1.9vw, 1.05rem)',
            color: '#C8B89A',          // warmer, more visible muted tone
            fontWeight: 300,
            lineHeight: 2.0,
            letterSpacing: '0.06em',
            marginBottom: '52px',
            zIndex: 10,
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          <p>Thank you for being a beautiful, indelible part of our story.</p>
        </motion.div>

        {/* ── SIGNATURE ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.4 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
        >
          {/* Decorative separator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(209,176,107,0.5))' }} />
            <div style={{
              width: '5px',
              height: '5px',
              border: '1.5px solid rgba(209,176,107,0.65)',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 6px rgba(209,176,107,0.4)',
            }} />
            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(209,176,107,0.5))' }} />
          </div>

          <span style={{
            fontSize: '9px',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'rgba(209,176,107,0.55)',
            fontWeight: 300,
            marginBottom: '18px',
            textShadow: '0 0 10px rgba(209,176,107,0.3)',
            fontFamily: 'Georgia, serif',
          }}>
            With all our love
          </span>

          {/* Name — most prominent element */}
          <h3 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            color: '#F0E6D3',
            fontWeight: 100,
            fontStyle: 'italic',
            textShadow: `
              0 0 30px rgba(209,176,107,0.25),
              0 0 60px rgba(209,176,107,0.12),
              0 2px 4px rgba(0,0,0,0.5)
            `,
            letterSpacing: '0.02em',
          }}>
            Arin &amp; Afif
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
};