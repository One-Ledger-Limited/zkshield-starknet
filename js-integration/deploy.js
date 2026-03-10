// deploy.js — Deploy ShieldRegistry to Starknet Sepolia
// Run: node deploy.js

import { RpcProvider, Account, hash, ec, CallData } from 'starknet';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

config();

const __dir = dirname(fileURLToPath(import.meta.url));
const CONTRACTS_DIR = join(__dir, '../shield_registry/target/dev');

// ── Config ──────────────────────────────────────────────────────────────────
const RPC_URL      = process.env.STARKNET_RPC_URL || 'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_9';
const PRIVATE_KEY  = process.env.DEPLOYER_PRIVATE_KEY;
const ADDRESS      = process.env.DEPLOYER_ADDRESS;

if (!PRIVATE_KEY || !ADDRESS) {
  console.error('❌  Set DEPLOYER_PRIVATE_KEY and DEPLOYER_ADDRESS in .env (copy .env.example)');
  process.exit(1);
}

async function preflightAccountCheck(provider) {
  const derivedOwner = ec.starkCurve.getStarkKey(PRIVATE_KEY).toLowerCase();

  // Check owner public key on-chain
  try {
    const ownerRes = await provider.callContract(
      { contractAddress: ADDRESS, entrypoint: 'get_owner', calldata: [] },
      'latest'
    );
    const onchainOwner = (ownerRes?.[0] || '').toLowerCase();
    if (onchainOwner && onchainOwner !== derivedOwner) {
      throw new Error(
        `Private key mismatch: derived owner ${derivedOwner} != on-chain owner ${onchainOwner}`
      );
    }
    console.log('✅  Owner key matches on-chain account owner');
  } catch (error) {
    throw new Error(`Cannot validate account owner key: ${error?.message || error}`);
  }

  // Argent guardian account often requires wallet-side signature aggregation
  // Raw private-key signing can fail with "argent invalid signature length".
  try {
    const guardianRes = await provider.callContract(
      { contractAddress: ADDRESS, entrypoint: 'get_guardian', calldata: [] },
      'latest'
    );
    const guardian = (guardianRes?.[0] || '0x0').toLowerCase();
    if (guardian !== '0x0') {
      throw new Error(
        `Guardian is enabled (${guardian}). Disable guardian in wallet settings, then retry deploy.`
      );
    }
  } catch (error) {
    // Ignore if account class does not expose get_guardian
    if (!String(error?.message || '').includes('entry_point_selector')) {
      throw error;
    }
  }
}

// ── Load compiled contract ───────────────────────────────────────────────────
const sierraPath = join(CONTRACTS_DIR, 'shield_registry_ShieldRegistry.contract_class.json');
const casmPath   = join(CONTRACTS_DIR, 'shield_registry_ShieldRegistry.compiled_contract_class.json');

const sierraContract = JSON.parse(readFileSync(sierraPath, 'utf8'));
const casmContract   = JSON.parse(readFileSync(casmPath, 'utf8'));

// ── Deploy ───────────────────────────────────────────────────────────────────
async function deploy() {
  console.log('🔌  Connecting to Starknet Sepolia:', RPC_URL);
  const provider = new RpcProvider({ nodeUrl: RPC_URL });
  const account  = new Account({
    provider,
    address: ADDRESS,
    signer: PRIVATE_KEY,
    transactionVersion: '0x3',
  });
  await preflightAccountCheck(provider);
  const sierraClassHash = hash.computeSierraContractClassHash(sierraContract);
  console.log('   sierra class hash:', sierraClassHash);

  let classHash;
  console.log('📋  Declaring contract (or reusing if already declared)...');
  try {
    const declareRes = await account.declareIfNot(
      { contract: sierraContract, casm: casmContract },
      { version: '0x3' }
    );

    classHash = declareRes.class_hash;
    console.log('   class_hash :', classHash);
    if (declareRes.transaction_hash) {
      console.log('   declare tx :', declareRes.transaction_hash);
      await provider.waitForTransaction(declareRes.transaction_hash);
    } else {
      console.log('   declare tx : skipped (already declared)');
    }
  } catch (error) {
    const message = String(error?.message || error);
    const mismatch = message.includes('Mismatch compiled class hash');

    if (!mismatch) {
      throw error;
    }

    const expectedMatch = message.match(/Expected:\s*(0x[0-9a-fA-F]+)/);
    if (!expectedMatch) {
      classHash = sierraClassHash;
      console.log('   ⚠️  Compiled hash mismatch; no expected hash parsed, using class hash only:', classHash);
    } else {
      const expectedCompiledClassHash = expectedMatch[1];
      console.log('   ⚠️  Compiled hash mismatch, retrying declare with sequencer-expected hash:', expectedCompiledClassHash);

      const declareRes = await account.declare(
        {
          contract: sierraContract,
          classHash: sierraClassHash,
          compiledClassHash: expectedCompiledClassHash,
        },
        { version: '0x3' }
      );

      classHash = declareRes.class_hash || sierraClassHash;
      console.log('   class_hash :', classHash);
      if (declareRes.transaction_hash) {
        console.log('   declare tx :', declareRes.transaction_hash);
        await provider.waitForTransaction(declareRes.transaction_hash);
      }
    }
  }

  console.log('🚀  Deploying instance (owner =', ADDRESS, ')...');
  const constructorCalldata = CallData.compile({ owner: ADDRESS });

  const { transaction_hash: deployTxHash, contract_address } =
    await account.deployContract(
      { classHash, constructorCalldata },
      { version: '0x3' }
    );

  await provider.waitForTransaction(deployTxHash);

  console.log('');
  console.log('✅  ShieldRegistry deployed!');
  console.log('   Contract address:', contract_address);
  console.log('   Deploy tx       :', deployTxHash);
  console.log('');
  console.log('👉  Add to your .env file:');
  console.log(`   CONTRACT_ADDRESS=${contract_address}`);
  console.log('');
  console.log('🔍  View on Starkscan:');
  console.log(`   https://sepolia.starkscan.co/contract/${contract_address}`);
}

deploy().catch(err => {
  console.error('❌  Deploy failed:', err?.message || err);
  if (err?.stack) {
    console.error(err.stack);
  }
  process.exit(1);
});
