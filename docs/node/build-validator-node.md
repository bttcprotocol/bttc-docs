# Validator Node Deployment

## System requirements

This document lists the minimum system requirements and recommended system requirements for running the Sentry Node and the Validator Node, which must be run on different machines.

Minimum system requirements for Sentinel Node and Validator Node：

* RAM: 32 GB
* CPU: 8-core
* Storage: 1 TB SSD

For Amazon Web Services (AWS), the equivalent of the minimum requirements instances are **m5d.2xlarge** or **t3.2xlarge** with unlimited credits selected.

Recommended system requirements for Sentinel Node and Validator Node：

* RAM：64GB
* CPU: 16-core
* Storage: 1TB SSD
* Bandwidth: 1 Gbit/s

For Amazon Web Services (AWS), the equivalent of the recommended requirements instance is **m5d.4xlarge**.

## Prerequisites

* Two machines — one sentry node and one validator node.
* `build-essential` installed on both the sentry and the validator machines(optional).
  To install(only required in ubuntu):

  ```sh
  sudo apt-get install build-essential
  ```
* Go 1.21.9 installed on both the sentry and the validator machines.
  To install:
  ```sh
  wget https://gist.githubusercontent.com/ssandeep/a6c7197811c83c71e5fead841bab396c/raw/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```
