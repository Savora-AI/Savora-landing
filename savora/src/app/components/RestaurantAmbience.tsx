import { motion } from "motion/react";
import {
  UtensilsCrossed,
  ChefHat,
  Flame,
  Clock,
  Receipt,
  Wine,
  Bell,
} from "lucide-react";

const ELEMENTS = [
  { Icon: Receipt, x: "22%", y: "28%", size: 20, delay: 0, dur: 18 },
  { Icon: UtensilsCrossed, x: "72%", y: "30%", size: 22, delay: 1.2, dur: 22 },
  { Icon: ChefHat, x: "78%", y: "55%", size: 21, delay: 0.6, dur: 20 },
  { Icon: Flame, x: "20%", y: "62%", size: 19, delay: 2, dur: 16 },
  { Icon: Clock, x: "58%", y: "22%", size: 18, delay: 0.8, dur: 24 },
  { Icon: Wine, x: "42%", y: "72%", size: 20, delay: 1.5, dur: 19 },
  { Icon: Bell, x: "50%", y: "48%", size: 17, delay: 2.5, dur: 21 },
];

export function RestaurantAmbience({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {ELEMENTS.map(({ Icon, x, y, size, delay, dur }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/15"
          style={{ left: x, top: y }}
          animate={{
            opacity: [0.1, 0.22, 0.1],
            y: [0, -14, 0, 10, 0],
            x: [0, 6, -4, 3, 0],
            rotate: [0, 3, -2, 0],
          }}
          transition={{
            duration: dur,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} strokeWidth={1.2} />
        </motion.div>
      ))}
    </div>
  );
}
