# Planora

> A personal life management and productivity web application.

Planora is a personal life assistant designed to bring daily planning, tasks, habits, nutrition, fitness, education, career development, notes, projects, and calendar management into a single application.

Unlike conversational AI assistants, Planora focuses primarily on structured life management and actionable tools.

The goal is simple:

**Plan. Track. Improve.**

---

## Project Status

Planora is currently under active development.

The core infrastructure, authentication system, database integration, task management system, and initial dashboard integration are working.

### Current Development Status

| Module | Status |
|---|---|
| Project Setup | ✅ Completed |
| Application Layout | ✅ Completed |
| Responsive Sidebar | ✅ Completed |
| Dashboard Structure | ✅ Completed |
| Dark / Light Theme | ✅ Completed |
| Supabase Integration | ✅ Completed |
| PostgreSQL Database | ✅ Completed |
| Row Level Security | ✅ Completed |
| Authentication | ✅ Completed |
| Protected Routes | ✅ Completed |
| Task Management | ✅ Completed |
| Task Dashboard Integration | ✅ Completed |
| Habit Tracking | ⏳ Planned |
| Nutrition & Water Tracking | ⏳ Planned |
| Sports & Workout Tracking | ⏳ Planned |
| Course Management | ⏳ Planned |
| Work & Career Management | ⏳ Planned |
| Project Management | ⏳ Planned |
| Notes | ⏳ Planned |
| Calendar | ⏳ Planned |
| Reports & Analytics | ⏳ Planned |

---

# Features

## Authentication

Planora includes a Supabase-based authentication system.

Currently implemented:

- User registration
- User login
- User logout
- Email verification callback infrastructure
- Session management
- Protected application routes
- Automatic redirection for unauthenticated users
- Automatic user profile creation
- User-specific database access

Authenticated users can only access their own data.

---

## Dashboard

The Planora dashboard provides an overview of the user's current productivity data.

Currently available:

- Current date
- Daily greeting
- Today's tasks
- Upcoming task
- Weekly task progress
- Completed task count
- Pending task count
- Total task count
- Today's task plan
- Quick navigation to task management

Some dashboard sections are currently placeholders for modules that will be implemented later, including:

- Water consumption
- Workout status
- Habits

These sections will be connected to real data as their respective modules are developed.

---

# Task Management

Task Management is currently the first fully functional Planora module.

Users can:

- Create tasks
- Add task descriptions
- Set task priority
- Set due date and time
- View all tasks
- Mark tasks as completed
- Reopen completed tasks
- Edit tasks
- Delete tasks
- View task statistics
- View today's tasks on the dashboard
- View weekly task progress
- View upcoming tasks

### Task Priorities

Tasks currently support:

- Low
- Normal
- High

### Task Status

Tasks currently support:

- Todo
- In Progress
- Completed

Task data is stored in Supabase PostgreSQL and associated with the authenticated user.

---

# Application Navigation

Planora currently includes a responsive application navigation system.

Main sections:

```text
Dashboard
Calendar
Tasks
Habits

Sports
Nutrition
Courses
Work & Career

Projects
Notes
Reports

Profile
Settings
```

Some sections currently contain placeholder pages and will be implemented during future development phases.

---

# Responsive Interface

Planora is designed to work across different screen sizes.

The current layout includes:

- Desktop sidebar
- Mobile navigation
- Responsive dashboard
- Responsive cards
- Responsive forms
- Responsive task management interface
- Light mode
- Dark mode

---

# Tech Stack

## Core

| Technology | Purpose |
|---|---|
| Next.js | Full-stack React framework |
| React | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |

## Backend & Database

| Technology | Purpose |
|---|---|
| Supabase | Backend services |
| PostgreSQL | Database |
| Supabase Auth | Authentication |
| Row Level Security | User data protection |
| Supabase SSR | Server-side authentication |

## Forms & Validation

| Technology | Purpose |
|---|---|
| React Actions | Server-side form actions |
| React `useActionState` | Form state management |
| React Hook Form | Advanced form management infrastructure |
| Zod | Validation infrastructure |

## UI & Utilities

| Technology | Purpose |
|---|---|
| Lucide React | Icons |
| next-themes | Dark / Light theme |
| Sonner | Toast notification infrastructure |
| date-fns | Date utilities |
| clsx | Conditional classes |
| tailwind-merge | Tailwind class merging |
| class-variance-authority | Component variants |

## Planned / Installed Infrastructure

The project also contains infrastructure for future modules:

