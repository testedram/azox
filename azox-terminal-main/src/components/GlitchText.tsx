import { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

const GlitchText = ({ text, className = "", as: Tag = "span" }: GlitchTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tag
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      {/* Glitch layers */}
      <span
        className="absolute inset-0 text-terminal-cyan opacity-0"
        style={{
          animation: isHovered ? "glitch-1 0.3s infinite" : "none",
          opacity: isHovered ? 0.8 : 0,
        }}
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute inset-0 text-terminal-red opacity-0"
        style={{
          animation: isHovered ? "glitch-2 0.3s infinite" : "none",
          opacity: isHovered ? 0.8 : 0,
        }}
        aria-hidden
      >
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;
