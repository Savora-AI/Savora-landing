import { useRef, useState, useEffect, type MouseEvent } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { MeshBackground } from "./MeshBackground";

const QUOTES = [
  "POS and cash registers are not intuitive. They are data science collection machines.",
  "I need to be there 40 hours a week to make profits. It's hard to put trust in the people.",
  "If you guys are trying to centralize information from other systems, it's a brilliant idea for a big problem in the industry.",
  "I have four tabs open before I've had my first coffee. None of them talk to each other.",
  "Toast tells me what sold. It doesn't tell me why Tuesday was a disaster or what to prep tonight.",
  "We threw away hundreds in inventory last month. I found out in a spreadsheet, three weeks too late.",
];

const QUOTE_DURATION = 6200;
const RESUME_DELAY = 2200;
const EASE = [0.22, 1, 0.36, 1] as const;

export function QuotesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-20%" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [fromLeft, setFromLeft] = useState(true);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Autoplay
  useEffect(() => {
    if (!isInView) return;

    const tick = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % QUOTES.length;
        setFromLeft(next % 2 === 0);
        targetProgressRef.current = next;
        currentProgressRef.current = next;
        return next;
      });
    }, QUOTE_DURATION);

    return () => clearInterval(tick);
  }, [isInView]);

  // Smooth scrub interpolation
  useEffect(() => {
    const animate = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.002) {
        currentProgressRef.current += diff * 0.12;
        const rounded = Math.round(currentProgressRef.current);
        const normalized = ((rounded % QUOTES.length) + QUOTES.length) % QUOTES.length;
        setActiveIndex((prev) => (prev !== normalized ? normalized : prev));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    pausedRef.current = true;
    clearTimeout(resumeTimerRef.current);

    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 0.999);
    const idx = Math.floor(x * QUOTES.length);
    targetProgressRef.current = idx;

    setFromLeft(idx % 2 === 0);

    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  const handleMouseLeave = () => {
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  return (
    <section
      ref={sectionRef}
      id="quotes"
      className="relative min-h-screen flex items-center justify-center border-t border-white/[0.04] overflow-hidden"
    >
      <MeshBackground variant="aurora" />

      <div
        ref={containerRef}
        className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 lg:px-12 cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <p className="savora-label mb-16 md:mb-20 absolute top-24 left-1/2 -translate-x-1/2">
          Customer validation
        </p>

        <div className="relative w-full max-w-5xl h-[50vh] md:h-[40vh] flex items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.blockquote
              key={activeIndex}
              initial={{
                opacity: 0,
                y: 48,
                x: fromLeft ? -32 : 32,
                scale: 0.98,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -56,
                x: fromLeft ? 20 : -20,
                scale: 0.99,
                filter: "blur(10px)",
              }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center text-center px-4"
            >
              <p className="font-quote-showcase text-[1.625rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white/88 font-light tracking-[-0.025em] max-w-5xl px-2">
                "{QUOTES[activeIndex]}"
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <p className="absolute bottom-16 text-[10px] uppercase tracking-[0.2em] text-white/20">
          Move horizontally to explore
        </p>
      </div>
    </section>
  );
}
