# Withdraw Relayer Pledge

## How can I withdraw my pledge?

1. Pass your Relayer address to call relayerBasic and check your Relayer information, where status denotes the Relayer's current status and stakeAmount denotes the amount of the Relayer pledge.
2. If 1 is returned for status, it indicates your pledge is added but the Relayer service is not activated. In this case, you can withdraw your pledge directly by calling withdrawCollateral.
3. If 2 is returned for status, it indicates the Relayer service is activated. You need to call the unstake function to stop being a Relayer first. This will trigger the UnStake event, where stakeAmount denotes the amount of pledge to be unstaked, and availableTime denotes the time the pledge available for withdrawal.
4. Check your Relayer information again after calling the unstake function. If 3 is returned for status, it indicates you have successfully unstaked your pledge and quit being a Relayer. You may withdraw the pledge by calling withdrawCollateral when availableTime is reached.
5. You may view the waiting period by calling timeInterval.

## APIs of Relayer 2.0 involved

### Relayer query
```solidity
function relayerBasic(address relayer) returns(uint256 stakeAmount, uint256 unstakedTime, uint8 status)
```
* relayer: the Owner address of the Relayer.

RETURN:Tuple of values (stakeAmount，unstakedTime，status);
*  stakeAmount: the pledge amount.
*  unstakedTime: the time the pledge is unstaked in timestamp.
*  status: the status of the Relayer (0 -> Initial status of a new Relayer; 1 -> Pledge added but service not activated; 2 -> Service activated; 3 -> Pledge unstaked). 

### Waiting period query

```solidity
function timeInterval() view returns (uint)

```
RETURN: the maximum period a Relayer needs to wait before the pledge is unstaked. The pledge can be withdrawn after this period.

### unstake
```solidity
function unstake() external
```
* msg.sender: an account that has added pledge and successfully become a Relayer
RETURN: No return, reverts on error.

event UnStake(address indexed relayer, uint256 stakeAmount, uint256 availableTime);


### withdrawCollateral
```solidity
function withdrawCollateral() external
```
* msg.sender: an account that has added pledge and wants to withdraw the pledge now

RETURN: No return, reverts on error.

event WithdrawCollateral(address indexed relayer, uint256 amount);

