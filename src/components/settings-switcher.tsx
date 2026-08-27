"use client";

import { useSettings } from "@/lib/i18n/provider";
import type { Locale, Currency } from "@/lib/i18n/messages";

// ------------------------------------------------------------------
// 右上角设置切换：语言 + 货币
// 做成小胶囊切换器（不用原生 select），保持 Kodak 黄主题统一。
// ------------------------------------------------------------------
export function SettingsSwitcher() {
  const { locale, currency, setLocale, setCurrency, locales, currencies, t } =
    useSettings();

  return (
    <div className="flex items-center gap-1.5">
      {/* 语言：两态 pill */}
      <div
        role="group"
        aria-label={t("settings.language")}
        className="hidden items-center rounded-full border border-k-paper-line bg-k-yellow/20 p-[2px] text-xs md:flex"
      >
        {locales.map((l) => {
          const active = l.code === locale;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLocale(l.code as Locale)}
              aria-pressed={active}
              className={
                "whitespace-nowrap rounded-full px-2.5 py-0.5 font-semibold transition-colors " +
                (active
                  ? "bg-k-yellow text-k-film-edge shadow"
                  : "text-k-film-edge/70 hover:text-k-film-edge dark:text-k-film-edge/80 dark:hover:text-k-yellow")
              }
            >
              {l.label}
            </button>
          );
        })}
      </div>

      {/* 货币：原生下拉，选项多时方便 */}
      <label className="sr-only">{t("settings.currency")}</label>
      <div className="relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          title={t("settings.currency")}
          className="appearance-none cursor-pointer whitespace-nowrap rounded-full border border-k-paper-line bg-k-cream-2 pl-3 py-0.5 pr-7 text-xs font-semibold text-k-film-edge shadow-inner shadow-k-gold/10 transition-colors hover:border-k-gold focus:outline-none dark:border-k-paper-line dark:bg-k-film-edge/40 dark:text-k-yellow"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.symbol} {c.code}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-k-gold"
        >
          ▾
        </span>
      </div>

      {/* 手机：语言简化成单按钮切换（循环） */}
      <button
        type="button"
        onClick={() => setLocale(locale === "en" ? "zh" : "en")}
        className="inline-flex items-center gap-1 rounded-full border border-k-paper-line bg-k-yellow/20 px-2 py-0.5 text-[11px] font-bold text-k-film-edge md:hidden dark:border-k-paper-line dark:text-k-yellow"
        aria-label={t("settings.language")}
      >
        {locale === "en" ? "中 / EN" : "EN / 中"}
      </button>
    </div>
  );
}
