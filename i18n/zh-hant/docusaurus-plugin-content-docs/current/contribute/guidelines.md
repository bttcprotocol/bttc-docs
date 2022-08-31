
# 如何貢獻文檔

Bittorrent-Chain文檔是一個開源項目，如果您需要修改或添加文檔內容，請在`master`分支提交一個PR，文檔團隊會審核您的提交。

:::tip
如果您想添加一個新的文檔，建議您提供您的github或個人文檔的鏈接，讓我們對您有更詳細的了解。

:::

## Git 工作流程

如果您想為Bittorrent-Chain貢獻文檔，應該遵循以下git工作流程：

1. 從`bttcprotocol/bttc-docs`項目中Fork一個新的repository到自己的代碼倉庫中
2. 編寫文檔之前先將個人Fork的倉庫和上遊倉庫進行同步
3. 從自己倉庫的`master`分支拉出一個新的分支用於本地開發
4. 在自己本地新拉出的分支上修改或添加文檔
5. 完成文檔修改或添加工作之後提交commit
6. 從您自己的倉庫向`bttcprotocol/bttc-docs`提交一個推送代碼請求 （PR）

## 文檔審核指南
添加或者修改`bttcprotocol/bttc-docs`文檔的唯一方法是發送一個pull repuest（PR），而提交的PRs需要被審核通過後，才可以合並到主分支。下面將詳細介紹我們對文檔提交者和文檔審查者的期望。

### 術語

- `作者`是提交文檔到github的人
- `團隊`是具備對文檔倉庫管理權限的人員 
- `審核人`是被分配來審核文檔的人，審核人必須是`團隊`成員之一


### 審核流程
對於任何PR，我們需要判斷是否值得將其包含在主分支中。為了做出決定，我們必須了解這個PR是做什麽的。如果`作者`對PR沒有提供足夠的描述內容或PR的代碼改動太大，任何人都可以要求PR提交者給予適當的解釋與說明。

`審核人`應該檢查PR的代碼風格以及功能的完整性，並在GitHub中給予評論。`審核人`應該一直跟進PR，直至滿足要求，然後批準PR。最後由`bttcprotocol/bttc-docs`團隊將批準的PR合並到主分支。

`審核人`與`作者`溝通時，請注意要懂得禮貌和尊重。

### Commit描述規範
提交PR時提供的描述內容應遵循以下規範，可以使用如下模板對PR內容進行說明:
```
<commit type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
消息頭是對更改的簡要描述，其中包含`commit type`、`scope`和`subject`。


`commit type` 描述了該提交的更改類型:
- feat (新功能,比如增加一個新的章節)
- fix (修覆bug,比如修覆文檔中的錯誤)

`scope `（可選）描述了提交的更改所在位置。例如:BTTC基礎知識、架構、治理、委托人.

`subject`是對Commit目的的簡短描述，規範如下：
1. commit主題不超過50個字符
2. 以動詞開頭，使用第一人稱現在時，比如change，而不是changed或changes
3. 首字母小寫
4. 結尾不加句號（.）
5. 避免無意義的commit，推薦大家學習git rebase命令的使用

消息體使用祈使句，動詞開頭，第一人稱現在時。主體應該包括代碼修改的動機，並與修改之前進行對比。下面是一個PR commit的例子：

```
feat(Delegator): update delegator chapter

1. add delegator's delegation process
2. improve transaction entry speed

Closes #123
```



如果此次提交是為了修改一個issue，則需要在頁腳中引用該issue，以關鍵字Closes開頭，例如`Closes #123`，如果修改了多個錯誤，則用逗號分隔它們，例如`Closes #123, #245, #992`。

## Pull Request規範
Pull Request應遵循如下規範：

- 一個PR只圍繞一件事
- 避免代碼改動量特別大的PR
- PR標題——概述此次PR的目標
- PR說明——面向未來的Reviewer
- 如果需要反饋，請詳述需要哪些反饋


