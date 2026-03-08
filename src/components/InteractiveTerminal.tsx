import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "system" | "error" | "success";
  text: string;
}

const COMMANDS: Record<string, () => TerminalLine[]> = {
  help: () => [
    { type: "system", text: "╔══════════════════════════════════════╗" },
    { type: "system", text: "║  AZOX TERMINAL v3.1.4 — COMMANDS    ║" },
    { type: "system", text: "╠══════════════════════════════════════╣" },
    { type: "output", text: "║  help      — show this menu         ║" },
    { type: "output", text: "║  whoami    — identity info           ║" },
    { type: "output", text: "║  scan      — run network scan        ║" },
    { type: "output", text: "║  tools     — list available tools     ║" },
    { type: "output", text: "║  status    — system status            ║" },
    { type: "output", text: "║  clear     — clear terminal           ║" },
    { type: "system", text: "╚══════════════════════════════════════╝" },
  ],
  whoami: () => [
    { type: "success", text: "┌─ IDENTITY" },
    { type: "output", text: "│  alias:    AZOX" },
    { type: "output", text: "│  role:     security researcher" },
    { type: "output", text: "│  access:   root" },
    { type: "output", text: "│  shell:    /bin/zsh" },
    { type: "output", text: "│  uptime:   ∞" },
    { type: "success", text: "└─ trust no one." },
  ],
  scan: () => [
    { type: "system", text: "Starting Nmap 7.94 ( https://nmap.org )" },
    { type: "output", text: "Scanning 192.168.1.0/24 [1000 ports]" },
    { type: "output", text: "Discovered open port 22/tcp on 192.168.1.1" },
    { type: "output", text: "Discovered open port 80/tcp on 192.168.1.1" },
    { type: "output", text: "Discovered open port 443/tcp on 192.168.1.1" },
    { type: "output", text: "Discovered open port 8080/tcp on 192.168.1.42" },
    { type: "error", text: "Discovered open port 3389/tcp on 192.168.1.99 [!]" },
    { type: "output", text: "" },
    { type: "success", text: "Nmap done: 256 hosts up, 847 ports filtered" },
    { type: "system", text: "OS Detection: Linux 6.x | OpenBSD 7.x" },
    { type: "output", text: "Scan complete in 4.21s" },
  ],
  tools: () => [
    { type: "system", text: "┌─ ARSENAL ─────────────────────┐" },
    { type: "success", text: "│  ▸ nmap          [active]     │" },
    { type: "success", text: "│  ▸ wireshark     [active]     │" },
    { type: "success", text: "│  ▸ metasploit    [active]     │" },
    { type: "success", text: "│  ▸ burpsuite     [active]     │" },
    { type: "success", text: "│  ▸ hashcat       [active]     │" },
    { type: "success", text: "│  ▸ john          [standby]    │" },
    { type: "success", text: "│  ▸ hydra         [standby]    │" },
    { type: "output", text: "│  ▸ aircrack-ng   [standby]    │" },
    { type: "system", text: "└───────────────────────────────┘" },
  ],
  status: () => [
    { type: "system", text: "┌─ SYSTEM STATUS ───────────────┐" },
    { type: "output", text: `│  uptime:    ${Math.floor(Math.random() * 99)}d ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m` },
    { type: "success", text: "│  cpu:       12% ▓▓░░░░░░░░" },
    { type: "success", text: "│  memory:    34% ▓▓▓▓░░░░░░" },
    { type: "output", text: "│  network:   encrypted" },
    { type: "success", text: "│  firewall:  active" },
    { type: "success", text: "│  vpn:       connected (CH)" },
    { type: "output", text: `│  packets:   ${Math.floor(Math.random() * 99999)} sent` },
    { type: "system", text: "└───────────────────────────────┘" },
  ],
};

interface InteractiveTerminalProps {
  onEasterEgg: () => void;
}

const InteractiveTerminal = ({ onEasterEgg }: InteractiveTerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: 'AZOX Terminal v3.1.4 — type "help" for commands' },
    { type: "system", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const typeOutput = useCallback(
    (outputLines: TerminalLine[]) => {
      setIsTyping(true);
      outputLines.forEach((line, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
          if (i === outputLines.length - 1) {
            setIsTyping(false);
          }
        }, i * 80);
      });
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping || !input.trim()) return;

    const cmd = input.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "input", text: `azox@system:~$ ${input}` }]);
    setInput("");

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "sudo azox") {
      onEasterEgg();
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      setTimeout(() => typeOutput(handler()), 200);
    } else {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "error", text: `command not found: ${cmd}` },
          { type: "output", text: 'type "help" for available commands' },
        ]);
      }, 200);
    }
  };

  const colorMap: Record<string, string> = {
    input: "text-primary text-glow",
    output: "text-foreground",
    system: "text-terminal-cyan text-glow-cyan",
    error: "text-terminal-red text-glow-red",
    success: "text-primary text-glow",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass-panel border-glow w-full max-w-2xl mx-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-terminal-red opacity-80" />
        <div className="w-3 h-3 rounded-full bg-terminal-amber opacity-80" />
        <div className="w-3 h-3 rounded-full bg-primary opacity-80" />
        <span className="ml-3 text-xs text-muted-foreground">azox@system — bash</span>
      </div>

      {/* Terminal body */}
      <div ref={scrollRef} className="p-4 h-80 overflow-y-auto font-mono text-sm">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${colorMap[line.type]} leading-6 whitespace-pre`}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-1">
          <span className="text-primary text-glow text-sm mr-2 shrink-0">
            azox@system:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            className="flex-1 bg-transparent outline-none text-foreground text-sm caret-primary"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <span className="w-2 h-4 bg-primary animate-cursor-blink ml-0.5" />
        </form>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
