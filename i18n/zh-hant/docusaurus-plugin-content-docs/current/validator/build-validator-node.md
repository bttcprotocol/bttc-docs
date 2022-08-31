# 驗證人節點部署

## 系統要求

本文列出的是運行哨兵節點和驗證人節點最低系統要求和推薦系統要求,必須在不同的機器上運行哨兵節點和驗證人節點。

哨兵節點和驗證人節點的最低系統要求：

* 內存: 32 GB
* CPU: 8核
* 存儲: 1 TB SSD

對於亞馬遜網絡服務（AWS），滿足最低要求的實例是**m5d.2xlarge**或**t3.2xlarge**，選擇無限信用,對於存儲，確保1TB的SSD存儲是可以擴展的。

哨兵節點和驗證人節點的推薦系統要求:

* 內存：64GB
* CPU: 16核
* 存儲: 1TB SSD
* 帶寬: 1 Gbit/s

對於亞馬遜網絡服務（AWS），滿足推薦的要求實例是**m5d.4xlarge**, 對於OVH，滿足推薦的要求實例是**infra-3**,對於網絡，預計每月傳輸3-5TB的數據。

### 前置要求

* 兩台機器——一台哨兵節點和一台驗證人節點。
*   在哨兵節點和驗證人節點設備上均安裝`build-essential` (僅 Ubuntu 系統需要安裝):

    ```
    sudo apt-get install build-essential
    ```
*   在哨兵節點和驗證人節點設備上均安裝Go 1.17:

    ```
    wget https://gist.githubusercontent.com/ssandeep/a6c7197811c83c71e5fead841bab396c/raw/go-install.sh
    bash go-install.sh
    sudo ln -nfs ~/.go/bin/go /usr/bin/go
    ```
