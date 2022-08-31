# Who is Validator?

A validator is a participant in the network who locks up BTT tokens in the system and runs Delivery validator and Bttc block producer nodes in order to help run the network. Validators stake their BTT tokens as collateral to work for the security of the network and in exchange for their service, earn rewards.

Rewards are distributed to all stakers proportional to their stake at every checkpoint with the exception being the proposer getting an additional bonus. User reward balance gets updated in the contract which is referred to while claiming rewards.

Stakes are at risk of getting slashed in case the validator node commits a malicious act like double signing which also affects the linked delegators at that checkpoint.


## Overview

Validators on the BTTC network are selected through an on-chain auction process which happens at regular intervals. These selected validators participate as block producers and verifiers. Once a checkpoint is validated by the participants, updates are made on the parent chain (the TRON mainnet) which releases the rewards for validators depending on their stake in network.

BTTC relies on a set of validators to secure the network. The role of validators is to run a full node, produce blocks, validate and participate in consensus, and commit checkpoints on the TRON/BSC/Ethereum mainnet. To become a validator, one needs to stake their BTT tokens with staking management contracts residing on the TRON mainnet.

## Core compenents

Delivery reads the events emitted by the staking contracts to pick the validators for the current set with their updated stake ratio, which is used also by Bttc while producing blocks.

Delegation is also recorded in the staking contracts and any update in the validator power or node signer address or unbonding requests comes into effect when the next checkpoint gets committed.


## End-to-end flow for a BTTC validator

Validators set up their signing nodes, sync data and then stake their tokens on the TRON mainnet staking contracts to be accepted as a validator in the current set. If a slot is vacant, the validator is accepted immediately. Otherwise, one needs to go through the replacement mechanism to get a slot.

:::note
There is limited space for accepting new validators. New validators can only join the active set when a currently active validator unbonds. A new auction process for validator replacement will be rolled out.
:::

Block producers are chosen from the validator set where it is the responsibility of the selected validators to produce blocks for a given span.

Nodes at Delivery validate the blocks being produced, participate in consensus and commit checkpoints on the TRON/BSC/Ethereum mainnet at defined intervals.

The probability of validators to get selected as the block producer or checkpoint proposer is dependent on one’s stake ratio including delegations in the overall pool.

Validators receive rewards at every checkpoint as per their stake ratio, after deducting the proposer bonus which is disbursed to the checkpoint proposer.

One can opt out of the system at any time and can withdraw tokens once the unbonding period ends.

## Economics

See [Rewards](/docs/validator/rewards).

## Setting up a validator node

See [Validator Node Deployment](/docs/validator/build-validator-node).
