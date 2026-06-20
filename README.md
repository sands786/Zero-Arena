# ⚡ ZERO ARENA

> Build AI agents. Deploy them in battle. Store everything on 0G blockchain forever.

![Zero Arena](https://img.shields.io/badge/Zero_Arena-Season_01-ff3200?style=for-the-badge)
![0G Chain](https://img.shields.io/badge/0G-Decentralized_Storage-orange?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Llama_3.1-blue?style=for-the-badge)

---

## 🎮 What is Zero Arena?

Zero Arena is an **AI-native battle game** built on 0G decentralized storage. Players design autonomous AI agents using a drag-and-drop logic builder — no code required — then deploy them into a live multiplayer battle arena where they fight, collect XP, and survive using real AI decision-making.

Every agent config and match result is stored **permanently on 0G blockchain.**

---

## 🔗 Real 0G Integration

| Feature | Status |
|---|---|
| Agent DNA stored on 0G | ✅ |
| Match results on 0G chain | ✅ |
| On-chain leaderboard | ✅ |
| Real A0GI gas spent | ✅ |
| TX verifiable on explorer | ✅ |

**Verified Transaction:**TX: 0x86b48c7008de4bf8d4db452ee6240f13950c75e548bb8e9b30e9ec9080e91211

Chain: 0G Newton Testnet

Gas Paid: 0.00116 A0GI

Flow Contract: 0x22E03a6A89B950F1c82ec5e74F8eCa321a105296

Explorer: https://chainscan-newton.0g.ai/tx/0x86b48c7008de4bf8d4db452ee6240f13950c75e548bb8e9b30e9ec9080e91211

---

## 🚀 Features

- **Drag-and-drop agent builder** — Design AI behavior with logic blocks. No coding needed.
- **Live MMO battle arena** — Real-time multiplayer game with WebSocket architecture
- **Autonomous AI decisions** — Agents powered by Llama 3.1 via Groq making real-time choices
- **0G decentralized storage** — All data stored on-chain, not on any central server
- **On-chain leaderboard** — Scores ranked from 0G storage, trustless and permanent
- **Agent DNA system** — Every agent gets a unique hash identity on 0G
- **Chain proof page** — Live wallet balance and TX history visible in-app

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TailwindCSS |
| Backend | FastAPI, Python 3.10 |
| Game Engine | TypeScript, Bun, WebSockets |
| AI Brain | Llama 3.1 8B via Groq API |
| Blockchain | 0G Newton Testnet |
| Storage | 0G Decentralized Storage SDK |
| Chain | 0G Flow Contract |

---

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Bun
- Groq API key (free at console.groq.com)

### Setup

```bash
# Clone the repo
git clone https://github.com/sands786/Zero-Arena
cd Zero-Arena
```

**Terminal 1 — Game Server:**
```bash
cd game_environment
bun install
bun run dev
```

**Terminal 2 — AI Backend:**
```bash
cd backend
pip install -r requirements.txt
export OPENAI_BASE_URL=https://api.groq.com/openai/v1/
export OPENAI_API_KEY=your_groq_key_here
export LLM_PROVIDER=openai
python3 main.py
```

**Terminal 3 — 0G API:**
```bash
cd backend
uvicorn zero_api:app2 --port 8002
```

**Terminal 4 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:3001**

---

## 🎯 How to Play

1. Go to **Arena** → drag logic blocks onto canvas
2. Connect: **On Start → Agent Decision → Attack/Move/Collect**
3. Set system prompt: *"You are an aggressive AI agent in Zero Arena"*
4. Enter Agent ID (e.g. ZeroBot_1)
5. Click **DEPLOY AGENT**
6. Click **PLAY** — watch your agent fight autonomously!

---

## 🔗 0G Chain Proof

Visit `/chain` page in the app to see:
- Live wallet balance (A0GI)
- Real on-chain transaction hashes
- Verified storage fee payments
- Explorer links

---

## 📁 Project Structure
Zero-Arena/

├── frontend/          # Next.js UI + agent builder

├── backend/           # FastAPI AI agent logic

│   ├── main.py        # Agent orchestration

│   ├── zero_g.py      # 0G storage integration

│   └── zero_api.py    # 0G leaderboard API

├── game_environment/  # TypeScript battle arena

└── mcp-server/        # MCP protocol server

---

## 🏆 Built for Zero Cup by 0G Labs

Zero Arena was built for the **Zero Cup** hackathon by 0G Labs — a vibe coding tournament for AI-native applications on 0G decentralized infrastructure.

**Team: Zero Protocol**

---

## 📄 License

MIT License — see LICENSE file for details.
