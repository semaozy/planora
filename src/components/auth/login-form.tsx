"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";

import {
  login,
  type AuthState,
} from "@/actions/auth";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthState = {
  error: null,
  success: null,
};

export function LoginForm() {
  const [state, action, pending] =
    useActionState(login, initialState);

  return (
    <form
      action={action}
      className="space-y-5"
    >
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>
            {state.error}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">
          E-posta
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="sema@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            Şifre
          </Label>

          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            Şifremi unuttum
          </Link>
        </div>

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Giriş yapılıyor...
          </>
        ) : (
          <>
            <LogIn className="size-4" />
            Giriş yap
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Henüz hesabın yok mu?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Kayıt ol
        </Link>
      </p>
    </form>
  );
}