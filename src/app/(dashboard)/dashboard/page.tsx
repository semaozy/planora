export const instant = false;

import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Droplets,
  Dumbbell,
  Flame,
  ListTodo,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

function getTodayRange() {
  const now = new Date();

  const turkeyDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const startOfDay = new Date(
    `${turkeyDate}T00:00:00+03:00`
  );

  const endOfDay = new Date(
    `${turkeyDate}T23:59:59.999+03:00`
  );

  return {
    startOfDay,
    endOfDay,
  };
}

function getWeekRange() {
  const now = new Date();

  const turkeyDateText = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const currentDate = new Date(
    `${turkeyDateText}T12:00:00+03:00`
  );

  const currentDay = currentDate.getDay();

  const daysSinceMonday =
    currentDay === 0 ? 6 : currentDay - 1;

  const startOfWeek = new Date(currentDate);

  startOfWeek.setDate(
    currentDate.getDate() - daysSinceMonday
  );

  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);

  endOfWeek.setDate(
    startOfWeek.getDate() + 6
  );

  endOfWeek.setHours(
    23,
    59,
    59,
    999
  );

  return {
    startOfWeek,
    endOfWeek,
  };
}

function isDateInRange(
  dateValue: string | null,
  startDate: Date,
  endDate: Date
) {
  if (!dateValue) {
    return false;
  }

  const date = new Date(dateValue);

  return (
    date >= startDate &&
    date <= endDate
  );
}

