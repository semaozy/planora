"use client";

import { useActionState } from "react";
import { Loader2, Plus } from "lucide-react";

import {
  createTask,
  type TaskActionState,
} from "@/actions/tasks";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: TaskActionState = {
  error: null,
  success: null,
};

export function TaskForm() {
  const [state, action, pending] =
    useActionState(
      createTask,
      initialState
    );

  return (
    <form
      action={action}
      className="space-y-4"
    >
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
        <Label htmlFor="title">
          Görev başlığı
        </Label>

        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Örn. Spring Boot çalış"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Açıklama
        </Label>

        <Textarea
          id="description"
          name="description"
          placeholder="Görev hakkında kısa bir açıklama..."
          rows={4}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="priority">
            Öncelik
          </Label>

          <select
            id="priority"
            name="priority"
            defaultValue="normal"
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
          <Label htmlFor="dueDate">
            Bitiş tarihi
          </Label>

          <Input
            id="dueDate"
            name="dueDate"
            type="datetime-local"
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
            Ekleniyor...
          </>
        ) : (
          <>
            <Plus className="size-4" />
            Görev ekle
          </>
        )}
      </Button>
    </form>
  );
}