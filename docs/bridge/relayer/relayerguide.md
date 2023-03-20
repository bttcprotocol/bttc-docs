# Relayer User Guide
## 1. Add the BTT pledge

> The ChildERC20RelayStake contract is called for the action below. Contract address: 0xdCA98bbf5377F2A30b86B6207C925Beca1688fb7

### stake

Add the Relayer pledge, in BTT tokens.

```solidity
function stake(address btt, uint256 amount) payable external
```

Parameter description:

| Parameter   | Type    | Description                                                    |
| ------ | ------- | ------------------------------------------------------- |
| btt   | address | btt_e / btt_b / btt_t(0x0000000000000000000000000000000000001010)                                   |
| amount | uint256 | The amount of BTT. If BTT_t is used here, make sure the value of "callvalue" equals that of "amount". |

Event：

event Stake(address indexed from, uint amount);

## 2. Set the supported tokens and the Relayer fee 

> The ChildERC20Relay contract is called for the actions below. Contract address: 0x2C166B83394838D650E4985cE93dE26CFA68A25D

### setRelayerTokenStates

Configure whether a token is supported in your Relayer service.

```solidity
function setRelayerTokenStates(IChildToken childToken, bool state) external
```

Parameter description:

| **Parameter**   | **Type** | **Description**        |
| ---------- | -------- | --------------- |
| childToken | address  | The token mapped to the side chain. |
| state      | bool     | Specifies whether this token is supported or not. |

`RETURN`: No return, reverts on error. 

Event：

  event StateUpdated(address indexed relayer, address indexed tokenExit, bool state);
  
### setRelayerTokenFees

Set your Relayer service fee of a token.

```solidity
function setRelayerTokenFees(IChildToken childToken, uint256 fee) external
```

 Parameter description:

| Parameter       | Type    | Description                   |
| ---------- | ------- | ---------------------- |
| childToken | address | The token mapped to the side chain.        |
| uint256    | bool    | The Relayer service fee of this token. |

 Event：

event FeeUpdated(address indexed relayer, address indexed tokenExit, uint256 fee);

## 3. Start or pause taking orders

> The ChildERC20Relay contract is called for the action below. Contract Address: 0x2C166B83394838D650E4985cE93dE26CFA68A25D

### setRelayerPause

Start or pause taking orders as a Relayer.

```solidity
function setRelayerPause( bool state) external
```

Parameter description:

| **Parameter** | **Type** | **Description**                             |
| -------- | -------- | ------------------------------------ |
| state    | bool     | Specifies to start or pause providing your Relayer service (for all tokens). |

`RETURN`: No return, reverts on error.

Event：

  event PauseAction(address indexed relayer, bool isRelayerPaused);
  
## 4. Query the service state

### Query whether your Relayer service is paused

```solidity
function isRelayerPaused(address relayer) public view returns (bool)
```

returns: "true" means your Relayer service is paused, and "false" means the service is not paused.

### Query whether a token is supported in your Relayer service

```solidity
function relayerTokenStates(address relayer, IChildToken childToken) public view returns (bool)
```

returns: "true" means the token is supported, and "false" means the token is not supported.

### Query the Relayer service fee for a specific token

```solidity
function relayerTokenFees(address relayer, IChildToken childToken) public view returns (uint256)
```

returns: the Relayer service fee for the token.


### Query the number of orders your Relayer service can take per hour

Query the maximum orders a Relayer can take per hour on BTTC: getMaxHourlyOrders(address relayer)  returns: uint256, which means the maximum orders your Relayer service can take.

```solidity
 getMaxHourlyOrders(address relayer) public view returns (uint256)
```

returns: the actual number of orders your Relayer service can take per hour.
