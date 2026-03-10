# ShieldRegistry - Final Video Script (3 Minutes)
## Complete Narration for Canva Subtitles

---

## **[0:00-0:20] INTRODUCTION**

**Subtitle:**
```
Hi, I'm [Your Name]
Presenting: ShieldRegistry
A decentralized address blacklist on Starknet
```

**Narration (speak to camera):**
> "Hi, I'm [Your Name]. I'm presenting ShieldRegistry — a decentralized address blacklist powered by Starknet blockchain.

> The problem: Crypto scammers use fake addresses to steal funds. Users have no way to verify if an address is safe before sending money.

> My solution: A permanent, transparent registry on Starknet where anyone can flag dangerous addresses. Because it's on-chain, it's immutable, trustless, and accessible to everyone.

> Let me show you how it works."

---

## **[0:20-1:30] TERMINAL DEMO - CLI TOOLS**

### **Demo 1: Check a Flagged Address (0:20-0:35)**

**Subtitle:**
```
Demo 1: Querying the Starknet Contract
Checking if an address is flagged on-chain
```

**Terminal Command:**
```bash
node check-address.js 0x1111111111111111111111111111111111111111
```

**Narration:**
> "First, let me query the Starknet contract to check if an address is flagged.

> I'm using a command-line tool that connects directly to the blockchain and calls the smart contract.

> [Wait for output to show]

> Here you can see: the address is flagged as 'scam'. This data is stored permanently on Starknet."

---

### **Demo 2: Check a Safe Address (0:35-0:50)**

**Subtitle:**
```
Demo 2: Checking a Safe Address
This address has no flags on-chain
```

**Terminal Command:**
```bash
node check-address.js 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

**Narration:**
> "Now let me check a different address that hasn't been flagged.

> [Wait for output]

> This address shows as 'Not flagged' — it's safe to interact with.

> The key feature: users can query ANY address at any time, and the data is always current."

---

### **Demo 3: Flag a Malicious Address LIVE (0:50-1:10)**

**Subtitle:**
```
Demo 3: Flagging a New Address
Submitting transaction to Starknet blockchain
```

**Terminal Command:**
```bash
node flag-address.js 0xcccccccccccccccccccccccccccccccccccccccc "malicious"
```

**Narration:**
> "Now I'll demonstrate flagging a brand-new address live on the blockchain.

> I'm submitting a transaction to the Starknet contract, marking this address as 'malicious'.

> [Wait for output]

> See the confirmation? The transaction is now on-chain. It's permanent, immutable, and viewable by anyone."

---

### **Demo 4: Verify It Was Saved (1:10-1:30)**

**Subtitle:**
```
Demo 4: Instant Verification
The flag is now queryable on-chain
```

**Terminal Command:**
```bash
node check-address.js 0xcccccccccccccccccccccccccccccccccccccccc
```

**Narration:**
> "Let me verify it was saved. I'll query the contract again for the same address.

> [Wait for output]

> Notice: it now shows as flagged with my exact reason 'malicious'. This proves the data is live on Starknet.

> The full cycle: flag → confirm on-chain → instantly queryable. That's the power of decentralized security."

---

## **[1:30-2:30] BROWSER EXTENSION DEMO**

**Subtitle:**
```
Real-World Integration: Chrome Extension
Users can verify addresses directly in the browser
```

**Narration:**
> "In a real-world scenario, MetaMask would automatically detect transactions and warn users before they send crypto.

> For this demo, I'll show you a simplified manual check in our Chrome extension.

> [Show opening extension popup]

> This is ShieldTrade, integrated with ShieldRegistry. Let me paste a flagged address and check it."

### **Step 1: Check Flagged Address (1:35-1:50)**

**Subtitle:**
```
or this demo, I'll show you a simplified manual check in our Chrome extension.
```

**Narration:**
> "I'm pasting the flagged address here... and clicking the check button.

> [Wait for result to load]

> Instantly, the extension queries the Starknet contract and shows: this address is FLAGGED for 'scam'.

> The user can then click to view the contract on Starkscan for full transparency."

### **Step 2: Check Safe Address (1:50-2:10)**

**Subtitle:**
```
Checking a safe address
Extension confirms it is NOT flagged
```

**Narration:**
> "Let me check a safe address to show the other scenario.

> [Paste safe address]

> [Wait for result]

> See? The extension shows this address is safe — no flags on-chain. Users can proceed with confidence."

### **Step 3: View Contract (2:10-2:30)**

**Subtitle:**
```
Viewing the contract on Starkscan
All on-chain data is transparent and permanent
```

**Narration:**
> "Users can click through to the actual smart contract on Starkscan, the Starknet block explorer.

> All data is transparent, immutable, and queryable. No trust required — it's code-verified security.

> That's the advantage of decentralized solutions."

---

## **[2:30-3:00] CONCLUSION & TECHNICAL DETAILS**

**Subtitle:**
```
ShieldRegistry: Decentralized Address Security

