# 如何贡献
Bittorrent-Chain (BTTC) 是一个去中心化的自治开源项目，项目的治理和发展需要社区的贡献者支持。

以下是在 [BTTC github](https://github.com/bttcprotocol) 贡献代码和文档的说明。我们知道还有很多的改进空间，如果您有任何改进建议，请及时通知我们，谢谢。

这里我们列了一些快速开始的指南。

* [报告问题](#报告问题)
* [新增贡献](#新增贡献)
  * [重点分支](#重点分支)
  * [提交代码和文档](#提交代码和文档)
* [审核指南](#审核指南)
  * [术语](#术语)
  * [过程](#过程)
  * [代码风格](#代码风格)
  * [提交消息](#提交消息)
  * [分支命名约定](#分支命名约定)
  * [拉取请求指南](#拉取请求指南)
  * [特殊情况以及如何处理](#特殊情况以及如何处理)
* [礼仪](#礼仪)

## 报告问题

如果您发现 Bittorrent-Chain 的问题或 bug 而要提出问题报告，请遵循以下要求：

* 请先搜索您的问题。检查是否有人已报告您的问题或提出相同的想法，帮助我们将重复问题降至最低。

* 使用下面的问题报告模板。
    ```
    1.您做了什么操作？

    2.您的预期结果是什么？

    3.您实际看到的结果是什么？
    ```
## 新增贡献

感谢您考虑帮助 BTTC 提供源代码或文档！我们欢迎任何人的贡献，并感谢即使是最小的修复！

如果您想为 BTTC 做出贡献，对于小的修复，我们建议您发送拉取请求 (PR) 以供维护人员审查并合并到主代码库中，确保 PR 包含详细描述。对于更复杂的更改，您需要首先在 Github 提交改进 issue ,详细说明您的动机和实施计划等，作为 issue 的作者，您应该鼓励开发者讨论这个 issue ，通过收集他们的反馈来充实您的问题，并最终将您的问题付诸实践。

### 重点分支

BTTC 项目主要包含 `delivery` 和 `bttc` 两个代码仓库，以及`bttc-docs` 一个文档仓库，代码仓库各自主要包含 `develop`, `master`, `release_*` 分支; 文档仓库主要包含 `master` 分支，各分支描述如下：

- `develop` 分支
该 `develop` 分支只接受来自其他分叉分支或 `release_*` 分支的合并请求。不允许直接将更改推送到 `develop` 分支。`release_*` 当要发布新版本时，必须从开发分支中拉出一个分支。

- `master` 分支
`release_*` 分支只应在 `master` 发布新版本后合并到分支中。文档的提交均在    `bttc-docs`的`master` 分支完成。

- `release` 分支
`release_*` 是从分支中拉出的 `develop` 分支以进行发布。它应该在回归测试后合并 `master`，并将永久保存在存储库中。如果在 `release_*` 分支中发现错误，则应将其修复直接合并到分支中。通过回归测试后，`release_*` 分支应该被合并回 `develop` 分支。本质上，一个 `release_*` 分支充当每个版本的快照。

### 提交代码和文档

如果您想为 BTTC 贡献代码，请按照以下步骤操作，本文档以 `delivery` 作为样例描述，`bttc` 和 `bttc-docs` 可做对应参照：


- 从 `bttcprotocol/delivery` 项目Fork一个新的repository到自己的代码仓库中
- 修改代码之前先将个人Fork的仓库和上游仓库进行同步
- 从自己仓库的 `master` 分支拉出一个新的分支用于本地开发,按[分支命名约定](#分支命名约定)
- 在自己本地新拉出的分支上修改代码
- 完成代码修改工作之后 `commit` [提交消息](#提交消息)
- 从您自己的仓库向 `bttcprotocol/delivery` 提交一个推送代码请求 （PR）

## 审核指南

将代码和文档导入 `bttcprotocol` 的唯一方法是发送拉取请求。这些拉取请求需要有团队审核，当前是由 BTTC 运营团队负责。本指南解释了我们对 `author` 和 `reviewer` 的 PR 的要求。

### 术语
* 该 `author` 是拉取请求、编写新分支并将其提交到 GitHub 的实体。
* 该 `team` 由对 bttcprotocol 代码仓库具有审核权限的人员组成。
* 该 `reviewer` 是指派来审阅差异的人。审阅者必须是团队成员。
* 该 `code owner` 是负责被 PR 修改的子系统的人。

### 过程

对任何 PR 做出的第一个决定是检查它是否值得被通过。这个决定主要取决于 `code owner`，但可以与团队成员协商。

为了做出决定，我们必须了解 PR 是关于什么的。如果描述内容不足或差异太大，我们会解释。任何人都可以做这部分。

我们希望 `reviewer` 检查 PR 的样式和功能，使用 GitHub 审阅系统向 `author` 提供评论。并且`reviewer` 应该跟进 PR，直到它处于良好状态，然后批准 PR。任何 `code owner` 都可以合并已批准的 PR。

交流时，保持礼貌和尊重。

### 代码风格

我们希望所有开发人员都遵循标准的开发流程和编码风格。因此，我们建议如下：

1. 使用编码风格检查器检查代码。
2. 提交前检查代码。
3. 运行标准化测试。

`Golangci-lint` 持续集成扫描器将在提交拉取请求时自动触发。当 PR 通过所有检查后，BTTC 运营人员将审查 PR，并在必要时提供反馈和修改。一旦通过，PR 将被关闭并合并到 `develop` 分支中。

我们很高兴收到您的拉取请求，并将尽我们所能尽快审查它们。欢迎任何拉取请求，即使是拼写错误。

请解决您发现的问题。我们将感谢您的贡献。

如果您的拉取请求未被接受，请不要气馁，因为这可能是一个疏忽。请尽可能详细地解释您的代码，以使其更易于理解。

请确保您的提交符合以下代码样式：

* 代码必须符合 [The Go Programming Language Specification](https://go.dev/ref/spec) 
* 该代码必须已通过 `Golangci-lint` 测试。
* 代码必须从 `develop` 分支中提取。
* 提交消息应以动词开头，其首字母不应大写。
* 提交消息的长度应少于 50 个字符。

### 提交消息

提交消息应遵循以下规则，我们提供了相应的模板说明。

* 按意图 (例如：新增，修复，改变等)
* 按对象 (例如：文档，代码，打包等)
* 按受众 (例如：开发，测试，用户等)

此外，您可能想要给提交信息打一些标签：

* 标记为“微小”的提交信息，不会被加入到更改日志(例如外观改变，拼写错误等)。
* 标记为“重排”的提交信息，意味着没有重要功能改动。也同样不会被加入到展示给最终用户的更改日志，但可能被加入到给开发者的更改日志。
* 您也可以标记“api”来标记对API的更改。

请尽可能多的面向用户功能编写您的提交信息。

```
这是一个标准的 Github 日志例子，显示储存的提交信息：

* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor

```

有关更详细的信息，请参阅[使用 Git 管理变更日志的一些好方法是什么？](https://stackoverflow.com/questions/3523534/what-are-some-good-ways-to-manage-a-changelog-using-git)以及[如何写一个Git提交信息](https://cbea.ms/git-commit/)。

### 分支命名约定

1. 始终将 `master` 分支和 `develop` 分支命名为 “master” 和 “develop” 。
2. 使用由项目负责人指定的版本号命名 `release_*` 分支（例如，`release_1.0.0` 等）。


### 拉取请求指南

1. 一个 PR 只围绕一个问题。
2. 避免大量 PR。
3. 在标题中概述 PR 的目的。
4. 为将来的 `reviewer` 写下 PR 的描述。
5. 详细说明您需要的反馈。
6. 第一个字母不要大写。
7. 不要在最后加上句点 (.)。

### 特殊情况以及如何处理

作为 `reviewer` ，您可能会发现自己处于以下情形之一。以下是如何处理这些问题：

* `author` 没有跟进：一段时间后（即几天后）ping 他们。如果没有进一步的回应，关闭 PR 或自己完成工作。

* `author` 坚持将重构更改与错误修复一起包括在内：我们可以容忍小的重构与任何更改。如果您对差异感到困惑，请要求作者将重构作为独立 PR 提交，或者至少作为同一 PR 中的独立提交提交。

* `author` 不断拒绝您的反馈：审阅者有权出于技术原因拒绝任何更改。如果您不确定，请向团队寻求意见。如果无法达成共识，您可以关闭 PR。

## 礼仪

在代码贡献的同时，请保持尊重和建设性，这样对参与项目的每个人来说都是一种积极的体验。

有助于创造积极环境的行为示例包括：

* 使用热情和包容的语言 尊重不同的观点和经历。
* 优雅地接受建设性的批评。
* 专注于对社区最有利的事情。
* 对其他社区成员表示关心。

不可接受的行为示例包括：

* 使用性感的语言或图像以及不受欢迎的性骚扰。
* 侮辱/贬损评论以及人身或政治攻击。
* 公共或私人骚扰。
* 未经明确许可发布他人的私人信息，例如物理地址或电子地址。
* 可能被合理认为不适当的其他行为。