| Technology | Intended Use |
|---|---|
| FullCalendar | Calendar |
| Recharts | Reports and charts |
| Tiptap | Rich text notes |
| dnd-kit | Drag and drop |
| Zustand | Client-side state management |

These libraries may not yet be actively used in completed modules.

---

# Architecture

Planora follows a modular architecture.

```text
User Interface
      │
      ▼
Next.js App Router
      │
      ├── Server Components
      ├── Client Components
      ├── Server Actions
      └── Protected Routes
      │
      ▼
Supabase
      │
      ├── Authentication
      ├── PostgreSQL
      └── Row Level Security
```

The application separates:

- Pages
- Reusable components
- Server actions
- Services
- Types
- Validation
- Database clients
- Configuration
- Global providers

This structure is intended to keep the project maintainable as Planora grows.

---

# Project Structure

```text
planora/
│
├── public/
│   ├── icons/
│   └── images/
│
├── src/
│   │
│   ├── actions/
│   │   ├── auth.ts
│   │   └── tasks.ts
│   │
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── calendar/
│   │   │   ├── tasks/
│   │   │   ├── habits/
│   │   │   ├── sports/
│   │   │   ├── nutrition/
│   │   │   ├── courses/
│   │   │   ├── work/
│   │   │   ├── projects/
│   │   │   ├── notes/
│   │   │   ├── reports/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   │
│   │   ├── api/
│   │   │   └── health/
│   │   │
│   │   ├── auth/
│   │   │   └── callback/
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── tasks/
│   │   ├── habits/
│   │   ├── sports/
│   │   ├── nutrition/
│   │   ├── courses/
│   │   ├── projects/
│   │   ├── notes/
│   │   ├── shared/
│   │   └── ui/
│   │
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase/
│   │   └── validations/
│   │
│   ├── providers/
│   ├── services/
│   ├── stores/
│   ├── types/
│   └── proxy.ts
│
├── supabase/
│   ├── migrations/
│   └── seed/
│
├── .env.example
├── .env.local
├── components.json
├── package.json
├── tsconfig.json
└── README.md
```

---

# Database

Planora uses PostgreSQL through Supabase.

Current database structure includes the following tables:

```text
profiles
tasks
habits
habit_logs
water_logs
workouts
courses
course_resources
notes
projects
calendar_events
```

Not every table is currently connected to a completed application module.

---

## Profiles

Stores application profile information associated with authenticated users.

Main fields:

```text
id
full_name
avatar_url
created_at
updated_at
```

A profile is automatically created when a new user account is created.

---

## Tasks

Stores user tasks.

Main fields:

```text
id
user_id
title
description
category
priority
status
start_date
due_date
estimated_duration
completed_at
created_at
updated_at
```

This table is currently fully connected to the Task Management module.

---

## Habits

Planned for recurring habit tracking.

```text
id
user_id
name
category
frequency
target_value
unit
start_date
reminder_time
is_active
created_at
updated_at
```

---

## Habit Logs

Will store daily habit activity.

```text
habit_id
user_id
log_date
value
is_completed
note
```

---

## Water Logs

Will track daily water consumption.

```text
user_id
amount_ml
logged_at
```

---

## Workouts

Will store workout plans and routines.

```text
user_id
name
workout_type
duration_minutes
frequency
scheduled_days
target
reminder_time
```

---

## Courses

Will contain academic course information.

```text
user_id
name
course_code
instructor
semester
day_of_week
start_time
end_time
classroom
color
```

---

## Course Resources

Will contain files, links, and resources related to courses.

---

## Notes

Will provide personal note management.

---

## Projects

Will provide personal and professional project tracking.

---

## Calendar Events

Will store calendar events including:

- Meetings
- Classes
- Personal events
- Study sessions
- Work events
- Deadlines

---

# Security

Planora uses Row Level Security policies.

The main security principle is:

```text
User A
   │
   └── Can access User A's data

User B
   │
   └── Can access User B's data
```

Users should not be able to access another user's:

- Tasks
- Habits
- Water logs
- Workouts
- Courses
- Course resources
- Notes
- Projects
- Calendar events

Database records are associated with authenticated users through `user_id`.

---

# Getting Started

## Requirements

Before running Planora, make sure the following are installed:

```text
Node.js
npm
Git
```

You will also need a Supabase project.

---

# Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Enter the project:

```bash
cd planora
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create:

```text
.env.local
```

in the project root.

Add:

```env
NEXT_PUBLIC_APP_NAME=Planora
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Do not commit `.env.local` to GitHub.

An example configuration is available in:

```text
.env.example
```

---

# Supabase Setup

The database schema and security policies are stored under:

