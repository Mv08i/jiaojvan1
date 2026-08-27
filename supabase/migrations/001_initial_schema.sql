-- ============================================================
-- FilmLedger 初始数据库 Schema
-- 胶卷成本追踪器：胶卷型号库 + 采购记录 + 冲洗支出 + 价格追踪
-- ============================================================

-- 1. profiles 表（扩展 auth.users）
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  preferred_currency text not null default 'USD',
  created_at timestamptz not null default now()
);

-- 2. film_stocks 表（胶卷型号库：预设共享 + 用户自定义）
create table if not exists public.film_stocks (
  id uuid primary key default gen_random_uuid(),
  brand text not null,                    -- Kodak / Fuji / Ilford / Lomography / 等
  name text not null,                     -- Portra 400 / HP5+ / Gold 200 / 等
  iso int not null,
  process text not null check (process in ('C-41', 'E-6', 'B&W')),
  format text not null check (format in ('135', '120', 'sheet')),
  is_preset boolean not null default false,   -- true = 共享预设，false = 用户自定义
  owner_id uuid references auth.users on delete set null,  -- null 表示共享预设
  created_at timestamptz not null default now(),
  unique (brand, name, iso, format)
);

-- 3. purchases 表（采购记录）
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  stock_id uuid references public.film_stocks on delete set null,
  -- 冗余字段：即使 stock 被删也能保留采购历史
  brand text not null,
  name text not null,
  iso int not null,
  quantity int not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  total_price numeric(10, 2) not null check (total_price >= 0),
  purchase_date date not null default current_date,
  vendor text,                            -- B&H / Adorama / 本地店 / etc
  notes text,
  created_at timestamptz not null default now()
);

-- 4. developing_records 表（冲洗记录）
create table if not exists public.developing_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  purchase_id uuid references public.purchases on delete set null,  -- 关联具体采购
  stock_id uuid references public.film_stocks on delete set null,
  -- 冗余字段
  brand text not null,
  name text not null,
  develop_cost numeric(10, 2) not null default 0 check (develop_cost >= 0),
  scan_cost numeric(10, 2) not null default 0 check (scan_cost >= 0),
  shipping_cost numeric(10, 2) not null default 0 check (shipping_cost >= 0),
  total_cost numeric(10, 2) generated always as (develop_cost + scan_cost + shipping_cost) stored,
  develop_date date not null default current_date,
  lab text,                              -- The Darkroom / Indie Film Lab / etc
  notes text,
  created_at timestamptz not null default now()
);

-- 5. price_tracking 表（价格追踪：社区共享 + 用户上传）
create table if not exists public.price_tracking (
  id uuid primary key default gen_random_uuid(),
  stock_id uuid not null references public.film_stocks on delete cascade,
  price numeric(10, 2) not null check (price >= 0),
  currency text not null default 'USD',
  vendor text,
  recorded_date date not null default current_date,
  source text not null default 'user' check (source in ('user', 'retailer', 'community')),
  user_id uuid references auth.users on delete set null,
  created_at timestamptz not null default now()
);

-- 6. price_alerts 表（涨价提醒）
create table if not exists public.price_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  stock_id uuid not null references public.film_stocks on delete cascade,
  target_price numeric(10, 2) not null check (target_price >= 0),
  direction text not null default 'below' check (direction in ('below', 'above')),
  -- below = 跌破目标价提醒囤货，above = 涨破目标价提醒止损
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, stock_id)
);

-- ============================================================
-- Row Level Security 策略
-- ============================================================

alter table public.profiles enable row level security;
alter table public.film_stocks enable row level security;
alter table public.purchases enable row level security;
alter table public.developing_records enable row level security;
alter table public.price_tracking enable row level security;
alter table public.price_alerts enable row level security;

-- profiles：用户只能读写自己的 profile
create policy "用户读取自己的 profile" on public.profiles
  for select using (auth.uid() = id);
create policy "用户更新自己的 profile" on public.profiles
  for update using (auth.uid() = id);
create policy "用户插入自己的 profile" on public.profiles
  for insert with check (auth.uid() = id);

-- film_stocks：预设共享 + 用户可读所有，用户只能管理自己自定义的
create policy "所有人可读胶卷型号库" on public.film_stocks
  for select using (is_preset = true or owner_id = auth.uid());
create policy "用户可插入自定义胶卷型号" on public.film_stocks
  for insert with check (owner_id = auth.uid());
create policy "用户可更新自己的自定义胶卷型号" on public.film_stocks
  for update using (owner_id = auth.uid());
create policy "用户可删除自己的自定义胶卷型号" on public.film_stocks
  for delete using (owner_id = auth.uid());

-- purchases：用户只能 CRUD 自己的采购记录
create policy "用户可读自己的采购记录" on public.purchases
  for select using (user_id = auth.uid());
create policy "用户可插入自己的采购记录" on public.purchases
  for insert with check (user_id = auth.uid());
create policy "用户可更新自己的采购记录" on public.purchases
  for update using (user_id = auth.uid());
