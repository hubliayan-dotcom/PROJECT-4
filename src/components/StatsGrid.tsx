import React from "react";
import { Activity, ShieldAlert, Zap, Target } from "lucide-react";
import { SystemStats } from "@/src/types";

interface StatsGridProps {
  stats: SystemStats | null;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    {
      label: "Total Packets",
      value: stats?.total_packets.toLocaleString() || "0",
      icon: Activity,
      color: "text-cyber-accent",
      bg: "bg-cyber-accent/10",
      trend: "+12.5%",
      trendUp: true
    },
    {
      label: "Threats Blocked",
      value: stats?.threats_blocked.toLocaleString() || "0",
      icon: ShieldAlert,
      color: "text-cyber-danger",
      bg: "bg-cyber-danger/10",
      trend: "+4.2%",
      trendUp: true
    },
    {
      label: "Detection Accuracy",
      value: `${stats?.accuracy || 0}%`,
      icon: Target,
      color: "text-cyber-success",
      bg: "bg-cyber-success/10",
      trend: "+0.02%",
      trendUp: true
    },
    {
      label: "Active Sensors",
      value: stats?.active_sensors || "0",
      icon: Zap,
      color: "text-cyber-warning",
      bg: "bg-cyber-warning/10",
      trend: "Stable",
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.label} className="bg-cyber-card border border-cyber-border rounded-xl p-6 relative overflow-hidden group hover:border-cyber-accent/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.07] transition-opacity" style={{ color: `var(--color-cyber-${item.color.split('-')[2]})` }} />
          
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${item.bg} border border-current/20`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div className={`text-[10px] font-mono px-2 py-1 rounded border ${item.trendUp ? 'text-cyber-success border-cyber-success/20 bg-cyber-success/5' : 'text-cyber-danger border-cyber-danger/20 bg-cyber-danger/5'}`}>
              {item.trend}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-mono text-cyber-muted uppercase tracking-wider mb-1">{item.label}</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