Contract: 0x265158176fd766b5c480d210c34a314e374eb4653703b6c4154f3f1235e2865
Tech: Cairo 2.16 + Starknet.js
Deployed: Starknet Sepolia Testnet

GitHub: [Your Repo Link]
```

**Narration (speak to camera):**
> "ShieldRegistry is live and working on Starknet Sepolia testnet.

> **Technology:**
> - Smart contract written in Cairo 2.16
> - Deployed to Starknet Sepolia for testing
> - Starknet.js v9.2.1 for on-chain interactions
> - Gas-efficient, immutable design

> **What's included:**
> - Decentralized flagging system
> - CLI tools for querying contracts
> - Chrome extension proof-of-concept

> **Future vision:** Full real-time monitoring where the extension automatically warns users about flagged addresses during transactions.

> The source code is available on GitHub. This is a community-driven approach to crypto security — transparent, trustless, and decentralized.

> Thank you for watching. I hope ShieldRegistry can help make crypto safer for everyone."

*[Show GitHub link on screen or as final subtitle]*

---

## **CANVA SUBTITLE TIMING REFERENCE**

Copy-paste these exact timings into Canva:

| Start | End | Subtitle |
|-------|-----|----------|
| 0:00 | 0:20 | Hi, I'm [Your Name] / Presenting: ShieldRegistry / A decentralized address blacklist on Starknet |
| 0:20 | 0:35 | Demo 1: Querying the Starknet Contract / Checking if an address is flagged on-chain |
| 0:35 | 0:50 | Demo 2: Checking a Safe Address / This address has no flags on-chain |
| 0:50 | 1:10 | Demo 3: Flagging a New Address / Submitting transaction to Starknet blockchain |
| 1:10 | 1:30 | Demo 4: Instant Verification / The flag is now queryable on-chain |
| 1:30 | 1:50 | Real-World Integration: Chrome Extension / Pasting flagged address / Clicking "Verify On-Chain" |
| 1:50 | 2:10 | Checking a safe address / Extension confirms it is NOT flagged |
| 2:10 | 2:30 | Viewing the contract on Starkscan / All on-chain data is transparent and permanent |
| 2:30 | 3:00 | ShieldRegistry: Decentralized Address Security / Contract: 0x265158... / Tech: Cairo 2.16 + Starknet.js / Deployed: Starknet Sepolia / GitHub: [Your Repo] |

---

## **RECORDING NOTES:**

✅ **Speak clearly and slowly** — viewers should understand every word  
✅ **Pause between sections** — let information sink in  
✅ **Show output for 3-5 seconds** — give people time to read terminal output  
✅ **Zoom into terminal** — make addresses and "Flagged" status visible  
✅ **Zoom into extension** — buttons and results should be clear  
✅ **Use cursor/pointer** — highlight what you're clicking  

---

## **FINAL CHECKLIST BEFORE SUBMITTING:**

- [ ] Video recorded with clear audio narration
- [ ] All terminal commands visible and readable
- [ ] Extension popup clearly shows results
- [ ] Subtitles match narration timing
- [ ] Video exported as MP4 (HD if possible)
- [ ] Named: `ShieldRegistry-Demo.mp4`
- [ ] Backed up (save 2 copies!)
- [ ] GitHub repo public with code
- [ ] 500-word README ready
- [ ] Wallet address ready: `0x024AB366E3aB952C8f4A2C89760D619CAbAE1AA1dE6Cd655Bcc775eb7146Ee45`

---

**You're ready to submit! 🚀**
