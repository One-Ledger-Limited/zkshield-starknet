// check-address.js — Query ShieldRegistry for an address
// Usage: node check-address.js <target_address>

import { RpcProvider, CallData } from 'starknet';
import { config } from 'dotenv';

config();

const RPC_URL = process.env.STARKNET_RPC_URL || 'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_9';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!CONTRACT_ADDRESS) {
  console.error('Set CONTRACT_ADDRESS in .env');
  process.exit(1);
}

function normaliseAddress(addr) {
  if (!addr) return null;
  return '0x' + addr.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node check-address.js <target_address>');
    process.exit(1);
  }

  const raw = args[0];
  if (!/^0x[0-9a-fA-F]+$/.test(raw)) {
    console.error('Invalid address: not a hex string');
    process.exit(1);
  }

  const addr = normaliseAddress(raw);

  const provider = new RpcProvider({ nodeUrl: RPC_URL });

  try {
    const flaggedRes = await provider.callContract({ contractAddress: CONTRACT_ADDRESS, entrypoint: 'is_flagged', calldata: [addr] }, 'latest');
    const flagged = (flaggedRes?.[0] || '0x0') !== '0x0';

    const countRes = await provider.callContract({ contractAddress: CONTRACT_ADDRESS, entrypoint: 'get_flag_count', calldata: [addr] }, 'latest');
    const count = parseInt(countRes?.[0] || '0x0', 16);

    const reasonRes = await provider.callContract({ contractAddress: CONTRACT_ADDRESS, entrypoint: 'get_flag_reason', calldata: [addr] }, 'latest');
    const reasonFelt = (reasonRes?.[0] || '0x0');

    function feltToString(felt) {
      if (!felt || felt === '0x0') return '';
      const hex = felt.replace(/^0x/, '').padStart(2, '0');
      let s = '';
      for (let i = 0; i < hex.length; i += 2) {
        const code = parseInt(hex.slice(i, i+2), 16);
        if (code !== 0) s += String.fromCharCode(code);
      }
      return s;
    }

    const reason = feltToString(reasonFelt);

    console.log('Address:', raw);
    console.log('Flagged:', flagged);
    console.log('Flag count:', count);
    console.log('Reason:', reason || reasonFelt);
  } catch (err) {
    console.error('Failed to query contract:', err.message || err);
    process.exit(1);
  }
}

main();
