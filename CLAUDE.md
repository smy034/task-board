# quiz-app

一般常識クイズアプリ。HTML/CSS/JavaScriptのみで構成されたフロントエンド専用アプリ。

## 技術スタック

- HTML5
- CSS3
- Vanilla JavaScript（フレームワーク・ライブラリなし）
- ビルドツール・パッケージマネージャなし（`npm install` 不要）

## プロジェクト構造

```
quiz-app/
├── index.html        # エントリーポイント
├── style.css         # スタイル
├── script.js         # クイズロジック
└── questions.js      # 問題データ（または questions.json）
```

## 開発・動作確認

ビルド不要。`index.html` をブラウザで直接開くか、Live Server 等で確認する。

```
# VS Code の Live Server 拡張を使う場合
index.html を右クリック → "Open with Live Server"
```

## コーディング規約

- インデントはスペース2文字
- セミコロンあり
- `var` は使用しない（`const` / `let` を使う）
- DOM操作は `document.querySelector` / `querySelectorAll` を使用
- コメントは日本語で記述してよい

## 機能概要

- 一般常識の問題をランダム出題
- 4択形式（正解1つ）
- 正誤判定と得点集計
- 全問終了後にスコア表示

## 注意事項

- 外部APIやサーバーへの通信は行わない（完全にクライアントサイドで動作）
- `localStorage` を使って成績を保存する場合はその旨をコメントに明記する
