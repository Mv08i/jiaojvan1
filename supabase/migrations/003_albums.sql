-- ============================================================
-- 003: 相册（扫描集）+ 照片
-- albums: 一次扫描任务（一台相机 + 一卷胶卷 + 一台扫描仪）
-- photos: 扫描任务下的单张照片
-- ============================================================

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  camera_id uuid references public.cameras on delete set null,
  purchase_id uuid references public.purchases on delete set null,
  -- 冗余字段：即使关联记录被删也能保留相册信息
  camera_brand text,
  camera_model text,
  purchase_brand text,
  purchase_name text,
  scanner text not null,
  name text not null default '未命名相册',
  notes text,
  photo_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  url text not null,
  thumbnail_url text,
  caption text,
  frame_number int check (frame_number is null or frame_number > 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_albums_user on public.albums(user_id);
create index if not exists idx_photos_album on public.photos(album_id);
create index if not exists idx_photos_user on public.photos(user_id);

-- Row Level Security
alter table public.albums enable row level security;
alter table public.photos enable row level security;

-- albums: 用户只能 CRUD 自己的相册
drop policy if exists "用户可读自己的相册" on public.albums;
create policy "用户可读自己的相册" on public.albums
  for select using (user_id = auth.uid());

drop policy if exists "用户可插入自己的相册" on public.albums;
create policy "用户可插入自己的相册" on public.albums
  for insert with check (user_id = auth.uid());

drop policy if exists "用户可更新自己的相册" on public.albums;
create policy "用户可更新自己的相册" on public.albums
  for update using (user_id = auth.uid());

drop policy if exists "用户可删除自己的相册" on public.albums;
create policy "用户可删除自己的相册" on public.albums
  for delete using (user_id = auth.uid());

-- photos: 用户只能 CRUD 自己的照片
drop policy if exists "用户可读自己的照片" on public.photos;
create policy "用户可读自己的照片" on public.photos
  for select using (user_id = auth.uid());

drop policy if exists "用户可插入自己的照片" on public.photos;
create policy "用户可插入自己的照片" on public.photos
  for insert with check (user_id = auth.uid());

drop policy if exists "用户可更新自己的照片" on public.photos;
create policy "用户可更新自己的照片" on public.photos
  for update using (user_id = auth.uid());

drop policy if exists "用户可删除自己的照片" on public.photos;
create policy "用户可删除自己的照片" on public.photos
  for delete using (user_id = auth.uid());
