import Link from "next/link";

interface ShopCardSimpleProps {
  shop: {
    id: string;
    name: string;
    category: string;
    address: string;
    description: string | null;
    specialty: string[];
    reviews: { id: string }[];
  };
  emoji: string;
}

export function ShopCardSimple({ shop, emoji }: ShopCardSimpleProps) {
  return (
    <Link href={`/shop/${shop.id}`}>
      <div
        className="bg-white rounded-md overflow-hidden transition-all duration-300 mb-4 hover:shadow-lg cursor-pointer"
        style={{
          border: '1px solid var(--border)',
        }}
      >
        {/* ヘッダー */}
        <div className="p-5 pb-3 flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-[18px] font-medium mb-[3px]" style={{ color: 'var(--ink)' }}>
              {shop.name}
            </h3>
            <p className="text-[11px] tracking-[0.04em] mb-2" style={{ color: 'var(--ink4)' }}>
              {shop.category} · {shop.address}
            </p>
            <div className="flex gap-[5px] mt-[6px] flex-wrap">
              {shop.specialty.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-[2px] text-[10px] tracking-[0.04em] rounded-full"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink3)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span className="text-[32px] flex-shrink-0 ml-3">{emoji}</span>
        </div>

        {/* 説明 */}
        <div className="px-5 pb-4 text-[13px] leading-[1.85]" style={{ color: 'var(--ink3)' }}>
          {shop.description && shop.description.length > 60
            ? `${shop.description.substring(0, 60)}...`
            : shop.description}
        </div>

        {/* フッター */}
        <div
          className="px-5 py-3 flex justify-between items-center"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}
        >
          <span className="text-[12px]" style={{ color: 'var(--ink4)' }}>
            口コミ {shop.reviews.length}件
          </span>
          <span className="text-[12px] flex items-center gap-1" style={{ color: 'var(--accent)' }}>
            詳しく見る →
          </span>
        </div>
      </div>
    </Link>
  );
}
