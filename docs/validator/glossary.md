# Glossary

## Block producer

A block producer is an active [validator](#validator) selected to act as block producer for a [span](#span).

A block producer is responsible for creating blocks and broadcasting the created blocks to the network.


## Checkpoint transaction

A checkpoint transaction is a transaction containing the Merkle root of blocks of the [Bttc](#bttc) layer between the checkpoint intervals.

The transaction is committed to the BTTC staking contracts on the TRON/BSC/Ethereum mainnet by a [Delivery](#delivery) node.

## Commission

A commission is the percentage of the rewards taken by [validators](#validator) from the [delegators](#delegator) who stake with the validators.

## Delegator

The delegator role stakes the BTT tokens to secure the BTTC Network with existing [validators](#validator) without running the nodes themselves.

## Full node

A full node is a fully synced [sentry node](#sentry) running both [Delivery](#Delivery) and [Bttc](#bttc).

See also [Full Node Deployment](/docs/node/build-fullnode).

## Sentry

A sentry node is a node running both the [Delivery](#delivery) node and the [Bttc](#bttc) node to download the data from other nodes on the network and to propagate the [validator](#validator) data on the network.

A sentry node is open to all other sentry nodes on the network.


## Delivery

A Delivery node is a node running in parallel to the TRON/BSC/Ethereum mainnet, monitoring the set of contracts deployed on the TRON/BSC/Ethereum mainnet, and committing the BTTC Network [checkpoints](#checkpoint-transaction) to the TRON/BSC/Ethereum mainnet.

Delivery is based on [Tendermint](https://tendermint.com/).

## Bttc

A Bttc node is a node producing blocks on the BTTC Network.

Bttc is based on [Go Ethereum](https://geth.ethereum.org/).

## Owner address

An owner address is the address used to stake, restake, change the signer address, withdraw rewards and manage delegation related parameters on the TRON mainnet.

While the [signer key](#signer-address) is kept on the node and is considered a *hot* wallet, the owner key must be kept very secure, used infrequently, and is considered a *cold* wallet.

## Signer address

A signer address is the address of an TRON account of the [Delivery](#delivery) validator node. The signer address signs and submits the [checkpoint transactions](#checkpoint-transaction).

While the signer key is kept on the node and is considered a *hot* wallet, the [owner key](#owner-address) must be kept very secure, used infrequently, and is considered a *cold* wallet.


## Proposer

A proposer is the [validator](#validator) selected by the algorithm to propose a new block.

A proposer is also responsible for collecting all signatures for a particular [checkpoint](#checkpoint-transaction) and committing the checkpoint to the TRON mainnet.


## Span

A logically defined set of blocks for which a set of validators is chosen from all the available [validators](#validator).

The selection of each span is decided by at least 2/3 of the validators in terms of the staking power.


## Staking

Staking is the process of locking up tokens into a deposit to earn the right to validate and produce blocks on a blockchain. Typically staking is done in the native token for the network — for the BTT token is locked up by validators/stakers in the BTTC Network. Other examples include MATIC in Polygon, ETH in ETH 2.0, ATOM in Cosmos, etc.


## Validator

The validator role stakes the BTT tokens and is running both the [Delivery](#delivery) node and the [Bttc](#bttc) node to commit the network checkpoints to the TRON/BSC/Ethereum mainnet and to produce blocks on the network.

A validator node is only open to its [sentry](#sentry) node and closed to the rest of the network.

