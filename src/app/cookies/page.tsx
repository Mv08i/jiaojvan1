"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";

const lastUpdated = "2026-08-26";

export default function CookiesPage() {
  const { t } = useSettings();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/55">
          {t("legal.last_updated")} {lastUpdated}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-k-film-edge dark:text-k-yellow sm:text-3xl">
          {t("cookies.title")}
        </h1>
      </div>

      <Section title="1. 什么是 Cookie？">
        <p>
          Cookie 是网站在你访问时存入浏览器（或本地存储 LocalStorage / SessionStorage）中的小型文本文件。
          它们帮助网站记住你的登录状态、语言偏好、暗色模式等信息，让你下一次访问时不用再重复设置。
        </p>
      </Section>

      <Section title="2. 我们使用了哪些 Cookie？">
        <p>
          本工具严格遵守「<b>最小必要原则</b>」，只在<b>必须使用</b>时才写入 Cookie，
          且<b>完全不使用</b>第三方广告追踪 Cookie、Facebook Pixel、Google Analytics 等任何分析追踪类脚本。
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-k-paper-line dark:border-k-paper-line/70">
                <th className="py-2 pr-4 w-36 font-semibold text-k-film-edge dark:text-k-yellow/90">{t("cookies.col_name")}</th>
                <th className="py-2 pr-4 w-24 font-semibold text-k-film-edge dark:text-k-yellow/90">{t("cookies.col_expiry")}</th>
                <th className="py-2 pr-4 w-28 font-semibold text-k-film-edge dark:text-k-yellow/90">{t("cookies.col_necessary")}</th>
                <th className="py-2 font-semibold text-k-film-edge dark:text-k-yellow/90">{t("cookies.col_purpose")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <CookieRow
                name={t("cookies.row_auth_name")}
                duration={t("cookies.row_auth_duration")}
                necessary={t("cookies.row_auth_necessary")}
                desc={t("cookies.row_auth_desc")}
              />
              <CookieRow
                name={t("cookies.row_theme_name")}
                duration={t("cookies.row_theme_duration")}
                necessary={t("cookies.row_theme_necessary")}
                desc={t("cookies.row_theme_desc")}
              />
              <CookieRow
                name={t("cookies.row_next_name")}
                duration={t("cookies.row_next_duration")}
                necessary={t("cookies.row_next_necessary")}
                desc={t("cookies.row_next_desc")}
              />
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. 第三方 Cookie">
        <p>
          本工具<b>不主动加载任何第三方 JS、不设置任何第三方 Cookie</b>。用户通过「支持一下」页面扫码打赏（微信 / 支付宝）是本地 App 内完成，不涉及本站跨站跳转。
        </p>
        <ul className="space-y-2 pl-5 list-disc mt-2">
          <li>❌ 不使用 Google Analytics / 百度统计等流量分析脚本；</li>
          <li>❌ 不使用 Facebook Pixel / 抖音 / 小红书 等广告再营销 Pixel；</li>
          <li>❌ 不使用任何广告联盟或 AdSense 脚本；</li>
          <li>❌ 不使用 Google Fonts 或其他可能在境外跨站追踪字体，字体随 Next.js 打包本地化加载。</li>
        </ul>
      </Section>

      <Section title="4. 如何管理 / 删除 Cookie？">
        <p>
          你可以通过自己的浏览器设置随时查看、禁用或删除 Cookie：
        </p>
        <ul className="space-y-2 pl-5 list-disc mt-2">
          <li><b>Chrome / Edge</b>：设置 → 隐私和安全 → Cookie 及其他网站数据；</li>
          <li><b>Safari</b>：设置 → Safari → 高级 → 网站数据；</li>
          <li><b>Firefox</b>：设置 → 隐私与安全 → Cookie 和站点数据。</li>
        </ul>
        <p className="mt-2">
          ⚠️ 注意：<b>如果你完全禁用本站点的 Cookie，你将无法登录使用任何需要鉴权的功能</b>（采购、装卷、冲洗、统计等），仅首页可正常浏览。
        </p>
      </Section>

      <Section title="5. 本政策的更新">
        <p>
          我们可能会不定期更新本 Cookie 政策（例如在新增功能或替换技术栈时）。最新版本始终在本页面（/cookies）可见，页面顶部「最后更新」日期即版本生效日。
        </p>
      </Section>

      <Section title="6. 联系我们">
        <p>
          关于本 Cookie 政策有任何疑问？或者你想要求我们提供任何 Cookie 的具体内容？
          欢迎通过邮箱 <code className="rounded bg-k-yellow/15 px-1 ring-1 ring-k-gold/30 dark:bg-k-gold/10 dark:ring-k-yellow/30">lz7729889@gmail.com</code> 与我们联系。
        </p>
      </Section>

      <div className="mt-12 text-center text-xs text-k-film-edge/40 dark:text-k-film-edge/70">
        <Link href="/" className="hover:text-k-film-edge/70 dark:hover:text-k-film-edge/40">
          {t("legal.back_home")}
        </Link>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 space-y-3 text-sm leading-7 text-k-film-edge/80 dark:text-zinc-300">
      <h2 className="text-base font-semibold text-k-film-edge dark:text-k-yellow">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function CookieRow({
  name,
  duration,
  necessary,
  desc,
}: {
  name: string;
  duration: string;
  necessary: string;
  desc: string;
}) {
  return (
    <tr className="align-top">
      <td className="py-3 pr-4 font-medium text-k-film-edge dark:text-k-yellow/90">{name}</td>
      <td className="py-3 pr-4 text-k-film-edge/70 dark:text-k-film-edge/40">{duration}</td>
      <td className="py-3 pr-4 text-k-film-edge/70 dark:text-k-film-edge/40">{necessary}</td>
      <td className="py-3 text-k-film-edge/70 dark:text-k-film-edge/40">{desc}</td>
    </tr>
  );
}
