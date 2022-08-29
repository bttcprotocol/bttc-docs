# 验证人
验证者是维护BTTC网络的关键角色，验证者运行一个完整的节点并通过质押 BTT来生产区块、验证和参与PoS共识来保证网络安全运行。

:::info
目前不接受新的验证人申请，只有当前活跃的验证者解绑时，新的验证者才能加入。

未来将推出拍卖机制来进行验证人替换。
:::

BTTC网络由以下三层构成：
* 质押合约层 - 一组部署在TRON/BSC/Ethereum区块链网络上的智能合约，支持用户通过存取款的方式将代币从TRON/BSC/Ethereum链转移到BTTC，其中部署在TRON网络的合约支持质押功能。
* 验证者层 - 一条POS共识的链，基于 Tendermint实现，具体职责如下：
    - 监控部署在TRON主网上的质押合约
    - 验证BTTC层的所有状态转换
    - 将验证者层的状态检查点提交到TRON/BSC/Ethereum网络
* Bttc层 - 一条Ethereum兼容链，有一组负责出块的节点，这些节点客户端基于Geth实现，Bttc层生产的区块会被验证者层验证确认。


成为BTTC网络一个验证者，你必须运行：
- Sentry节点 — 两台机器分别运行验证者层的节点和Bttc层的节点，Sentry节点与网络中其他节点连通交互。
- Validator节点 — 两台机器分别运行验证者层的节点和Bttc层的节点，Validator节点只和Sentry节点交互，与网络中其他节点没有连接。
- 在TRON网络的质押合约中质押足够数量的BTT代币。


下面与验证人相关的主题：
* [验证人职责](/docs/validator/responsibilities)
* [运行验证人节点](/docs/node/build-validator-node)
* [修改验证人佣金比例](/docs/validator/rewards)
* [奖励](/docs/validator/validator-commission-operations)
