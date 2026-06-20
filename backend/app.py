from main import app
from zero_g import save_match_result, get_leaderboard, save_agent_to_0g, get_all_agents

@app.get("/zero/leaderboard")
async def zero_leaderboard():
    entries = await get_leaderboard(10)
    return {"leaderboard": entries, "source": "0G Decentralized Storage"}

@app.post("/zero/match")
async def zero_match(data: dict):
    result = await save_match_result(data.get("player","Unknown"), data.get("score",0), data.get("kills",0), data.get("duration",0))
    return {"status": "saved", "tx_hash": result.get("tx_hash"), "explorer_url": result.get("explorer_url")}
