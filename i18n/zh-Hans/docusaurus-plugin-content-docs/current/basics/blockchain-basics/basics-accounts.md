# 什么是账户？
以太坊的全局状态是由账户组成的，这些账户通过一个消息传递框架相互作用。最基本的互动是发送一些价值--如matic代币、以太坊--以太坊区块链的本地加密货币。每个账户由一个20字节的十六进制标识符识别，这被称为地址--这是由账户的公钥生成的。存在两种类型的账户：

一个以太坊帐户是一个具有以太币 (ETH) 余额的实体，可以在以太坊上发送交易。 帐户可以由用户控制，也可以作为智能合约部署。

1. 外部账户 - 一个由私钥控制的账户，如果你拥有与该账户相关的私钥，你就有能力从该账户发送资产到其他账户。
2. 合约账户 - 一种由代码控制，部署在网络上的智能合约

这两种帐户类型都能：

1. 接收、持有和发送 ETH 和 token
2. 与已部署的智能合约进行交互

### **:scroll:Resources**

[了解更多关于账户](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
