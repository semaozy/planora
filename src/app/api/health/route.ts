import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          connected: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      status: "ok",
      connected: true,
      message: "Planora Supabase bağlantısı çalışıyor.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        connected: false,
        message:
          error instanceof Error
            ? error.message
            : "Bilinmeyen bağlantı hatası",
      },
      {
        status: 500,
      }
    );
  }
}