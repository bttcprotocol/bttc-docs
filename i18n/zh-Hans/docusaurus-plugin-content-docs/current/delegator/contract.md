# 合约
委托人质押投票相关的操作也可以调用ValidatorShare和StakeManagerProxy合约进行，大多数操作都是调用ValidatorShare合约，只有转移投票是调用StakeManagerProxy合约。

每一个验证人都有对应的ValidatorShare合约， 可以访问StakeManagerProxy的validators[validatorId].contractAddress来获取某一个验证人对应的ValidatorShare合约地址。下面是是投票相关操作对应的合约函数介绍。


## ValidatorShare:buyVoucher
质押一定数量的BTT并投票给该ValidatorShare对应的验证人
* 合约方法：`ValidatorShare:buyVoucher(uint256 _amount, uint256 _minSharesToMint)`
* 参数：
    * `_amount`：投票数量
    * `_minSharesToMint`：可接受的最少份额币数量，委托人为验证人投票的BTT会转化为份额币，以表示用户为验证人所投票数占总票数的份额。委托人可通过验证人的ValidatorShare合约的balanceOf方法来查询他所拥有的份额币数量。
* 说明：
    1. 在调用buyVoucher方法之前，需要先调用[`BTT`](https://tronscan.org/#/contract/TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4/code)的approve方法授权大于投票数量的BTT给[`StakeManagerProxy`](https://tronscan.org/#/contract/TEpjT8xbAe3FPCPFziqFfEjLVXaw9NbGXj/code)合约。
    2. 此方法也可为验证人追加投票


## ValidatorShare:withdrawRewards
委托人调用验证人的ValidatorShare合约的withdrawRewards方法来为提取奖励，执行成功后奖励立刻到达委托人账户。
* 合约方法：`ValidatorShare:withdrawRewards()`
* 参数：无


## ValidatorShare:reStake
将已获得但未提取的BTT投票奖励再次投票给验证人，以获取更多的投票奖励。
* 合约方法：`ValidatorShare:reStake()`
* 参数：无

## StakeManagerProxy:migrateDelegation
转移投票是转移一部分或全部票数给另一个验证人。
* 合约方法：`StakeManagerProxy:migrateDelegation(uint256 fromValidatorId, uint256 toValidatorId, uint256 amount)`
* 参数
    * `uint256 fromValidatorId`：源validator id
    * `uint256 toValidatorId`：目标validator id
    * `uint256 amount`：转移的BTT数量
* 说明
    1. 只能转移给validatorID 大于7的验证人
    2. 转移投票会自动触发领取奖励操作

## ValidatorShare:sellVoucher_new
取消投票，取消投票后，质押的BTT需要经过80个检查点（约40小时）的锁定期，才可提取。
* 合约方法：`ValidatorShare:sellVoucher_new:(uint256 claimAmount, uint256 maximumSharesToBurn)`
* 参数：
    * `claimAmount`：取消投票的BTT数量；委托人为验证人投票的总BTT数量，可通过ValidatorShare:getTotalStake方法获取。
    * `maximumSharesToBurn`：可接受燃烧的最大份额币数量；委托人所拥有的份额币数量可通过ValidatorShare:balanceOf方法获取。
* 说明
    1. 取消投票可以分多次进行，但是每次之间至少间隔1个检查点。


## ValidatorShare:unstakeClaimTokens_new
提取质押的BTT，该方法需要在取消投票后，经过80个检查点的锁定期后，才可调用。
* 合约方法：`ValidatorShare:unstakeClaimTokens_new(uint256 unbondNonce) `
* 参数
    * `uint256 unbondNonce`：`取消投票`操作对应的nonce，即提取第nonce次`取消投票`的BTT。委托人总的取消投票次数可以通过ValidatorShare:unbondNonces方法查询。


