import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wallpaper from "./images/w3.png";

// Import your gallery images
import img1 from "./gallery/1.jpg";
import img2 from "./gallery/2.jpg";
import img3 from "./gallery/3.jpg";
import img4 from "./gallery/4.jpg";
import img5 from "./gallery/5.jpg";
import img6 from "./gallery/6.jpg";
import img7 from "./gallery/7.jpg";
import img8 from "./gallery/8.jpg";
import img9 from "./gallery/9.jpg";
import img10 from "./gallery/10.jpg";
import img11 from "./gallery/11.jpg";
import img12 from "./gallery/12.jpg";
import img13 from "./gallery/13.jpg";
import img14 from "./gallery/14.jpg";
import img15 from "./gallery/15.jpg";
import img16 from "./gallery/16.jpg";
import img17 from "./gallery/17.jpg";
import img18 from "./gallery/18.jpg";
import img19 from "./gallery/19.jpg";
import img20 from "./gallery/20.jpg";
import img21 from "./gallery/21.jpg";
import img22 from "./gallery/22.jpg";
import img23 from "./gallery/23.jpg";
import img24 from "./gallery/24.jpg";
import img25 from "./gallery/25.jpg";
import img26 from "./gallery/26.jpg";
import img27 from "./gallery/27.jpg";
import img28 from "./gallery/28.jpg";
import img29 from "./gallery/29.jpeg";
import img30 from "./gallery/30.jpeg";
import img31 from "./gallery/31.jpeg";
import img33 from "./gallery/33.jpeg";

import img34 from "./gallery/34.jpeg";
import img35 from "./gallery/35.jpeg";
import img36 from "./gallery/36.jpeg";
import img37 from "./gallery/37.jpeg";
import img38 from "./gallery/38.jpeg";
import img39 from "./gallery/39.jpeg";
import img40 from "./gallery/40.jpeg";


const gallery = [
  { src: img1,  title: "First Date",    description: "FIRST TIME FELT DIFFERENT TYPE OF JOY LIKE NEVER BERFORE" },
  { src: img2,  title: "I LOVE U",      description: "SORRY FOR THE BAD KISS" },
  { src: img3,  title: "SUMI MAA",      description: "MEYE" },
  { src: img4,  title: "CUTE",          description: "CUTE INTENSE COPLE" },
  { src: img5,  title: "UNEXPECTED",    description: "PAKA KOTHA 1.0 I FELL FOR YOU AGAIN THAT DAY JUST TOR MAA CHILO BOLE TAI TOR DIKE BESI TAKAINI OTHERWISE ICHE HOCHILO PURO TOR DIKE DEKHE E BOSHE THAKI" },
  { src: img6,  title: "HOT",           description: "2JON K ETO HOT LAGCHE KENO" },
  { src: img7,  title: "18",            description: "thamchi->THAMCHI" },
  { src: img8,  title: "DEKHAAOO",      description: "TOR BABA K ASCHI KAKU BOLECHILAM R DUNU KHEYECHILAM" },
  { src: img9,  title: "SAIYARA",       description: "SUDHU KADCHILAM" },
  { src: img10, title: "PRITHIBI GHURLAM", description: "BHUTU K NIYE PLAN" },
  { src: img11, title: "AMAR CHELE",    description: "AMRA 4JON FFFFFFFFF......" },
  { src: img12, title: "SAD THAMSI",    description: "MUMMA AMAR KOSTO TE BOHUT..." },
  { src: img13, title: "FAV",           description: "BEST DATE.......R KI CHAI FUN,R MUMMA R COMPANY..." },
  { src: img14, title: "CUTE MUMMA",    description: "EROM THAKIS PILIS" },
  { src: img15, title: "ICONIC 2.0",    description: "PAST,PRESENT,FUTURE AMAR" },
  { src: img16, title: "PAGLU",         description: "THASSI PAGLU KORBE SONKSHAR" },
  { src: img17, title: "CUTE GULGULI",  description: "SENSATIONAL FEELING" },
  { src: img18, title: "HOT",           description: "ETA WEATHER ER BOLLAM" },
  { src: img19, title: "THANKU",        description: "FOR CHOOSING ME" },
  { src: img22, title: "ICONIC OG",     description: "SUNDORI AMAKE JODI AGGE APPROACH KORTIS...." },
  { src: img28, title: "FAIZAN",        description: "JANI OKE BHALOBASIS LIUKIYE LUKIYE" },
  { src: img27, title: "CB",            description: "CHOTO BHAI" },
  { src: img20, title: "KFC",           description: "SALA SOB AMAKE THUSTE HOY BAAL" },
  { src: img21, title: "DATE",          description: "JINIS TA KICHU SPECIAL CHILONA BUT J KHAWALO SE SOB THEKE SPECIAL" },
  { src: img23, title: "SHIVARATRI",    description: "HARI OMM BHAAAAGGGISS KORLI" },
  { src: img24, title: "FAMILY2.0",     description: "AMAR NOTUN FAMILY" },
  { src: img25, title: "BEST",          description: "AMAR SOB THEKE BORO FLEX" },
  { src: img26, title: "CHAD",          description: "☃️." },
  { src: img29, title: "CUTE MAMPU ",      description: "CHUNNA LAGA" },
  { src: img30, title: "SASUMA ",  description: "SASUMA KHAIYEE DILO LEMSSSSGOOO" },
  { src: img31, title: "2ND FAMILY",  description: "SERGEANT CUMTE" },
  { src: img33, title: "DAMNNNN",  description: "MERI NAARI SAARI PEYE KITNI PYAARI" },
  
  { src: img35, title: "FINALLY",  description: "DHURANDAR" },
  { src: img36, title: "KHOD KHABI R",  description: "KI SWEEEETTTT" },
  { src: img37, title: "PUPLI",  description: "AMAR SWEETEST MAMPULU" },
  { src: img38, title: "CAPOL",  description: "SARA JIBON GHURTA ARHUNGA AIMSE" },
  { src: img39, title: "HAMPU",  description: "KHUB CUTE EVEN THOUGH SHYNESS BHORTI FRAME E PURO" },
  { src: img40, title: "SWEETEST",  description: "AMAR SWEETEST MOMENT" },
  { src: img34, title: "GULGULI",  description: "MAAMPA" },
 
];

