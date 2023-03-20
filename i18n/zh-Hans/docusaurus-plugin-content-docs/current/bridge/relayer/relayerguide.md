# Relayer 操作手册
## 1、抵押 btt 保证金

> 以下操作调用ChildERC20RelayStake合约：0xdCA98bbf5377F2A30b86B6207C925Beca1688fb7

### stake

调用合约抵押 btt

```solidity
function stake(address btt, uint256 amount) payable external
```

参数描述：

| 参数   | 类型    | 描述                                                    |
| ------ | ------- | ------------------------------------------------------- |
| btt   | address | btt_e / btt_b / btt_t(0x0000000000000000000000000000000000001010)                                   |
| amount | uint256 | 对应的 btt 数量，如果是 btt_t，需要保证 callvalue 等于 amount |

事件：

event Stake(address indexed from, uint amount);

## 2、设置支持的 Token 及 Fee 

> 以下操作调用ChildERC20Relay合约：0x2C166B83394838D650E4985cE93dE26CFA68A25D

### setRelayerTokenStates

Relayer 设置对token的启动或禁用

```solidity
function setRelayerTokenStates(IChildToken childToken, bool state) external
```

参数描述：

| **参数**   | **类型** | **描述**        |
| ---------- | -------- | --------------- |
| childToken | address  | 侧链映射的 token |
| state      | bool     | 是否支持该 token |

`RETURN`: No return, reverts on error. 

事件：

  event StateUpdated(address indexed relayer, address indexed tokenExit, bool state);
  
### setRelayerTokenFees

Relayer 设置 token 的 Relayer Fee

```solidity
function setRelayerTokenFees(IChildToken childToken, uint256 fee) external
```

 参数描述：

| 参数       | 类型    | 描述                   |
| ---------- | ------- | ---------------------- |
| childToken | address | 侧链映射的token        |
| uint256    | bool    | token对应的 relayerFee |

 事件：

event FeeUpdated(address indexed relayer, address indexed tokenExit, uint256 fee);

## 3、开启或暂停接单

> 以下操作调用ChildERC20Relay合约：0x2C166B83394838D650E4985cE93dE26CFA68A25D

### setRelayerPause

Relayer 控制自己的暂停状态，拒绝接单

```solidity
function setRelayerPause( bool state) external
```

参数描述：

| **参数** | **类型** | **描述**                             |
| -------- | -------- | ------------------------------------ |
| state    | bool     | Relayer 控制暂停状态（针对所有token） |

`RETURN`: No return, reverts on error.

事件：

  event PauseAction(address indexed relayer, bool isRelayerPaused);
  
## 4、查询状态

### 查询 Relayer 是否暂停

```solidity
function isRelayerPaused(address relayer) public view returns (bool)
```

returns： true 暂停，flase未暂停

### 查询 Relayer 是否启用某 token

```solidity
function relayerTokenStates(address relayer, IChildToken childToken) public view returns (bool)
```

returns：true 未禁用 flase 禁用

### 查询 Token 的 Relayer Fee

```solidity
function relayerTokenFees(address relayer, IChildToken childToken) public view returns (uint256)
```

returns：token 对应的 Relayer Fee


### 查询 Relayer 每小时可接订单数

查询每小时限制relayer订单数 ： getMaxHourlyOrders(address relayer) returns ：uint256 当前 Relayer 可接单的最大数量

```solidity
 getMaxHourlyOrders(address relayer) public view returns (uint256)
```

returns：Relayer 每小时可接单的数量
