# How to Contribute

The Bittorrent-Chain Docs is an open-source project, if you need to add or change anything in Bittorrent-Chain Docs, please raise a PR against the master branch,the documentation team will review the PR or reach out accordingly.


:::tip

If you are adding a new document, it is recommended to just have a link to your github or documentation for more details.

:::

## Git Workflow
If you want to contribute docs to us, please follow the following git workflow:
1. Fork a new repository from `bttcprotocol/bttc-docs` to your personal code repository
2. Before writing docs, please synchronize your fork repository with the upstream repository
3. Pull a new branch from the master branch of your repository for local development
4. Edit the doc in your fork repository
5. Write and commit the docs when it is completed
6. Submit a pull request (PR) from your repository to `bttcprotocol/bttc-docs`

## Doc Review Guidelines
The only way to get docs into `bttcprotocol/bttc-docs` is to send a pull request. Those pull requests need to be reviewed by someone. there a guide that explains our expectations around PRs for both authors and reviewers.

### Terminology
- The `author` of a pull request is the entity who wrote the diff and submitted it to GitHub.
- The `team` consists of people with commit rights on the `bttcprotocol/bttc-docs` repository.
- The `reviewer` is the person assigned to review the diff. The `reviewer` must be a `team` member.

### The Process
The first decision to make for any PR is whether it’s worth including at all. This decision lies primarily with the PR owner, but may be negotiated with `team` members.

To make the decision we must understand what the PR is about. If there isn’t enough description content or the diff is too large, request an explanation. Anyone can do this part.

We expect that `reviewer` check the style and functionality of the PR, providing comments to the `author` using the GitHub review system. `reviewer` should follow up with the PR until it is in good shape, then approve the PR. Approved PRs can be merged by any PR owner.

When communicating with authors, be polite and respectful.

### Commit Messages
Commit messages should follow the rule below, we provide a template corresponding instructions.

Template:
```
<commit type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
The message header is a single line that contains succinct description of the change containing a `commit` type, an optional `scope` and a `subject`.

`commit type` describes the kind of change that this commit is providing:
- feat (new feature,such as adding a new chapter)
- fix (bug fix,such as correcting documentation errors)

`scope `can be anything specifying place of the commit change. For example:BTTC-basics、Architecture、Governance、Delegator.

`subject` contains a succinct description of the change:

1. Limit the subject line, which briefly describes the purpose of the commit, to 50 characters.
2. Start with a verb and use first-person present-tense (e.g., use "change" instead of "changed" or "changes").
3. Do not capitalize the first letter.
4. Do not end the subject line with a period.
5. Avoid meaningless commits. It is recommended to use the git rebase command.

Message body use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

Here is an example:
```
feat(Delegator): update delegator chapter

1. add delegator's delegation process
2. improve transaction entry speed

Closes #123
```

If the purpose of this submission is to modify one issue, you need to refer to the issue in the footer, starting with the keyword Closes, such as Closes `#123`,if multiple bugs have been modified, separate them with commas,such as Closes `#123`, `#456`, `#789`.

## Pull Request Guidelines
Create one PR for one issue.
- Avoid massive PRs.
- Write an overview of the purpose of the PR in its title.
- Write a description of the PR for future reviewers.
- Elaborate on the feedback you need (if any).
- Do not capitalize the first letter.
- Do not put a period (.) in the end.

