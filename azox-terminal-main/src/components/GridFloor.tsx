import { motion } from "framer-motion";

const GridFloor = () => (
  <div className="fixed bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none opacity-20" style={{ zIndex: 0 }}>
    <motion.div
      className="w-full h-full"
      style={{
        backgroundImage: `
          linear-gradient(hsl(142 70% 45% / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(142 70% 45% / 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        transform: "perspective(500px) rotateX(60deg)",
        transformOrigin: "bottom",
      }}
      animate={{ backgroundPositionY: ["0px", "50px"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default GridFloor;
