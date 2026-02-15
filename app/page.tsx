import { Navigation } from "@/components/Navigation";
import { ShopCardSimple } from "@/components/ShopCardSimple";
import { getShops, getStats } from "@/lib/actions";
import Link from "next/link";

// 店舗ごとの絵文字マッピング
const shopEmojis: Record<string, string> = {
  "茂木一〇香本家": "🍘",
  "パンのオロン": "🥖",
  "茂木のてんぷら屋": "🍤",
};

export default async function Home() {
  const shops = await getShops();
  const stats = await getStats();

  return (
    <>
      <Navigation />
      <div className="container">
        {/* ヒーローセクション */}
        <section className="text-center pt-14 pb-10" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--ink4)' }}>
            和 · 華 · 蘭 — Mogi, Nagasaki
          </div>
          <h1 className="mb-3">
            知る人ぞ知る、<br />港町のお店を応援する
          </h1>
          <p className="text-[15px] max-w-[540px] mx-auto mb-6 leading-[1.9]" style={{ color: 'var(--ink3)' }}>
            長崎・茂木。バスで20分の漁師町に、地元に愛される小さなお店があります。<br />
            ここに、地域創生は一つの口コミから…♡<br />
            地元の笑顔に触れて、一緒にこの美しい日本の海を感じて、おいしいごはんを食べましょう。<br />
            <strong style={{ color: 'var(--accent)' }}>地元の宿のオーナーが自信をもってお勧めします！</strong>
          </p>
          <div className="flex justify-center gap-6 mt-5 mb-5 text-[13px]" style={{ color: 'var(--ink3)' }}>
            <span>🏯 和</span>
            <span>🏮 華</span>
            <span>⚓ 蘭</span>
          </div>

          {/* 統計 */}
          <div
            className="grid grid-cols-2 gap-0 my-5 rounded-md overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="p-4 text-center" style={{ borderRight: '1px solid var(--border)' }}>
              <div className="text-[24px] font-light tracking-tighter" style={{ color: 'var(--ink)' }}>
                {stats.shops}
              </div>
              <div className="text-[10px] tracking-[0.08em] mt-[2px]" style={{ color: 'var(--ink4)' }}>
                地元民自慢のお店
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-[24px] font-light tracking-tighter" style={{ color: 'var(--ink)' }}>
                {stats.reviews}
              </div>
              <div className="text-[10px] tracking-[0.08em] mt-[2px]" style={{ color: 'var(--ink4)' }}>
                地域創生への応援
              </div>
            </div>
          </div>
        </section>

        {/* 装飾 */}
        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* 店舗一覧 */}
        <section id="shops">
          <small>Local Shops</small>
          <h2>茂木のお店</h2>
          <p className="mb-5 text-[13px]">道先案内人と歩く、朝の散歩コース。</p>
          <div>
            {shops.map((shop) => (
              <ShopCardSimple
                key={shop.id}
                shop={shop}
                emoji={shopEmojis[shop.name] || "🏪"}
              />
            ))}
          </div>
        </section>

        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* 茂木の歩き方 - 実際のオーナー情報 */}
        <section id="journey">
          <small>Journey</small>
          <h2>海と風を感じてください</h2>
          <p className="mb-4 text-[13px]">茂木での一日は、五感で味わう特別な時間。</p>

          <div className="space-y-0">
            {[
              { num: "01", title: "信頼できる人からの声", desc: "「茂木にね、いいホテルがあるんだよ」友達の温かい言葉に導かれて。" },
              { num: "02", title: "オーナーとの出会い", desc: "長崎の街角から車で15分。窓の外に広がる海と、オーナーの笑顔。" },
              { num: "03", title: "潮風に包まれて", desc: "元料亭の趣ある宿。窓を開ければ橘湾の波音と、夜は月明かりが揺れる。" },
              { num: "04", title: "朝の光とともに", desc: "オーナーと歩く朝の散歩道。路地裏から香る焼きたてパンの匂い。" },
              { num: "05", title: "心に残る味を、次へ", desc: "出会った温かさを口コミに。あなたの言葉が、誰かの旅のはじまりに。" },
            ].map((step, idx, arr) => (
              <div
                key={step.num}
                className="flex gap-[14px] py-[14px]"
                style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid var(--border)' }}
              >
                <div className="text-[11px] w-[18px] flex-shrink-0 pt-[3px] tracking-[0.04em]" style={{ color: 'var(--ink5)' }}>
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] mb-[3px]">{step.title}</h3>
                  <p className="text-[13px]" style={{ color: 'var(--ink2)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* オーナーメッセージ */}
          <div
            className="mt-6 p-6 rounded-md"
            style={{ background: 'var(--card)', border: '1px solid var(--accent2)' }}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[28px] flex-shrink-0" style={{ background: 'var(--bg)' }}>
                🌊
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-medium mb-1" style={{ color: 'var(--ink)' }}>
                  「ぶらぶら・月と海」オーナー
                </h3>
                <p className="text-[11px] mb-3" style={{ color: 'var(--ink4)' }}>
                  おさかなDAO · 地域創生
                </p>
                <p className="text-[14px] leading-[1.85] mb-2" style={{ color: 'var(--ink2)' }}>
                  茂木の魅力は、小さな店に宿る人の温かさ。<br />
                  <strong style={{ color: 'var(--accent)' }}>近くを案内しますよ！</strong>
                </p>
                <p className="text-[12px] leading-[1.75]" style={{ color: 'var(--ink3)' }}>
                  朝食後の散歩で、地元の人しか知らないお菓子屋さん、パン屋さん、てんぷら屋さんへ。
                  食べ歩きをしながら、茂木の日常を感じてください。
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-[11px] tracking-[0.3em] py-2" style={{ color: 'var(--ink5)' }}>
          — ◆ —
        </div>

        {/* このサイトについて */}
        <section id="about" style={{ borderBottom: 'none' }}>
          <small>About</small>
          <h2>このサイトについて</h2>
          <p className="mb-3 text-[13px]">
            茂木さんぽは、巨大プラットフォームに情報を預けるのではなく、
            <br />
            <em>地場のお店をピュアに応援する</em>ためのサイトです。
          </p>
          <p className="text-[13px]">
            承認欲求のためではなく、お店や店員さんへの
            <em>感謝と応援</em>を伝える場所。
            <br />
            口コミが積み重なることで、まだ茂木を知らない人に届きます。
          </p>
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
