// ============================================================
// FilmLedger 多语言字典（默认英文，支持简体中文）
// 注：翻译缺失时，使用英文 key 作为 fallback，避免页面空白。
// ============================================================

export type Locale = "en" | "zh";

export type Currency = "CNY" | "USD" | "EUR" | "GBP";

export const CURRENCIES: {
  code: Currency;
  label: string;
  symbol: string;
}[] = [
  { code: "CNY", label: "CNY 人民币", symbol: "¥" },
  { code: "USD", label: "USD 美元", symbol: "$" },
  { code: "EUR", label: "EUR 欧元", symbol: "€" },
  { code: "GBP", label: "GBP 英镑", symbol: "£" },
];

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "简体中文" },
];

export type MessagesKey = keyof typeof messages.en;

// ------------------------------------------------------------------
// English (default / fallback)
// ------------------------------------------------------------------
const en = {
  // ---- Layout / Nav ----
  "nav.home": "Home",
  "nav.dashboard": "Dashboard",
  "nav.purchases": "Purchases",
  "nav.developing": "Developing",
  "nav.load": "Load Film",
  "nav.stats": "Stats",
  "nav.support": "Support ☕",
  "nav.login": "Log in",
  "nav.logout": "Log out",

  "footer.tagline": "Made with 🎞️ for people who still shoot film",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.cookies": "Cookies",
  "footer.support_author": "Support the author",

  // ---- Landing page ----
  "home.tagline_barrel": "◉ KODAK · PORTRA 400 · ISO 400 · 135-36",
  "home.h1_line1": "Film is getting expensive",
  "home.h1_line2": "know what you actually spend",
  "home.hero_desc":
    "Portra 400 went from $7 to $18 a roll. Track every roll of film you buy and every lab bill, so you know when to stock up and when to stop.",
  "home.cta_start": "Start tracking",
  "home.cta_dashboard": "Open dashboard",
  "home.meta_dx": "DX: 124-1244",
  "home.meta_lat": "LAT: 400",
  "home.meta_proc": "PROC: C-41",

  "home.feature1_tag": "Frame 07",
  "home.feature1_title": "Purchases",
  "home.feature1_desc": "Log every roll: price, shop, quantity.",
  "home.feature2_tag": "Frame 18",
  "home.feature2_title": "Developing",
  "home.feature2_desc": "Track develop cost, scan cost and shipping.",
  "home.feature3_tag": "Frame 24",
  "home.feature3_title": "Price trends",
  "home.feature3_desc": "See how the films you love trend over time.",

  // ---- Supabase / auth ----
  "common.supabase_not_configured_title": "Supabase is not configured yet",
  "common.supabase_not_configured_hint":
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, then restart the dev server.",
  "common.please_login": "Please log in first",
  "common.please_login_continue": "after logging in",
  "common.log_in": "Log in",
  "common.go_to": "Go to",
  "common.view_all": "View all →",
  "common.add_first": "Add the first one →",
  "common.pending_dots": "Saving…",
  "common.delete": "Delete",

  // ---- Dashboard ----
  "dashboard.title": "Dashboard",
  "dashboard.subtitle": "Your film spending overview",
  "dashboard.recent_purchases": "Recent purchases",
  "dashboard.no_purchases_yet": "No purchases yet",

  "stat.year_film_cost": "{year} film cost",
  "stat.year_purchased_rolls": "{year} rolls bought",
  "stat.year_dev_cost": "{year} developing cost",
  "stat.stock_value": "Stock value",
  "stat.stock_hint": "{count} rolls unprocessed",

  "table.film": "Film",
  "table.date": "Date",
  "table.quantity": "Qty",
  "table.unit_price": "Unit",
  "table.total_price": "Total",
  "table.vendor": "Vendor",
  "table.actions": "",
  "table.lab": "Lab",
  "table.develop": "Develop",
  "table.scan": "Scan",
  "table.shipping": "Ship",
  "table.notes": "Notes",
  "table.total_with_scan": "Total (incl. scan + ship)",
  "table.scan_portion": "Scan {amount}",
  "table.purchase_count": "Purchases",
  "table.total_rolls": "Total rolls",
  "table.total_spent": "Total spent",
  "table.dev_count": "Develops",
  "table.dev_subtotal": "Develop subtotal",
  "table.total_cost_including": "Total cost (incl. scan + ship)",

  // ---- Purchases page ----
  "purchases.title": "Purchases",
  "purchases.empty": "No purchases yet",
  "purchases.empty_hint": "Add your first roll to start tracking",
  "purchases.add": "Add purchase",
  "purchases.brand": "Brand",
  "purchases.name": "Film name",
  "purchases.iso": "ISO",
  "purchases.format": "Format",
  "purchases.purchase_date": "Purchase date",
  "purchases.unit_price": "Unit price",
  "purchases.quantity": "Quantity",
  "purchases.total_price": "Total price",
  "purchases.vendor": "Vendor / shop",
  "purchases.vendor_placeholder": "Taobao, shop, online…",
  "purchases.notes": "Notes (optional)",
  "purchases.notes_placeholder": "e.g. batch #, expiry date",
  "purchases.mode_preset": "Choose film",
  "purchases.mode_custom": "Custom film",

  // ---- Developing page ----
  "dev.title": "Developing",
  "dev.empty": "No developing records yet",
  "dev.empty_hint": "Drop off a roll and log the costs here",
  "dev.add": "Add record",
  "dev.develop_date": "Develop date",
  "dev.lab": "Lab",
  "dev.lab_placeholder": "e.g. Panda Lab",
  "dev.develop_cost": "Develop cost",
  "dev.scan_cost": "Scan cost",
  "dev.shipping_cost": "Shipping cost",
  "dev.total_cost": "Total",
  "dev.linked_purchase": "Linked purchase",
  "dev.linked": "Linked to purchase",
  "dev.notes": "Notes (optional)",
  "dev.notes_placeholder": "Push / ECN-2 / 135 etc.",

  // ---- Load / cameras page ----
  "load.title": "Load Film",
  "load.subtitle": "Manage which roll is loaded in each camera",
  "load.empty": "No cameras yet",
  "load.empty_hint": "Add your first film camera to start loading",
  "load.camera_add": "Add camera",
  "load.camera_brand": "Brand",
  "load.camera_model": "Model",
  "load.camera_nickname": "Nickname (optional)",
  "load.camera_format": "Format",
  "load.camera_notes": "Notes (optional)",
  "load.format_135": "35mm",
  "load.format_120": "Medium format",
  "load.format_large": "Large format",
  "load.x_of_y_loaded": "{loaded}/{total} loaded",

  "load.current_loaded_iso": "ISO {iso}",
  "load.loaded_at": "Loaded {date} · {frames} frames shot",
  "load.unload": "Unload",
  "load.unload_confirm": "Mark this roll as unloaded",
  "load.load_purchase": "Load a purchase",
  "load.select_purchase": "Select a purchase…",
  "load.load": "Load",
  "load.frames_shot": "Frames shot",
  "load.remove_camera": "Remove camera",

  // ---- Stats page ----
  "stats.title": "Stats",
  "stats.subtitle": "Yearly overview and per-brand breakdown",
  "stats.yearly_chart": "Yearly spending",
  "stats.yearly_chart_hint": "Total film purchased per year",
  "stats.brand_chart": "Spending by brand",
  "stats.brand_chart_hint": "Cumulative cost grouped by brand",
  "stats.summary_total_spent": "Total spent",
  "stats.summary_dev_cost": "Developing cost",
  "stats.summary_total_cost": "Grand total",
  "stats.summary_total_rolls": "Total rolls",
  "stats.summary_avg_price": "Avg per roll",
  "stats.summary_avg_label": "Average",
  "stats.brand_table_title": "Brand breakdown",
  "stats.brand_table_brand": "Brand",
  "stats.brand_table_rolls": "Rolls",
  "stats.brand_table_total": "Total",

  // ---- Login page ----
  "login.title": "Welcome back",
  "login.subtitle": "Log in to FilmLedger",
  "login.tab_email": "Email",
  "login.tab_otp": "Magic link",
  "login.email": "Email",
  "login.password": "Password",
  "login.login": "Log in",
  "login.register": "Create account",
  "login.or_continue_social": "or continue with",

  // ---- Support page ----
  "support.title": "I want to shoot 5294!! 🎞️",
  "support.subtitle":
    "This app is free. If it saved you money, scan any code below — any amount helps.",
  "support.qr_hint": "Scan with WeChat / Alipay to tip",
  "support.wechat_label": "WeChat Pay",
  "support.alipay_label": "Alipay",
  "support.no_refund_line":
    "Voluntary tip/donation. Not a purchase of goods or services — no refunds.",
  "support.no_ads_title": "No ads · No data selling · No paywall.",
  "support.no_ads_desc":
    "FilmLedger runs on support from readers like you. No pressure — the app is fully free regardless.",
  "support.faq_title": "Questions? 🤔",
  "support.faq1_q": "Will not tipping break any feature?",
  "support.faq1_a":
    "Never. Every feature (purchases, developing, load, stats) stays fully open forever. Tipping is 100% optional.",
  "support.faq2_q": "Is scanning the QR code safe?",
  "support.faq2_a":
    "Yes — the QR codes are your personal WeChat / Alipay collection codes. Payments go directly to your account. We never see your payment details.",
  "support.faq3_q": "Can I get a receipt?",
  "support.faq3_a":
    "WeChat Pay and Alipay both keep digital payment records you can export. For a custom invoice, email the support address in the footer.",

  // ---- Legal pages ----
  "legal.last_updated": "Last updated",
  "privacy.title": "Privacy Policy",
  "privacy.intro":
    "Your privacy matters. This policy explains what data FilmLedger stores, how it is used, and how you can delete it.",
  "privacy.h1_what_we_collect": "1. What we collect",
  "privacy.h1_how_we_use": "2. How we use the data",
  "privacy.h1_sharing": "3. Data sharing and third parties",
  "privacy.h1_retention": "4. Retention and your rights",
  "privacy.h1_contact": "5. Contact",

  "terms.title": "Terms of Service",
  "terms.intro":
    "By using FilmLedger (“the service”), you agree to the following terms. Please read them carefully.",
  "terms.h1_acceptance": "1. Acceptance of terms",
  "terms.h1_account": "2. Your account",
  "terms.h1_user_content": "3. User content",
  "terms.h1_service_changes": "4. Changes to the service",
  "terms.h1_disclaimer": "5. Disclaimer of warranties",
  "terms.h1_liability": "6. Limitation of liability",
  "terms.h1_applicable_law": "7. Applicable law",
  "terms.h1_contact": "8. Contact",

  "cookies.title": "Cookie Policy",
  "cookies.intro":
    "We use a very minimal set of cookies — only for authentication and your preferences. No ad tracking, ever.",
  "cookies.h1_table_title": "Cookies we use",
  "cookies.h1_third_party": "Third-party cookies",
  "cookies.h1_manage": "Managing cookies",
  "cookies.h1_contact": "Contact",
  "cookies.col_name": "Name / Type",
  "cookies.col_expiry": "Expires",
  "cookies.col_necessary": "Required",
  "cookies.col_purpose": "Purpose",
  "cookies.yes": "Yes",
  "cookies.no": "No",
  "cookies.session": "Session",
  "cookies.one_year": "1 year",

  // ---- Developing form (extra) ----
  "dev.linked_purchase_label": "Linked purchase (optional)",
  "dev.no_link_manual": "— No link, fill manually —",
  "dev.linked_hint": "Auto-fills brand/model and reduces stock estimate on dashboard",
  "dev.brand": "Brand",
  "dev.name": "Film name",
  "dev.brand_placeholder": "e.g. Kodak",
  "dev.name_placeholder": "e.g. Portra 400",
  "dev.develop_cost_short": "Develop",
  "dev.scan_cost_short": "Scan",
  "dev.shipping_cost_short": "Ship",
  "dev.notes_placeholder_extra": "e.g. 120 surcharge, push 1 stop",
  "dev.add_submit": "Add developing record",

  // ---- Camera form ----
  "load.camera_brand_placeholder": "e.g. Leica",
  "load.camera_model_placeholder": "e.g. M6",
  "load.camera_nickname_placeholder": "e.g. daily carry",
  "load.format_135_opt": "135 (35mm)",
  "load.format_120_opt": "120 (Medium format)",
  "load.format_sheet_opt": "Large format sheet",
  "load.camera_notes_placeholder": "e.g. meter off, overexpose +1 stop",
  "load.camera_add_submit": "Add camera",

  // ---- Load / Unload form ----
  "load.no_purchases": "No purchases available. Go to",
  "load.no_purchases_link": "Purchases",
  "load.no_purchases_after": "to add film",
  "load.select_purchase_label": "Select film (linked to purchase)",
  "load.select_purchase_opt": "— Pick a roll —",
  "load.load_date": "Load date",
  "load.load_submit": "Load",
  "load.load_pending": "Loading…",
  "load.unload_submit": "Unload",
  "load.unload_pending": "Unloading…",
  "load.frames_shot_label": "Frames shot",

  // ---- Settings switcher ----
  "settings.language": "Language",
  "settings.currency": "Currency",
  "settings.currency_hint":
    "Display only — no FX conversion. Record everything in the same currency for consistency.",

  // ---- Legal - generic back link ----
  "legal.back_home": "← Back to home",
  "legal.contact_email": "Support email",

  // ---- Footer - extra ----
  "footer.refund": "Refund policy",
  "footer.mor_line":
    "Tips accepted via WeChat Pay / Alipay QR on the Support page. Payments go directly to the creator.",

  // ---- Refund Policy page ----
  "refund.title": "Refund Policy",
  "refund.intro":
    "This refund policy applies to all voluntary tips/donations made via the Support page on FilmLedger.",
  "refund.h1_nature": "1. Nature of the payment",
  "refund.p1_nature":
    "All payments you make by scanning the QR codes on the Support page are voluntary tips/donations to the developer. They are not purchases of a product, subscription, unlock code, premium tier, or any digital good. FilmLedger is and will remain fully free regardless of whether you tip.",
  "refund.h1_no_refund": "2. All tips are non-refundable",
  "refund.p2_no_refund":
    "Because payments are voluntary donations, we do not offer refunds, exchanges, or cancellations once the payment has been processed. This policy applies regardless of how the tip was used, or whether you continue to use FilmLedger.",
  "refund.h1_contact": "3. How to contact us",
  "refund.p4_contact":
    "If you have questions about a tip you already made, or need help locating your payment record, email us at",
  "refund.p4_contact_2":
    "WeChat Pay and Alipay both keep digital payment records you can look up in their apps. For any payment-specific issue, contact us directly via the support email in the footer.",

  // ---- Cookies - extra rows ----
  "cookies.row_auth_name": "sb-access-token / sb-refresh-token (Supabase Auth)",
  "cookies.row_auth_duration": "Session / 1h + 7 days",
  "cookies.row_auth_necessary": "Required",
  "cookies.row_auth_desc": "Auth tokens. Without them you'd be asked to log in on every new page.",
  "cookies.row_theme_name": "theme (dark / light preference)",
  "cookies.row_theme_duration": "Persistent (localStorage)",
  "cookies.row_theme_necessary": "Required",
  "cookies.row_theme_desc": "Remembers your dark / light mode choice for next visit.",
  "cookies.row_next_name": "next session id (Next.js internal)",
  "cookies.row_next_duration": "Session",
  "cookies.row_next_necessary": "Required",
  "cookies.row_next_desc": "Next.js framework state across page transitions. No personal info.",
};

