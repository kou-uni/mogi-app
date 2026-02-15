"use client";

import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-[100] backdrop-blur-xl border-b"
      style={{
        background: 'rgba(247, 243, 237, 0.92)',
        borderColor: 'var(--border)'
      }}>
      <div className="container flex items-center justify-between py-[10px]">
        <span className="text-[15px] font-medium tracking-[0.06em]" style={{ color: 'var(--ink)' }}>
          茂木さんぽ
        </span>
        <div className="flex gap-4 text-[12px]">
          <Link href="/#shops" className="transition-colors tracking-[0.04em]"
            style={{ color: 'var(--ink3)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink3)'}>
            お店
          </Link>
          <Link href="/#journey" className="transition-colors tracking-[0.04em]"
            style={{ color: 'var(--ink3)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink3)'}>
            歩き方
          </Link>
          <Link href="/#about" className="transition-colors tracking-[0.04em]"
            style={{ color: 'var(--ink3)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink3)'}>
            このサイト
          </Link>
        </div>
      </div>
    </nav>
  );
}
