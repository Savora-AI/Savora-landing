import { motion } from "motion/react";

type Orb = {
  color: string;
  x: string;
  y: string;
  size: string;
  blur: number;
  opacity: number;
  duration: number;
};

type MeshVariant = "decide" | "charcoal" | "subtle" | "aurora";

const PALETTE = {
  blue: "#4DA3FF",
  sky: "#6BB8FF",
  cyan: "#2EC9B8",
  mint: "#5BEFC8",
  teal: "#34D399",
  emerald: "#2EC4A0",
  charcoal: "#070b14",
};

const ORB_SETS: Record<MeshVariant, Orb[]> = {
  decide: [
    { color: PALETTE.blue, x: "10%", y: "78%", size: "58vw", blur: 110, opacity: 0.34, duration: 26 },
    { color: PALETTE.mint, x: "72%", y: "70%", size: "54vw", blur: 105, opacity: 0.28, duration: 24 },
    { color: PALETTE.cyan, x: "48%", y: "90%", size: "64vw", blur: 120, opacity: 0.24, duration: 30 },
    { color: PALETTE.sky, x: "88%", y: "38%", size: "44vw", blur: 95, opacity: 0.2, duration: 22 },
    { color: PALETTE.teal, x: "18%", y: "28%", size: "46vw", blur: 100, opacity: 0.17, duration: 28 },
    { color: "#6EE7FF", x: "60%", y: "20%", size: "38vw", blur: 90, opacity: 0.14, duration: 32 },
  ],
  charcoal: [],
  subtle: [
    { color: PALETTE.blue, x: "5%", y: "88%", size: "46vw", blur: 110, opacity: 0.1, duration: 32 },
    { color: PALETTE.cyan, x: "95%", y: "82%", size: "42vw", blur: 105, opacity: 0.08, duration: 30 },
    { color: PALETTE.mint, x: "50%", y: "15%", size: "36vw", blur: 95, opacity: 0.06, duration: 28 },
  ],
  aurora: [
    { color: PALETTE.blue, x: "25%", y: "60%", size: "50vw", blur: 120, opacity: 0.07, duration: 34 },
    { color: PALETTE.cyan, x: "75%", y: "45%", size: "44vw", blur: 110, opacity: 0.06, duration: 30 },
    { color: PALETTE.teal, x: "50%", y: "80%", size: "48vw", blur: 115, opacity: 0.05, duration: 32 },
  ],
};

const OVERLAYS: Record<MeshVariant, string> = {
  decide: `
    radial-gradient(ellipse 85% 55% at 50% 105%, rgba(77,163,255,0.22) 0%, transparent 58%),
    radial-gradient(ellipse 52% 42% at 8% 72%, rgba(46,201,184,0.18) 0%, transparent 55%),
    radial-gradient(ellipse 52% 42% at 92% 65%, rgba(91,239,200,0.16) 0%, transparent 55%),
    radial-gradient(ellipse 40% 35% at 50% 30%, rgba(110,231,255,0.1) 0%, transparent 50%),
    linear-gradient(165deg, rgba(3,5,10,0.25) 0%, transparent 50%)
  `,
  charcoal: `
    linear-gradient(180deg, var(--savora-charcoal) 0%, var(--savora-bg) 50%, var(--savora-charcoal) 100%)
  `,
  subtle: `
    radial-gradient(ellipse 65% 40% at 50% 100%, rgba(77,163,255,0.09) 0%, transparent 55%),
    radial-gradient(ellipse 32% 28% at 0% 75%, rgba(46,201,184,0.07) 0%, transparent 50%),
    radial-gradient(ellipse 32% 28% at 100% 70%, rgba(52,211,153,0.06) 0%, transparent 50%)
  `,
  aurora: `
    radial-gradient(ellipse 90% 70% at 50% 50%, rgba(7,11,20,1) 0%, rgba(3,5,10,1) 65%),
    radial-gradient(ellipse 55% 42% at 50% 88%, rgba(77,163,255,0.08) 0%, transparent 55%),
    radial-gradient(ellipse 30% 25% at 18% 45%, rgba(46,201,184,0.05) 0%, transparent 50%)
  `,
};

const OVERLAY_OPACITY: Record<MeshVariant, number> = {
  decide: 0.38,
  charcoal: 1,
  subtle: 0.14,
  aurora: 0.2,
};

type MeshBackgroundProps = {
  className?: string;
  variant?: MeshVariant;
};

export function MeshBackground({ className = "", variant = "decide" }: MeshBackgroundProps) {
  const orbs = ORB_SETS[variant];
  const overlayOpacity = OVERLAY_OPACITY[variant];

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-[var(--savora-charcoal)] ${className}`}
      aria-hidden="true"
    >
      {orbs.length > 0 && (
        <div className="absolute inset-0 mix-blend-screen">
          {orbs.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none will-change-transform"
              style={{
                width: orb.size,
                height: orb.size,
                left: orb.x,
                top: orb.y,
                background: `radial-gradient(circle at center, ${orb.color} 0%, transparent 68%)`,
                filter: `blur(${orb.blur}px)`,
                transform: "translate(-50%, -50%)",
                opacity: orb.opacity,
              }}
              animate={{
                x: [0, 12, -8, 4, 0],
                y: [0, -6, 8, -4, 0],
                scale: [1, 1.05, 0.97, 1.02, 1],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: OVERLAYS[variant],
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 90% 75% at 50% 40%, transparent 0%, rgba(3,5,10,0.42) 72%),
            linear-gradient(to bottom, rgba(3,5,10,0.28) 0%, transparent 18%, transparent 82%, rgba(3,5,10,0.2) 100%)
          `,
        }}
      />
    </div>
  );
}
