import Link from "next/link";
import { getCurrentUser } from "@/app/login/actions";
import { NavContent } from "./nav-content";

export async function Nav() {
  // 未配置 Supabase 时优雅降级
  let user: { id: string; email?: string | null | undefined } | null = null;
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref")
    ) {
      const u = await getCurrentUser();
      if (u) user = { id: u.id, email: u.email };
    }
  } catch {
    user = null;
  }

  return (
    <header className="border-b border-k-paper-line dark:border-k-paper-line kodak-hero-band">
      <NavContent user={user} />
    </header>
  );
}

// 兼容旧引用（没用到时 tree-shake 会丢掉，保留防止有人 import { Nav } from "@/components/nav" 时缺这个 Link）
export { Link };
