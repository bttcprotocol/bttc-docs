# Validator Responsibilities

A blockchain validator is someone who is responsible for validating transactions within a blockchain. On the BTTC Network, any participant can be qualified to become a BTTC's validator by running a full node to earn rewards and collect transaction fees. To ensure the good participation by validators, they lock up at least 1 BTT token as a stake in the ecosystem.

## Responsibilities

Any validator on the BTTC Network has the following responsibilities:

* Technical node operations done by the nodes:
  * Maintain high uptime.
  * Check daily the node related services and processes.
  * Run node monitoring.
  * Keep ETH balance on the signer address.
* Delegation:
  * Be open to delegation.
  * Communicate commission rates.
* Communication:
  * Communicate issues.
  * Provide feedback and suggestions.
* Stake network tokens and run validator nodes to join the system as a validator.
* Earn staking rewards for validating state transitions on the blockchain.
* Subject to penalties/slashing for activities such as double signing, validator downtime, etc.

### Technical node operations

The following technical node operations are done automatically by the nodes:

* Block producer selection:
  * Select a subset of validators for the block producer set for each span.
  * For each span, select the block producer set again on Delivery and transmit the selection information to Bttc periodically.
* Validating blocks on Bttc:
  * For a set of Bttc sidechain blocks, each validator independently reads block data for these blocks and validates the data on Delivery
* Checkpoint submission:
  * A proposer is chosen among the validators for each Delivery block. The checkpoint proposer creates the checkpoint of Bttc block data, validates, and broadcasts the signed transaction for other validators to consent to.
  * If >2/3 of the active validators reach consensus on the checkpoint, the checkpoint submitted to the TRON/BSC/Ethereum mainnet.
* Sync changes to BTTC staking contracts on TRON:
  * Continuing from the checkpoint submission step, since this is an external network call, the checkpoint transaction on TRON/BSC/Ethereum may or may not be confirmed, or may be pending due to TRON/BSC/Ethereum congestion issues.
  * In this case, there is an `ack/no-ack` process that is followed to ensure that the next checkpoint contains a snapshot of the previous Bttc blocks as well. For example, if checkpoint 1 is for Bttc blocks 1-256, and it failed for some reason, the next checkpoint 2 will be for Bttc blocks 1-512. 
* State sync from the TRON mainnet to the Bttc sidechain:
  * Contract state can be moved between TRON and BTTC, specifically through Bttc layer:
  * A DApp contract on TRON calls a function on a special BTTC contract on TRON.
  * The corresponding event is relayed to Delivery and then Bttc.
  * A state-sync transaction gets called on a BTTC smart contract and the DApp can get the value on Bttc via a function call on Bttc itself.
  * A similar mechanism is in place for sending state from BTTC to TRON. See also State Sync Mechanism

### Operations

#### Maintain high uptime

A node's uptime on the BTTC network is based on the number of checkpoint transactions that the validator node has signed.

Approximately every 34 minutes, a proposer submits a checkpoint transaction to the TRON/BSC/Ethereum mainnet. The checkpoint transaction must be signed by every validator on the BTTC network.

Failure to sign a checkpoint transction results in the decrease of your validator node performance.

The process of signing the checkpoint transactions is automated. To ensure your validator node is signing all valid checkpoint transactions, you must maintain and monitor your node health.

#### Check daily node services and processes

You must check daily the services and processes associated with Delivery and Bttc.

#### Run node monitoring

You must run either:

* Grafana Dashboards provided by BTTC. 
* Or your own monitoring tools for the validator and sentry nodes.

#### Keep an TRX/BNB/ETH balance

You must maintain an adequate amount of TRX/BNB/ETH on your validator signer address on the TRON/BSC/Ethereum mainnet.

You need TRX/BNB/ETH to:

* Sign the proposed checkpoint transactions on the TRX/BNB/Ethereum mainnet.
* Propose and send checkpoint transactions on the TRX/BNB/Ethereum mainnet.

Not maintaining an adequate amount of TRX/BNB/ETH on the signer address will result in:

* Delays in the checkpoint submission. Note that transaction gas prices on the Ethereum network may fluctuate and spike.
* Delays in the finality of transactions included in the checkpoints.
* Delays in subsequent checkpoint transactions.

### Delegation

#### Be open for delegation

All validators must be open for delegation from the community.

Each validator has the choice of setting their own commission rate. There is no upper limit to the commission rate.

#### Communicate commission rates

It is the moral duty of the validators to communicate the commission rates and the commission rate changes to the community.

### Communication

#### Communicate issues

Communicating issues as early as possible ensures that the community and the BTTC team can rectify the problems as soon as possible.

The preferred platforms to communicate the commission rates are:

* [GitHub](https://github.com/bttcprotocol)

#### Provide feedback and suggestions
At BTTC, we value your feedback and suggestions on any aspect of the validator ecosystem.

