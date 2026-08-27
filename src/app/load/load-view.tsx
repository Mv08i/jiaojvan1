"use client";

import { useSettings } from "@/lib/i18n/provider";
import { CameraForm } from "./camera-form";
import { LoadForm, UnloadForm } from "./load-form";
import { DeleteCameraButton } from "./delete-button";
import type { Camera, Purchase } from "./types";

type Props = {
  supabaseNotConfigured?: boolean;
  notLoggedIn?: boolean;
  cameras: Camera[];
  purchases: Purchase[];
};

export function LoadView(props: Props) {
  const { t } = useSettings();

  if (props.supabaseNotConfigured) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight">{t("load.title")}</h1>
        <div className="mt-6 rounded-lg border border-dashed border-k-gold bg-k-yellow/10 p-6 text-sm text-k-film-edge dark:border-k-gold/60 dark:bg-k-gold/10 dark:text-k-yellow">
          <p className="font-semibold">{t("common.supabase_not_configured_title")}</p>
          <p className="mt-1 text-xs leading-6">
            {t("common.supabase_not_configured_hint")}
          </p>
        </div>
      </div>
    );
  }

  const loadedCount = props.cameras.filter((c) => c.current_purchase_id).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("load.title")}</h1>
          <p className="mt-1 text-sm text-k-film-edge/55 dark:text-k-film-edge/40">
            {t("load.subtitle")}
          </p>
        </div>
        {props.cameras.length > 0 && (
          <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
            {t("load.x_of_y_loaded", { loaded: loadedCount, total: props.cameras.length })}
          </p>
        )}
      </div>

      {props.notLoggedIn && (
        <div className="rounded-lg border border-dashed border-k-paper-line p-6 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("common.please_login")}
        </div>
      )}

      {!props.notLoggedIn && <CameraForm />}

      {!props.notLoggedIn && props.cameras.length === 0 && (
        <div className="rounded-lg border border-dashed border-k-paper-line p-12 text-center text-sm text-k-film-edge/40 dark:border-k-paper-line/70 dark:text-k-film-edge/55">
          {t("load.empty")}
          <br />
          <span className="text-xs">{t("load.empty_hint")}</span>
        </div>
      )}

      {!props.notLoggedIn && props.cameras.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {props.cameras.map((c) => (
            <CameraCard key={c.id} camera={c} purchases={props.purchases} />
          ))}
        </div>
      )}
    </div>
  );
}

function CameraCard({ camera, purchases }: { camera: Camera; purchases: Purchase[] }) {
  const { t } = useSettings();
  const loaded = camera.current_purchase_id !== null;
  const formatLabel =
    camera.format === "135"
      ? t("load.format_135")
      : camera.format === "120"
        ? t("load.format_120")
        : t("load.format_large");

  return (
    <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-k-film-edge dark:text-k-yellow">
              {camera.brand} {camera.model}
            </span>
            {camera.nickname && (
              <span className="text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
                · {camera.nickname}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
            {formatLabel}
            {camera.notes ? ` · ${camera.notes}` : ""}
          </p>
        </div>
        <DeleteCameraButton id={camera.id} />
      </div>

      <div className="mt-4 border-t border-k-paper-line/60 pt-4 dark:border-k-paper-line">
        {loaded ? (
          <>
            <div className="mb-3 rounded-md bg-emerald-50 px-3 py-2 dark:bg-emerald-950">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {camera.loaded_brand} {camera.loaded_name}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                  {t("load.current_loaded_iso", { iso: camera.loaded_iso ?? "—" })}
                </span>
              </div>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                {t("load.loaded_at", {
                  date: new Date(camera.loaded_at!)
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, "."),
                  frames: camera.frames_shot,
                })}
              </p>
            </div>
            <UnloadForm cameraId={camera.id} framesShot={camera.frames_shot} />
          </>
        ) : (
          <LoadForm cameraId={camera.id} purchases={purchases} />
        )}
      </div>
    </div>
  );
}
