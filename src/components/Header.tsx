import React from "react";
import { Search, Bell, User, Wifi, Database } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-cyber-border bg-cyber-card/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted group-focus-within:text-cyber-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search logs, IPs, or threat types..." 
            className="w-full bg-cyber-bg border border-cyber-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyber-accent/50 focus:ring-1 focus:ring-cyber-accent/20 transition-all font-mono"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-cyber-border pr-6">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-cyber-success" />
            <span className="text-xs font-mono text-cyber-success">CONNECTED</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyber-accent" />
            <span className="text-xs font-mono text-cyber-accent">DB: SYNCED</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/5 text-cyber-muted hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyber-danger rounded-full border-2 border-cyber-card" />
          </button>
          <div className="flex items-center gap-3 pl-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">Admin Console</p>
              <p className="text-[10px] text-cyber-muted font-mono">hubliayan@gmail.com</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber-accent to-blue-600 p-[1px]">
              <div className="w-full h-full rounded-full bg-cyber-card flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-cyber-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
