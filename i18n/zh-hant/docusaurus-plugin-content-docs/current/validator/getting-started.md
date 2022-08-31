# 驗證人
驗證者是維護BTTC網絡的關鍵角色，驗證者運行一個完整的節點並通過質押 BTT來生產區塊、驗證和參與PoS共識來保證網絡安全運行。

:::info
目前不接受新的驗證人申請，只有當前活躍的驗證者解綁時，新的驗證者才能加入。

未來將推出拍賣機制來進行驗證人替換。
:::

BTTC網絡由以下三層構成：
* 質押合約層 - 一組部署在TRON/BSC/Ethereum區塊鏈網絡上的智能合約，支持用戶通過存取款的方式將代幣從TRON/BSC/Ethereum鏈轉移到BTTC，其中部署在TRON網絡的合約支持質押功能。
* 驗證者層 - 一條POS共識的鏈，基於 Tendermint實現，具體職責如下：
    - 監控部署在TRON主網上的質押合約
    - 驗證BTTC層的所有狀態轉換
    - 將驗證者層的狀態檢查點提交到TRON/BSC/Ethereum網絡
* Bttc層 - 一條Ethereum兼容鏈，有一組負責出塊的節點，這些節點客戶端基於Geth實現，Bttc層生產的區塊會被驗證者層驗證確認。


成為BTTC網絡一個驗證者，你必須運行：
- Sentry節點 — 兩台機器分別運行驗證者層的節點和Bttc層的節點，Sentry節點與網絡中其他節點連通交互。
- Validator節點 — 兩台機器分別運行驗證者層的節點和Bttc層的節點，Validator節點只和Sentry節點交互，與網絡中其他節點沒有連接。
- 在TRON網絡的質押合約中質押足夠數量的BTT代幣。


下面與驗證人相關的主題：
* [驗證人職責](/docs/validator/responsibilities)
* [運行驗證人節點](/docs/node/build-validator-node)
* [修改驗證人傭金比例](/docs/validator/rewards)
* [獎勵](/docs/validator/validator-commission-operations)
