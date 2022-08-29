# 快速入门
BitTorrent Chain（以下简称BTTC）是波场首个异构链跨链互操作扩容协议，采用POS（Proof of Stake）机制，部署多节点验证 ，通过侧链进行智能合约的扩展，兼容Ethereum链架构的智能合约及其他功能，开发者可以在链上轻松完成DAPP迁移或开发。
 
本章节是通过介绍BTTC生态系统指南，让开发者了解如何在BTTC上进行开发。
## BTTC主要特点
* **交易速度快**：BTTC选定一组生产者并使用Proof Of Stake机制来验证区块，同时将区块周期性证明发布到TRON主链及其他支持的区块链主链，确保了极短的区块确认时间。
* **高吞吐量**：BTTC通过使用区块生产者层来解决这个问题，因为区块生产者能够以非常快的速度生产区块，所以网络拥有非常高的吞吐量。
* **高扩展性**：BTTC能够在使用相同的去中心化POS层的情况下，轻松的接入更多主链，用以提高BTTC的可扩展性。
* **低交易费用**：BTTC通过在区块生产者层进行大量的交易来实现规模经济，从而降低成本，确保交易的低成本。

## 在BTTC网络上开发
以太坊区块链上的工具都在BTTC上得到了开箱即用的支持。例如，Truffle、Remix和Web3js等等。如果开发者有Ethereum开发经验，则开发者可以直接在BTTC Donau测试网络或主网络上部署去中心化的应用程序。

可以在这里的[网络文档](/docs/networks/network)中找到所有与BTTC网络相关的细节。
### 部署到BTTC网络
#### Wallet
BTTC兼容EVM（Ethereum虚拟机），为了与BTTC网络互动，开发者首先需要有一个基于Ethereum的钱包，可以选择[Metamask](https://metamask.io/)钱包或其他支持EVM的钱包。
#### 智能合约
开发者可以通过[Remix](https://remix.ethereum.org/)、[Truffle](https://trufflesuite.com/)、[Hardhat](https://hardhat.org/)等工具来测试、编译、调试和部署去中心化的应用程序到BTTC网络。
#### 链接到BTTC网络
开发者可以将BTTC网络添加到[Metamask](https://metamask.io/)，它允许开发者使用RPC连接到BTTC网络。

```js
// Javascript
const Web3 = require('Web3')
// Sign up for a free dedicated RPC URL at https://rpc.bt.io or other hosted node providers.
const web3 = new Web3('https://rpc.bt.io')
```

### 在BTTC上开发一个新的dApp
如果开发者没有构建去中心化应用程序（dApps）的经验，下面是一些资源链接，可以让开发者对构建、调试和部署去中心化应用程序（dApps）到BTTC网络所需的工具有大概了解。
* [Demo: Build a dApp on BTTC](/docs/build-web3-app)
* [Web3.js](https://web3js.readthedocs.io/en/v1.7.4/)
* [Ethers.js](https://docs.ethers.io/v5/)
* [Remix](https://remix.ethereum.org/)
* [Truffle](https://trufflesuite.com/)
* [Metamask](https://metamask.io/)
 
### 将已有dApp迁移至BTTC网络
BTTC与EVM兼容，因此开发者不必担心底层架构。开发者可以轻松的从基于Ethereum虚拟机（EVM）的链上迁移至BTTC网络。
