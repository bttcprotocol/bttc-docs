# What is Relayer
Relayer is a kind of automatic cross-chain assets withdrawal service on Bittorrent Chain (BTTC).  After users send an order to transfer assets from BTTC to another block chain, relayer will automatically help users complete the withdrawal operation.

In the case of not using relayer service, users submit a requirement to transfer assets from BTTC to another block chain, and after waiting for about 15-30 minutes,when the assets reach the target chain, the users need to trigger the cross-chain `Bridge Contract` on the target chain to withdraw assets. Because calling the contract needs to pay the gas fee, the users usually need to create an account on the target chain in advance, and ensure that there are enough native tokens in the account of the target chain to pay the gas fee for withdrawing assets from the cross-chain `Bridge Contract`.

In the case of using relayer service on the other hand, when the assets reach the target chain, relayer will help users withdraw the assets from cross-chain `Bridge Contract` to the users' `Receiver Address`, simplifying the users cross-chain operations.

## How Relayer Works
The mechanism of Relayer is shown as follows:

![](../../../static/img/relayer-en.png)


As shown in the figure above, when users submit an asset cross-chain transfer request from BTTC to Ethereum on [bt.io](https://bt.io), they can select Fast mode or Classic mode. If they select Classic mode,meaning not using Relayer service, [bt.io](https://bt.io) will directly call the cross-chain `Bridge Contract` to execute cross-chain operations, after assets reach the cross-chain `Bridge Contract` on Ethereum chain, users need to manually call the cross-chain `Bridge Contract` to withdraw the asset to the `Receiver Address`.

If the users select Fast mode, meaning using Relayer service, the users can select an appropriate Relayer provider according to the fee quotation, then the cross-chain asset will be first transferred to Relayer contract, the Relayer contract will divide the asset, transfer one part of the cross-chain asset to the Relayer provider as service fee, and then call the `Bridge Contract` to transfer the remaining part to `Bridge Contract` for cross-chain operation.

Since the users have appointed the `Receiver Address` when submitting the cross-chain request on BTTC chain, the `Receiver Address` will be included in the cross-chain message to reach Ethereum together, anybody can call the `Bridge Contract` to extract the assets, but assets can only be transferred to the `Receiver Address` in the message. After the Relayer submit the cross-chain request, the service program deployed by Relayer provider will listen to the cross-chain event, when the assets reach Ethereum chain, the Relayer service program will automatically call the cross-chain contract on Ethereum by an external account to withdraw the assets to the `Receiver Address`, and meanwhile pay the gas fee by this external account.

When the users select Fast mode, they can choose to convert a small amount of transferred assets into the corresponding target chain gas fee, so as to meet the scenario where the user needs to pay the gas fee to make a transfer after receiving the cross-chain assets on the target chain. Relayer will bear the additional costs caused by exchange rate fluctuations.



## Apply to Become a Relayer

[bt.io](https://bt.io) has opened the Relayer application channel, everyone can apply to become a Relayer to help users accomplish cross-chain transaction and earn the service fee as income at the mean time. The Relayer can set the service fees according to its own operation cost and the withdrawl gas fee on target chain. Users will choose a Relayer based on factors such as the service fee, stability and user evaluation.

Before applying to become a Relayer, first prepare an idle server to deploy the Relayer service program, please refer to: [Deploying the Relayer Service](https://doc.bt.io/docs/bridge/relayer/relayerdeploy)

Then, prepare a deposit of at least 25 billion BTT on the BTTC mainnet. The deposit needs to remain in the mortgage state during the working period of the Relayer. To apply to become a relayer and pledge a deposit, please refer to: [Apply to Become a Relayer](https://bt.io/relayer-apply).

If a Relayer no longer participates in the BTTC network, application to quit can be made at any time. And the deposit can be withdrawn after succesful quitting, please refer to: [Quitting the Relayer and Withdrawing the Deposit](https://doc.bt.io/docs/bridge/relayer/relayerwithdraw).

### Relayer Reward

The service fee paid by users for the Relayer service will all be sent to the Relayer account as a reward in real time by smart contract. 

Now the Relayer service charges 120% of the original cross-chain transfer gas fee, the Relayer service deducts part of users' cross-chain assets as service fee, the actual deduction amount is calculated as follows:

```
 (cross-chain gas fee / cross-chain token unit price) * 120% 
```

Relayer service will charge the current cross-chain tokens, that is, what kind of cross-chain token is transferred and what kind of token is charged, when calculating the service fee, the gas fee and cross-chain service fee will be converted into the same price unit for calculation.

### Reserve Gas Fee

After the Relayer application is approved, the new Relayer can start accepting orders. In the process of dealing with orders, the Relayer needs to call smart contracts to help users accomplish receiving cross-chain assets. Because calling smart contracts will consumes a certain amount of gas as transaction fee, it is recommended that the Relayer prepare enough gas or balance to cope with such gas consumption before accepting orders. The recommended reserved gas fee:

| Blockchain | Recommended Reserved Gas Fee | 
| -------- | -------- |
| TRON   |   50,000 TRX or equivalent resource (Energy & Bandwidth)   |
| Ethereum   | 5 ETH  |
| BSC  |1 BNB  |


If the order fails to be completed due to lack of gas fee etc., the Relayer will be deducted a certain amount of deposit, which will also lead to a decrease in the order completion rate. The system will not recommend Relayers with successful order completion rate lower than 60% to users.

### Punishment Rule

If the Relayer can not complete a order within the specified time, it needs to be deducted a certain amount of deposit as a penalty. The penalty amount is calculated by first obtaining the larger value between Relayer charge fee and transaction fee consumed by helping the users accomplish cross-chain transaction, and then multiply the value by the penalty factor A, which is set 1.3 currently.

The form of punishment is to trigger the smart contract to deduct the deposit directly on the BTTC network. When the deposit balance is lower than 5 billion BTT, the Relayer can not accept orders any more due to insufficient deposit. When the deposit balance is added to 5 billion BTT or more, the order will be automatically resumed.

### Order Amount Limit

Relayer needs to have enough deposit to be able to accept orders, and the amount of deposit determines the amount of orders a Relayer can accept. The amount of orders a Relayer can accept is calculated as follows:

```
deposit amount - minimum deposit amount / penalty factor / largest cost of an order
```
Currently，the minimum deposit amount is 5 billion BTT, the penalty factor is 1.3, and the largest cost of an order is 3.6 million BTT. 
