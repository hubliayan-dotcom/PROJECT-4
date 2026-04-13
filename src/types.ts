export interface LogEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  destIp: string;
  port: number;
  protocol: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "ALLOWED" | "BLOCKED" | "FLAGGED";
  payload_size: number;
  description: string;
}

export interface SystemStats {
  uptime: number;
  total_packets: number;
  threats_blocked: number;
  active_sensors: number;
  system_health: string;
  accuracy: number;
}

export interface ThreatAnalysis {
  assessment: string;
  recommendation: string;
}
