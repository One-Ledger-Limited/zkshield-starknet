# ShieldRegistry - Demo Script (3 Minutes)
## Starknet Re{define} Hackathon Submission

---

## **TIMING BREAKDOWN:**
- **0:00-0:20** — Introduction & Project Overview
- **0:20-1:30** — CLI Tool Demonstrations  
- **1:30-2:30** — Browser Extension Popup
- **2:30-3:00** — Conclusion & Contract Details

---

## **SCRIPT (Word-for-Word For Recording)**

### **[0:00-0:20] INTRODUCTION**

*[Face to camera, speak clearly]*

> "Hi, I'm [Your Name], and I'm presenting ShieldRegistry — a decentralized address blacklist powered by Starknet.
> 
> The problem: Scammers use fake addresses to steal crypto. Users have no way to verify if an address is safe.
> 
> My solution: A permanent, on-chain registry where anyone can flag dangerous addresses. Because it's on Starknet, it's transparent, immutable, and trustless.
> 
> Let me show you how it works."

---

### **[0:20-1:30] CLI TOOL DEMO**

*[Open PowerShell terminal, navigate to the project]*

```bash
cd D:\One-Ledger\zkshield-starknet\js-integration
```

---

#### **DEMO 1: Check a Flagged Address**

*[Narrate while typing slowly]*

> "First, let's check if an address is flagged. I'll query the Starknet contract for this address."

```bash
node check-address.js 0x1111111111111111111111111111111111111111
```

*[Wait for output, read it aloud]*

**Expected Output:**
```
📋 Checking address: 0x1111111111111111111111111111111111111111
✅ Is Flagged: true
🚩 Flag Count: 1
📝 Flag Reason: scam
```

*[Narrate the result]*

> "See? This address is flagged as 'scam'. The data comes directly from the Starknet blockchain."

---

#### **DEMO 2: Check a Safe Address**

*[Narrate]*

> "Now let's check a different address that hasn't been flagged."

```bash
node check-address.js 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

**Expected Output:**
```
📋 Checking address: 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
✅ Is Flagged: false
🚩 Flag Count: 0
📝 Flag Reason: N/A
```

*[Narrate]*

> "This address is safe — it's not flagged. Compare the difference: one is verified safe, the other is a known scam."

---

#### **DEMO 3: Flag a New Address Live**

*[Narrate]*

> "Now I'll demonstrate flagging a malicious address to the blockchain in real-time."

```bash
node flag-address.js 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb "fraud"
```

**Expected Output:**
```
🚀 Submitting flag transaction...
⏳ Waiting for confirmation...
✅ Transaction confirmed!
📝 Address flagged: 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
💬 Reason: fraud
⛓️  Tx Hash: 0x[...transaction_hash...]
```

*[Narrate]*

> "The transaction is confirmed on Starknet. The address is now permanently flagged as 'fraud'."

---

#### **DEMO 4: Verify the Flag Exists**

*[Narrate]*

> "Let's verify that the flag was actually saved on-chain by querying the contract again."

```bash
node check-address.js 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
```

**Expected Output:**
```
📋 Checking address: 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
✅ Is Flagged: true
🚩 Flag Count: 1
📝 Flag Reason: fraud
```

*[Narrate]*

> "Perfect! The flag is now on-chain. Any user anywhere in the world can check this address and see it's flagged for fraud. That's the power of a decentralized, immutable registry."

---

### **[1:30-2:30] BROWSER EXTENSION DEMO**

*[Switch to browser with Chrome open]*

*[Narrate]*

> "I've also integrated ShieldRegistry into a Chrome extension for real-world usability. Users can check addresses while browsing."

*[Click on ShieldTrade extension icon in Chrome]*

> "Let me check a flagged address right here in the browser."

*[In the popup, paste address into input box]:*

```
0x1111111111111111111111111111111111111111
```

*[Click "Check" button]*

*[Wait for result, read aloud]*

> "The extension queries the Starknet contract and shows the result instantly. Flagged status, flag count, and the reason — all from on-chain data."

*[Show the result on screen for 5 seconds]*

*[Optionally click a Starkscan link button]*

> "Users can also click the link to view the contract on Starkscan, the Starknet block explorer. Complete transparency."

---

### **[2:30-3:00] CONCLUSION & TECHNICAL DETAILS**

*[Face to camera again]*

> "ShieldRegistry is live on Starknet Sepolia testnet. 
> 
> **Smart Contract Address:** 0x265158176fd766b5c480d210c34a314e374eb4653703b6c4154f3f1235e2865
> 
> **Technology Stack:**
> - Cairo 2.16 smart contract
> - Starknet.js v9.2.1 for on-chain interactions
> - Deployed to Starknet Sepolia testnet
> - Gas-efficient, immutable design
> 
> **Source Code:** [GitHub Repo Link]
> 
> Thank you for watching. This is a decentralized, community-driven approach to crypto security."

*[End with a smile]*

---

## **CANTONESE VERSION (Optional - Use if presenting to Cantonese audience)**

### **[0:00-0:20] 介紹**

> "大家好，我係 [你的名字]，今日介紹 ShieldRegistry —— 一個 Starknet 上面嘅去中心化黑名單系統。
> 
> 問題係：詐騙份子用假錢包地址偷取加密貨幣。用戶冇辦法驗證一個地址係咪安全。
> 
> 我嘅解決方案：一個永久上鏈嘅黑名單。任何人都可以標記危險地址。因為係上 Starknet，所以係透明、唔可以改、冇人控制。
> 
> 讓我示範一下點樣使用。"

### **[0:20-1:30] CLI 工具演示**

*[Follow the English CLI demo steps above - same commands]*

#### **演示 1：檢查被標記嘅地址**

> "首先，我查詢一個被標記嘅地址。"

```bash
node check-address.js 0x1111111111111111111111111111111111111111
```

> "睇到未？呢個地址被標記為『詐騙』。個數據直接嚟自 Starknet 區塊鏈。"

#### **演示 2：檢查安全地址**

> "而家查詢一個冇被標記嘅地址。"

```bash
node check-address.js 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

