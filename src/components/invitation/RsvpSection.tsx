"use client";

import { FormEvent, useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Wish {
  id: string;
  guestName: string;
  message: string;
  attendanceStatus: "attending" | "unable";
  guestCount: number;
}

interface FormState {
  guestName: string;
  guestCount: string;
  attendanceStatus: "attending" | "unable";
  message: string;
}

// ─── CONSTANTS (ERROR FIXED: Variabel process dihapus) ────────────────────────

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbydLZdHofCJeSDDTldP8QPcn7-a2Yv4kpfsMzSN72KYyzqB9DtCRySy6-3hFPeM0BIx/exec";

const INITIAL_FORM: FormState = {
  guestName: "",
  guestCount: "1",
  attendanceStatus: "attending",
  message: "",
};

// ... (LANJUTKAN DENGAN KOMPONEN WishCard, VerticalColumn, dst yang sudah Anda miliki) ...

// ─── WISH CARD ────────────────────────────────────────────────────────────────

const WishCard = ({ wish }: { wish: Wish }) => (
  <div
    className="
    relative overflow-hidden
    w-full rounded-[1.25rem]
    border border-[#D4AF37]/[0.08]
    p-5
    transition-all duration-700
    shadow-[0_12px_34px_rgba(0,0,0,0.22),0_2px_8px_rgba(212,175,55,0.05),inset_0_1px_0_rgba(255,248,220,0.03)]
    hover:border-[#D4AF37]/[0.18]
  "
    style={{
      background: `
      linear-gradient(
        145deg,
        rgba(34,26,21,0.96) 0%,
        rgba(20,16,13,0.94) 38%,
        rgba(43,33,27,0.95) 100%
      )
    `,
    }}
  >
    <div className="pointer-events-none absolute inset-0">
      <div
        className="
      absolute inset-0 opacity-[0.14]
      bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.14),transparent_38%)]
    "
      />
      <div
        className="
      absolute inset-0 opacity-[0.08]
      bg-[linear-gradient(135deg,transparent_40%,rgba(255,220,160,0.08)_100%)]
    "
      />
    </div>
    <p className="text-[11px] leading-[1.75] text-[#e8dcc8]/45 italic font-light mb-4">
      &ldquo;{wish.message || "Wishing you endless love and happiness."}&rdquo;
    </p>
    <div className="flex flex-col gap-1 border-t border-[#D4AF37]/[0.07] pt-3">
      <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#D4AF37]/75 font-bold">
        {wish.guestName}
      </span>
      <span className="text-[7.5px] uppercase tracking-widest text-[#e8dcc8]/20">
        {wish.attendanceStatus === "attending"
          ? "◆ Joyfully Accepted"
          : "◇ Sadly Declined"}
      </span>
    </div>
  </div>
);

// ─── VERTICAL COLUMN ─────────────────────────────────────────────────────────

const VerticalColumn = ({
  items,
  direction = "up",
  speed = 45,
}: {
  items: Wish[];
  direction?: "up" | "down";
  speed?: number;
}) => {
  // Guard: need ≥1 item to scroll meaningfully
  if (items.length === 0) return <div className="flex-1" />;

  const duplicated = [...items, ...items];
  const segmentHeight = items.length * 188 // approx card height + gap

  return (
    <div className="relative h-[600px] overflow-hidden flex-1">
      <motion.div
        animate={{
  y:
    direction === 'up'
      ? [0, -segmentHeight]
      : [-segmentHeight, 0],
}}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-4"
      >
        {duplicated.map((wish, idx) => (
          <WishCard key={`${wish.id}-${idx}`} wish={wish} />
        ))}
      </motion.div>
    </div>
  );
};

// ─── FORM FIELD WRAPPER ───────────────────────────────────────────────────────

const fieldBase =
  "h-14 w-full px-5 outline-none rounded-2xl bg-[linear-gradient(145deg,rgba(28,22,18,0.72),rgba(20,16,13,0.82))] border border-[#D4AF37]/[0.09] text-[#e8dcc8]/80 placeholder:text-[#e8dcc8]/15 focus:border-[#D4AF37]/35 focus:bg-[#1a1510]/80 transition-all duration-300 text-sm";

const labelBase =
  "text-[9.5px] text-[#e8dcc8]/35 tracking-[0.18em] uppercase block mb-2";

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

