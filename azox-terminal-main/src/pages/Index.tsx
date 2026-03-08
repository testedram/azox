import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import MatrixRain from "@/components/MatrixRain";
import BootSequence from "@/components/BootSequence";
import GlitchText from "@/components/GlitchText";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import FloatingPanels from "@/components/FloatingPanels";
import EasterEgg from "@/components/EasterEgg";
import CRTOverlay from "@/components/CRTOverlay";
import GridFloor from "@/components/GridFloor";

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);
  const handleEasterEgg = useCallback(() => setEasterEgg(true), []);
  const handleEasterEggComplete = useCallback(() => setEasterEgg(false), []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixRain />
      <GridFloor />
      <CRTOverlay />
      <EasterEgg active={easterEgg} onComplete={handleEasterEggComplete} />

      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {booted && (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 py-16 gap-16">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mt-8 sm:mt-16"
          >
            <GlitchText
              text="AZOX"
              as="h1"
              className="text-7xl sm:text-9xl font-bold text-primary text-glow-strong tracking-[0.2em] cursor-default"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground text-sm sm:text-base tracking-[0.3em] uppercase mt-4"
            >
              security researcher • root access
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-px bg-primary mx-auto mt-6"
              style={{ boxShadow: "0 0 10px hsl(142 70% 45% / 0.5)" }}
            />
          </motion.div>

          {/* Terminal */}
          <InteractiveTerminal onEasterEgg={handleEasterEgg} />

          {/* Panels */}
          <FloatingPanels />

          {/* Footer hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-muted-foreground text-xs tracking-widest animate-pulse-glow"
          >
            try: sudo azox
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Index;
