import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";

import song1 from "./music/song1.mp3";
import song2 from "./music/song2.mp3";
import song3 from "./music/song3.mp3";
import song4 from "./music/song4.mp3";
import song5 from "./music/song5.mp3";



const songs = [
  { title: "Dekha hi nahi", src: song1 },
  { title: "Falling In Love With You", src: song2 },
  { title: "Tum Hi Ho", src: song3 },
  { title: "Tomake E bhalo Legeche", src: song4 },
  { title: "Khat", src: song5 },
];

const NAV_ITEMS = [
  { path: "/page2", label: "Memories",   emoji: "📸", color: "#f472b6" },
  { path: "/page3", label: "Timeline",   emoji: "🕒", color: "#60a5fa" },
  { path: "/page4", label: "Videos",     emoji: "🎥", color: "#34d399" },
  { path: "/page5", label: "Bucketlist", emoji: "📝", color: "#a78bfa" },
  { path: "/page6", label: "Activity",   emoji: "🎮", color: "#fbbf24" },
];

// ── Animated EQ bars ──
function EqBars({ isPlaying }) {
  const barHeights = [40, 70, 55, 80, 45, 65, 50, 75, 40, 60];
  return (
    <div className="flex items-end gap-[3px] h-8">
      {barHeights.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ background: "linear-gradient(to top, #f472b6, #fb923c)" }}
          animate={
            isPlaying
              ? { height: [`${h * 0.3}px`, `${h}px`, `${h * 0.5}px`, `${h * 0.9}px`, `${h * 0.3}px`] }
              : { height: "3px" }
          }
          transition={
            isPlaying
              ? { duration: 0.8 + i * 0.07, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }
              : { duration: 0.4 }
          }
        />
      ))}
    </div>
  );
}

// ── Spinning vinyl ──
function VinylDisc({ isPlaying }) {
  return (
    <motion.div
      className="relative rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: 52, height: 52,
        background: "conic-gradient(#1a0a0a 0deg, #2d1515 60deg, #1a0a0a 120deg, #2d1515 180deg, #1a0a0a 240deg, #2d1515 300deg, #1a0a0a 360deg)",
        boxShadow: isPlaying
          ? "0 0 16px rgba(244,114,182,0.5), 0 4px 12px rgba(0,0,0,0.5)"
          : "0 4px 12px rgba(0,0,0,0.4)",
      }}
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
    >
      {[24, 18, 13].map((size) => (
        <div key={size} className="absolute rounded-full border"
          style={{ width: size, height: size, borderColor: "rgba(255,255,255,0.06)" }} />
      ))}
      <div className="w-3 h-3 rounded-full z-10"
        style={{
          background: "radial-gradient(circle at 40% 35%, #f9a8d4, #f472b6)",
          boxShadow: "0 0 6px rgba(244,114,182,0.6)",
        }}
      />
    </motion.div>
  );
}

