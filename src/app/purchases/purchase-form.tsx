"use client";

import { useState, useActionState } from "react";
import { addPurchase } from "./actions";
import type { ActionState } from "./actions";
import type { FilmStock } from "./types";
import { useSettings } from "@/lib/i18n/provider";

export function PurchaseForm({ filmStocks }: { filmStocks: FilmStock[] }) {
  const { t } = useSettings();
  const [state, formAction, pending] = useActionState<
    ActionState | null,
    FormData
  >(addPurchase, null);
  const [mode, setMode] = useState<"select" | "custom">("select");

  const today = new Date().toISOString().split("T")[0];

  if (filmStocks.length === 0) return <CustomForm />;

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-k-paper-line bg-k-cream-2 p-6 dark:border-k-paper-line dark:bg-k-film-edge/60"
    >
      <h2 className="text-sm font-semibold text-k-film-edge dark:text-k-yellow">
        {t("purchases.add")}
      </h2>

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

      {/* 模式切换 */}
      <div className="grid grid-cols-2 rounded-md bg-k-yellow/15 p-1 text-xs font-medium dark:bg-k-yellow/10">
        <button
          type="button"
          onClick={() => setMode("select")}
          className={`rounded px-3 py-1.5 transition-colors ${
            mode === "select"
              ? "bg-k-cream-2 text-k-film-edge shadow dark:bg-k-film-edge dark:text-k-yellow rounded-sm"
              : "text-k-film-edge/55 hover:text-k-film-edge/80 dark:text-k-film-edge/40 dark:hover:text-k-yellow"
          }`}
        >
          {t("purchases.mode_preset")}
        </button>
        <button
          type="button"
          onClick={() => setMode("custom")}
          className={`rounded px-3 py-1.5 transition-colors ${
            mode === "custom"
              ? "bg-k-cream-2 text-k-film-edge shadow dark:bg-k-film-edge dark:text-k-yellow rounded-sm"
              : "text-k-film-edge/55 hover:text-k-film-edge/80 dark:text-k-film-edge/40 dark:hover:text-k-yellow"
          }`}
        >
          {t("purchases.mode_custom")}
        </button>
      </div>

      {mode === "select" && (
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.name")} <span className="text-red-500">*</span>
          </label>
          <select
            name="stock_id"
            defaultValue=""
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          >
            <option value="" disabled>
              — {t("purchases.mode_preset")} —
            </option>
            {filmStocks.map((s) => (
              <option key={s.id} value={s.id}>
                {s.brand} {s.name} ISO {s.iso} ({s.format})
              </option>
            ))}
          </select>
        </div>
      )}

      {mode === "custom" && (
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-dashed border-k-paper-line p-3 dark:border-k-paper-line/70">
          <input type="hidden" name="stock_id" value="custom" />
          <Field label={t("purchases.brand")} name="brand" placeholder="e.g. Kodak" />
          <Field label={t("purchases.name")} name="name" placeholder="e.g. Portra 400" />
          <Field
            label={t("purchases.iso")}
            name="iso"
            type="number"
            placeholder="400"
            inputMode="numeric"
          />
          <div>
            <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
              <span className="text-red-500">* </span>Process
            </label>
            <select
              name="process"
              defaultValue="C-41"
              className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
            >
              <option value="C-41">C-41 (color)</option>
              <option value="E-6">E-6 (slide)</option>
              <option value="B&W">Black &amp; White</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
              {t("purchases.format")} <span className="text-red-500">*</span>
            </label>
            <select
              name="format"
              defaultValue="135"
              className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
            >
              <option value="135">135 (35mm)</option>
              <option value="120">120 (medium)</option>
              <option value="sheet">Sheet film</option>
            </select>
          </div>
        </div>
      )}

      {/* 通用字段 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.purchase_date")} <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="purchase_date"
            required
            defaultValue={today}
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.quantity")} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            required
            min={1}
            defaultValue={1}
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.unit_price")} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="unit_price"
            required
            min={0}
            step={0.01}
            inputMode="decimal"
            placeholder="19.90"
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.vendor")}
          </label>
          <input
            type="text"
            name="vendor"
            placeholder={t("purchases.vendor_placeholder")}
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("purchases.notes")}
        </label>
        <input
          type="text"
          name="notes"
          placeholder={t("purchases.notes_placeholder")}
          className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-k-yellow px-4 py-2 text-sm font-semibold text-k-film-edge transition-colors hover:bg-k-yellow-dark disabled:opacity-50 dark:bg-k-yellow dark:text-k-film-edge"
      >
        {pending ? t("common.pending_dots") : t("purchases.add")}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  inputMode?: "numeric" | "decimal";
}) {
  return (
    <div>
      <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 placeholder:text-k-ink/40 dark:border-k-paper-line dark:bg-k-film-edge/40"
      />
    </div>
  );
}

function CustomForm() {
  const { t } = useSettings();
  const [state, formAction, pending] = useActionState<
    ActionState | null,
    FormData
  >(addPurchase, null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-k-paper-line bg-k-cream-2 p-6 dark:border-k-paper-line dark:bg-k-film-edge/60"
    >
      <h2 className="text-sm font-semibold text-k-film-edge dark:text-k-yellow">
        {t("purchases.add")}
      </h2>

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

      <input type="hidden" name="stock_id" value="custom" />
      <div className="grid grid-cols-2 gap-3">
        <Field label={t("purchases.brand")} name="brand" placeholder="Kodak" />
        <Field label={t("purchases.name")} name="name" placeholder="Portra 400" />
        <Field label={t("purchases.iso")} name="iso" type="number" placeholder="400" inputMode="numeric" />
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            Process <span className="text-red-500">*</span>
          </label>
          <select
            name="process"
            defaultValue="C-41"
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          >
            <option value="C-41">C-41 (color)</option>
            <option value="E-6">E-6 (slide)</option>
            <option value="B&amp;W">Black &amp; White</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.format")} <span className="text-red-500">*</span>
          </label>
          <select
            name="format"
            defaultValue="135"
            className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
          >
            <option value="135">135 (35mm)</option>
            <option value="120">120 (medium)</option>
            <option value="sheet">Sheet film</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.purchase_date")} <span className="text-red-500">*</span>
          </label>
          <input type="date" name="purchase_date" required defaultValue={today} className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.quantity")} <span className="text-red-500">*</span>
          </label>
          <input type="number" name="quantity" required min={1} defaultValue={1} className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.unit_price")} <span className="text-red-500">*</span>
          </label>
          <input type="number" name="unit_price" required min={0} step={0.01} inputMode="decimal" placeholder="19.90" className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
            {t("purchases.vendor")}
          </label>
          <input type="text" name="vendor" placeholder={t("purchases.vendor_placeholder")} className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40" />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("purchases.notes")}
        </label>
        <input type="text" name="notes" placeholder={t("purchases.notes_placeholder")} className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-k-yellow px-4 py-2 text-sm font-semibold text-k-film-edge transition-colors hover:bg-k-yellow-dark disabled:opacity-50 dark:bg-k-yellow dark:text-k-film-edge"
      >
        {pending ? t("common.pending_dots") : t("purchases.add")}
      </button>
    </form>
  );
}
