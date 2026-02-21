import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const TRUTHS = [
  "What's your most embarrassing memory of us? 😳",
  "When did you first realise you liked me? 💭",
  "What's one thing you wish I did more often? 🌸",
  "What's your favourite thing about my personality? ✨",
  "Have you ever lied to me? About what? 🤭",
  "What's the most romantic thing you've ever imagined doing for me? 💝",
  "What song reminds you of me and why? 🎵",
  "What's one habit of mine you secretly love? 🥰",
  "When did you feel closest to me? 💑",
  "What's one thing you've never told me? 🤫",
];

const DARES = [
  "Sing the first line of your favourite song dedicated to me 🎤",
  "Give me the longest hug you can manage 🤗",
  "Text me one thing you love about me RIGHT NOW 📱",
  "Do your best impression of me 😂",
  "Say 3 genuine compliments to me without laughing 😊",
  "Write my name on your hand and keep it there all day ✍️",
  "Share the last photo on your phone — no deleting first! 📸",
  "Hold my hand for the next 5 minutes 🤝",
  "Tell me your most embarrassing moment 😱",
  "Draw a portrait of me (30 seconds only) 🎨",
];

const WYR_QUESTIONS = [
  { a: "Go on a surprise trip together 🌍", b: "Have a cozy staycation forever 🏠" },
  { a: "Always know what I'm thinking 🧠", b: "Never fight, ever 💕" },
  { a: "Cuddle for 1 hour straight 🤗", b: "Laugh together non-stop for 1 hour 😂" },
  { a: "Have our first date again 🌹", b: "Relive our best day together ☀️" },
  { a: "Live in a big city together 🏙️", b: "Live in a quiet countryside cottage 🌿" },
  { a: "Cook for me every day 👨‍🍳", b: "Take me on a date every week 🥂" },
  { a: "Be each other's best friend 👯", b: "Be each other's partner in crime 😈" },
  { a: "Travel the world together 🗺️", b: "Build a home together 🏡" },
];

const CARD_EMOJIS = ["💕","🌸","💋","🌹","💍","🎵","✨","🦋"];
const ALL_CARDS = [...CARD_EMOJIS, ...CARD_EMOJIS]
  .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))
  .sort(() => Math.random() - 0.5);

