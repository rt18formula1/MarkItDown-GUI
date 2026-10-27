# MarkItDown GUI

[日本語](README.md) | [English](README.en.md)

既存のMicrosoft MarkItDownを呼び出すmacOSアプリと、独立したWeb版の最小構成です。変換エンジンを再実装しません。

## Macメニューバーアプリ

- 起動すると変換ウィンドウを表示し、ファイルのドラッグ＆ドロップまたはファイル選択で `.md` に変換
- 変換結果をプレビューし、Markdownをクリップボードへコピー
- メニューバーから変換ウィンドウ、ファイル選択、設定へアクセス
- 変換結果は設定したフォルダーへ保存（初期値はダウンロード）
- 変換状況の表示、出力先をFinderで開く
- MarkItDown本体は `/opt/homebrew/bin`、`/usr/local/bin`、`~/.local/bin` などの `markitdown` コマンドを探します

現在の作業環境ではMarkItDownの導入を確認できませんでした。別途既存の導入先がある場合は、上のいずれかの場所にコマンドへのリンクを置く必要があります。未導入なら、ユーザーの許可を得てセットアップします（この成果物は自動で環境を変更しません）。

### ビルドと配布

Xcodeが入ったMacで `./package-app.sh` を実行すると`MarkItDownGUI.app`を作成します。現状は未署名の個人利用向けバンドルです。ログイン時起動はアプリを「システム設定 → 一般 → ログイン項目」に追加します。一般配布にはDeveloper ID署名と公証が別途必要です。

この端末にはSwiftとCommand Line ToolsはありますがXcode本体がないため、`.app`バンドル化やログイン項目登録はまだ行っていません。

## 独立Web版

### ローカル実行（FastAPI）

ブラウザからテキストを貼り付けてMarkdownとして保存、またはファイルをアップロードして同じMarkItDown Pythonパッケージで変換できます。

```sh
cd web
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8000
```

### Next.js版（推奨）

Next.jsを使用したモダンなWebアプリです。日英両対応で、Vercelに最適化されています。

#### ローカル実行

```sh
cd web-nextjs
npm install
npm run dev
```

#### Vercelへのデプロイ

1. **Vercelアカウントの作成**
   - https://vercel.com/ でアカウントを作成

2. **Gitリポジトリの準備**
   - プロジェクトをGitHub/GitLab/Bitbucketにプッシュ

3. **Vercelで新規プロジェクトを作成**
   - Vercelダッシュボードで「Add New Project」
   - Gitプロバイダーを選択し、`rt18formula1/MarkItDown-GUI`リポジトリを選択

4. **プロジェクト設定**
   - **Framework Preset**: Next.js
   - **Root Directory**: `web-nextjs`
   - 自動検出される設定を使用

5. **デプロイ**
   - 「Deploy」をクリック
   - 自動的にデプロイが開始されます

#### 手動デプロイ（Vercel CLIを使用）

```sh
# Vercel CLIのインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
cd web-nextjs
vercel --prod
```

#### 注意点

- Vercel Serverless Functionsには実行時間制限（Hobby無料プラン: 10秒）があります
- 大きなファイルの変換にはタイムアウトする可能性があります
- テキスト貼り付けはクライアント側で処理され、そのまま`.md`としてダウンロードされます
- ファイル変換はMarkItDown Pythonパッケージを使用してサーバーレス関数で処理されます
