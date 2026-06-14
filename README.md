# 🧩 Mosaic — PWA版

DIDシステム向けのプライベートメモアプリ（静的サイト・PWA）

## ファイル構成

```
mosaic-pwa/
├── index.html      ← アプリ本体（これ1ファイルで完結）
├── manifest.json   ← PWAメタ情報
├── sw.js           ← Service Worker（オフライン対応）
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## GitHub Pages で公開する手順

### 1. GitHubアカウント作成
https://github.com にアクセスして無料登録

### 2. 新しいリポジトリを作成
- 右上の「+」→「New repository」
- Repository name: `mosaic`
- Public を選択
- 「Create repository」

### 3. ファイルをアップロード
ターミナルがある場合：
```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/あなたのユーザー名/mosaic.git
git push -u origin main
```

GitHubのウェブ画面からもドラッグ&ドロップでアップロード可能。

### 4. GitHub Pages を有効化
- リポジトリページ → Settings → Pages
- Source: 「Deploy from a branch」
- Branch: `main` / folder: `/ (root)`
- Save

### 5. 公開完了！
数分後に以下のURLでアクセスできます：
```
https://あなたのユーザー名.github.io/mosaic/
```

このURLをTwitterでシェアするだけで配布完了。

---

## PWA（ホーム画面に追加）の動作

### Android（Chrome）
ブラウザがインストールバナーを自動表示します。
またはメニュー（⋮）→「ホーム画面に追加」

### iPhone / iPad（Safari）
1. Safariの共有ボタン（□↑）をタップ
2. 「ホーム画面に追加」を選択
3. 「追加」をタップ

アプリ内の「設定」タブにも手順を表示しています。

---

## カスタマイズ

`index.html` を編集するだけで変更できます：

- アプリ名: `<title>` タグと `.setup-logo` のテキスト
- テーマカラー: CSS変数 `--text`, `--bg`
- アルターのカラーパレット: `const PALETTE = [...]`
- 気分の種類: `const MOODS = [...]`

---

## プライバシー

- データはすべてデバイスのlocalStorageに保存
- サーバー不要・通信なし
- 完全無料・オフライン動作
