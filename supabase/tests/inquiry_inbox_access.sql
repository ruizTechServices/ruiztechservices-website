-- Uses uniquely identified synthetic users and contacts in a rolled-back transaction.
-- Safe to replay after real inquiries or other admin memberships have been added:
-- every contact mutation targets only this transaction's synthetic contact.
begin;
create temporary table inbox_verification_results (check_name text, passed boolean) on commit drop;
grant insert on inbox_verification_results to anon, authenticated;
create temporary table inbox_verification_context (
  owner_id uuid not null default gen_random_uuid(),
  nonowner_id uuid not null default gen_random_uuid(),
  contact_name text not null default 'Jarvis rollback test',
  contact_email text not null default
    ('jarvis-verification-' || gen_random_uuid()::text || '@example.invalid'),
  contact_id integer
) on commit drop;
insert into inbox_verification_context default values;
grant select on inbox_verification_context to anon, authenticated;
insert into auth.users (id, aud, role, email, email_confirmed_at)
select owner_id, 'authenticated', 'authenticated',
       'jarvis-owner-' || owner_id::text || '@example.invalid', now()
from inbox_verification_context
union all
select nonowner_id, 'authenticated', 'authenticated',
       'jarvis-nonowner-' || nonowner_id::text || '@example.invalid', now()
from inbox_verification_context;
insert into public.admins (user_id)
select owner_id from inbox_verification_context;
set local role anon;
insert into public.contact_submissions (name,email,message,status)
select contact_name, contact_email,
       'Synthetic inquiry for database policy verification only.', 'new'
from inbox_verification_context;
reset role;
update inbox_verification_context as context
set contact_id = (
  select id from public.contact_submissions as contact
  where contact.name = context.contact_name
    and contact.email = context.contact_email
);
insert into inbox_verification_results values
('anonymous_insert_succeeds', (
  select count(*)=1 from public.contact_submissions
  where id = (select contact_id from inbox_verification_context)
)),
('anonymous_cannot_read_inbox', not has_table_privilege('anon','public.contact_submissions','SELECT')),
('anonymous_cannot_update_inbox', not has_column_privilege('anon','public.contact_submissions','status','UPDATE')),
('anonymous_cannot_delete_inbox', not has_table_privilege('anon','public.contact_submissions','DELETE')),
('no_client_can_assign_admin', not has_table_privilege('authenticated','public.admins','INSERT')),
('clients_cannot_set_id', not has_column_privilege('anon','public.contact_submissions','id','INSERT')),
('clients_cannot_set_timestamp', not has_column_privilege('anon','public.contact_submissions','created_at','INSERT')),
('authenticated_cannot_edit_message', not has_column_privilege('authenticated','public.contact_submissions','message','UPDATE'));
set local role authenticated;
select set_config('request.jwt.claims', jsonb_build_object(
  'sub', (select nonowner_id from inbox_verification_context),
  'role', 'authenticated'
)::text, true);
insert into inbox_verification_results values
('nonowner_reads_no_contacts',(select count(*)=0 from public.contact_submissions)),
('nonowner_reads_no_admin_membership',(select count(*)=0 from public.admins));
with changed as (
  update public.contact_submissions set status='replied'
  where id = (select contact_id from inbox_verification_context)
    and email = (select contact_email from inbox_verification_context)
    and name = (select contact_name from inbox_verification_context)
  returning id
)
insert into inbox_verification_results select 'nonowner_updates_no_contacts',count(*)=0 from changed;
with removed as (
  delete from public.contact_submissions
  where id = (select contact_id from inbox_verification_context)
    and email = (select contact_email from inbox_verification_context)
    and name = (select contact_name from inbox_verification_context)
  returning id
)
insert into inbox_verification_results select 'nonowner_deletes_no_contacts',count(*)=0 from removed;
select set_config('request.jwt.claims', jsonb_build_object(
  'sub', (select owner_id from inbox_verification_context),
  'role', 'authenticated'
)::text, true);
insert into inbox_verification_results values
('owner_reads_contacts', (
  select count(*)=1 from public.contact_submissions
  where id = (select contact_id from inbox_verification_context)
)),
('owner_reads_own_membership',(select count(*)=1 from public.admins));
with changed as (
  update public.contact_submissions set status='read'
  where id = (select contact_id from inbox_verification_context)
    and email = (select contact_email from inbox_verification_context)
    and name = (select contact_name from inbox_verification_context)
  returning id
)
insert into inbox_verification_results select 'owner_updates_status',count(*)=1 from changed;
with removed as (
  delete from public.contact_submissions
  where id = (select contact_id from inbox_verification_context)
    and email = (select contact_email from inbox_verification_context)
    and name = (select contact_name from inbox_verification_context)
  returning id
)
insert into inbox_verification_results select 'owner_can_remove_synthetic_contact',count(*)=1 from removed;
reset role;
do $$ begin
  if exists (select 1 from inbox_verification_results where not passed) then
    raise exception 'Inquiry access verification failed';
  end if;
end $$;
select check_name,passed from inbox_verification_results order by check_name;
rollback;

