"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";

const lastUpdated = "2026-08-26";

export default function PrivacyPage() {
  const { t } = useSettings();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/55">
          {t("legal.last_updated")} {lastUpdated}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-k-film-edge dark:text-k-yellow sm:text-3xl">
          {t("privacy.title")}
        </h1>
      </div>
      <Section title="1. 引言">
        <p>
          FilmLedger（以下简称「本工具」「我们」）是一个由独立开发者维护的胶片摄影记账工具。
          我们深知个人信息对你的重要性，并承诺严格遵守本政策所列的原则来保护你的信息安全。
          本政策适用于你在使用本工具时我们收集、使用、存储、共享和保护的所有信息。
        </p>
      </Section>

      <Section title="2. 我们收集的信息">
        <p>我们只收集**最小必要**的信息，以提供你登录与同步数据的基础服务：</p>
        <ul className="space-y-3 pl-5 list-disc">
          <li>
            <b>账户信息（Supabase Auth）</b>
            ：你通过邮箱注册时，我们会存储你的 <code className="text-[12px] rounded bg-k-yellow/15 px-1 ring-1 ring-k-gold/30 dark:bg-k-gold/10 dark:ring-k-yellow/30">邮箱地址</code> 和加密后的密码哈希（服务器永远看不到你的明文密码）。若使用第三方登录（如 GitHub / Google / 微信等），我们仅获取对应平台提供的昵称、头像和唯一标识。
          </li>
          <li>
            <b>你主动录入的业务数据</b>
            ：采购记录、冲洗记录、装卷/相机信息、自定义胶卷型号、备注等。这些数据**完全由你主动输入**，我们不会主动采集。
          </li>
          <li>
            <b>使用日志</b>
            ：服务端会自动记录请求发生的时间、客户端 IP（仅用于故障排查与异常行为防御，一般保存不超过 30 天）。
          </li>
        </ul>
        <p className="mt-3">
          我们<b>不</b>收集：你的通讯录、短信、位置、相机胶卷（除非你主动上传图片到已删除的相册功能）、设备 IMEI/IDFA 等与记账无关的敏感信息。
        </p>
      </Section>

      <Section title="3. 我们如何使用信息">
        <ul className="space-y-3 pl-5 list-disc">
          <li>为你提供登录、数据云端同步、跨设备恢复等基础功能；</li>
          <li>根据你的邮箱，向你发送账户安全通知（例如登录告警、密码重置邮件）；</li>
          <li>在你本人申请注销或导出数据时，核对你的身份；</li>
          <li>排查程序 Bug 与服务异常，维护系统安全稳定。</li>
        </ul>
        <p className="mt-3">
          我们<b>不会</b>把你的记账数据用于广告投放、用户画像、出售给第三方等任何商业用途。
        </p>
      </Section>

      <Section title="4. 数据存储与托管方（Supabase）">
        <p>
          你的账户与业务数据托管在 <b>Supabase Inc.</b>（位于美国的云服务商，
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-k-red underline-offset-2 hover:underline dark:text-k-red-dark"
          >
            隐私政策
          </a>
          ）提供的 PostgreSQL 数据库和对象存储中。我们与 Supabase 之间通过 HTTPS 传输数据，且数据库启用了行级安全（RLS），你只能访问自己账户下的数据。
        </p>
        <p>
          对于中国境内用户，如果你希望使用境内数据托管以满足《个人信息保护法》下的本地化要求，可以在后续版本支持自建部署后，自行将本工具代码部署到境内服务器。
        </p>
      </Section>

      <Section title="5. 第三方服务（打赏）">
        <p>
          FilmLedger 接受<b>微信支付 / 支付宝</b>打赏。打赏款项通过收款二维码直接进入开发者个人账户，
          支付过程<b>完全在微信 / 支付宝 App 内完成</b>，本工具<b>不接触、不存储、不可见</b>你的支付信息。
        </p>
        <p className="mt-3">
          如果你不打赏，本工具的所有功能（采购、冲洗、装卷、统计等）对所有用户永久免费开放，不受任何限制。
        </p>
      </Section>

      <Section title="6. 数据共享与披露">
        <p>除以下情形外，我们不会向任何第三方共享你的个人信息：</p>
        <ol className="space-y-3 pl-5 list-decimal">
          <li>
            <b>取得你明确同意</b>：例如你主动要求我们把数据发送给某个第三方；
          </li>
          <li>
            <b>法定义务要求</b>：基于法律法规、司法或行政机关的强制性要求；
          </li>
          <li>
            <b>保护我们与公众的权利与安全</b>：在遭受攻击、滥用或涉及非法活动时，向监管或安全机构披露。
          </li>
        </ol>
      </Section>

      <Section title="7. 你的权利">
        <p>根据《个人信息保护法》等适用法律，你对自己的个人信息享有以下权利：</p>
        <ul className="space-y-3 pl-5 list-disc">
          <li><b>知情权、查阅权、复制权</b>：可以随时登录账户查看自己的所有记账数据；</li>
          <li><b>更正权</b>：随时修改采购/冲洗/装卷记录；</li>
          <li><b>删除权（被遗忘权）</b>：可以逐条删除记录；如希望彻底注销账户并清空所有数据，可通过下方联系方式与我们取得联系，我们会在 15 个工作日内处理；</li>
          <li><b>撤回同意权</b>：可随时停止使用本工具。</li>
        </ul>
      </Section>

      <Section title="8. 未成年人保护">
        <p>
          本工具面向所有年龄段用户开放，但我们建议<b>未满 14 周岁的未成年人</b>在监护人陪同下阅读本政策并使用。如我们发现自己在未获得可核实的监护人同意的情况下收集了未成年人的个人信息，会尽快删除相关信息。
        </p>
      </Section>

      <Section title="9. 安全措施">
        <ul className="space-y-2 pl-5 list-disc">
          <li>全站启用 HTTPS，前后端数据全程加密传输；</li>
          <li>密码采用 bcrypt / scrypt 等行业标准算法加盐哈希存储；</li>
          <li>数据库启用行级安全（RLS），防止跨用户越权访问；</li>
          <li>Supabase 密钥使用环境变量管理，不会写入代码仓库。</li>
        </ul>
      </Section>

      <Section title="10. 政策更新">
        <p>
          我们可能会不时更新本政策。更新后的版本会在本页面以「最后更新」日期的形式公布，重大变更我们会在工具顶部以公告的方式提示你。你在更新后继续使用本工具，视为接受更新后的政策。
        </p>
      </Section>

      <Section title="11. 联系我们">
        <p>
          如果你对本政策有任何疑问、想行使上述权利（例如申请注销账户、导出全部数据），或发现任何可能的隐私问题，请通过以下方式联系：
        </p>
        <ul className="space-y-2 pl-5 list-disc mt-2">
          <li>邮箱：<code className="rounded bg-k-yellow/15 px-1 ring-1 ring-k-gold/30 dark:bg-k-gold/10 dark:ring-k-yellow/30">lz7729889@gmail.com</code></li>
          <li>或在本工具的「支持一下」页面通过打赏页面备注框留言</li>
        </ul>
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
