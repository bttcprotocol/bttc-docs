# Overview


BitTorrent-Chain is a blockchain application platform. If you wish to become a validator by setting up a node for BitTorrent-Chain, or wish to become a delegate to entrust tokens to a validator and receive rewards, you can use this document to get a quick overview.

## PoS, Staking and voting

### Proof of Stake (PoS)

Proof of Stake (PoS) is a class of consensus algorithm for public blockchains that depends on the economic interest of the Validator in the network. In proof-of-work (PoW)-based public blockchains (such as current implementations of Bitcoin and Ether), the algorithm rewards participants who solve cryptographic puzzles to validate transactions and create new blocks (i.e. mining). In a PoS-based public blockchain, a set of super delegates take turns proposing and voting on the next block, with the weight of each Validator vote depending on the size of its deposit (i.e. equity). significant advantages of PoS include security, reduced risk of centralisation and energy efficiency.

For more detailed information, see https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ.

### Staking

Staking is the process of locking tokens into a deposit in order to gain the right to verify and produce blocks on the blockchain. Usually, pledging is done in the network's native token.

### Voting

Voting is the process by which token holders delegate their shares to a Validator. It allows token holders who do not have the skills or desire to run a node to participate in the network and receive a reward proportional to the number of shares voted.

## Architecture

BitTorrent-Chain is a blockchain application platform with an overall structure divided into three layers.

* Root Contracts layer: Root contracts on TRON and other blockchain networks, support for users to map tokens to BitTorrent-Chain by accessing funds, and support for features such as pledges.
* Validator layer: Validates BitTorrent-Chain blocks and regularly sends checkpoints to the supporting TRON and other blockchain networks.

    Bridge: Listens for events on each chain, sends event messages, etc.

    Core: Consensus module, including validation of Checkpoint (snapshot of BitTorrent-Chain state), consensus on Statesync events & Staking events.  

    REST-Server: provides related API services.

* BitTorrent-Chain layer.
