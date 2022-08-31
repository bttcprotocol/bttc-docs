# 詞匯表

## 區塊生產者

區塊生產者是從所有活躍的[驗證人](#validator)中選出，負責一個[跨度](#span)中的區塊生產。

區塊生產者負責創建區塊並將區塊廣播到網絡上。


## 檢查點交易

檢查點交易是一個包含[Bttc](#bttc)層在檢查點間隔期間所有區塊的Merkle根的交易。

該交易將由[Delivery](#delivery)節點提交至TRON/BSC/Ethereum主網上的BTTC合約。

## 傭金

傭金比例是[驗證人](#validator)與[委托人](#delegator)獲得獎勵的百分占比。

## 委托人

委托人無需運行節點，他們可以將BTT代幣投票給[驗證人](#validator)，並根據比例獲得獎勵。委托人在系統中對BTTC網絡安全的維護有至關重要的作用。

## 全節點

全節點是一個同時運行[Delivery](#Delivery)和[Bttc](#bttc)的 [sentry節點](#sentry)。

參見[全節點部署](/docs/node/build-fullnode)。

## Sentry

Sentry節點同時運行[Delivery](#delivery)節點和[Bttc](#bttc)，Sentry會同步網絡中其他節點的數據， 也會在網絡上廣播[驗證人](#validator)的數據。

Sentry節點對網絡上所有其他Sentry節點開放。


## Delivery

Delivery是TRON/BSC/Ethereum網絡的平行鏈，Delivery鏈的節點監控部署在TRON/BSC/以太坊主網上的合約集合，也會將BTTC網絡的[checkpoints](#checkpoint-transaction)提交給TRON/BSC/Ethereum網絡。

Delivery是基於[Tendermint](https://tendermint.com/)開發。

## Bttc
Bttc的節點是一個在BTTC網絡上負責生產區塊的節點。

Bttc是基於[Go Ethereum](https://geth.ethereum.org/)開發。

## Owner 地址

owner地址是一個TRON網絡地址，用於驗證人在TRON主網上進行質押、追加質押、修改Signer地址、提取獎勵和管理委托等相關參數。

owner地址的私鑰必須非常安全，不經常使用，可以認為是一個*冷*錢包。

## Signer 地址

Signer地址是一個TRON網絡地址，Signer地址用於簽名並提交[檢查點交易](#checkpoint-transaction)。

驗證人節點運行時需要用到Signer地址，所以Signer地址可以認為是一個*熱*錢包，而[owner地址私鑰](#owner-address)必須非常安全，不經常使用，可以認為是一個*冷*錢包。


## 提議者

提議者是根據算法從[驗證人](#validator)選出，用來提議一個新區塊。

提議者還負責收集某一特定[檢查點](#checkpoint-transaction)的所有簽名，並將檢查點提交給TRON/BSC/Ethereum主網。


## 跨度
一個連續的產塊區間，BTTC會從所有驗證人中選取一組驗證人生產這個區間中的區塊。

每個跨度的選擇是由至少2/3的驗證人的質押股權占比決定。


## 質押

質押是將代幣鎖定在存款合約中，來獲得驗證和生產區塊的權利的過程。通常情況下需要使用網絡的原生代幣進行質押，BTTC網絡的驗證人/委托人使用BTT代幣進行質押。其他例子包括Polygon的MATIC，ETH 2.0的ETH，Cosmos的ATOM等。


## 驗證人

驗證人通過質押BTT代幣並同時運行[Delivery](#delivery)節點和 [Bttc](#bttc)節點，將BTTC的檢查點提交至TRON/BSC/Ethereum網絡，同時負責BTTC網絡的區塊生產。
