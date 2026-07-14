import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { motion, AnimatePresence } from "motion/react";
import { MeshBackground } from "./components/MeshBackground";

const Preloader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.5 } }}
    className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
  >
    <MeshBackground variant="decide" />
    <motion.img
      src="/assets/savora-logo-white.png"
      alt="Savora"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="relative h-32 md:h-36 z-10"
    />
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-[var(--savora-charcoal)] text-white">
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}

export default App;
