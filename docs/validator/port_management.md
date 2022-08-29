# Port Management

Here is a list of default ports used across BTTC nodes:


## Bttc

| ﻿Name                   | Port  | Tags                      | description                                                                                                    |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Network listening port | 30303 | public                    | Network listening port. Bttc uses this port to connect to peers and sync                                        |
| WS server              | 8546  | can-be-public, internal   | Websocket port |
| Pprof server           | 7071  | internal, monitoring      | Pprof server to collect metrics from bttc                                                                       |
| UDP discovery          | 30303 | can-be-public, internal   | Bootnode default port (for peer discovery)  |
| RPC server             | 8545  | can-be-public, internal   | RPC port to send transaction and get data from Bttc. Delivery uses this port to get Bttc headers for checkpoints |                                                                   |




## Delivery

| ﻿Name                   | Port  | Tags                      | description                                                                                                    |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| RPC server             | 26657  | can-be-public, internal   | RPC port to send transaction and get data from Delivery |               |
| Prometheus server             | 26660  | can-be-public, internal   | Prometheus server API server. |               |
|  P2P server             | 26656  | can-be-public, internal   | RPC port to send transaction and get data from Delivery |               |
|  Pprof server             | 6060  | can-be-public, internal   | Pprof server to collect metrics from Delivery |               |
