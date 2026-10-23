"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2, UserPlus } from "lucide-react";

import {
  register,
  type AuthState,
} from "@/actions/auth";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthState = {
  error: null,
  success: null,
};

export function RegisterForm() {
  const [state, action, pending] =
    useActionState(register, initialState);

  return (
    <form action={action} className="space-y-4">
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
        <Label htmlFor="fullName">
          Ad Soyad
        </Label>

        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Sema Nur Özyılmaz"
          autoComplete="name"
          required
        />
      </div>

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
        <Label htmlFor="password">
          Şifre
        </Label>

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="En az 6 karakter"
          autoComplete="new-password"
          minLength={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Şifreyi tekrar yaz
        </Label>

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Şifreni tekrar yaz"
          autoComplete="new-password"
          minLength={6}
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
            Hesap oluşturuluyor...
          </>
        ) : (
          <>
            <UserPlus className="size-4" />
            Hesap oluştur
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Zaten hesabın var mı?{" "}
        <Link
            href="/login"
            className="font-medium text-primary hover:underline"
            >
            Giriş yap
        </Link>
      </p>
    </form>
  );
}