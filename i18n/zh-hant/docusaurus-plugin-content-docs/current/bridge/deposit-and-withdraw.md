# 代幣充提

此處以ERC-20為例，充值的流程是：

1. Approve ERC20Predicate合約，允許它控制需要被存入的代幣。
2. 在RootChainManager上調用depositFor。

提取的流程是：

1. 在BTTC上銷毀代幣。
2. 在RootChainManager上調用exit方法，以提交銷毀證明。需要在包含此銷毀交易的checkpoint提交之後調用。

## 詳細流程

### 實例化合約

```js
const mainWeb3 = new Web3(mainProvider)
const bttcWeb3 = new Web3(bttcProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new bttcWeb3(childTokenABI, childTokenAddress)
```

### Approve

批準合約ERC20Predicate消費代幣。approve需要兩個參數：地址和金額。

```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### 存款

調用RootChainManager合約的depositFor方法。這個方法需要接收三個參數：BTTC上接收存款的用戶地址，代幣合約在根鏈上的地址以及金額（以ABI編碼形式體現）。

請在存款之前，確保已經進行過正確的approve操作。

```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### 燃燒/銷毀

通過調用子代幣合約的withdraw方法來銷毀BTTC上的代幣。這個方法接收一個參數：要銷毀的代幣數量。銷毀代幣的證明需要在下一步操作中提交，因此要儲存銷毀交易的哈希。

```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### 退出

調用RootChainManager合約的exit方法來解鎖並從ERC20Predicate合約接收代幣。這個方法接收一個參數：代幣的銷毀證明。

調用這個方法之前必須要等待包含銷毀交易的checkpoint提交成功。銷毀證明由RLP編碼生成如下字段：

* headerNumber：包含銷毀交易的checkpoint起始塊
* blockProof：確保區塊頭是提交的默克爾根所在樹中葉子的證明
* blockNumber：包含銷毀交易的區塊號
* blockTime：包含銷毀交易的區塊時間
* txRoot：區塊的交易根
* receiptRoot：區塊的receipt root
* receipt：銷毀交易的receipt
* receiptProof：銷毀交易receipt的默克爾根
* branchMask：表示receipt在Merkle Patricia Tree中位置的一個32位參數
* receiptLogIndex：用於從receipt中讀取的日志索引

手動生成證明很覆雜，因此我們建議使用BTTC SDK。如果您想手動發送交易，請將encodeAbi置為true以獲取原始調用數據。

```js
const exitCalldata = await bttcPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
