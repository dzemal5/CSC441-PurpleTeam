alter table public.songs enable row level security;
revoke all on table public.songs from anon, authenticated;
grant select on table public.songs to anon, authenticated;

create policy "allow public read only"
on public.songs
for select
to anon, authenticated
using (true);   