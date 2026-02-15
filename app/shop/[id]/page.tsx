import { Navigation } from "@/components/Navigation";
import { getShop, getStats } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";

const shopEmojis: Record<string, string> = {
  "茂木一〇香本家": "🍘",
  "パンのオロン": "🥖",
  "茂木のてんぷら屋": "🍤",
};

export default async function ShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shop = await getShop(id);
  const stats = await getStats();

  if (!shop) {
    notFound();
  }

  const emoji = shopEmojis[shop.name] || "🏪";

  return (
    <>
      <Navigation />
      <div className="container">
        {/* パンくずリスト */}
        <div className="py-4 text-[11px]" style={{ color: 'var(--ink4)' }}>
          <Link href="/" className="hover:underline">茂木さんぽ</Link>
          {" / "}
          <span style={{ color: 'var(--ink2)' }}>{shop.name}</span>
        </div>

        {/* ヘッダー - 冒頭メッセージ */}
        <section className="pt-8 pb-10 text-center" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--ink4)' }}>
            {shop.category} · Mogi, Nagasaki
          </div>
          <div className="text-[48px] mb-4">{emoji}</div>
          <h1 className="text-[36px] mb-4">{shop.name}</h1>

          {/* 冒頭メッセージ */}
          <div className="max-w-[500px] mx-auto mb-6">
            <p className="text-[15px] leading-[1.9]" style={{ color: 'var(--ink2)' }}>
              長崎に来たら立ち寄ってみたい、<em>「数量限定」のお菓子</em>が待っています。
            </p>
            <p className="text-[14px] mt-3 leading-[1.85]" style={{ color: 'var(--ink3)' }}>
              立ち寄ってくださった方のその場の<br />
              <strong style={{ color: 'var(--accent)', fontWeight: 500 }}>ピュアな口コミ感想累計 {shop.reviews.length}件</strong>
            </p>
          </div>

          {/* 店舗情報タイル */}
          <div className="max-w-[500px] mx-auto mt-6 grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-md text-left"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="text-[10px] tracking-[0.06em] mb-1" style={{ color: 'var(--ink4)' }}>
                住所
              </div>
              <div className="text-[13px]" style={{ color: 'var(--ink)' }}>
                {shop.address}
              </div>
            </div>
            {shop.openingHours && (
              <div
                className="p-4 rounded-md text-left"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div className="text-[10px] tracking-[0.06em] mb-1" style={{ color: 'var(--ink4)' }}>
                  営業時間
                </div>
                <div className="text-[13px]" style={{ color: 'var(--ink)' }}>
                  {shop.openingHours}
                </div>
              </div>
            )}
            {shop.closedDays && (
              <div
                className="p-4 rounded-md text-left"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div className="text-[10px] tracking-[0.06em] mb-1" style={{ color: 'var(--ink4)' }}>
                  定休日
                </div>
                <div className="text-[13px]" style={{ color: 'var(--ink)' }}>
                  {shop.closedDays}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 装飾 */}
        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* 商品・特徴 */}
        <section>
          <small>Specialty</small>
          <h2>名物・おすすめ商品</h2>
          <p className="mb-4 text-[13px]">{shop.description}</p>
          <div className="flex gap-2 flex-wrap mb-6">
            {shop.specialty.map((item, idx) => (
              <span
                key={idx}
                className="inline-block px-4 py-2 text-[13px] tracking-[0.02em] rounded-md font-medium"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* 口コミ一覧 */}
        <section>
          <small>Reviews</small>
          <h2>口コミを見てみる</h2>
          <p className="mb-5 text-[13px]">
            実際に訪れた方の、シンプルながらもビジュアル的に楽しい口コミです。
          </p>
          <ReviewList reviews={shop.reviews} shopId={shop.id} />
        </section>

        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* 口コミ投稿フォーム */}
        <section style={{ borderBottom: 'none' }}>
          <small>Write a Review</small>
          <h2>あなたの感想を書く</h2>
          <p className="mb-5 text-[13px]">
            友達へのお土産、限定商品を見つけた感動を、次の誰かに届けてください。
          </p>
          <ReviewForm shopId={shop.id} />
        </section>
      </div>

      {/* Toast通知 */}
      <div
        id="toast"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-md px-5 py-[10px] text-[13px] opacity-0 transition-all duration-300 z-[200] translate-y-[60px]"
        style={{
          border: '1px solid var(--border)',
          color: 'var(--ink)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        }}
      />

      {/* フッター */}
      <footer className="py-8 text-center text-[10px] tracking-[0.08em]" style={{ color: 'var(--ink5)' }}>
        茂木さんぽ — 和華蘭の港町から ｜{" "}
        <Link href="/owner" style={{ color: 'var(--ink4)', borderBottom: '1px solid var(--border)' }}>
          店舗の方はこちら
        </Link>
      </footer>
    </>
  );
}
