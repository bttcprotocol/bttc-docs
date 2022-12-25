# 存款與檢查點事件跟蹤

## 存款事件

當代幣從公共區塊鏈存入BTTC時，狀態同步機制開始發揮作用，並最終在BTTC上鑄造代幣，整個過程需要5-7分鐘。由於時間較長，所以監聽用戶存款事件在此時尤為重要。

## 使用web socket進行存款事件追蹤

```js
const WebSocket = require("ws");
const Web3 = require("web3");

const ws = new WebSocket("");

const web3 = new Web3();
const abiCoder = web3.eth.abi;

async function checkDepositStatus(
 userAccount,
 rootToken,
 depositAmount,
 childChainManagerProxy
) {
 return new Promise((resolve, reject) => {
   ws.on("open", () => {
     ws.send(
       `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": ${childChainManagerProxy}}]}`
     );

     ws.on("message", (msg) => {
       const parsedMsg = JSON.parse(msg);
       if (
         parsedMsg &&
         parsedMsg.params &&
         parsedMsg.params.result &&
         parsedMsg.params.result.Data
       ) {
         const fullData = parsedMsg.params.result.Data;
         const { 0: syncType, 1: syncData } = abiCoder.decodeParameters(
           ["bytes32", "bytes"],
           fullData
         );

         // check if sync is of deposit type (keccak256("DEPOSIT"))
         const depositType =
           "0x87a7811f4bfedea3d341ad165680ae306b01aaeacc205d227629cf157dd9f821";
         if (syncType.toLowerCase() === depositType.toLowerCase()) {
           const {
             0: userAddress,
             1: rootTokenAddress,
             2: depositData,
           } = abiCoder.decodeParameters(
             ["address", "address", "bytes"],
             syncData
           );

           // depositData can be further decoded to get amount, tokenId etc. based on token type
           // For ERC20 tokens
           const { 0: amount } = abiCoder.decodeParameters(
             ["uint256"],
             depositData
           );
           if (
             userAddress.toLowerCase() === userAccount.toLowerCase() &&
             rootToken.toLowerCase() === rootTokenAddress.toLowerCase() &&
             depositAmount === amount
           ) {
             resolve(true);
           }
         }
       }
     });

     ws.on("error", () => {
       reject(false);
     });

     ws.on("close", () => {
       reject(false);
     });
   });
 });
}

checkDepositStatus("user address", "contract address", "amount", "proxy address")
 .then((res) => {
   console.log(res);
 })
 .catch((err) => {
   console.log(err);
 });
```

## 在區塊鏈上查詢歷史存款是否成功

這段代碼可以查看特定的一筆存款是否已經完成。兩條鏈上各維護一個不斷增加的全局計數器變量。StateSender合約發送帶有計數器數值的事件，子鏈上的計數器數值可以通過StateReceiver合約來查看。如果子鏈上的計數器數值大於等於主鏈計數器，則這筆存款可視作成功。

```js
let Web3 = require("web3");

// For mainnet, use Ethereum RPC
const provider = new Web3.providers.HttpProvider(
 "https://goerli.infura.io/v3/API-KEY"
);
const web3 = new Web3(provider);


const child_provider = new Web3.providers.HttpProvider(
 ""
);

const child_web3 = new Web3(child_provider);

const contractInstance = new child_web3.eth.Contract(
 [
   {
     constant: true,
     inputs: [],
     name: "lastStateId",
     outputs: [
       {
         internalType: "uint256",
         name: "",
         type: "uint256",
       },
     ],
     payable: false,
     stateMutability: "view",
     type: "function",
   },
 ],
 "0x0000000000000000000000000000000000001001"
);

async function depositCompleted(txHash) {
 let tx = await web3.eth.getTransactionReceipt(txHash);
 let child_counter = await contractInstance.methods.lastStateId().call();
 let root_counter = web3.utils.hexToNumberString(tx.logs[3].topics[1]);
 return child_counter >= root_counter;
}

// Param 1 - Deposit transaction hash
depositCompleted(
 "transaction id"
)
 .then((res) => {
   console.log(res);
 })
 .catch((err) => {
   console.log(err);
 });
```

## Checkpoint事件

### 實時Checkpoint狀態檢查

BTTC上的所有交易都會定期提交Checkpoint到TRON。檢查點發生在TRON上的合約RootChain。

下面是實時監聽Checkpoint事件的例子

```js
const Web3 = require("web3");

// Ethereum provider
const provider = new Web3.providers.WebsocketProvider(
 "wss://goerli.infura.io/ws/v3/api-key"
);

const web3 = new Web3(provider);

const chil_provider = new Web3.providers.HttpProvider(
 ""
);
const child_web3 = new Web3(chil_provider);

async function checkInclusion(txHash, rootChainAddress) {
 let txDetails = await child_web3.eth.getTransactionReceipt(txHash);

 block = txDetails.blockNumber;
 return new Promise(async (resolve, reject) => {
   web3.eth.subscribe(
     "logs",
     {
       address: rootChainAddress,
     },
     async (error, result) => {
       if (error) {
         reject(error);
       }

       console.log(result);
       if (result.data) {
         let transaction = web3.eth.abi.decodeParameters(
           ["uint256", "uint256", "bytes32"],
           result.data
         );
         if (block <= transaction["1"]) {
           resolve(result);
         }
       }
     }
   );
 });
}

checkInclusion(
 "burn txid on child chain",
 "RootChainProxy"
)
 .then((res) => {
   console.log(res);
   provider.disconnect();
 })
 .catch((err) => {
   console.log(err);
 });
```
