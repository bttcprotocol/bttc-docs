# Gas Token - BTT

[BitTorrent token(BTT)](https://etherscan.io/token/0xc669928185dbce49d2230cc9b0979be6dc797957) is a cryptocurrency that is the native token of the Bittorrent-Chain (BTTC). Similar to Ether (ETH) to Ethereum, BTT is the engine that powers BTTC. No matter sending BTT or calling the smart contract of BTTC, users need to pay in BTT as gas fee to use the BTTC network. This fee acts as an incentive to reward block producers for processing and validating the action you want to perform.

- On BTTC, BTT tokens are used as native tokens, which means that users can send BTT to other accounts and pay gas fee with BTT, just as users send ETH to other accounts and pay gas fee with ETH on Ethereum.

- The example of how to send BTT tokens from one account to another on BTTC is shown as follows.

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

## Bittorrent-Chain Mainnet

The BTT tokens can be consumed to unlock various applications and services on the BTTC mainnet network. The way to obtain BTT tokens on the BTTC mainnet network is shown as follows.

### Purchase BTT Token

The BTT token can be purchased from the following places:

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

### Get BTT Token by Cross-chain Bridge

 [TronLink](https://www.tronlink.org/) and [MetaMask](https://metamask.io) are the two types of wallet used in the BTTC ecosystem, users can transfer BTT between BitTorrent Chain and TRON/ Ethereum/ BSC through 
BTTC cross-chain bridge.


Please refer to the [wallet instructions](https://doc.bt.io/docs/wallet) and pay attention to setting the network as the mainnet.

Congratulations, then you can interact with the BTTC mainnet.

## Bittorrent-Chain Donau Testnet

Getting the BTT tokens on the Donau testnet is really easy, users can deposit BTT tokens from the [faucet](https://testfaucet.bt.io/#/) smart contract deployed on Donau testnet.

Ways to get BTT tokens from faucet for Donau testnet:

- Choose Bittorrent-chain Donau testnet
- Choose BTT token
- Enter your account address and confirm

Users can also use [TronLink](https://www.tronlink.org/) and [MetaMask](https://metamask.io) to interact with Donau testnet.

Please refer to the [wallet instructions](https://doc.bt.io/docs/wallet) and pay attention to setting the network as the Donau testnet.
