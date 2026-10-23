"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type TaskActionState = {
  error: string | null;
  success: string | null;
};

export async function createTask(
  _previousState: TaskActionState,
  formData: FormData
): Promise<TaskActionState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(
    formData.get("description") ?? ""
  ).trim();

  const priority = String(
    formData.get("priority") ?? "normal"
  );

  const dueDate = String(
    formData.get("dueDate") ?? ""
  );

  if (!title) {
    return {
      error: "Görev başlığı zorunludur.",
      success: null,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Oturum bulunamadı.",
      success: null,
    };
  }

  const { error } = await supabase
    .from("tasks")
    .insert({
      user_id: user.id,
      title,
      description: description || null,
      priority,
      status: "todo",
      due_date: dueDate
        ? new Date(dueDate).toISOString()
        : null,
    });

  if (error) {
    return {
      error: error.message,
      success: null,
    };
  }

  revalidatePath("/tasks");
  revalidatePath("/dashboard");

  return {
    error: null,
    success: "Görev başarıyla oluşturuldu.",
  };
}

export async function toggleTask(
  formData: FormData
) {
  const taskId = String(
    formData.get("taskId") ?? ""
  );

  const currentStatus = String(
    formData.get("currentStatus") ?? "todo"
  );

  if (!taskId) {
    return;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const isCompleted =
    currentStatus !== "completed";

  await supabase
    .from("tasks")
    .update({
      status: isCompleted
        ? "completed"
        : "todo",

      completed_at: isCompleted
        ? new Date().toISOString()
        : null,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}

export async function deleteTask(
  formData: FormData
) {
  const taskId = String(
    formData.get("taskId") ?? ""
  );

  if (!taskId) {
    return;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", user.id);

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}

export async function updateTask(
  _previousState: TaskActionState,
  formData: FormData
): Promise<TaskActionState> {
  const taskId = String(
    formData.get("taskId") ?? ""
  );

  const title = String(
    formData.get("title") ?? ""
  ).trim();

  const description = String(
    formData.get("description") ?? ""
  ).trim();

  const priority = String(
    formData.get("priority") ?? "normal"
  );

  const dueDate = String(
    formData.get("dueDate") ?? ""
  );

  if (!taskId || !title) {
    return {
      error: "Görev bilgileri eksik.",
      success: null,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Oturum bulunamadı.",
      success: null,
    };
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      title,
      description: description || null,
      priority,
      due_date: dueDate
        ? new Date(dueDate).toISOString()
        : null,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    return {
      error: error.message,
      success: null,
    };
  }

  revalidatePath("/tasks");
  revalidatePath("/dashboard");

  return {
    error: null,
    success: "Görev güncellendi.",
  };
}