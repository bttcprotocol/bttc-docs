# 存款与检查点事件跟踪

## 存款事件

当代币从公共区块链存入BTTC时，状态同步机制开始发挥作用，并最终在BTTC上铸造代币，整个过程需要5-7分钟。由于时间较长，所以监听用户存款事件在此时尤为重要。

## 使用web socket进行存款事件追踪

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

## 在区块链上查询历史存款是否成功

这段代码可以查看特定的一笔存款是否已经完成。两条链上各维护一个不断增加的全局计数器变量。StateSender合约发送带有计数器数值的事件，子链上的计数器数值可以通过StateReceiver合约来查看。如果子链上的计数器数值大于等于主链计数器，则这笔存款可视作成功。

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

### 实时Checkpoint状态检查

BTTC上的所有交易都会定期提交Checkpoint到TRON。检查点发生在TRON上的合约RootChain。

下面是实时监听Checkpoint事件的例子

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