* 在哨兵節點和驗證人節點設備上均安裝 RabbitMQ。 查看[下載和安裝 RabbitMQ](https://www.rabbitmq.com/download.html).

### 概覽

請執行以下操作以運行驗證人節點:

```
1. 準備兩台設備.
2. 在哨兵節點和驗證人節點設備上安裝 Delivery 二進制文件和 BTTC 二進制文件.
3. 在哨兵節點和驗證人節點設備上設置好 Delivery 服務文件和 BTTC 服務文件.
4. 在哨兵節點和驗證人節點設備上設置好 Delivery 服務和 BTTC 服務.
5. 配置哨兵節點.
6. 啟動哨兵節點.
7. 配置驗證人節點.
8. 設置所有者密鑰和簽名者密鑰.
9. 啟動驗證人節點.
```

> 注： 請嚴格遵守上述操作順序，否則將會出錯。 例如，必須先設置哨兵節點，然後再設置驗證人節點。

### 安裝Delivery和Bttc二進制文件

#### 安裝 Delivery

克隆 [Delivery 倉庫](https://github.com/bttcprotocol/delivery/):

```
git clone https://github.com/bttcprotocol/delivery
```

檢出正確的 [發布版本](https://github.com/bttcprotocol/delivery/releases):

```
git checkout RELEASE_TAG
```

其中

* RELEASE\_TAG — 即為您安裝的發布版本標簽，例如`git checkout v1.0.0` 安裝 Delivery:

```
make install
```

檢查安裝:

```
deliveryd version --long
```

#### 安裝 Bttc

克隆 the [Bttc 倉庫](https://github.com/bttcprotocol/bttc):

```
git clone https://github.com/bttcprotocol/bttc
```

檢出正確的[發布版本](https://github.com/bttcprotocol/bttc/releases):

```
git checkout RELEASE_TAG
```

RELEASE\_TAG — 即為您安裝的發布版本標簽，例如 `git checkout v1.0.1`

安裝 Bttc:

```
make bttc-all
```

創建符號鏈接:

```
sudo ln -nfs ~/bttc/build/bin/bttc /usr/bin/bttc
sudo ln -nfs ~/bttc/build/bin/bootnode /usr/bin/bootnode
```

檢查安裝:

```
bttc version
```

### 設置節點文件

#### 獲取launch倉庫

```
git clone https://github.com/bttcprotocol/launch
```

#### 設置啟動目錄

**1.哨兵節點上設置啟動目錄** 創建 `node` 目錄:

```
mkdir -p node
```

將文件和腳本從`launch`目錄覆制到`node`目錄, 選擇正確的文件夾。如要接入主網，請選擇 mainnet-v1；如要接入測試網，請選擇 testnet-1029。

```
cp -rf launch/mainnet-v1/sentry/sentry/* ~/node
```

**2.驗證人節點上設置啟動目錄**

創建 `node` 目錄:

```
mkdir -p node
```

將文件和腳本從`launch`目錄覆制到`node`目錄:

```
cp -rf launch/mainnet-v1/sentry/validator/* ~/node
```

#### 設置網絡目錄

分別在哨兵節點和驗證人節點上執行此部分內容。

**1.設置 Delivery**

切換到`delivery`目錄，並運行設置腳本:

```
cd ~/node/delivery
bash setup.sh
```

**2.設置 Bttc**

切換到`bttc`目錄，並運行設置腳本:

```
bash setup.sh
```

### 配置哨兵節點

#### 配置 Delivery 服務

**打開`vim ~/.deliveryd/config/config.toml`，在 `config.toml`, 中修改如下內容:**

* `moniker` — 任何名稱。 示例: `moniker = "my-sentry-node"`.
*   `seeds` — seed 節點地址由節點ID、IP 地址、端口三部分組成. 使用以下來自 \~/node/delivery/delivery-seeds.txt的值:

    主網配置

    ```toml
    seeds="161c2cbe07fccc8c8a3b10ccdea608569a202c06@54.157.35.210:26656,f3f21c82c04003e3c6ee14eb4d11d5dd0b1f201e@107.20.250.182:26656,ed080edbac1a1a285d265e3e87269aea9f6693b7@54.219.27.155:26656,3114d9ebc7254a27de7092b071bd698d250748aa@54.241.235.101:26656"
    ```

    1029測試網配置

    ```toml
    seeds="3f562eed0fcfabc848db5ebed81633e340352c0c@52.53.72.234:26656,65f774fece098327b595c971b507db24356000fd@54.176.105.93:26656,8a8944fcaddb46ff18ec59a3197af1c5763eb824@50.18.50.100:26656,7ece43f437d4dc419bdf9c09604ebed084699779@54.215.2.221:26656"
    ```
* `pex` — 將值設置為 true，開啟 PEX。 示例: `pex = true`.
* `private_peer_ids` — 在驗證人節點設置的 Delivery 節點 ID. 在驗證人節點上獲取 Delivery 節點 ID:
  1. 登錄驗證人節點.
  2. 運行 `deliveryd tendermint show-node-id`. 示例: `private_peer_ids = "e2c6a611e449b61f2266f0054a315fad6ce607ba"`.
* `prometheus` — 將值設置為 true，啟用 Prometheus 指標。 示例: `prometheus = true`.
* `max_open_connections` — 將值設置為 `100`。 示例 : `max_open_connections = 100`.

在 config.toml 中保存更改.

**打開編輯 `vim ~/.deliveryd/config/delivery-config.toml`，在 `delivery-config.toml`, 中修改如下內容:**

* `eth_rpc_url`: 以太坊網絡 RPC 地址。 您需自行生成 INFURA\_KEY 以連接以太坊網絡。 [API\_KEY 應用教程](https://ethereumico.io/knowledge-base/infura-api-key-guide)
* `tron_rpc_url`: 波場網絡節點的 RPC 地址 [官方-公共-節點](https://developers.tron.network/docs/official-public-node)
* `tron_grid_url`: 波場網絡事件服務查詢 URL。
* `bsc_rpc_url`: BSC 網絡節點的 RPC 地址。[官方-公共-節點](https://docs.binance.org/smart-chain/developer/rpc.html)

**示例（主網):**

```
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://mainnet.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://bsc-dataseed.binance.org/" 
tron_rpc_url = "grpc.trongrid.io:50051" 
tron_grid_url = "https://tronevent.bt.io/"
```

**示例（測試網-1029）:**

```
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://goerli.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545/"
tron_rpc_url = "47.252.19.181:50051" 
tron_grid_url = "https://test-tronevent.bt.io"
```

#### 配置 Bttc 服務

打開編輯 `vi ~/node/bttc/start.sh`.

在`start.sh`中，將以下行輸入至末尾處，以添加由節點 ID、IP 地址和端口組成的啟動節點地址:

主網配置

```
--bootnodes 
"enode://8ef920be1d44ad7c41a517a6420e43511f2e30d1c35a4bb05954c9f413b1712dae6e9e05f56595966470506891ff05d203e233c2e8f6df8c72621537a3d783e9@54.157.35.210:30303,enode://f3a2534ac30db7387f84c1262bce9a0737c46a8b5627f8193d412a4bde415c191191bbf984f51e04e5d974e62b70fab148f38522c5e2917ca1f1860361f14cc9@107.20.250.182:30303,enode://268cc5c4062b4c30f7ae972322ec119465655d9b3f7220df4614f2890b5cef6ac350d65890f8ecebfe6c5ce0af635f7ae420db84de7677c54b35ed1ce6bb4fbd@54.219.27.155:30303,enode://a9aa7a7ec5b34485c73436d311d86c55f900db4008058231a2fd2fb8ee7ad1b68d7d5a64acbf1f62b8d5f25388b492d16befb686d6146b374a85a6ea7d5a95c9@54.241.235.101:30303"
```

1029測試網配置

```
--bootnodes "enode://2e6a732ba9d0fcf102a4f4bda7d76f28095c9f03ee56bc89dc5c2235cd527c914b6063b0c76598cc37287f0594ae4022df550c592b3ba2a56a9f02810edbeee1@52.53.72.234:30303,enode://3d7da6d583072fbbe733135047010698e8b6a24c9315ce953b09dddbfabb2476c8b720b2ff2beb2ec73ef111b691c7dcd87f5e42bcba4a7bc385b7f728b2ab44@54.176.105.93:30303"
```

在 `start.sh` 中保存更改 .

#### 配置防火墻

哨兵節點必須將以下端口對所有人開放`0.0.0.0/0`:

* 26656- 您的 Delivery 服務將連接您與其他 Delivery 服務的節點e.
* 30303- 您的 BTTC 服務將連接您與其他 BTTC 服務的節點。
* 22- 驗證人無論身處何處都能使用 ssh。

### 啟動哨兵節點

首先啟動 Delivery 服務。 Delivery 服務同步後，您需要啟動 BTTC 服務。

> 備注：Delivery 服務需要幾個小時才能完全同步。

#### 啟動 Delivery 服務

切換至`~/node/delivery`目錄,啟動 Delivery 服務:

```
cd ~/node/delivery
bash delivery-start.sh
```

啟動 Delivery rest-server 服務:

```
bash delivery-server-start.sh 
```

> 備注：
>
> 您可能在日志中檢查到以下錯誤:
>
> * `Stopping peer for error`
> * `MConnection flush failed`
> * `use of closed network connection`
>
> 這表明網絡上的一個節點拒絕連接到您的節點。 您無需處理這些錯誤， 只需等待您的節點在網絡上爬取更多節點.

檢查 Delivery 的同步狀態:

```
curl localhost:26657/status
```

在輸出中，`catching_up` 值為:

* `true` — Delivery 服務正在同步.
* `false` — Delivery 服務已完全同步.

等待 Delivery 服務完全同步.

#### 啟動 Bttc 服務

Delivery 服務同步後，啟動 BTTC 服務.

切換至`~/node/bttc`目錄, 啟動 Bttc 服務

```
cd ~/node/bttc
bash start.sh
```

### 配置validator 節點

> 備注： 要完成這一步，您須準備好已完成同步的以太坊主網節點的 RPC 接口, BSC RPC接口 ,TRON RPC接口。

#### 配置Delivery 服務

登錄遠程驗證人節點.

打開`vi ~/.deliveryd/config/config.toml`，在 `config.toml`, 中修改如下內容:

* `moniker` — 任何名稱。 示例: `moniker = "my-sentry-node"`.
* `pex` — 將值設置為 false，關閉 PEX。 示例: `pex = false`.
* `private_peer_ids` — 注釋掉該值。 示例: `# private_peer_ids = ""`. 在哨兵節點上獲取 Delivery 節點 ID:
  1. 登錄哨兵節點.
  2. 運行 `deliveryd tendermint show-node-id`. 示例: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`
* `prometheus` — 將值設置為 true，啟用 Prometheus 指標。 示例: `prometheus = true`.

在config.toml 中保存更改。

**打開`vim ~/.deliveryd/config/delivery-config.toml`，在 `delivery-config.toml`, 中修改如下內容:**

* `eth_rpc_url`: 以太坊網絡 RPC 地址。 您需自行生成 INFURA\_KEY 以連接以太坊網絡。 [API\_KEY 應用教程](https://ethereumico.io/knowledge-base/infura-api-key-guide)
* `tron_rpc_url`: 波場網絡節點的 RPC 地址 [官方-公共-節點](https://developers.tron.network/docs/official-public-node)
* `tron_grid_url`: 波場網絡事件服務查詢 URL。
* `bsc_rpc_url`: BSC 網絡節點的 RPC 地址。[官方-公共-節點](https://docs.binance.org/smart-chain/developer/rpc.html)
* `checkpoint_poll_interval`:checkpoint提交的間隔。請將這個參數設置成 `30m0s`.

**示例（主網):**

```
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://mainnet.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://bsc-dataseed.binance.org/" 
tron_rpc_url = "grpc.trongrid.io:50051" 
tron_grid_url = "https://tronevent.bt.io/"
```

**示例（測試網-1029）:**

```
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://goerli.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545/"
tron_rpc_url = "47.252.19.181:50051" 
tron_grid_url = "https://test-tronevent.bt.io"
```

#### 配置 Bttc 服務

**打開`vi ~/.bttc/data/bor/static-nodes.json`，在 `static-nodes.json` 中修改如下內容:**

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — 在哨兵節點上設置的 BTTC 節點 ID 和 IP 地址. 在哨兵節點上獲取 BTTC 節點 ID:
  1. 登錄哨兵節點.
  2. 運行 `bootnode -nodekey ~/.bttc/data/bor/nodekey -writeaddress`. 示例: `"enode://8ef920be1d44ad7c41a517a6420e43511f2e30d1c35a4bb05954c9f413b1712dae6e9e05f56595966470506891ff05d203e233c2e8f6df8c72621537a3d783e9@54.157.35.210:30303"`. 在 `static-nodes.json` 中保存更改.

### 設置Signer密鑰

我們建議您使用不同的所有者和簽名者密鑰。

* Signer——簽名檢查點交易的地址。 建議在簽名者地址上保留至少 1 個 ETH 代幣，20,000TRX, 0.5BNB.
* Owner ——提交質押交易的地址。 建議在所有者地址上保留 BTT 代幣.

#### 使用Signer 私鑰配置 Delivery

您必須在驗證人節點上設置 Delivery 私鑰， 請勿在哨兵節點上設置 Delivery 私鑰。

要設置私鑰，請運行:

```
deliverycli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

其中

* ETHEREUM\_PRIVATE\_KEY — 是您的Signer以太坊錢包私鑰.

這樣將生成`priv_validator_key.json`文件。 將生成的 JSON 文件移到 Delivery 配置目錄中。:

```
mv ./priv_validator_key.json ~/.deliveryd/config
```

#### 使用Signer 私鑰配置 BTTC

您必須在驗證人節點上生成 BTTC Keystore 文件， 請勿在哨兵節點上生成 BTTC Keystore 文件。

要使用Signer 私鑰生成bttc私鑰文件，請運行:

```
deliverycli generate-keystore ETHEREUM_PRIVATE_KEY
```

其中

* ETHEREUM\_PRIVATE\_KEY — 是您的Signer以太坊私鑰.

根據提示設置 Keystore 文件的密碼，這樣將生成一個 `UTC-<time>-<address>` 文件，將生成的 Keystore 文件移至 BTTC 配置目錄中:

```
mv ./UTC-<time>-<address> ~/.bttc/keystore/
```

#### 添加 password.txt

請確保先創建 `password.txt`文件，然後在`~/.bttc/password.txt`文件中添加 BTTC Keystore 文件密碼。

#### 添加您的以太坊地址

請確保先創建 `address.txt` 文件，然後在 `~/.bttc/address.txt` 文件中添加 BTTC 地址文件。 打開編輯 `vi ~/.bttc/address.txt`。

在 `address.txt`, 中添加您的以太坊地址， 例如: `0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

在 `address.txt` 中保存更改.

### 啟動驗證人節點

在此環節，您必須滿足下列條件：

* 哨兵節點的 Delivery 服務已完全同步且處於運行狀態。
* 哨兵節點的 BTTC 服務處於運行狀態。
* 驗證人節點的 Delivery 服務與 BTTC 服務已完成配置。
* 您的簽名者密鑰已完成配置。

#### 啟動 Delivery 服務

您需要在驗證人節點上啟動 Delivery 服務。 Delivery 服務同步後，您需要在驗證人節點上啟動 BTTC 服務。

切換至 `~/node/delivery` 目錄，啟動 Delivery 服務

```
cd ~/node/delivery
bash delivery-start.sh
```

啟動 Delivery rest-server:

```
bash delivery-server-start.sh
```

啟動 Delivery bridge:

```
bash delivery-bridge-start.sh 
```

檢查 Delivery 的同步狀態:

```
curl localhost:26657/status
```

在輸出中，`catching_up` 值為:

* `true` — Delivery 服務正在同步。
* `false` — Delivery 服務已完全同步。

等待 Delivery 服務完全同步。

#### 啟動 BTTC 服務

驗證人節點上的 Delivery 服務完全同步後，您需要在驗證人節點上啟動BTTC 服務

切換至`~/node/bttc` 目錄:

```
cd ~/node/bttc
```

啟動 BTTC 服務：

```
bash start.sh
```
