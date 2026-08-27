"use client";

import { useState, useActionState } from "react";
import { signIn, signUp, type AuthState } from "./actions";
import { useSettings } from "@/lib/i18n/provider";

type Mode = "signin" | "signup";

export function LoginForm({ redirect }: { redirect?: string }) {
  const { t } = useSettings();
  const [mode, setMode] = useState<Mode>("signin");
  const [signInState, signInAction, signInPending] = useActionState<
    AuthState | null,
    FormData
  >(signIn, null);
  const [signUpState, signUpAction, signUpPending] = useActionState<
    AuthState | null,
    FormData
  >(signUp, null);

  return (
    <div className="mt-8 w-full rounded-lg border border-k-paper-line bg-k-cream-2 p-6 shadow-sm dark:border-k-paper-line dark:bg-k-film-edge/60">
      {/* 模式切换 */}
      <div className="mb-4 grid grid-cols-2 rounded-md bg-k-yellow/15 p-1 text-xs font-medium dark:bg-k-yellow/10">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded px-3 py-1.5 transition-colors ${
            mode === "signin"
              ? "bg-k-cream-2 text-k-film-edge shadow dark:bg-k-film-edge dark:text-k-yellow rounded-sm"
              : "text-k-film-edge/55 hover:text-k-film-edge/80 dark:text-k-film-edge/40 dark:hover:text-k-yellow"
          }`}
        >
          {t("login.login")}
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded px-3 py-1.5 transition-colors ${
            mode === "signup"
              ? "bg-k-cream-2 text-k-film-edge shadow dark:bg-k-film-edge dark:text-k-yellow rounded-sm"
              : "text-k-film-edge/55 hover:text-k-film-edge/80 dark:text-k-film-edge/40 dark:hover:text-k-yellow"
          }`}
        >
          {t("login.register")}
        </button>
      </div>

      {mode === "signin" ? (
        <form action={signInAction} className="space-y-3">
          <input type="hidden" name="redirect" value={redirect || "/dashboard"} />
          {(signInState?.error || signInState?.success) && (
            <p
              className={`rounded px-3 py-2 text-xs ${
                signInState.error
                  ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                  : "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
              }`}
            >
              {signInState.error || signInState.success}
            </p>
          )}
          <Field label={t("login.email")} type="email" name="email" required />
          <Field label={t("login.password")} type="password" name="password" required />
          <button
            type="submit"
            disabled={signInPending}
            className="btn-kodak w-full disabled:opacity-50"
          >
            {signInPending ? t("common.pending_dots") : t("login.login")}
          </button>
          <p className="text-center text-xs text-k-film-edge/40">
            {mode === "signin"
              ? "Don't have an account?"
              : null}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="ml-1 text-k-film-edge/70 underline dark:text-zinc-300"
            >
              {t("login.register")}
            </button>
          </p>
        </form>
      ) : (
        <form action={signUpAction} className="space-y-3">
          {(signUpState?.error || signUpState?.success) && (
            <p
              className={`rounded px-3 py-2 text-xs ${
                signUpState.error
                  ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                  : "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
              }`}
            >
              {signUpState.error || signUpState.success}
            </p>
          )}
          <Field label={t("login.email")} type="email" name="email" required />
          <Field
            label={t("login.password")}
            type="password"
            name="password"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={signUpPending}
            className="btn-kodak w-full disabled:opacity-50"
          >
            {signUpPending ? t("common.pending_dots") : t("login.register")}
          </button>
          <p className="text-center text-xs text-k-film-edge/40">
            Already have an account?
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="ml-1 text-k-film-edge/70 underline dark:text-zinc-300"
            >
              {t("login.login")}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  type,
  name,
  required,
  minLength,
}: {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 placeholder:text-k-ink/40 dark:border-k-paper-line dark:bg-k-film-edge/40"
      />
    </div>
  );
}

