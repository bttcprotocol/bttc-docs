import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Network Details

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'BTTC-Mainnet', value: 'mainnet', },
    { label: 'BTTC-Testnet', value: 'donau', },
  ]
}>

<TabItem value="mainnet">
BTTC is a layer-2 network of TRON/BSC/Ethereum network. The following is the network structure of the BTTC mainnet:

![](../../static/img/network-1.png)

## BTTC Network
* Network Name: BitTorrent Chain Mainnet
* RPC URL 1: https://rpc.bt.io
* RPC URL 2: https://bttc.trongrid.io
* ChainID: `199`
* Symbol: BTT
* Block Explorer 1: https://bttcscan.com
* Block Explorer 2: https://scan.bt.io
* Data Snapshots Download: https://snapshots.bt.io

### BTTC Infrastructure Providers
You can also use other infrastructure providers' RPC services:
- [GetBlock](https://getblock.io/nodes/bttc/)
- [Ankr](https://www.ankr.com/rpc/bttc)
- [dRPC](https://drpc.org/chainlist/bittorrent)

## ETH Network
* Network Name: Ethereum Mainnet
* RPC URL: https://mainnet.infura.io/v3
* ChainID: `1`
* Symbol: ETH
* Block Explorer: https://etherscan.io

## BSC Network
* Network Name: Binance Smart Chain
* RPC URL: https://bsc-dataseed.binance.org
* ChainID: `56`
* Symbol: BNB
* Block Explorer: https://bscscan.com

## TRON Network
The access to the TRON netowrk requires the Tronlink Chrome plug-in.

After logging in to the Tronlink wallet, users need to switch to mainnet.
* RPC URL：https://api.trongrid.io
* Block Explorer：https://tronscan.org






</TabItem>
<TabItem value="donau">

BTTC is a layer-2 network of TRON/BSC/Ethereum network. The following is the network structure of the BTTC testnet:
![](../../static/img/network-2.png)

## BTTC Donau Testnet
Access to the BTTC Donau test network requires the use of the Metamask wallet, to which a custom RPC network is added with the following parameters:
* Network Name: BitTorrent Chain Donau
* RPC URL: https://pre-rpc.bt.io
* ChainID: `1029`
* Symbol: BTT
* Block Explorer 1: https://testscan.bt.io
* Block Explorer 2: https://testnet.bttcscan.com
* WebSocket: wss://pre-rpc.bt.io:8546
* Data Snapshots Download: https://test-snapshots.bt.io


## ETH Goerli Testnet
To access the Goerli Testnet, you need to use the Metamask wallet, add a custom RPC network in the Metamask wallet, the detailed operation process can be referred to: [Metamask link Goerli network](https://mudit.blog/getting-started-goerli-testnet), with the following parameters:
* Network Name：Goerli - Testnet
* RPC URL：https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
* ChainID：`5`
* Symbol：ETH
* Block Explorer：https://goerli.etherscan.com


## BSC Testnet
To access the BSC Testnet, you need to use the Metamask wallet. Add a custom RPC network to the Metamask wallet, the detailed operation procedure can be found at: [Metamask connect to BSC network](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain), with the following parameters
* Network Name：Binace Smart Chain - Testnet
* RPC URL：https://data-seed-prebsc-1-s1.binance.org:8545/
* ChainID：`97`
* Symbol：BNB
* Block Explorer：https://testnet.bscscan.com


## TRON Nile Testnet

The access to the TRON Nile testnet requires the Tronlink Chrome plug-in, and Tronlink already supports Nile.

After logging in to the Tronlink wallet, users need to switch to the Nile testnet, apply for a test coin through the faucet with a Tronlink account to complete the Nile testnet environment configuration.
* Official Website：https://nileex.io
* Block Explorer：https://nile.tronscan.org

</TabItem>
</Tabs>
