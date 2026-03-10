// starknet-check.js
// ─────────────────────────────────────────────────────────────────────────────
// Drop-in for the ShieldTrade Chrome extension.
// Makes raw Starknet JSON-RPC calls — no bundler or external library needed.
//
// Usage (in background.js or popup.js):
//   importScripts('starknet-check.js');          // MV2 / service-worker
//   const result = await starknetCheckAddress('0xABC...');
//
// For MV3 service workers that support ES modules, use:
//   import { starknetCheckAddress, starknetFlagAddress } from './starknet-check.js';
// ─────────────────────────────────────────────────────────────────────────────

// ── Config ───────────────────────────────────────────────────────────────────
// Update CONTRACT_ADDRESS after you run `node deploy.js`
const STARKNET_CONFIG = {
  RPC_URL: 'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_9/gwqg0xC_crzX1zez07iYT',
  CONTRACT_ADDRESS: '0x265158176fd766b5c480d210c34a314e374eb4653703b6c4154f3f1235e2865',

  // Pre-computed function selectors (starknet_keccak of function name)
  SELECTORS: {
    is_flagged:       '0x948ffb0779f5ee5a9feb8f33153591db747cd787d970278dd9821f585305ef',
    flag_address:     '0x2d6fc44f30d7976da8a45261ac6770ef0391aeed160e6389af457525f177b0f',
    get_flag_reason:  '0x1d08d3f38d27cef4c20c42d85952ebee56da00cac2d4b74b64beec13e9fbc0c',
    get_flag_count:   '0x1a1c718984bd9dc017af9606f8de343c99f93d72fb84f7360625c67749367f3',
    get_total_flagged:'0x39d06fcf14bbc5c73b663adbf1e70677bbd97189db8ef94fdfb3745dc1b522c',
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Normalise any EVM / Starknet address to lowercase hex with 0x prefix */
function normaliseAddress(addr) {
  if (!addr) return null;
  return '0x' + addr.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

/** Minimal JSON-RPC call to a Starknet node */
async function starknetRpcCall(method, params) {
  const response = await fetch(STARKNET_CONFIG.RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });

  if (!response.ok) throw new Error(`RPC HTTP error: ${response.status}`);
  const data = await response.json();
  if (data.error) throw new Error(`RPC error ${data.error.code}: ${data.error.message}`);
  return data.result;
}

/** Call a view function on the ShieldRegistry contract */
async function contractCall(selector, calldata = []) {
  if (!STARKNET_CONFIG.CONTRACT_ADDRESS) {
    throw new Error('STARKNET_CONFIG.CONTRACT_ADDRESS is not set — deploy the contract first');
  }

  return starknetRpcCall('starknet_call', {
    request: {
      contract_address: STARKNET_CONFIG.CONTRACT_ADDRESS,
      entry_point_selector: selector,
      calldata,
    },
    block_id: 'latest',
  });
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Check whether an Ethereum/Starknet address is flagged on-chain.
 *
 * @param {string} address  — wallet address (0x-prefixed, EVM or Starknet style)
 * @returns {Promise<{flagged: boolean, flagCount: number, reason: string, source: string}>}
 */
async function starknetCheckAddress(address) {
  try {
    const normAddr = normaliseAddress(address);
    if (!normAddr) return { flagged: false, source: 'starknet', error: 'Invalid address' };

    // Call is_flagged(address) → [felt252: 0 or 1]
    const [flaggedResult] = await contractCall(
      STARKNET_CONFIG.SELECTORS.is_flagged,
      [normAddr],
    );

    const flagged = flaggedResult !== '0x0';

    let flagCount = 0;
    let reason = '';

    if (flagged) {
      // Fetch extra details in parallel
      const [countResult, reasonResult] = await Promise.all([
        contractCall(STARKNET_CONFIG.SELECTORS.get_flag_count, [normAddr]),
        contractCall(STARKNET_CONFIG.SELECTORS.get_flag_reason, [normAddr]),
      ]);

      flagCount = parseInt(countResult[0], 16);
      // felt252 reason → try to decode as UTF-8 short string
      reason = felt252ToString(reasonResult[0]);
    }

    return { flagged, flagCount, reason, source: 'starknet-onchain' };

  } catch (err) {
    console.warn('[ShieldTrade/Starknet] check failed:', err.message);
    return { flagged: false, source: 'starknet', error: err.message };
  }
}

/**
 * Decode a Starknet short-string (felt252) back to a human-readable string.
 * Starknet encodes short strings as big-endian ASCII bytes packed into a felt252.
 */
function felt252ToString(felt) {
  if (!felt || felt === '0x0') return '';
  try {
    const hex = felt.replace(/^0x/, '').padStart(2, '0');
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      const code = parseInt(hex.slice(i, i + 2), 16);
      if (code !== 0) str += String.fromCharCode(code);
    }
    return str;
  } catch {
    return felt;
  }
}

/**
 * Get the global count of currently-flagged addresses from the contract.
 * Useful for displaying on the extension dashboard.
 */
async function starknetGetTotalFlagged() {
  try {
    const [result] = await contractCall(STARKNET_CONFIG.SELECTORS.get_total_flagged);
    return parseInt(result, 16);
  } catch (err) {
    console.warn('[ShieldTrade/Starknet] get_total_flagged failed:', err.message);
    return null;
  }
}

// Export for ES-module service workers / popup scripts
if (typeof module !== 'undefined') {
  module.exports = { starknetCheckAddress, starknetGetTotalFlagged, STARKNET_CONFIG };
}
