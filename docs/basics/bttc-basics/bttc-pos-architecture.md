import useBaseUrl from '@docusaurus/useBaseUrl';

# BTTC PoS Architecture

BTTC Network is a blockchain application platform that provides Proof-of-Stake sidechains.

Architecturally, the beauty of BTTC is its elegant design, which features a generic validation layer separated from varying execution environments like full-blown EVM sidechains.

To enable the PoS mechanism on our platform, a set of **staking** management contracts are deployed on TRON, as well as a set of incentivized validators running **Deivery** and **Bttc** nodes. TRON/BSC/Ethereum are the first basechains BTTC supports, but BTTC intends to offer support for additional basechains, based on community suggestions and consensus, to enable an interoperable decentralized Layer 2 blockchain platform.

BTTC PoS has a three-layer architecture:

1. Staking smart contracts on TRON
2. Delivery (Proof of Stake layer)
3. Bttc (Block producer layer)


## BTTC smart contracts (on TRON)

BTTC maintains a set of smart contracts on Ethereum, which handle the following:

- Staking management for the Proof-of-Stake layer
- Delegation management including validator shares
- Checkpoints/snapshots of sidechain state

## Delivery (Proof-of-Stake validator layer)

**Delivery** is the PoS validator node that works in consonance with the Staking contracts on TRON to enable the PoS mechanism on BTTC. We have implemented this by building on top of the Tendermint consensus engine with changes to the signature scheme and various data structures. It is responsible for block validation, block producer committee selection, checkpointing a representation of the sidechain blocks to TRON/BSC/Ethereum in our architecture and various other responsibilities.

Delivery layer handles the aggregation of blocks produced by Bttc into a merkle tree and publishing the merkle root periodically to the root chain. This periodic publishing are called `checkpoints`. For every few blocks on Bttc, a validator (on the Delivery layer):

1. Validates all the blocks since the last checkpoint
2. Creates a merkle tree of the block hashes
3. Publishes the merkle root to the main chain

Checkpoints are important for two reasons:

1. Providing finality on the Root Chain
2. Providing proof of burn in withdrawal of assets

A bird’s eye view of the process can be explained as:

- A subset of active validators from the pool are selected to act as block producers for a span. The Selection of each span will also be consented by at least 2/3 in power. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
- A checkpoint includes the root of all blocks created during any given interval. All nodes validate the same and attach their signature to it.
- A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain.
- The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.

## Bttc (Block Producer Layer)

Bttc is BTTC block producer layer - the entity responsible for aggregating transactions into blocks.

Block producers are periodically shuffled via committee selection on Delivery in durations termed as a `span` in BTTC. Blocks are produced at the **Bttc** node and the sidechain VM is EVM-compatible. Blocks produced on Bttc are also validated periodically by Delivery nodes, and a checkpoint consisting of the Merkle tree hash of a set of blocks on Bttc is committed to TRON/BSC/Ethereum periodically.


