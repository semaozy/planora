"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error: string | null;
  success: string | null;
};

export async function login(
  _previousState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(
    formData.get("email") ?? ""
  ).trim();

  const password = String(
    formData.get("password") ?? ""
  );

  if (!email || !password) {
    return {
      error: "E-posta ve şifre zorunludur.",
      success: null,
    };
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    return {
      error: "E-posta veya şifre hatalı.",
      success: null,
    };
  }

  redirect("/dashboard");
}

export async function register(
  _previousState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const fullName = String(
    formData.get("fullName") ?? ""
  ).trim();

  const email = String(
    formData.get("email") ?? ""
  ).trim();

  const password = String(
    formData.get("password") ?? ""
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? ""
  );

  if (!fullName || !email || !password) {
    return {
      error: "Tüm alanları doldur.",
      success: null,
    };
  }

  if (password.length < 6) {
    return {
      error: "Şifre en az 6 karakter olmalıdır.",
      success: null,
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Şifreler eşleşmiyor.",
      success: null,
    };
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          full_name: fullName,
        },

        emailRedirectTo:
          `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

  if (error) {
    return {
      error: error.message,
      success: null,
    };
  }

  if (data.session) {
    redirect("/dashboard");
  }

  return {
    error: null,
    success:
      "Hesabın oluşturuldu. E-posta adresine gönderilen doğrulama bağlantısını kontrol et.",
  };
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}