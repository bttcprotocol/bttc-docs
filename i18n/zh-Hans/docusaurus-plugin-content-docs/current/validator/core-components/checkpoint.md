# 检查点


:::info BTTC is not a Layer 1 platform
BTTC 依赖 TRON主网作为其Layer 1层，所有质押机制都需要与 TRON 主网上的合约同步。
:::

Delivery层节点会周期性的验证Bttc层生产的区块，包含数个区块Merkle根的检查点也会被周期性的提交至TRON/BSC/Ethereum网络，这种定期提交被称为检查点。

在验证者层中通过Tendermint加权轮回算法来选择一个提议者，成功提交一个检查点有如下两个提交过程：
1. 通过上述Tendermint算法选择的提议者发送一个检查点，其中提议者字段中包含该提议者的地址及Merkle hash值。
2. 所有其他提议者在添加Merkle hash值到本地状态之前，会验证提议者字段中的数据。

下一个提议者发送一个确认交易，以证明之前的检查点交易在TRON/BSC/Ethereum网络上已经成功了。每一个验证者的变化将由Delivery层上的验证人节点转发，
这使得任何验证人在任何时候都能与TRON/BSC/Ethereu网络上的BTTC合约状态保持同步。

TRON/BSC/Ethereu网络上的BTTC合约数据是最终确认的正确数据，因此所有验证都是通过查询 TRON/BSC/以太坊主网合约来完成的。
