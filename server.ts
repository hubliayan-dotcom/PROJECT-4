import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simulated IDS Data Generator
  const attackTypes = ["DoS", "Exploits", "Backdoors", "Reconnaissance", "Shellcode", "Worms", "Fuzzers", "Analysis", "Generic"];
  
  const generateLog = () => {
    const isAttack = Math.random() > 0.85;
    const timestamp = new Date().toISOString();
    const sourceIp = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
    const destIp = `10.0.0.${Math.floor(Math.random() * 254) + 1}`;
    const port = [80, 443, 22, 21, 3389, 5432][Math.floor(Math.random() * 6)];
    
    if (isAttack) {
      const type = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp,
        sourceIp,
        destIp,
        port,
        protocol: "TCP",
        type,
        severity: type === "Worms" || type === "Backdoors" ? "CRITICAL" : "HIGH",
        status: "BLOCKED",
        payload_size: Math.floor(Math.random() * 5000) + 500,
        description: `Potential ${type} activity detected from ${sourceIp}`
      };
    } else {
      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp,
        sourceIp,
        destIp,
        port,
        protocol: Math.random() > 0.5 ? "TCP" : "UDP",
        type: "Normal",
        severity: "LOW",
        status: "ALLOWED",
        payload_size: Math.floor(Math.random() * 1000) + 40,
        description: "Standard traffic"
      };
    }
  };

  // API Routes
  app.get("/api/logs", (req, res) => {
    const count = parseInt(req.query.count as string) || 20;
    const logs = Array.from({ length: count }, generateLog).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    res.json(logs);
  });

  app.get("/api/stats", (req, res) => {
    res.json({
      uptime: process.uptime(),
      total_packets: Math.floor(Math.random() * 1000000) + 500000,
      threats_blocked: Math.floor(Math.random() * 5000) + 1200,
      active_sensors: 12,
      system_health: "OPTIMAL",
      accuracy: 98.42
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Shield AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