create policy "用户可删除自己的采购记录" on public.purchases
  for delete using (user_id = auth.uid());

-- developing_records：同上
create policy "用户可读自己的冲洗记录" on public.developing_records
  for select using (user_id = auth.uid());
create policy "用户可插入自己的冲洗记录" on public.developing_records
  for insert with check (user_id = auth.uid());
create policy "用户可更新自己的冲洗记录" on public.developing_records
  for update using (user_id = auth.uid());
create policy "用户可删除自己的冲洗记录" on public.developing_records
  for delete using (user_id = auth.uid());

-- price_tracking：所有人可读（共享数据），用户只能管理自己上传的
create policy "所有人可读价格追踪数据" on public.price_tracking
  for select using (true);
create policy "用户可插入价格追踪数据" on public.price_tracking
  for insert with check (user_id = auth.uid() or user_id is null);
create policy "用户可更新自己上传的价格数据" on public.price_tracking
  for update using (user_id = auth.uid());
create policy "用户可删除自己上传的价格数据" on public.price_tracking
  for delete using (user_id = auth.uid());

-- price_alerts：用户只能 CRUD 自己的提醒
create policy "用户可读自己的提醒" on public.price_alerts
  for select using (user_id = auth.uid());
create policy "用户可插入自己的提醒" on public.price_alerts
  for insert with check (user_id = auth.uid());
create policy "用户可更新自己的提醒" on public.price_alerts
  for update using (user_id = auth.uid());
create policy "用户可删除自己的提醒" on public.price_alerts
  for delete using (user_id = auth.uid());

-- ============================================================
-- 触发器：新用户注册时自动创建 profile
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 视图：用户年度支出统计（便于仪表板查询）
-- ============================================================

create or replace view public.v_yearly_stats as
select
  p.user_id,
  extract(year from p.purchase_date)::int as year,
  coalesce(sum(p.total_price), 0) as film_cost,
  count(p.id) as purchase_count,
  coalesce(sum(p.quantity), 0) as total_rolls
from public.purchases p
group by p.user_id, extract(year from p.purchase_date);

-- ============================================================
-- 预设胶卷型号库（2026 主流型号，方便用户选择）
-- ============================================================

insert into public.film_stocks (brand, name, iso, process, format, is_preset, owner_id) values
  ('柯达', '炮塔 400', 400, 'C-41', '135', true, null),
  ('柯达', '炮塔 800', 800, 'C-41', '135', true, null),
  ('柯达', '金胶卷 200', 200, 'C-41', '135', true, null),
  ('柯达', '易拍 200', 200, 'C-41', '135', true, null),
  ('柯达', '全能 400', 400, 'C-41', '135', true, null),
  ('柯达', '艾克塔 100', 100, 'C-41', '135', true, null),
  ('柯达', '艾克塔克罗姆 E100', 100, 'E-6', '135', true, null),
  ('柯达', '三X 400', 400, 'B&W', '135', true, null),
  ('柯达', 'T麦克斯 400', 400, 'B&W', '135', true, null),
  ('柯达', 'T麦克斯 100', 100, 'B&W', '135', true, null),
  ('伊尔福', 'HP5+ 400', 400, 'B&W', '135', true, null),
  ('伊尔福', 'FP4+ 125', 125, 'B&W', '135', true, null),
  ('伊尔福', '德尔塔 400', 400, 'B&W', '135', true, null),
  ('伊尔福', '德尔塔 3200', 3200, 'B&W', '135', true, null),
  ('伊尔福', 'XP2+ 400', 400, 'C-41', '135', true, null),
  ('富士', 'C200', 200, 'C-41', '135', true, null),
  ('富士', '秀丽 400', 400, 'C-41', '135', true, null),
  ('富士', '普罗维亚 100F', 100, 'E-6', '135', true, null),
  ('富士', '维尔维亚 50', 50, 'E-6', '135', true, null),
  ('乐魔', '彩色 400', 400, 'C-41', '135', true, null),
  ('电影卷', '800T', 800, 'C-41', '135', true, null),
  ('电影卷', '50D', 50, 'C-41', '135', true, null),
  ('哈曼', '凤凰 II 200', 200, 'C-41', '135', true, null),
  ('肯特米尔', '全景 400', 400, 'B&W', '135', true, null)
on conflict (brand, name, iso, format) do nothing;

-- 120 中画幅常见型号
insert into public.film_stocks (brand, name, iso, process, format, is_preset, owner_id) values
  ('柯达', '炮塔 400', 400, 'C-41', '120', true, null),
  ('柯达', '炮塔 160', 160, 'C-41', '120', true, null),
  ('柯达', '艾克塔 100', 100, 'C-41', '120', true, null),
  ('伊尔福', 'HP5+ 400', 400, 'B&W', '120', true, null),
  ('富士', '普罗维亚 100F', 100, 'E-6', '120', true, null),
  ('富士', '维尔维亚 50', 50, 'E-6', '120', true, null)
on conflict (brand, name, iso, format) do nothing;
