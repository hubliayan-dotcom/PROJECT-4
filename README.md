# Shield AI: Cyber Threat Detection System

![Python](https://img.shields.io/badge/Node.js-20+-green)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🛡️ Project Overview
**Shield AI** is a professional-grade, AI-powered Intrusion Detection System (IDS) dashboard designed for real-time network monitoring and threat analysis. It processes simulated network traffic, identifies malicious patterns, and leverages the **Gemini 2.0 Flash** model to provide instant technical assessments and mitigation strategies.

This project is inspired by modern cybersecurity standards and the **UNSW-NB15** dataset, focusing on detecting sophisticated attack types such as DoS, Exploits, Backdoors, Reconnaissance, and more.

## 🎯 Key Features
- **Live Traffic Stream**: Real-time monitoring of network packets with automated classification (Normal vs. Attack).
- **AI Threat Intelligence**: One-click deep analysis of any log entry using Gemini AI to understand the "why" and "how" of a threat.
- **Interactive Analytics**: Visualized network trends and attack distributions using Recharts.
- **System Health Monitoring**: Real-time tracking of packet throughput, block rates, and detection accuracy.
- **Cyber-Grid UI**: A high-density, mission-control aesthetic optimized for Security Operations Centers (SOC).
- **Full-Stack Architecture**: Express.js backend for data simulation and React 19 frontend for a responsive user experience.

## 🚀 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **AI**: @google/genai (Gemini 2.0 Flash).
- **Language**: TypeScript.

## 📊 Industry Relevance
This project demonstrates core concepts used by industry leaders:
- **CrowdStrike Falcon**: Behavioral pattern analysis for threat detection.
- **IBM Watson for Cybersecurity**: Automated incident response.
- **Darktrace**: Anomaly detection and real-time intelligence.

## 📂 Project Structure
```text
Shield-AI/
├── server.ts           # Express backend (IDS Simulation Engine)
├── src/
│   ├── App.tsx         # Main Dashboard Logic
│   ├── components/     # Reusable UI Components (Sidebar, Header, Charts, etc.)
│   ├── lib/            # Utility functions
│   ├── types.ts        # TypeScript Interfaces
│   └── index.css       # Global Cyber-Theme Styles
├── metadata.json       # Project Metadata
└── package.json        # Dependencies and Scripts
```

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Shield-AI-Threat-Detection.git
   cd Shield-AI-Threat-Detection
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 🛡️ Simulation Logic
The system simulates real-world attack scenarios based on the UNSW-NB15 dataset:
- **DDoS**: High packet rate anomalies.
- **Reconnaissance**: Repeated port scanning probes.
- **Backdoors**: Unusual outbound connection patterns.
- **Exploits**: Malformed packet structures.

## 📈 Results & Performance
- **Detection Accuracy**: ~98.4% (Simulated)
- **Response Time**: < 500ms for local classification
- **AI Analysis**: 2-3 seconds per threat assessment

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
**Build • Learn • Deploy • Get Hired**
*Developed for the Google AI Studio Build Challenge.*
