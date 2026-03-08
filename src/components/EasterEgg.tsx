import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface EasterEggProps {
  active: boolean;
  onComplete: () => void;
}

const EasterEgg = ({ active, onComplete }: EasterEggProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => {
        setPhase(0);
        onComplete();
      }, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Glitch bars */}
          {phase >= 1 && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full bg-primary/20"
                  style={{
                    height: `${2 + Math.random() * 8}px`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.3 + Math.random() * 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          )}

          {/* Waveform */}
          {phase >= 2 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 flex items-center justify-center">
              <svg viewBox="0 0 800 100" className="w-full max-w-4xl opacity-40">
                <motion.path
                  d="M0,50 Q100,10 200,50 Q300,90 400,50 Q500,10 600,50 Q700,90 800,50"
                  fill="none"
                  stroke="hsl(142, 70%, 45%)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  filter="url(#glow)"
                />
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          )}

          {/* Access granted */}
          {phase >= 3 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 text-center"
            >
              <div className="text-6xl sm:text-8xl font-bold text-primary text-glow-strong tracking-wider">
                ACCESS
              </div>
              <div className="text-6xl sm:text-8xl font-bold text-primary text-glow-strong tracking-wider">
                GRANTED
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-0.5 bg-primary mx-auto mt-4"
                style={{ boxShadow: "0 0 20px hsl(142 70% 45%)" }}
              />
              <div className="text-sm text-muted-foreground mt-4 tracking-widest uppercase">
                welcome back, azox
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
