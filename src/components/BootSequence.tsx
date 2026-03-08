import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "[    0.000000] AZOX kernel v6.6.6-kali loading...", delay: 0 },
  { text: "[    0.004521] CPU: x86_64 AMD Ryzen 9 7950X", delay: 200 },
  { text: "[    0.012093] Memory: 65536MB DDR5 available", delay: 350 },
  { text: "[    0.018244] ACPI: RSDP 0x00000000000F0490", delay: 500 },
  { text: "[    0.024810] initializing modules...", delay: 700 },
  { text: "[    0.031002] loading kernel...", delay: 900 },
  { text: "[    0.038491] mounting /root...", delay: 1100 },
  { text: "[    0.045120] NET: Registered PF_INET protocol", delay: 1300 },
  { text: "[    0.051003] starting network daemon...", delay: 1500 },
  { text: "[    0.058244] iptables: loaded (filter/nat/mangle)", delay: 1700 },
  { text: "[    0.064001] SSH service: active on port 22", delay: 1900 },
  { text: "[    0.071830] TOR relay: connected (3 nodes)", delay: 2100 },
  { text: "[    0.078100] VPN tunnel: established", delay: 2300 },
  { text: "[    0.082450] GPU: NVIDIA RTX 4090 hashcat-ready", delay: 2500 },
  { text: "[    0.089001] system ready.", delay: 2700 },
  { text: "", delay: 2900 },
  { text: "azox@system:~$ _", delay: 3100, isPrompt: true },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setDone(true), 800);
          setTimeout(() => onComplete(), 1600);
        }
      }, line.delay);
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-start p-8 bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl w-full">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs sm:text-sm leading-relaxed ${
                  line.isPrompt
                    ? "text-primary text-glow mt-2"
                    : "text-muted-foreground"
                }`}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
