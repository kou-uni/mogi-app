"use client";

import { useState } from "react";
import { createReview } from "@/lib/actions";

interface ReviewFormProps {
  shopId: string;
}

export default function ReviewForm({ shopId }: ReviewFormProps) {
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmitting(true);

    const result = await createReview({
      shopId,
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
    <form onSubmit={handleSubmit} className="max-w-[600px]">
      <div
        className="bg-white rounded-md p-6"
        style={{ border: '1px solid var(--border)' }}
      >
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="このお店への感謝・応援を書く..."
          className="w-full rounded-md px-3 py-3 text-[14px] resize-vertical min-h-[120px] leading-[1.7] transition-colors duration-200"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent2)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          required
        />
        <div className="flex gap-3 mt-4 items-center flex-wrap">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="ニックネーム（省略可）"
            className="flex-1 min-w-[200px] rounded-md px-3 py-2 text-[13px] transition-colors duration-200"
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              color: 'var(--ink)',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent2)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
          <button
            type="submit"
            disabled={isSubmitting || !reviewText.trim()}
            className="px-8 py-2 text-[14px] font-medium rounded-md transition-opacity duration-200 tracking-[0.02em] disabled:opacity-50"
            style={{
              background: 'var(--ink)',
              color: 'var(--bg)',
            }}
          >
            {isSubmitting ? '投稿中...' : '投稿する'}
          </button>
        </div>
      </div>
    </form>
  );
}
