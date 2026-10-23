import {
  CalendarDays,
  Check,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";

import {
  deleteTask,
  toggleTask,
} from "@/actions/tasks";

import type {
  Task,
  TaskPriority,
} from "@/types/task";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { EditTaskForm } from "@/components/tasks/edit-task-form";

type TaskCardProps = {
  task: Task;
};

function getPriorityLabel(
  priority: TaskPriority
) {
  switch (priority) {
    case "high":
      return {
        text: "Yüksek",
        className:
          "bg-red-500/10 text-red-600",
      };

    case "low":
      return {
        text: "Düşük",
        className:
          "bg-emerald-500/10 text-emerald-600",
      };

    default:
      return {
        text: "Normal",
        className:
          "bg-amber-500/10 text-amber-600",
      };
  }
}

export function TaskCard({
  task,
}: TaskCardProps) {
  const completed =
    task.status === "completed";

  const priority =
    getPriorityLabel(task.priority);

  return (
    <Card
      className={
        completed
          ? "opacity-70"
          : undefined
      }
    >
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
        <form action={toggleTask}>
          <input
            type="hidden"
            name="taskId"
            value={task.id}
          />

          <input
            type="hidden"
            name="currentStatus"
            value={task.status}
          />

          <Button
            type="submit"
            variant={
              completed
                ? "default"
                : "outline"
            }
            size="icon"
            title={
              completed
                ? "Tamamlanmadı olarak işaretle"
                : "Tamamlandı olarak işaretle"
            }
          >
            {completed ? (
              <RotateCcw className="size-4" />
            ) : (
              <Check className="size-4" />
            )}
          </Button>
        </form>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={
                completed
                  ? "font-semibold line-through"
                  : "font-semibold"
              }
            >
              {task.title}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${priority.className}`}
            >
              {priority.text}
            </span>
          </div>

          {task.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {task.description}
            </p>
          )}

          {task.due_date && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />

              {new Intl.DateTimeFormat(
                "tr-TR",
                {
                  dateStyle: "medium",
                  timeStyle: "short",
                }
              ).format(
                new Date(task.due_date)
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  title="Görevi düzenle"
                />
              }
            >
              <Pencil className="size-4" />
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Görevi düzenle
                </DialogTitle>

                <DialogDescription>
                  Görev bilgilerini değiştir ve
                  kaydet.
                </DialogDescription>
              </DialogHeader>

              <EditTaskForm task={task} />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  title="Görevi sil"
                  className="text-destructive"
                />
              }
            >
              <Trash2 className="size-4" />
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Görevi silmek istiyor musun?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Bu işlem geri alınamaz.
                  Görev kalıcı olarak silinecek.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Vazgeç
                </AlertDialogCancel>

                <form action={deleteTask}>
                  <input
                    type="hidden"
                    name="taskId"
                    value={task.id}
                  />

                  <AlertDialogAction
                    type="submit"
                  >
                    Sil
                  </AlertDialogAction>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}