// ------------------------------------------------------------------
// Simplified Chinese 简体中文
// ------------------------------------------------------------------
const zh = {
  "nav.home": "首页",
  "nav.dashboard": "仪表板",
  "nav.purchases": "采购记录",
  "nav.developing": "冲洗记录",
  "nav.load": "装卷管理",
  "nav.stats": "支出统计",
  "nav.support": "支持作者 ☕",
  "nav.login": "登录",
  "nav.logout": "退出登录",

  "footer.tagline": "Made with 🎞️ · 给还在按快门的你",
  "footer.privacy": "隐私政策",
  "footer.terms": "服务条款",
  "footer.cookies": "Cookie 政策",
  "footer.support_author": "支持作者",

  "home.tagline_barrel": "◉ KODAK · PORTRA 400 · ISO 400 · 135-36",
  "home.h1_line1": "胶卷越来越贵",
  "home.h1_line2": "看清你的每一分钱",
  "home.hero_desc":
    "Portra 400 从几十块涨到一百多一卷。记录每一次采购和冲洗，看清真实成本，知道何时囤货、何时止损。",
  "home.cta_start": "开始追踪",
  "home.cta_dashboard": "打开仪表板",
  "home.meta_dx": "DX: 124-1244",
  "home.meta_lat": "LAT: 400",
  "home.meta_proc": "PROC: C-41",

  "home.feature1_tag": "第 07 帧",
  "home.feature1_title": "采购记录",
  "home.feature1_desc": "记录每卷胶卷：价格、渠道、数量。",
  "home.feature2_tag": "第 18 帧",
  "home.feature2_title": "冲洗支出",
  "home.feature2_desc": "追踪冲洗、扫描、邮寄每一笔花费。",
  "home.feature3_tag": "第 24 帧",
  "home.feature3_title": "价格趋势",
  "home.feature3_desc": "看你常买的胶卷价格怎么涨。",

  "common.supabase_not_configured_title": "Supabase 未配置",
  "common.supabase_not_configured_hint":
    "在 .env.local 里设置 NEXT_PUBLIC_SUPABASE_URL 与 NEXT_PUBLIC_SUPABASE_ANON_KEY，然后重启开发服务器。",
  "common.please_login": "请先登录",
  "common.please_login_continue": "登录后查看",
  "common.log_in": "登录",
  "common.go_to": "前往",
  "common.view_all": "查看全部 →",
  "common.add_first": "添加第一条 →",
  "common.pending_dots": "保存中…",
  "common.delete": "删除",

  "dashboard.title": "仪表板",
  "dashboard.subtitle": "你的胶卷支出总览",
  "dashboard.recent_purchases": "近期采购",
  "dashboard.no_purchases_yet": "还没有采购记录",

  "stat.year_film_cost": "{year} 年胶卷支出",
  "stat.year_purchased_rolls": "{year} 年采购卷数",
  "stat.year_dev_cost": "{year} 年冲洗支出",
  "stat.stock_value": "库存估值",
  "stat.stock_hint": "{count} 卷未冲洗",

  "table.film": "胶卷",
  "table.date": "日期",
  "table.quantity": "数量",
  "table.unit_price": "单价",
  "table.total_price": "总价",
  "table.vendor": "渠道",
  "table.actions": "",
  "table.lab": "冲洗店",
  "table.develop": "冲洗",
  "table.scan": "扫描",
  "table.shipping": "邮费",
  "table.notes": "备注",
  "table.total_with_scan": "总支出（含扫描+邮费）",
  "table.scan_portion": "其中扫描 {amount}",
  "table.purchase_count": "采购次数",
  "table.total_rolls": "总卷数",
  "table.total_spent": "总支出",
  "table.dev_count": "冲洗次数",
  "table.dev_subtotal": "冲洗小计",
  "table.total_cost_including": "总支出（含扫描+邮费）",

  "purchases.title": "采购记录",
  "purchases.empty": "还没有采购记录",
  "purchases.empty_hint": "添加你的第一卷胶卷开始追踪",
  "purchases.add": "添加采购",
  "purchases.brand": "品牌",
  "purchases.name": "胶卷名称",
  "purchases.iso": "感光度 ISO",
  "purchases.format": "规格",
  "purchases.purchase_date": "采购日期",
  "purchases.unit_price": "单价",
  "purchases.quantity": "数量",
  "purchases.total_price": "总价",
  "purchases.vendor": "渠道 / 店铺",
  "purchases.vendor_placeholder": "淘宝 / 实体店 / 海淘…",
  "purchases.notes": "备注（可选）",
  "purchases.notes_placeholder": "批号 / 有效期 / 批次号",
  "purchases.mode_preset": "选择胶卷",
  "purchases.mode_custom": "自定义胶卷",

  "dev.title": "冲洗记录",
  "dev.empty": "还没有冲洗记录",
  "dev.empty_hint": "送洗一卷后在这里记录成本",
  "dev.add": "添加记录",
  "dev.develop_date": "冲扫日期",
  "dev.lab": "冲洗店",
  "dev.lab_placeholder": "例：熊猫冲洗、映啡舍",
  "dev.develop_cost": "冲洗费",
  "dev.scan_cost": "扫描费",
  "dev.shipping_cost": "邮费",
  "dev.total_cost": "合计",
  "dev.linked_purchase": "关联采购记录",
  "dev.linked": "已关联采购",
  "dev.notes": "备注（可选）",
  "dev.notes_placeholder": "迫冲 / ECN-2 / 135 等信息",

  "load.title": "装卷",
  "load.subtitle": "管理每台相机里装的是哪一卷",
  "load.empty": "还没有相机",
  "load.empty_hint": "添加你的第一台胶卷相机开始装卷",
  "load.camera_add": "添加相机",
  "load.camera_brand": "品牌",
  "load.camera_model": "型号",
  "load.camera_nickname": "昵称（可选）",
  "load.camera_format": "画幅",
  "load.camera_notes": "备注（可选）",
  "load.format_135": "35mm 135",
  "load.format_120": "120 中画幅",
  "load.format_large": "大画幅",
  "load.x_of_y_loaded": "{loaded}/{total} 台已装卷",

  "load.current_loaded_iso": "ISO {iso}",
  "load.loaded_at": "装卷日期 {date} · 已拍 {frames} 张",
  "load.unload": "卸卷",
  "load.unload_confirm": "标记为已卸卷",
  "load.load_purchase": "装一卷采购的胶卷",
  "load.select_purchase": "选择一条采购记录…",
  "load.load": "装卷",
  "load.frames_shot": "已拍张数",
  "load.remove_camera": "删除相机",

  "stats.title": "支出统计",
  "stats.subtitle": "按年份汇总、按品牌维度拆分支出",
  "stats.yearly_chart": "年度支出趋势",
  "stats.yearly_chart_hint": "每年胶卷采购总支出",
  "stats.brand_chart": "品牌支出占比",
  "stats.brand_chart_hint": "按品牌汇总的累计支出",
  "stats.summary_total_spent": "胶卷总支出",
  "stats.summary_dev_cost": "冲洗支出",
  "stats.summary_total_cost": "总支出合计",
  "stats.summary_total_rolls": "总卷数",
  "stats.summary_avg_price": "平均每卷",
  "stats.summary_avg_label": "平均值",
  "stats.brand_table_title": "品牌明细",
  "stats.brand_table_brand": "品牌",
  "stats.brand_table_rolls": "卷数",
  "stats.brand_table_total": "合计",

  "login.title": "欢迎回来",
  "login.subtitle": "登录 FilmLedger",
  "login.tab_email": "邮箱密码",
  "login.tab_otp": "邮箱验证码",
  "login.email": "邮箱",
  "login.password": "密码",
  "login.login": "登录",
  "login.register": "创建账户",
  "login.or_continue_social": "或通过以下方式继续",

  "support.title": "我想拍 5294！！ 🎞️",
  "support.subtitle":
    "这个 App 完全免费。如果它帮你算清了账，扫下方任意二维码就行——多少都好。",
  "support.qr_hint": "用微信 / 支付宝扫码打赏",
  "support.wechat_label": "微信支付",
  "support.alipay_label": "支付宝",
  "support.no_refund_line":
    "本按钮的性质为自愿打赏 / 赠与，不是商品或服务交易，不支持退款。",
  "support.no_ads_title": "不做广告 · 不卖数据 · 不搞付费墙",
  "support.no_ads_desc":
    "FilmLedger 只靠打赏维持。不管你打不打赏，所有功能都能用 —— 没压力。",
  "support.faq_title": "常见问题 🤔",
  "support.faq1_q": "不打赏会影响功能吗？",
  "support.faq1_a":
    "完全不会。采购、冲洗、装卷、统计，所有功能永久开放。打赏 100% 自愿。",
  "support.faq2_q": "扫码打赏安全吗？",
  "support.faq2_a":
    "安全。二维码就是你的个人微信/支付宝收款码，款项直接进你的账户，我们看不到你的支付信息。",
  "support.faq3_q": "付款后可以拿到凭证/收据吗？",
  "support.faq3_a":
    "微信和支付宝都会保留电子支付记录，可自行导出。如需发票，请通过页脚的支持邮箱联系。",

  "legal.last_updated": "最后更新：",
  "privacy.title": "隐私政策",
  "privacy.intro":
    "你的隐私很重要。本文说明 FilmLedger 收集哪些数据、如何使用、以及你如何删除。",
  "privacy.h1_what_we_collect": "一、我们收集什么",
  "privacy.h1_how_we_use": "二、我们如何使用",
  "privacy.h1_sharing": "三、数据共享与第三方",
  "privacy.h1_retention": "四、数据留存与你的权利",
  "privacy.h1_contact": "五、联系方式",

  "terms.title": "服务条款",
  "terms.intro":
    "使用 FilmLedger（以下简称「本服务」）即表示你同意以下条款，请仔细阅读。",
  "terms.h1_acceptance": "一、条款的接受",
  "terms.h1_account": "二、你的账户",
  "terms.h1_user_content": "三、你上传的内容",
  "terms.h1_service_changes": "四、服务的变更",
  "terms.h1_disclaimer": "五、免责声明",
  "terms.h1_liability": "六、责任限制",
  "terms.h1_applicable_law": "七、适用法律",
  "terms.h1_contact": "八、联系方式",

  "cookies.title": "Cookie 政策",
  "cookies.intro":
    "我们只使用最少量的 Cookie：仅用于登录和记住你的偏好，从不做广告追踪。",
  "cookies.h1_table_title": "我们使用的 Cookie",
  "cookies.h1_third_party": "第三方 Cookie",
  "cookies.h1_manage": "如何管理 Cookie",
  "cookies.h1_contact": "联系我们",
  "cookies.col_name": "名称 / 类型",
  "cookies.col_expiry": "有效期",
  "cookies.col_necessary": "是否必要",
  "cookies.col_purpose": "用途说明",
  "cookies.yes": "是",
  "cookies.no": "否",
  "cookies.session": "会话期",
  "cookies.one_year": "一年",

  "settings.language": "语言",
  "settings.currency": "货币",
  "settings.currency_hint": "仅切换显示符号，不做汇率换算 —— 请保持整本站记账币种一致。",

  // ---- Developing form (extra) ----
  "dev.linked_purchase_label": "关联采购（可选）",
  "dev.no_link_manual": "— 不关联，手动填写 —",
  "dev.linked_hint": "选择后自动带出品牌/型号，并扣减仪表板的库存估算",
  "dev.brand": "品牌",
  "dev.name": "型号",
  "dev.brand_placeholder": "如 柯达",
  "dev.name_placeholder": "如 炮塔 400",
  "dev.develop_cost_short": "冲洗费",
  "dev.scan_cost_short": "扫描费",
  "dev.shipping_cost_short": "邮费",
  "dev.notes_placeholder_extra": "如 120 中画幅加价、推冲一档等",
  "dev.add_submit": "添加冲洗记录",

  // ---- Camera form ----
  "load.camera_brand_placeholder": "如 徕卡",
  "load.camera_model_placeholder": "如 M6",
  "load.camera_nickname_placeholder": "如 主力机",
  "load.format_135_opt": "135（35mm）",
  "load.format_120_opt": "120（中画幅）",
  "load.format_sheet_opt": "大画幅页片",
  "load.camera_notes_placeholder": "如 测光异常、过曝一档补偿等",
  "load.camera_add_submit": "添加相机",

  // ---- Load / Unload form ----
  "load.no_purchases": "无可用采购记录，请先去",
  "load.no_purchases_link": "采购页",
  "load.no_purchases_after": "添加胶卷",
  "load.select_purchase_label": "选择胶卷（关联采购）",
  "load.select_purchase_opt": "— 选择一卷 —",
  "load.load_date": "装卷日期",
  "load.load_submit": "装卷",
  "load.load_pending": "装卷中…",
  "load.unload_submit": "卸卷",
  "load.unload_pending": "卸卷中…",
  "load.frames_shot_label": "已拍帧数",

  // ---- Legal - generic back link ----
  "legal.back_home": "← 返回首页",
  "legal.contact_email": "客服邮箱",

  // ---- Footer - extra ----
  "footer.refund": "退款政策",
  "footer.mor_line":
    "「支持一下」页面提供微信 / 支付宝收款二维码，款项直接到作者账户，无中间方。",

  // ---- Refund Policy page ----
  "refund.title": "退款政策",
  "refund.intro":
    "本退款政策适用于你通过「支持一下」页面向 FilmLedger 支付的所有自愿打赏 / 赠与款项。",
  "refund.h1_nature": "一、款项性质",
  "refund.p1_nature":
    "你通过「支持一下」页面扫码完成的支付，全部属于对开发者的自愿打赏 / 赠与行为，而非购买产品、订阅、解锁码、付费会员或任何数字商品。无论是否打赏，FilmLedger 所有核心功能对所有用户永久免费、完整开放。",
  "refund.h1_no_refund": "二、打赏不退款原则",
  "refund.p2_no_refund":
    "鉴于款项性质为赠与，支付一旦实际处理完成，我们不提供退款、兑换或取消，也不以任何形式退货或折抵其他权益，无论你之后是否继续使用本工具。",
  "refund.h1_contact": "三、如何联系",
  "refund.p4_contact":
    "若你已经完成打赏，希望核对是否成功，或对本政策有任何疑问，请通过下方邮箱与我们取得联系：",
  "refund.p4_contact_2":
    "微信和支付宝都会在 App 内保留电子支付记录，可自行查询。任何支付相关的疑问请直接通过页脚的支持邮箱联系我们。",

  // ---- Cookies - extra rows ----
  "cookies.row_auth_name": "sb-access-token / sb-refresh-token（Supabase Auth）",
  "cookies.row_auth_duration": "会话 / 1 小时 + 7 天",
  "cookies.row_auth_necessary": "✅ 必要",
  "cookies.row_auth_desc": "登录鉴权凭据。没有它你每打开一个新页面就会被要求重新登录。",
  "cookies.row_theme_name": "theme（暗色/亮色主题偏好）",
  "cookies.row_theme_duration": "永久（本地存储）",
  "cookies.row_theme_necessary": "✅ 必要",
  "cookies.row_theme_desc": "记住你选择的「深色模式 / 浅色模式」偏好，下次打开自动沿用。",
  "cookies.row_next_name": "next 会话 ID（Next.js 内部）",
  "cookies.row_next_duration": "会话级",
  "cookies.row_next_necessary": "✅ 必要",
  "cookies.row_next_desc": "Next.js 框架用于维护页面切换时的表单状态，不包含个人信息。",
} as const;

export const messages: Record<Locale, Record<string, string>> = { en, zh };

// ---- t() fallback chain: zh key → en key → the raw key itself ----
export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  const dict = messages[locale] ?? messages.en;
  const enDict = messages.en;
  let raw = dict[key] ?? enDict[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      raw = raw.replaceAll(`{${k}}`, String(v));
    }
  }
  return raw;
}

// ---- formatMoney：统一全站价格显示（只改符号/格式，不做 FX 换算） ----
// 经验 #869304：前端展示永远走单一入口 formatMoney，页面禁止自己拼 ¥ / $ 符号
export function formatMoney(
  amount: number | string,
  currency: Currency,
  locale: Locale,
  fractionDigits?: number
): string {
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return String(amount);
  const maxFrac = typeof fractionDigits === "number" ? fractionDigits : 2;
  const minFrac = typeof fractionDigits === "number" ? Math.min(fractionDigits, 2) : 2;
  try {
    return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: maxFrac,
      minimumFractionDigits: minFrac,
    }).format(n);
  } catch {
    const sym = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "";
    return `${sym}${n.toFixed(maxFrac)}`;
  }
}
