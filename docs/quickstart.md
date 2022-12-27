# Introduction to BTTC 
BitTorrent Chain (referred to as “BTTC” below) is the first scalable heterogeneous cross-chain interoperability protocol on TRON, featuring PoS (Proof of Stake) consensus mechanism and multi-node validation. It supports smart contract extension through sidechains and is compatible with Ethereum-based smart contracts. Together with many other functions it boasts, it enables developers to migrate and develop DApps on the chain without a hitch.

This chapter is an introduction to the BTTC ecosystem guide for developers to understand how to develop on BTTC.
## Key Features of BTTC
* **Speed**:BitTorrent-Chain will solve this problem by using a high-throughput blockchain. A set of block producers will be selected. Proof of Stake will be applied to validate blocks, and proofs of blocks will be periodically sent to TRON main net or other blockchains. This mechanism ensures blocks will be confirmed in an extremely short time.
* **High Throughput**:BitTorrent-Chain solves this problem by using a block producer layer, where block producers are able to produce blocks at a very fast rate.
* **High Scalability**:In the future, BitTorrent-Chain can easily access more public chains while using the same decentralized POS layer to increase scalability.
* **Low Transaction Fees**:The BitTorrent-Chain achieves economies of scale by conducting a large number of transactions at the block producer layer, thus reducing costs and ensuring low transaction costs.

## Developing with BTTC
Tools on the ethereum blockchain are supported out of the box on BTTC. For example, Truffle, Remix and Web3js to name a few. Developers can deploy decentralised applications directly on the BTTC Donau test network or the main network if they have Ethereum development experience.

All details related to the BTTC network can be found here in the [network documentation](/docs/networks/network).
### wallet
BTTC is EVM (Ethereum Virtual Machine) compatible. In order to interact with the BTTC network, developers first need to have an Ethereum-based wallet, either the [Metamask](https://metamask.io/) wallet or another EVM-enabled wallet.
### Smart contracts
Developers can use [Remix](https://remix.ethereum.org/), [Truffle](https://trufflesuite.com/) , [Hardhat](https://hardhat.org/) and other tools to test, compile, debug and deploy decentralised applications to the BTTC network.
### Connecting to BTTC network
Developers can add the BTTC network to [Metamask](https://metamask.io/), which allows developers to connect to the BTTC network using RPC.
> Note:
> Developers can also use the same RPC in web3.js to connect the BTTC network.

```js
// Javascript
const Web3 = require('Web3')
// Sign up for a free dedicated RPC URL at https://rpc.bt.io or other hosted node providers.
const web3 = new Web3('https://rpc.bt.io')
```

### Building a new dApp on BTTC?
If developers are not experienced in building decentralised applications (dApps), here are some links to resources that will give developers a general idea of the tools needed to build, debug and deploy decentralised applications (dApps) to the BTTC network.
* [Demo: Build a dApp on BTTC](/docs/tutorial/build-web3-app)
* [Web3.js](https://web3js.readthedocs.io/en/v1.7.4/)
* [Ethers.js](https://docs.ethers.io/v5/)
* [Remix](https://remix.ethereum.org/)
* [Truffle](https://trufflesuite.com/)
* [Metamask](https://metamask.io/)
 
### Already have a dApp?
BTTC is compatible with EVM, so developers don't have to worry about the underlying architecture. Developers can easily migrate from an Ethereum Virtual Machine (EVM)-based chain to the BTTC network.

