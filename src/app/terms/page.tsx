"use client";

import Link from "next/link";
import { useSettings } from "@/lib/i18n/provider";

const lastUpdated = "2026-08-26";

export default function TermsPage() {
  const { t } = useSettings();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs text-k-film-edge/55 dark:text-k-film-edge/55">
          {t("legal.last_updated")} {lastUpdated}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-k-film-edge dark:text-k-yellow sm:text-3xl">
          {t("terms.title")}
        </h1>
      </div>

      <Section title="1. 服务说明">
        <p>
          欢迎使用 FilmLedger（以下简称「本工具」）。本工具为你提供胶片摄影相关的采购记录、冲洗记录、装卷管理、成本统计与可视化图表等云端记账功能。
          本工具的代码按开源友好的方式维护，所有核心功能<b>永久免费</b>使用。
        </p>
      </Section>

      <Section title="2. 账户与注册">
        <ol className="space-y-3 pl-5 list-decimal">
          <li>
            你需通过邮箱或第三方账户注册一个账号才能使用云端同步功能；你有义务妥善保管账号与密码，
            <b>因你自身原因导致的账号被盗、数据损失，由你自行负责</b>。
          </li>
          <li>
            你承诺注册时提供的信息真实、准确、完整；不得冒用他人身份或提供虚假邮箱。
          </li>
          <li>每个账号仅限你本人使用，不可出租、出借、转让、买卖给任何第三方。</li>
        </ol>
      </Section>

      <Section title="3. 用户行为规范">
        <p>你使用本工具时<b>不得</b>从事以下行为：</p>
        <ul className="space-y-2 pl-5 list-disc">
          <li>上传、录入违法、色情、暴力、歧视、侵犯他人知识产权或隐私的内容；</li>
          <li>尝试破坏服务器安全、绕过 RLS 越权访问其他用户的数据、发起爬虫/DDOS 等攻击；</li>
          <li>利用本工具从事任何违法商业活动（例如赌博、非法集资、洗黑钱记账等）；</li>
          <li>反向工程、破解、修改或恶意篡改本工具的前端或数据库结构。</li>
        </ul>
        <p className="mt-2">
          违反上述任一行为，我们有权立即封禁、停用你的账户，并视情节向有关部门报案。
        </p>
      </Section>

      <Section title="4. 数据内容与所有权">
        <ol className="space-y-3 pl-5 list-decimal">
          <li>
            你通过本工具录入的采购记录、冲洗记录、备注、自定义型号等<b>业务数据</b>的<b>所有权归你本人所有</b>；
          </li>
          <li>
            你授权我们在你的账户存续期内，为提供同步、备份、统计图表等功能的<b>必要目的</b>而使用、复制、存储这些数据；
          </li>
          <li>
            若你上传了任何内容，你保证这些内容未侵犯任何第三方的权利，由此引发的一切纠纷由你自行承担。
          </li>
        </ol>
      </Section>

      <Section title="5. 知识产权">
        <ol className="space-y-3 pl-5 list-decimal">
          <li>
            本工具的源代码、Logo、文字排版、UI 设计、图表样式等，其版权、专利权、商标权或其他知识产权，均归开发者所有或已获合法授权。
          </li>
          <li>
            非经我们书面许可，你不得以任何形式复制、传播、修改、镜像、用于商业转售或再许可。
          </li>
          <li>
            本工具名称「FilmLedger」中的「Ledger」为通用名词（账本），不构成对任何第三方商标的侵犯。
          </li>
        </ol>
      </Section>

      <Section title="6. 免费服务与打赏规则">
        <ol className="space-y-3 pl-5 list-decimal">
          <li>
            本工具所有功能对所有用户<b>免费开放</b>，不设功能付费墙、不设高级会员。
            「支持一下」模块中的微信 / 支付宝打赏属于你基于对工具的认可与感谢所进行的<b>自愿赠与</b>。
          </li>
          <li>
            <b>打赏不退款</b>：由于打赏是你自愿赠与的行为，且我们并未为此承诺交付任何额外功能或实体商品，
            所有打赏款项<b>一经支付不可撤销、不予退款</b>。
          </li>
          <li>
            打赏前后你可使用的工具功能与服务<b>完全一致</b>，不存在「多打赏多权益、少打赏少权益」的区别对待。
          </li>
        </ol>
      </Section>

      <Section title="7. 免责声明（重要，请仔细阅读）">
        <p className="font-medium">
          本工具按「<b>现况</b>」与「<b>可获得</b>」的基础提供，开发者在法律允许的最大范围内，不对下列事项提供任何明示或默示的担保：
        </p>
        <ul className="space-y-2 pl-5 list-disc mt-2">
          <li>工具绝对不中断、无 Bug、永不丢失数据；</li>
          <li>统计与图表计算结果的 100% 准确性（建议你自行核对重要账目）；</li>
          <li>本工具完全满足你的个人使用习惯或业务目的；</li>
          <li>对因不可抗力（服务器中断、战争、自然灾害、第三方服务商故障等）导致的数据丢失或服务中止承担责任。</li>
        </ul>
        <p className="mt-3">
          在任何情况下，开发者因本工具对你造成的任何间接、附带、特殊、惩罚性或后果性损失（包括但不限于利润损失、数据损失、业务中断损失），均不承担责任，即使开发者已被告知存在该类损失的可能性。
        </p>
      </Section>

      <Section title="8. 服务变更与中止">
        <p>
          保留随时对本工具进行功能调整、升级、暂停或永久终止的权利。若决定永久终止运营，
          我们会提前至少<b>30 天</b>在站内公告，并提供你导出所有数据的合理窗口期。
        </p>
      </Section>

      <Section title="9. 适用法律与争议解决">
        <p>
          本条款的订立、执行、解释与争议解决均适用<b>中华人民共和国法律</b>（不含香港、澳门、台湾地区法律）。
          因本条款产生的争议，双方应友好协商解决；协商不成的，任一方均可向开发者所在地有管辖权的人民法院提起诉讼。
        </p>
      </Section>

      <Section title="10. 条款的生效与修改">
        <ol className="space-y-3 pl-5 list-decimal">
          <li>你首次注册或使用本工具即视为你已阅读、理解并完全同意本条款。</li>
          <li>
            我们保留不时修改本条款的权利，修改后的条款会以页面「最后更新」日期公布。
            若你在修改后继续使用本工具，即视为你接受修改后的条款。
          </li>
          <li>
            本条款中某一条款因任何原因被法院认定为无效或不可执行，其余条款的效力不受影响。
          </li>
        </ol>
      </Section>

      <Section title="11. 联系方式">
        <ul className="space-y-2 pl-5 list-disc">
          <li>邮箱：<code className="rounded bg-k-yellow/15 px-1 ring-1 ring-k-gold/30 dark:bg-k-gold/10 dark:ring-k-yellow/30">lz7729889@gmail.com</code></li>
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
