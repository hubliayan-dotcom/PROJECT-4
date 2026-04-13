import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const trafficData = [
  { time: "00:00", traffic: 400, threats: 24 },
  { time: "04:00", traffic: 300, threats: 18 },
  { time: "08:00", traffic: 900, threats: 45 },
  { time: "12:00", traffic: 1200, threats: 80 },
  { time: "16:00", traffic: 1500, threats: 120 },
  { time: "20:00", traffic: 1100, threats: 60 },
  { time: "23:59", traffic: 600, threats: 30 },
];

const attackDistribution = [
  { name: "DoS", value: 400 },
  { name: "Exploits", value: 300 },
  { name: "Fuzzers", value: 200 },
  { name: "Generic", value: 150 },
  { name: "Recon", value: 100 },
];

const COLORS = ["#00f2ff", "#ff3e3e", "#ffb800", "#00ff94", "#8b949e"];

export function ThreatChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-cyber-card border border-cyber-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Network Traffic vs Threats</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-accent" />
              <span className="text-[10px] font-mono text-cyber-muted">TRAFFIC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-danger" />
              <span className="text-[10px] font-mono text-cyber-muted">THREATS</span>
            </div>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3e3e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff3e3e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3139" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#8b949e" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#8b949e" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#14161a", 
                  border: "1px solid #2d3139",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#e1e4e8"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="traffic" 
                stroke="#00f2ff" 
                fillOpacity={1} 
                fill="url(#colorTraffic)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="threats" 
                stroke="#ff3e3e" 
                fillOpacity={1} 
                fill="url(#colorThreats)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Attack Distribution</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attackDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3139" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#8b949e" 
                fontSize={10} 
                width={70}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{ 
                  backgroundColor: "#14161a", 
                  border: "1px solid #2d3139",
                  borderRadius: "8px",
                  fontSize: "12px"
                }} 
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {attackDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
