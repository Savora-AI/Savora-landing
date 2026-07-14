import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  Receipt,
  Package,
  Users,
  CloudSun,
  CalendarDays,
  UtensilsCrossed,
  Star,
  type LucideIcon,
} from "lucide-react";
import { MeshBackground } from "./MeshBackground";

const TOOL_ACCENT = "#E8FCFF";

type ToolNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
};

type IconDef = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const ICONS: IconDef[] = [
  { id: "pos", label: "POS", icon: Receipt },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "weather", label: "Weather", icon: CloudSun },
  { id: "staffing", label: "Staffing", icon: Users },
  { id: "reservations", label: "Reservations", icon: UtensilsCrossed },
  { id: "events", label: "Events", icon: CalendarDays },
];

const centerX = 50;
const centerY = 50;
const radiusX = 40;
const radiusY = 30;
const rotation = -90;

const TOOLS: ToolNode[] = ICONS.map((icon, index) => {
  const angle = ((rotation + (360 / ICONS.length) * index) * Math.PI) / 180;
  return {
    ...icon,
    x: centerX + radiusX * Math.cos(angle),
    y: centerY + radiusY * Math.sin(angle),
  };
});

function ToolNodeCard({
  tool,
  progress,
}: {
  tool: ToolNode;
  progress: MotionValue<number>;
}) {
  const Icon = tool.icon;
  const x = useTransform(progress, [0, 0.52, 1], [tool.x, 50, 50]);
  const y = useTransform(progress, [0, 0.52, 1], [tool.y, 50, 50]);
  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);
  const scale = useTransform(progress, [0, 0.38, 0.6, 0.76, 1], [1, 0.92, 0.6, 0.25, 0]);
  const opacity = useTransform(progress, [0, 0.52, 0.7, 1], [1, 1, 0.45, 0]);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
      style={{ left, top, scale, opacity }}
    >
      <div className="flex flex-col items-center">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-md rounded-full"
          style={{ boxShadow: "0 0 24px rgba(255,255,255,0.12)" }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: TOOL_ACCENT }} strokeWidth={1.5} />
        </div>
        <span className="mt-2 w-[96px] text-center text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-white/55 font-medium leading-tight">
          {tool.label}
        </span>
      </div>
    </motion.div>
  );
}

function ConnectionLine({
  tool,
  progress,
}: {
  tool: ToolNode;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.28, 0.58, 1], [0.12, 0.4, 0.15, 0]);
  const x1 = useTransform(progress, [0, 0.52], [tool.x, 50]);
  const y1 = useTransform(progress, [0, 0.52], [tool.y, 50]);

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={50}
      y2={50}
      stroke="rgba(255,255,255,0.35)"
      strokeWidth={0.14}
      vectorEffect="non-scaling-stroke"
      style={{ opacity }}
    />
  );
}

export function ConvergenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const logoScale = useTransform(scrollYProgress, [0, 0.55, 0.72, 0.88, 1], [0, 0, 0.4, 1.04, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.58, 0.72, 1], [0, 0, 1, 1]);
  const ringScale = useTransform(scrollYProgress, [0, 0.48, 0.75, 1], [0, 0.2, 1, 1.08]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5, 0.72, 1], [0, 0, 1, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.62, 0.78, 1], [0, 0, 1, 1]);
  const messageOpacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1]);
  const messageY = useTransform(scrollYProgress, [0.82, 1], [20, 0]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]" id="convergence">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <MeshBackground variant="subtle" />

        <div className="relative z-10 text-center px-6 mb-2 md:mb-4">
          <p className="savora-label mb-3">How it works</p>
          <h2 className="font-display text-[2rem] sm:text-4xl md:text-6xl text-white leading-tight max-w-2xl mx-auto font-medium px-2">
            Seven tools. One decision.
          </h2>
        </div>

        <div className="relative w-full max-w-4xl h-[min(48vh,28rem)] mx-auto px-6 z-10">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {TOOLS.map((tool) => (
              <ConnectionLine key={tool.id} tool={tool} progress={scrollYProgress} />
            ))}
          </svg>

          {TOOLS.map((tool) => (
            <ToolNodeCard key={tool.id} tool={tool} progress={scrollYProgress} />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none"
            style={{ scale: ringScale, opacity: ringOpacity }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full savora-white-ring" />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[8] pointer-events-none rounded-full"
            style={{
              opacity: glowOpacity,
              width: "22rem",
              height: "22rem",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)",
              filter: "blur(32px)",
            }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            style={{ scale: logoScale, opacity: logoOpacity }}
          >
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border border-white/25 bg-[var(--savora-bg)]/80 backdrop-blur-sm flex items-center justify-center">
              <img
                src="/assets/savora-logo-white.png"
                alt="Savora"
                className="w-44 md:w-56 h-auto"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-20 text-center w-full max-w-lg px-6 mt-4 md:mt-8 pointer-events-none"
          style={{ opacity: messageOpacity, y: messageY }}
        >
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/90 leading-snug italic font-normal">
            No more digging through data to figure out what to do.
          </p>
          <p className="mt-4 text-base md:text-lg text-white/50 leading-relaxed">
            Savora analyzes patterns, identifies potential leaks, and tells you exactly what
            decisions to take — before it's too late.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
