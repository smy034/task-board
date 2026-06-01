# Task Board Project

## プロジェクト概要

タスクボードアプリケーション。

## Git 運用ルール

**コードを変更するたびに、必ずコミット＆GitHubへのプッシュを行うこと。**

### 手順

1. 変更をステージングする（関連ファイルを個別に指定する）
2. 変更内容を簡潔に表すコミットメッセージを作成する
3. コミットを作成する
4. `git push` でリモートリポジトリ（GitHub）に即座にプッシュする

### コミットメッセージの形式

```
<type>: <summary>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

`type` の例: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

### 注意事項

- `git add -A` や `git add .` は使わず、変更したファイルを個別にステージングする
- `.env` などの機密ファイルは絶対にコミットしない
- `--no-verify` や `--force` は使用禁止（ユーザーの明示的な指示がある場合のみ）
- `main`/`master` への force push は禁止

## 開発ルール

- 不要なコメントは書かない（WHYが非自明な場合のみ記述）
- 将来の要件を見越した過剰な抽象化は行わない
- セキュリティ脆弱性（XSS, SQLインジェクション等）を混入させない
