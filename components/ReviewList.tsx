"use client";

import { deleteReview } from "@/lib/actions";
import { useState } from "react";

interface Review {
  id: string;
  userName: string | null;
  content: string;
  createdAt: Date;
}

interface ReviewListProps {
  reviews: Review[];
  shopId: string;
}

export default function ReviewList({ reviews, shopId }: ReviewListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (reviewId: string) => {
    if (!confirm("この口コミを削除しますか？")) return;

    setDeletingId(reviewId);
    const result = await deleteReview(reviewId, shopId);

    if (result.success) {
      // Show success toast
      const toast = document.getElementById("toast");
      if (toast) {
        toast.textContent = "口コミを削除しました";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
      }
    } else {
      alert("削除に失敗しました");
    }
    setDeletingId(null);
  };
  if (reviews.length === 0) {
    return (
      <div
        className="text-center py-12 rounded-md"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        <p className="text-[14px]" style={{ color: 'var(--ink4)' }}>
          まだ口コミがありません。<br />
          最初の口コミを投稿してみませんか？
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-md p-5 transition-shadow duration-300 hover:shadow-md relative"
          style={{ border: '1px solid var(--border)' }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] font-medium" style={{ color: 'var(--ink)' }}>
              {review.userName || "匿名"}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px]" style={{ color: 'var(--ink5)' }}>
                {new Date(review.createdAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
              <button
                onClick={() => handleDelete(review.id)}
                disabled={deletingId === review.id}
                className="text-[10px] px-2 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                style={{ color: 'var(--ink4)', border: '1px solid var(--border)' }}
                title="口コミを削除"
              >
                {deletingId === review.id ? "削除中..." : "削除"}
              </button>
            </div>
          </div>
          <div className="text-[14px] leading-[1.85]" style={{ color: 'var(--ink2)' }}>
            {review.content}
          </div>
        </div>
      ))}
    </div>
  );
}
