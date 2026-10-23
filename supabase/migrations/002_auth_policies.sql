-- =============================================
-- PLANORA RLS POLICIES
-- =============================================


-- =============================================
-- PROFILES
-- =============================================

create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);


-- =============================================
-- TASKS
-- =============================================

create policy "Users can view own tasks"
on public.tasks
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own tasks"
on public.tasks
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own tasks"
on public.tasks
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own tasks"
on public.tasks
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- HABITS
-- =============================================

create policy "Users can view own habits"
on public.habits
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own habits"
on public.habits
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own habits"
on public.habits
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own habits"
on public.habits
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- HABIT LOGS
-- =============================================

create policy "Users can view own habit logs"
on public.habit_logs
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own habit logs"
on public.habit_logs
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own habit logs"
on public.habit_logs
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own habit logs"
on public.habit_logs
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- WATER LOGS
-- =============================================

create policy "Users can view own water logs"
on public.water_logs
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own water logs"
on public.water_logs
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own water logs"
on public.water_logs
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own water logs"
on public.water_logs
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- WORKOUTS
-- =============================================

create policy "Users can view own workouts"
on public.workouts
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own workouts"
on public.workouts
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own workouts"
on public.workouts
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own workouts"
on public.workouts
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- COURSES
-- =============================================

create policy "Users can view own courses"
on public.courses
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own courses"
on public.courses
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own courses"
on public.courses
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own courses"
on public.courses
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- COURSE RESOURCES
-- =============================================

create policy "Users can view own course resources"
on public.course_resources
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own course resources"
on public.course_resources
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own course resources"
on public.course_resources
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own course resources"
on public.course_resources
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- NOTES
-- =============================================

create policy "Users can view own notes"
on public.notes
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own notes"
on public.notes
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own notes"
on public.notes
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own notes"
on public.notes
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- PROJECTS
-- =============================================

create policy "Users can view own projects"
on public.projects
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own projects"
on public.projects
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own projects"
on public.projects
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own projects"
on public.projects
for delete
to authenticated
using ((select auth.uid()) = user_id);


-- =============================================
-- CALENDAR EVENTS
-- =============================================

create policy "Users can view own calendar events"
on public.calendar_events
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own calendar events"
on public.calendar_events
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own calendar events"
on public.calendar_events
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own calendar events"
on public.calendar_events
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- =============================================
-- AUTOMATIC PROFILE CREATION
-- =============================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    full_name
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      ''
    )
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();