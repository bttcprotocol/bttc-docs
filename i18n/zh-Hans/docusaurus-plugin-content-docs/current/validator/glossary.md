# 词汇表

## 区块生产者

区块生产者是从所有活跃的[验证人](#validator)中选出，负责一个[跨度](#span)中的区块生产。

区块生产者负责创建区块并将区块广播到网络上。


## 检查点交易

检查点交易是一个包含[Bttc](#bttc)层在检查点间隔期间所有区块的Merkle根的交易。

该交易将由[Delivery](#delivery)节点提交至TRON/BSC/Ethereum主网上的BTTC合约。

## 佣金

佣金比例是[验证人](#validator)与[委托人](#delegator)获得奖励的百分占比。

## 委托人

委托人无需运行节点，他们可以将BTT代币投票给[验证人](#validator)，并根据比例获得奖励。委托人在系统中对BTTC网络安全的维护有至关重要的作用。

## 全节点

全节点是一个同时运行[Delivery](#Delivery)和[Bttc](#bttc)的 [sentry节点](#sentry)。

参见[全节点部署](/docs/node/build-fullnode)。

## Sentry

Sentry节点同时运行[Delivery](#delivery)节点和[Bttc](#bttc)，Sentry会同步网络中其他节点的数据， 也会在网络上广播[验证人](#validator)的数据。

Sentry节点对网络上所有其他Sentry节点开放。


## Delivery

Delivery是TRON/BSC/Ethereum网络的平行链，Delivery链的节点监控部署在TRON/BSC/以太坊主网上的合约集合，也会将BTTC网络的[checkpoints](#checkpoint-transaction)提交给TRON/BSC/Ethereum网络。

Delivery是基于[Tendermint](https://tendermint.com/)开发。

## Bttc
Bttc的节点是一个在BTTC网络上负责生产区块的节点。

Bttc是基于[Go Ethereum](https://geth.ethereum.org/)开发。

## Owner 地址

owner地址是一个TRON网络地址，用于验证人在TRON主网上进行质押、追加质押、修改Signer地址、提取奖励和管理委托等相关参数。

owner地址的私钥必须非常安全，不经常使用，可以认为是一个*冷*钱包。

## Signer 地址

Signer地址是一个TRON网络地址，Signer地址用于签名并提交[检查点交易](#checkpoint-transaction)。

验证人节点运行时需要用到Signer地址，所以Signer地址可以认为是一个*热*钱包，而[owner地址私钥](#owner-address)必须非常安全，不经常使用，可以认为是一个*冷*钱包。


## 提议者

提议者是根据算法从[验证人](#validator)选出，用来提议一个新区块。

提议者还负责收集某一特定[检查点](#checkpoint-transaction)的所有签名，并将检查点提交给TRON/BSC/Ethereum主网。


## 跨度
一个连续的产块区间，BTTC会从所有验证人中选取一组验证人生产这个区间中的区块。

每个跨度的选择是由至少2/3的验证人的质押股权占比决定。


## 质押

质押是将代币锁定在存款合约中，来获得验证和生产区块的权利的过程。通常情况下需要使用网络的原生代币进行质押，BTTC网络的验证人/委托人使用BTT代币进行质押。其他例子包括Polygon的MATIC，ETH 2.0的ETH，Cosmos的ATOM等。


## 验证人

验证人通过质押BTT代币并同时运行[Delivery](#delivery)节点和 [Bttc](#bttc)节点，将BTTC的检查点提交至TRON/BSC/Ethereum网络，同时负责BTTC网络的区块生产。
