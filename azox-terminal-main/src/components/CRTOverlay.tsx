const CRTOverlay = () => (
  <>
    <div className="scanline-overlay" />
    <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.02]"
      style={{
        background: "radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 0%) 100%)",
      }}
    />
  </>
);

export default CRTOverlay;
