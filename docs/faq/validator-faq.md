# Validator FAQ

### 1. How to set up a validator node on the mainnet?

See [Validator Overview]( https://doc.bt.io/docs/validator/getting-started).

### 2. How can a new Validator replace an existing one?

There is limited space for accepting new validators. New validators can only join the active set when a currently active validator unbonds.

A new auction process for validator replacement will be rolled out.

### 3. Can I start bttc before delivery is completely synced?

No, you cannot. If you start your bttc without delivery being completely synced, you face issues on your bttc.

### 4. Validator delivery is unable to connect to peers

This typically means that your sentry delivery is running into issues. Check your sentry delivery and see if the service is running fine. If the service is stopped, then restarting the service on your sentry should resolve this issue. Similarly, after fixing your sentry, a restart of your delivery service should also resolve the problem.

### 5. delivery shows "Error: Wrong Block.Header.AppHash. Expected xxxx"
This error usually occurs when delivery service is stuck on a block and there is no rewind option available on delivery.

Solution: 

- Reset delivery completely
- Sync from the snapshot again

### 6. It is not clear which private Key I should add when I generate a validator key

The private key to be used is your wallet's address where your BTT tokens are stored.

### 7. Are the private keys the same for delivery and bttc keystore?

Yes, the private key used for generating the validator keys and bttc keystore are the same. 




