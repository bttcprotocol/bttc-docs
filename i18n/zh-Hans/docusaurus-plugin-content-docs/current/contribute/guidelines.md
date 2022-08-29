
# 如何贡献文档

Bittorrent-Chain文档是一个开源项目，如果您需要修改或添加文档内容，请在`master`分支提交一个PR，文档团队会审核您的提交。

:::tip
如果您想添加一个新的文档，建议您提供您的github或个人文档的链接，让我们对您有更详细的了解。

:::

## Git 工作流程

如果您想为Bittorrent-Chain贡献文档，应该遵循以下git工作流程：

1. 从`bttcprotocol/bttc-docs`项目中Fork一个新的repository到自己的代码仓库中
2. 编写文档之前先将个人Fork的仓库和上游仓库进行同步
3. 从自己仓库的`master`分支拉出一个新的分支用于本地开发
4. 在自己本地新拉出的分支上修改或添加文档
5. 完成文档修改或添加工作之后提交commit
6. 从您自己的仓库向`bttcprotocol/bttc-docs`提交一个推送代码请求 （PR）

## 文档审核指南
添加或者修改`bttcprotocol/bttc-docs`文档的唯一方法是发送一个pull repuest（PR），而提交的PRs需要被审核通过后，才可以合并到主分支。下面将详细介绍我们对文档提交者和文档审查者的期望。

### 术语

- `作者`是提交文档到github的人
- `团队`是具备对文档仓库管理权限的人员 
- `审核人`是被分配来审核文档的人，审核人必须是`团队`成员之一


### 审核流程
对于任何PR，我们需要判断是否值得将其包含在主分支中。为了做出决定，我们必须了解这个PR是做什么的。如果`作者`对PR没有提供足够的描述内容或PR的代码改动太大，任何人都可以要求PR提交者给予适当的解释与说明。

`审核人`应该检查PR的代码风格以及功能的完整性，并在GitHub中给予评论。`审核人`应该一直跟进PR，直至满足要求，然后批准PR。最后由`bttcprotocol/bttc-docs`团队将批准的PR合并到主分支。

`审核人`与`作者`沟通时，请注意要懂得礼貌和尊重。

### Commit描述规范
提交PR时提供的描述内容应遵循以下规范，可以使用如下模板对PR内容进行说明:
```
<commit type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
消息头是对更改的简要描述，其中包含`commit type`、`scope`和`subject`。


`commit type` 描述了该提交的更改类型:
- feat (新功能,比如增加一个新的章节)
- fix (修复bug,比如修复文档中的错误)

`scope `（可选）描述了提交的更改所在位置。例如:BTTC基础知识、架构、治理、委托人.

`subject`是对Commit目的的简短描述，规范如下：
1. commit主题不超过50个字符
2. 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
3. 首字母小写
4. 结尾不加句号（.）
5. 避免无意义的commit，推荐大家学习git rebase命令的使用

消息体使用祈使句，动词开头，第一人称现在时。主体应该包括代码修改的动机，并与修改之前进行对比。下面是一个PR commit的例子：

```
feat(Delegator): update delegator chapter

1. add delegator's delegation process
2. improve transaction entry speed

Closes #123
```



如果此次提交是为了修改一个issue，则需要在页脚中引用该issue，以关键字Closes开头，例如`Closes #123`，如果修改了多个错误，则用逗号分隔它们，例如`Closes #123, #245, #992`。

## Pull Request规范
Pull Request应遵循如下规范：

- 一个PR只围绕一件事
- 避免代码改动量特别大的PR
- PR标题——概述此次PR的目标
- PR说明——面向未来的Reviewer
- 如果需要反馈，请详述需要哪些反馈


