"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";
import { SignOutButton } from "./sign-out-button";
import { SettingsSwitcher } from "./settings-switcher";

// Nav 的 UI 层（客户端组件）：
// - 接收 Server 端 user 对象
// - 负责国际化翻译 + SettingsSwitcher
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

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm font-bold tracking-tight text-k-film-edge dark:text-k-yellow"
        >
          FilmLedger
        </Link>
        <ul className="hidden items-center gap-0.5 lg:flex min-w-0">
          {NAV_KEYS.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="whitespace-nowrap rounded px-2.5 py-1.5 text-sm text-k-film-edge/70 transition-colors hover:bg-k-yellow/15 hover:text-k-film-edge dark:text-k-film-edge/40 dark:hover:bg-k-gold/20 dark:hover:text-zinc-100"
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
        <li>
          <SupportButton />
        </li>
        {user ? (
          <>
            <li className="hidden max-w-[150px] truncate whitespace-nowrap text-xs text-k-film-edge/55 md:block dark:text-k-film-edge/40">
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
    </nav>
  );
}

function SupportButton() {
  const { t } = useSettings();
  return (
    <Link
      href="/support"
      title={t("nav.support")}
      className="inline-flex items-center gap-1 rounded border border-k-paper-line px-2.5 py-1.5 text-xs text-k-film-edge/70 transition-colors hover:border-k-gold hover:bg-k-yellow-soft/60 hover:text-k-film-edge dark:border-k-paper-line/70 dark:text-k-film-edge/40 dark:hover:border-k-gold dark:hover:bg-k-gold/20 dark:hover:text-k-yellow"
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
