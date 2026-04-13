import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { StatsGrid } from "./components/StatsGrid";
import { LogFeed } from "./components/LogFeed";
import { ThreatChart } from "./components/ThreatChart";
import { AnalysisModal } from "./components/AnalysisModal";
import { LogEntry, SystemStats, ThreatAnalysis } from "./types";
import { Shield, AlertTriangle, Activity } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [analysis, setAnalysis] = useState<ThreatAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logsRes, statsRes] = await Promise.all([
          fetch("/api/logs?count=50"),
          fetch("/api/stats")
        ]);
        const logsData = await logsRes.json();
        const statsData = await statsRes.json();
        setLogs(logsData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();

    // Simulate real-time updates
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/logs?count=1");
        const newLog = await res.json();
        setLogs(prev => [newLog[0], ...prev.slice(0, 49)]);
        
        // Occasionally update stats
        if (Math.random() > 0.7) {
          const statsRes = await fetch("/api/stats");
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (error) {
        console.error("Failed to update logs:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async (log: LogEntry) => {
    setSelectedLog(log);
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const prompt = `As a senior cybersecurity analyst, analyze this network log entry and provide a brief (2-3 sentence) technical assessment and recommended action.
      
      Log Entry:
      ${JSON.stringify(log, null, 2)}
      
      Return ONLY a JSON object: { "assessment": "...", "recommendation": "..." }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const text = response.text || "";
      const jsonMatch = text.match(/\{.*\}/s);
      const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { assessment: text, recommendation: "Investigate source IP immediately." };
      setAnalysis(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis({ 
        assessment: "AI analysis unavailable. Manual investigation required.", 
        recommendation: "Check firewall rules for source IP " + log.sourceIp 
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cyber-bg selection:bg-cyber-accent selection:text-cyber-bg">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="flex-1 p-8 space-y-8 overflow-y-auto cyber-grid relative">
          <div className="scanline" />
          
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                Security Operations Center
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20">
                  LIVE
                </span>
              </h2>
              <p className="text-cyber-muted text-sm mt-1">Monitoring 12 active sensors across the global network.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-cyber-card border border-cyber-border text-xs font-bold text-white hover:bg-white/5 transition-all flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyber-accent" />
                SYSTEM REPORT
              </button>
              <button className="px-4 py-2 rounded-lg bg-cyber-danger/10 border border-cyber-danger/20 text-xs font-bold text-cyber-danger hover:bg-cyber-danger/20 transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" />
                EMERGENCY LOCKDOWN
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <StatsGrid stats={stats} />

          {/* Charts Section */}
          <ThreatChart />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 h-[600px]">
              <LogFeed logs={logs} onAnalyze={handleAnalyze} />
            </div>
            
            <div className="space-y-6">
              <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-cyber-warning" />
                  Active Threat Summary
                </h3>
                <div className="space-y-4">
                  {logs.filter(l => l.severity === "CRITICAL" || l.severity === "HIGH").slice(0, 3).map(threat => (
                    <div key={threat.id} className="p-3 rounded-lg bg-cyber-danger/5 border border-cyber-danger/10 flex items-start gap-3">
                      <div className="w-1.5 h-10 rounded-full bg-cyber-danger" />
                      <div>
                        <p className="text-xs font-bold text-white">{threat.type} Detected</p>
                        <p className="text-[10px] font-mono text-cyber-muted mt-1">Source: {threat.sourceIp}</p>
                        <p className="text-[10px] font-mono text-cyber-danger mt-1 uppercase tracking-widest">{threat.severity} SEVERITY</p>
                      </div>
                    </div>
                  ))}
                  {logs.filter(l => l.severity === "CRITICAL" || l.severity === "HIGH").length === 0 && (
                    <p className="text-xs text-cyber-muted italic text-center py-4">No high-severity threats in current buffer.</p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyber-accent/20 to-blue-600/20 border border-cyber-accent/30 rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 bg-cyber-accent opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Shield AI Pro</h3>
                <p className="text-xs text-cyber-text leading-relaxed mb-4">
                  Upgrade to Enterprise for advanced packet inspection and automated incident response orchestration.
                </p>
                <button className="w-full py-2 rounded-lg bg-cyber-accent text-cyber-bg text-xs font-bold hover:bg-cyan-400 transition-all">
                  UPGRADE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnalysisModal 
        log={selectedLog}
        analysis={analysis}
        loading={isAnalyzing}
        onClose={() => setSelectedLog(null)}
      />
    </div>
  );
}
