"use client";

import Image from "next/image";
import { useSettings } from "@/lib/i18n/provider";

const supportEmail = "lz7729889@gmail.com";

export default function SupportPage() {
  const { t } = useSettings();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      {/* 顶部标题 */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-k-red-soft text-3xl dark:bg-k-red/25">
          🎞️
        </div>
        <h1 className="text-2xl font-bold text-k-film-edge dark:text-k-yellow sm:text-3xl">
          {t("support.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("support.subtitle")}
        </p>
      </div>

      {/* 二维码卡片区 */}
      <div className="mt-10">
        <p className="mb-4 text-center text-xs text-k-film-edge/60 dark:text-k-film-edge/50">
          {t("support.qr_hint")}
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* 微信收款码 */}
          <QRCard
            label={t("support.wechat_label")}
            icon="💬"
            color="#07C160"
            alt="WeChat Pay QR"
            src="/qrcodes/wechat-pay.svg"
          />
          {/* 支付宝收款码 */}
          <QRCard
            label={t("support.alipay_label")}
            icon="💰"
            color="#1677FF"
            alt="Alipay QR"
            src="/qrcodes/alipay.svg"
          />
        </div>

        {/* 不退款短说明 */}
        <p className="mx-auto mt-6 max-w-md text-center text-xs text-k-red dark:text-k-red-dark">
          {t("support.no_refund_line")}
        </p>
      </div>

      {/* 支持邮箱 */}
      <section className="mt-12 rounded-xl border border-k-paper-line bg-k-cream-2 p-5 dark:border-k-paper-line dark:bg-k-film-edge/60">
        <h2 className="text-sm font-semibold text-k-film-edge dark:text-k-yellow/90">
          {t("support.contact_title")}
        </h2>
        <ul className="mt-3 space-y-2 text-xs leading-6 text-k-film-edge/70 dark:text-k-film-edge/40">
          <li>
            {t("support.contact_body")}{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="text-k-red underline-offset-2 hover:underline dark:text-k-red-dark"
            >
              <code className="rounded bg-k-yellow/15 px-1 ring-1 ring-k-gold/30 dark:bg-k-gold/10 dark:ring-k-yellow/30">
                {supportEmail}
              </code>
            </a>
          </li>
        </ul>
      </section>

      {/* 无广告承诺 */}
      <div className="mt-14 space-y-2 text-center">
        <h2 className="text-base font-semibold text-k-film-edge dark:text-k-yellow/90">
          {t("support.no_ads_title")}
        </h2>
        <p className="mx-auto max-w-lg text-xs leading-6 text-k-film-edge/60 dark:text-k-film-edge/55">
          {t("support.no_ads_desc")}
        </p>
      </div>

      {/* FAQ */}
      <div className="mt-16 rounded-xl border border-k-paper-line bg-k-cream-2 p-6 dark:border-k-paper-line dark:bg-k-film-edge/60">
        <h2 className="text-sm font-semibold text-k-film-edge dark:text-k-yellow/90">
          {t("support.faq_title")}
        </h2>
        <ul className="mt-4 space-y-4 text-sm leading-7 text-k-film-edge/70 dark:text-k-film-edge/40">
          <li>
            <b className="text-k-film-edge dark:text-k-yellow/90">
              {t("support.faq1_q")}
            </b>
            <br />
            {t("support.faq1_a")}
          </li>
          <li>
            <b className="text-k-film-edge dark:text-k-yellow/90">
              {t("support.faq2_q")}
            </b>
            <br />
            {t("support.faq2_a")}
          </li>
          <li>
            <b className="text-k-film-edge dark:text-k-yellow/90">
              {t("support.faq3_q")}
            </b>
            <br />
            {t("support.faq3_a")}
          </li>
        </ul>
      </div>
    </main>
  );
}

function QRCard({
  label,
  icon,
  color,
  alt,
  src,
}: {
  label: string;
  icon: string;
  color: string;
  alt: string;
  src: string;
}) {
  return (
    <div
      className="film-frame group"
      style={{ ["--brand-color" as string]: color }}
    >
      <div className="film-frame-inner flex flex-col items-center gap-3 px-4 py-5">
        <span
          className="film-frame-number"
          style={{ color }}
        >
          {icon} {label}
        </span>
        <div className="relative aspect-square w-36 overflow-hidden rounded-lg border border-k-gold/30 bg-white shadow-sm">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="144px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
