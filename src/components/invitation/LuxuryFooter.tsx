import React from 'react';
import { motion } from 'framer-motion';

// ============================================================
// LUXURY CINEMATIC FOOTER
// Transitions naturally from dark espresso → warm ivory glow.
// ============================================================

const GlowingZenithOrnament = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
    <div style={{ width: '1px', height: '35px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.7))' }} />
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0' }}>
      <div style={{ 
        width: '10px', height: '10px', 
        border: '1px solid rgba(212,175,55,0.9)', 
        transform: 'rotate(45deg)', 
        boxShadow: '0 0 15px rgba(212,175,55,0.6), inset 0 0 8px rgba(212,175,55,0.4)' 
      }} />
      <div style={{ 
        position: 'absolute', width: '3px', height: '3px', 
        background: '#FFF', borderRadius: '50%', 
        boxShadow: '0 0 12px 2px rgba(212,175,55,1)' 
      }} />
    </div>
    <div style={{ width: '1px', height: '15px', background: 'linear-gradient(to top, transparent, rgba(212,175,55,0.7))' }} />
  </div>
);

const FooterDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', maxWidth: '320px' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6))' }} />
    <div style={{
      width: '6px', height: '6px',
      border: '1px solid rgba(212,175,55,0.8)',
      transform: 'rotate(45deg)',
      background: 'rgba(212,175,55,0.2)',
      boxShadow: '0 0 12px rgba(212,175,55,0.5)',
    }} />
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.6))' }} />
  </div>
);

export const LuxuryFooter: React.FC = () => {
  return (
    <footer
      id="footer"
      style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
    >

      {/* ══════════════════════════════════════════════════════ */}
      {/* ATMOSPHERIC TRANSITION ZONE                           */}
      {/* ══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          width: '100%',
          height: '180px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(
            to bottom,
            #0a0806 0%,
            #0e0b09 40%,
            #15110d 100%
          )`,
        }} />
        <div style={{
          position: 'absolute', inset: 0, mixBlendMode: 'screen',
          background: `radial-gradient(
            ellipse 70% 70% at 50% 100%,
            rgba(212,175,55,0.04) 0%,
            transparent 70%
          )`,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* FOOTER BODY                                           */}
      {/* ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: `
            linear-gradient(
              to bottom,
              #15110d 0%,
              #1a1511 18%,
              #1c1611 35%,
              #1e1813 55%,
              #201913 100%
            )
          `,
          paddingBottom: '80px',
        }}
      >
        {/* Spotlight Backlight for Typography */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen',
            background: `radial-gradient(
              ellipse 55% 45% at 50% 30%,
              rgba(212,175,55,0.06) 0%,
              transparent 65%
            )`,
          }}
        />

        {/* — — — CONTENT — — — */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}>

          {/* Ornamen Puncak & Top whisper line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <GlowingZenithOrnament />
            <p style={{
              fontSize: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.6em',
              color: '#D4AF37',
              fontWeight: 400,
              marginBottom: '32px',
              textShadow: '0 0 12px rgba(212,175,55,0.5)',
            }}>
              In silence, we found forever
            </p>
          </motion.div>

          {/* ========================================================= */}
          {/* NAMA MEMPELAI DENGAN FONT SCRIPT/KALIGRAFI PROJECT ANDA   */}
          {/* ========================================================= */}
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-script" // Menggunakan font bawaan project persis seperti gambar
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', // Dibuat jauh lebih besar agar seimbang dengan font kaligrafi
              fontWeight: 400,
              color: '#D4AF37', // Emas klasik
              // Glow emas yang kuat di belakang teks
              textShadow: `
                0 0 40px rgba(212,175,55,0.5), 
                0 0 80px rgba(212,175,55,0.2), 
                0 4px 15px rgba(0,0,0,0.8)
              `,
              letterSpacing: 'normal', // PENTING: Font script tidak boleh ada spacing
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            Arin &amp; Afif
          </motion.h2>
          {/* ========================================================= */}

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{ marginBottom: '36px' }}
          >
            <FooterDivider />
          </motion.div>

          {/* Wedding date */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.7 }}
            style={{
              fontSize: '10px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              opacity: 0.8,
              fontWeight: 400,
              marginBottom: '42px',
              textShadow: '0 0 10px rgba(212,175,55,0.4)',
            }}
          >
            2026 &nbsp;·&nbsp; Sacred Ceremony
          </motion.p>

          {/* Closing verse */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.9 }}
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
              fontStyle: 'italic',
              color: '#E4D5C7',
              fontWeight: 300,
              lineHeight: 2.2,
              letterSpacing: '0.05em',
              maxWidth: '460px',
              marginBottom: '64px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            "And in the quiet space between two hearts,<br />
            love chose to make its home."
          </motion.p>

          {/* Bottom cinematic rule */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 1.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
            }}
          >
            {/* Long glowing gold line */}
            <div style={{
              width: '140px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent)',
              boxShadow: '0 0 12px rgba(212,175,55,0.4)',
            }} />

            {/* Copyright whisper */}
            <p style={{
              fontSize: '7px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              opacity: 0.6,
              fontWeight: 400,
            }}>
              With love, always
            </p>
          </motion.div>

        </div>

        {/* Bottom edge vignette — seals the composition */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, rgba(5,4,3,0.8))',
            pointerEvents: 'none',
          }}
        />
      </div>

    </footer>
  );
};