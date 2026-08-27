"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";

export default function Home() {
  const { t } = useSettings();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
      <div className="relative mx-auto max-w-2xl">
        {/* 两条斜向黄色胶带把相片贴在"背景纸"上 */}
        <div
          aria-hidden
          className="photo-tape"
          style={{ top: -12, left: "8%", transform: "rotate(-6deg)" }}
        />
        <div
          aria-hidden
          className="photo-tape"
          style={{ top: -12, right: "6%", transform: "rotate(5deg)" }}
        />

        {/* 冲印出来的相片（首页 hero） */}
        <div className="photo-print scanlines">
          <div className="relative overflow-hidden rounded-[2px] bg-gradient-to-br from-k-cream via-k-cream-2 to-k-yellow/10 p-6 sm:p-10">
            {/* 相片内也有轻微暗角 */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 130% 100% at 50% 50%, rgba(0,0,0,0) 58%, rgba(20,6,0,0.22) 100%)",
              }}
            />

            <div className="relative text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-k-gold">
                {t("home.tagline_barrel")}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-k-film-edge">
                {t("home.h1_line1")}
                <br />
                {t("home.h1_line2")}
              </h1>
              <p className="mx-auto mt-6 max-w-md text-base leading-8 text-k-film-edge/80">
                {t("home.hero_desc")}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/login" className="btn-kodak">
                  {t("home.cta_start")}
                </Link>
                <Link href="/dashboard" className="btn-kodak-yellow">
                  {t("home.cta_dashboard")}
                </Link>
              </div>

              <div className="mt-6 flex justify-center gap-4 font-mono text-[10px] tracking-widest text-k-film-edge/55">
                <span>{t("home.meta_dx")}</span>
                <span>·</span>
                <span>{t("home.meta_lat")}</span>
                <span>·</span>
                <span>{t("home.meta_proc")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 三张 Feature 卡：像相册里的三张底片小条 */}
      <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FeatureCard
          tag={t("home.feature1_tag")}
          title={t("home.feature1_title")}
          desc={t("home.feature1_desc")}
        />
        <FeatureCard
          tag={t("home.feature2_tag")}
          title={t("home.feature2_title")}
          desc={t("home.feature2_desc")}
        />
        <FeatureCard
          tag={t("home.feature3_tag")}
          title={t("home.feature3_title")}
          desc={t("home.feature3_desc")}
        />
      </div>
    </div>
  );
}

function FeatureCard({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative film-frame">
      <div className="film-frame-inner scanlines px-4 py-5">
        <span className="film-frame-number">{tag}</span>
        <h3 className="mt-2 text-sm font-semibold tracking-wide text-k-film-edge">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-6 text-k-film-edge/70 dark:text-k-film-edge/60">
          {desc}
        </p>
      </div>
    </div>
  );
}
