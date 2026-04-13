import React from "react";
import { LogEntry, ThreatAnalysis } from "@/src/types";
import { X, ShieldAlert, Zap, BrainCircuit, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnalysisModalProps {
  log: LogEntry | null;
  analysis: ThreatAnalysis | null;
  loading: boolean;
  onClose: () => void;
}

export function AnalysisModal({ log, analysis, loading, onClose }: AnalysisModalProps) {
  if (!log) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-cyber-card border border-cyber-border rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-cyber-border flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-accent/10 border border-cyber-accent/30">
                <BrainCircuit className="w-5 h-5 text-cyber-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Threat Analysis</h3>
                <p className="text-xs font-mono text-cyber-muted">Event ID: {log.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-cyber-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Source IP</p>
                <p className="text-sm font-bold text-white">{log.sourceIp}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Threat Type</p>
                <p className="text-sm font-bold text-cyber-warning">{log.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Protocol / Port</p>
                <p className="text-sm font-bold text-white">{log.protocol} : {log.port}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Severity</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/20">
                  {log.severity}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyber-accent">
                <Zap className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Gemini Assessment</h4>
              </div>
              
              <div className="bg-cyber-bg border border-cyber-border rounded-xl p-5 relative min-h-[120px] flex flex-col justify-center">
                {loading ? (
                  <div className="flex flex-col items-center justify-center gap-3 text-cyber-muted">
                    <Loader2 className="w-8 h-8 animate-spin text-cyber-accent" />
                    <p className="text-xs font-mono animate-pulse">Processing neural patterns...</p>
                  </div>
                ) : analysis ? (
                  <div className="space-y-4">
                    <p className="text-sm text-cyber-text leading-relaxed italic">
                      "{analysis.assessment}"
                    </p>
                    <div className="pt-4 border-t border-cyber-border">
                      <p className="text-[10px] font-mono text-cyber-success uppercase tracking-widest mb-2">Recommended Action</p>
                      <p className="text-sm text-white font-medium">{analysis.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-cyber-muted text-center">Failed to retrieve AI analysis.</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/5 border-t border-cyber-border flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-cyber-border text-sm font-medium text-cyber-muted hover:text-white hover:bg-white/5 transition-all"
            >
              Close
            </button>
            <button className="px-6 py-2 rounded-lg bg-cyber-accent text-cyber-bg text-sm font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)]">
              Isolate Source IP
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
