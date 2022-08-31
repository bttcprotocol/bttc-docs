# 狀態同步機制
Delivery層的驗證器監聽TRON/BSC/Ethereum的 StateSynced 事件並將該事件傳遞給 Bttc 層。

接收者合約繼承 IStateReceiver，自定義邏輯位於 onStateReceive 函數中。

dapps/用戶使用狀態同步機制需要做的事情是：
1. 調用`syncState`函數。
2. `syncState`函數發出一個名為`StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)`的事件；
3. Delivery 層的的所有驗證者都會收到 `StateSynced` 事件。 任何希望獲得狀態同步交易費用的驗證者都會將交易發送給 Delivery。
4. 一旦 Delivery 上的狀態同步交易被包含在一個區塊中，它就會被添加到待處理狀態同步列表中。
5. 在 Bttc 層的每個 sprint 之後，Bttc 節點通過 API 調用從 Delivery 中獲取待處理的狀態同步事件。
6. 接收者合約繼承 `IStateReceiver` 接口，解碼數據字節和執行任何操作的自定義邏輯位於 `onStateReceive` 函數中。
