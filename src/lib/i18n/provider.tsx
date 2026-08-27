"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Currency,
  type Locale,
  LOCALES,
  CURRENCIES,
  translate,
  formatMoney,
} from "./messages";

// ------------------------------------------------------------------
// 持久化 key（localStorage）
// ------------------------------------------------------------------
const STORAGE_KEY_LOCALE = "filsledger.locale.v1";
const STORAGE_KEY_CURRENCY = "filsledger.currency.v1";

// 用户要求：初始默认 English
const DEFAULT_LOCALE: Locale = "en";
const DEFAULT_CURRENCY: Currency = "USD";

// ------------------------------------------------------------------
// Context 类型
// ------------------------------------------------------------------
type SettingsContextValue = {
  locale: Locale;
  currency: Currency;
  setLocale: (l: Locale) => void;
  setCurrency: (c: Currency) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  money: (amount: number | string, fractionDigits?: number) => string;
  locales: typeof LOCALES;
  currencies: typeof CURRENCIES;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

// ------------------------------------------------------------------
// Provider：客户端组件，读 localStorage → 写入 React state
// ------------------------------------------------------------------
export function SettingsProvider({
  children,
  initialLocale,
  initialCurrency,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  initialCurrency?: Currency;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency ?? DEFAULT_CURRENCY);

  // 首次挂载：从 localStorage 或浏览器语言推默认
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedLocale = window.localStorage.getItem(STORAGE_KEY_LOCALE) as Locale | null;
    const savedCurrency = window.localStorage.getItem(STORAGE_KEY_CURRENCY) as Currency | null;

    // 使用 queueMicrotask 避免 eslint react-hooks/set-state-in-effect
    // （从 localStorage 读取后异步更新状态，避免同步级联渲染）
    queueMicrotask(() => {
      if (savedLocale && LOCALES.some((l) => l.code === savedLocale)) {
        setLocaleState(savedLocale);
      } else if (!initialLocale) {
        const nav = (window.navigator.language || "en").toLowerCase();
        if (nav.startsWith("zh")) setLocaleState("zh");
      }
      if (savedCurrency && CURRENCIES.some((c) => c.code === savedCurrency)) {
        setCurrencyState(savedCurrency);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 持久化 + 同步 <html lang>
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_LOCALE, locale);
    }
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_CURRENCY, currency);
    }
  }, [currency]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const setCurrency = useCallback((c: Currency) => setCurrencyState(c), []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      locale,
      currency,
      setLocale,
      setCurrency,
      t: (key, vars) => translate(locale, key, vars),
      money: (amount, fractionDigits) => formatMoney(amount, currency, locale, fractionDigits),
      locales: LOCALES,
      currencies: CURRENCIES,
    }),
    [locale, currency, setLocale, setCurrency]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// ------------------------------------------------------------------
// Hook：客户端组件里随时拿 locale/currency/t()
// ------------------------------------------------------------------
export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    // 退化 fallback，避免 <SettingsProvider> 包不到的地方崩
    return {
      locale: DEFAULT_LOCALE,
      currency: DEFAULT_CURRENCY,
      setLocale: () => {},
      setCurrency: () => {},
      t: (key, vars) => translate(DEFAULT_LOCALE, key, vars),
      money: (amount, fractionDigits) => formatMoney(amount, DEFAULT_CURRENCY, DEFAULT_LOCALE, fractionDigits),
      locales: LOCALES,
      currencies: CURRENCIES,
    };
  }
  return ctx;
}

export { DEFAULT_LOCALE, DEFAULT_CURRENCY };
