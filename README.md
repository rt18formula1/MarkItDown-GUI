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

## 購入

MarkItDown-GUIはBOOTHで100円で販売しています。

- [BOOTH商品ページ](https://meteor-cs.booth.pm/items/9057523)

## Webサイト

MarkItDown GUIの公式ウェブサイトです。アプリの紹介と購入リンクを提供しています。

- 日英両対応
- Vercelでホスティング
- アプリの機能説明とBOOTH購入リンク

### ローカル実行

```sh
cd web-nextjs
npm install
npm run dev
```

### デプロイ

ウェブサイトは https://vercel.com でホスティングされています。