// ─────────────────────────────────────────────
// GAME: TRUTH OR DARE SPINNER
// ─────────────────────────────────────────────
function TruthOrDareGame() {
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState(null);
  const [card, setCard] = useState(null);
  const [mode, setMode] = useState(null); // 'truth' | 'dare'

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setCard(null);
    setMode(null);
    const spins = 1440 + Math.random() * 720;
    const newAngle = angle + spins;
    setAngle(newAngle);
    setTimeout(() => {
      const finalAngle = newAngle % 360;
      const isTruth = finalAngle < 180;
      const m = isTruth ? "truth" : "dare";
      const pool = isTruth ? TRUTHS : DARES;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      setMode(m);
      setCard(picked);
      setResult(m);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Spinner wheel */}
      <div className="relative flex items-center justify-center">
        {/* Pointer */}
        <div className="absolute -top-4 z-20 text-2xl" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}>
          ▼
        </div>

        <motion.div
          className="w-52 h-52 rounded-full relative overflow-hidden cursor-pointer"
          style={{
            background: "conic-gradient(#f43f5e 0deg 180deg, #6366f1 180deg 360deg)",
            boxShadow: "0 0 40px rgba(244,63,94,0.4), 0 0 80px rgba(99,102,241,0.2)",
          }}
          animate={{ rotate: angle }}
          transition={{ duration: 3, ease: [0.2, 0, 0.1, 1] }}
          onClick={spin}
        >
          {/* TRUTH half label */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(-90deg)" }}>
            <div style={{ transform: "translateY(-38px) rotate(90deg)" }}>
              <p className="text-white font-bold text-lg tracking-widest" style={{ fontFamily: "'Georgia', serif" }}>
                TRUTH
              </p>
            </div>
          </div>
          {/* DARE half label */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(90deg)" }}>
            <div style={{ transform: "translateY(-38px) rotate(-90deg)" }}>
              <p className="text-white font-bold text-lg tracking-widest" style={{ fontFamily: "'Georgia', serif" }}>
                DARE
              </p>
            </div>
          </div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/90 shadow-lg z-10" />
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={spin}
        disabled={spinning}
        className="px-10 py-3.5 rounded-full font-bold text-white tracking-widest"
        style={{
          fontFamily: "'Georgia', serif",
          background: spinning
            ? "rgba(255,255,255,0.1)"
            : "linear-gradient(135deg, #f43f5e, #6366f1)",
          boxShadow: spinning ? "none" : "0 4px 24px rgba(244,63,94,0.4)",
          letterSpacing: "0.15em",
        }}
        whileHover={!spinning ? { scale: 1.05 } : {}}
        whileTap={!spinning ? { scale: 0.95 } : {}}
      >
        {spinning ? "Spinning..." : "✦ SPIN ✦"}
      </motion.button>

      <AnimatePresence>
        {card && (
          <motion.div
            className="max-w-sm w-full rounded-3xl p-6 text-center"
            style={{
              background: mode === "truth"
                ? "rgba(244,63,94,0.12)"
                : "rgba(99,102,241,0.12)",
              border: `1.5px solid ${mode === "truth" ? "rgba(244,63,94,0.4)" : "rgba(99,102,241,0.4)"}`,
              boxShadow: `0 8px 40px ${mode === "truth" ? "rgba(244,63,94,0.2)" : "rgba(99,102,241,0.2)"}`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div
              className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
              style={{
                color: mode === "truth" ? "#f43f5e" : "#6366f1",
                fontFamily: "'Georgia', serif",
              }}
            >
              ✦ {mode} ✦
            </div>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: "'Georgia', serif", color: "#f0e6ff" }}
            >
              {card}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// GAME: WOULD YOU RATHER
// ─────────────────────────────────────────────
function WouldYouRather() {
  const [qIndex, setQIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [scores, setScores] = useState({ a: 0, b: 0 });
  const [done, setDone] = useState(false);

  const q = WYR_QUESTIONS[qIndex];

  const choose = (side) => {
    if (chosen) return;
    setChosen(side);
    setScores((prev) => ({ ...prev, [side]: prev[side] + 1 }));
    setTimeout(() => {
      if (qIndex + 1 >= WYR_QUESTIONS.length) {
        setDone(true);
      } else {
        setQIndex((i) => i + 1);
        setChosen(null);
      }
    }, 1200);
  };

  const reset = () => {
    setQIndex(0);
    setChosen(null);
    setScores({ a: 0, b: 0 });
    setDone(false);
  };

  if (done) {
    return (
      <motion.div
        className="flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-5xl">💕</div>
        <h3 className="text-2xl font-bold" style={{ fontFamily: "'Georgia', serif", color: "#ffd6e7" }}>
          You've answered all questions!
        </h3>
        <div
          className="rounded-2xl px-8 py-5 text-center"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p style={{ fontFamily: "'Georgia', serif", color: "rgba(255,200,220,0.7)", fontSize: "0.85rem" }}>
            Option A chosen: <strong style={{ color: "#f472b6" }}>{scores.a}×</strong>
            {"  ·  "}
            Option B chosen: <strong style={{ color: "#a78bfa" }}>{scores.b}×</strong>
          </p>
        </div>
        <motion.button
          onClick={reset}
          className="px-8 py-3 rounded-full font-bold tracking-wider"
          style={{
            fontFamily: "'Georgia', serif",
            background: "linear-gradient(135deg, #f472b6, #a78bfa)",
            color: "#fff",
            boxShadow: "0 4px 20px rgba(167,139,250,0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again ↺
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      {/* Progress */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(to right, #f472b6, #a78bfa)" }}
            animate={{ width: `${((qIndex) / WYR_QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs" style={{ color: "rgba(255,200,220,0.5)", fontFamily: "'Georgia', serif" }}>
          {qIndex + 1}/{WYR_QUESTIONS.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          className="w-full"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35 }}
        >
          <p
            className="text-center text-xs tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "'Georgia', serif", color: "rgba(244,114,182,0.5)" }}
          >
            ✦ would you rather ✦
          </p>

          <div className="grid grid-cols-1 gap-4">
            {[
              { side: "a", text: q.a, color: "#f472b6", glow: "rgba(244,114,182,0.3)" },
              { side: "b", text: q.b, color: "#a78bfa", glow: "rgba(167,139,250,0.3)" },
            ].map(({ side, text, color, glow }) => (
              <motion.button
                key={side}
                onClick={() => choose(side)}
                disabled={!!chosen}
                className="w-full p-5 rounded-2xl text-left relative overflow-hidden"
                style={{
                  background: chosen === side
                    ? `${color}22`
                    : chosen
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(255,255,255,0.06)",
                  border: `1.5px solid ${chosen === side ? color + "66" : "rgba(255,255,255,0.1)"}`,
                  boxShadow: chosen === side ? `0 4px 24px ${glow}` : "none",
                  transition: "all 0.4s ease",
                }}
                whileHover={!chosen ? { scale: 1.02, background: `${color}15` } : {}}
                whileTap={!chosen ? { scale: 0.98 } : {}}
              >
                <span
                  className="text-xs font-bold tracking-widest block mb-1.5"
                  style={{ color, fontFamily: "'Georgia', serif" }}
                >
                  {side.toUpperCase()}
                </span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Georgia', serif", color: "#f0e6ff" }}
                >
                  {text}
                </span>
                {chosen === side && (
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// GAME: MEMORY MATCH
// ─────────────────────────────────────────────
function MemoryMatch() {
  const [cards, setCards] = useState(ALL_CARDS.map(c => ({ ...c })));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [lock, setLock] = useState(false);

  const reset = () => {
    setCards(
      [...CARD_EMOJIS, ...CARD_EMOJIS]
        .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))
        .sort(() => Math.random() - 0.5)
    );
    setFlipped([]);
    setMoves(0);
    setWon(false);
    setLock(false);
  };

  const handleFlip = (card) => {
    if (lock || card.flipped || card.matched) return;
    if (flipped.length === 2) return;

    const newCards = cards.map(c =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    const newFlipped = [...flipped, card];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLock(true);
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      if (a.emoji === b.emoji) {
        const matched = newCards.map(c =>
          c.emoji === a.emoji ? { ...c, matched: true } : c
        );
        setCards(matched);
        setFlipped([]);
        setLock(false);
        if (matched.every(c => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c
          ));
          setFlipped([]);
          setLock(false);
        }, 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6">
        <div
          className="px-4 py-2 rounded-full text-sm"
          style={{
            fontFamily: "'Georgia', serif",
            background: "rgba(255,255,255,0.07)",
            color: "rgba(255,200,220,0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Moves: <strong style={{ color: "#f472b6" }}>{moves}</strong>
        </div>
        <motion.button
          onClick={reset}
          className="px-4 py-2 rounded-full text-sm font-bold"
          style={{
            fontFamily: "'Georgia', serif",
            background: "rgba(244,114,182,0.15)",
            color: "#f9a8d4",
            border: "1px solid rgba(244,114,182,0.3)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
        >
          ↺ Reset
        </motion.button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="w-16 h-16 rounded-2xl cursor-pointer flex items-center justify-center text-2xl select-none"
            style={{
              background: card.flipped || card.matched
                ? card.matched
                  ? "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(16,185,129,0.15))"
                  : "linear-gradient(135deg, rgba(244,114,182,0.2), rgba(167,139,250,0.15))"
                : "rgba(255,255,255,0.06)",
              border: card.matched
                ? "1.5px solid rgba(52,211,153,0.5)"
                : card.flipped
                ? "1.5px solid rgba(244,114,182,0.5)"
                : "1.5px solid rgba(255,255,255,0.1)",
              boxShadow: card.matched
                ? "0 4px 20px rgba(52,211,153,0.25)"
                : card.flipped
                ? "0 4px 20px rgba(244,114,182,0.25)"
                : "none",
              transition: "all 0.3s ease",
            }}
            onClick={() => handleFlip(card)}
            animate={{
              rotateY: card.flipped || card.matched ? 0 : 180,
              scale: card.matched ? [1, 1.15, 1] : 1,
            }}
            transition={{ duration: 0.35 }}
          >
            {card.flipped || card.matched ? card.emoji : "💫"}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            className="text-center mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-4xl mb-2">🎉💕🎉</div>
            <p
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "'Georgia', serif", color: "#ffd6e7" }}
            >
              You matched them all!
            </p>
            <p
              className="text-sm italic mb-4"
              style={{ fontFamily: "'Georgia', serif", color: "rgba(255,200,220,0.6)" }}
            >
              Completed in {moves} moves ✨
            </p>
            <motion.button
              onClick={reset}
              className="px-8 py-3 rounded-full font-bold tracking-wider"
              style={{
                fontFamily: "'Georgia', serif",
                background: "linear-gradient(135deg, #34d399, #059669)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(52,211,153,0.4)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again ↺
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE6
// ─────────────────────────────────────────────
const GAMES = [
  { id: "tod",    label: "Truth or Dare",    emoji: "🎯", color: "#f43f5e", accent: "#6366f1", desc: "Spin the wheel, face the challenge" },
  { id: "wyr",    label: "Would You Rather", emoji: "💭", color: "#f472b6", accent: "#a78bfa", desc: "Discover what you'd both choose" },
  { id: "memory", label: "Memory Match",     emoji: "🃏", color: "#34d399", accent: "#60a5fa", desc: "Find all matching pairs together" },
];

const FLOATING_EMOJIS = ["💕","🎮","✨","💋","🌸","⭐","🎯","💫","🎪","💝"];

export default function Page6() {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0d0520 0%, #130a2e 40%, #0f0818 100%)",
      }}
    >
      {/* Floating background emojis */}
      {FLOATING_EMOJIS.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none opacity-10"
          style={{
            top: `${10 + (i * 17) % 80}%`,
            left: `${5 + (i * 23) % 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.07, 0.14, 0.07],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f43f5e, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-14">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-pink-400/50 tracking-[0.4em] text-xs uppercase mb-3"
            style={{ fontFamily: "'Georgia', serif" }}>
            ✦ just the two of us ✦
          </p>
          <h1
            className="text-6xl font-bold mb-3"
            style={{
              fontFamily: "'Georgia', serif",
              background: "linear-gradient(135deg, #ffd6e7 0%, #f472b6 45%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(244,114,182,0.4))",
              letterSpacing: "0.06em",
            }}
          >
            Game Night 🎮
          </h1>
          <p className="text-pink-300/50 text-sm italic" style={{ fontFamily: "'Georgia', serif" }}>
            pick a game and play together
          </p>
        </motion.div>

        {/* Game selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {GAMES.map((game, i) => (
            <motion.button
              key={game.id}
              onClick={() => setActiveGame(activeGame === game.id ? null : game.id)}
              className="relative p-6 rounded-3xl text-left overflow-hidden"
              style={{
                background: activeGame === game.id
                  ? `linear-gradient(135deg, ${game.color}20, ${game.accent}15)`
                  : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${activeGame === game.id ? game.color + "55" : "rgba(255,255,255,0.08)"}`,
                boxShadow: activeGame === game.id
                  ? `0 8px 40px ${game.color}25`
                  : "none",
                transition: "all 0.4s ease",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.03,
                background: `linear-gradient(135deg, ${game.color}18, ${game.accent}12)`,
                borderColor: game.color + "44",
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Active indicator */}
              {activeGame === game.id && (
                <motion.div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{ background: game.color, boxShadow: `0 0 8px ${game.color}` }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              <div className="text-4xl mb-3">{game.emoji}</div>
              <h3
                className="font-bold text-base mb-1"
                style={{
                  fontFamily: "'Georgia', serif",
                  color: activeGame === game.id ? game.color : "#ffd6e7",
                  letterSpacing: "0.03em",
                }}
              >
                {game.label}
              </h3>
              <p
                className="text-xs italic"
                style={{ fontFamily: "'Georgia', serif", color: "rgba(255,200,220,0.45)" }}
              >
                {game.desc}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Game area */}
        <AnimatePresence mode="wait">
          {activeGame && (
            <motion.div
              key={activeGame}
              className="rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 16px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeGame === "tod"    && <TruthOrDareGame />}
              {activeGame === "wyr"    && <WouldYouRather />}
              {activeGame === "memory" && <MemoryMatch />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!activeGame && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🎮
            </motion.div>
            <p
              className="text-lg italic"
              style={{ fontFamily: "'Georgia', serif", color: "rgba(255,200,220,0.4)" }}
            >
              choose a game above to start playing ✨
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}