export function RsvpSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const fetchWishes = useCallback(async () => {
    try {
      // ✅ PERBAIKAN: Menggunakan GOOGLE_SCRIPT_URL
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?t=${Date.now()}`);
      const data: Wish[] = await res.json();
      setWishes(data);
    } catch (err) {
      console.error("Failed to fetch wishes:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const columns = useMemo<[Wish[], Wish[], Wish[]]>(() => {
    const cols: [Wish[], Wish[], Wish[]] = [[], [], []];
    wishes.forEach((w, i) => cols[(i % 3) as 0 | 1 | 2].push(w));
    return cols;
  }, [wishes]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.guestName.trim()) { alert('Please enter your name'); return; }
    
    setIsSubmitting(true)
    
    try {
      // Kita kembalikan ke FormData agar sesuai dengan script di Google Sheet
      const formData = new FormData();
      formData.append('guestName', form.guestName);
      formData.append('guestCount', form.guestCount);
      formData.append('attendanceStatus', form.attendanceStatus);
      formData.append('message', form.message);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData, // Mengirim sebagai FormData, bukan JSON
        mode: 'no-cors' // Wajib untuk Google Apps Script
      });

      setSubmitted(true);
      setForm(INITIAL_FORM);
      
      // Refresh wall agar data baru muncul
      setTimeout(fetchWishes, 1500);
      
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Could not send RSVP. Please check your connection.');
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="px-4 pb-32 sm:px-6 lg:px-10">
      <div className="invitation-shell mx-auto max-w-7xl">
        <div className="grid gap-8 lg:gap-16 lg:grid-cols-[1fr_1.5fr] items-start">
          {/* ── LEFT: RSVP FORM ── */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/[0.12] bg-[linear-gradient(145deg,rgba(28,22,18,0.96)_0%,rgba(16,13,11,0.94)_45%,rgba(38,30,24,0.96)_100%)] backdrop-blur-[4px] p-8 sm:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(212,175,55,0.09)] h-fit">
            {/* Inner ambient glow */}
            <div
              className="
    pointer-events-none absolute inset-0
    bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.07),transparent_30%)]
  "
            />
            <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 flex flex-col items-center justify-center py-16 gap-5 text-center"
                >
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center">
                    <span className="text-[#D4AF37] text-xl">✦</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
                    Received
                  </p>
                  <p className="text-white/50 text-sm font-light max-w-[220px]">
                    Your attendance has been gracefully noted. We look forward
                    to celebrating with you.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25 hover:text-white/50 transition-colors"
                  >
                    Submit another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 space-y-7"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]/80 font-bold mb-6">
                      Registration
                    </p>
                    <label className={labelBase}>Full Name</label>
                    <input
                      type="text"
                      name="guestName"
                      value={form.guestName}
                      onChange={handleChange}
                      required
                      className={fieldBase}
                      placeholder="e.g., Mr. & Mrs. Anderson"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelBase}>Seats Reserved</label>
                      <select
                        name="guestCount"
                        value={form.guestCount}
                        onChange={handleChange}
                        className={
                          fieldBase + " appearance-none cursor-pointer"
                        }
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n} className="bg-[#14100e]">
                            {n} Person{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelBase}>Attendance</label>
                      <select
                        name="attendanceStatus"
                        value={form.attendanceStatus}
                        onChange={handleChange}
                        className={
                          fieldBase + " appearance-none cursor-pointer"
                        }
                      >
                        <option value="attending" className="bg-[#14100e]">
                          I&apos;m coming!
                        </option>
                        <option value="unable" className="bg-[#14100e]">
                          Unable to attend
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelBase}>Heartfelt Wishes</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className={fieldBase + " !h-auto p-5 resize-none"}
                      placeholder="Write your warmest wishes…"
                    />
                  </div>

                  {/* ── PREMIUM CTA ── */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.975 }}
                    className="relative h-14 w-full rounded-full overflow-hidden text-[#1a1410] font-bold tracking-[0.22em] text-[10.5px] uppercase
                      shadow-[0_12px_40px_rgba(212,175,55,0.22),0_2px_12px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,248,220,0.22)],0_2px_8px_rgba(212,175,55,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                      disabled:opacity-50 disabled:cursor-not-allowed transition-shadow duration-300
                      hover:shadow-[0_12px_40px_rgba(212,175,55,0.35),0_4px_12px_rgba(212,175,55,0.2)]"
                    style={{
                      background: `
linear-gradient(
  135deg,
  #b8921f 0%,
  #e3c14a 38%,
  #f0d77a 52%,
  #c89f28 100%
)
`,
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block w-3 h-3 border border-[#1a1410]/40 border-t-[#1a1410] rounded-full"
                        />
                        Sending…
                      </span>
                    ) : (
                      "Confirm Attendance"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: GUEST BOOK ── */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/[0.08] bg-[linear-gradient(145deg,rgba(30,23,19,0.95)_0%,rgba(17,14,11,0.93)_48%,rgba(40,31,26,0.95)_100%)] backdrop-blur-[3px] shadow-[0_40px_120px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(212,175,55,0.05)] p-6">
            {/* Panel anchor */}
            <div className="relative z-10 flex items-center gap-4 mb-5 px-1">
              <span className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]/40 font-bold">
                Guest Wishes
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/15 to-transparent" />
            </div>

            {/* Ambient radial behind cards */}
            <div
              className="
    absolute inset-0 opacity-[0.10]
    bg-[linear-gradient(135deg,transparent_25%,rgba(212,175,55,0.08)_100%)]
  "
            />
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(212,175,55,0.055)_0%,transparent_65%)]" />
            </div>

            {/* Fade mask */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
              }}
            />

            <div className="relative flex gap-4 sm:gap-5 h-[560px] z-10">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex w-full items-center justify-center text-[#D4AF37]/30 uppercase tracking-[0.3em] text-[9px]"
                  style={{ willChange: 'transform' }}
                >
                  Gathering wishes…
                </motion.div>
              ) : wishes.length === 0 ? (
                <div className="flex w-full items-center justify-center flex-col gap-3 opacity-40">
                  <span className="text-[#D4AF37] text-2xl">✦</span>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                    Be the first to leave a wish
                  </p>
                </div>
              ) : (
                <>
                  <VerticalColumn
                    items={columns[0]}
                    direction="up"
                    speed={32}
                  />
                  <VerticalColumn
                    items={columns[1]}
                    direction="down"
                    speed={44}
                  />
                  <VerticalColumn
                    items={columns[2]}
                    direction="up"
                    speed={38}
                  />
                </>
              )}
            </div>

            {/* Footer bar */}
            <div className="relative z-10 mt-5 flex items-center justify-between px-1">
              <p className="text-[8.5px] uppercase tracking-[0.3em] text-white/25 italic">
                Drifting softly across the page
              </p>
              <div className="h-px flex-1 mx-5 bg-gradient-to-r from-[#D4AF37]/12 via-[#D4AF37]/20 to-transparent" />
              <span className="text-[8.5px] text-[#D4AF37]/60 font-bold uppercase tracking-[0.2em]">
                {wishes.length} Recorded
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
