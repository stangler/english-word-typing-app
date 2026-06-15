# 英単語タイピング確認テスト

NEW CROWN Lesson 1〜3 + 小学校 単語のタイピング練習アプリです。

## 使い方

1. `english_typing.html` をブラウザで直接開く（サーバー不要）
2. レッスンを選んでスタート
3. 日本語の意味に合う英単語・熟語をタイピング → Enter で答え合わせ

## 単語データの更新

`xlsx/` フォルダのExcelファイルを編集した後、以下のコマンドでJSONを再生成します。

```bash
npm run build
```

### 必要なもの

- [Node.js](https://nodejs.org/)（npm含む）
- 初回のみ `npm install` を実行

### ファイル構成

| ファイル | 説明 |
|---|---|
| `english_typing.html` | メインアプリ（ブラウザで直接開く） |
| `build.mjs` | Excel → JSON 変換スクリプト |
| `xlsx/` | 元のExcelファイル（編集するのはここ） |
| `json/words-data.js` | 単語データ（`npm run build` で自動生成、HTMLから読み込まれる） |
| `json/words.json` | 単語データ（全件、JSON形式） |
| `json/lesson1.json` | Lesson 1 のみのデータ |
| `json/lesson2.json` | Lesson 2 のみのデータ |
| `json/lesson3.json` | Lesson 3 のみのデータ |
| `json/lesson-elementary.json` | 小学校のみのデータ |

## 対象単語

- Lesson 1〜3（NEW CROWN）
- 小学校で習う基本英単語

## 技術

- 純粋なHTML + CSS + JavaScript（フレームワーク不使用）
- データは `json/words-data.js` から読み込み（サーバー不要、ブラウザで直接開いて動作）
- Excel → JSON変換には [SheetJS](https://sheetjs.com/) を使用