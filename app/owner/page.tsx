import { getShops } from "@/lib/actions";
import Link from "next/link";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const shopEmojis: Record<string, string> = {
  "茂木一〇香本家": "🍘",
  "パンのオロン": "🥖",
  "茂木のてんぷら屋": "🍤",
};

export default async function OwnerPage() {
  const shops = await getShops();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return (
    <>
      {/* ナビゲーション */}
      <nav
        className="sticky top-0 z-[100] backdrop-blur-xl py-[10px]"
        style={{
          background: 'rgba(247, 243, 237, 0.92)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-[0.06em]" style={{ color: 'var(--ink)' }}>
            茂木さんぽ{" "}
            <small className="font-normal ml-1" style={{ color: 'var(--ink4)' }}>
              店舗用
            </small>
          </span>
          <Link
            href="/"
            className="text-[12px] tracking-[0.04em] transition-colors"
            style={{ color: 'var(--ink3)' }}
          >
            ← ユーザーページ
          </Link>
        </div>
      </nav>

      <div className="container">
        {/* 店舗の方へ */}
        <section>
          <small>For Shop Owners</small>
          <h1 className="text-[28px]">店舗の方へ</h1>
          <p className="mt-3 text-[14px]">
            茂木さんぽでは、お店ごとの<em>口コミ・応援ページ</em>を用意しています。
            <br />
            来店されたお客様が、スマホでQRコードを読み取り、
            <br />
            応援メッセージや口コミを書き込めます。
          </p>
        </section>

        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* 使い方 */}
        <section id="howto">
          <small>How to Use</small>
          <h2 className="text-[20px]">使い方</h2>
          <div className="space-y-0">
            {[
              { num: "01", title: "QRコードを発行する", desc: "下のお店一覧から「QRコードを発行」ボタンを押してください。" },
              { num: "02", title: "印刷する", desc: "表示されたQRコードを印刷します。A4用紙で印刷できます。" },
              { num: "03", title: "お店に設置する", desc: "レジ横、テーブル、入口など、お客様の目に入る場所に置いてください。" },
              { num: "04", title: "お客様が口コミを投稿", desc: "スマホで読み取ると、お店の口コミ・応援ページに直接アクセスできます。" },
            ].map((step, idx, arr) => (
              <div
                key={step.num}
                className="flex gap-[14px] py-[14px]"
                style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid var(--border)' }}
              >
                <div className="text-[11px] w-[18px] flex-shrink-0 pt-[3px] tracking-[0.04em]" style={{ color: 'var(--ink5)' }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="text-[14px] mb-[3px]">{step.title}</h3>
                  <p className="text-[13px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* 店舗管理 */}
        <section id="shops-owner">
          <small>Your Shops</small>
          <h2 className="text-[20px]">お店の管理</h2>
          <p className="mb-5 text-[13px]">QRコードの発行と、寄せられた口コミの確認ができます。</p>

          <div className="space-y-5">
            {shops.map((shop) => {
              const shopUrl = `${baseUrl}/#shop-${shop.id}`;
              const emoji = shopEmojis[shop.name] || "🏪";

              return (
                <div
                  key={shop.id}
                  className="bg-white rounded-md overflow-hidden"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {/* ヘッダー */}
                  <div className="p-5 pb-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-[18px] mb-[2px]">{shop.name}</h3>
                      <p className="text-[11px] tracking-[0.04em]" style={{ color: 'var(--ink4)' }}>
                        {shop.category} · {shop.address}
                      </p>
                    </div>
                    <span className="text-[32px] flex-shrink-0">{emoji}</span>
                  </div>

                  {/* 統計 */}
                  <div className="px-6 pb-5">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div
                        className="p-3 rounded-md text-center"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                      >
                        <div className="text-[20px] font-light" style={{ color: 'var(--ink)' }}>
                          0
                        </div>
                        <div className="text-[10px] tracking-[0.06em] mt-[2px]" style={{ color: 'var(--ink4)' }}>
                          応援
                        </div>
                      </div>
                      <div
                        className="p-3 rounded-md text-center"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                      >
                        <div className="text-[20px] font-light" style={{ color: 'var(--ink)' }}>
                          {shop.reviews.length}
                        </div>
                        <div className="text-[10px] tracking-[0.06em] mt-[2px]" style={{ color: 'var(--ink4)' }}>
                          口コミ
                        </div>
                      </div>
                    </div>

                    {/* URL */}
                    <div
                      className="text-[11px] font-mono px-3 py-2 rounded-md mb-3 break-all"
                      style={{ color: 'var(--ink4)', background: 'var(--bg)', border: '1px solid var(--border)' }}
                    >
                      {shopUrl}
                    </div>

                    {/* アクション */}
                    <QRCodeGenerator shopId={shop.id} shopName={shop.name} shopUrl={shopUrl} emoji={emoji} category={shop.category} address={shop.address} />
                  </div>

                  {/* 口コミ一覧 */}
                  <div className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="text-[12px] tracking-[0.06em] mb-2" style={{ color: 'var(--ink4)' }}>
                      {shop.reviews.length > 0 ? "最新の口コミ" : "口コミはまだありません"}
                    </div>
                    {shop.reviews.slice(0, 3).map((review, idx) => (
                      <div
                        key={review.id}
                        className="py-[10px]"
                        style={{ borderBottom: idx === shop.reviews.slice(0, 3).length - 1 ? 'none' : '1px solid var(--border)' }}
                      >
                        <div className="flex justify-between items-center mb-[2px]">
                          <span className="text-[12px] font-medium" style={{ color: 'var(--ink)' }}>
                            {review.userName || "匿名"}
                          </span>
                          <span className="text-[10px]" style={{ color: 'var(--ink5)' }}>
                            {new Date(review.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-[12px] leading-[1.75]" style={{ color: 'var(--ink3)' }}>
                          {review.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* フッター */}
      <footer className="py-8 text-center text-[10px] tracking-[0.08em]" style={{ color: 'var(--ink5)' }}>
        茂木さんぽ — 店舗用ページ ｜{" "}
        <Link href="/" style={{ color: 'var(--ink4)', borderBottom: '1px solid var(--border)' }}>
          ユーザーページ
        </Link>
      </footer>
    </>
  );
}
