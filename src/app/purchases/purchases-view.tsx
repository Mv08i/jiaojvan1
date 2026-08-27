"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";
import { PurchaseForm } from "./purchase-form";
import { DeleteButton } from "./delete-button";
import type { FilmStock, Purchase } from "./types";

type Props = {
  supabaseNotConfigured?: boolean;
  notLoggedIn?: boolean;
  filmStocks: FilmStock[];
  purchases: Purchase[];
};

export function PurchasesView(props: Props) {
  const { t, money } = useSettings();

  if (props.supabaseNotConfigured) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("purchases.title")}</h1>
        <div className="mt-6 rounded-lg border border-dashed border-k-gold bg-k-yellow/10 p-6 text-sm text-k-film-edge dark:border-k-gold/60 dark:bg-k-gold/10 dark:text-k-yellow">
          <p className="font-semibold">{t("common.supabase_not_configured_title")}</p>
          <p className="mt-1 text-xs leading-6">
            {t("common.supabase_not_configured_hint")}
          </p>
        </div>
      </div>
    );
  }

  const totalSpent = props.purchases.reduce((s, p) => s + Number(p.total_price), 0);
  const totalRolls = props.purchases.reduce((s, p) => s + p.quantity, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("purchases.title")}</h1>
        <p className="mt-1 text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("home.feature1_desc")}
        </p>
      </div>

      {props.notLoggedIn && (
        <div className="rounded-lg border border-dashed border-k-paper-line p-6 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("common.please_login")}
        </div>
      )}

      {!props.notLoggedIn && (
        <PurchaseForm filmStocks={props.filmStocks} />
      )}

      {!props.notLoggedIn && props.purchases.length === 0 && (
        <div className="rounded-lg border border-dashed border-k-paper-line p-12 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("purchases.empty")}
          <br />
          <span className="text-xs">{t("purchases.empty_hint")}</span>
        </div>
      )}

      {!props.notLoggedIn && props.purchases.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
              <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                {t("table.purchase_count")}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
                {props.purchases.length}
              </p>
            </div>
            <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
              <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                {t("table.total_rolls")}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
                {totalRolls}
              </p>
            </div>
            <div className="col-span-2 rounded-lg border border-k-paper-line bg-k-cream-2 p-4 sm:col-span-1 dark:border-k-paper-line dark:bg-k-film-edge/60">
              <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                {t("table.total_spent")}
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-k-film-edge dark:text-k-yellow">
                {money(totalSpent)}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-k-paper-line dark:border-k-paper-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-k-yellow/15 text-xs uppercase text-k-film-edge dark:bg-k-film dark:text-k-yellow">
                <tr>
                  <th className="px-4 py-3">{t("table.film")}</th>
                  <th className="px-4 py-3">{t("table.date")}</th>
                  <th className="px-4 py-3 text-right">{t("table.quantity")}</th>
                  <th className="px-4 py-3 text-right">{t("table.unit_price")}</th>
                  <th className="px-4 py-3 text-right">{t("table.total_price")}</th>
                  <th className="px-4 py-3">{t("table.vendor")}</th>
                  <th className="px-4 py-3">{t("table.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-k-paper-line bg-k-cream-2 dark:divide-k-paper-line dark:bg-k-film-edge">
                {props.purchases.map((p) => (
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
                    <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                      {p.quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-k-film-edge/70 dark:text-zinc-300 tabular-nums">
                      {money(p.unit_price)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-k-film-edge dark:text-k-yellow tabular-nums">
                      {money(p.total_price)}
                    </td>
                    <td className="px-4 py-3 text-k-film-edge/70 dark:text-zinc-300">
                      {p.vendor || "—"}
                      {p.notes && (
                        <div className="text-xs text-k-film-edge/40 dark:text-k-film-edge/55">
                          {p.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DeleteButton id={p.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 兼容旧引用：底部的"添加采购" CTA */}
          <div className="hidden">
            <Link href="/dashboard">{t("dashboard.title")}</Link>
          </div>
        </div>
      )}
    </div>
  );
}
