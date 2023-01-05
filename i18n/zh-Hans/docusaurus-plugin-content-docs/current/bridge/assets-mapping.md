# 资产映射

映射是资产跨链转移的重要步骤。所谓映射，就是利用两个网络（比如 TRON 和BTTC）上的智能合约进行资产的一一对应，便于诸如锁定、销毁以及转移等操作。

## 介绍

资产可以使用 BTTC 跨链桥在 BTTC 与 TRON/ Ethereum/ BSC 等公链之间来回转移。这些资产包括 ERC20、ERC721 等标准代币和其他自定义代币。

资产映射一般会有两种情况，第一种是资产已经预先存在其他公链上，需要将资产映射到 BTTC 上，请参考 [资产合约从其他公链映射到 BTTC](#资产合约从其他公链映射到-bttc)。

另一种情况是在 BTTC 上直接创建代币，并需要将其转移到其他公链上，请参考[在 BTTC 铸造资产映射到其他公链](#在-bttc-铸造资产映射到其他公链)。


## 资产合约从其他公链映射到 BTTC

适用于您已经在其他公链 TRON/ Ethereum/ BSC 上部署了资产合约，希望将其转移到 BTTC 的情况。

当其他公链的资产转移到 BTTC 时，每当从其他公链发起存款时，`ChildChainManagerProxy` 合约将调用 `deposit` 在内部铸造子链上的代币。在 BTTC 取款时， `withdraw` 将被调用在内部燃烧子链上的代币。这些方法保证资产在两条链的平衡。

### 需要满足的要求

在其他公链部署的资产合约，向 BTTC 转移资产时，需要满足特定的要求。

#### 1. 确保在其他公链部署根代币

在 Tronscan/ Ethscan/ Bscscan 区块链浏览器验证根代币合约地址。

#### 2. 在 BTTC 上部署子代币合约

在 BTTC 上部署子代币合约的示例，请参考 [`ChildERC20`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildERC20.sol)。子代币合约可以自定义更改，但需要确保有 `deposit` 以及 `withdraw` 方法，且其中 `deposit` 只能被 `ChildChainManagerProxy` 合约调用，查看该合约的[主网地址](https://bttcscan.com/address/0x9a15f3a682d086c515be4037bda3b0676203a8ef#code)和[测试网地址](https://testnet.bttcscan.com/address/0xfe22c61f33e6d39c04de80b7de4b1d83f75210c4#code)。

注：

- 子代币合约的构造函数中没有代币铸造。多数情况下，代币无需在BTTC上增发，仅 `ChildChainManager` 合约拥有该代币在BTTC上的铸币权（即 `_setupRole(DEPOSITOR_ROLE, childChainManager)` ）。

- 对于无需在 BTTC 上增发的代币，若已经部署且授权其他合约铸币权，可以通过调用 `revoke` 或 `renounce` 方法放弃权限，如果无法放弃权限，请重新部署合约。社区团队将会审核子代币合约是否有多余的铸币权，任何多余的铸币权都会导致审核失败，因为多余的授权会带来增发的风险。

#### 3. 提交映射请求

最后，请在 Bttcscan 验证子代币合约地址，在[这里](https://docs.google.com/forms/d/e/1FAIpQLScsdmIx3Ux_5P8T1ffmoPWipn7XD46GZEz-xbjwGdBrCGoCZg/viewform)提交映射请求。

## 在 BTTC 铸造资产映射到其他公链
### 什么是 BTTC 可铸造资产

在 BTTC 上直接创建代币，并在需要时将其转移到其他公链上，这种代币被称为 BTTC 可铸造资产。与其他公链相比，在 BTTC 上发行代币手续费较低，且速度更快,是一种更值得推荐的方法。

当 BTTC 的可铸造资产转移到其他公链时，必须先在 BTTC 上销毁该代币，并在其他公链上提交此次的销毁证明。`RootChainManager` 合约在内部调用一个特殊的合约，它能直接在其他公链上调用代币的铸造方法，并将代币铸造到用户地址。这个特殊的合约是 `MintableAssetPredicate`。

### 需要满足的要求

在 BTTC 上铸造可向其他公链转移的资产，需要满足特定的要求。

#### 1. 在 BTTC 上部署合约

首先需要在 BTTC 上部署可铸造资产合约，子合约示例请参考 [`ChildMintableERC20`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildMintableERC20.sol) 和 [`ChildMintableERC721`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildMintableERC721.sol)，您可以进行自定义更改，但请确保存在 `deposit` , `withdraw` 和 `mint` 函数。

最重要的是，在 BTTC 上部署的可铸造资产合约中，应该给 BTTC 上的 `ChildChainManagerProxy` 合约赋予 `DEPOSITOR_ROLE` 角色。只有这个合约拥有 BTTC 上的铸币权，查看该合约的[主网地址](https://bttcscan.com/address/0x9a15f3a682d086c515be4037bda3b0676203a8ef#code)和[测试网地址](https://testnet.bttcscan.com/address/0xfe22c61f33e6d39c04de80b7de4b1d83f75210c4#code)。

#### 2. 在 TRON/ Ethereum/ BSC 上部署合约

接下来，需要在提取资产的 TRON/ Ethereum/ BSC 上部署合约，以实现能够将 BTTC 铸造的资产提取到 TRON/ Ethereum/ BSC ，合约示例请参考 [`MintableERC20`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/root/RootToken/DummyMintableERC20.sol) and [`MintableERC721`](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/root/RootToken/DummyMintableERC721.sol)。

最重要的是，在 TRON/ Ethereum/ BSC 上部署的资产合约需要指定对应的 `MintableAssetPredicateProxy` (例如： `MintableERC20PredicateProxy` 。Asset表示资产类型，下同) 合约被赋予铸币者角色。只有该合约有权在 TRON/ Ethereum/ BSC 链上铸币。

这个角色可以通过调用其他公链上代币合约的 `grantRole` 方法来赋予。第一个参数是 `PREDICATE_ROLE` 常量值，即 `0x12ff340d0cd9c652c747ca35727e68c547d0f0bfa7758d2e77f75acef481b4f2` ，第二个参数是相应的 `MintableERC20PredicateProxy`  或 `MintableERC721PredicateProxy` 地址如下所示。


<table>
   <tr>
      <td>公链网络</td>
      <td>合约名称</td>
      <td>合约地址</td>
   </tr>
   <tr>
      <td rowspan="2">TRON 主网</td>
      <td>MintableERC20PredicateProxy</td>
      <td>TH6JAd7DNka8Q6oKqkQMWJ6TYdLG6fQ6Kv</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>TEHTjbuQfiJsTb2UdKHjMgmFGwLDqVDNh5</td>
   </tr>
   <tr>
      <td rowspan="2">NILE 测试网</td>
      <td>MintableERC20PredicateProxy</td>
      <td>TUFWVA7fDHhvURrdNm9PS9mCPqx6T7mEPm</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>TNvb1f4dCTsM6WwYQAPfmkqeLg8XcDCBzG</td>
   </tr>
   <tr>
      <td rowspan="2">Ethereum 主网</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0x9277a463a508f45115fdeaf22ffeda1b16352433</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0xb932da3a1b3cba3f744edbc55cc1107575c37b6c</td>
   </tr>
   <tr>
      <td rowspan="2">Goerli 测试网</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0x5af2bca15245d534ede87a03c007852e055d4b87</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0xd769079211b69d6cf2e972d480a3809cd0103403</td>
   </tr>
   <tr>
      <td rowspan="2">BSC 主网</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0xca266910d92a313e5f9eb1affc462bcbb7d9c4a9</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0x5b0effa5ba0286cfc099724f8df6261215c596f5</td>
   </tr>
   <tr>
      <td rowspan="2">BSC 测试网</td>
      <td>MintableERC20PredicateProxy</td>
      <td>0x5f32098ca8b566f86b09a33e3b13e0da4a58c6c8</td>
   </tr>
   <tr>
      <td>MintableERC721PredicateProxy</td>
      <td>0x9f5684dc39496a9e56114ebf63b7b108df4567b0</td>
   </tr>
</table>

#### 3. 提交映射请求

最后，请相应地在 Bttcscan 和 Tronscan/ Ethscan/ Bscscan 区块链浏览器验证两个合约地址，在[这里](https://docs.google.com/forms/d/e/1FAIpQLScsdmIx3Ux_5P8T1ffmoPWipn7XD46GZEz-xbjwGdBrCGoCZg/viewform)提交映射请求。
