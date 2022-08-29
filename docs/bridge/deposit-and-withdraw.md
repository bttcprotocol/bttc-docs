# Token Deposit & Withdraw

Using ERC-20 as an example, the process for topping up is:

1. Approve the ERC20Predicate contract, allowing it to control the tokens that need to be deposited.
2. invoke depositFor on the RootChainManager.

The withdrawal process is:

1. Destroy the token on the BTTC. 2.
2. call the exit method on the RootChainManager to submit proof of destruction. This needs to be called after the checkpoint containing the destroyed transaction has been submitted.

## Detailed Process

### Instantiated Contracts

```js
const mainWeb3 = new Web3(mainProvider)
const bttcWeb3 = new Web3(bttcProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new bttcWeb3(childTokenABI, childTokenAddress)
```

### Approve

Approve the contract ERC20Predicate consumption tokens. Approve requires two parameters: address and amount.

```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Deposit

Invoke the depositFor method of the RootChainManager contract. This method takes three parameters: the address of the user receiving the deposit on BTTC, the address of the token contract on the root chain and the amount (in the form of an ABI code).

Please ensure that the correct approve operation has been carried out before making the deposit.

```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Burn/Destroy

Call the withdraw method of the child token contract to destroy the tokens on BTTC. This method accepts a single parameter: the quantity of tokens to destroy. The proof of token destruction must be submitted in the subsequent operation, which means that the hash of the token destruction transaction must be stored.


```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit

To unlock and receive tokens from the ERC20Predicate contract, invoke the RootChainManager contract's exit method. This method accepts a single parameter: the proof of the token's destruction.

Prior to calling this method, you must ensure that the checkpoint containing the destroyed transaction was successfully submitted. The destruction certificate uses RLP encoding rules to generate the following fields:

+ headerNumber: The checkpoint starting block containing the destruction transaction
+ blockProof: Ensure that the block header is the proof of the leaf in the tree where the submitted Merkel root is located
+ blockNumber: contains the block number of the destruction transaction
+ blockTime: contains the block time of the destroyed transaction
+ txRoot: the transaction root of the block
+ receiptRoot: the receipt root of the block
+ receipt: the receipt of the destroyed transaction
+ receiptProof: Merkel root that destroys the transaction receipt
+ branchMask: a 32-bit parameter indicating the position of receipt in the Merkle Patricia Tree
+ receiptLogIndex: log index used to read from receipt

Because manually generating the certificate is inconvenient, we recommend using the BTTC SDK. If you wish to manually send the transaction, set encodeAbi to true to obtain the original call data.

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
