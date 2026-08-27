-- ============================================================
-- 002: 胶卷相机表 + 装卷功能
-- 一台胶卷相机一次只装一卷，装卷状态由 cameras 表的冗余字段承载
-- ============================================================

-- cameras 表
create table if not exists public.cameras (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  brand text not null,                          -- Leica / Nikon / Pentax / 等
  model text not null,                          -- M6 / FM2 / K1000 / 等
  format text not null check (format in ('135', '120', 'sheet')),
  nickname text,                                -- 自定义昵称（区分同型号多台）
  current_purchase_id uuid references public.purchases on delete set null,
  -- 装卷后的冗余字段：即使采购被删也能保留当前装载信息
  loaded_brand text,
  loaded_name text,
  loaded_iso int,
  loaded_at date,                               -- 装卷日期
  frames_shot int not null default 0 check (frames_shot >= 0),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_cameras_user on public.cameras(user_id);

-- Row Level Security
alter table public.cameras enable row level security;

drop policy if exists "用户可读自己的相机" on public.cameras;
create policy "用户可读自己的相机" on public.cameras
  for select using (user_id = auth.uid());

drop policy if exists "用户可插入自己的相机" on public.cameras;
create policy "用户可插入自己的相机" on public.cameras
  for insert with check (user_id = auth.uid());

drop policy if exists "用户可更新自己的相机" on public.cameras;
create policy "用户可更新自己的相机" on public.cameras
  for update using (user_id = auth.uid());

drop policy if exists "用户可删除自己的相机" on public.cameras;
create policy "用户可删除自己的相机" on public.cameras
  for delete using (user_id = auth.uid());
