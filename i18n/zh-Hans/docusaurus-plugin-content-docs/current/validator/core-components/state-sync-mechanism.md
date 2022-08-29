# 状态同步机制
Delivery层的验证器监听TRON/BSC/Ethereum的 StateSynced 事件并将该事件传递给 Bttc 层。

接收者合约继承 IStateReceiver，自定义逻辑位于 onStateReceive 函数中。

dapps/用户使用状态同步机制需要做的事情是：
1. 调用`syncState`函数。
2. `syncState`函数发出一个名为`StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)`的事件；
3. Delivery 层的的所有验证者都会收到 `StateSynced` 事件。 任何希望获得状态同步交易费用的验证者都会将交易发送给 Delivery。
4. 一旦 Delivery 上的状态同步交易被包含在一个区块中，它就会被添加到待处理状态同步列表中。
5. 在 Bttc 层的每个 sprint 之后，Bttc 节点通过 API 调用从 Delivery 中获取待处理的状态同步事件。
6. 接收者合约继承 `IStateReceiver` 接口，解码数据字节和执行任何操作的自定义逻辑位于 `onStateReceive` 函数中。
