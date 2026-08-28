"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";

const lastUpdated = "2026-08-26";
const supportEmail = "lz7729889@gmail.com";

export default function RefundsPage() {
  const { t } = useSettings();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/55">
          {t("legal.last_updated")} {lastUpdated}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-k-film-edge dark:text-k-yellow sm:text-3xl">
          {t("refund.title")}
        </h1>
      </div>

      <section className="text-sm leading-7 text-k-film-edge/80 dark:text-zinc-300">
        <p>{t("refund.intro")}</p>
      </section>

      <Section title="1. —">
        <p>
          <span className="font-semibold text-k-film-edge dark:text-k-yellow/90">
            {t("refund.h1_nature").replace(/^[\d一二三四五六七八九十]+[．.、\s]*/, "")}
          </span>
        </p>
        <p>{t("refund.p1_nature")}</p>
      </Section>

      <Section title="2. —">
        <p>
          <span className="font-semibold text-k-film-edge dark:text-k-yellow/90">
            {t("refund.h1_no_refund").replace(/^[\d一二三四五六七八九十]+[．.、\s]*/, "")}
          </span>
        </p>
        <p>{t("refund.p2_no_refund")}</p>
      </Section>

      <Section title="3. —">
        <p>
          <span className="font-semibold text-k-film-edge dark:text-k-yellow/90">
            {t("refund.h1_contact").replace(/^[\d一二三四五六七八九十]+[．.、\s]*/, "")}
          </span>
        </p>
        <p>
          {t("refund.p4_contact")}{" "}
          <a
            href={`mailto:${supportEmail}`}
            className="text-k-red underline-offset-2 hover:underline dark:text-k-red-dark"
          >
            <code className="rounded bg-k-yellow/15 px-1 ring-1 ring-k-gold/30 dark:bg-k-gold/10 dark:ring-k-yellow/30">
              {supportEmail}
            </code>
          </a>
          。
        </p>
        <p>{t("refund.p4_contact_2")}</p>
      </Section>

      <div className="mt-12 text-center text-xs text-k-film-edge/40 dark:text-k-film-edge/70">
        <Link href="/" className="hover:text-k-film-edge/70 dark:hover:text-k-film-edge/40">
          {t("legal.back_home")}
        </Link>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  // title 参数用于一致性，实际标题从翻译文本里提取
  void title;
  return (
    <section className="mt-10 space-y-3 text-sm leading-7 text-k-film-edge/80 dark:text-zinc-300">
      <div className="space-y-3">{children}</div>
    </section>
  );
}
