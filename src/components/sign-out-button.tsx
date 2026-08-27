"use client";

import { useFormStatus } from "react-dom";
import { signOut } from "@/app/login/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded px-3 py-1.5 text-sm text-k-film-edge/70 transition-colors hover:bg-k-yellow/15 hover:text-k-film-edge dark:text-k-film-edge/40 dark:hover:bg-k-gold/20 dark:hover:text-zinc-100"
      >
        <ButtonInner />
      </button>
    </form>
  );
}

function ButtonInner() {
  const { pending } = useFormStatus();
  return <>{pending ? "退出中…" : "退出"}</>;
}
