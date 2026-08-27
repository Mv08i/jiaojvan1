import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { ClientShell } from "@/components/client-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FilmLedger — Film cost tracker",
  description:
    "Track film purchase and developing spend, know the real cost of every photo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  // 胶卷日期戳：当前日期（像傻瓜相机印在照片右下角的 1999.08.26 那种黄字）
  const dateStamp = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
  // 随机帧号：01~36 之间取一个（像一张 36 张装的胶卷）
  const frameNo = String((now.getDate() * 7 + now.getHours()) % 36 + 1).padStart(2, "0");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientShell
          navHtml={<Nav />}
          dateStamp={dateStamp}
          frameNo={frameNo}
        >
          {children}
        </ClientShell>
      </body>
    </html>
  );
}

