# State Transition

BTTC validators are continuing to monitor the public blockchain's `StateSender` contract. When a contract registered on the public blockchain makes a call to `StateSender,` an event is generated. Validators on the BTTC network use this event to relay data to another contract on the BTTC network. This mechanism is known as state synchronization, and it is used to transfer data from the public blockchain to the BTTC blockchain.

BTTC validators submit the hash values of all BTTC transactions to the public blockchain on a regular basis. This submission is referred to as a checkpoint, and it can be used to verify any BTTC transaction. When the verification is successful, the corresponding actions on the public blockchain can be taken.

Both mechanisms are used concurrently to enable bidirectional data transfer between BTTC and the public blockchain. To abstract these interactions, you can directly inherit our public blockchain contract `FxBaseRootTunnel` and the BTTC contract `FxBaseChildTunnel`.

## Root Tunnel Contract

The following functions are available via the `FxBaseRootTunnel` contract:


* `_processMessageFromChild(bytes memory data)`: This function is used to process data received from Child Tunnel.
* `_sendMessageToChild(bytes memory message)`: Pass any byte data as a parameter and call this function within the contract; the data will be sent to Child Tunnel in its entirety.
* `receiveMessage(bytes memory inputData)`: this function is used to receive messages sent by Child Tunnel. `calldata` must be used to provide proof of transaction.

## Child Tunnel Contract

The following functions are available via the FxBaseChildTunnel contract:

* `_processMessageFromRoot(uint256 stateId, sender address, bytes memory data)`: this function is used to process data sent via the Root Tunnel.
* `_sendMessageToRoot(bytes memory message)`: Use this function to send any byte data to the Root Tunnel from within the contract.

## Prerequisites


1. On the public blockchain, the Root contract must inherit the `FxBaseRootTunnel` contract. Similarly, the sub-contracts on BTTC must inherit the `FxBaseChildTunnel` contract.
2. The location of the `_checkpointManager` object
3. `_fxChild` has the address `_fxChild`
4. Call the`setChildTunnel` method on the root tunnel using the address of the child tunnel; concurrently, call the`setRootTunnel` method on the child tunnel using the address of the root tunnel.


## Transition of State Between Public Blockchain and BTTC


* Within the root contract, call `_sendMessageToChild()` to send data to BTTC.
* In the sub-contract, implement `_processMessageFromRoot()` to retrieve data from the public blockchain. When the status is synchronized, the data from the status receiver is automatically received.


### BTTC state transfer to public blockchain


* Call `_sendMessageToRoot()` in the sub-contract to send the data to the public blockchain.
* After the transaction hash is collected in the checkpoint, it will be used to generate a proof. The following code can be used to generate a proof using the hash of the transaction.

```js
const bttcPOSClient = new require("@bttcnetwork/bttcjs").BttcPOSClient({
  network: "",
  version: "",
  maticProvider: "https://rpc-mumbai.matic.today", // when using mainnet, replace to bttc mainnet RPC endpoint
  parentProvider: "https://rpc.slock.it/goerli", // when using mainnet, replace to ethereum mainnet RPC endpoint
});
const proof = bttcPOSClient.posRootChainManager
  .customPayload(
    "0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a", // replace with txn hash of sendMessageToRoot
    "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036" // SEND_MESSAGE_EVENT_SIG, do not change
  )
  .then(console.log);
```

* In the root contract, implement `_processMessageFromChild()`.
* To retrieve data sent from the child tunnel, pass the generated certificate as a parameter to`receiveMessage()`.