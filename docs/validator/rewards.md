# Reward

In BTTC, validators stake their BTT tokens as collateral to work for the security of the network, and in exchange for their service, earn rewards.

To leverage BTTC's economics, you should either become a validator or a delegator:

- To be a validator, you need to **run a full validator** node and stake BTT. 

- To be a delegator, you only need to **delegate BTT to a validator**. 

## Who gets the incentives?

Stakers running validator nodes and stakers delegating their tokens toward a validator that they prefer.

Validators have the option to charge a commission on the reward earned by delegators.

The funds belonging to all stakers are locked in a contract deployed on the TRON mainnet.

No validator holds custody over delegator tokens.

## Reward Calculation
10% of network rewards on BTTC are allocated to validators who submit checkpoints, while the remaining 90% is distributed among all delegators and validators according to their share of total staked assets. 

The following formula shows how to calculate the delegator's annual income:
```
Total annual reward * 90% * (staking amount of the delegator / The total staking amount of the whole network)
```

The following formula shows how to calculate the validator's annual income:
```
Total annual reward * 10% / number of validators + total annual reward * 90% * (staking amount of the validator / The total staking amount of the whole network)
```



