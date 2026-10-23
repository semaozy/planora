import Link from "next/link";
import {
  CalendarCheck2,
  CheckCircle2,
} from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CalendarCheck2 className="size-6" />
          </div>

          <div>
            <p className="text-xl font-bold">
              Planora
            </p>

            <p className="text-xs text-muted-foreground">
              Kişisel yaşam asistanın
            </p>
          </div>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-5" />
            </div>

            <CardTitle className="text-2xl">
              Tekrar hoş geldin
            </CardTitle>

            <CardDescription>
              Planora hesabına giriş yap ve planlarına kaldığın yerden devam et.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}