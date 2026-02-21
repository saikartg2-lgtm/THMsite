import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const adventures = [
  {
    year: "2023",
    title: "November 2nd",
    description: "SORRY NOTICE KORINI 😢",
    emoji: "🌙",
    color: "#c084fc",
  },
  {
    year: "2024",
    title: "November 2nd",
    description: "SORRY SEROM BHABE NOTICE KORINI 😢",
    emoji: "💫",
    color: "#f472b6",
  },
  {
    year: "2025",
    title: "Feb 2nd",
    description:
      "TUI SEIDIN SUNDOR LAGCHILIS BUT AFTER THE BUS INCIDENT CUTE 💕 AMAR NEXT 2 DIN OI MOMMENT TAR KOTHA BHABTE BHABTE TAR KETE GECHILO REGRET HOCHILO IF KOTHA NOLA JETO. EVEN THO TUI SEIDIN CHOBI CHEYECHILIS TARPOR AND JANTAM NA KI BHABE CONTACT E RAKHBO TOKE BUT HOPEFULLY TOR TEXT ELO AND THE REST IS HISTORY",
    emoji: "🚌",
    color: "#fb923c",
  },
  {
    year: "2025",
    title: "April 9th",
    description: "3-0 FOR LIFE 💜",
    emoji: "🏆",
    color: "#a78bfa",
  },
  {
    year: "2025",
    title: "April 15th",
    description: "FIRST HUG ☆*: .｡. o(≧▽≦)o .｡.:*☆",
    emoji: "🤗",
    color: "#34d399",
  },
  {
    year: "2025",
    title: "May 28th",
    description: "FIRST KISS (˶‾᷄ ⁻̫ ‾᷅˵)",
    emoji: "💋",
    color: "#f43f5e",
  },
  {
    year: "2025",
    title: "June 13th",
    description: "MAIDAN INTENSE ❤️",
    emoji: "🌹",
    color: "#fb7185",
  },
  {
    year: "2025",
    title: "August 18th",
    description: "ABHI NA JAO CHOR KAAARRRRR......",
    emoji: "✈️",
    color: "#60a5fa",
  },
  {
    year: "2025",
    title: "September 4th",
    description: "ELAM TOMAR KACHE PHIRE......",
    emoji: "✈️",
    color: "#60a5fa",
  },
  {
    year: "2025",
    title: "September 24th",
    description: "ELAM TOMAR KACHE PHIRE ABAR PUJO IS ON......",
    emoji: "❤️",
    color: "#cc2424",
  },
  {
    year: "2025",
    title: "October 2ND",
    description: "DASHAMI WAS SPECIAL......",
    emoji: "❤️🫣",
    color: "#cc2424",
  },
  {
    year: "2026",
    title: "FEBRUARY 1ST",
    description: "GURGAON CAME AND TOGETHER AGAIN......",
    emoji: "🫶",
    color: "#f00505",
  },
  {
    year: "2026",
    title: "FEBRUARY 14TH",
    description: "VALENTINE'S DAY WAS SPECIAL WITH YOU......",
    emoji: "💖",
    color: "#6f0606",
  },
];

// Tiny star field
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TimelineCard({ item, index }) {
  const ref = useRef(null);
  const isRight = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-16 ${isRight ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card */}
      <motion.div
        className={`w-[calc(50%-3rem)] ${isRight ? "mr-auto pr-8" : "ml-auto pl-8"}`}
        initial={{ opacity: 0, x: isRight ? -60 : 60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <motion.div
          className="relative rounded-2xl p-6 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${item.color}40`,
            backdropFilter: "blur(16px)",
            boxShadow: `0 8px 40px ${item.color}20, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 16px 60px ${item.color}35, inset 0 1px 0 rgba(255,255,255,0.12)`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow blob behind card */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-25 pointer-events-none"
            style={{ background: item.color }}
          />

          {/* Year badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-3"
            style={{
              background: `${item.color}22`,
              border: `1px solid ${item.color}55`,
              color: item.color,
              fontFamily: "'Georgia', serif",
            }}
          >
            ✦ {item.year}
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-3 leading-tight"
            style={{
              fontFamily: "'Georgia', serif",
              color: "#fff",
              textShadow: `0 0 20px ${item.color}80`,
              letterSpacing: "0.04em",
            }}
          >
            {item.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "'Georgia', serif",
              color: "rgba(255,220,230,0.75)",
              fontStyle: "italic",
            }}
          >
            {item.description}
          </p>

          {/* Corner emoji */}
          <div
            className="absolute bottom-4 right-4 text-2xl"
            style={{ filter: `drop-shadow(0 0 8px ${item.color})` }}
          >
            {item.emoji}
          </div>
        </motion.div>
      </motion.div>

      {/* Center dot on the line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${item.color}, ${item.color}88)`,
            boxShadow: `0 0 0 4px rgba(10,5,15,1), 0 0 0 6px ${item.color}55, 0 0 24px ${item.color}70`,
          }}
        >
          {item.emoji}
        </div>
      </motion.div>
    </div>
  );
}

export default function Page3() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, #0a0514 0%, #100818 40%, #0d0a1a 100%)" }}
    >
      <StarField />

      {/* Ambient glows */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f472b6, transparent 70%)" }} />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-pink-400/50 tracking-[0.4em] text-xs uppercase mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            ✦ written in the stars ✦
          </p>
          <h1
            className="text-6xl font-bold mb-4"
            style={{
              fontFamily: "'Georgia', serif",
              background: "linear-gradient(135deg, #ffd6e7 0%, #ffb3cc 40%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,100,180,0.4))",
              letterSpacing: "0.08em",
            }}
          >
            Our Timeline
          </h1>
          <div
            className="flex items-center justify-center gap-3 text-pink-300/40 text-sm italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span>♡</span>
            <span>every moment, forever kept</span>
            <span>♡</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* The vertical line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, #f472b688, #a78bfa88, #f472b688, transparent)",
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />

          {adventures.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
            style={{
              background: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.3)",
              boxShadow: "0 0 40px rgba(244,63,94,0.15)",
            }}
          >
            <span className="text-2xl">💕</span>
            <p
              className="text-pink-300/80 text-sm italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              and the story continues...
            </p>
            <span className="text-2xl">💕</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}