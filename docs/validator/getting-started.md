# Validator Overview

Validators are the key actor in maintaining the BTTC network. Validators run a full node and secure 
the network by staking BTT to produce blocks, validate and participate in PoS consensus.

:::info

There is limited space for accepting new validators. New validators can only join the active set when a currently active validator unbonds.

A new auction process for validator replacement will be rolled out.

:::


BTTCn consists of the three following layers:

* Staking smart contracts layer — a set of contracts on the TRON mainnet.
* Delivery layer — a set of proof-of-stake Delivery nodes running in parallel to the TRON mainnet, monitoring the set of staking contracts deployed on the TRON mainnet, and committing the BTTC Network checkpoints to the TRON mainnet. Delivery is based on Tendermint.
* Bttc layer — a set of block-producing Bttc nodes shuffled by Delivery nodes. Bttc is based on Go Ethereum.

To be a validator on the TRON Network, you must run:

* Sentry node — a separate machine running a Delivery node and a Bttc node. A sentry node is open to all nodes on the TRON Network.
* Validator node — a separate machine running a Delivery node and a Bttc node. A validator node receives the data from and the sends the data to the sentry node.
* Stake the BTT tokens in the staking contracts deployed on the TRON mainnet.

This section guides you through the following topics:

* [Validator responsibilities](/docs/validator/responsibilities)
* [Start and run the validator node](/docs/node/build-validator-node)
* [Rewards](/docs/validator/rewards)
* [Change the commission](/docs/validator/validator-commission-operations)
