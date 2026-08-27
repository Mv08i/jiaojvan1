"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { loadFilm, unloadFilm } from "./actions";
import type { Purchase } from "./types";
import { useSettings } from "@/lib/i18n/provider";

// 装卷表单：未装载的相机用，选一条采购记录装进去
export function LoadForm({
  cameraId,
  purchases,
}: {
  cameraId: string;
  purchases: Purchase[];
}) {
  const [today] = useState(() => new Date().toISOString().slice(0, 10));
  const { t } = useSettings();

  if (purchases.length === 0) {
    return (
      <p className="text-xs text-k-film-edge/40 dark:text-k-film-edge/55">
        {t("load.no_purchases")}
        <a href="/purchases" className="underline">{t("load.no_purchases_link")}</a>
        {t("load.no_purchases_after")}
      </p>
    );
  }

  return (
    <form action={loadFilm} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="camera_id" value={cameraId} />
      <div className="flex-1 min-w-[180px]">
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("load.select_purchase_label")}
        </label>
        <select
          name="purchase_id"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
        >
          <option value="" disabled>
            {t("load.select_purchase_opt")}
          </option>
          {purchases.map((p) => (
            <option key={p.id} value={p.id}>
              {p.brand} {p.name} (ISO {p.iso})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("load.load_date")}
        </label>
        <input
          type="date"
          name="loaded_at"
          defaultValue={today}
          className="mt-1 rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
        />
      </div>
      <SubmitButton label={t("load.load_submit")} pendingLabel={t("load.load_pending")} />
    </form>
  );
}

// 卸卷表单：已装载的相机用，记录已拍帧数后卸卷
export function UnloadForm({
  cameraId,
  framesShot,
}: {
  cameraId: string;
  framesShot: number;
}) {
  const { t } = useSettings();
  return (
    <form action={unloadFilm} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="camera_id" value={cameraId} />
      <div>
        <label className="text-xs font-medium text-k-film-edge/70 dark:text-k-film-edge/40">
          {t("load.frames_shot_label")}
        </label>
        <input
          type="number"
          name="frames_shot"
          min={0}
          defaultValue={framesShot}
          className="mt-1 w-24 rounded-md border border-k-paper-line bg-k-cream-2 px-3 py-2 text-sm shadow-inner shadow-k-gold/5 dark:border-k-paper-line dark:bg-k-film-edge/40"
        />
      </div>
      <SubmitButton label={t("load.unload_submit")} pendingLabel={t("load.unload_pending")} variant="ghost" />
    </form>
  );
}

function SubmitButton({
  label,
  pendingLabel,
  variant = "solid",
}: {
  label: string;
  pendingLabel: string;
  variant?: "solid" | "ghost";
}) {
  const { pending } = useFormStatus();
  const base =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50";
  const cls =
    variant === "solid"
      ? `${base} bg-k-yellow text-k-film-edge hover:bg-k-yellow-dark dark:bg-k-yellow dark:text-k-film-edge dark:hover:bg-k-yellow-dark`
      : `${base} border border-k-paper-line text-k-film-edge/80 hover:bg-k-cream/60 dark:border-k-paper-line/70 dark:text-k-yellow/90 dark:hover:bg-k-gold/20`;
  return (
    <button type="submit" disabled={pending} className={cls}>
      {pending ? pendingLabel : label}
    </button>
  );
}
