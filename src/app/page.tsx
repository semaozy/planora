import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  HeartPulse,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const modules = [
  {
    title: "Görevler",
    description: "Günlük ve haftalık görevlerini planla.",
    icon: CheckCircle2,
  },
  {
    title: "Takvim",
    description: "Derslerini, toplantılarını ve etkinliklerini yönet.",
    icon: CalendarDays,
  },
  {
    title: "Dersler",
    description: "Ders notlarını, kaynaklarını ve sınavlarını takip et.",
    icon: BookOpen,
  },
  {
    title: "Spor",
    description: "Pilates, koşu ve egzersiz programını düzenle.",
    icon: Dumbbell,
  },
  {
    title: "Beslenme",
    description: "Su tüketimini ve beslenme alışkanlıklarını takip et.",
    icon: HeartPulse,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="mx-auto flex max-w-6xl flex-col px-6 py-16">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex rounded-full border bg-background px-4 py-2 text-sm font-medium text-primary">
            Kişisel yaşam asistanın
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Hayatını Planora ile düzenle.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Görevlerini, alışkanlıklarını, derslerini, spor planını ve
            takvimini tek bir uygulama üzerinden yönet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Uygulamaya başla
              <ArrowRight className="ml-2 size-4" />
            </Link>

            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
            >
              Giriş yap
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Card key={module.title}>
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <CardTitle>{module.title}</CardTitle>

                  <CardDescription>
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Planora modülü
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}