// ── Scrolling song title ──
function MarqueeTitle({ title }) {
  const ref = useRef(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setOverflow(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, [title]);

  return (
    <div className="overflow-hidden w-full" ref={ref}>
      <motion.p
        key={title}
        className="text-sm font-bold whitespace-nowrap"
        style={{ fontFamily: "'Georgia', serif", color: "#ffd6e7", letterSpacing: "0.04em" }}
        initial={{ opacity: 0, y: 6 }}
        animate={overflow ? { opacity: 1, x: ["0%", "-50%"] } : { opacity: 1, x: 0 }}
        transition={
          overflow
            ? { x: { duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 1 }, opacity: { duration: 0.3 } }
            : { duration: 0.3 }
        }
      >
        {overflow ? `${title}   ·   ${title}   ·   ` : title}
      </motion.p>
    </div>
  );
}

export default function Container() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef(null);
  const progressRef = useRef(null);

  const playSong = (index) => {
    if (soundRef.current) soundRef.current.stop();
    clearInterval(progressRef.current);
    setProgress(0);

    soundRef.current = new Howl({
      src: [songs[index].src],
      html5: true,
      onend: () => {
        const next = (index + 1) % songs.length;
        setCurrentIndex(next);
        playSong(next);
      },
      onplay: () => {
        progressRef.current = setInterval(() => {
          if (soundRef.current) {
            const seek = soundRef.current.seek() || 0;
            const dur = soundRef.current.duration() || 1;
            setProgress(seek / dur);
          }
        }, 500);
      },
      onstop: () => clearInterval(progressRef.current),
      onpause: () => clearInterval(progressRef.current),
    });

    soundRef.current.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!soundRef.current) {
      playSong(currentIndex);
    } else if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const next = (currentIndex + 1) % songs.length;
    setCurrentIndex(next);
    playSong(next);
  };

  const playPrev = () => {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prev);
    playSong(prev);
  };

  // Seek on progress bar click
  const handleSeek = (e) => {
    if (!soundRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const dur = soundRef.current.duration() || 0;
    soundRef.current.seek(ratio * dur);
    setProgress(ratio);
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) soundRef.current.unload();
      clearInterval(progressRef.current);
    };
  }, []);

  return (
    <div
      className="h-screen flex flex-col relative overflow-hidden"
      style={{
        width: "260px",
        minWidth: "260px",
        background: "linear-gradient(160deg, #2d0a1e 0%, #1a0612 50%, #220d18 100%)",
        borderRight: "1px solid rgba(244,114,182,0.15)",
        boxShadow: "4px 0 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* Glow orbs */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f472b6, transparent 70%)" }} />
      <div className="absolute bottom-24 right-0 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #fb923c, transparent 70%)" }} />

      {/* ── TOP: Logo ── */}
      <div className="relative z-10 px-5 pt-7 pb-3 flex-shrink-0">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <motion.span
              className="text-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🌸
            </motion.span>
            <h2
              className="text-xs font-bold uppercase"
              style={{
                fontFamily: "'Georgia', serif",
                background: "linear-gradient(135deg, #ffd6e7, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.12em",
              }}
            >
              THAAMCHI
            </h2>
          </div>
          <div className="h-px w-full"
            style={{ background: "linear-gradient(to right, #f472b688, transparent)" }} />
        </motion.div>

        {/* Home button */}
        <motion.button
          onClick={() => navigate("/")}
          className="w-full mb-4 py-2.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
          style={{
            fontFamily: "'Georgia', serif",
            background: "linear-gradient(135deg, #f43f5e, #e11d48)",
            color: "#fff",
            boxShadow: "0 4px 20px rgba(244,63,94,0.4)",
            letterSpacing: "0.08em",
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 6px 28px rgba(244,63,94,0.55)" }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span>🏠</span> Home
        </motion.button>
      </div>

      {/* ── MIDDLE: Scrollable Nav ── */}
      <div className="relative z-10 px-5 flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-2 pb-3">
          {NAV_ITEMS.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full py-2.5 px-4 rounded-2xl text-sm font-semibold flex items-center gap-3 relative overflow-hidden text-left"
                style={{
                  fontFamily: "'Georgia', serif",
                  background: isActive ? `${item.color}22` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? item.color + "55" : "rgba(255,255,255,0.06)"}`,
                  color: isActive ? item.color : "rgba(255,210,225,0.65)",
                  boxShadow: isActive ? `0 4px 20px ${item.color}25` : "none",
                  transition: "all 0.3s ease",
                }}
                whileHover={{
                  scale: 1.03,
                  background: `${item.color}18`,
                  borderColor: `${item.color}44`,
                  color: item.color,
                  boxShadow: `0 4px 20px ${item.color}20`,
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Active bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full"
                      style={{ background: item.color, height: "60%", boxShadow: `0 0 8px ${item.color}` }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </AnimatePresence>

                <span className="text-base">{item.emoji}</span>
                <span>{item.label}</span>

                {isActive && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM: Music Player ── */}
      <motion.div
        className="relative z-10 mx-3 mb-4 rounded-3xl p-4 flex-shrink-0"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(244,114,182,0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        {/* Vinyl + title */}
        <div className="flex items-center gap-3 mb-3">
          <VinylDisc isPlaying={isPlaying} />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-widest uppercase mb-0.5"
              style={{ fontFamily: "'Georgia', serif", color: "rgba(244,114,182,0.5)" }}>
              Now Playing
            </p>
            <MarqueeTitle title={songs[currentIndex].title} />
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-1 rounded-full mb-3 cursor-pointer overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
          onClick={handleSeek}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(to right, #f472b6, #fb923c)" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* EQ bars */}
        <div className="flex justify-center mb-3">
          <EqBars isPlaying={isPlaying} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <motion.button onClick={playPrev}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: "rgba(244,114,182,0.15)", border: "1px solid rgba(244,114,182,0.3)", color: "#f9a8d4" }}
            whileHover={{ scale: 1.12, background: "rgba(244,114,182,0.25)" }}
            whileTap={{ scale: 0.9 }}>
            ⏮
          </motion.button>

          <motion.button onClick={togglePlayPause}
            className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold"
            style={{
              background: "linear-gradient(135deg, #f472b6, #e879a0)",
              color: "#fff",
              boxShadow: isPlaying
                ? "0 0 20px rgba(244,114,182,0.6), 0 4px 16px rgba(244,114,182,0.4)"
                : "0 4px 16px rgba(244,114,182,0.3)",
              transition: "box-shadow 0.3s",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}>
            {isPlaying ? "⏸" : "▶"}
          </motion.button>

          <motion.button onClick={playNext}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: "rgba(244,114,182,0.15)", border: "1px solid rgba(244,114,182,0.3)", color: "#f9a8d4" }}
            whileHover={{ scale: 1.12, background: "rgba(244,114,182,0.25)" }}
            whileTap={{ scale: 0.9 }}>
            ⏭
          </motion.button>
        </div>

        {/* Song dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {songs.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setCurrentIndex(i); playSong(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? 16 : 6,
                height: 6,
                background: i === currentIndex
                  ? "linear-gradient(to right, #f472b6, #fb923c)"
                  : "rgba(255,255,255,0.2)",
              }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}