```text
supabase/migrations/
```

Current migrations include the initial database schema and authentication / Row Level Security policies.

When setting up a new Supabase project, these SQL migrations must be applied to the database.

The Supabase authentication configuration should also include the local application URL:

```text
http://localhost:3000
```

and the authentication callback:

```text
http://localhost:3000/auth/callback
```

---

# Running the Application

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Main authenticated dashboard:

```text
http://localhost:3000/dashboard
```

Task management:

```text
http://localhost:3000/tasks
```

---

# Development Checks

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

A successful development cycle should pass both commands without errors.

---

# Authentication Flow

Planora currently follows this flow:

```text
Register
   │
   ▼
Supabase Auth
   │
   ▼
User Created
   │
   ▼
Profile Created
   │
   ▼
Email Verification
   │
   ▼
Login
   │
   ▼
Dashboard
```

Unauthenticated users attempting to open protected pages are redirected to:

```text
/login
```

Authenticated users can access the application dashboard and personal modules.

---

# Task Flow

The current task flow is:

```text
User
  │
  ▼
Create Task
  │
  ▼
Server Action
  │
  ▼
Supabase PostgreSQL
  │
  ▼
Row Level Security
  │
  ▼
User-Specific Task
```

Task mutations revalidate the relevant application pages so updated information can be displayed.

---

# Current Routes

```text
/
├── /login
├── /register
├── /forgot-password
│
├── /dashboard
├── /calendar
├── /tasks
├── /habits
├── /sports
├── /nutrition
├── /courses
├── /work
├── /projects
├── /notes
├── /reports
├── /profile
└── /settings
```

Some routes currently contain placeholder interfaces until their respective development phase begins.

---

# Development Roadmap

The project is intentionally being developed module by module.

The goal is to finish and test each core feature before moving to the next feature.

---

## Phase 1: Foundation

- [x] Create Next.js project
- [x] Configure TypeScript
- [x] Configure Tailwind CSS
- [x] Configure shadcn/ui
- [x] Create application folder architecture
- [x] Create responsive layout
- [x] Create sidebar
- [x] Create header
- [x] Add dark / light theme
- [x] Create initial dashboard

**Status: Completed**

---

## Phase 2: Backend & Authentication

- [x] Create Supabase project
- [x] Connect Next.js to Supabase
- [x] Create PostgreSQL database schema
- [x] Configure Row Level Security
- [x] Create registration system
- [x] Create login system
- [x] Create logout system
- [x] Configure authentication callback
- [x] Protect application routes
- [x] Create automatic user profiles

**Status: Completed**

---

## Phase 3: Task Management

- [x] Create tasks table
- [x] Create task
- [x] List tasks
- [x] Edit task
- [x] Delete task
- [x] Complete task
- [x] Reopen task
- [x] Task priority
- [x] Task due date
- [x] Task statistics
- [x] Connect tasks to dashboard
- [x] Weekly task progress
- [x] Today's tasks
- [x] Upcoming task information

**Status: Completed**

---

## Phase 4: Habit Tracking

Planned features:

- [ ] Create habit
- [ ] Edit habit
- [ ] Delete habit
- [ ] Activate / deactivate habit
- [ ] Daily habit completion
- [ ] Habit logs
- [ ] Daily progress
- [ ] Habit progress on Dashboard

**Status: Planned**

---

## Phase 5: Nutrition & Water Tracking

Planned features:

- [ ] Daily water goal
- [ ] Add water consumption
- [ ] Daily water total
- [ ] Nutrition habits
- [ ] Sugar-free day tracking
- [ ] Daily nutrition notes
- [ ] Dashboard water integration

Example:

```text
Daily Goal: 2500 ml

Today:
1500 / 2500 ml
```

**Status: Planned**

---

## Phase 6: Sports & Workout Tracking

Planned features:

- [ ] Create workout
- [ ] Workout type
- [ ] Workout frequency
- [ ] Scheduled workout days
- [ ] Workout duration
- [ ] Complete workout
- [ ] Workout history
- [ ] Dashboard workout integration

Examples:

```text
Pilates
Monday / Wednesday / Saturday
30 minutes
```

```text
Running
Tuesday / Sunday
45 minutes
```

**Status: Planned**

---

## Phase 7: Course Management

Planned features:

- [ ] Create course
- [ ] Course code
- [ ] Instructor
- [ ] Semester
- [ ] Weekly schedule
- [ ] Course notes
- [ ] Course resources
- [ ] File / resource management
- [ ] Assignment information
- [ ] Exam information

Each course will eventually have its own workspace.

**Status: Planned**

