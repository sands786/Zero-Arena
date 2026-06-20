import subprocess
import json
import os

PRIVATE_KEY = os.getenv("ZG_PRIVATE_KEY", "0x18c3731be5ea361284aba0286f249d776b705b4d42b16568ec3e7f8de78664e3")
EVM_RPC = "https://evmrpc-testnet.0g.ai"
STORAGE_RPC = "https://indexer-storage-testnet-turbo.0g.ai"
FLOW_ADDRESS = "0x22E03a6A89B950F1c82ec5e74F8eCa321a105296"
EXPLORER = "https://chainscan-newton.0g.ai/tx"

async def upload_to_0g(data: dict) -> dict:
    """Upload data to real 0G chain and return TX hash"""
    script = f"""
const {{ Uploader, MemData, getFlowContract }} = require('@0gfoundation/0g-storage-ts-sdk');
const {{ ethers }} = require('ethers');
const signer = new ethers.Wallet('{PRIVATE_KEY}', new ethers.JsonRpcProvider('{EVM_RPC}'));
const flow = getFlowContract('{FLOW_ADDRESS}', signer);
const uploader = new Uploader(['{STORAGE_RPC}'], '{EVM_RPC}', flow);
const memData = new MemData(Buffer.from(JSON.stringify({json.dumps(data)})));
uploader.uploadFile(memData, {{}}).then(([tx, err]) => {{
  if(err) {{ console.log(JSON.stringify({{error: err.toString()}})); return; }}
  console.log(JSON.stringify({{tx: tx}}));
}}).catch(e => console.log(JSON.stringify({{error: e.message}})));
"""
    try:
        result = subprocess.run(
            ['node', '-e', script],
            capture_output=True, text=True, timeout=60,
            cwd='/home/shahmeer/Discerio/frontend'
        )
        # Find TX hash in output
        for line in result.stdout.split('\n'):
            if 'Transaction submitted' in line and 'hash:' in line:
                tx_hash = line.split('hash:')[1].strip()
                return {
                    "tx_hash": tx_hash,
                    "explorer_url": f"{EXPLORER}/{tx_hash}",
                    "status": "confirmed"
                }
        return {"error": result.stdout, "stderr": result.stderr}
    except Exception as e:
        return {"error": str(e)}
