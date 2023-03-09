# 取回 Relayer 保证金

## 取回 Relayer 保证金的步骤

1. relayerBasic 方法传入 Relayer 地址查询 Relayer 信息，status 为当前状态，stakeAmount 为抵押金额
2. 若当前状态为 1 表示已抵押未激活状态，可直接触发 withdrawCollateral 方法提取抵押。
3. 若当前状态为 2 表示已激活状态，可触发 unstake 方法，进行退出操作。交易中的 UnStake 事件，stakeAmount 为退出金额，availableTime 为执行提取抵押的时间
4. 执行 unstake 方法后，再次查询 Relayer 信息，当前状态为 3 表示已解除抵押，为退出状态，等待挑战期到达 availableTime 时间后，执行 withdrawCollateral 提取抵押。
5. timeInterval 方法可查询挑战时间间隔。

## 取回 Relayer 保证金涉及的合约接口

### Relayer 查询
```solidity
function relayerBasic(address relayer) returns(uint256 stakeAmount, uint256 unstakedTime, uint8 status)
```
* relayer: Relayer 的 Owner 地址

RETURN:Tuple of values (stakeAmount，unstakedTime，status);
*  stakeAmount: 抵押量
*  unstakedTime: 解押时间戳
*  status:  Relayer 的状态：（0 -> 新用户初始状态； 1 -> 已抵押未激活； 2 -> 已激活； 3 -> 已解押 

### 挑战期查询

```solidity
function timeInterval() view returns (uint)

```
RETURN: 解锁需要等待的最长时长，超过此时长后，即可提取保证金

### 解除质押
```solidity
function unstake() external
```
* msg.sender: 已抵押保证金且通过申请成为 Relayer 的地址，进行解押操作
RETURN: No return, reverts on error.

event UnStake(address indexed relayer, uint256 stakeAmount, uint256 availableTime);


### 取出保证金
```solidity
function withdrawCollateral() external
```
* msg.sender: 已抵押保证金的地址，进行取出保证金操作

RETURN: No return, reverts on error.

event WithdrawCollateral(address indexed relayer, uint256 amount);

