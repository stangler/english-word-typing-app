# 英単語タイピング確認テスト

NEW CROWN Lesson 1〜3 + 小学校 + 曜日・月・日にち の単語を対象としたタイピング練習アプリです。

ブラウザだけで動作するので、サーバーを用意する必要はありません。

## 使い方

1. `english_typing.html` をブラウザで直接開く（サーバー不要）
2. レッスンを選んでスタート
3. 日本語の意味に合う英単語・熟語をタイピング → Enter で答え合わせ

### 機能

- **シャッフル機能**: 問題の順番をランダムに並び替えて出題できます
- **正誤記録**: セッション内の正解数・不正解数がリアルタイムに表示されます
- **復習機能**: 終了画面で間違えた単語の一覧を確認できます
- **カテゴリー選択**: 「小学校」を選ぶと「人」「動物」「食べ物」などのカテゴリーごとに出題できます

## 開発環境のセットアップ

### 必要なもの

- [Node.js](https://nodejs.org/)（npm / pnpm 含む）
- [pnpm](https://pnpm.io/)（`npm install -g pnpm` で導入可能）

### 初期セットアップ

```bash
# 依存パッケージのインストール
pnpm install
```

### 単語データの更新

`xlsx/` フォルダに以下のExcelファイルを配置した後、`pnpm run build` でJSONデータを再生成します。

必要なExcelファイル:
| ファイル | 内容 |
|---|---|
| `xlsx/Lesson1.xlsx` | NEW CROWN Lesson 1 の単語データ |
| `xlsx/Lesson2.xlsx` | NEW CROWN Lesson 2 の単語データ |
| `xlsx/Lesson3.xlsx` | NEW CROWN Lesson 3 の単語データ |
| `xlsx/小学校.xlsx` | 小学校の基本英単語（任意） |
| `xlsx/曜日.xlsx` | 曜日の単語（任意） |
| `xlsx/月.xlsx` | 月の単語（任意） |
| `xlsx/日にち.xlsx` | 日にち（first〜fourth）の単語（任意） |

```bash
pnpm run build
```

## 注意事項

- `xlsx/` および `json/` ディレクトリは Git 管理対象外（`.gitignore`）です。  
  リポジトリをクローンしたら、自分でExcelファイルを用意するか、既存の環境からコピーしてください。

## ファイル構成

| ファイル | 説明 |
|---|---|
| `english_typing.html` | メインアプリ（ブラウザで直接開く） |
| `build.mjs` | Excel → JSON 変換スクリプト |
| `package.json` | プロジェクト設定・スクリプト定義 |
| `pnpm-lock.yaml` | pnpm ロックファイル |
| `.gitignore` | Git 管理除外設定 |
| `.npmrc` | npm/pnpm 設定 |
| `xlsx/` | 元のExcelファイル（編集するのはここ、Git管理外） |
| `json/` | ビルド成果物のJSON（Git管理外） |

### ビルドで生成されるファイル

| ファイル | 説明 |
|---|---|
| `json/words-data.js` | 全単語データ（HTMLから直接読み込まれる） |
| `json/words.json` | 全単語データ（JSON形式） |
| `json/lesson1.json` | Lesson 1 のみのデータ |
| `json/lesson2.json` | Lesson 2 のみのデータ |
| `json/lesson3.json` | Lesson 3 のみのデータ |
| `json/lesson-elementary.json` | 小学校のみのデータ |
| `json/lesson曜日.json` | 曜日のみのデータ |
| `json/lesson月.json` | 月のみのデータ |
| `json/lesson日にち.json` | 日にちのみのデータ |

## 対象単語

- Lesson 1〜3（NEW CROWN）
- 小学校で習う基本英単語
- 曜日（Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday）
- 月（April, May, June, July）
- 日にち（first, second, third, fourth）

## 技術

- 純粋なHTML + CSS + JavaScript（フレームワーク不使用）
- データは `json/words-data.js` から読み込み（サーバー不要、ブラウザで直接開いて動作）
- Excel → JSON変換には [SheetJS](https://sheetjs.com/) を使用
- パッケージ管理: [pnpm](https://pnpm.io/)