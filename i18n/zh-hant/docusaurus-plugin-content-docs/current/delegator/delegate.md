# Delegator
There are no prerequisites to become a delegator of BitTorrent-Chain, only a TRON account is required. 

A delegator does not need to host a full node to participate in the verification. They can stake BTT tokens to a validator and receive a portion of the reward in exchange. Because they share the reward with the validator, the delegator also shares the risk. Delegators play a crucial role in the system because they can choose the Validator as they wish.

## Voting related contract interface description
### Vote for a Validator
* Contract method:`ValidatorShare:buyVoucher(uint256, uint256)`
* Parameters:
    * `_amount`：vote amount
    * `_minSharesToMint`：The minimum acceptable number of share tokens. The BTT voted by the delegator for the validator will be converted into share tokens to represent the share of the user's votes for the validator in the total votes. The delegator can query the number of shares he owns through the `balanceOf` method of the validator's ValidatorShare contract.
* Illustration
    1. Before calling buyVoucher, you need to authorize the contract [`StakeManagerProxy`](https://tronscan.org/#/contract/TEpjT8xbAe3FPCPFziqFfEjLVXaw9NbGXj/code) to transfer [`BTT`](https://tronscan.org/#/contract/TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4/code) from delegator account by calling the `approve` method of BTT.
    2. Each validator has a corresponding ValidatorShare contract. You can access the validators[validatorId].contractAddress of StakeManagerProxy to obtain the ValidatorShare contract address of a validator
    3. This method can also used as adding votes for validators


### Claim rewards
* Contract method: `ValidatorShare:withdrawRewards()`
* parameters: none
* Illustration
    1. The delegator calls the withdrawRewards method of the validator's ValidatorShare contract to withdraw the reward. After the execution is successful, the reward immediately reaches the delegator's account.

### Cancel votes

* Contract method: `ValidatorShare:sellVoucher_new:(uint256, uint256)`
* Parameters:
    * uint256 claimAmount：claiming amount; The total amount of BTT voted by the delegator for the validator, which can be obtained through the ValidatorShare:getTotalStake method.
    * uint256 maximumSharesToBurn：acceptable maximum number of share token to burn; the number of share token owned by the delegator can be obtained through the ValidatorShare:balanceOf method.
* Illustration
    1. Cancellation vote can be done in multiple times, but the interval between each time is at least one checkpoint.
    2. After the vote is cancelled, the staked BTT needs to go through a lock-up period of 80 checkpoints before it can be withdrawn.

### Withdraw staked BTT
* Contract method: ValidatorShare:unstakeClaimTokens_new(uint256)
* Parameter
    * uint256 unbondNonce: The nonce of the `cancle vates` operation, that is, to withdraw the BTT of the nonce `cancel vates`. The total number of `cancel votes` operation by the delegator can be queried through the ValidatorShare:unbondNonces method.
* Illustrate
    1. This method can only be called after a lock-up period of 80 checkpoints has elapsed after the vote is cancelled.

## Reward reinvestment
The reward re-investment is to vote the reward to the validator to obtain more voting rewards.
* Contract method: ValidatorShare:reStake()
* parameter: none

### Transfer vote
To transfer votes is to transfer a portion of the votes to another validator.
* Contract method: StakeManagerProxy:migrateDelegation(uint256, uint256, uint256)
* parameter
    * uint256 fromValidatorId: source validator id
    * uint256 toValidatorId: target validator id
    * uint256 amount: transfer amount
* illustrate
    1. Only can transfer to validators whoes validatorID is greater than 7
    2. The transfer of votes will automatically trigger the `Claim rewards` operation

