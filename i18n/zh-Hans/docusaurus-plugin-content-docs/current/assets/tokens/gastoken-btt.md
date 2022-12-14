# BTT 代币

[BitTorrent(BTT) 代币](https://etherscan.io/token/0xc669928185dbce49d2230cc9b0979be6dc797957)是一种加密货币，它是 Bittorrent-Chain(BTTC) 的原生代币。类似以太币 Ether(ETH) 之于以太坊 Ethereum ，BTT 是 BTTC 的引擎，为其提供动力。无论是发送 BTT 还是调用 BTTC 的智能合约，都需要用 BTT 支付费用才能使用 BTTC 网络。这种费用作为激励措施，奖励对您要执行的操作进行处理和验证的区块生产者。

* 在 BTTC 上，BTT 代币作为原生代币，意味着用户可以发送 BTT 给其他账户和用 BTT 支付汽油费，正如在Ethereum上用户发送 ETH 给其他账户和用 ETH 支付汽油费。

* 下面的例子展示了如何在 BTTC 上从一个账户向另一个账户发送 BTT 代币。

    ```javascript
    let Web3 = require("web3");

    // Replace value of rpc with https://pre-rpc.bt.io/ for Donau
    // Or let rpc = "https://bttc.trongrid.io";
    let rpc = "https://rpc.bt.io";

    const provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(provider);

    // Add your private key
    web3.eth.accounts.wallet.add("pvt-key");

    // Send 10 BTT
    web3.eth
  .sendTransaction({
    from: "your address",
    to: "to address",
    value: web3.utils.toWei("10", "ether"),
    gas: 8000000,
  })
  .then(function (receipt) {
    console.log(receipt);
  });
  ```

## Bittorrent-Chain 主网网络

拥有 BTT 能够获得 BTTC 主网网络丰富的应用和服务。下面介绍如何在 BTTC 主网网络获取 BTT 代币。

### 购买 BTT 代币

BTT 能够从下列地方购买：

- [Binance](https://www.binance.com/en-GB)
- [OKEx](https://www.okx.com)
- [BITTREX](https://global.bittrex.com)
- [Huobi](https://www.huobi.com/en-us/)
- [bithumb](https://www.bithumb.com/)
- [HitBTC](https://hitbtc.com)
- [BITFINEX](https://www.bitfinex.com)
- [KuCoin](https://www.kucoin.com)
- [UPbit](https://upbit.com/home)
- [Gate.io](https://www.gate.io)
- [COINTIGER](https://www.cointiger.com/en-us/#/index)
- [bitbns](https://bitbns.com)
- [SunSwap](https://sunswap.com/#/home)
- [CoinSpot](https://www.coinspot.com.au)
- [CoinEx](https://www.coinex.com)
- [abcc](https://abcc.com/en)
- [BitForex](https://www.bitforex.com)
- [changelly](https://changelly.com)
- [DigiFinex](https://www.digifinex.com)
- [Bitpie](https://bitpie.com)
- [BitMax](https://ascendex.com/en)
- [BitMart](https://www.bitmart.com)
- [ExShell](https://www.exshell.com)
- [AnyBit](https://www.anybit.io)
- [changehero](https://changehero.io)
- [BigONE](https://www.bigone.com/en)
- [exmo](https://exmo.com)
- [TRUST](https://trustwallet.com)
- [kraken](https://www.kraken.com/)

### 充值到 BTTC 主网钱包

[TronLink](https://www.tronlink.org/) 和 [MetaMask](https://metamask.io) 是BTTC生态中使用的两种钱包，用户可以通过BTTC跨链桥在TRON/ Ethereum/ BSC之间转移BTT代币。

请参考两种钱包的[使用方法](https://doc.bt.io/docs/wallet)，注意将网络设置为主网。

恭喜您，之后就可以通过消费 BTT 使用 BTTC 主网的丰富应用和服务。

## Bittorrent-Chain 测试网络

从 Donau 测试网络获取 BTT 代币十分容易，用户可以通过从部署在 Donau 上的[水龙头](https://testfaucet.bt.io/#/)智能合约提取。

从水龙头获取 Donau 测试网 BTT 代币的方法如下：

- 选择 Donau 测试网
- 选择 BTT 代币
- 输入钱包地址并点击确认

用户可以同样使用[TronLink](https://www.tronlink.org/)和[MetaMask](https://metamask.io) 两种钱包与 Donau 测试网交互。

请参考两种钱包的[使用方法](https://doc.bt.io/docs/wallet)，注意将网络设置为测试网。
