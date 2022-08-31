# 檢查點


:::info BTTC is not a Layer 1 platform
BTTC 依賴 TRON主網作為其Layer 1層，所有質押機制都需要與 TRON 主網上的合約同步。
:::

Delivery層節點會周期性的驗證Bttc層生產的區塊，包含數個區塊Merkle根的檢查點也會被周期性的提交至TRON/BSC/Ethereum網絡，這種定期提交被稱為檢查點。

在驗證者層中通過Tendermint加權輪回算法來選擇一個提議者，成功提交一個檢查點有如下兩個提交過程：
1. 通過上述Tendermint算法選擇的提議者發送一個檢查點，其中提議者字段中包含該提議者的地址及Merkle hash值。
2. 所有其他提議者在添加Merkle hash值到本地狀態之前，會驗證提議者字段中的數據。

下一個提議者發送一個確認交易，以證明之前的檢查點交易在TRON/BSC/Ethereum網絡上已經成功了。每一個驗證者的變化將由Delivery層上的驗證人節點轉發，
這使得任何驗證人在任何時候都能與TRON/BSC/Ethereu網絡上的BTTC合約狀態保持同步。

TRON/BSC/Ethereu網絡上的BTTC合約數據是最終確認的正確數據，因此所有驗證都是通過查詢 TRON/BSC/以太坊主網合約來完成的。
