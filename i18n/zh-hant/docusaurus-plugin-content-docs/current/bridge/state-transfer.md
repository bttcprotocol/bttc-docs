# 狀態轉移

BTTC的驗證人持續對公共區塊鏈上的`StateSender`合約進行監控。每當公共區塊鏈上注冊的合約調用`StateSender`時，它都會發出一個事件。BTTC的驗證人用這個事件將數據中繼到BTTC上的另一個合約。這個機制就是狀態同步，用於將數據從公共區塊鏈發送至BTTC。

BTTC的驗證人定期向公共區塊鏈上提交BTTC上所有交易的哈希值，這種提交被稱為`checkpoint`，它可以用於驗證發生在BTTC上的任何交易。當通過驗證時，就可以在公共區塊鏈上采取相應的行動。

同時使用這兩種機制，以實現BTTC與公共區塊鏈之間的雙向數據傳輸。為了把這些交互抽象出來，您可以直接繼承我們在公共區塊鏈上的`FxBaseRootTunnel`合約，以及在BTTC上的`FxBaseChildTunnel`合約。

## Root Tunnel 合約

通過`FxBaseRootTunnel`合約，您可以使用以下功能：

* `_processMessageFromChild(bytes memory data)`：實現這個函數，來處理從Child Tunnel發送來的數據。
* `_sendMessageToChild(bytes memory message)`：使用任何字節數據作為參數，在合約內部調用這個函數，它將按原樣將數據發送到Child Tunnel。
* `receiveMessage(bytes memory inputData)`：調用這個函數，來接收Child Tunnel發來的消息。交易證明需要通過`calldata`提供。

## Child Tunnel 合約

通過`FxBaseChildTunnel`合約，您可以使用以下功能：

* `_processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`：實現這個函數，來處理從Root Tunnel發送的數據。
* `_sendMessageToRoot(bytes memory message)`：在合約內部調用此函數，可以將任何字節數據發送至Root Tunnel。

## 先決條件

1. 部署在公共區塊鏈的Root合約需要繼承`FxBaseRootTunnel`合約。您可以參照示例。同樣，BTTC上的子合約也需要繼承`FxBaseChildTunnel`合約。
2. `_checkpointManager`
3. `_fxChild`
4. 使用child tunnel的地址，在root tunnel上調用`setChildTunnel`方法；同時，使用root tunnel的地址，在child tunnel上調用`setRootTunnel`方法

## 從公共區塊鏈到BTTC的狀態轉移

* 在根合約內部調用`_sendMessageToChild()`，將數據發送至BTTC。
* 在子合約中實現`_processMessageFromRoot()`來檢索來自公共區塊鏈的數據。當狀態同步時，數據將自動從狀態接收器接收。

### 從BTTC到公共區塊鏈的狀態轉移

* 在子合約內部調用`_sendMessageToRoot()`將數據發送至公共區塊鏈。
* 交易哈希將在被收入checkpoint後，用於生成證明。可以使用如下的代碼從交易哈希生成證明。

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

* 在根合約中實現`_processMessageFromChild()`
* 用生成的證明作為`receiveMessage()`的參數，來檢索從child tunnel發送來的數據。
