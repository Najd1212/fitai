-- FitAI schema (covers all stages so later stages need no schema rewrites)
create extension if not exists "pgcrypto";

create type garment_category as enum
 ('shirt','tshirt','sweater','jacket','trousers','jeans','shorts','skirt','dress','shoes','accessory','other');
create type photo_angle as enum ('front','back','left','right','detail');

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  gender text,
  sizes jsonb not null default '{}',            -- {"top":"M","bottom":"32","shoes":"42"}
  favorite_colors text[] not null default '{}',
  style_preferences text[] not null default '{}',
  avatar_config jsonb not null default '{}',    -- Stage 4
  created_at timestamptz not null default now()
);

create table clothing_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles on delete cascade,
  name text not null,
  category garment_category not null,
  primary_color text, secondary_color text,
  pattern text, material text, style text, fit text,
  seasons text[] not null default '{}',
  is_clean boolean not null default true,
  ai_analysis jsonb,                            -- raw Claude vision output
  model_3d_url text,                            -- reserved for 3D reconstruction
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on clothing_items (user_id, category);
create index on clothing_items (user_id, is_clean);

create table clothing_photos (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references clothing_items on delete cascade,
  user_id uuid not null references profiles on delete cascade,
  angle photo_angle not null,
  original_path text not null,
  processed_path text,                          -- background-removed version
  created_at timestamptz not null default now(),
  unique (item_id, angle)
);

create table outfits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles on delete cascade,
  name text not null,
  occasion text,
  tags text[] not null default '{}',
  source text not null default 'manual',       -- manual | ai | photo
  photo_path text,
  explanation text,
  worn_on date,
  created_at timestamptz not null default now()
);

create table outfit_items (
  outfit_id uuid not null references outfits on delete cascade,
  item_id uuid references clothing_items on delete set null,
  detected_label text,                          -- unmatched piece from photo analysis
  confidence real,
  primary key (outfit_id, item_id)
);

-- Row Level Security: users only touch their own rows
alter table profiles enable row level security;
alter table clothing_items enable row level security;
alter table clothing_photos enable row level security;
alter table outfits enable row level security;
alter table outfit_items enable row level security;

create policy own_profile on profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy own_items on clothing_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_photos on clothing_photos for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_outfits on outfits for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_outfit_items on outfit_items for all
  using (exists (select 1 from outfits o where o.id = outfit_id and o.user_id = auth.uid()))
  with check (exists (select 1 from outfits o where o.id = outfit_id and o.user_id = auth.uid()));

-- Auto-create profile on signup
create function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, display_name) values (new.id, split_part(new.email,'@',1));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- Private storage buckets; files live under <user_id>/...
insert into storage.buckets (id, name, public) values
  ('clothing-original','clothing-original',false),
  ('clothing-processed','clothing-processed',false),
  ('outfit-photos','outfit-photos',false)
on conflict do nothing;

create policy own_files on storage.objects for all
  using (bucket_id in ('clothing-original','clothing-processed','outfit-photos')
         and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id in ('clothing-original','clothing-processed','outfit-photos')
         and (storage.foldername(name))[1] = auth.uid()::text);