function formatDueDate(
  dateValue: string
) {
  return new Intl.DateTimeFormat(
    "tr-TR",
    {
      timeZone: "Europe/Istanbul",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(
    new Date(dateValue)
  );
}

function getPriorityText(
  priority: Task["priority"]
) {
  switch (priority) {
    case "high":
      return "Yüksek";

    case "low":
      return "Düşük";

    default:
      return "Normal";
  }
}

function getPriorityClassName(
  priority: Task["priority"]
) {
  switch (priority) {
    case "high":
      return "bg-red-500/10 text-red-600";

    case "low":
      return "bg-emerald-500/10 text-emerald-600";

    default:
      return "bg-amber-500/10 text-amber-600";
  }
}

export default async function DashboardPage() {
  await connection();

  const supabase =
    await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("due_date", {
      ascending: true,
      nullsFirst: false,
    });

  const tasks =
    (data ?? []) as Task[];

  const {
    startOfDay,
    endOfDay,
  } = getTodayRange();

  const {
    startOfWeek,
    endOfWeek,
  } = getWeekRange();

  const todayTasks =
    tasks.filter((task) =>
      isDateInRange(
        task.due_date,
        startOfDay,
        endOfDay
      )
    );

  const completedTodayTasks =
    todayTasks.filter(
      (task) =>
        task.status === "completed"
    );

  const pendingTodayTasks =
    todayTasks.filter(
      (task) =>
        task.status !== "completed"
    );

  const weeklyTasks =
    tasks.filter((task) =>
      isDateInRange(
        task.due_date,
        startOfWeek,
        endOfWeek
      )
    );

  const completedWeeklyTasks =
    weeklyTasks.filter(
      (task) =>
        task.status === "completed"
    );

  const pendingWeeklyTasks =
    weeklyTasks.filter(
      (task) =>
        task.status !== "completed"
    );

  const weeklyProgress =
    weeklyTasks.length > 0
      ? Math.round(
          (
            completedWeeklyTasks.length /
            weeklyTasks.length
          ) * 100
        )
      : 0;

  const upcomingTask =
    tasks.find(
      (task) =>
        task.status !== "completed" &&
        task.due_date &&
        new Date(task.due_date) >
          new Date()
    ) ?? null;

  const currentDateText =
    new Intl.DateTimeFormat(
      "tr-TR",
      {
        timeZone:
          "Europe/Istanbul",
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
      }
    ).format(new Date());

  const summaryCards = [
    {
      title:
        "Bugünkü görevler",
      value:
        `${completedTodayTasks.length} / ${todayTasks.length}`,
      description:
        todayTasks.length > 0
          ? `${pendingTodayTasks.length} görev bekliyor`
          : "Bugün için görev bulunmuyor",
      icon: CheckCircle2,
      iconClassName:
        "bg-blue-500/10 text-blue-600",
    },
    {
      title:
        "Su tüketimi",
      value:
        "0 ml",
      description:
        "Günlük hedef: 2500 ml",
      icon:
        Droplets,
      iconClassName:
        "bg-cyan-500/10 text-cyan-600",
    },
    {
      title:
        "Spor",
      value:
        "Planlanmadı",
      description:
        "Bugün için egzersiz bulunmuyor",
      icon:
        Dumbbell,
      iconClassName:
        "bg-emerald-500/10 text-emerald-600",
    },
    {
      title:
        "Yaklaşan görev",
      value:
        upcomingTask
          ? upcomingTask.title
          : "Görev yok",
      description:
        upcomingTask?.due_date
          ? formatDueDate(
              upcomingTask.due_date
            )
          : "Yaklaşan görev bulunmuyor",
      icon:
        CalendarDays,
      iconClassName:
        "bg-violet-500/10 text-violet-600",
    },
  ];

  const habits = [
    {
      name:
        "Günlük su hedefi",
      description:
        "0 / 2500 ml",
      progress:
        0,
      icon:
        Droplets,
    },
    {
      name:
        "Kodlama çalışması",
      description:
        "0 / 60 dakika",
      progress:
        0,
      icon:
        Clock3,
    },
    {
      name:
        "Şekersiz gün",
      description:
        "Bugün henüz işaretlenmedi",
      progress:
        0,
      icon:
        Flame,
    },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium capitalize text-primary">
              {currentDateText}
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Günaydın, Sema
            </h1>

            <p className="mt-2 text-muted-foreground">
              Bugün hayatın için küçük ama
              değerli bir adım atabilirsin.
            </p>
          </div>

          <Link
            href="/tasks"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Yeni görev ekle
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </div>

        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="p-4 text-sm text-destructive">
              Görev verileri yüklenirken
              bir hata oluştu:{" "}
              {error.message}
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map(
            (card) => {
              const Icon =
                card.icon;

              return (
                <Card
                  key={card.title}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>

                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl",
                        card.iconClassName
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="truncate text-2xl font-bold">
                      {card.value}
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>
                    Bugünün planı
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Bugün tamamlaman
                    gereken görevler.
                  </CardDescription>
                </div>

                <Link
                  href="/tasks"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Tüm görevler
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              {todayTasks.length ===
              0 ? (
                <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <ListTodo className="size-6 text-muted-foreground" />
                  </div>

                  <h3 className="mt-4 font-semibold">
                    Bugünün planı boş
                  </h3>

                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Bugün için bitiş tarihi belirlenmiş bir görev bulunmuyor.
                  </p>

                  <Link
                    href="/tasks"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    Görev oluştur
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayTasks
                    .slice(0, 5)
                    .map(
                      (task) => (
                        <div
                          key={
                            task.id
                          }
                          className="flex items-start gap-3 rounded-xl border p-4"
                        >
                          <div
                            className={cn(
                              "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                              task.status ===
                                "completed"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <CheckCircle2 className="size-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p
                                className={cn(
                                  "font-medium",
                                  task.status ===
                                    "completed" &&
                                    "text-muted-foreground line-through"
                                )}
                              >
                                {
                                  task.title
                                }
                              </p>

                              <span
                                className={cn(
                                  "rounded-full px-2 py-0.5 text-xs font-medium",
                                  getPriorityClassName(
                                    task.priority
                                  )
                                )}
                              >
                                {getPriorityText(
                                  task.priority
                                )}
                              </span>
                            </div>

                            {task.description && (
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {
                                  task.description
                                }
                              </p>
                            )}

                            {task.due_date && (
                              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock3 className="size-3.5" />

                                {formatDueDate(
                                  task.due_date
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Haftalık ilerleme
              </CardTitle>

              <CardDescription>
                Bu haftaki görev
                tamamlama durumun.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold">
                    %{weeklyProgress}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {weeklyTasks.length >
                    0
                      ? `${weeklyTasks.length} görevden ${completedWeeklyTasks.length} tanesi tamamlandı`
                      : "Bu hafta için görev bulunmuyor"}
                  </p>
                </div>

                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Flame className="size-7" />
                </div>
              </div>

              <Progress
                value={
                  weeklyProgress
                }
                className="mt-6"
              />

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-2xl font-bold">
                    {
                      completedWeeklyTasks.length
                    }
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Tamamlanan
                  </p>
                </div>

                <div className="rounded-xl bg-muted p-4">
                  <p className="text-2xl font-bold">
                    {
                      pendingWeeklyTasks.length
                    }
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Bekleyen
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>
                    Aktif alışkanlıklar
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Bugünkü alışkanlık
                    hedeflerin.
                  </CardDescription>
                </div>

                <Link
                  href="/habits"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Tümünü gör
                </Link>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {habits.map(
                (habit) => {
                  const Icon =
                    habit.icon;

                  return (
                    <div
                      key={
                        habit.name
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium">
                              {
                                habit.name
                              }
                            </p>

                            <span className="text-xs text-muted-foreground">
                              %
                              {
                                habit.progress
                              }
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            {
                              habit.description
                            }
                          </p>
                        </div>
                      </div>

                      <Progress
                        value={
                          habit.progress
                        }
                      />
                    </div>
                  );
                }
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>
                    Görev özeti
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Kaydettiğin
                    görevlerin genel
                    durumu.
                  </CardDescription>
                </div>

                <Link
                  href="/tasks"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Görevlere git
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-2xl font-bold">
                    {tasks.length}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Toplam
                  </p>
                </div>

                <div className="rounded-xl bg-muted p-4">
                  <p className="text-2xl font-bold">
                    {
                      tasks.filter(
                        (task) =>
                          task.status !==
                          "completed"
                      ).length
                    }
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Bekleyen
                  </p>
                </div>

                <div className="rounded-xl bg-muted p-4">
                  <p className="text-2xl font-bold">
                    {
                      tasks.filter(
                        (task) =>
                          task.status ===
                          "completed"
                      ).length
                    }
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Tamamlanan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}