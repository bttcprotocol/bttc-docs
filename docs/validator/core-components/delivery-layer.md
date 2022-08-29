# Delivery Layer

Delivery is is the proof-of-stake verifier layer, which is responsible for checkpointing the representation of the Bttc layer blocks to the TRON/BSC/Ethereum mainnet. Delivery is based on [Tendermint](https://tendermint.com/).

The staking contract on the TRON mainnet works in conjunction with the Delivery node to act as the trustless stake management mechanism for the PoS engine, including selecting the validator set, updating validators, etc. Since staking is done in the contract on the TRON mainnet, BTTC does not rely only on validator honesty and instead inherits the TRON  mainnet security.

Delivery layer handles the aggregation of blocks produced by Bttc into a Merkle tree and publishes the Merkle root periodically to the TRON/BSC/Ethereum mainnet. This periodic publishing is called *checkpointing*.

For every few blocks on Bttc, a validator (on the Delivery layer):

1. Validates all the blocks since the last checkpoint.
2. Creates a Merkle tree of the block hashes.
3. Publishes the Merkle root to the TRON/BSC/Ethereum mainnet.

Checkpoints are important for two reasons:

1. Providing finality on the root chain.
2. Providing proof of burn in withdrawal of assets.

An overview of the process:
- A subset of active validators from the pool are selected to act as block producers for a span. The Selection of each span will also be consented by at least 2/3 in power. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
- A checkpoint includes the root of all blocks created during any given interval. All nodes validate the same and attach their signature to it.
- A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain.
- The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.

