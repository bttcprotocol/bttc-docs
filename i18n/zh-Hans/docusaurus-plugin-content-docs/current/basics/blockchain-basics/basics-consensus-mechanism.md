# 共识机制
共识机制是一种容错机制，用于计算机和区块链系统，在一个时间段内对事物的前后顺序达成共识的一种算法。

在区块链上，共识机制就像一个国家的法律，维系着区块链世界的正常运转。区块链系统中，每个人都会有一份记录链上所有交易的账本，链上产生一笔新的交易时，每个人接收到这个交易的时间是不一样的，有些想要作恶的人就有可能在这时发布一些错误的交易，共识机制的目标是使所有的诚实节点都只保存正确的交易数据。

## 共识机制的类型
* **PoW:工作量证明**
工作量证明描述了一个需要付出不小但最终可以实现的系统，工作量证明机制可以阻止DOS（拒绝服务）攻击和其他恶意攻击。它需要解决一个具有计算挑战性的难题，以便在区块链中创建新的区块。
工作量证明是我们最熟知的一种共识机制，正就如字面的解释，PoW就是工作越多，收益越大。这里的工作解决一个具有计算挑战性的难题，谁能最快的解出这个难题，谁就能有权利生产区块。
* **PoS：权益证明**
权益证明机制通过要求用户将其代币的一定数量作为质押来实现共识，以便有机会被选中来验证交易区块，并因此获得奖励。优先权给予在区块链网络中购买了最多权益的矿工。
权益证明可以解决POW机制中大量计算资源被浪费的情况，根据股权占比来决定出块权利，股权在区块链系统中指的是链原生代币,可以理解为拥有的代币数量越多，获得出块权的概率越大。
* **DPoS: 委托的权益证明**
委托的权益证明要求持币人根据持有的代币投票选出一定数量的代表，来负责生产区块，这些代表也叫验证人，负责验证交易和生产区块。

## **:scroll:资源**
:page_facing_up: [Byzantine Fault Tolerance](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419) <br></br>
:page_facing_up: [Type of Consensus Mechanisms](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms) <br></br>
:page_facing_up: [Review of Blockchain Consensus Mechanisms](https://blog.wavesplatform.com/review-of-blockchain-consensus-mechanisms-f575afae38f2) <br></br>
:headphones: [Overview and History of Consensus System Development](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/) <br></br>
:green_book: [Understanding Distributed Consensus](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95) <br></br>
:books: [Byzantine Generals Problem](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)
