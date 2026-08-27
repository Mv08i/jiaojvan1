import { createClient } from "@/lib/supabase/server";
import { StatsView } from "./stats-view";
import type { BrandStat, YearlyStat } from "./charts";

export default async function StatsPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref") &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let yearly: YearlyStat[] = [];
  let byBrand: BrandStat[] = [];
  let notLoggedIn = false;
  let purchaseCount = 0;
  let totalRolls = 0;
  let totalSpent = 0;

  if (configured) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      notLoggedIn = true;
    } else {
      const { data: purchases } = await supabase
        .from("purchases")
        .select("brand, quantity, total_price, purchase_date")
        .eq("user_id", user.id)
        .order("purchase_date", { ascending: true });
      const rows = purchases ?? [];
      purchaseCount = rows.length;

      const yearlyMap = new Map<number, YearlyStat>();
      const brandMap = new Map<string, BrandStat>();

      for (const r of rows) {
        const year = new Date(r.purchase_date).getFullYear();
        const total = Number(r.total_price);
        const qty = Number(r.quantity);

        totalSpent += total;
        totalRolls += qty;

        const ys = yearlyMap.get(year) ?? {
          year,
          film_cost: 0,
          purchase_count: 0,
          total_rolls: 0,
        };
        ys.film_cost += total;
        ys.purchase_count += 1;
        ys.total_rolls += qty;
        yearlyMap.set(year, ys);

        const bs = brandMap.get(r.brand) ?? { brand: r.brand, total: 0, rolls: 0 };
        bs.total += total;
        bs.rolls += qty;
        brandMap.set(r.brand, bs);
      }

      yearly = Array.from(yearlyMap.values());
      byBrand = Array.from(brandMap.values()).sort((a, b) => b.total - a.total);
    }
  }

  const avgPricePerRoll = totalRolls > 0 ? totalSpent / totalRolls : 0;

  return (
    <StatsView
      supabaseNotConfigured={!configured}
      notLoggedIn={notLoggedIn}
      yearly={yearly}
      byBrand={byBrand}
      purchaseCount={purchaseCount}
      totalRolls={totalRolls}
      totalSpent={totalSpent}
      avgPricePerRoll={avgPricePerRoll}
    />
  );
}
