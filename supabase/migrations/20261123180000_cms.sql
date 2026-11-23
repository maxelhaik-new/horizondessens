-- Mini-CMS Horizon des Sens
-- Contenu publié (lisible par tous), brouillons (éditeurs seulement),
-- historique des publications, liste des éditeurs, images (bucket public).
-- Appliquée via le MCP Supabase le 23/11/2026.

-- ---------------------------------------------------------------------------
-- Éditeurs autorisés (Élodie, Maxime). Un compte Auth seul ne suffit pas.
-- ---------------------------------------------------------------------------
create table public.cms_editors (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.cms_editors enable row level security;
create policy "Un éditeur voit sa propre ligne" on public.cms_editors
  for select to authenticated using (user_id = (select auth.uid()));

create function public.is_cms_editor() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.cms_editors where user_id = (select auth.uid())
  );
$$;
revoke execute on function public.is_cms_editor() from public, anon;
grant execute on function public.is_cms_editor() to authenticated;

-- ---------------------------------------------------------------------------
-- Contenu publié : une ligne par clé modifiée (sinon : valeur par défaut du code).
-- Écriture uniquement via cms_publish().
-- ---------------------------------------------------------------------------
create table public.cms_content (
  key text primary key check (key ~ '^[a-z0-9-]+(\.[a-z0-9-]+)+$'),
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);
alter table public.cms_content enable row level security;
create policy "Contenu publié lisible par tous" on public.cms_content
  for select to anon, authenticated using (true);

-- ---------------------------------------------------------------------------
-- Brouillons : enregistrés à chaque modification, publiés d'un coup.
-- value NULL → « rétablir le contenu d'origine » (valeur du code) à la publication.
-- ---------------------------------------------------------------------------
create table public.cms_drafts (
  key text primary key check (key ~ '^[a-z0-9-]+(\.[a-z0-9-]+)+$'),
  value jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid() references auth.users (id) on delete set null
);
alter table public.cms_drafts enable row level security;
create policy "Brouillons réservés aux éditeurs" on public.cms_drafts
  for all to authenticated
  using ((select public.is_cms_editor()))
  with check ((select public.is_cms_editor()));

-- ---------------------------------------------------------------------------
-- Historique : chaque publication garde l'ancienne et la nouvelle valeur.
-- ---------------------------------------------------------------------------
create table public.cms_revisions (
  id bigint generated always as identity primary key,
  key text not null,
  value jsonb,
  previous jsonb,
  published_at timestamptz not null default now(),
  published_by uuid references auth.users (id) on delete set null
);
create index cms_revisions_key_idx on public.cms_revisions (key, published_at desc);
alter table public.cms_revisions enable row level security;
create policy "Historique réservé aux éditeurs" on public.cms_revisions
  for select to authenticated using ((select public.is_cms_editor()));

-- ---------------------------------------------------------------------------
-- Publication atomique des brouillons (tous, ou une liste de clés).
-- ---------------------------------------------------------------------------
create function public.cms_publish(p_keys text[] default null)
returns integer
language plpgsql security definer set search_path = '' as $$
declare
  n integer;
begin
  if not public.is_cms_editor() then
    raise exception 'Accès refusé' using errcode = '42501';
  end if;

  lock table public.cms_drafts in share row exclusive mode;

  insert into public.cms_revisions (key, value, previous, published_by)
  select d.key, d.value, c.value, auth.uid()
  from public.cms_drafts d
  left join public.cms_content c on c.key = d.key
  where p_keys is null or d.key = any (p_keys);

  delete from public.cms_content c
  using public.cms_drafts d
  where c.key = d.key
    and d.value is null
    and (p_keys is null or d.key = any (p_keys));

  insert into public.cms_content (key, value, updated_at, updated_by)
  select d.key, d.value, now(), auth.uid()
  from public.cms_drafts d
  where d.value is not null
    and (p_keys is null or d.key = any (p_keys))
  on conflict (key) do update
    set value = excluded.value,
        updated_at = excluded.updated_at,
        updated_by = excluded.updated_by;

  delete from public.cms_drafts d
  where p_keys is null or d.key = any (p_keys);
  get diagnostics n = row_count;
  return n;
end;
$$;
revoke execute on function public.cms_publish(text[]) from public, anon;
grant execute on function public.cms_publish(text[]) to authenticated;

-- ---------------------------------------------------------------------------
-- Images : bucket public (lecture par URL), écriture réservée aux éditeurs.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media', 'cms-media', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
);

create policy "Éditeurs : ajout d'images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'cms-media' and (select public.is_cms_editor()));
create policy "Éditeurs : lecture des images" on storage.objects
  for select to authenticated
  using (bucket_id = 'cms-media' and (select public.is_cms_editor()));
create policy "Éditeurs : suppression d'images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'cms-media' and (select public.is_cms_editor()));
