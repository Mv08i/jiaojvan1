"use client";

import { useSettings } from "@/lib/i18n/provider";
import { LoginForm } from "./login-form";

export default function LoginPage({ redirect }: { redirect?: string }) {
  const { t } = useSettings();
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-k-film-edge dark:text-k-yellow">
        {t("login.title")}
      </h1>
      <p className="mt-2 text-center text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
        {t("login.subtitle")}
      </p>
      <LoginForm redirect={redirect} />
    </div>
  );
}
