export const instant = false;

import { connection } from "next/server";

import {
  CheckCircle2,
  CircleDot,
  ListTodo,
  Plus,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import type { Task } from "@/types/task";

import { TaskCard } from "@/components/tasks/task-card";
import { TaskForm } from "@/components/tasks/task-form";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function TasksPage() {
  await connection();

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const tasks =
    (data ?? []) as Task[];

  const completedCount =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  const pendingCount =
    tasks.length - completedCount;

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-primary">
              Planora
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Görevler
            </h1>

            <p className="mt-2 text-muted-foreground">
              Günlük ve uzun vadeli
              görevlerini tek bir yerden yönet.
            </p>
          </div>

          <Dialog>
            <DialogTrigger
              render={
                <Button type="button" />
              }
            >
              <Plus className="size-4" />
              Yeni görev
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Yeni görev oluştur
                </DialogTitle>

                <DialogDescription>
                  Yapman gereken işi Planora&apos;ya ekle.
                </DialogDescription>
              </DialogHeader>

              <TaskForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">
                Toplam görev
              </CardTitle>

              <ListTodo className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {tasks.length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">
                Bekleyen
              </CardTitle>

              <CircleDot className="size-4 text-amber-500" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {pendingCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">
                Tamamlanan
              </CardTitle>

              <CheckCircle2 className="size-4 text-emerald-500" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {completedCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {error ? (
          <Card>
            <CardContent className="p-6 text-sm text-destructive">
              Görevler yüklenirken bir hata
              oluştu: {error.message}
            </CardContent>
          </Card>
        ) : tasks.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ListTodo className="size-7" />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                Henüz görevin yok
              </h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                İlk görevini eklediğinde burada
                görüntülenecek.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            ))}
          </div>
        )}

        {!user && (
          <p className="mt-4 text-sm text-destructive">
            Kullanıcı oturumu bulunamadı.
          </p>
        )}
      </div>
    </main>
  );
}