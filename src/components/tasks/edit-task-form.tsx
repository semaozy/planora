"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";

import {
  updateTask,
  type TaskActionState,
} from "@/actions/tasks";

import type { Task } from "@/types/task";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EditTaskFormProps = {
  task: Task;
};

const initialState: TaskActionState = {
  error: null,
  success: null,
};

export function EditTaskForm({
  task,
}: EditTaskFormProps) {
  const [state, action, pending] =
    useActionState(
      updateTask,
      initialState
    );

  const initialDate = task.due_date
    ? new Date(task.due_date)
        .toISOString()
        .slice(0, 16)
    : "";

  return (
    <form
      action={action}
      className="space-y-4"
    >
      <input
        type="hidden"
        name="taskId"
        value={task.id}
      />

      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>
            {state.error}
          </AlertDescription>
        </Alert>
      )}

      {state.success && (
        <Alert>
          <AlertDescription>
            {state.success}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor={`title-${task.id}`}>
          Görev başlığı
        </Label>

        <Input
          id={`title-${task.id}`}
          name="title"
          type="text"
          defaultValue={task.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={`description-${task.id}`}
        >
          Açıklama
        </Label>

        <Textarea
          id={`description-${task.id}`}
          name="description"
          defaultValue={
            task.description ?? ""
          }
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor={`priority-${task.id}`}
          >
            Öncelik
          </Label>

          <select
            id={`priority-${task.id}`}
            name="priority"
            defaultValue={task.priority}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
          >
            <option value="low">
              Düşük
            </option>

            <option value="normal">
              Normal
            </option>

            <option value="high">
              Yüksek
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`dueDate-${task.id}`}
          >
            Bitiş tarihi
          </Label>

          <Input
            id={`dueDate-${task.id}`}
            name="dueDate"
            type="datetime-local"
            defaultValue={initialDate}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Kaydediliyor...
          </>
        ) : (
          <>
            <Save className="size-4" />
            Değişiklikleri kaydet
          </>
        )}
      </Button>
    </form>
  );
}