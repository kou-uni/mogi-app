# 茂木さんぽ — 港町のお店を応援するアプリ

長崎・茂木地域の地場店舗を応援するための口コミ・支援プラットフォーム。

## 🎯 コンセプト

- **ピュアな応援**: GAFAMのような巨大プラットフォームではなく、地場のお店を直接応援
- **Z世代向け**: 18-22歳の大学生をターゲットに、衝動買いを誘発するUX
- **和華蘭デザイン**: 長崎の文化（和・華・蘭）を反映したオリエンタルデザイン
- **匿名可**: アカウント不要で気軽に口コミ投稿

## 🏗️ 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **データベース**: PostgreSQL + Prisma ORM
- **UI**: Tailwind CSS + カスタムCSS（和華蘭テーマ）
- **QRコード**: react-qr-code

## 📦 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーして、データベースURLを設定：

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mogi_support?schema=public"
```

### 3. データベースのセットアップ

```bash
# Prismaマイグレーション実行
npx prisma migrate dev --name init

# シードデータ投入
npx prisma db seed
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 📁 プロジェクト構成

```
mogi-support-app/
├── app/
│   ├── page.tsx              # ユーザー向けトップページ
│   ├── owner/
│   │   └── page.tsx          # 店舗向けQR発行ページ
│   ├── layout.tsx
│   └── globals.css           # 和華蘭テーマCSS
├── components/
│   ├── Navigation.tsx        # ナビゲーションバー
│   ├── ShopCard.tsx          # 店舗カード（口コミ付き）
│   └── QRCodeGenerator.tsx  # QRコード生成モーダル
├── lib/
│   ├── db.ts                 # Prismaクライアント
│   └── actions.ts            # サーバーアクション
├── prisma/
│   ├── schema.prisma         # データベーススキーマ
│   └── seed.ts               # 初期データ
└── package.json
```

## 🎨 デザインシステム

### カラーパレット

```css
--bg: #F7F3ED;         /* 背景（和紙色） */
--card: #fff;          /* カード背景 */
--ink: #1a1a1a;        /* 主要テキスト */
--accent: #8B4513;     /* アクセント（茶色） */
--vermillion: #C73E3A; /* 朱色（応援ボタン） */
--indigo: #2D4A6F;     /* 藍色（リンク） */
--moss: #5B7A5E;       /* 苔色 */
--gold: #B8963E;       /* 金色 */
```

### フォント

- **Shippori Mincho**: メインフォント（明朝体）
- **Noto Serif JP**: 補助フォント

## 🚀 主要機能

### ユーザー向け

- ✅ 店舗一覧表示
- ✅ 口コミ閲覧・投稿（匿名可）
- ✅ 応援ボタン（ハート）
- ✅ 茂木の歩き方（ジャーニーマップ）
- ✅ ハッシュリンクで特定店舗へジャンプ

### 店舗向け

- ✅ 店舗別QRコード生成
- ✅ QRコード印刷機能（A4対応）
- ✅ 口コミ確認
- ✅ URL直接コピー

## 🗄️ データベーススキーマ

### Shop（店舗）

- 店舗名、カテゴリ、住所
- 説明文、名物（specialty）
- 営業時間、定休日
- 画像URL、QRコード

### Review（口コミ）

- 投稿者名（匿名可）
- 口コミ本文
- 画像（複数枚）
- 評価（1-5、オプション）
- タグ

### Guide（道先案内人）※拡張予定

- 名前、役割
- 自己紹介、プロフィール画像
- おすすめ店舗

### GuideRoute（散歩ルート）※拡張予定

- ルート名、説明
- 訪問店舗の順序
- 所要時間、距離

## 🛠️ 今後の拡張予定

- [ ] 電子チケット機能
- [ ] 道先案内人（ガイド）ページ
- [ ] 散歩ルート機能
- [ ] 画像アップロード
- [ ] 応援の永続化（Cookie/セッション管理）
- [ ] 管理画面（店舗追加・編集）
- [ ] SNSシェア用「応援証明書」画像生成

## 📝 ライセンス

MIT

## 🙏 クレジット

デザインコンセプト: 長崎・茂木の和華蘭文化
フォント: Google Fonts (Shippori Mincho, Noto Serif JP)