// Polaroid tilt angles — alternating slight rotations for organic feel
const tilts = [-2.5, 1.8, -1.2, 2.2, -1.8, 2.8, -2.1, 1.5, -2.8, 1.2, -1.5, 2.5];

export default function Page2() {
  const [selected, setSelected] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* Dreamy overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-950/25 via-rose-900/15 to-pink-950/40 pointer-events-none" />

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-pink-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-8 py-12 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-pink-300/60 tracking-[0.35em] text-xs uppercase mb-3"
            style={{ fontFamily: "'Georgia', serif" }}>
            ✦ our little world ✦
          </p>
          <h1
            className="text-6xl font-bold mb-3"
            style={{
              fontFamily: "'Georgia', serif",
              background: "linear-gradient(135deg, #ffd6e7 0%, #ffb3cc 45%, #ff85a1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 16px rgba(255,100,150,0.45))",
              letterSpacing: "0.06em",
            }}
          >
            MEMOS
          </h1>
          <div className="flex items-center justify-center gap-3 text-pink-300/50 text-sm"
            style={{ fontFamily: "'Georgia', serif" }}>
            <span>♡</span>
            <span className="italic">{gallery.length} memories & counting</span>
            <span>♡</span>
          </div>
        </motion.div>

        {/* Polaroid Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-6 space-y-6">
          {gallery.map((img, idx) => {
            const tilt = tilts[idx % tilts.length];
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                className="break-inside-avoid cursor-pointer inline-block w-full"
                onClick={() => setSelected(img)}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
                initial={{ opacity: 0, y: 40, rotate: tilt }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: isHovered ? 0 : tilt,
                  scale: isHovered ? 1.06 : 1,
                  zIndex: isHovered ? 20 : 1,
                }}
                transition={{
                  opacity: { duration: 0.5, delay: idx * 0.04 },
                  y: { duration: 0.6, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 0.35 },
                  scale: { duration: 0.35 },
                }}
                style={{ position: "relative" }}
              >
                {/* Polaroid card */}
                <div
                  className="rounded-sm overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.88)",
                    boxShadow: isHovered
                      ? "0 20px 60px rgba(255,100,150,0.35), 0 8px 24px rgba(0,0,0,0.2)"
                      : "0 6px 24px rgba(0,0,0,0.18), 0 2px 8px rgba(255,100,150,0.15)",
                    transition: "box-shadow 0.35s ease",
                    padding: "8px 8px 28px 8px",
                  }}
                >
                  {/* Photo */}
                  <div className="overflow-hidden">
                    <motion.img
                      src={img.src}
                      alt={img.title}
                      className="w-full object-cover"
                      style={{ height: "160px" }}
                      animate={{ scale: isHovered ? 1.08 : 1 }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>

                  {/* Caption */}
                  <div className="pt-2 px-1 text-center">
                    <p
                      className="text-xs font-bold tracking-wider"
                      style={{
                        fontFamily: "'Georgia', serif",
                        color: "#e75480",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {img.title}
                    </p>
                  </div>
                </div>

                {/* Tape strip decoration */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 rounded-sm"
                  style={{
                    background: "rgba(255,200,220,0.55)",
                    backdropFilter: "blur(2px)",
                    border: "1px solid rgba(255,180,200,0.4)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-center px-4"
            style={{ backgroundColor: "rgba(20,5,10,0.75)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-lg w-full"
              initial={{ scale: 0.75, opacity: 0, y: 40, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.75, opacity: 0, y: 40, rotate: 3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Big polaroid */}
              <div
                className="rounded-sm"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  padding: "14px 14px 56px 14px",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 8px 32px rgba(255,100,150,0.3)",
                }}
              >
                {/* Tape */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-7 rounded-sm z-10"
                  style={{
                    background: "rgba(255,210,225,0.6)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,180,200,0.5)",
                  }}
                />

                <img
                  src={selected.src}
                  alt={selected.title}
                  className="w-full object-cover rounded-sm"
                  style={{ height: "380px" }}
                />

                <div className="pt-4 px-2 text-center">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{
                      fontFamily: "'Georgia', serif",
                      color: "#e75480",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {selected.title}
                  </h2>
                  <p
                    className="text-gray-600 text-sm leading-relaxed italic"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {selected.description}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                className="absolute -top-5 -right-5 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #fb7185, #e11d48)",
                  boxShadow: "0 4px 16px rgba(225,29,72,0.5)",
                }}
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}