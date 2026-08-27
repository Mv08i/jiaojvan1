import { createClient } from "@/lib/supabase/server";
import { DevelopingView } from "./developing-view";
import type { DevelopingRecord, Purchase } from "./types";

export default async function DevelopingPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref") &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let purchases: Purchase[] = [];
  let records: DevelopingRecord[] = [];
  let notLoggedIn = false;

  if (configured) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      notLoggedIn = true;
    } else {
      const [pRes, rRes] = await Promise.all([
        supabase
          .from("purchases")
          .select("id, brand, name, iso")
          .eq("user_id", user.id)
          .order("purchase_date", { ascending: false })
          .order("created_at", { ascending: false }),
        supabase
          .from("developing_records")
          .select(
            "id, brand, name, purchase_id, develop_cost, scan_cost, shipping_cost, total_cost, develop_date, lab, notes"
          )
          .eq("user_id", user.id)
          .order("develop_date", { ascending: false })
          .order("created_at", { ascending: false }),
      ]);
      purchases = (pRes.data as Purchase[]) ?? [];
      records = (rRes.data as DevelopingRecord[]) ?? [];
    }
  }

  return (
    <DevelopingView
      supabaseNotConfigured={!configured}
      notLoggedIn={notLoggedIn}
      purchases={purchases}
      records={records}
    />
  );
}
