import { useState, useEffect } from "react";

const BACKEND = "http://localhost:8002";

export async function saveAgentTo0G(agentId, blocks, prompt) {
  try {
    const resp = await fetch(`${BACKEND}/api/0g/agent/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent_id: agentId, blocks, prompt })
    });
    const data = await resp.json();
    console.log("[0G] Agent stored:", data.root_hash);
    return data;
  } catch (e) {
    console.error("[0G] Save agent failed:", e);
    return null;
  }
}

export async function saveMatchTo0G(player, score, kills, duration) {
  try {
    const resp = await fetch(`${BACKEND}/api/0g/match/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player, score, kills, duration })
    });
    return await resp.json();
  } catch (e) {
    console.error("[0G] Save match failed:", e);
    return null;
  }
}

export default function ZeroLeaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastTx, setLastTx] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      const resp = await fetch(`${BACKEND}/api/0g/leaderboard`);
      const data = await resp.json();
      setScores(data.leaderboard || []);
    } catch (e) {
      setScores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const testSave = async () => {
    const result = await saveMatchTo0G("ZeroBot_1", Math.floor(Math.random()*3000), Math.floor(Math.random()*10), 120);
    if (result?.tx_hash) {
      setLastTx(result.tx_hash);
      fetchLeaderboard();
    }
  };

  return (
    <div style={{
      background: "#0a0a1a",
      border: "1px solid #7c3aed",
      borderRadius: 12,
      padding: 16,
      color: "white",
      width: 320,
      fontFamily: "monospace"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h2 style={{ color: "#a78bfa", margin: 0, fontSize: 14 }}>⚡ ZERO ARENA LEADERBOARD</h2>
        <button onClick={fetchLeaderboard} style={{ background: "none", border: "1px solid #7c3aed", color: "#a78bfa", borderRadius: 4, padding: "2px 8px", cursor: "pointer", fontSize: 11 }}>↻</button>
      </div>
      
      <p style={{ color: "#6d28d9", fontSize: 10, margin: "0 0 12px 0" }}>
        🔗 Powered by 0G Decentralized Storage
      </p>

      {loading ? (
        <p style={{ color: "#888", fontSize: 12 }}>Fetching from 0G...</p>
      ) : scores.length === 0 ? (
        <div>
          <p style={{ color: "#888", fontSize: 12 }}>No matches yet. Deploy an agent!</p>
          <button onClick={testSave} style={{
            background: "#7c3aed", border: "none", color: "white",
            borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 11, marginTop: 8
          }}>
            Test: Save Score to 0G
          </button>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ color: "#a78bfa", borderBottom: "1px solid #333" }}>
              <th style={{ textAlign: "left", padding: "6px 4px" }}>#</th>
              <th style={{ textAlign: "left", padding: "6px 4px" }}>Agent</th>
              <th style={{ textAlign: "right", padding: "6px 4px" }}>Score</th>
              <th style={{ textAlign: "right", padding: "6px 4px" }}>Kills</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1a1a2e" }}>
                <td style={{ padding: "6px 4px", color: i === 0 ? "#fbbf24" : "#888" }}>
                  {i === 0 ? "🏆" : i + 1}
                </td>
                <td style={{ padding: "6px 4px" }}>{s.player}</td>
                <td style={{ padding: "6px 4px", textAlign: "right", color: "#a78bfa" }}>{s.score}</td>
                <td style={{ padding: "6px 4px", textAlign: "right" }}>{s.kills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {lastTx && (
        <div style={{ marginTop: 10, padding: 8, background: "#0d0d1f", borderRadius: 6, fontSize: 10 }}>
          <p style={{ color: "#10b981", margin: 0 }}>✅ Saved to 0G!</p>
          <p style={{ color: "#6b7280", margin: "2px 0 0 0", wordBreak: "break-all" }}>
            TX: {lastTx.slice(0, 30)}...
          </p>
        </div>
      )}

      <button onClick={testSave} style={{
        width: "100%", marginTop: 10,
        background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
        border: "none", color: "white", borderRadius: 6,
        padding: "8px", cursor: "pointer", fontSize: 11
      }}>
        + Save Test Score to 0G
      </button>
    </div>
  );
}
