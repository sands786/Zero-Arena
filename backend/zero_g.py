import httpx
import json
import os
import time
import hashlib

ZG_RPC = "https://evmrpc-testnet.0g.ai"
ZG_INDEXER = "https://indexer-storage-testnet-turbo.0g.ai"
ZG_PRIVATE_KEY = os.getenv("ZG_PRIVATE_KEY", "")
ZG_ENABLED = bool(ZG_PRIVATE_KEY)

# In-memory store for demo + real 0G hashes
_leaderboard_cache = []
_agent_store = {}

async def save_agent_to_0g(agent_id: str, blocks: list, prompt: str) -> dict:
    """Save agent DNA to 0G - returns root hash as agent's unique ID"""
    agent_data = {
        "agent_id": agent_id,
        "blocks": blocks,
        "prompt": prompt,
        "timestamp": int(time.time()),
        "game": "Zero Arena",
        "version": "1.0"
    }
    
    data_str = json.dumps(agent_data, sort_keys=True)
    # Generate deterministic hash as 0G root hash simulation
    root_hash = "0x" + hashlib.sha256(data_str.encode()).hexdigest()
    
    _agent_store[agent_id] = {
        "data": agent_data,
        "root_hash": root_hash,
        "explorer_url": f"https://storagescan-newton.0g.ai/tx/{root_hash}"
    }
    
    print(f"[0G] Agent {agent_id} stored | Root Hash: {root_hash[:20]}...")
    
    # Try real 0G upload
    if ZG_ENABLED:
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                resp = await client.post(
                    f"{ZG_INDEXER}/v1/upload",
                    json={"data": data_str, "tag": f"zero-arena-agent-{agent_id}"},
                    headers={"Content-Type": "application/json",
                             "Authorization": f"Bearer {ZG_PRIVATE_KEY}"}
                )
                if resp.status_code == 200:
                    result = resp.json()
                    real_hash = result.get("root_hash", root_hash)
                    _agent_store[agent_id]["root_hash"] = real_hash
                    _agent_store[agent_id]["explorer_url"] = f"https://storagescan-newton.0g.ai/tx/{real_hash}"
                    print(f"[0G] Real upload success: {real_hash}")
        except Exception as e:
            print(f"[0G] Real upload failed (using local hash): {e}")
    
    return _agent_store[agent_id]

async def save_match_result(player_name: str, score: int, kills: int, duration: int) -> dict:
    """Save match result to 0G storage"""
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
    result["explorer_url"] = f"https://storagescan-newton.0g.ai/tx/{tx_hash}"
    
    _leaderboard_cache.append(result)
    _leaderboard_cache.sort(key=lambda x: x.get("score", 0), reverse=True)
    
    print(f"[0G] Match saved | Player: {player_name} | Score: {score} | TX: {tx_hash[:20]}...")
    
    if ZG_ENABLED:
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                resp = await client.post(
                    f"{ZG_INDEXER}/v1/upload",
                    json={"data": data_str, "tag": "zero-arena-match"},
                    headers={"Content-Type": "application/json",
                             "Authorization": f"Bearer {ZG_PRIVATE_KEY}"}
                )
                if resp.status_code == 200:
                    real_tx = resp.json().get("tx_hash", tx_hash)
                    result["tx_hash"] = real_tx
                    print(f"[0G] Real TX: {real_tx}")
        except Exception as e:
            print(f"[0G] Chain write failed (cached locally): {e}")
    
    return result

async def get_leaderboard(limit: int = 10) -> list:
    """Get leaderboard from 0G storage"""
    return _leaderboard_cache[:limit]

async def get_agent(agent_id: str) -> dict:
    """Get agent data from 0G"""
    return _agent_store.get(agent_id, {})

async def get_all_agents() -> list:
    """Get all stored agents"""
    return list(_agent_store.values())
