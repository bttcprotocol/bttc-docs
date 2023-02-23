# 技术常见问题

### 1. delivery 和 bttc 密钥库的私钥是否相同？

是的，用于生成验证器密钥和 bttc 密钥库的私钥是相同的。

### 2. 常用命令列表

目前，我们为您提供了一份易于深入了解的 Linux 常用命令列表。 为方便起见，我们会定期更新此列表。

对于 Linux 常用命令

#### A. 启动 delivery 

`$ deliveryd start`

#### B. 启动 delivery rest-server

`$ deliveryd rest-server`

#### C. 构建 bttc

`$ make bttc`

### 3. 如何使用开发者 API?

BitTorrent-Chain 开发者 APIs 仅作为社区服务提供，所以请在需要时作有限使用，而不要滥用。 我们支持 GET/POST 请求，速率限制为每秒每个IP 5 次调用。

注意：除个人/私人用途外，需要通过返回链接或您的应用程序注明“由 https://bttcscan.com API 提供支持”。

### 4. 同时支持多少活跃验证人？

当前有12个活跃验证人，目前不接受新的验证人申请，只有当前活跃的验证者解绑时，新的验证者才能加入。

未来将推出拍卖机制来进行验证人替换。
