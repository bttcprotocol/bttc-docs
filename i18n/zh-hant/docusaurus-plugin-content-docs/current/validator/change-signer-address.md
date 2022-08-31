# Change Your Signer Address

For information on what a [signer address](/docs/validator/glossary#signer-address) is, see 
[Key Management](/docs/validator/core-components/key-management).

## Prerequisites

Make sure your new validator node is fully synced and is running with the new signer address.

## Change the signer address

This guide refers to your current validator node as Node 1 and your new validator node as Node 2.

1. Log in to the [staking dasboard](https://wallet.polygon.technology/staking/) with the Node 1 address.
1. On your profile, click **Edit Profile**.
1. In the *Signer's address* field, provide the Node 2 address.
1. In the *Signer's public key* field, provide the Node 2 public key.

   To get the public key, run the following command on the validator node:

   ```sh
   heimdalld show-account
   ```

Clicking **Save** will save your new details for your node. This essentially means that Node 1 will be your address that controls the stake, where the rewards will be sent to, etc. And Node 2 will now be performing activities like signing blocks, signing checkpoints, etc.
