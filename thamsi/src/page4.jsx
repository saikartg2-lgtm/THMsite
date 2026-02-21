import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import video1 from "./gallery/video1.mp4";
import video2 from "./gallery/video2.mp4";
import video3 from "./gallery/video3.mp4";
import video4 from "./gallery/video4.mp4";
import video5 from "./gallery/video5.mp4";
import video6 from "./gallery/video6.mp4";
import video7 from "./gallery/video7.mp4";
import video8 from "./gallery/video8.mp4";

const videos = [
  { src: video1, label: "Memory 01" },
  { src: video2, label: "Memory 02" },
  { src: video3, label: "Memory 03" },
  { src: video4, label: "Memory 04" },
  { src: video5, label: "Memory 05" },
  { src: video6, label: "Memory 06" },
  { src: video7, label: "Memory 07" },
  { src: video8, label: "Memory 08" },
];

// Sprocket holes along the top/bottom of each film card
function SprocketRow() {
  return (
    <div className="flex items-center gap-[7px] px-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-4 rounded-sm flex-shrink-0"
          style={{ background: "#1a1208", border: "1.5px solid #2e2010" }}
        />
      ))}
    </div>
  );
}

function FilmCard({ video, index, onClick }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="cursor-pointer"
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: hovered ? 0 : index % 2 === 0 ? -1.5 : 1.5 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, zIndex: 20 }}
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      onClick={() => onClick(video.src)}
      style={{ position: "relative" }}
    >
      {/* Film strip wrapper */}
      <div
        className="rounded-md overflow-hidden"
        style={{
          background: "#120d04",
          boxShadow: hovered
            ? "0 20px 60px rgba(251,191,36,0.25), 0 4px 20px rgba(0,0,0,0.6)"
            : "0 6px 30px rgba(0,0,0,0.5)",
          border: "1.5px solid #2e2010",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {/* Top sprockets */}
        <div className="py-1.5" style={{ background: "#0e0902" }}>
          <SprocketRow />
        </div>

        {/* Video frame */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoRef}
            src={video.src}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />

          {/* Dark vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Play button — fades out on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(251,191,36,0.15)",
                border: "2px solid rgba(251,191,36,0.5)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 0 24px rgba(251,191,36,0.3)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(251,191,36,0.9)">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </motion.div>

          {/* "Click to play" hint */}
          <motion.div
            className="absolute bottom-2 right-3 text-xs font-semibold tracking-widest uppercase"
            style={{
              fontFamily: "'Georgia', serif",
              color: "rgba(251,191,36,0.6)",
            }}
            animate={{ opacity: hovered ? 0 : 0.7 }}
          >
            click to open
          </motion.div>
        </div>

        {/* Bottom sprockets */}
        <div
          className="py-1.5 flex items-center justify-between px-3"
          style={{ background: "#0e0902" }}
        >
          <SprocketRow />
        </div>

        {/* Label strip */}
        <div
          className="py-2 px-4 flex items-center justify-between"
          style={{ background: "#120d04", borderTop: "1px solid #2a1a06" }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Georgia', serif", color: "#a07820" }}
          >
            {video.label}
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#a07820" }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Page4() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const modalVideoRef = useRef(null);

  const handleClose = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setSelectedVideo(null);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #0a0804 0%, #110e06 50%, #0c0a05 100%)",
      }}
    >
      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Warm amber glow top-center */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #fbbf24, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative film strip line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-700/50" />
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-3 rounded-sm" style={{ background: "#3d2a08" }} />
              ))}
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-700/50" />
          </div>

          <p
            className="text-amber-600/50 tracking-[0.4em] text-xs uppercase mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            ✦ private screening ✦
          </p>
          <h1
            className="text-6xl font-bold"
            style={{
              fontFamily: "'Georgia', serif",
              background: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 45%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(251,191,36,0.35))",
              letterSpacing: "0.06em",
            }}
          >
            Our Videos
          </h1>
          <p
            className="mt-3 text-amber-800/50 text-sm italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            hover to preview · click to watch
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <FilmCard
              key={idx}
              video={video}
              index={idx}
              onClick={setSelectedVideo}
            />
          ))}
        </div>
      </div>

      {/* ── FULLSCREEN MODAL ── */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(4,3,1,0.92)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Film strip top */}
              <div
                className="rounded-t-md py-2 px-4 flex items-center gap-2"
                style={{ background: "#0e0902", border: "1.5px solid #2e2010", borderBottom: "none" }}
              >
                <div className="flex gap-[6px]">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="w-3 h-4 rounded-sm" style={{ background: "#1a1208" }} />
                  ))}
                </div>
              </div>

              {/* Video */}
              <div style={{ border: "1.5px solid #2e2010", borderTop: "none", borderBottom: "none" }}>
                <video
                  ref={modalVideoRef}
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full block"
                  style={{ background: "#000", maxHeight: "70vh", objectFit: "contain" }}
                />
              </div>

              {/* Film strip bottom */}
              <div
                className="rounded-b-md py-2 px-4 flex items-center justify-between"
                style={{ background: "#0e0902", border: "1.5px solid #2e2010", borderTop: "none" }}
              >
                <div className="flex gap-[6px]">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="w-3 h-4 rounded-sm" style={{ background: "#1a1208" }} />
                  ))}
                </div>
              </div>

              {/* Close button */}
              <motion.button
                className="absolute -top-5 -right-5 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg z-10"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #d97706)",
                  boxShadow: "0 4px 20px rgba(251,191,36,0.5)",
                  color: "#1a1000",
                }}
                onClick={handleClose}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}