"use client";

import { useActionState } from "react";
import { addDeveloping } from "./actions";
import type { ActionState } from "./actions";
import type { Purchase } from "./types";
import { useSettings } from "@/lib/i18n/provider";

export function DevelopingForm({ purchases }: { purchases: Purchase[] }) {
  const [state, formAction, pending] = useActionState<
    ActionState | null,
    FormData
  >(addDeveloping, null);
  const { t } = useSettings();

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-k-paper-line bg-k-cream-2 p-5 dark:border-k-paper-line dark:bg-k-film-edge/60">
      <div>
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("dev.linked_purchase_label")}
        </label>
        <select
          name="purchase_id"
          defaultValue=""
          className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
        >
          <option value="">{t("dev.no_link_manual")}</option>
          {purchases.map((p) => (
            <option key={p.id} value={p.id}>
              {p.brand} {p.name} (ISO {p.iso})
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-k-film-edge/40 dark:text-k-film-edge/55">
          {t("dev.linked_hint")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t("dev.brand")} name="brand" placeholder={t("dev.brand_placeholder")} />
        <Field label={t("dev.name")} name="name" placeholder={t("dev.name_placeholder")} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Field label={t("dev.develop_cost_short")} name="develop_cost" type="number" step="0.01" defaultValue="0" />
        <Field label={t("dev.scan_cost_short")} name="scan_cost" type="number" step="0.01" defaultValue="0" />
        <Field label={t("dev.shipping_cost_short")} name="shipping_cost" type="number" step="0.01" defaultValue="0" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t("dev.develop_date")} name="develop_date" type="date" required />
        <Field label={t("dev.lab")} name="lab" placeholder={t("dev.lab_placeholder")} />
      </div>

      <div>
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("dev.notes")}
        </label>
        <textarea
          name="notes"
          rows={2}
          className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 placeholder:text-k-ink/40 dark:border-k-paper-line dark:bg-k-film-edge/40"
          placeholder={t("dev.notes_placeholder_extra")}
        />
      </div>

      {state?.error && (
        <p className="rounded bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950 dark:text-red-400">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded bg-green-50 px-3 py-2 text-xs text-green-600 dark:bg-green-950 dark:text-green-400">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-kodak w-full disabled:opacity-50"
      >
        {pending ? t("common.pending_dots") : t("dev.add_submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  step?: string;
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
        placeholder={placeholder}
        defaultValue={defaultValue}
        step={step}
        className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 placeholder:text-k-ink/40 dark:border-k-paper-line dark:bg-k-film-edge/40"
      />
    </div>
  );
}
