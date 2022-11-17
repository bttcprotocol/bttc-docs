# How to Contribute

Bittorrent-Chain (BTTC) is a decentralized autonomous open-source project, which needs the support of contributors to achieve governance and development.

This document aims to describe the instructions in contributing to [BTTC github](https://github.com/bttcprotocol). We know that there is much left to be desired, and if you see any room for improvement, please let us know. Thank you.

Here are some guidelines to get started quickly:

* [Issue Report](#issue-report)
* [BTTC Contribution](#bttc-contribution)
  * [Key Branches](#key-branches)
  * [Code and Document Submission](#code-and-document-submission)
* [Review Specification](#review-specification)
  * [Terminology](#terminology)
  * [Procedure](#procedure)
  * [Code Style](#code-style)
  * [Commit Message Convention](#commit-message-convention)
  * [Branch Naming](#branch-naming)
  * [Pull Request Guidelines](#pull-request-guidelines)
  * [Special Circumstances and Solutions](#special-circumstances-and-solutions)
* [Manner](#manner)

## Issue Report

In case you find a problem or bug with BTTC, you can report an issue by following rules:

* First of all, please search your problems in existing issues to check whether someone has reported before so that we can keep duplicated issues to a minimum.

* Then please use the template shown below to submit an issue report.

```
       1. What did you do?
       2. What did you expect to see?
       3. What did you see instead?
```

## BTTC Contribution

Thank you for considering to help out with the source code and document contribution! We welcome support from anyone, and are grateful for even the smallest of fixing!

For minor correction, we recommend you to submit a pull request (PR) with detailed description of the operating team to review and merge into main code repository. For important or complex change, we suggest you to initiate an issue in Github, explaining your motivation, implementation, etc. in detail for further discussion and peer review. As the author of issue, you are expected to participate in discussing and answering questions, flesh out your issue by collecting the feedback, and eventually get the issue adopted by community.

### Key Branches

BTTC project mainly consists of `delivery` , `bttc` code repositories and a `bttc-docs` document repository, which contain key branches of `develop`, `master`, `release_*` separately for code repositories and `master` branch for document repository. The function of these branches is explained as follows:

* `develop` branch
The `develop` branch only accepts to merge request from other forked branches or `release_*` branches. It is not allowed to push changes directly to `develop` branch. A `release_*` branch has to be pulled from `develop` branch when a new build is to be released.

* `master` branch
The `master` branch should only get `release_*` branch merged in when a new build is released. Document work would be done in `master` branch in `bttc-docs`.

* `release_*` branch
A `release_*` branch is pulled from `develop` branch for new build to be released. If a bug is identified in a `release_*` branch, its fixed code should be directly merged into the branch. After passing the regression test, the `release_*` branch should be merged back into the `develop` branch. And when the new build is released, the `release_*` branch should be merged into the `master` branch. Essentially, a `release_*` branch serves as a snapshot of each release.

### Code and Document Submission

Please follow the steps shown below to contribute source code and document to BTTC. In this instruction we take `delivery` repository as an example, for `bttc` and `bttc-docs` repositories the process is quite same and you can operate accordingly.

1. Fork a new repository from `bttcprotocol/delivery` of BTTC to your own remote code repository.
2. Update your own remote code repository to the latest by synchronizing with the upstream repository.
3. Pull a new branch of the `master` branch in your own remote code repository for local development, please refer to [Branch Naming](###Branch-Naming).
4. Program on the new local branch with your code.
5. Commit your new local branch to your own remote code repository when you complete the code work, please refer to [Commits](###Commits).
6. Submit a pull request (PR) from your own remote repository to the `bttcprotocol/delivery` of BTTC.

## Review Specification

The only way to merge code and document into `bttcprotocol` is to submit a pull request (PR). Currently the BTTC operating team is in charge of reviewing these PRs. Here is the specification to explain the expectations around PRs for both authors and reviewers.

### Terminology

* The `author` of a pull request is the entity that made the new branch and submitted to Github.
* The `team` consists of people with committing rights to the `bttcprotocol` repositories.
* The `reviewer` is the person assigned to review the new branch that must be a team member.
* The `code owner` is the person responsible for the subsystem being modified by the PR.

### Procedure

The first decision to make for any PR is whether it worth being included. This decision lies primarily with the `code owner`, but may be negotiated with team members.

To make the decision the `team` must understand what the PR is about. If there is not enough description content or the new branch is confusing, request an explanation. Anyone can do this part.

The `reviewer` is expected to check the code style and functionality of each PR, providing comments to the `author` using the Github review system. The `reviewer` should follow up with the PR till it is in good shape, and approved. Approved PRs can be merged by any `code owner`.

When communicating, be polite and respectful.

### Code Style

We would like all developers to follow a standard development flow and code style. The recommended steps are shown below:

1. Review the code with code style checkers.
2. Review the code before submission.
3. Run standardized tests.

`Golangci-lint` is a continuous integrated scanner which will be automatically triggered when a pull request (PR) has been submitted. When the pull request (PR) has passed all the checks, the BTTC operating team will then review it and offer feedback and modifications when necessary. Once adopted, the pull request (PR) will be closed and merged into the `develop` branch.

We are glad to receive your pull request (PR) and will try our best to review them as soon as we can. Any pull request (PR) is welcome, even if it is for a typo.

Please kindly address the issue you find. We would appreciate your contribution.

Please do not be discouraged if your pull request (PR) is not accepted, as it may be an oversight. Please explain your code as detailed as possible to make it easier to be understood.

Please make sure your submission meets the following code style:

* The code must conform to [The Go Programming Language Specification](https://go.dev/ref/spec).
* The code must have passed the `Golangci-lint` test.
* The code has to be pulled from the `develop` branch.
* The commit message should start with a verb, whose initial should not be capitalized.
* The commit message should be less than 50 characters in length.

### Commit Message Convention

The following is commit message guidline. The commits could be separated into sections:

* by intent (for example: new, fix, change ...)
* by object (for example: doc, packaging, code ...)
* by audience (for example: dev, tester, users ...)

Additionally, you could want to tag some commits with type for defferent purpose:

* As “minor” commits that shouldn’t get output to your changelog (cosmetic changes, small typo in comments...).
* As “refactor” if you don’t really have any significative feature changes. Thus this should not also be part of the changelog displayed to final user for instance, but might be of some interest if you have a developer changelog.
* You could tag also with “api” to mark API changes or if it's a new API or similar.

Try writing your commit message by targeting user functionality as often as you can.

```
This is a standard git log to show how this commit messages could be stored：

* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor

```

For more detailed information, please refer to [What are some good ways to manage a changelog using Git?](https://stackoverflow.com/questions/3523534/what-are-some-good-ways-to-manage-a-changelog-using-git) and [How to Write a Git Commit Message](https://cbea.ms/git-commit/).

### Branch Naming

1. Always name the `master` branch and `develop` branch as "master" and "develop".
2. Name the `release_*` branch using version numbers, which are assigned by the project lead (eg., release_1.0.0 etc.).

### Pull Request Guidelines

1. Create one PR for one issue.
2. Avoid massive PRs.
3. Write an overview of the purpose of the PR in its title.
4. Write a description of the PR for future `reviewer`.
5. Elaborate on the feedback you need (if any).
6. Do not capitalize the first letter.
7. Do not put a period (.) in the end.

### Special Circumstances and Solutions

As a `reviewer`, you may find yourself in one of the circumstances, here the solutions are attached:

The `author` does not follow up: ping them after a while (i.e. after a few days). If there is no further response, close the PR or complete the work instead of the author.

The `author` insists on including refactoring changes alongside bug fix: We can tolerate small refactorings alongside any change. If you feel confused about the change, ask the author to submit the refactoring as an independent PR, or at least as an independent commit in the same PR.

The `author` keeps rejecting your feedback: reviewers have authority to reject any change for technical reasons. If you are unsure, ask the team for a second opinion. You may close the PR if no consensus can be reached.

## Manner

While contributing, please be polite, respectful and constructive, so that participation in our project is a positive experience for everyone.

Examples of behavior that contributes to creating a positive environment include:

* Using welcoming and inclusive language, being respectful of different viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior include:

* The use of sexualized language or imagery and unwelcome sexual attention or advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others’ private information, such as a physical or electronic address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting
