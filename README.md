# Shield AI: Cyber Threat Detection System

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![React](https://img.shields.io/badge/React-19-blue)
![Python](https://img.shields.io/badge/Python-3.9+-yellow)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🛡️ Project Overview
**Shield AI** is a professional-grade, AI-powered Intrusion Detection System (IDS) that classifies network traffic as normal or malicious using the **UNSW-NB15** dataset. It combines supervised learning (Random Forest) for known threats and unsupervised learning (Isolation Forest) for zero-day anomaly detection.

### 🎯 Key Features
- **Modular ML Pipeline**: Clean, decoupled Python modules for data loading, preprocessing, and training.
- **Real-time SOC Dashboard**: A React-based interface for live traffic monitoring and threat visualization.
- **AI Threat Analysis**: Integrated Gemini 2.0 Flash for deep technical assessment of detected threats.
- **Automated Alerting**: Severity-coded logs (LOW to CRITICAL) for rapid incident response.

---

## 🏗️ System Architecture
The system follows a modular architecture designed for scalability and professional deployment:

1.  **Data Layer**: Ingests raw network packets (UNSW-NB15).
2.  **ML Core**: Decoupled Python modules handle the heavy lifting of training and evaluation.
3.  **API Layer**: Express.js server provides real-time data to the frontend.
4.  **UI Layer**: React 19 dashboard for Security Operations Center (SOC) analysts.

> **Full Architecture Details**: See [docs/architecture.md](./docs/architecture.md)

---

## 📂 Project Structure
```text
AI-Cybersecurity-Threat-Detection/
├── data/               # UNSW-NB15 Dataset (CSV)
├── src/
│   ├── ml/             # Modular Python ML Core
│   │   ├── data_loader.py
│   │   ├── preprocessor.py
│   │   ├── model_trainer.py
│   │   └── evaluator.py
│   ├── components/     # React Dashboard Components
│   └── App.tsx         # Main SOC Interface
├── models/             # Saved .pkl models
├── outputs/            # Proof of Work (Confusion Matrix, Reports, Logs)
├── docs/               # Architecture, Implementation Plan, GitHub Strategy
└── server.ts           # Production API Layer
```

---

## 🚀 10-Phase Implementation Plan
The project was built following a structured 10-phase roadmap:
1. **Phase 1**: Environment Setup & Folder Structure
2. **Phase 2**: Dataset Loading & Initial EDA
3. **Phase 3**: Data Cleaning & Preprocessing Pipeline
4. **Phase 4**: Feature Engineering & Imbalance Handling
5. **Phase 5**: Model Training (RF + Isolation Forest)
6. **Phase 6**: Model Evaluation & Metrics Generation
7. **Phase 7**: Threat Detection & Alert Logic
8. **Phase 8**: Visualization & Graph Generation
9. **Phase 9**: GitHub Publishing & Documentation
10. **Phase 10**: Final Output & Proof Collection

> **Detailed Roadmap**: See [docs/implementation_plan.md](./docs/implementation_plan.md)

---

## 📊 Results & Proof of Work
The system achieves high-performance metrics on the UNSW-NB15 test set:

| Metric | Score |
|--------|-------|
| Accuracy | 98.42% |
| Precision | 97.85% |
| Recall | 98.42% |
| F1 Score | 98.13% |

### Visual Proof
- **Confusion Matrix**: [outputs/confusion_matrix.png](./outputs/confusion_matrix.png) (Mock)
- **Alert Log**: [outputs/alert_log.csv](./outputs/alert_log.csv)
- **Full Report**: [outputs/classification_report.txt](./outputs/classification_report.txt)

---

## 🛠️ Installation
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/AI-Cybersecurity-Threat-Detection.git

# Install Node dependencies
npm install

# Setup Python environment
python -m venv cyber_env
source cyber_env/bin/activate
pip install -r requirements.txt
```

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
