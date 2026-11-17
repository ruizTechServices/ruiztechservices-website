-- Fresh project: inquiry intake and the owner inbox only.
-- Admin membership is provisioned by a trusted operator after verified sign-in.
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.contact_submissions (
  id integer generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  -- The application adds context headers to the 5,000-character request.
  message text not null check (char_length(message) between 20 and 7000),
  status text not null default 'new' check (status in ('new', 'read', 'replied')),
  ip_address text check (char_length(ip_address) <= 45),
  user_agent text check (char_length(user_agent) <= 500)
);

create index contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.admins enable row level security;
alter table public.contact_submissions enable row level security;

revoke all privileges on public.admins, public.contact_submissions
  from public, anon, authenticated;
revoke all privileges on sequence public.contact_submissions_id_seq
  from public, anon, authenticated;

grant usage on schema public to anon, authenticated;
grant select on public.admins to authenticated;
grant insert (name, email, message, status, ip_address, user_agent)
  on public.contact_submissions to anon, authenticated;
grant usage on sequence public.contact_submissions_id_seq to anon, authenticated;
grant select, delete on public.contact_submissions to authenticated;
grant update (status) on public.contact_submissions to authenticated;

create policy admins_read_own_membership on public.admins
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy contacts_submit_new on public.contact_submissions
  for insert to anon, authenticated
  with check (status = 'new');

create policy contacts_admin_read on public.contact_submissions
  for select to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())));

create policy contacts_admin_update on public.contact_submissions
  for update to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins where user_id = (select auth.uid())));

create policy contacts_admin_delete on public.contact_submissions
  for delete to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())));
