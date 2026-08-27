import { createClient } from "@/lib/supabase/server";
import { LoadView } from "./load-view";
import type { Camera, Purchase } from "./types";

export default async function LoadPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref") &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let cameras: Camera[] = [];
  let purchases: Purchase[] = [];
  let notLoggedIn = false;

  if (configured) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      notLoggedIn = true;
    } else {
      const [cRes, pRes] = await Promise.all([
        supabase
          .from("cameras")
          .select(
            "id, brand, model, format, nickname, current_purchase_id, loaded_brand, loaded_name, loaded_iso, loaded_at, frames_shot, notes"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("purchases")
          .select("id, brand, name, iso")
          .eq("user_id", user.id)
          .order("purchase_date", { ascending: false })
          .order("created_at", { ascending: false }),
      ]);
      cameras = (cRes.data as Camera[]) ?? [];
      purchases = (pRes.data as Purchase[]) ?? [];
    }
  }

  return (
    <LoadView
      supabaseNotConfigured={!configured}
      notLoggedIn={notLoggedIn}
      cameras={cameras}
      purchases={purchases}
    />
  );
}
