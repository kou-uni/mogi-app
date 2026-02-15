"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";

interface QRCodeGeneratorProps {
  shopId: string;
  shopName: string;
  shopUrl: string;
  emoji: string;
  category: string;
  address: string;
}

export default function QRCodeGenerator({
  shopId,
  shopName,
  shopUrl,
  emoji,
  category,
  address,
}: QRCodeGeneratorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shopUrl);
      alert("URLをコピーしました");
    } catch (err) {
      prompt("URLをコピーしてください:", shopUrl);
    }
  };

  return (
    <>
      {/* アクションボタン */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-[18px] py-2 text-[12px] rounded-md flex items-center gap-[6px] transition-opacity duration-200 tracking-[0.02em]"
          style={{ background: 'var(--ink)', color: 'var(--bg)' }}
        >
          📱 QRコードを発行
        </button>
        <button
          onClick={handleCopyUrl}
          className="px-[18px] py-2 text-[12px] rounded-md transition-colors duration-200 tracking-[0.02em]"
          style={{ border: '1px solid var(--border)', color: 'var(--ink2)' }}
        >
          🔗 URLをコピー
        </button>
      </div>

      {/* QRコードモーダル */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-[300] flex items-center justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.35)' }}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-md p-10 max-w-[380px] w-[90%] text-center relative print:static print:block print:max-w-full print:border-2 print:border-black"
              onClick={(e) => e.stopPropagation()}
              ref={printRef}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-4 text-[18px] transition-colors print:hidden"
                style={{ color: 'var(--ink3)' }}
              >
                ✕
              </button>

              <p className="text-[11px] tracking-[0.04em] mb-[2px]" style={{ color: 'var(--ink4)' }}>
                店舗配布用QRコード
              </p>
              <h3 className="text-[18px] mb-[2px]">
                {emoji} {shopName}
              </h3>
              <p className="text-[11px] tracking-[0.04em] mb-4" style={{ color: 'var(--ink4)' }}>
                {category} · {address}
              </p>

              <div className="my-3 flex justify-center">
                <QRCode
                  value={shopUrl}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 200 200`}
                  fgColor="#1a1a1a"
                  bgColor="#ffffff"
                />
              </div>

              <div
                className="text-[11px] font-mono px-3 py-2 rounded-md my-2 text-center break-all"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--ink4)' }}
              >
                {shopUrl}
              </div>

              <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--ink2)' }}>
                スマホで読み取ると
                <br />
                口コミ・応援ページに飛びます
              </p>

              <button
                onClick={handlePrint}
                className="px-7 py-[10px] text-[13px] rounded-md transition-opacity duration-200 tracking-[0.04em] print:hidden"
                style={{ background: 'var(--ink)', color: '#fff' }}
              >
                🖨 印刷する
              </button>

              <p className="text-[11px] leading-[1.6] mt-3 print:hidden" style={{ color: 'var(--ink4)' }}>
                A4用紙に印刷してレジ横やテーブルに設置してください。
                <br />
                お客様がスマホで読み取って応援を書き込めます。
              </p>
            </div>
          </div>

          {/* 印刷用スタイル */}
          <style jsx global>{`
            @media print {
              body * {
                visibility: hidden;
              }
              .fixed,
              .fixed * {
                visibility: visible;
              }
              .fixed {
                position: static;
                background: none !important;
              }
              nav,
              footer,
              .print\\:hidden {
                display: none !important;
              }
            }
          `}</style>
        </>
      )}
    </>
  );
}
