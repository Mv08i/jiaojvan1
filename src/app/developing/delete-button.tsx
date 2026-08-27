"use client";

import { useFormStatus } from "react-dom";
import { deleteDeveloping } from "./actions";

export function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteDeveloping}>
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
      className="text-xs text-k-film-edge/40 transition-colors hover:text-red-500 disabled:opacity-50"
    >
      {pending ? "删除中…" : "删除"}
    </button>
  );
}
