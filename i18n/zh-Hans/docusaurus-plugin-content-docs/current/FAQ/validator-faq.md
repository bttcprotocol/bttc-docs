# 验证人常见问题

### 1. 如何在 BTTC 主网上设置验证节点？

请参考 [验证人概述]( https://doc.bt.io/docs/validator/getting-started).

### 2. 新的验证人如何替换现有的验证人？

目前不接受新的验证人申请，只有当前活跃的验证者解绑时，新的验证者才能加入。

未来将推出拍卖机制来进行验证人替换。

### 3. 可以在 delivery 完全同步之前启动 bttc 吗？

不能。如果您在 delivery 未完全同步的情况下启动 bttc，将出现问题。

### 4. 验证人 delivery 无法连接到节点

这通常意味着您的 sentry delivery 遇到了问题。检查你的 sentry delivery 服务是否正常运行。如果服务已停止，则重新启动服务应该可以解决此问题。同样，修复你的 sentry 后，重启你的 delivery 服务也应该可以解决问题。

### 5. delivery 显示 "Error: Wrong Block.Header.AppHash. Expected xxxx"

当 delivery 服务卡在一个区块上并且没有可用的回滚选项时，通常会发生此错误。

解决方案： 

- 完全重置 delivery
- 再次从快照同步

### 6. 不清楚生成验证人密钥时应该添加哪个私钥

要使用的私钥是存储 BTT 代币的钱包地址对应的私钥。

### 7. delivery 和 bttc 密钥库的私钥是否相同？

是的，用于生成验证器密钥和 bttc 密钥库的私钥是相同的。


