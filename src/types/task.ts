export type TaskStatus =
  | "todo"
  | "in_progress"
  | "completed";

export type TaskPriority =
  | "low"
  | "normal"
  | "high";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  start_date: string | null;
  due_date: string | null;
  estimated_duration: number | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};