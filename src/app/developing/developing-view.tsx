"use client";

import { useSettings } from "@/lib/i18n/provider";
import { DevelopingForm } from "./developing-form";
import { DeleteButton } from "./delete-button";
import type { DevelopingRecord, Purchase } from "./types";

type Props = {
  supabaseNotConfigured?: boolean;
  notLoggedIn?: boolean;
  purchases: Purchase[];
  records: DevelopingRecord[];
};

export function DevelopingView(props: Props) {
  const { t, money } = useSettings();

  if (props.supabaseNotConfigured) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("dev.title")}</h1>
        <div className="mt-6 rounded-lg border border-dashed border-k-gold bg-k-yellow/10 p-6 text-sm text-k-film-edge dark:border-k-gold/60 dark:bg-k-gold/10 dark:text-k-yellow">
          <p className="font-semibold">{t("common.supabase_not_configured_title")}</p>
          <p className="mt-1 text-xs leading-6">
            {t("common.supabase_not_configured_hint")}
          </p>
        </div>
      </div>
    );
  }

  const totalCost = props.records.reduce((s, r) => s + Number(r.total_cost), 0);
  const totalDev = props.records.reduce((s, r) => s + Number(r.develop_cost), 0);
  const totalScan = props.records.reduce((s, r) => s + Number(r.scan_cost), 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("dev.title")}</h1>
        <p className="mt-1 text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("home.feature2_desc")}
        </p>
      </div>

      {props.notLoggedIn && (
        <div className="rounded-lg border border-dashed border-k-paper-line p-6 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("common.please_login")}
        </div>
      )}

      {!props.notLoggedIn && <DevelopingForm purchases={props.purchases} />}

      {!props.notLoggedIn && props.records.length === 0 && (
        <div className="rounded-lg border border-dashed border-k-paper-line p-12 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("dev.empty")}
          <br />
          <span className="text-xs">{t("dev.empty_hint")}</span>
        </div>
      )}

      {!props.notLoggedIn && props.records.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
              <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                {t("table.dev_count")}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
                {props.records.length}
              </p>
            </div>
            <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
              <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                {t("table.dev_subtotal")}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
                {money(totalDev)}
              </p>
            </div>
            <div className="col-span-2 rounded-lg border border-k-paper-line bg-k-cream-2 p-4 sm:col-span-1 dark:border-k-paper-line dark:bg-k-film-edge/60">
              <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                {t("table.total_cost_including")}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
                {money(totalCost)}
              </p>
              <p className="mt-1 text-xs text-k-film-edge/40 dark:text-k-film-edge/55">
                {t("table.scan_portion", { amount: money(totalScan) })}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-k-paper-line dark:border-k-paper-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-k-yellow/15 text-xs uppercase text-k-film-edge dark:bg-k-film dark:text-k-yellow">
                <tr>
                  <th className="px-4 py-3">{t("table.film")}</th>
                  <th className="px-4 py-3">{t("table.date")}</th>
                  <th className="px-4 py-3">{t("table.lab")}</th>
                  <th className="px-4 py-3 text-right">{t("table.develop")}</th>
                  <th className="px-4 py-3 text-right">{t("table.scan")}</th>
                  <th className="px-4 py-3 text-right">{t("table.shipping")}</th>
                  <th className="px-4 py-3 text-right">{t("table.total_with_scan")}</th>
                  <th className="px-4 py-3">{t("table.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-k-paper-line bg-k-cream-2 dark:divide-k-paper-line dark:bg-k-film-edge">
                {props.records.map((r) => (
                  <tr key={r.id} className="align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium text-k-film-edge dark:text-k-yellow">
                        {r.brand} {r.name}
                      </div>
                      {r.purchase_id && (
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">
                          {t("dev.linked")}
                        </div>
                      )}
                      {r.notes && (
                        <div className="text-xs text-k-film-edge/40 dark:text-k-film-edge/55">
                          {r.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="film-date-stamp inline-block">
                        {new Date(r.develop_date)
                          .toISOString()
                          .slice(0, 10)
                          .replace(/-/g, ".")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-k-film-edge/70 dark:text-zinc-300">
                      {r.lab || "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                      {money(r.develop_cost)}
                    </td>
                    <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                      {money(r.scan_cost)}
                    </td>
                    <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                      {money(r.shipping_cost)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-k-film-edge dark:text-k-yellow tabular-nums">
                      {money(r.total_cost)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DeleteButton id={r.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
