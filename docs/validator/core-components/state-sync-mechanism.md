# State Sync Mechanism

Validators on the Delivery layer pick up the StateSynced event and pass the event on to the Bttc layer. 

The **receiver contract** inherits IStateReceiver, and custom logic sits inside the onStateReceive function.

Things required from dapps/users to work with state-sync are:

1. Call the syncState function.
2. The `syncState` function emits an event called `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. All the validators on the Delivery chain receive the `StateSynced` event. Any validator that wishes to get the transaction fee for the state sync sends the transaction to Delivery.
4. Once the `state-sync` transaction on Delivery is included in a block, it is added to the pending state-sync list.
5. After every sprint on Bttc layer, the Bttc node fetches the pending state-sync events from Delivery via an API call.
6. The receiver contract inherits the `IStateReceiver` interface, and custom logic of decoding the data bytes and performing any action sits inside the onStateReceive function.
