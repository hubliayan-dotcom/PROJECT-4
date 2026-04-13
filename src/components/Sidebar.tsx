import React from "react";
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Lock, 
  Settings, 
  BarChart3, 
  Terminal,
  Cpu,
  Globe,
  Zap
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Activity, label: "Live Traffic", active: false },
  { icon: Shield, label: "Threat Intel", active: false },
  { icon: Terminal, label: "System Logs", active: false },
  { icon: Globe, label: "Network Map", active: false },
  { icon: Settings, label: "Configuration", active: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-cyber-border bg-cyber-card flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-bottom border-cyber-border">
        <div className="w-10 h-10 rounded-lg bg-cyber-accent/10 flex items-center justify-center border border-cyber-accent/30">
          <Shield className="text-cyber-accent w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-white">SHIELD AI</h1>
          <p className="text-[10px] font-mono text-cyber-accent uppercase tracking-widest">v2.4.0-Stable</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
              item.active 
                ? "bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20" 
                : "text-cyber-muted hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-5 h-5", item.active ? "text-cyber-accent" : "text-cyber-muted group-hover:text-white")} />
            <span className="font-medium text-sm">{item.label}</span>
            {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyber-accent shadow-[0_0_8px_rgba(0,242,255,0.6)]" />}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-cyber-bg/50 rounded-xl p-4 border border-cyber-border">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-cyber-success" />
            <span className="text-xs font-mono text-cyber-success">ENGINE: OPTIMAL</span>
          </div>
          <div className="w-full bg-cyber-border h-1 rounded-full overflow-hidden">
            <div className="bg-cyber-success h-full w-3/4 shadow-[0_0_8px_rgba(0,255,148,0.4)]" />
          </div>
          <p className="text-[10px] text-cyber-muted mt-2 font-mono">CPU: 24% | RAM: 4.2GB</p>
        </div>
      </div>
    </aside>
  );
}
