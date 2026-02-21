import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTE_COLORS = [
  { bg: "#fff9db", border: "#f6d860", shadow: "rgba(246,216,96,0.35)", pin: "#e53e3e" },
  { bg: "#fce8f3", border: "#f687b3", shadow: "rgba(246,135,179,0.35)", pin: "#d53f8c" },
  { bg: "#e8f8f0", border: "#68d391", shadow: "rgba(104,211,145,0.35)", pin: "#38a169" },
  { bg: "#e8f0fe", border: "#76a9fa", shadow: "rgba(118,169,250,0.35)", pin: "#3b82f6" },
  { bg: "#fef3e8", border: "#f6ad55", shadow: "rgba(246,173,85,0.35)", pin: "#dd6b20" },
  { bg: "#f3e8ff", border: "#b794f4", shadow: "rgba(183,148,244,0.35)", pin: "#805ad5" },
];

const NOTE_TILTS = [-2.5, 1.8, -1.5, 2.2, -2.8, 1.2, -1.8, 2.5, -1.2, 2.8];

function PinDot({ color }) {
  return (
    <div
      className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10"
      style={{
        background: `radial-gradient(circle at 35% 30%, ${color}cc, ${color})`,
        boxShadow: `0 2px 8px ${color}88, inset 0 1px 2px rgba(255,255,255,0.4)`,
      }}
    />
  );
}

