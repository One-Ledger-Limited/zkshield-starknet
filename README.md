# ShieldRegistry - Decentralized Address Blacklist on Starknet

## One-Liner
**ShieldRegistry**: A decentralized address blacklist foundation on Starknet that enables transparent community-driven fraud prevention. Phase 1 of ZK-Shield — a privacy-preserving transaction security layer using zero-knowledge proofs.

---

## Problem Statement

Cryptocurrency fraud is rampant. Scammers continuously create new wallet addresses to steal user funds, and there's no decentralized, trustworthy way for the community to flag and share information about malicious addresses. Existing solutions rely on centralized databases or third-party trust, creating single points of failure and potential censorship risks.

---

## Solution

**ShieldRegistry (Phase 1)** is a decentralized smart contract foundation that provides:

1. **Immutable Flagging System**: Anyone can flag an address with a reason (e.g., "phishing", "fraud", "rug pull")
2. **Permanent On-Chain Storage**: All flagged addresses stored on Starknet Sepolia with full transparency
3. **Real-Time Query Capability**: Instant address verification via CLI tools and browser extension
4. **No Intermediaries**: Data cryptographically verified on-chain, no centralized trust required
5. **Community-Driven Security**: Global community contributes to a shared, transparent security layer

**Future (Phase 2)**: ZK-Shield privacy layer will add zero-knowledge proofs so blacklist contents remain private while users can still verify transaction safety.

---

## Architecture

### **Smart Contract (Cairo)**
- **Language**: Cairo 2.16
- **Network**: Starknet Sepolia Testnet
- **Contract Address**: `0x265158176fd766b5c480d210c34a314e374eb4653703b6c4154f3f1235e2865`
- **Functions**:
  - `flag_address(address, reason)` - Flag an address
  - `is_flagged(address)` - Check if flagged
  - `get_flag_count(address)` - Get flag count
  - `get_flag_reason(address)` - Get flag reason
  - `get_total_flagged()` - Get total flagged addresses

### **Integration Layer**
- **CLI Tools**: `flag-address.js` and `check-address.js` for command-line queries
- **Browser Extension**: Chrome popup UI for real-time verification
- **Starkscan Integration**: Direct links to blockchain explorer for full transparency

---

## Quick Start

### Installation

```bash
cd zkshield-starknet/js-integration
npm install
```

### Configuration

Create `.env`:
```
STARKNET_RPC_URL=https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_9/[key]
DEPLOYER_PRIVATE_KEY=0x...
DEPLOYER_ADDRESS=0x...
CONTRACT_ADDRESS=0x265158176fd766b5c480d210c34a314e374eb4653703b6c4154f3f1235e2865
```

### Usage

**Check if address is flagged:**
```bash
node check-address.js 0x1111111111111111111111111111111111111111
```

**Flag a new address:**
```bash
node flag-address.js 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb "fraud"
```

---

## Demo & Documentation

- **Demo Video**: 3-minute walkthrough showing CLI tools and browser integration
- **Demo Script**: [FINAL_VIDEO_SCRIPT.md](FINAL_VIDEO_SCRIPT.md)
- **Features**: Real-time on-chain queries, Starkscan verification, instant flagging

---

## Technology Stack

- **Smart Contract**: Cairo 2.16
- **Blockchain**: Starknet Sepolia
- **Integration**: starknet.js v9.2.1
- **Browser**: Chrome Extension MV3
- **Runtime**: Node.js

---

## Key Features

- Decentralized - No single point of failure  
- Immutable - Flags cannot be reversed once recorded  
- Transparent - All data verifiable on-chain  
- Gas-Efficient - Optimized Cairo implementation  
- Instant Queries - Real-time address verification  
- Community-Driven - Anyone can contribute reports  

---

## Future Vision

**Phase 1 (Current)**: Foundation - Decentralized flagging system with on-chain transparency
- Direct address queries
- Community-driven blacklist
- Immutable on-chain storage
- Real-time verification via CLI and browser extension

**Phase 2 (ZK-Shield Privacy Layer)**: Privacy-Preserving Verification Engine
- Merkle tree commitment of blacklist on-chain
- Zero-knowledge proofs for address verification
- Blacklist contents remain private - only cryptographic commitments visible
- Backend service generates exclusion proofs on demand
- MetaMask integration with real-time transaction interception
- Automatic alerts before sending crypto to flagged addresses
- Users verify proof validity without exposing blacklist contents

**Phase 3**: DAO Governance & Community Moderation
- Community voting on new address flags
- Dispute resolution mechanism for false positives
- Reputation-weighted voting system
- Transparent audit trail of all decisions

**Multi-Chain Support**: Ethereum, Polygon, Arbitrum integration
- Cross-chain flagging consistency
- Multi-chain MetaMask monitoring
- Unified safety dashboard across ecosystems

---

## Live Contract

**Starknet Sepolia**: https://starkscan.co/contract/0x265158176fd766b5c480d210c34a314e374eb4653703b6c4154f3f1235e2865

---

## Author & Prize Distribution

**Wallet Address**: `0x024AB366E3aB952C8f4A2C89760D619CAbAE1AA1dE6Cd655Bcc775eb7146Ee45`

---

## License

MIT

---

**ShieldRegistry - Making Crypto Safer, One Flag at a Time**