* RabbitMQ installed on both the sentry and the validator machines. See [Downloading and Installing RabbitMQ](https://www.rabbitmq.com/download.html).


## Overview

To get to a running validator node, do the following:

```
1. Have the two machines prepared.
2. Install the Delivery and Bttc binaries on the sentry and the validator machines.
3. Set up the Delivery and Bttc service files on the sentry and the validator machines.
4. Set up the Delivery and Bttc services on the sentry and the validator machines.
5. Configure the sentry node.
6. Start the sentry node.
7. Configure the validator node.
8. Set the owner and signer keys.
9. Start the validator node.
```

> Note： You must follow the exact outlined sequence of actions, otherwise you will run into issues.For example, a sentry node must always be set up before the validator node.

## Install Delivery and Bttc binaries

### Install Delivery

Clone [Delivery repository](https://github.com/bttcprotocol/delivery/):

```
git clone https://github.com/bttcprotocol/delivery
```

Check out the correct [release version](https://github.com/bttcprotocol/delivery/releases):

```
git checkout RELEASE_TAG
```

where

* RELEASE_TAG — the tag of the release version that you install.

```
make install
```

Check the installation:

```
deliveryd version --long
```

### Install Bttc

Clone the [Bttc repository](https://github.com/bttcprotocol/bttc):

```
git clone https://github.com/bttcprotocol/bttc
```

Check out the correct [release version](https://github.com/bttcprotocol/bttc/releases):

```
git checkout RELEASE_TAG
```

* RELEASE_TAG — the tag of the release version that you install. Example:
```sh
git checkout v1.0.1
```

Install Bttc:

```
make bttc-all
```

Create symlinks::

```
sudo ln -nfs ~/bttc/build/bin/bttc /usr/bin/bttc
sudo ln -nfs ~/bttc/build/bin/bootnode /usr/bin/bootnode
```

Check the installation:

```
bttc version
```

## Set up node files

### Fetch the launch repository

```
git clone https://github.com/bttcprotocol/launch
```

### Set up the launch directory

**1.Set up a startup directory on the Sentinel node** Create `node` directory:

```
mkdir -p node
```

Copy the files and scripts from the `launch` directory to the `node` directory, selecting the correct folder. For access to the mainnet, select mainnet-v1; for access to the test network, select testnet-1029.

```
cp -rf launch/mainnet-v1/sentry/sentry/* ~/node
```

**2.Set up the activation menu on the verifier node**

Create a `node` directory::

```
mkdir -p node
```

Copy files and scripts from the `launch` directory to the `node` directory:

```
cp -rf launch/mainnet-v1/sentry/validator/* ~/node
```

### Set up the network directories

Run this section on the Sentinel node and the Verifier node respectively.

**1.Set up Delivery**

Switch to the `delivery` directory and run the setup script::

```
cd ~/node/delivery
bash setup.sh
```

**2.Set up Bttc**

Switch to the `bttc` directory and run the setup script:

```
bash setup.sh
```

## Configure the sentry Nodes

### Configure the Delivery services

**open`vim ~/.deliveryd/config/config.toml`，In `config.toml`, change the following:**


* `moniker` — any name. Example: `moniker = "my-sentry-node"`.
* `seeds` — the seed node addresses consisting of a node ID, an IP address, and a port.
  Use the following values from ~/node/delivery/delivery-seeds.txt:
  Example(mainnet):
  ```toml
  seeds="161c2cbe07fccc8c8a3b10ccdea608569a202c06@54.157.35.210:26656,f3f21c82c04003e3c6ee14eb4d11d5dd0b1f201e@107.20.250.182:26656,ed080edbac1a1a285d265e3e87269aea9f6693b7@54.219.27.155:26656,3114d9ebc7254a27de7092b071bd698d250748aa@54.241.235.101:26656"
  ```
  Example(testnet-1029):
  ```toml
  seeds="3f562eed0fcfabc848db5ebed81633e340352c0c@52.53.72.234:26656,65f774fece098327b595c971b507db24356000fd@54.176.105.93:26656"
  ```
* `pex` — set the value to `true` to enable the peer exchange. Example: `pex = true`.
* `private_peer_ids` — the node ID of Delivery set up on the validator machine.
  To get the node ID of Delivery on the validator machine:
  1. Login to the valdator machine.
  1. Run `deliveryd tendermint show-node-id`.

  Example: `private_peer_ids = "e2c6a611e449b61f2266f0054a315fad6ce607ba"`.
* `prometheus` — set the value to `true` to enable the Prometheus metrics. Example: `prometheus = true`.
* `max_open_connections` — set the value to `100`. Example: `max_open_connections = 100`.

Save the changes in `config.toml`.

**Open `vim ~/.deliveryd/config/delivery-config.toml`，In `delivery-config.toml`, change the following:**


* `eth_rpc_url`: Ethereum network rpc address. You need to generate INFURA_KEY yourself in order to communicate with Ethereum. [API_KEY Application Tutorial](https://ethereumico.io/knowledge-base/infura-api-key-guide)
* `tron_rpc_url`: RPC address of TRON network node. choose from [official-public-node](https://developers.tron.network/docs/official-public-node)
* `tron_grid_url`: TRON Network event service query url.
* `bsc_rpc_url`: RPC address of BSC network node.[official-rpc-node](https://docs.binance.org/smart-chain/developer/rpc.html) 
* `checkpoint_poll_interval`: checkpoint poll interval.please set this param to `30m0s`.
  

**Example(mainnet):**

```conf
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://mainnet.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://bsc-dataseed.binance.org/" 
tron_rpc_url = "grpc.trongrid.io:50051" 
tron_grid_url = "https://tronevent.bt.io/"
```

**Example(testnet-1029):**

```conf
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://goerli.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545/"
tron_rpc_url = "47.252.19.181:50051" 
tron_grid_url = "https://test-tronevent.bt.io"
```


### Configure the Bttc Service

Open `vi ~/node/bttc/start.sh`.

In `start.sh`, add the boot node addresses consisting of a node ID, an IP address, and a port by adding the following line at the end:

Mainnet Configure:

```
--bootnodes 
"enode://8ef920be1d44ad7c41a517a6420e43511f2e30d1c35a4bb05954c9f413b1712dae6e9e05f56595966470506891ff05d203e233c2e8f6df8c72621537a3d783e9@54.157.35.210:30303,enode://f3a2534ac30db7387f84c1262bce9a0737c46a8b5627f8193d412a4bde415c191191bbf984f51e04e5d974e62b70fab148f38522c5e2917ca1f1860361f14cc9@107.20.250.182:30303,enode://268cc5c4062b4c30f7ae972322ec119465655d9b3f7220df4614f2890b5cef6ac350d65890f8ecebfe6c5ce0af635f7ae420db84de7677c54b35ed1ce6bb4fbd@54.219.27.155:30303,enode://a9aa7a7ec5b34485c73436d311d86c55f900db4008058231a2fd2fb8ee7ad1b68d7d5a64acbf1f62b8d5f25388b492d16befb686d6146b374a85a6ea7d5a95c9@54.241.235.101:30303"
```

Testnet-1029 Configure

```
--bootnodes "enode://2e6a732ba9d0fcf102a4f4bda7d76f28095c9f03ee56bc89dc5c2235cd527c914b6063b0c76598cc37287f0594ae4022df550c592b3ba2a56a9f02810edbeee1@52.53.72.234:30303,enode://3d7da6d583072fbbe733135047010698e8b6a24c9315ce953b09dddbfabb2476c8b720b2ff2beb2ec73ef111b691c7dcd87f5e42bcba4a7bc385b7f728b2ab44@54.176.105.93:30303"
```

Save the changes in `start.sh`.

### Configure firewall

The sentry machine must have the following ports open to the world `0.0.0.0/0`:

* 26656- Your Delivery service will connect your node to other nodes Delivery service.
* 30303- Your Bttc service will connect your node to other nodes Bttc service.
* 22- For the validator to be able to ssh from wherever he/she is.

## Start the sentry node

You will first start the Delivery service. Once the Delivery service syncs, you will start the Bttc service.

> Note：The Delivery service takes several hours to fully sync from scratch.。

### Start the Delivery service

Change to the `~/node/delivery` directory:

```
cd ~/node/delivery
bash delivery-start.sh
```

Start the Delivery rest-server:

```
bash delivery-server-start.sh 
```

> Note：
>
> In the logs, you may see the following errors:
>
> * `Stopping peer for error`
> * `MConnection flush failed`
> * `use of closed network connection`
>
> These mean that one of the nodes on the network refused a connection to your node. You do not need to do anything with these errors. Wait for your node to crawl more nodes on the network.


Check the sync status of Delivery:

```
curl localhost:26657/status
```

In the output, the `catching_up` value is:

* `true` — Delivery service is syncing.
* `false` — Deliveryservice is fully synced.

Wait for the Delivery service to fully sync.

### Start the Bttc service

Once the Delivery service is fully synced, start the Bttc service.

Change to the `~/node/bttc` directory:

```
cd ~/node/bttc
bash start.sh
```

## Configure the validator node

> Note:
> 
> To complete this section, you must have an RPC endpoint of your fully synced Ethereum mainnet node ready.

### Configure the Delivery service

Login to the remote validator machine.

Open for editing `vi ~/.deliveryd/config/config.toml`.

In `config.toml`, change the following:

* `moniker` — any name. Example: `moniker = "my-validator-node"`.
* `pex` — set the value to `false` to disable the peer exchange. Example: `pex = false`.
* `private_peer_ids` — comment out the value to disable it. Example: `# private_peer_ids = ""`.
  To get the node ID of Delivery on the sentry machine:
  1. Login to the sentry machine.
  1. Run `deliveryd tendermint show-node-id`.

Example: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`
* `prometheus` — set the value to `true` to enable the Prometheus metrics. Example: `prometheus = true`.
Save the changes in `config.toml`.
Open for editing `vim ~/.deliveryd/config/delivery-config.toml`.

In `delivery-config.toml`, change the following:
* `eth_rpc_url`: Ethereum network rpc address. You need to generate INFURA_KEY yourself in order to communicate with Ethereum. [API_KEY Application Tutorial](https://ethereumico.io/knowledge-base/infura-api-key-guide)
* `tron_rpc_url`: RPC address of TRON network node. choose from [official-public-node](https://developers.tron.network/docs/official-public-node)
* `tron_grid_url`: TRON Network event service query url.
* `bsc_rpc_url`: RPC address of BSC network node.[official-rpc-node](https://docs.binance.org/smart-chain/developer/rpc.html)

**Example(mainnet):**

```conf
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://mainnet.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://bsc-dataseed.binance.org/" 
tron_rpc_url = "grpc.trongrid.io:50051" 
tron_grid_url = "https://tronevent.bt.io/"
```

**Example(testnet-1029):**

```conf
vim ~/.deliveryd/config/delivery-config.toml
  
eth_rpc_url = "https://goerli.infura.io/v3/<YOUR_INFURA_KEY>" 
bsc_rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545/"
tron_rpc_url = "47.252.19.181:50051" 
tron_grid_url = "https://test-tronevent.bt.io"
```

### Configure the Bttc service

Open for editing `vi ~/.bttc/data/bor/static-nodes.json`.

In `static-nodes.json`, change the following:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — the node ID and IP address of Bttc set up on the sentry machine.

  To get the node ID of Bttc on the sentry machine:

  1. Login to the sentry machine.
  1. Run `bootnode -nodekey ~/.bttc/data/bor/nodekey -writeaddress`.

  Example: `"enode://8ef920be1d44ad7c41a517a6420e43511f2e30d1c35a4bb05954c9f413b1712dae6e9e05f56595966470506891ff05d203e233c2e8f6df8c72621537a3d783e9@54.157.35.210:30303"`.

Save the changes in `static-nodes.json`.


## Set the signer key

On Bttc, it is recommended that you keep the owner and signer keys different.

* Signer — the address that signs the checkpoint transactions. The recommendation is to keep at least 2 ETH, 20,000TRX, 0.5BNB on the signer address.
* Owner — the address that does the staking transactions. The recommendation is to keep the BTT tokens on the owner address.

### Configuring Delivery with the Signer Private Key

You must set a Delivery private key only on the validator machine. Do not set a Delivery private key on the sentry machine.

To set the private key on delivery, run:

```sh
deliverycli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

where

* ETHEREUM_PRIVATE_KEY — your signer Ethereum private key.

This will generate `priv_validator_key.json`. Move the generated JSON file to the Delivery configuration directory:

```sh
mv ./priv_validator_key.json ~/.deliveryd/config
```
### Configuring BTTC with the Signer Private Key

You must generate a Bttc keystore file with the signer private key only on the validator machine. Do not generate a Bttc keystore file on the sentry machine.

To set the private key on bttc, run:

```sh
deliverycli generate-keystore ETHEREUM_PRIVATE_KEY
```

where

* ETHEREUM_PRIVATE_KEY — your signer Ethereum private key.

When prompted, set up a password to the keystore file.

This will generate a `UTC-<time>-<address>` keystore file.

Move the generated keystore file to the Bttc configuration directory:

```sh
mv ./UTC-<time>-<address> ~/.bttc/keystore/
```

### Add password.txt

Make sure to create a `password.txt` file then add the Bttc keystore file password right in the `~/.bttc/password.txt` file.

### Add your Ethereum address

Make sure to create a `address.txt` file,then add the Bttc address file  right in the `~/.bttc/address.txt` file.
Open for editing `vi ~/.bttc/address.txt`.

In `address.txt`, add your Ethereum address. Example: `0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Save the changes in `address.txt`.

## Start the validator node

At this point, you must have:

* The Delivery service on the sentry machine fully synced and running.
* The Bttc service on the sentry machine running.
* The Delivery service and the Bttc service on the validator machine configured.
* Your signer keys configured.

### Start the Delivery service

You will now start the Delivery service on the validator machine. Once the Delivery service syncs, you will start the Bttc service on the validator machine.

Change to the `~/node/delivery` directory:

```sh
cd ~/node/delivery
```

Start the Delivery service:

```sh
bash delivery-start.sh
```

Start the Delivery rest-server:

```sh
bash delivery-server-start.sh
```

Start the Delivery bridge:

```sh
bash delivery-bridge-start.sh 
```

Check the sync status of Delivery:

```sh
curl localhost:26657/status
```

In the output, the `catching_up` value is:

* `true` — the Delivery service is syncing.
* `false` — the Delivery service is fully synced.

Wait for the Delivery service to fully sync.

### Start the Bttc service

Once the Delivery service on the validator machine is fully synced, start the Bttc service on the validator machine.

Change to the `~/node/bttc` directory:

```sh
cd ~/node/bttc
```

Start the Bttc service:

```sh
bash start.sh
```
