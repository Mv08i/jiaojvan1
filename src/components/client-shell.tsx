"use client";

import type { ReactNode } from "react";
import { SettingsProvider, useSettings } from "@/lib/i18n/provider";
import Link from "next/link";

// ------------------------------------------------------------------
// 客户端的 body 包装：
// - 提供 SettingsProvider 给全站
// - 翻译 footer/版权/页脚链接文案
// - 渲染 film-layers 装饰层、齿孔条、frameNo/日期戳
//
// Nav 是 Server Component（async），不能在客户端组件里直接 import/render，
// 所以由 layout.tsx 先以 props 形式注入 navHtml。
// ------------------------------------------------------------------
export function ClientShell({
  navHtml,
  children,
  dateStamp,
  frameNo,
}: {
  navHtml: ReactNode;
  children: ReactNode;
  dateStamp: string;
  frameNo: string;
}) {
  return (
    <SettingsProvider>
      <BodyShell navHtml={navHtml} dateStamp={dateStamp} frameNo={frameNo}>
        {children}
      </BodyShell>
    </SettingsProvider>
  );
}

function BodyShell({
  navHtml,
  children,
  dateStamp,
  frameNo,
}: {
  navHtml: ReactNode;
  children: ReactNode;
  dateStamp: string;
  frameNo: string;
}) {
  const { t } = useSettings();
  const supportEmail = "lz7729889@gmail.com";
  const creemPrivacyHref = "https://www.creem.io/privacy";

  return (
    <>
      {navHtml}

      {/* 胶片分层：颗粒/漏光/灰尘/halation（vignette 已按用户要求关闭） */}
      <div aria-hidden="true" className="film-layers">
        <div className="halation" />
        <div className="lightleak" />
        <div className="dust" />
        <div className="vignette" />
        <div className="grain" />
      </div>

      {/* 35mm 胶片齿孔 + 画面框 */}
      <div className="film-strip mt-2 mb-6 sm:mt-6 sm:mb-10">
        <div className="film-frame">
          <div className="film-frame-inner scanlines">
            <span className="film-frame-number">KX-135 · {frameNo}/36</span>
            <span
              className="film-date-stamp"
              style={{ position: "absolute", right: 12, bottom: 6 }}
            >
              {dateStamp}
            </span>
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>

      <footer className="border-t border-k-paper-line bg-k-cream-2/70 py-6 backdrop-blur dark:bg-k-film-edge/60 shadow-[0_-1px_20px_-12px_rgba(200,155,60,0.4)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:px-6">
          {/* 第一行：版权 + 页面链接 */}
          <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/70 whitespace-nowrap">
              © {new Date().getFullYear()} FilmLedger · {t("footer.tagline")}
            </p>
            <nav
              aria-label={t("privacy.title") + " / " + t("terms.title")}
              className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-k-film-edge/55 dark:text-k-film-edge/70"
            >
              <Link
                href="/privacy"
                className="transition-colors hover:text-k-gold dark:hover:text-k-yellow"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-k-gold dark:hover:text-k-yellow"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/refunds"
                className="transition-colors hover:text-k-gold dark:hover:text-k-yellow"
              >
                {t("footer.refund")}
              </Link>
              <Link
                href="/cookies"
                className="transition-colors hover:text-k-gold dark:hover:text-k-yellow"
              >
                {t("footer.cookies")}
              </Link>
              <Link
                href="/support"
                className="transition-colors hover:text-k-gold dark:hover:text-k-yellow"
              >
                {t("footer.support_author")} ☕
              </Link>
            </nav>
          </div>

          {/* 第二行：Creem MoR 支付披露（合规硬要求） */}
          <p className="w-full text-[11px] leading-5 text-k-film-edge/45 dark:text-k-film-edge/70 text-center sm:text-left">
            🔒 {t("footer.mor_line")}{" "}
            <a
              href={creemPrivacyHref}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:text-k-red hover:underline dark:hover:text-k-red-dark"
            >
              {t("footer.mor_contact")} {t("footer.mor_contact_more")}
            </a>
          </p>

          {/* 第三行：支持邮箱（Creem 审核要求「网站上可见的可联系客服邮箱」） */}
          <p className="w-full text-[11px] leading-5 text-k-film-edge/45 dark:text-k-film-edge/70 text-center sm:text-left">
            📮 {t("legal.contact_email")}：
            <a
              href={`mailto:${supportEmail}`}
              className="underline-offset-2 hover:text-k-red hover:underline dark:hover:text-k-red-dark"
            >
              {supportEmail}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

