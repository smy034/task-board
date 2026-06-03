# task-board

タスクボードアプリ。React（CDN）+ Vanilla CSS で構成されたフロントエンド専用アプリ。

## 技術スタック

- HTML5
- CSS3
- React 18（CDN 経由 / UMD ビルド）
- Babel Standalone（ブラウザ内で JSX をトランスパイル）
- ビルドツール・パッケージマネージャなし（`npm install` 不要）

## プロジェクト構造

```
task-board/
├── index.html   # エントリーポイント。React/ReactDOM/Babel の CDN を読み込む
├── style.css    # スタイル
└── app.js       # React コンポーネント（JSX）
```

## 開発・動作確認

ビルド不要。`index.html` をブラウザで直接開くか、Live Server 等で確認する。

```
# VS Code の Live Server 拡張を使う場合
index.html を右クリック → "Open with Live Server"

# Python の簡易サーバーを使う場合
python -m http.server 8080
```

## コーディング規約

- インデントはスペース2文字
- セミコロンあり
- `var` は使用しない（`const` / `let` を使う）
- コメントは日本語で記述してよい

## コンポーネント命名規約

- コンポーネント名は **PascalCase**（例: `TaskItem`, `TaskInput`）
- props のコールバックは **on + 動詞** の形式（例: `onAdd`, `onToggle`, `onDelete`）
- CSS クラス名は **kebab-case**（例: `task-item`, `add-btn`, `task-count`）
- ルートコンポーネントは `App`

## 機能概要

- テキスト入力でタスクを追加（Enter キーまたは「追加」ボタン）
- チェックボックスで完了・未完了を切り替え
- 完了済みタスクはグレー＋打ち消し線で表示
- タスクを削除
- タスクは `localStorage`（キー: `task-board-tasks`）に保存し、リロードしても消えない

## 注意事項

- 外部 API やサーバーへの通信は行わない（完全にクライアントサイドで動作）
- `localStorage` を使ってタスクを保存している（キー: `task-board-tasks`）

## GitHubリポジトリ

https://github.com/smy034/task-board.git

## デプロイ先

https://github.com/smy034/task-board

## GitHubリポジトリ

https://github.com/smy034/task-board
