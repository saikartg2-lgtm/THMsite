import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import w2 from "./images/w2.png";

const FloatingHeart = ({ style, delay, size = "text-2xl" }) => (
  <motion.div
    className={`absolute pointer-events-none select-none ${size}`}
    style={style}
    initial={{ opacity: 0, y: 0, scale: 0.5 }}
    animate={{
      opacity: [0, 0.8, 0.8, 0],
      y: [-10, -80, -140, -200],
      x: [0, 15, -10, 20],
      scale: [0.5, 1, 0.9, 0.5],
      rotate: [-10, 10, -5, 15],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
      ease: "easeOut",
    }}
  >
    💕
  </motion.div>
);

const Sparkle = ({ style, delay }) => (
  <motion.div
    className="absolute pointer-events-none select-none text-pink-300"
    style={style}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 4 + 1,
    }}
  >
    ✦
  </motion.div>
);

export default function Page1() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === "mampu") {
      setSuccess(true);
      setTimeout(() => navigate("/page2"), 1200);
    } else {
      setError("Incorrect password. Try again! 🙈");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const hearts = [
    { style: { left: "8%", bottom: "20%" }, delay: 0 },
    { style: { left: "18%", bottom: "15%" }, delay: 1.2 },
    { style: { left: "75%", bottom: "25%" }, delay: 0.6 },
    { style: { left: "85%", bottom: "18%" }, delay: 2 },
    { style: { left: "50%", bottom: "10%" }, delay: 0.3 },
    { style: { left: "35%", bottom: "20%" }, delay: 1.8 },
    { style: { left: "62%", bottom: "12%" }, delay: 0.9 },
  ];

  const sparkles = [
    { style: { left: "15%", top: "20%" }, delay: 0.5 },
    { style: { right: "20%", top: "15%" }, delay: 1.5 },
    { style: { left: "30%", top: "60%" }, delay: 0.8 },
    { style: { right: "15%", top: "50%" }, delay: 2.2 },
    { style: { left: "70%", top: "30%" }, delay: 1.1 },
    { style: { left: "5%", top: "45%" }, delay: 3.0 },
    { style: { right: "8%", top: "70%" }, delay: 0.3 },
    { style: { left: "55%", top: "15%" }, delay: 1.7 },
  ];

  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${w2})` }}
    >
      {/* Dreamy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950/30 via-rose-900/20 to-pink-950/50 backdrop-blur-[2px]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-400/10 rounded-full blur-3xl" />

      {/* Floating sparkles */}
      {sparkles.map((s, i) => (
        <Sparkle key={i} style={s.style} delay={s.delay} />
      ))}

      {/* Floating hearts */}
      {hearts.map((h, i) => (
        <FloatingHeart key={i} style={h.style} delay={h.delay} />
      ))}

      {/* Main card */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-10 py-12 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,182,193,0.3)",
          boxShadow: "0 8px 64px rgba(255,100,150,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top decoration */}
        <motion.div
          className="text-4xl mb-1"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          🌸
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-1 text-center"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2.4rem",
            fontWeight: "700",
            background: "linear-gradient(135deg, #ffd6e7 0%, #ffb3cc 40%, #ff85a1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.04em",
            textShadow: "none",
            filter: "drop-shadow(0 2px 12px rgba(255,100,150,0.5))",
          }}
        >
          BHUTU v-69.0
        </motion.h1>

        <motion.p
          className="text-pink-200/70 text-sm mb-8 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.2em" }}
        >
          ✦ private portal ✦
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleLogin}
          className="flex flex-col items-center w-full gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Password field */}
          <motion.div
            className="relative w-full"
            animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.45 }}
          >
            <div
              className="absolute inset-0 rounded-2xl blur-md"
              style={{
                background: error
                  ? "rgba(255,80,80,0.15)"
                  : "rgba(255,150,180,0.15)",
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="enter the secret word..."
              autoFocus
              className="relative w-full px-5 py-3.5 rounded-2xl text-pink-100 placeholder-pink-300/50 outline-none text-center tracking-widest"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.05rem",
                background: "rgba(255,255,255,0.07)",
                border: error
                  ? "1.5px solid rgba(255,100,100,0.5)"
                  : "1.5px solid rgba(255,182,193,0.35)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15)",
                transition: "border 0.3s, box-shadow 0.3s",
                letterSpacing: "0.25em",
              }}
              onFocus={(e) => {
                e.target.style.border = "1.5px solid rgba(255,150,180,0.7)";
                e.target.style.boxShadow =
                  "inset 0 2px 8px rgba(0,0,0,0.1), 0 0 20px rgba(255,130,160,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.border = error
                  ? "1.5px solid rgba(255,100,100,0.5)"
                  : "1.5px solid rgba(255,182,193,0.35)";
                e.target.style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.15)";
              }}
            />
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                key="error"
                className="text-rose-300 text-sm text-center"
                style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            type="submit"
            className="relative w-full py-3.5 rounded-2xl text-white font-semibold tracking-wider overflow-hidden mt-1"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "1rem",
              background: success
                ? "linear-gradient(135deg, #86efac, #34d399)"
                : "linear-gradient(135deg, #fb7185 0%, #f43f5e 50%, #e11d48 100%)",
              boxShadow: success
                ? "0 4px 24px rgba(52,211,153,0.4)"
                : "0 4px 24px rgba(244,63,94,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              transition: "background 0.5s, box-shadow 0.5s",
              letterSpacing: "0.12em",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 6px 32px rgba(244,63,94,0.55), inset 0 1px 0 rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
              }}
              whileHover={{ opacity: 1, x: ["-100%", "200%"] }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative">
              {success ? "✓ Welcome back! 💕" : "Enter 🌸"}
            </span>
          </motion.button>
        </motion.form>

        {/* Hint */}
        <motion.p
          className="mt-6 text-pink-200/45 text-xs text-center italic"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.05em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          hint: thammsi&apos;s new name 🤫
        </motion.p>

        {/* Bottom decoration */}
        <motion.div
          className="mt-6 flex gap-3 text-pink-300/40 text-xs tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          ♡ &nbsp; ✦ &nbsp; ♡
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}