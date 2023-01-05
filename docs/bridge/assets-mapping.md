# Assets Mapping

Mapping is an important step in the cross-chain transfer of assets. Mapping is the use of smart contracts on two networks (e.g. TRON and BTTC) to match assets one to the other, facilitating operations such as locking, destroying and transferring.

## Introduction

Assets can be moved between BTTC and public chain such as TRON/ Ethereum/ BSC by using BTTC cross-chain bridge. These assets include standard tokens such as ERC20, ERC721 and other customized tokens.

There are generally two situations for assets mapping. The first is that assets already exist on public chains, and assets need to be mapped to BTTC. Please refer to [Assets Mapping from Public Chains to BTTC](#assets-mapping-from-public-chains-to-bttc)

The other situation is that assets are minted directly on BTTC and need to be moved to other public chain. Please refer to [BTTC Mintable Assets Mapping to Public Chain](#bttc-mintable-assets-mapping-to-public-chain)

## Assets Mapping from Public Chains to BTTC

Applicable to the situation that users have deployed assets contracts on public chains TRON/Ethereum/BSC and need to move them to BTTC.

When the assets on public chain has to be moved to BTTC, once a deposit is initiated from the public chain, the `ChildChainManagerProxy` contract will call the `deposit` method in the child contract to internally mint the tokens on the child chain. When the assets on BTTC need to be withdrawn, `withdraw` method in the child contract will be called to internally burn the tokens on the child chain. These rules ensure the assets between two chains maintain balance.

### Requirements to be satisfied

There are a few steps that have to be strictly followed when users need to move assets from contract deployed on public chain to BTTC.

#### 1. Confirm the deployment of root token contract on public chains

Verify the root token contract deployed on public chain by using Tronscan/Ethscan/Bscscan blockchain explorer.

#### 2. Deploy child token contract on BTTC

For an example of child token contract to be deployed on BTTC, please refer to [`ChildERC20`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildERC20.sol). The child token contract can be customized, but please make sure that `deposit` and `withdraw` method should be present in custom child contract, meanwhile `deposit` can only be called by `ChildChainManagerProxy` contract, with the [address on BTTC mainnet](https://bttcscan.com/address/0x9a15f3a682d086c515be4037bda3b0676203a8ef#code), and the [address on Donau testnet](https://testnet.bttcscan.com/address/0xfe22c61f33e6d39c04de80b7de4b1d83f75210c4#code).

Notice：

- No token minting in constructor of child token contract. In most cases, tokens do not need to be additional issued on BTTC, only `ChildChainManager` contract has authority to internally mint the tokens on BTTC（ `_setupRole(DEPOSITOR_ROLE, childChainManager)` ）.

- For the cases that tokens do not need to be additional issued on BTTC, if deployed child token contract has extra minting authority, please call  `revoke` or `renounce` method to abstain. If the extra autority can not be cancelled, please redeploy the contract. The team from BTTC community will review child token contract, and any extra minting authority will lead to failure, because redundant authorization will bring the risk of additional token issuance. 

#### 3. Submit Mapping Request

In the end, please verify the child token contract on Bttcscan, and submit mapping request [here](https://docs.google.com/forms/d/e/1FAIpQLScsdmIx3Ux_5P8T1ffmoPWipn7XD46GZEz-xbjwGdBrCGoCZg/viewform).

## BTTC Mintable Assets Mapping to Public Chain

### What are BTTC mintable assets?

New assets can be created on BTTC, and moved to public chain when required, such type of assets are called BTTC mintable assets. Compared to token minting on public chain, creation of assets on BTTC saves much fee and is faster which is a more recommended approach. 

When BTTC mintable assets need to be moved to public chain, the assets has to be burned first and a proof of burn transaction has to be submitted on public chain next. The `RootChainManager` contract then calls a special predicate contract `MintableAssetPredicate` internally that directly calls the mint function on public chain and the tokens are minted to the users address.

### Requirements to be satisfied

There are a few steps that have to be strictly followed when users need to create assets on BTTC, and move BTTC mintable assets to public chain.

#### 1. Deploy contract on BTTC

First the mintable assets contract should be deployed on BTTC. For examples of child mintable token contract, please refer to [`ChildMintableERC20`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildMintableERC20.sol) and [`ChildMintableERC721`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildMintableERC721.sol). The contract can be customized, but please make sure that `deposit`, `withdraw` and `mint` method are present in the contract.

Most importantly, the `ChildChainManager` contract on BTTC should be given the `DEPOSITOR_ROLE` in the mintable asset contract deployed on BTTC, and the authority to deposit tokens can  only be called by `ChildChainManagerProxy` contract, with the [address on BTTC mainnet](https://bttcscan.com/address/0x9a15f3a682d086c515be4037bda3b0676203a8ef#code), and the [address on Donau testnet](https://testnet.bttcscan.com/address/0xfe22c61f33e6d39c04de80b7de4b1d83f75210c4#code).

#### 2. Deploy contract on TRON/Ethereum/BSC

Then, the corresponding contract should be deployed on TRON/Ethereum/BSC for withdrawl. For examples of contract, please refer to [`MintableERC20`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/root/RootToken/DummyMintableERC20.sol) and [`MintableERC721`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/root/RootToken/DummyMintableERC721.sol).

Most importantly, the  `MintableAssetPredicateProxy` (e.g.： `MintableERC20PredicateProxy` . Asset represent the asset type, the same as below) contract deployed on TRON/Ethereum/BSC should be given the minter role and have the authorization to mint tokens on public chain.

This role can be granted by calling `grantRole` method in the contract on public chain. The first parameter is the value of `PREDICATE_ROLE` constant which is `0x12ff340d0cd9c652c747ca35727e68c547d0f0bfa7758d2e77f75acef481b4f2`, and the second parameter is the corresponding address of `MintableERC20PredicateProxy` or `MintableERC721PredicateProxy` shown in the list below.


<table>
   <tr>
      <td>Public Chain</td>
      <td>Contract Name</td>
      <td>Contract Address</td>
   </tr>
   <tr>
      <td rowspan="2">TRON Mainnet</td>
      <td>MintableERC20PredicateProxy</td>
      <td>TH6JAd7DNka8Q6oKqkQMWJ6TYdLG6fQ6Kv</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>TEHTjbuQfiJsTb2UdKHjMgmFGwLDqVDNh5</td>
   </tr>
   <tr>
      <td rowspan="2">NILE Testnet</td>
      <td>MintableERC20PredicateProxy</td>
      <td>TUFWVA7fDHhvURrdNm9PS9mCPqx6T7mEPm</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>TNvb1f4dCTsM6WwYQAPfmkqeLg8XcDCBzG</td>
   </tr>
   <tr>
      <td rowspan="2">Ethereum Mainnet</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0x9277a463a508f45115fdeaf22ffeda1b16352433</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0xb932da3a1b3cba3f744edbc55cc1107575c37b6c</td>
   </tr>
   <tr>
      <td rowspan="2">Goerli Testnet</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0x5af2bca15245d534ede87a03c007852e055d4b87</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0xd769079211b69d6cf2e972d480a3809cd0103403</td>
   </tr>
   <tr>
      <td rowspan="2">BSC Mainnet</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0xca266910d92a313e5f9eb1affc462bcbb7d9c4a9</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0x5b0effa5ba0286cfc099724f8df6261215c596f5</td>
   </tr>
   <tr>
      <td rowspan="2">BSC Testnet</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0x5f32098ca8b566f86b09a33e3b13e0da4a58c6c8</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0x9f5684dc39496a9e56114ebf63b7b108df4567b0</td>
   </tr>
</table>

#### 3. Submit Mapping Request

In the end, please verify the child token contract on Bttcscan, and token contract on Tronscan/Ethscan/Bscscan respectivily, and submit mapping request [here](https://docs.google.com/forms/d/e/1FAIpQLScsdmIx3Ux_5P8T1ffmoPWipn7XD46GZEz-xbjwGdBrCGoCZg/viewform).
