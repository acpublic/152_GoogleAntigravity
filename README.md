# GoogleAntigravity
- https://www.ai-souken.com/article/what-is-google-antigravity
## インストール
### Agent Mode（AIの自律レベル設定）
- Agent-assisted development（推奨）：人間主導のバランス型
- Agent-driven：エージェント主導
- Review-driven：レビュー主導
### 拡張
- Japanese Language Pack for Visual Studio Code：日本語
### AIモデルの切り替え
- Model
### エージェントモードの選択
- Conversation mode
### ドキュメントの日本語化と自動保存
- Agentパネルの3点から、Customizations
- Globalを選んでGEMINI.mdの編集
```
# 回答言語およびプロジェクトドキュメント保存ルール

## 基本方針
- 特に指示がない限り、日本語で回答する。  
- 以下のドキュメントも**日本語で作成する**：  
  - 実装計画 (Implementation Plan)  
  - 修正内容の確認 (Walkthrough)  
  - タスクリスト (Task List)
  
## ドキュメント生成ルール
- **複雑なコード変更や新規機能の実装を伴わない** 単純な質問や情報取得タスクの場合、**ドキュメント (`task.md`, `implementation_plan.md`, `walkthrough.md`) は生成しない**こと。
- 特に、モデルが **Fast** の場合は、ドキュメント生成の省略を推奨する。
- ドキュメントを生成する必要がある場合は、ユーザーの明示的な許可を得ること。

## ファイル構成
- チャット内で作成した以下の3つのファイルを保存する：  
  - `task.md`  
  - `implementation_plan.md`  
  - `walkthrough.md`  

## 保存場所
- プロジェクト内の `docs` フォルダの下に新しいフォルダを作成する。  
- フォルダ名はこのチャットのトピックを表す適切な英語名とし、スペースはアンダースコアで区切る。   
```
## 機能
### Manager View
### Artifacts（成果物）
- Task List（タスクリスト）
- Implementation Plan（実装計画書）
- Walkthrough（作業内容のサマリー）
### Antigravity Browser
- ChromeでAntigravity Browser Extensionをインストール
