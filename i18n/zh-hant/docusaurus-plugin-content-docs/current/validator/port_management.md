# 端口管理

以下是 Bttc和Delivery節點使用的默認端口列表：


## Bttc

| ﻿名字                   | 端口  | 標簽                      | 描述                                                                                                    |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| 網絡監聽 | 30303 | 公開                   | 網絡監聽端口，Bttc節點使用該端口來連接其他Bttc節點，並同步區塊。                                      |
| Websocket 服務              | 8546  | 公開或者私密   | Websocket端口。 |
| Pprof 服務           | 7071  | 私密     | Pprof服務,從Bttc節點收集分析數據。                                                                      |
| UDP 發現服務          | 30303 | 公開或者私密 | 用於節點發現服務。  |
| RPC 服務             | 8545  | 公開或者私密   | RPC API服務,可以向Bttc節點發送交易或者從Bttc節點獲取數據。|                                                                   |




## Delivery

| ﻿名字                   | 端口  | 標簽                      | 描述                                                                                                    |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| RPC 服務             | 26657  | 公開或者私密   | RPC API服務,可以向Delivery節點發送交易或者從Delivery節點獲取數據。|                                                                   |
| Prometheus 服務             | 26660  | 公開或者私密   | Prometheus API服務。 |               |
| P2P 服務             | 26656  |  公開或者私密  | 網絡監聽端口，Delivery節點使用該端口來連接其他Delivery節點，並同步區塊 |               |
| Pprof 服務           | 6060  | 私密     | Pprof服務,從Delivery節點收集分析數據。                                                                      |