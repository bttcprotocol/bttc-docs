# Contract
The operations related to the delegator’s stake voting can also be performed by calling the "ValidatorShare" and "StakeManagerProxy" contracts. Most operations call the "ValidatorShare" contract. Only the transfer vote calls the "StakeManagerProxy" contract. 

Each validator has a corresponding "ValidatorShare" contract and can access the validator[validatorId].contractAddress of StakeManagerProxy to get the ValidatorShare contract address corresponding to a certain validator. The following is an introduction to the contract functions corresponding to voting-related operations.

## ValidatorShare:buyVoucher
Stake a certain amount of BTT and vote for the validator corresponding to the ValidatorShare
* Contract Method：`ValidatorShare:buyVoucher(uint256 _amount, uint256 _minSharesToMint)`
* Parameters：
    * `_amount`：amount of Voting
    * `_minSharesToMint`：The minimum acceptable number of share coins, the BTT voted by the delegator for the validator will be converted into share coins to represent the user's share of the total votes for the validator. The delegator can query the number of shares he owns through the balanceOf method of the validator's ValidatorShare contract.
* Note：
    1. Before calling the buyVoucher method, you need to call[`BTT`](https://tronscan.org/#/contract/TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4/code) approve method to authorize a sufficient amount of BTT to[`StakeManagerProxy`](https://tronscan.org/#/contract/TEpjT8xbAe3FPCPFziqFfEjLVXaw9NbGXj/code).
    2. This also works for additional voting for the validator.


## ValidatorShare:withdrawRewards
The delegator calls the withdrawRewards method of the validator's ValidatorShare contract to withdraw the reward. After the execution is successful, the reward immediately reaches the delegator's account.
* Method：`ValidatorShare:withdrawRewards()`
* Parameter： N/A


## ValidatorShare:reStake
Vote the BTT voting rewards that have been earned but yet withdrawn for the validator again to get more voting rewards.
* Method：`ValidatorShare:reStake()`
* Parameter： N/A

## StakeManagerProxy:migrateDelegation
"Transfer Votes" is to transfer some or all of the votes to another validator.
* Method：`StakeManagerProxy:migrateDelegation(uint256 fromValidatorId, uint256 toValidatorId, uint256 amount)`
* Parameters:
    * `uint256 fromValidatorId`：original validator id
    * `uint256 toValidatorId`：new validator id
    * `uint256 amount`：amount of BTT transferred
* Note
    1. Votes can only be transferred to those whose validatorID is larger than 7.
    2. Transfer Votes will trigger reward claiming action automatically
    
## ValidatorShare:sellVoucher_new
Cancel the vote. After canceling the vote, the staked BTT needs to go through a lock-up period of 80 checkpoints (about 40 hours) before it can be withdrawn.
* Method：`ValidatorShare:sellVoucher_new:(uint256 claimAmount, uint256 maximumSharesToBurn)`
* Parameters：
    * `claimAmount`：The amount of BTT that has been canceled for voting; the total amount of BTT voted by the delegator for the validator can be obtained through the ValidatorShare:getTotalStake method.
    * `maximumSharesToBurn`：The maximum number of shares that can be burned; the number of shares owned by the delegator can be obtained through the ValidatorShare:balanceOf method.
* Note
    Canceling the votes can be done continuously with a minimal interval of 1 checkpoint.


## ValidatorShare:unstakeClaimTokens_new
To withdraw the staked BTT, this method can only be called after a lock-up period of 80 checkpoints after the vote is canceled.
* Method：`ValidatorShare:unstakeClaimTokens_new(uint256 unbondNonce) `
* Parameter:
    * `uint256 unbondNonce`：the nonce corresponding to `Cancel Votes`， withdraw the BTT of the nonce time of `Cancel Votes`. The total number of votes canceled by the delegator can be queried through the ValidatorShare:unbondNonces method.
