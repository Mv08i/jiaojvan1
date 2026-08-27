"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";
import type { Purchase } from "@/app/purchases/types";

// ============================================================
// 仪表板「视图层」（纯渲染）
// 数据查询在 page.tsx 里（Server Component）完成，这样保持 Supabase
// 调用在服务端，国际化 + 货币格式化在客户端。
// ============================================================

type Props = {
  year: number;
  yearFilmCost: number;
  yearRolls: number;
  yearDevCost: number;
  stockValue: number;
  stockRolls: number;
  recentPurchases: Purchase[];
  supabaseNotConfigured?: boolean;
  notLoggedIn?: boolean;
};

export function DashboardView(props: Props) {
  const { t, money } = useSettings();

  if (props.supabaseNotConfigured) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <div className="mt-6 rounded-lg border border-dashed border-k-gold bg-k-yellow/10 p-6 text-sm text-k-film-edge dark:border-k-gold/60 dark:bg-k-gold/10 dark:text-k-yellow">
          <p className="font-semibold">
            {t("common.supabase_not_configured_title")}
          </p>
          <p className="mt-1 text-xs leading-6">
            {t("common.supabase_not_configured_hint")}
          </p>
        </div>
      </div>
    );
  }

  if (props.notLoggedIn) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="mt-1 text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("dashboard.subtitle")}
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-k-paper-line p-6 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("common.please_login")}
          <Link
            href="/login?redirect=/dashboard"
            className="mx-1 underline text-k-film-edge/70 dark:text-zinc-300"
          >
            {t("common.log_in")}
          </Link>
          {t("common.please_login_continue")}
        </div>
      </div>
    );
  }

  const { year, yearFilmCost, yearRolls, yearDevCost, stockValue, stockRolls, recentPurchases } = props;

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="mt-1 text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("dashboard.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t("stat.year_film_cost", { year })} value={money(yearFilmCost)} />
        <StatCard label={t("stat.year_purchased_rolls", { year })} value={String(yearRolls)} />
        <StatCard label={t("stat.year_dev_cost", { year })} value={money(yearDevCost)} />
        <StatCard
          label={t("stat.stock_value")}
          value={money(stockValue)}
          hint={t("stat.stock_hint", { count: stockRolls })}
        />
      </div>

      {/* 近期采购 */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-k-film-edge/80 dark:text-k-yellow/90">
            {t("dashboard.recent_purchases")}
          </h2>
          <Link
            href="/purchases"
            className="text-xs text-k-film-edge/55 hover:text-k-film-edge dark:text-k-film-edge/40 dark:hover:text-zinc-100"
          >
            {t("common.view_all")}
          </Link>
        </div>

        {recentPurchases.length === 0 ? (
          <div className="rounded-lg border border-dashed border-k-paper-line p-8 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
            {t("dashboard.no_purchases_yet")}
            <br />
            <Link
              href="/purchases"
              className="mt-2 inline-block text-xs text-k-film-edge/70 underline dark:text-zinc-300"
            >
              {t("common.add_first")}
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-k-paper-line dark:border-k-paper-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-k-yellow/15 text-xs uppercase text-k-film-edge dark:bg-k-film dark:text-k-yellow">
                <tr>
                  <th className="px-4 py-3">{t("table.film")}</th>
                  <th className="px-4 py-3">{t("table.date")}</th>
                  <th className="px-4 py-3 text-right">{t("table.quantity")}</th>
                  <th className="px-4 py-3 text-right">{t("table.total_price")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-k-paper-line bg-k-cream-2 dark:divide-k-paper-line dark:bg-k-film-edge">
                {recentPurchases.map((p) => (
                  <tr key={p.id} className="align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium text-k-film-edge dark:text-k-yellow">
                        {p.brand} {p.name}
                      </div>
                      <div className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                        ISO {p.iso}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="film-date-stamp inline-block">
                        {new Date(p.purchase_date)
                          .toISOString()
                          .slice(0, 10)
                          .replace(/-/g, ".")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300">
                      {p.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-k-film-edge dark:text-k-yellow">
                      {money(p.total_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <QuickLink href="/purchases" label={t("nav.purchases")} desc={t("home.feature1_desc")} />
        <QuickLink href="/developing" label={t("nav.developing")} desc={t("home.feature2_desc")} />
        <QuickLink href="/stats" label={t("nav.stats")} desc={t("home.feature3_desc")} />
        <QuickLink href="/load" label={t("nav.load")} desc={t("load.subtitle")} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
      <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-xs text-k-film-edge/40 dark:text-k-film-edge/55">{hint}</p>
      )}
    </div>
  );
}

function QuickLink({ href, label, desc }: { href: string; label: string; desc: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-k-paper-line bg-k-cream-2 p-4 transition-colors hover:border-zinc-400 hover:bg-k-cream/60 dark:border-k-paper-line dark:bg-k-film-edge/60 dark:hover:border-zinc-600 dark:hover:bg-k-gold/20"
    >
      <p className="text-sm font-medium text-k-film-edge dark:text-k-yellow">{label}</p>
      <p className="mt-1 text-xs text-k-film-edge/55 dark:text-k-film-edge/40">{desc}</p>
    </Link>
  );
}
