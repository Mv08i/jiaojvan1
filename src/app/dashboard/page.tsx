import { createClient } from "@/lib/supabase/server";
import { DashboardView } from "./dashboard-view";
import type { Purchase } from "@/app/purchases/types";
import type { DevelopingRecord } from "@/app/developing/types";

export default async function DashboardPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref") &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!configured) {
    return <DashboardView supabaseNotConfigured year={new Date().getFullYear()} yearFilmCost={0} yearRolls={0} yearDevCost={0} stockValue={0} stockRolls={0} recentPurchases={[]} />;
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return <DashboardView notLoggedIn year={new Date().getFullYear()} yearFilmCost={0} yearRolls={0} yearDevCost={0} stockValue={0} stockRolls={0} recentPurchases={[]} />;
  }

  // 今年的年度范围
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1).toISOString();

  const [allPurchasesRes, yearPurchasesRes, yearDevsRes, allDevsRes] =
    await Promise.all([
      supabase
        .from("purchases")
        .select("id, brand, name, iso, quantity, unit_price, total_price, purchase_date, vendor, notes")
        .eq("user_id", user.id)
        .order("purchase_date", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase
        .from("purchases")
        .select("total_price, quantity")
        .eq("user_id", user.id)
        .gte("purchase_date", yearStart.slice(0, 10)),
      supabase
        .from("developing_records")
        .select("total_cost")
        .eq("user_id", user.id)
        .gte("develop_date", yearStart.slice(0, 10)),
      supabase
        .from("developing_records")
        .select("purchase_id")
        .eq("user_id", user.id)
        .not("purchase_id", "is", null),
    ]);

  const allPurchases = (allPurchasesRes.data as Purchase[]) ?? [];
  const yearPurchases = (yearPurchasesRes.data as Purchase[]) ?? [];
  const yearDevs = (yearDevsRes.data as DevelopingRecord[]) ?? [];
  const devCount = allDevsRes.data?.length ?? 0;

  const yearFilmCost = yearPurchases.reduce(
    (s: number, p: Purchase) => s + Number(p.total_price),
    0
  );
  const yearRolls = yearPurchases.reduce(
    (s: number, p: Purchase) => s + Number(p.quantity),
    0
  );
  const yearDevCost = yearDevs.reduce(
    (s: number, d: DevelopingRecord) => s + Number(d.total_cost),
    0
  );

  const totalRolls = allPurchases.reduce((s, p) => s + p.quantity, 0);
  const stockRolls = Math.max(0, totalRolls - devCount);
  const totalSpent = allPurchases.reduce((s, p) => s + Number(p.total_price), 0);
  const avgPricePerRoll = totalRolls > 0 ? totalSpent / totalRolls : 0;
  const stockValue = stockRolls * avgPricePerRoll;
  const recentPurchases = allPurchases.slice(0, 5);

  return (
    <DashboardView
      year={now.getFullYear()}
      yearFilmCost={yearFilmCost}
      yearRolls={yearRolls}
      yearDevCost={yearDevCost}
      stockValue={stockValue}
      stockRolls={stockRolls}
      recentPurchases={recentPurchases}
    />
  );
}
