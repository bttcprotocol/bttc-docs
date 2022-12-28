# BTTC NFT 教程

请参考 [BTTC 测试网发布 NFT 的简单教程](https://github.com/BTTC-Developer-Hub/bttc-nft-tutorial) 了解如何构建、铸造并发送自己的 ERC721 到 BTTC Donau 测试链。 

# 快速启动
准备工作：[Node](https://nodejs.org/dist/latest-v12.x/), [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) 以及 [Git](https://git-scm.com/downloads) 

可能需要：[IPFS][IPFS]

## 配置应用
打开第一个终端 (Terminal) 窗口构建项目，此过程需要 node，请提前安装
``` 
git clone https://github.com/Jama55/simple-nft-bttc-donau simple-nft-example
```

```
cd simple-nft-example
git checkout simple-nft-example
yarn install
yarn start
```
打开第二个终端窗口，启动前端
```
cd simple-nft-example
yarn chain
```

第三个终端窗口用于发布合约，可以先在本地进行测试 (NETWORK_OF_CHOICE 填写 localhost)
```
cd simple-nft-example
yarn deploy --network NETWORK_OF_CHOICE (localhost, bttc_donau)
```

打开 http://localhost:3000 可以看到运行中的应用。

![](../../../static/img/nfttutorial-1.png)


## 配置 IPFS
如果没有 Infura 的 IPFS 项目，可以根据需要可以[下载 IPFS][IPFS] 的命令行版本或者更简单的桌面版本。并修改下列文件，进行 IPFS 的配置。

配置 IPFS 端口 -> `packages/react-app/scripts/ipfs.js`
```
const localhost = {
   host: 'localhost',
   port: '5001',
   protocol: 'http',
   path: 'api/v0'
};
```
铸造 NFT 时需要上传到 IPFS -> `packages/hardhat/scripts/mint.js`
```
const ipfs = ipfsAPI({
  host: '127.0.0.1', 
  port: '5001', 
  protocol: 'http', 
  path: 'api/v0'
});
```
以及前端测试上传到 IPFS 也需要修改配置 -> `packages/react-app/src/App.jsx`
```
const ipfs = ipfsAPI({ 
  host: "localhost", 
  port: "5001", 
  protocol: "http"
 });
 ```
可能会有跨域 (CORS) 问题，此时可以修改 IPFS 本身的配置文件
 ```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["your whitelist address", "http://localhost:3000", "http://127.0.0.1:5001"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'
 ```
桌面端需要到`配置`中修改上述内容并保存。

![](../../../static/img/nfttutorial-2.png)


如果有 Infura 的 IPFS 项目，则仅需要修改 `mint.js` 以及 `App.jsx` 中的项目 ID 及 secret
 ```
const projectId = 'YOUR INFURA PROJECT ID';
const projectSecret = 'YOUR INFURA PROJECT SECRET';
 ```

 ## 铸造 NFT
 完成 IPFS 配置后启动服务，可以先在前端进行上传测试，确保 IPFS 没有问题。

![](../../../static/img/nfttutorial-3.png)

 正式开始前修改 `mint.js` 中的发送地址 `toAddress`，可以连接 MetaMask 等钱包，将连接的地址填入。回到终端/命令行中开始铸造。铸造成功后页面中就会出现6个 NFT，可以发送给其他地址。
```
yarn mint
```
![](../../../static/img/nfttutorial-4.png)

铸造到指定的地址后可以在前端查看：

![](../../../static/img/nfttutorial-5.png)

# 在正式环境中进行铸造
## BTTC Donau 测试网的配置
在本地环境测试完成就可以在其他公链进行测试。此处选择 BTTC 的 donau 测试网，也可以换成其他链。

首先修改 `packages/hardhat/hardhat.config.js`
```
donau_bttc:{
   url: "https://pre-rpc.bt.io/",
   gasPrice: 300000000000000,
   accounts:{
      mnemonic: mnemonic(),
   },
}
// 修改默认的网络，从 localhost 修改为 BTTC 测试链
const defaultNetwork = "donau_bttc";
```

还需要修改 `packages/react-app/src/constants.js`
```
donau_bttc: {
   name: "donau_bttc",
   color: "#e8a094",
   chainId: 1029,
   rpcUrl: `https://pre-rpc.bt.io/`,
   faucet: "https://testfaucet.bt.io/#/",
   blockExplorer: "https://testscan.bt.io/",
}
```
修改 `App.jsx`，将发布合约的默认网络改为 BTTC 测试链
```
const targetNetwork = NETWORKS.donau_bttc; 
```

## 用于发布合约的账户配置
首先执行 `yarn generate` 创建一个新的地址，创建后可以通过`yarn account` 查看账户信息以及 QR 码

![](../../../static/img/nfttutorial-6.png)

拿到地址后需要进行充值，测试网需要到[**水管**][faucet]获取 BTT。

![](../../../static/img/nfttutorial-7.png)

在测试网发布合约，如果遇到 gas 不足的情况请按提示执行增加 gasPrice
```
yarn deploy --network bttc_donau
```

进行 NFT 铸造 
```
yarn mint
```
铸造成功后可以进行转账并在链上查询交易，也可按照[**原教程**][simple-nft-example]发布网站。

# 其他事项
合约发布后可以在 `Debug Contracts` 页面中查看合约 `YourCollectible` 的所有者  

部署脚本 `deploy.js` 位于 `packages/hardhat/scripts`  

智能合约 `YourCollectible.sol` 位于 `packages/hardhat/contracts`  

如果需要编辑前端，在 `packages/react-app/src` 中找到 `App.jsx`

[IPFS]: https://ipfs.tech/#install
[faucet]: https://testfaucet.bt.io
[simple-nft-example]: https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example


