import { motion } from "motion/react";

type HeroAmbientProps = {
  variant?: "full" | "side";
};

const FULL_ORBITS = [
  { size: "88vmin", duration: 48, reverse: false, opacity: 0.12 },
  { size: "68vmin", duration: 36, reverse: true, opacity: 0.1 },
  { size: "52vmin", duration: 28, reverse: false, opacity: 0.08 },
];

const SIDE_ORBITS = [
  { size: "22rem", duration: 44, reverse: false, opacity: 0.14 },
  { size: "17rem", duration: 32, reverse: true, opacity: 0.11 },
  { size: "12rem", duration: 24, reverse: false, opacity: 0.09 },
];

const FULL_DOTS = [
  { orbit: "72vmin", duration: 22, delay: 0, color: "rgba(77,163,255,0.7)" },
  { orbit: "58vmin", duration: 18, delay: 4, color: "rgba(91,239,200,0.65)" },
  { orbit: "44vmin", duration: 14, delay: 2, color: "rgba(46,201,184,0.6)" },
];

const SIDE_DOTS = [
  { orbit: "19rem", duration: 20, delay: 0, color: "rgba(77,163,255,0.65)" },
  { orbit: "14rem", duration: 16, delay: 3, color: "rgba(91,239,200,0.55)" },
];

export function HeroAmbient({ variant = "full" }: HeroAmbientProps) {
  const isSide = variant === "side";
  const orbits = isSide ? SIDE_ORBITS : FULL_ORBITS;
  const dots = isSide ? SIDE_DOTS : FULL_DOTS;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbits.map((orbit, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
          style={{
            width: orbit.size,
            height: orbit.size,
            opacity: orbit.opacity,
            borderStyle: i === 1 ? "dashed" : "solid",
          }}
          animate={{ rotate: orbit.reverse ? -360 : 360 }}
          transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {dots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute left-1/2 top-1/2"
          style={{
            width: dot.orbit,
            height: dot.orbit,
            marginLeft: `calc(${dot.orbit} / -2)`,
            marginTop: `calc(${dot.orbit} / -2)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: "linear", delay: dot.delay }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: dot.color, boxShadow: `0 0 12px ${dot.color}` }}
          />
        </motion.div>
      ))}

      <motion.div
        className={
          isSide
            ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full opacity-[0.16]"
            : "absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,56rem)] h-[min(90vw,56rem)] rounded-full opacity-[0.18]"
        }
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(77,163,255,0.35) 18%, transparent 36%, rgba(91,239,200,0.3) 54%, transparent 72%, rgba(46,201,184,0.25) 88%, transparent 100%)",
          filter: "blur(40px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: isSide ? 36 : 40, repeat: Infinity, ease: "linear" }}
      />

      {isSide && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.1]"
          style={{ width: "15rem", height: "11rem" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}
