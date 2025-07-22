# 🏯 ご当地Nouns ギャラリー

47都道府県のLocal NounsをNFTイラストでスライドショー表示するギャラリーサイトです。

## 🎯 特徴

- **47都道府県対応**: 各都道府県のLocal NounsをNFTイラストで閲覧
- **スライドショー**: Swiper.jsを使用した滑らかなスライドショー
- **自動更新**: GitHub Actionsで毎日自動的にNFTデータを更新
- **レスポンシブ**: モバイル・デスクトップ両方に対応
- **高速表示**: GitHub Pages + CDN配信で高速
- **完全無料**: Claude Code + GitHub Pagesのみで構築

## 🚀 デモサイト

GitHub Pagesにデプロイされたサイトをご覧ください:
`https://[username].github.io/[repository-name]/`

## 🛠️ 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **スタイリング**: Tailwind CSS
- **スライドショー**: Swiper.js
- **状態管理**: Alpine.js
- **ビルドツール**: Node.js, npm
- **自動化**: GitHub Actions
- **ホスティング**: GitHub Pages

## 📁 プロジェクト構成

```
ご当地Nouns/
├── docs/                    # GitHub Pages配信ディレクトリ
│   ├── index.html          # メインページ（都道府県選択）
│   ├── prefecture/         # 都道府県別スライドショーページ
│   │   ├── 01_hokkaido.html
│   │   ├── 02_aomori.html
│   │   └── ...
│   └── data/              # NFTデータ（JSON）
│       ├── 01_hokkaido.json
│       ├── 02_aomori.json
│       └── ...
├── scripts/               # ビルドスクリプト
│   ├── fetch_data.js     # NFTデータ取得
│   └── generate_pages.js # ページ生成
├── .github/workflows/    # GitHub Actions
│   └── update-data.yml   # 自動更新ワークフロー
├── assets/css/          # スタイルファイル
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔧 ローカル開発

### 前提条件

- Node.js 18以上
- npm

### セットアップ

1. **リポジトリをクローン**
   ```bash
   git clone <repository-url>
   cd ご当地Nouns
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **都道府県ページを生成**
   ```bash
   npm run generate-pages
   ```

4. **NFTデータを取得（オプション）**
   ```bash
   npm run fetch-data
   ```

5. **ローカルサーバーを起動**
   ```bash
   npm run serve
   ```

6. ブラウザで `http://localhost:8080` にアクセス

### 開発用コマンド

```bash
# 都道府県ページを生成
npm run generate-pages

# NFTデータを取得
npm run fetch-data

# ローカルサーバー起動
npm run serve

# ビルド（ページ生成）
npm run build
```

## 🎨 カスタマイズ

### カラーパレット

Tailwind CSS設定でNounsのカラーパレットを使用:

```javascript
colors: {
  'nouns-bg': '#d5d7e1',      // 背景色
  'nouns-yellow': '#fed702',   // メインカラー
  'nouns-red': '#e74c3c',     // アクセント
  'nouns-blue': '#3b82f6',    // リンク
  'nouns-green': '#10b981'    // 成功
}
```

### スライドショー設定

`docs/prefecture/template.html`のSwiper設定で調整可能:

```javascript
autoplay: {
  delay: 3000,              // 自動再生間隔
  disableOnInteraction: false,
},
slidesPerView: 1,           // 表示枚数
spaceBetween: 30,           // スライド間隔
```

## 🔄 自動更新システム

GitHub Actionsが毎日JST 12:00に以下を実行:

1. **NFTデータ取得**: Local Nounsサイトから最新データを取得
2. **差分チェック**: 新しいNFTがある場合のみ更新
3. **自動コミット**: 変更があれば自動的にコミット・プッシュ
4. **GitHub Pages**: 自動的にサイトが更新される

### 手動実行

GitHub リポジトリの Actions タブから「Update Local Nouns Data」を手動実行可能。

## 📱 機能詳細

### メインページ（index.html）

- 47都道府県をカード形式で表示
- 検索機能（都道府県名・地方名）
- レスポンシブグリッドレイアウト
- 各都道府県の特徴的な絵文字表示

### スライドショーページ

- **自動再生**: 3秒間隔でスライド切り替え
- **ナビゲーション**: 左右ボタン・ページネーション
- **サムネイル**: 下部にサムネイル一覧
- **モーダル**: 画像クリックで拡大表示
- **メタデータ**: Head・Body情報表示
- **キーボード操作**: ESCキーでモーダル終了

### レスポンシブ対応

- **モバイル**: 1枚表示、シンプルなUI
- **タブレット**: 1.5枚表示
- **デスクトップ**: 2枚表示、サムネイル表示

## 🔍 データ取得の仕組み

### データソース

- **メインサイト**: https://jp.local-nouns.wtf
- **API**: 各都道府県のリストページ (`/list/{prefCode}`)

### 取得プロセス

1. **Puppeteer**でヘッドレスブラウザ起動
2. **各都道府県ページ**を順次アクセス
3. **画像URL**とメタデータを抽出
4. **JSON形式**で保存
5. **差分更新**で効率化

### エラー処理

- タイムアウト: 30秒
- リトライ: 自動で再試行
- フォールバック: エラー時は既存データを保持

## 🚀 デプロイ手順

### GitHub Pagesセットアップ

1. **GitHubリポジトリ作成**
   ```bash
   gh repo create local-nouns-slideshow --public
   ```

2. **ファイルをプッシュ**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **GitHub Pages有効化**
   - リポジトリ Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /docs

4. **数分後にサイトが公開される**

### カスタムドメイン（オプション）

1. `docs/CNAME`ファイルを作成
2. ドメイン名を記載
3. DNS設定でGitHub Pagesを指定

## 🔧 トラブルシューティング

### よくある問題

**Q: データが表示されない**
- A: `data/`ディレクトリにJSONファイルがあるか確認
- A: GitHub Actionsが正常に実行されているか確認

**Q: スライドショーが動かない**
- A: ブラウザのJavaScriptが有効か確認
- A: ネットワーク環境でCDNがブロックされていないか確認

**Q: GitHub Actionsが失敗する**
- A: `package.json`の依存関係を確認
- A: Puppeteerの実行権限を確認

### デバッグ方法

1. **ローカルでテスト**
   ```bash
   npm run fetch-data
   npm run serve
   ```

2. **ブラウザ開発者ツール**でエラーを確認

3. **GitHub Actions**のログを確認

## 📊 パフォーマンス

### 最適化項目

- **画像**: lazy loading適用
- **JSON**: 都道府県別に分割
- **CSS**: Tailwind CSS最適化
- **JavaScript**: CDN配信

### 目標値

- Lighthouse Performance: 90+
- 初回表示: 3秒以内
- スライド切り替え: 60fps

## 🤝 コントリビューション

1. フォークしてブランチ作成
2. 機能追加・バグ修正
3. プルリクエスト作成

### 開発ガイドライン

- **コードスタイル**: Prettier + ESLint
- **コミットメッセージ**: Conventional Commits
- **テスト**: 手動テスト必須

## 📄 ライセンス

MIT License

## 🙏 謝辞

- **Local Nouns**: NFTデータの提供
- **Swiper.js**: スライドショー機能
- **Tailwind CSS**: スタイリング
- **GitHub**: ホスティング・CI/CD

---

*このプロジェクトはClaude Code（月額プラン）のみで構築され、追加費用なしで運用できます。*