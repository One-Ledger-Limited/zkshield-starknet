// flag-address.js — Flag a test address on ShieldRegistry
// Usage: node flag-address.js <target_address> [reason]

import { RpcProvider, Account, CallData } from 'starknet';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

config();

const RPC_URL = process.env.STARKNET_RPC_URL || 'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_9';
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const ADDRESS = process.env.DEPLOYER_ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !ADDRESS || !CONTRACT_ADDRESS) {
  console.error('Set DEPLOYER_PRIVATE_KEY, DEPLOYER_ADDRESS and CONTRACT_ADDRESS in .env');
  process.exit(1);
}

function normaliseAddress(addr) {
  if (!addr) return null;
  return '0x' + addr.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node flag-address.js <target_address> [reason_number]');
    process.exit(1);
  }

  const target = normaliseAddress(args[0]);
  // Validate hex characters (reject stylised examples like 0x5cAm... which contain 'm')
  const raw = args[0];
  if (!/^0x[0-9a-fA-F]+$/.test(raw)) {
    console.error('Invalid target address: not a hex string. Use a valid 0x... hex address.');
    process.exit(1);
  }
  const reasonArg = args[1] || 'phishing'; // default reason = 'phishing'

  // If user passed a hex felt (0x...), use it. Otherwise encode UTF-8 string to hex felt.
  function stringToFelt(s) {
    const buf = Buffer.from(String(s), 'utf8');
    return '0x' + buf.toString('hex');
  }

  const reason = reasonArg.startsWith('0x') ? reasonArg : stringToFelt(reasonArg);

  console.log('Connecting to Starknet RPC:', RPC_URL);
  const provider = new RpcProvider({ nodeUrl: RPC_URL });

  const account = new Account({ provider, address: ADDRESS, signer: PRIVATE_KEY, transactionVersion: '0x3' });

  console.log('Invoking flag_address on', CONTRACT_ADDRESS, 'for', target);

  // Build calldata using CallData.compile to match Starknet encoding
  const calldata = CallData.compile({ address: target, reason });

  try {
    // Use account.execute to submit an invoke transaction
    const execRes = await account.execute(
      [
        {
          contractAddress: CONTRACT_ADDRESS,
          entrypoint: 'flag_address',
          calldata,
        },
      ],
      { version: '0x3' }
    );

    const txHash = execRes.transaction_hash || execRes.transactionHash || execRes;
    console.log('Submitted tx:', txHash);
    console.log('Waiting for confirmation...');
    await provider.waitForTransaction(txHash);
    console.log('✅  Flag transaction confirmed');
  } catch (err) {
    console.error('❌  Failed to submit flag transaction:', err?.message || err);
    process.exit(1);
  }
}

main();
