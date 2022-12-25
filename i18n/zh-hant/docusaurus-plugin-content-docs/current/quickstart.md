# 快速入門
BitTorrent Chain（以下簡稱BTTC）是波場首個異構鏈跨鏈互操作擴容協議，采用POS（Proof of Stake）機制，部署多節點驗證 ，通過側鏈進行智能合約的擴展，兼容Ethereum鏈架構的智能合約及其他功能，開發者可以在鏈上輕松完成DAPP遷移或開發。
 
本章節是通過介紹BTTC生態系統指南，讓開發者了解如何在BTTC上進行開發。
## BTTC主要特點
* **交易速度快**：BTTC選定一組生產者並使用Proof Of Stake機制來驗證區塊，同時將區塊周期性證明發布到TRON主鏈及其他支持的區塊鏈主鏈，確保了極短的區塊確認時間。
* **高吞吐量**：BTTC通過使用區塊生產者層來解決這個問題，因為區塊生產者能夠以非常快的速度生產區塊，所以網絡擁有非常高的吞吐量。
* **高擴展性**：BTTC能夠在使用相同的去中心化POS層的情況下，輕松的接入更多主鏈，用以提高BTTC的可擴展性。
* **低交易費用**：BTTC通過在區塊生產者層進行大量的交易來實現規模經濟，從而降低成本，確保交易的低成本。

## 在BTTC網絡上開發
以太坊區塊鏈上的工具都在BTTC上得到了開箱即用的支持。例如，Truffle、Remix和Web3js等等。如果開發者有Ethereum開發經驗，則開發者可以直接在BTTC Donau測試網絡或主網絡上部署去中心化的應用程序。

可以在這里的[網絡文檔](/docs/networks/network)中找到所有與BTTC網絡相關的細節。
### 部署到BTTC網絡
#### Wallet
BTTC兼容EVM（Ethereum虛擬機），為了與BTTC網絡互動，開發者首先需要有一個基於Ethereum的錢包，可以選擇[Metamask](https://metamask.io/)錢包或其他支持EVM的錢包。
#### 智能合約
開發者可以通過[Remix](https://remix.ethereum.org/)、[Truffle](https://trufflesuite.com/)、[Hardhat](https://hardhat.org/)等工具來測試、編譯、調試和部署去中心化的應用程序到BTTC網絡。
#### 鏈接到BTTC網絡
開發者可以將BTTC網絡添加到[Metamask](https://metamask.io/)，它允許開發者使用RPC連接到BTTC網絡。

```js
// Javascript
const Web3 = require('Web3')
// Sign up for a free dedicated RPC URL at https://rpc.bt.io or other hosted node providers.
const web3 = new Web3('https://rpc.bt.io')
```

### 在BTTC上開發一個新的dApp
如果開發者沒有構建去中心化應用程序（dApps）的經驗，下面是一些資源鏈接，可以讓開發者對構建、調試和部署去中心化應用程序（dApps）到BTTC網絡所需的工具有大概了解。
* [Demo: Build a dApp on BTTC](/docs/build-web3-app)
* [Web3.js](https://web3js.readthedocs.io/en/v1.7.4/)
* [Ethers.js](https://docs.ethers.io/v5/)
* [Remix](https://remix.ethereum.org/)
* [Truffle](https://trufflesuite.com/)
* [Metamask](https://metamask.io/)
 
### 將已有dApp遷移至BTTC網絡
BTTC與EVM兼容，因此開發者不必擔心底層架構。開發者可以輕松的從基於Ethereum虛擬機（EVM）的鏈上遷移至BTTC網絡。
