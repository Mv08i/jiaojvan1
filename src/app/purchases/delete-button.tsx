"use client";

import { useFormStatus } from "react-dom";
import { deletePurchase } from "./actions";

// 删除按钮：用 hidden input 传 ID，formAction 触发 deletePurchase
// 服务器端 .eq("user_id", user.id) 确保用户只能删自己的记录
export function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deletePurchase}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-xs text-k-film-edge/40 transition-colors hover:text-red-500 disabled:opacity-50 dark:text-k-film-edge/55"
    >
      {pending ? "删除中…" : "删除"}
    </button>
  );
}
