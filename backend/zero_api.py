from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from zero_g import save_match_result, get_leaderboard, save_agent_to_0g, get_all_agents

app2 = FastAPI()
app2.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app2.get("/zero/leaderboard")
async def leaderboard():
    entries = await get_leaderboard(10)
    return {"leaderboard": entries, "source": "0G Decentralized Storage"}

@app2.post("/zero/match")
async def match(data: dict):
    result = await save_match_result(data.get("player","Unknown"), data.get("score",0), data.get("kills",0), data.get("duration",0))
    return {"status": "saved", "tx_hash": result.get("tx_hash"), "explorer_url": result.get("explorer_url")}

@app2.post("/zero/agent")
async def agent(data: dict):
    result = await save_agent_to_0g(data.get("agent_id","unknown"), data.get("blocks",[]), data.get("prompt",""))
    return {"status": "stored", "root_hash": result.get("root_hash"), "explorer_url": result.get("explorer_url")}

@app2.get("/zero/agents")
async def agents():
    return {"agents": await get_all_agents(), "source": "0G Storage"}
