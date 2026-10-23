-- =============================================
-- PLANORA INITIAL DATABASE SCHEMA
-- =============================================


-- =============================================
-- PROFILES
-- =============================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- TASKS
-- =============================================

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  title text not null,
  description text,

  category text,
  priority text not null default 'normal',
  status text not null default 'todo',

  start_date timestamptz,
  due_date timestamptz,

  estimated_duration integer,
  completed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- HABITS
-- =============================================

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  name text not null,
  category text,

  frequency text not null default 'daily',

  target_value numeric,
  unit text,

  start_date date not null default current_date,
  reminder_time time,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- HABIT LOGS
-- =============================================

create table if not exists public.habit_logs (
  id uuid primary key default gen_random_uuid(),

  habit_id uuid not null
    references public.habits(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  log_date date not null default current_date,

  value numeric,

  is_completed boolean not null default false,

  note text,

  created_at timestamptz not null default now(),

  unique (habit_id, log_date)
);


-- =============================================
-- WATER LOGS
-- =============================================

create table if not exists public.water_logs (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  amount_ml integer not null
    check (amount_ml > 0),

  logged_at timestamptz not null default now()
);


-- =============================================
-- WORKOUTS
-- =============================================

create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  name text not null,

  workout_type text,

  duration_minutes integer,

  frequency text,

  scheduled_days text[],

  target text,

  reminder_time time,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- COURSES
-- =============================================

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  name text not null,

  course_code text,

  instructor text,

  semester text,

  day_of_week text,

  start_time time,

  end_time time,

  classroom text,

  color text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- COURSE RESOURCES
-- =============================================

create table if not exists public.course_resources (
  id uuid primary key default gen_random_uuid(),

  course_id uuid not null
    references public.courses(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  title text not null,

  resource_type text,

  file_url text,

  external_url text,

  description text,

  created_at timestamptz not null default now()
);


-- =============================================
-- NOTES
-- =============================================

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  title text not null,

  content text,

  category text,

  is_pinned boolean not null default false,

  is_archived boolean not null default false,

  color text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- PROJECTS
-- =============================================

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  name text not null,

  description text,

  technologies text[],

  status text not null default 'planned',

  progress integer not null default 0
    check (progress >= 0 and progress <= 100),

  start_date date,

  target_date date,

  repository_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- CALENDAR EVENTS
-- =============================================

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  title text not null,

  description text,

  category text,

  start_datetime timestamptz not null,

  end_datetime timestamptz,

  location text,

  meeting_url text,

  color text,

  is_recurring boolean not null default false,

  reminder_minutes integer,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =============================================
-- INDEXES
-- =============================================

create index if not exists tasks_user_id_idx
on public.tasks(user_id);

create index if not exists tasks_due_date_idx
on public.tasks(due_date);

create index if not exists habits_user_id_idx
on public.habits(user_id);

create index if not exists habit_logs_user_id_idx
on public.habit_logs(user_id);

create index if not exists water_logs_user_id_idx
on public.water_logs(user_id);

create index if not exists workouts_user_id_idx
on public.workouts(user_id);

create index if not exists courses_user_id_idx
on public.courses(user_id);

create index if not exists notes_user_id_idx
on public.notes(user_id);

create index if not exists projects_user_id_idx
on public.projects(user_id);

create index if not exists calendar_events_user_id_idx
on public.calendar_events(user_id);

create index if not exists calendar_events_start_idx
on public.calendar_events(start_datetime);


-- =============================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;
alter table public.water_logs enable row level security;
alter table public.workouts enable row level security;
alter table public.courses enable row level security;
alter table public.course_resources enable row level security;
alter table public.notes enable row level security;
alter table public.projects enable row level security;
alter table public.calendar_events enable row level security;