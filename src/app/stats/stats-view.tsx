"use client";

import { useSettings } from "@/lib/i18n/provider";
import { StatsCharts, type BrandStat, type YearlyStat } from "./charts";

type Props = {
  supabaseNotConfigured?: boolean;
  notLoggedIn?: boolean;
  yearly: YearlyStat[];
  byBrand: BrandStat[];
  purchaseCount: number;
  totalRolls: number;
  totalSpent: number;
  avgPricePerRoll: number;
};

export function StatsView(props: Props) {
  const { t, money } = useSettings();

  if (props.supabaseNotConfigured) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("stats.title")}</h1>
        <div className="mt-6 rounded-lg border border-dashed border-k-gold bg-k-yellow/10 p-6 text-sm text-k-film-edge dark:border-k-gold/60 dark:bg-k-gold/10 dark:text-k-yellow">
          <p className="font-semibold">{t("common.supabase_not_configured_title")}</p>
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
        <h1 className="text-2xl font-bold tracking-tight">{t("stats.title")}</h1>
        <p className="mt-1 text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("stats.subtitle")}
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-k-paper-line p-6 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("common.please_login")}
        </div>
      </div>
    );
  }

  const { yearly, byBrand, purchaseCount, totalRolls, totalSpent, avgPricePerRoll } = props;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("stats.title")}</h1>
        <p className="mt-1 text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("stats.subtitle")}
        </p>
      </div>

      {/* 总览 KPI 卡片 */}
      {totalRolls > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KPI label={t("table.purchase_count")} value={String(purchaseCount)} />
            <KPI label={t("table.total_rolls")} value={String(totalRolls)} />
            <KPI label={t("stats.summary_total_spent")} value={money(totalSpent)} />
            <KPI label={t("stats.summary_avg_label")} value={money(avgPricePerRoll)} />
          </div>

          {/* recharts 客户端组件 */}
          <StatsCharts yearly={yearly} byBrand={byBrand} />

          {/* 品牌明细表 */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-k-film-edge/80 dark:text-k-yellow/90">
              {t("stats.brand_table_title")}
            </h2>
            <div className="overflow-hidden rounded-lg border border-k-paper-line dark:border-k-paper-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-k-yellow/15 text-xs uppercase text-k-film-edge dark:bg-k-film dark:text-k-yellow">
                  <tr>
                    <th className="px-4 py-3">{t("stats.brand_table_brand")}</th>
                    <th className="px-4 py-3 text-right">{t("stats.brand_table_rolls")}</th>
                    <th className="px-4 py-3 text-right">{t("stats.brand_table_total")}</th>
                    <th className="px-4 py-3 text-right">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-k-paper-line bg-k-cream-2 dark:divide-k-paper-line dark:bg-k-film-edge">
                  {byBrand.map((b) => (
                    <tr key={b.brand} className="align-top">
                      <td className="px-4 py-3 font-medium text-k-film-edge dark:text-k-yellow">
                        {b.brand}
                      </td>
                      <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                        {b.rolls}
                      </td>
                      <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                        {money(b.total)}
                      </td>
                      <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                        {((b.total / totalSpent) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-k-paper-line p-12 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("purchases.empty")}
          <br />
          <span className="text-xs">{t("purchases.empty_hint")}</span>
        </div>
      )}
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
      <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
        {value}
      </p>
    </div>
  );
}
