"use client";

import { useActionState } from "react";
import { addCamera } from "./actions";
import type { ActionState } from "./actions";
import { useSettings } from "@/lib/i18n/provider";

export function CameraForm() {
  const [state, formAction, pending] = useActionState<
    ActionState | null,
    FormData
  >(addCamera, null);
  const { t } = useSettings();

  return (
    <form
      action={formAction}
      className="space-y-3 rounded-lg border border-k-paper-line bg-k-cream-2 p-5 dark:border-k-paper-line dark:bg-k-film-edge/60"
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label={t("load.camera_brand")} name="brand" placeholder={t("load.camera_brand_placeholder")} required />
        <Field label={t("load.camera_model")} name="model" placeholder={t("load.camera_model_placeholder")} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("load.camera_format")}
          </label>
          <select
            name="format"
            defaultValue="135"
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          >
            <option value="135">{t("load.format_135_opt")}</option>
            <option value="120">{t("load.format_120_opt")}</option>
            <option value="sheet">{t("load.format_sheet_opt")}</option>
          </select>
        </div>
        <Field label={t("load.camera_nickname")} name="nickname" placeholder={t("load.camera_nickname_placeholder")} />
      </div>

      <div>
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("load.camera_notes")}
        </label>
        <textarea
          name="notes"
          rows={2}
          className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 placeholder:text-k-ink/40 dark:border-k-paper-line dark:bg-k-film-edge/40"
          placeholder={t("load.camera_notes_placeholder")}
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
        {pending ? t("common.pending_dots") : t("load.camera_add_submit")}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 placeholder:text-k-ink/40 dark:border-k-paper-line dark:bg-k-film-edge/40"
      />
    </div>
  );
}
