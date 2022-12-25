import useBaseUrl from '@docusaurus/useBaseUrl';

# Bittorrent-Chain架構
Bittorrent-Chain(BTTC)網絡是一個區塊鏈應用平台，從架構上看，BTTC的魅力在於其優雅的設計，它有一個通用的共識層，與執行層分離開來。


為了在BTTC上使用PoS機制，在TRON網絡上部署了一套**質押**管理合約，另外還有一組受到激勵的驗證人，運行著**Delivery**和**Bttc層**節點。TRON、BSC、Ethereum是BTTC支持的第一批基礎鏈，但BTTC打算根據社區的建議和共識，提供對其他基礎鏈的支持，以實現一個可互操作的去中心化第二層區塊鏈平台。

BTTC PoS有一個三層的架構：

1. 部署在TRON網絡上的質押管理合約
2. Delivery(PoS層)
4. Bttc (區塊生產層)

## BTTC智能合約（部署在TRON網絡）

BTTC在TRON網絡上維護著一組智能合約，它處理以下內容：

- Delivery層的質押管理
- 委托管理
- 側鏈狀態的檢查點/快照

## Delivery (PoS層)

**Delivery**是PoS驗證器節點，與TRON上的Staking合約協同工作，在BTTC網絡上實現PoS機制，Delivery基於Tendermint共識引擎，同時修改來了簽名方案和各種數據結構來實現。Delivery負責區塊驗證、Bttc層區塊生產者的選擇、代表Bttc層狀態的檢查點的驗證和提交以及其他各種責任。

Delivery層將 Bttc層生產的區塊聚合成一棵默克爾樹，並定期將默克爾根發布到TRON鏈，這種定期發布稱為檢查點。 對於Bttc上的每幾個塊，Delivery層上的驗證器會：

1. 驗證自上次檢查點以來的所有塊
2. 創建一個區塊哈希值的Merkle樹
3. 將merkle根發布到TRON/BSC/Ethereum主鏈上

檢查點的重要性在於兩個原因：

1. 在TRON/BSC/Ethereum主鏈上提供Bttc側鏈的最終結果
2. 提供Bttc側鏈提取資產到主鏈的燃燒證明

這個過程可以理解為：

- 從池子里選出一個活躍的驗證者集合，作為Bttc層區塊生產者，區塊生產者的選擇也將由至少2/3的人同意。這些區塊生產者負責創建區塊並將其廣播到網絡。
- 一個檢查點包括在任何給定間隔內創建的所有塊的根。所有的節點都會對其進行驗證，並將其簽名附在上面。
- 一個從驗證者集合中選出的提議者負責收集特定檢查點的所有簽名，並將其提交給主鏈。
- 創建區塊和提出檢查點的責任取決於驗證者在整個池中的股權比例。

## Bttc (區塊生產者層)

Bttc是BTTC區塊生產者層, 負責將交易聚集成區塊。

區塊生產者通過Delivery上的委員會定期選舉。區塊是在**Bttc**層節點上產生的，Bttc層的虛擬機與EVM兼容，在Bttc上生產的區塊也會被Delivery層的驗證人定期驗證，由Bttc上一組區塊Merkle樹哈希組成的檢查點會定期被提交給TRON/BSC/Ethereum主網。
