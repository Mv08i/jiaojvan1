"use client";

import { useSettings } from "@/lib/i18n/provider";

const supportEmail = "lz7729889@gmail.com";
const creemPrivacyHref = "https://www.creem.io/privacy";

export default function SupportPage() {
  const { t } = useSettings();
  const creemLink = process.env.NEXT_PUBLIC_CREEM_TIP_CUSTOM;

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

      {/* 打赏按钮 */}
      <div className="mt-10 flex flex-col items-center gap-4">
        {creemLink ? (
          <a
            href={creemLink}
            target="_blank"
            rel="noreferrer"
            className="group btn-kodak px-10 py-5 text-base shadow-lg"
          >
            <span className="text-2xl">🎞️</span>
            <span>{t("support.cta")}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-3 rounded-2xl bg-k-paper-line px-8 py-4 text-base font-semibold text-k-film-edge/60 dark:bg-k-film-edge/40 dark:text-k-yellow/50 border border-dashed border-k-gold/50">
            <span className="text-xl">🎞️</span>
            <span>{t("support.cta_pending")}</span>
          </span>
        )}

        {/* ---- Creem 合规：不退款短说明 ---- */}
        <p className="max-w-md text-center text-xs text-k-red dark:text-k-red-dark">
          {t("support.no_refund_line")}
        </p>

        {/* ---- Creem 合规：Merchant of Record 身份披露块 ---- */}
        <aside
          aria-label={t("support.mor_notice_title")}
          className="mt-2 w-full rounded-xl border border-k-gold/50 bg-k-yellow/15 p-4 text-xs leading-6 text-k-film-edge/80 shadow-[0_1px_0_0_rgba(200,155,60,0.15)] dark:border-k-gold/40 dark:bg-k-gold/10 dark:text-k-film-edge/60"
        >
          <p className="mb-1 text-sm font-semibold text-k-film-edge dark:text-k-yellow/90">
            {t("support.mor_notice_title")}
          </p>
          <p className="mb-2">{t("support.mor_notice_body")}</p>
          <p className="text-k-film-edge/60 dark:text-k-film-edge/40">
            {t("footer.mor_contact")}{" "}
            <a
              className="underline-offset-2 hover:text-k-red hover:underline dark:hover:text-k-red-dark"
              href={creemPrivacyHref}
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.mor_contact_more")}
            </a>
            。
          </p>
        </aside>

        <p className="text-xs text-k-film-edge/40 dark:text-k-film-edge/55">
          {t("settings.currency_hint")}
        </p>
      </div>

      {/* ---- Creem 合规：站内支持邮箱 ---- */}
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
          <li>{t("support.contact_creem_body")}</li>
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
            <b className="text-k-film-edge dark:text-k-yellow/90">{t("support.faq1_q")}</b>
            <br />
            {t("support.faq1_a")}
          </li>
          <li>
            <b className="text-k-film-edge dark:text-k-yellow/90">{t("support.faq2_q")}</b>
            <br />
            {t("support.faq2_a")}
          </li>
          <li>
            <b className="text-k-film-edge dark:text-k-yellow/90">{t("support.faq3_q")}</b>
            <br />
            {t("support.faq3_a")}
          </li>
        </ul>
      </div>
    </main>
  );
}