function BucketItem({ item, index, onToggle, onRemove }) {
  const colorScheme = NOTE_COLORS[index % NOTE_COLORS.length];
  const tilt = NOTE_TILTS[index % NOTE_TILTS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: tilt, scale: 0.85 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: hovered ? 0 : tilt,
        scale: hovered ? 1.05 : 1,
      }}
      exit={{ opacity: 0, scale: 0.5, rotate: tilt * 2, y: -30 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ zIndex: hovered ? 20 : 1 }}
    >
      <PinDot color={colorScheme.pin} />

      <div
        className="rounded-sm px-5 pt-6 pb-5 min-h-[100px] flex flex-col justify-between"
        style={{
          background: colorScheme.bg,
          border: `1.5px solid ${colorScheme.border}`,
          boxShadow: hovered
            ? `0 16px 48px ${colorScheme.shadow}, 0 4px 16px rgba(0,0,0,0.12)`
            : `0 4px 18px ${colorScheme.shadow}, 0 2px 6px rgba(0,0,0,0.08)`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Item text */}
        <p
          className="text-sm leading-relaxed break-words mb-4"
          style={{
            fontFamily: "'Georgia', serif",
            color: item.done ? "#9ca3af" : "#374151",
            textDecoration: item.done ? "line-through" : "none",
            textDecorationColor: colorScheme.pin,
            textDecorationThickness: "2px",
            fontStyle: item.done ? "italic" : "normal",
            transition: "all 0.3s",
          }}
        >
          {item.text}
        </p>

        {/* Done stamp */}
        <AnimatePresence>
          {item.done && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 1.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
            >
              <div
                className="px-4 py-1.5 rounded-sm text-xs font-bold tracking-[0.25em] uppercase"
                style={{
                  border: `2.5px solid ${colorScheme.pin}88`,
                  color: `${colorScheme.pin}99`,
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.3em",
                  transform: "rotate(-12deg)",
                  opacity: 0.7,
                }}
              >
                ✓ DONE
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-auto">
          <motion.button
            onClick={() => onToggle(index)}
            className="text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full transition-all"
            style={{
              fontFamily: "'Georgia', serif",
              background: item.done ? `${colorScheme.border}55` : `${colorScheme.border}33`,
              color: item.done ? colorScheme.pin : "#6b7280",
              border: `1px solid ${colorScheme.border}`,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.done ? "↩ Undo" : "✓ Done"}
          </motion.button>

          <motion.button
            onClick={() => onRemove(index)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{
              background: "rgba(239,68,68,0.1)",
              color: "#ef4444",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
            whileHover={{ scale: 1.15, background: "rgba(239,68,68,0.2)" }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Page5() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bucketlist");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bucketlist", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, { text: input.trim(), done: false }]);
      setInput("");
    }
  };

  const toggleDone = (index) =>
    setItems(items.map((item, i) => (i === index ? { ...item, done: !item.done } : item)));

  const removeItem = (index) =>
    setItems(items.filter((_, i) => i !== index));

  const doneCount = items.filter((i) => i.done).length;

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        background: "#f5f0e8",
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 27px,
            rgba(180,160,130,0.15) 28px
          )
        `,
      }}
    >
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Left margin line */}
      <div
        className="fixed top-0 bottom-0 w-px pointer-events-none z-0"
        style={{ left: "72px", background: "rgba(220,130,130,0.35)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-14" style={{ paddingLeft: "96px" }}>
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-rose-400/60 text-xs tracking-[0.35em] uppercase mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            ✦ our dream list ✦
          </p>
          <h1
            className="text-6xl font-bold leading-none mb-1"
            style={{
              fontFamily: "'Georgia', serif",
              color: "#2d1f0e",
              textShadow: "2px 3px 0px rgba(180,140,90,0.2)",
              letterSpacing: "0.02em",
            }}
          >
            Bucket List
          </h1>
          <div
            className="h-0.5 w-48 mt-3 mb-4 rounded-full"
            style={{ background: "linear-gradient(to right, #e879a0, transparent)" }}
          />
          {items.length > 0 && (
            <p
              className="text-sm"
              style={{ fontFamily: "'Georgia', serif", color: "#9b7653", fontStyle: "italic" }}
            >
              {doneCount} of {items.length} adventures completed ✓
            </p>
          )}
        </motion.div>

        {/* Input area — looks like a lined notepad entry */}
        <motion.div
          className="mb-12 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="flex items-center gap-3 pb-2"
            style={{ borderBottom: `2px solid ${focused ? "#e879a0" : "#d4b896"}`, transition: "border-color 0.3s" }}
          >
            <span style={{ fontFamily: "'Georgia', serif", color: "#c9956a", fontSize: "1.2rem" }}>
              ✎
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="write a new dream here..."
              className="flex-1 bg-transparent outline-none text-base"
              style={{
                fontFamily: "'Georgia', serif",
                color: "#2d1f0e",
                fontStyle: "italic",
              }}
            />
            <motion.button
              onClick={addItem}
              disabled={!input.trim()}
              className="px-5 py-2 rounded-full text-sm font-bold tracking-wider disabled:opacity-40"
              style={{
                fontFamily: "'Georgia', serif",
                background: "linear-gradient(135deg, #f687b3, #e879a0)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(232,121,160,0.4)",
                letterSpacing: "0.1em",
              }}
              whileHover={{ scale: 1.06, boxShadow: "0 6px 24px rgba(232,121,160,0.55)" }}
              whileTap={{ scale: 0.95 }}
            >
              + Add
            </motion.button>
          </div>
          <p
            className="text-xs mt-1.5 ml-7"
            style={{ fontFamily: "'Georgia', serif", color: "#b8977a", fontStyle: "italic" }}
          >
            press Enter or click Add
          </p>
        </motion.div>

        {/* Empty state */}
        {items.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-6xl mb-4">🌸</div>
            <p
              className="text-lg italic"
              style={{ fontFamily: "'Georgia', serif", color: "#c4a882" }}
            >
              your bucket list is empty...
            </p>
            <p
              className="text-sm mt-2"
              style={{ fontFamily: "'Georgia', serif", color: "#d4b896" }}
            >
              add your first dream above ✨
            </p>
          </motion.div>
        )}

        {/* Notes Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          layout
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <BucketItem
                key={`${item.text}-${index}`}
                item={item}
                index={index}
                onToggle={toggleDone}
                onRemove={removeItem}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}