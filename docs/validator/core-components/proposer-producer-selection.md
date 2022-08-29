import useBaseUrl from '@docusaurus/useBaseUrl';

# Proposers & Producers Selection

Block Producers for the Bttc layer, are a committee selected from the Validators pool on the basis of their stake which happens at regular intervals. These intervals are decided by the Validator's governance with regards to dynasty and network.

The ratio of stake specifies the probability to be selected as a member of block producers committee.

## Selection process

Let's suppose we have 3 validators in pool — Alice, Bill, and Clara:

* Alice is staking 100 BTT tokens.
* Bill is staking 40 BTT tokens.
* Clara is staking 40 BTT tokens.

Validators are given slots according to the stake.

Because Alice has 100 BTT tokens staked, and the per slot cost is 10 BTT tokens as maintained by validator's governance, Alice gets 5 slots in total. Similarly, Bill and Clara get 2 slots in total.

The Alice, Bill and Clara validators are given the following slots:

* [ A, A, A, A, A, B, B, C, C ]

BTTC then shuffles the array of the Alice, Bill and Clara slots by using the TRON block hashes as seed.

The result of the shuffle is the following array of slots:

* [ A, B, A, A, C, B, A, A, C]

Now depending on the total block producer count as maintained by validator's governance, BTTC uses the validators from the top — for example. for a set of 5 producers the array of slots is [ A, B, A, A, C].

The producer set for the next span is defined as [ A: 3, B:1, C:1 ].

Using the algorithm, BTTC selects a producer for every `sprint` on Bttc layer. `sprint` is the number of blocks produced continuously by a validator

<img src={useBaseUrl("img/producer-proposer.png")} />
