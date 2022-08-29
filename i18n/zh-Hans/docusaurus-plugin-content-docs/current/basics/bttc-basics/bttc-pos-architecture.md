import useBaseUrl from '@docusaurus/useBaseUrl';

# Bittorrent-Chain架构
Bittorrent-Chain(BTTC)网络是一个区块链应用平台，从架构上看，BTTC的魅力在于其优雅的设计，它有一个通用的共识层，与执行层分离开来。


为了在BTTC上使用PoS机制，在TRON网络上部署了一套**质押**管理合约，另外还有一组受到激励的验证人，运行着**Delivery**和**Bttc层**节点。TRON、BSC、Ethereum是BTTC支持的第一批基础链，但BTTC打算根据社区的建议和共识，提供对其他基础链的支持，以实现一个可互操作的去中心化第二层区块链平台。

BTTC PoS有一个三层的架构：

1. 部署在TRON网络上的质押管理合约
2. Delivery(PoS层)
4. Bttc (区块生产层)

## BTTC智能合约（部署在TRON网络）

BTTC在TRON网络上维护着一组智能合约，它处理以下内容：

- Delivery层的质押管理
- 委托管理
- 侧链状态的检查点/快照

## Delivery (PoS层)

**Delivery**是PoS验证器节点，与TRON上的Staking合约协同工作，在BTTC网络上实现PoS机制，Delivery基于Tendermint共识引擎，同时修改来了签名方案和各种数据结构来实现。Delivery负责区块验证、Bttc层区块生产者的选择、代表Bttc层状态的检查点的验证和提交以及其他各种责任。

Delivery层将 Bttc层生产的区块聚合成一棵默克尔树，并定期将默克尔根发布到TRON链，这种定期发布称为检查点。 对于Bttc上的每几个块，Delivery层上的验证器会：

1. 验证自上次检查点以来的所有块
2. 创建一个区块哈希值的Merkle树
3. 将merkle根发布到TRON/BSC/Ethereum主链上

检查点的重要性在于两个原因：

1. 在TRON/BSC/Ethereum主链上提供Bttc侧链的最终结果
2. 提供Bttc侧链提取资产到主链的燃烧证明

这个过程可以理解为：

- 从池子里选出一个活跃的验证者集合，作为Bttc层区块生产者，区块生产者的选择也将由至少2/3的人同意。这些区块生产者负责创建区块并将其广播到网络。
- 一个检查点包括在任何给定间隔内创建的所有块的根。所有的节点都会对其进行验证，并将其签名附在上面。
- 一个从验证者集合中选出的提议者负责收集特定检查点的所有签名，并将其提交给主链。
- 创建区块和提出检查点的责任取决于验证者在整个池中的股权比例。

## Bttc (区块生产者层)

Bttc是BTTC区块生产者层, 负责将交易聚集成区块。

区块生产者通过Delivery上的委员会定期选举。区块是在**Bttc**层节点上产生的，Bttc层的虚拟机与EVM兼容，在Bttc上生产的区块也会被Delivery层的验证人定期验证，由Bttc上一组区块Merkle树哈希组成的检查点会定期被提交给TRON/BSC/Ethereum主网。
