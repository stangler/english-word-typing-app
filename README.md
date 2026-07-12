# 英単語タイピング確認テスト

NEW CROWN Lesson 1〜4 + 小学校 + 曜日・月・日にち の単語を対象としたタイピング練習アプリです。

ブラウザだけで動作するので、サーバーを用意する必要はありません。

## 使い方

1. `english_typing.html` をブラウザで直接開く（サーバー不要）
2. レッスンを選んでスタート
3. 日本語の意味に合う英単語・熟語をタイピング → Enter で答え合わせ

### 機能

- **シャッフル機能**: 問題の順番をランダムに並び替えて出題できます
- **正誤記録**: セッション内の正解数・不正解数がリアルタイムに表示されます
- **復習機能**: 終了画面で間違えた単語の一覧を確認できます
- **パート／カテゴリー選択**: Lesson1〜4は「Lesson1」ボタン→「Part1」「Goal Activity」のようにパート単位で、「小学校」は「人」「動物」などカテゴリー単位で出題できます（項目数の多いカテゴリーは「その他いろいろな名詞①〜③」のように分割済み）。トップ画面のボタン数を抑えるため、パート・カテゴリーは1つのボタンをタップして開くパネルから選ぶ方式です
- **テスト履歴**: トップ画面下部に直近の結果一覧を表示（結果はリロードなしで即時反映）。結果画面の「履歴を見る」ボタンから、レッスンごとの正答率推移グラフと全履歴の一覧を確認できます
- **進捗状況の可視化**: 履歴画面に「進捗状況」パネルを表示し、Lesson1〜4の各パート・小学校の各カテゴリーについて「済（直近の正答率）」「未着手」が出題済み問題数とともに一目でわかります。バッジをタップするとその項目のクイズにすぐ挑戦できます

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
| `xlsx/Lesson4.xlsx` | NEW CROWN Lesson 4 の単語データ |
| `xlsx/小学校.xlsx` | 小学校の基本英単語（任意） |
| `xlsx/曜日.xlsx` | 曜日の単語（任意） |
| `xlsx/月.xlsx` | 月の単語（任意） |
| `xlsx/日にち.xlsx` | 日にち（first〜fourth）の単語（任意） |

```bash
pnpm run build
```

## 注意事項

- ビルドで生成された `xlsx/` および `json/` ディレクトリは Git 管理対象です。  
  リポジトリをクローンしたら `pnpm install && pnpm run build` でデータを生成できます。

## ファイル構成

| ファイル | 説明 |
|---|---|
| `english_typing.html` | メインアプリ（ブラウザで直接開く） |
| `build.mjs` | Excel → JSON 変換スクリプト |
| `package.json` | プロジェクト設定・スクリプト定義 |
| `pnpm-lock.yaml` | pnpm ロックファイル |
| `.gitignore` | Git 管理除外設定 |
| `.npmrc` | npm/pnpm 設定 |
| `xlsx/` | 元のExcelファイル（編集するのはここ、Git管理対象） |
| `json/` | ビルド成果物のJSON（Git管理対象） |

### ビルドで生成されるファイル

| ファイル | 説明 |
|---|---|
| `json/words-data.js` | 全単語データ（HTMLから直接読み込まれる） |
| `json/words.json` | 全単語データ（JSON形式） |
| `json/lesson1-1.json`〜`lesson1-4.json` | Lesson 1（Part1〜3・Goal Activity）のデータ |
| `json/lesson2-1.json`〜`lesson2-3.json` | Lesson 2（Part1・Part2・Goal Activity）のデータ |
| `json/lesson3-1.json`〜`lesson3-6.json` | Lesson 3（Introduction・Part1〜3・Goal Activity＋復習）のデータ |
| `json/lesson4-1.json`〜`lesson4-6.json` | Lesson 4（Introduction・Part1〜4・Goal Activity＋復習）のデータ |
| `json/lesson-elementary.json` | 小学校のみのデータ |

## 対象単語

- Lesson 1〜4（NEW CROWN、各レッスンともPart単位で分割済み）
  - Lesson 1: 1-1〜1-4（Part1〜3・Goal Activity）
  - Lesson 2: 2-1〜2-3（Part1・Part2・Goal Activity）
  - Lesson 3: 3-1〜3-6（Introduction・Part1〜3・Goal Activity＋復習）
  - Lesson 4: 4-1〜4-6（Introduction・Part1〜4・Goal Activity＋復習）
- 小学校で習う基本英単語（カテゴリー: 人／動物／食べ物・飲み物／身の回りのもの①②／場所①②／自然／教科／スポーツ／その他いろいろな名詞①②③／状態や動作を表すことば①②③④／名詞をくわしくできることば①②③／動詞・形容詞をくわしくできることば）
- 曜日（Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday）
- 月（April, May, June, July）
- 日にち（first, second, third, fourth）

## 技術

- 純粋なHTML + CSS + JavaScript（フレームワーク不使用）
- データは `json/words-data.js` から読み込み（サーバー不要、ブラウザで直接開いて動作）
- Excel → JSON変換には [SheetJS](https://sheetjs.com/) を使用
- パッケージ管理: [pnpm](https://pnpm.io/)