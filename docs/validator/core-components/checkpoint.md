# Checkpoint Mechanism

:::info BTTC is not a Layer 1 platform

BTTC depends on the TRON Mainnet as its Layer 1 Settlement Layer.
All staking mechanics need to be in sync with the contracts on the TRON mainnet.

:::

Proposers for a checkpoint are initially selected via Tendermint’s weighted [round-robin algorithm](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html). A further custom check is implemented based on the checkpoint submission success. This allows the BTTC system to decouple with Tendermint proposer selection and provides BTTC with the abilities like selecting a proposer only when the checkpoint transaction on the TRON mainnet succeeds or submitting a checkpoint transaction for the blocks belonging to previous failed checkpoints.

Successfully submitting a checkpoint on Tendermint is a 2-phase commit process:

* A proposer, selected via the round-robin algorithm, sends a checkpoint with the proposer's address and the Merkle hash in the proposer field.
* All other proposers validate the data in the proposer field before adding the Merkle hash in their state.

The next proposer then sends an acknowledgment transaction to prove that the previous checkpoint transaction has succeeded on the TRON mainnet. Every validator set change is relayed by the validator nodes on Delivery which is embedded onto the validator node. This allows Delivery to remain in sync with the BTTC contract state on the TRON mainnet at all times.

The BTTC contract deployed on the TRON/BSC/Ethereum  mainnet is considered to be the ultimate source of truth, and therefore all validation is done via querying the TRON/BSC/Ethereum mainnet contract.
