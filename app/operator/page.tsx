import { Navigation } from "@/components/Navigation";
import Link from "next/link";

export default function OperatorPage() {
  return (
    <>
      <Navigation />

      {/* ヒーローセクション - 背景画像付き */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          <img
            src="/osakana-dao-bg-optimized.jpg"
            alt="おさかなDAO - 地元の子が描いた絵"
            className="w-full h-full object-cover"
          />
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* コンテンツ */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <div className="text-[11px] tracking-[0.3em] uppercase mb-3 opacity-90">
            Operator
          </div>
          <h1 className="text-[36px] md:text-[48px] font-light tracking-tight mb-4 text-white drop-shadow-lg">
            運営元
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[600px] leading-[1.8] opacity-95 drop-shadow-md">
            茂木さんぽは、<strong>おさかなDAO</strong>によって運営されています。
          </p>
        </div>
      </div>

      <div className="container">
        {/* おさかなDAOについて */}
        <section className="pt-12 pb-8">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-8">
              <div className="text-[48px] mb-4">🐟</div>
              <h2 className="text-[28px] mb-3">おさかなDAO</h2>
              <p className="text-[14px]" style={{ color: 'var(--ink3)' }}>
                地域と人をつなぐ、新しいコミュニティの形
              </p>
            </div>

            {/* 説明セクション */}
            <div className="space-y-6 mb-10">
              <div
                className="p-6 rounded-lg"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <h3 className="text-[18px] font-medium mb-3" style={{ color: 'var(--accent)' }}>
                  私たちのミッション
                </h3>
                <p className="text-[14px] leading-[1.9]" style={{ color: 'var(--ink2)' }}>
                  おさかなDAOは、地域の魅力を守り、次世代につなげるために活動しています。
                  茂木のような小さな港町には、大手プラットフォームには載らない宝物がたくさんあります。
                  私たちは、そんな地域の魅力を地元の目線で発信し、応援する仕組みを作っています。
                </p>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <h3 className="text-[18px] font-medium mb-3" style={{ color: 'var(--accent)' }}>
                  地域との関わり
                </h3>
                <p className="text-[14px] leading-[1.9] mb-4" style={{ color: 'var(--ink2)' }}>
                  このサイトの背景画像は、地元の子どもたちが描いてくれました。
                  地域の人々と一緒に、茂木の未来を創っていきます。
                </p>
                <ul className="space-y-2 text-[13px]" style={{ color: 'var(--ink3)' }}>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">🎨</span>
                    <span>地元の子どもたちとのアートプロジェクト</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">🏪</span>
                    <span>小さなお店を応援する口コミプラットフォーム</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">🌊</span>
                    <span>地域の魅力を次世代に継承する活動</span>
                  </li>
                </ul>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <h3 className="text-[18px] font-medium mb-3" style={{ color: 'var(--accent)' }}>
                  茂木さんぽについて
                </h3>
                <p className="text-[14px] leading-[1.9]" style={{ color: 'var(--ink2)' }}>
                  茂木さんぽは、巨大プラットフォームに情報を預けるのではなく、
                  地場のお店をピュアに応援するためのサイトです。
                  承認欲求のためではなく、お店や店員さんへの感謝と応援を伝える場所として、
                  地域創生の一助となることを目指しています。
                </p>
              </div>
            </div>

            {/* アクション */}
            <div className="text-center pt-4 pb-8">
              <Link
                href="/"
                className="inline-block px-8 py-3 rounded-md text-[14px] font-medium transition-all"
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  border: '1px solid var(--accent)',
                }}
              >
                トップページへ戻る
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* フッター */}
      <footer className="py-8 text-center text-[10px] tracking-[0.08em]" style={{ color: 'var(--ink5)' }}>
        茂木さんぽ — 和華蘭の港町から ｜ 運営：おさかなDAO
      </footer>
    </>
  );
}
