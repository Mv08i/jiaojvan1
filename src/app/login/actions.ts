'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; success?: string };

// 邮箱密码登录
export async function signIn(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirect") as string) || "/dashboard";

  if (!email || !password) {
    return { error: "请填写邮箱和密码" };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // 统一返回友好错误，避免泄露信息
    if (
      error.message.includes("Invalid login") ||
      error.message.includes("Invalid") ||
      error.message.includes("email")
    ) {
      return { error: "邮箱或密码不正确" };
    }
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

// 邮箱注册（可选）——Supabase 默认会发确认邮件，未确认的用户也能登录（可在控制台调整）
export async function signUp(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "请填写邮箱和密码" };
  }
  if (password.length < 6) {
    return { error: "密码至少 6 位" };
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: "注册成功！请检查邮箱确认后再登录。" };
}

// 登出
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

// 获取当前登录用户（给 Nav 等 Server Components 调用）
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
