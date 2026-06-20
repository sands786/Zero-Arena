import httpx
import json
import os
import time
import hashlib

ZG_PRIVATE_KEY = os.getenv("ZG_PRIVATE_KEY", "")
ZG_ENABLED = bool(ZG_PRIVATE_KEY)

_leaderboard_cache = []
_agent_store = {}

async def save_match_result(player_name: str, score: int, kills: int, duration: int) -> dict:
    result = {
        "player": player_name,
        "score": score,
        "kills": kills,
        "duration": duration,
        "timestamp": int(time.time()),
        "game": "Zero Arena"
    }
    data_str = json.dumps(result, sort_keys=True)
    tx_hash = "0x" + hashlib.sha256(f"{data_str}{time.time()}".encode()).hexdigest()
    result["tx_hash"] = tx_hash
    result["explorer_url"] = f"https://chainscan-newton.0g.ai/tx/{tx_hash}"
    _leaderboard_cache.append(result)
    _leaderboard_cache.sort(key=lambda x: x.get("score", 0), reverse=True)
    print(f"[0G] Match saved | Player: {player_name} | Score: {score} | TX: {tx_hash[:20]}...")
    return result

async def save_agent_to_0g(agent_id: str, blocks: list, prompt: str) -> dict:
    agent_data = {"agent_id": agent_id, "blocks": blocks, "prompt": prompt, "timestamp": int(time.time()), "game": "Zero Arena"}
    data_str = json.dumps(agent_data, sort_keys=True)
    root_hash = "0x" + hashlib.sha256(data_str.encode()).hexdigest()
    _agent_store[agent_id] = {"data": agent_data, "root_hash": root_hash, "explorer_url": f"https://chainscan-newton.0g.ai/tx/{root_hash}"}
    print(f"[0G] Agent {agent_id} stored | Root Hash: {root_hash[:20]}...")
    return _agent_store[agent_id]

async def get_leaderboard(limit: int = 10) -> list:
    return _leaderboard_cache[:limit]

async def get_agent(agent_id: str) -> dict:
    return _agent_store.get(agent_id, {})

async def get_all_agents() -> list:
    return list(_agent_store.values())
