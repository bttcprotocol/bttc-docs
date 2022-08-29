# 状态转移

BTTC的验证人持续对公共区块链上的`StateSender`合约进行监控。每当公共区块链上注册的合约调用`StateSender`时，它都会发出一个事件。BTTC的验证人用这个事件将数据中继到BTTC上的另一个合约。这个机制就是状态同步，用于将数据从公共区块链发送至BTTC。

BTTC的验证人定期向公共区块链上提交BTTC上所有交易的哈希值，这种提交被称为`checkpoint`，它可以用于验证发生在BTTC上的任何交易。当通过验证时，就可以在公共区块链上采取相应的行动。

同时使用这两种机制，以实现BTTC与公共区块链之间的双向数据传输。为了把这些交互抽象出来，您可以直接继承我们在公共区块链上的`FxBaseRootTunnel`合约，以及在BTTC上的`FxBaseChildTunnel`合约。

## Root Tunnel 合约

通过`FxBaseRootTunnel`合约，您可以使用以下功能：

* `_processMessageFromChild(bytes memory data)`：实现这个函数，来处理从Child Tunnel发送来的数据。
* `_sendMessageToChild(bytes memory message)`：使用任何字节数据作为参数，在合约内部调用这个函数，它将按原样将数据发送到Child Tunnel。
* `receiveMessage(bytes memory inputData)`：调用这个函数，来接收Child Tunnel发来的消息。交易证明需要通过`calldata`提供。

## Child Tunnel 合约

通过`FxBaseChildTunnel`合约，您可以使用以下功能：

* `_processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`：实现这个函数，来处理从Root Tunnel发送的数据。
* `_sendMessageToRoot(bytes memory message)`：在合约内部调用此函数，可以将任何字节数据发送至Root Tunnel。

## 先决条件

1. 部署在公共区块链的Root合约需要继承`FxBaseRootTunnel`合约。您可以参照示例。同样，BTTC上的子合约也需要继承`FxBaseChildTunnel`合约。
2. `_checkpointManager`
3. `_fxChild`
4. 使用child tunnel的地址，在root tunnel上调用`setChildTunnel`方法；同时，使用root tunnel的地址，在child tunnel上调用`setRootTunnel`方法

## 从公共区块链到BTTC的状态转移

* 在根合约内部调用`_sendMessageToChild()`，将数据发送至BTTC。
* 在子合约中实现`_processMessageFromRoot()`来检索来自公共区块链的数据。当状态同步时，数据将自动从状态接收器接收。

### 从BTTC到公共区块链的状态转移

* 在子合约内部调用`_sendMessageToRoot()`将数据发送至公共区块链。
* 交易哈希将在被收入checkpoint后，用于生成证明。可以使用如下的代码从交易哈希生成证明。

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

* 在根合约中实现`_processMessageFromChild()`
* 用生成的证明作为`receiveMessage()`的参数，来检索从child tunnel发送来的数据。
