import React from "react";
import { LogEntry } from "@/src/types";
import { cn } from "@/src/lib/utils";
import { AlertCircle, CheckCircle2, ShieldX, Info, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LogFeedProps {
  logs: LogEntry[];
  onAnalyze: (log: LogEntry) => void;
}

export function LogFeed({ logs, onAnalyze }: LogFeedProps) {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-cyber-border flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Traffic Analysis</h3>
        </div>
        <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Real-time Stream</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-cyber-card z-10 shadow-sm">
            <tr className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider border-b border-cyber-border">
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
              <th className="px-4 py-3 font-medium">Source IP</th>
              <th className="px-4 py-3 font-medium">Protocol</th>
              <th className="px-4 py-3 font-medium">Threat Type</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border/50">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3">
                    {log.status === "BLOCKED" ? (
                      <ShieldX className="w-4 h-4 text-cyber-danger" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-cyber-success" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-cyber-muted">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-white">
                    {log.sourceIp}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-border text-cyber-muted border border-white/5">
                      {log.protocol}:{log.port}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-xs font-medium",
                      log.type === "Normal" ? "text-cyber-muted" : "text-cyber-warning"
                    )}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                      log.severity === "CRITICAL" ? "bg-cyber-danger/10 text-cyber-danger border-cyber-danger/20" :
                      log.severity === "HIGH" ? "bg-cyber-warning/10 text-cyber-warning border-cyber-warning/20" :
                      "bg-cyber-success/10 text-cyber-success border-cyber-success/20"
                    )}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => onAnalyze(log)}
                      className="p-1.5 rounded-md hover:bg-cyber-accent/10 text-cyber-muted hover:text-cyber-accent transition-all opacity-0 group-hover:opacity-100"
                      title="AI Analysis"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
