# 共識機制
共識機制是一種容錯機制，用於計算機和區塊鏈系統，在一個時間段內對事物的前後順序達成共識的一種算法。

在區塊鏈上，共識機制就像一個國家的法律，維系著區塊鏈世界的正常運轉。區塊鏈系統中，每個人都會有一份記錄鏈上所有交易的賬本，鏈上產生一筆新的交易時，每個人接收到這個交易的時間是不一樣的，有些想要作惡的人就有可能在這時發布一些錯誤的交易，共識機制的目標是使所有的誠實節點都只保存正確的交易數據。

## 共識機制的類型
* **PoW:工作量證明**
工作量證明描述了一個需要付出不小但最終可以實現的系統，工作量證明機制可以阻止DOS（拒絕服務）攻擊和其他惡意攻擊。它需要解決一個具有計算挑戰性的難題，以便在區塊鏈中創建新的區塊。
工作量證明是我們最熟知的一種共識機制，正就如字面的解釋，PoW就是工作越多，收益越大。這里的工作解決一個具有計算挑戰性的難題，誰能最快的解出這個難題，誰就能有權利生產區塊。
* **PoS：權益證明**
權益證明機制通過要求用戶將其代幣的一定數量作為質押來實現共識，以便有機會被選中來驗證交易區塊，並因此獲得獎勵。優先權給予在區塊鏈網絡中購買了最多權益的礦工。
權益證明可以解決POW機制中大量計算資源被浪費的情況，根據股權占比來決定出塊權利，股權在區塊鏈系統中指的是鏈原生代幣,可以理解為擁有的代幣數量越多，獲得出塊權的概率越大。
* **DPoS: 委托的權益證明**
委托的權益證明要求持幣人根據持有的代幣投票選出一定數量的代表，來負責生產區塊，這些代表也叫驗證人，負責驗證交易和生產區塊。

## **:scroll:資源**
:page_facing_up: [Byzantine Fault Tolerance](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419) <br></br>
:page_facing_up: [Type of Consensus Mechanisms](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms) <br></br>
:page_facing_up: [Review of Blockchain Consensus Mechanisms](https://blog.wavesplatform.com/review-of-blockchain-consensus-mechanisms-f575afae38f2) <br></br>
:headphones: [Overview and History of Consensus System Development](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/) <br></br>
:green_book: [Understanding Distributed Consensus](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95) <br></br>
:books: [Byzantine Generals Problem](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)
