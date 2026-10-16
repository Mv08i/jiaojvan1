"use client";

import { useState } from "react";
import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";
import type { Locale } from "@/lib/i18n/messages";
import { SignOutButton } from "./sign-out-button";
import { SettingsSwitcher } from "./settings-switcher";

// Nav 的 UI 层（客户端组件）：
// - 接收 Server 端 user 对象
// - 负责国际化翻译 + SettingsSwitcher
// - 窄屏（lg 以下）折叠成汉堡菜单，手机上也能进各个页面
// ------------------------------------------------------------------
type NavUser = { id: string; email?: string | null | undefined } | null;

const NAV_KEYS: { href: string; labelKey: string }[] = [
  { href: "/dashboard", labelKey: "nav.dashboard" },
  { href: "/purchases", labelKey: "nav.purchases" },
  { href: "/load", labelKey: "nav.load" },
  { href: "/developing", labelKey: "nav.developing" },
  { href: "/stats", labelKey: "nav.stats" },
];

export function NavContent({ user }: { user: NavUser }) {
  const { t } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5">
      <div className="flex min-w-0 items-center gap-1.5 md:gap-4">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm font-bold tracking-tight text-k-film-edge dark:text-k-yellow"
        >
          FilmLedger
        </Link>

        {/* 手机 / 平板：汉堡按钮，展开下面那个下拉菜单 */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
          aria-label={t("nav.menu")}
          title={t("nav.menu")}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded border border-k-film-edge/25 text-k-film-edge transition-colors hover:bg-k-yellow/25 lg:hidden dark:border-k-yellow/40 dark:text-k-yellow dark:hover:bg-k-yellow/20"
        >
          <MenuIcon open={menuOpen} />
        </button>

        <ul className="hidden items-center gap-0.5 lg:flex min-w-0">
          {NAV_KEYS.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="whitespace-nowrap rounded px-2.5 py-1.5 text-sm text-k-film-edge/70 transition-colors hover:bg-k-yellow/15 hover:text-k-film-edge dark:text-k-ink/85 dark:hover:bg-k-gold/20 dark:hover:text-zinc-100"
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex items-center gap-1.5 shrink-0 min-w-0">
        <li>
          <SettingsSwitcher />
        </li>
        <li className="hidden sm:block">
          <SupportButton />
        </li>
        {user ? (
          <>
            <li className="hidden max-w-[150px] truncate whitespace-nowrap text-xs text-k-film-edge/55 md:block dark:text-k-ink/75">
              {user.email}
            </li>
            <li>
              <SignOutButton />
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/login"
              className="whitespace-nowrap rounded-md bg-k-yellow px-3 py-1.5 text-sm font-bold text-k-film-edge transition-colors hover:bg-k-yellow-dark dark:bg-k-yellow dark:text-k-film-edge dark:hover:bg-k-yellow-dark"
            >
              {t("nav.login")}
            </Link>
          </li>
        )}
      </ul>

      {/* 手机端下拉菜单：页面导航 + 支持作者 + 语言切换 */}
      {menuOpen && (
        <div
          id="nav-mobile-menu"
          className="absolute left-0 right-0 top-full z-50 border-b border-k-paper-line bg-k-cream-2 px-4 pb-4 pt-2 shadow-[0_18px_30px_-20px_rgba(0,0,0,0.6)] lg:hidden dark:border-k-paper-line dark:bg-k-cream-2"
        >
          <ul className="space-y-0.5">
            {NAV_KEYS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded px-3 py-2 text-sm text-k-film-edge/80 transition-colors hover:bg-k-yellow/15 hover:text-k-film-edge dark:text-k-ink/90 dark:hover:bg-k-gold/20 dark:hover:text-zinc-100"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/support"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-sm text-k-film-edge/80 transition-colors hover:bg-k-yellow/15 hover:text-k-film-edge dark:text-k-ink/90 dark:hover:bg-k-gold/20 dark:hover:text-zinc-100"
              >
                {t("nav.support")}
              </Link>
            </li>
          </ul>

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-k-paper-line pt-3">
            <span className="text-xs text-k-film-edge/55 dark:text-k-ink/70">
              {t("settings.language")}
            </span>
            <MobileLanguageToggle />
          </div>

          {user?.email && (
            <p className="mt-2 truncate text-xs text-k-film-edge/55 dark:text-k-ink/70">
              {user.email}
            </p>
          )}
        </div>
      )}
    </nav>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function MobileLanguageToggle() {
  const { locale, setLocale, locales } = useSettings();
  return (
    <div
      role="group"
      className="flex items-center rounded-full border border-k-paper-line bg-k-yellow/20 p-[2px] text-xs dark:border-k-paper-line dark:bg-k-yellow/10"
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
              "whitespace-nowrap rounded-full px-3 py-1 font-semibold transition-colors " +
              (active
                ? "bg-k-yellow text-k-film-edge shadow"
                : "text-k-film-edge/70 hover:text-k-film-edge dark:text-k-ink/80 dark:hover:text-k-yellow")
            }
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}

function SupportButton() {
  const { t } = useSettings();
  return (
    <Link
      href="/support"
      title={t("nav.support")}
      className="inline-flex items-center gap-1 rounded border border-k-paper-line px-2.5 py-1.5 text-xs text-k-film-edge/70 transition-colors hover:border-k-gold hover:bg-k-yellow-soft/60 hover:text-k-film-edge dark:border-k-paper-line/70 dark:text-k-ink/80 dark:hover:border-k-gold dark:hover:bg-k-gold/20 dark:hover:text-k-yellow"
    >
      <FilmIcon />
      <span className="hidden sm:inline">{t("nav.support")}</span>
    </Link>
  );
}

function FilmIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M2 9h20" />
      <path d="M7 3v18" />
      <path d="M17 3v18" />
      <path d="M2 15h20" />
    </svg>
  );
}
