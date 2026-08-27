import { createClient } from "@/lib/supabase/server";
import { PurchasesView } from "./purchases-view";
import type { FilmStock, Purchase } from "./types";

export default async function PurchasesPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref") &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let filmStocks: FilmStock[] = [];
  let purchases: Purchase[] = [];
  let notLoggedIn = false;

  if (configured) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const { data } = await supabase
      .from("film_stocks")
      .select("id, brand, name, iso, process, format")
      .order("brand", { ascending: true })
      .order("name", { ascending: true });
    filmStocks = (data as FilmStock[]) ?? [];

    if (!user) {
      notLoggedIn = true;
    } else {
      const res = await supabase
        .from("purchases")
        .select(
          "id, brand, name, iso, quantity, unit_price, total_price, purchase_date, vendor, notes"
        )
        .eq("user_id", user.id)
        .order("purchase_date", { ascending: false })
        .order("created_at", { ascending: false });
      purchases = (res.data as Purchase[]) ?? [];
    }
  }

  return (
    <PurchasesView
      supabaseNotConfigured={!configured}
      notLoggedIn={notLoggedIn}
      filmStocks={filmStocks}
      purchases={purchases}
    />
  );
}