---

## Phase 8: Work & Career

Planned for professional development.

Potential tracked areas:

```text
Java
Spring Boot
Go
Backend Development
Artificial Intelligence
Machine Learning
LLM
RAG
```

Planned features:

- [ ] Learning plans
- [ ] Career tasks
- [ ] Technical learning notes
- [ ] Professional development tracking

**Status: Planned**

---

## Phase 9: Project Management

Planned features:

- [ ] Create project
- [ ] Project description
- [ ] Technologies
- [ ] Project status
- [ ] Progress percentage
- [ ] Start date
- [ ] Target date
- [ ] Repository URL
- [ ] Project-related tasks

**Status: Planned**

---

## Phase 10: Notes

Planned features:

- [ ] Create note
- [ ] Edit note
- [ ] Delete note
- [ ] Categories
- [ ] Pin notes
- [ ] Archive notes
- [ ] Rich text editor
- [ ] Technical notes
- [ ] Course notes
- [ ] Project notes

Tiptap infrastructure is planned for the rich text editing experience.

**Status: Planned**

---

## Phase 11: Calendar

Planned views:

```text
Daily
Weekly
Monthly
```

Planned event types:

- [ ] Tasks
- [ ] Meetings
- [ ] Classes
- [ ] Exams
- [ ] Assignments
- [ ] Workouts
- [ ] Study sessions
- [ ] Personal events

FullCalendar is planned for the calendar interface.

**Status: Planned**

---

## Phase 12: Reports

Planned reports:

- [ ] Weekly task completion
- [ ] Habit consistency
- [ ] Water consumption
- [ ] Workout consistency
- [ ] Study activity
- [ ] Monthly overview

Recharts is planned for data visualization.

**Status: Planned**

---

## Phase 13: Final MVP Stabilization

Before adding advanced features:

- [ ] Complete all core modules
- [ ] Test authentication
- [ ] Test RLS policies
- [ ] Test CRUD operations
- [ ] Test mobile interface
- [ ] Test dark mode
- [ ] Validate empty states
- [ ] Validate loading states
- [ ] Validate error states
- [ ] Run ESLint
- [ ] Run production build
- [ ] Fix remaining bugs
- [ ] Prepare deployment

The first milestone is a stable working version of Planora.

---

# Future Ideas

The following features are intentionally **not part of the current MVP**.

They may be considered only after all core Planora modules are complete and stable.

Possible future improvements:

- AI-assisted weekly planning
- Natural language task creation
- Smart task suggestions
- Automatic task rescheduling
- Personal productivity insights
- Study note summarization
- AI-generated study questions
- Smart workload analysis
- External calendar integrations
- Advanced notifications
- Email reminders
- Pomodoro mode
- Gamification
- Achievement system
- Mobile application
- Data export
- Advanced search

The priority is to finish the core product before introducing these features.

---

# Development Philosophy

Planora follows a simple rule:

> **Finish the core before expanding the scope.**

The project is intentionally being developed one module at a time.

Each module follows this cycle:

```text
Database
   ↓
Security
   ↓
Server Logic
   ↓
User Interface
   ↓
Dashboard Integration
   ↓
Lint
   ↓
Production Build
   ↓
Manual Testing
   ↓
Module Complete
```

Only after a module works correctly does development continue to the next module.

---

# Current Milestone

The current development milestone is:

```text
Foundation             ✅
Database               ✅
Authentication         ✅
Task Management        ✅
Task Dashboard Data    ✅
                         │
                         ▼
Habit Tracking         ⏳ NEXT
```

Development is currently paused before beginning the Habit Tracking module.

---

# Vision

Planora aims to become a central personal management system where different areas of daily life can be organized without switching between multiple applications.

Instead of managing:

```text
Tasks        → one application
Calendar     → another application
Notes        → another application
Habits       → another application
Courses      → another application
Work         → another application
Fitness      → another application
```

Planora aims to bring them together:

```text
                 PLANORA
                    │
       ┌────────────┼────────────┐
       │            │            │
     Tasks        Habits       Calendar
       │            │            │
    Courses      Nutrition     Sports
       │            │            │
     Work         Notes       Projects
                    │
                 Reports
```

The long-term goal is not simply to build another todo application.

**Planora is intended to become a personal operating system for everyday life.**

---

# Author

**Sema Nur Özyılmaz**

Computer Engineering  
Software Development & Artificial Intelligence

---

# License

This project is currently being developed as a personal project.

---

<p align="center">
  <strong>Planora</strong>
  <br />
  Plan your life. Track your progress. Build your routine.
</p>
