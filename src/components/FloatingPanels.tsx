import { motion } from "framer-motion";

const ToolsPanel = () => {
  const tools = [
    { name: "nmap", status: "active" },
    { name: "wireshark", status: "active" },
    { name: "metasploit", status: "active" },
    { name: "burpsuite", status: "standby" },
    { name: "kali linux", status: "active" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
      className="glass-panel border-glow p-4 w-64"
    >
      <div className="text-xs text-terminal-cyan text-glow-cyan mb-3 uppercase tracking-widest">
        ▸ Arsenal
      </div>
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="flex items-center justify-between py-1.5 text-sm group cursor-default"
        >
          <span className="text-foreground group-hover:text-primary transition-colors">
            {tool.name}
          </span>
          <span
            className={`text-xs ${
              tool.status === "active"
                ? "text-primary text-glow"
                : "text-muted-foreground"
            }`}
          >
            [{tool.status}]
          </span>
        </div>
      ))}
    </motion.div>
  );
};

const SystemPanel = () => {
  const stats = [
    { label: "uptime", value: "47d 13h 22m" },
    { label: "status", value: "operational" },
    { label: "nodes", value: "14 active" },
    { label: "network", value: "encrypted" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 1.0 }}
      className="glass-panel border-glow p-4 w-64"
    >
      <div className="text-xs text-terminal-cyan text-glow-cyan mb-3 uppercase tracking-widest">
        ▸ System
      </div>
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center justify-between py-1.5 text-sm">
          <span className="text-muted-foreground">{stat.label}</span>
          <span className="text-primary text-glow">{stat.value}</span>
        </div>
      ))}

      {/* Fake network activity bar */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground mb-2">network activity</div>
        <div className="flex gap-0.5 h-8 items-end">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-primary/40 rounded-sm"
              initial={{ height: "20%" }}
              animate={{ height: `${20 + Math.random() * 80}%` }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FloatingPanels = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
      <ToolsPanel />
      <SystemPanel />
    </div>
  );
};

export default FloatingPanels;
