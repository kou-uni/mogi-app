"use client";

import { useState } from "react";
import { createReview } from "@/lib/actions";

interface Review {
  id: string;
  userName: string | null;
  content: string;
  createdAt: Date;
}

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    category: string;
    address: string;
    description: string | null;
    specialty: string[];
    reviews: Review[];
  };
  emoji: string;
  cheers: number;
  highlighted?: boolean;
}

export function ShopCard({ shop, emoji, cheers, highlighted }: ShopCardProps) {
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [isCheered, setIsCheered] = useState(false);
  const [localCheers, setLocalCheers] = useState(cheers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheer = () => {
    if (isCheered) return;
    setIsCheered(true);
    setLocalCheers((prev) => prev + 1);
    // TODO: サーバーアクションで永続化
  };

  const handleSubmit = async () => {
    if (!reviewText.trim()) return;
    setIsSubmitting(true);

    const result = await createReview({
      shopId: shop.id,
      userName: userName.trim() || undefined,
      content: reviewText.trim(),
    });

    if (result.success) {
      setReviewText("");
      setUserName("");
      // Toast通知を表示
      const toast = document.getElementById("toast");
      if (toast) {
        toast.textContent = "口コミを投稿しました";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2200);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className="bg-white rounded-md overflow-hidden transition-shadow duration-300 mb-4"
      style={{
        border: highlighted ? '1px solid var(--accent2)' : '1px solid var(--border)',
        boxShadow: highlighted ? '0 2px 16px rgba(139, 69, 19, 0.1)' : undefined,
      }}
      id={`shop-${shop.id}`}
    >
      {/* ヘッダー */}
      <div className="p-5 pb-3 flex justify-between items-start">
        <div>
          <h3 className="text-[17px] font-medium mb-[3px]" style={{ color: 'var(--ink)' }}>
            {shop.name}
          </h3>
          <p className="text-[11px] tracking-[0.04em]" style={{ color: 'var(--ink4)' }}>
            {shop.category} · {shop.address}
          </p>
          <div className="flex gap-[5px] mt-[6px] flex-wrap">
            {shop.specialty.map((tag, idx) => (
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
        <span className="text-[28px] flex-shrink-0">{emoji}</span>
      </div>

      {/* 説明 */}
      <div className="px-5 pb-[14px] text-[13px] leading-[1.85]" style={{ color: 'var(--ink3)' }}>
        {shop.description}
      </div>

      {/* フッター - 応援ボタン */}
      <div
        className="px-5 py-[10px] flex justify-between items-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <span className="text-[12px]" style={{ color: 'var(--ink4)' }}>
          ♡ {localCheers} 応援
        </span>
        <button
          onClick={handleCheer}
          disabled={isCheered}
          className={`px-[14px] py-[5px] text-[12px] rounded-full flex items-center gap-[5px] transition-all duration-200 tracking-[0.02em] ${
            isCheered ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{
            border: isCheered ? '1px solid var(--vermillion)' : '1px solid var(--border)',
            color: isCheered ? 'var(--vermillion)' : 'var(--ink3)',
            background: isCheered ? 'rgba(199, 62, 58, 0.05)' : 'transparent',
          }}
        >
          {isCheered ? '♥ 応援済み' : '♡ 応援する'}
        </button>
      </div>

      {/* 口コミ一覧 */}
      {shop.reviews.map((review) => (
        <div
          key={review.id}
          className="px-5 py-[14px]"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex justify-between items-center mb-[3px]">
            <span className="text-[13px] font-medium" style={{ color: 'var(--ink)' }}>
              {review.userName || "匿名"}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--ink5)' }}>
              {new Date(review.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit' })}
            </span>
          </div>
          <div className="text-[13px] leading-[1.85]" style={{ color: 'var(--ink2)' }}>
            {review.content}
          </div>
        </div>
      ))}

      {/* 口コミ投稿フォーム */}
      <div className="px-5 py-[14px]" style={{ borderTop: '1px solid var(--border)' }}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="このお店への感謝・応援を書く..."
          className="w-full rounded-md px-3 py-[10px] text-[13px] resize-vertical min-h-[56px] leading-[1.7] transition-colors duration-200"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent2)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        <div className="flex gap-2 mt-2 items-center">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="ニックネーム"
            className="flex-1 max-w-[140px] rounded-md px-3 py-[7px] text-[12px] transition-colors duration-200"
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              color: 'var(--ink)',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent2)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !reviewText.trim()}
            className="px-4 py-[7px] text-[12px] font-medium rounded-md transition-opacity duration-200 tracking-[0.02em] disabled:opacity-50"
            style={{
              background: 'var(--ink)',
              color: 'var(--bg)',
            }}
          >
            {isSubmitting ? '投稿中...' : '投稿'}
          </button>
        </div>
      </div>
    </div>
  );
}
