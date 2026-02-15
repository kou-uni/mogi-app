import type { Metadata } from "next";
import { Noto_Serif_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
});

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
});

export const metadata: Metadata = {
  title: "茂木さんぽ — 港町のお店を応援",
  description: "長崎・茂木。知る人ぞ知る港町のお店を応援するサイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSerifJP.variable} ${shipporiMincho.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