> "呢個地址係安全。冇被標記。兩個對比：一個係已驗證安全，一個係已知詐騙。"

#### **演示 3：實時標記一個新地址**

> "而家我示範點樣將一個惡意地址標記到區塊鏈上。"

```bash
node flag-address.js 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb "fraud"
```

> "交易已確認！呢個地址而家被永久標記為『詐騙』喇。"

#### **演示 4：驗證標記已保存**

> "再查一次，確認個標記真係上鏈咗。"

```bash
node check-address.js 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
```

> "完美！個地址而家係被標記狀態。全世界任何人都可以查到佢係詐騙。呢個就係去中心化黑名單嘅威力。"

### **[1:30-2:30] 瀏覽器外掛示範**

> "我仲將 ShieldRegistry 整合到 Chrome 外掛，令用戶可以直接喺瀏覽器度檢查地址。"

*[打開外掛，貼入地址]*

> "外掛即時查詢 Starknet Contract，顯示結果。被標記狀態、次數、原因 —— 所有數據都係嚟自區塊鏈。"

### **[2:30-3:00] 總結**

> "ShieldRegistry 已經喺 Starknet Sepolia 上線。
> 
> **Smart Contract 地址：** 0x265158176fd766b5c480d210c34a314e374eb4653703b6c4154f3f1235e2865
> 
> **技術堆疊：**
> - Cairo 2.16 Smart Contract
> - Starknet.js v9.2.1
> - 部署喺 Starknet Sepolia
> - 省 Gas、冧唔爛設計
> 
> **源代碼：** [GitHub Repo Link]
> 
> 多謝睇我嘅演示。呢個係去中心化、社區驅動嘅加密貨幣安全方案。"

---

## **TIPS FOR RECORDING:**

✅ **Speak slowly and clearly** — viewers should understand every word  
✅ **Show screen output fully** — make sure each command result is visible for 3-5 seconds  
✅ **Pause between demos** — let each result sink in before moving to the next demo  
✅ **Use screen recording software** — OBS, Camtasia, or Windows 11 built-in tool  
✅ **Edit out long waits** — if transactions take >5 seconds, speed up that part 2x  
✅ **Add captions** — especially for terminal output (help viewers follow along)  
✅ **Intro music** — optional but makes it more professional (YouTube Audio Library has free music)  

---

## **FILE CHECKLIST BEFORE RECORDING:**

- [ ] `.env` file has correct `CONTRACT_ADDRESS` and `RPC_URL`
- [ ] `starknet-check.js` in both `js-integration/` and `shieldtrade-risk/`
- [ ] Test commands work in PowerShell terminal first
- [ ] Ready Wallet is set to Starknet Sepolia network
- [ ] Chrome extension is loaded and popup works
- [ ] Have a link to your GitHub repo ready

---

**Good luck with your recording! You've got this! 🚀**
