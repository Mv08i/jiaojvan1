'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; success?: string };

function toNumber(v: FormDataEntryValue | null, fallback = 0): number {
  if (v === null || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

// 新增冲洗记录
export async function addDeveloping(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "请先登录后再添加冲洗记录" };
  }

  const purchaseId = (formData.get("purchase_id") as string) || null;
  const manualBrand = (formData.get("brand") as string)?.trim() || "";
  const manualName = (formData.get("name") as string)?.trim() || "";
  const developDate = formData.get("develop_date") as string;
  const lab = (formData.get("lab") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;
  const developCost = toNumber(formData.get("develop_cost"));
  const scanCost = toNumber(formData.get("scan_cost"));
  const shippingCost = toNumber(formData.get("shipping_cost"));

  if (!developDate) {
    return { error: "请选择冲洗日期" };
  }

  // 关联采购 → 从 purchases 表反查 brand/name（RLS 自动按 user_id 过滤）
  let brand = manualBrand;
  let name = manualName;
  let resolvedPurchaseId: string | null = null;

  if (purchaseId) {
    const { data: linked, error: linkErr } = await supabase
      .from("purchases")
      .select("id, brand, name")
      .eq("id", purchaseId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (linkErr) {
      return { error: "无法验证关联采购：" + linkErr.message };
    }
    if (!linked) {
      return { error: "选择的采购记录不存在或无权访问" };
    }
    brand = linked.brand;
    name = linked.name;
    resolvedPurchaseId = linked.id;
  }

  if (!brand || !name) {
    return { error: "请选择关联采购或手动填写品牌与型号" };
  }

  const { error } = await supabase.from("developing_records").insert({
    user_id: user.id,
    purchase_id: resolvedPurchaseId,
    stock_id: null, // 冲洗记录不直接关联型号库（用冗余字段即可）
    brand,
    name,
    develop_cost: developCost,
    scan_cost: scanCost,
    shipping_cost: shippingCost,
    // total_cost 是 GENERATED 列，由数据库自动计算，不要 insert
    develop_date: developDate,
    lab,
    notes,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/developing");
  revalidatePath("/dashboard"); // 同步刷新仪表板的冲洗支出
  return { success: `已添加 ${brand} ${name} 的冲洗记录` };
}

// 删除冲洗记录
export async function deleteDeveloping(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  if (!id) {
    throw new Error("缺少记录 ID");
  }

  const { error } = await supabase
    .from("developing_records")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // RLS 双重校验

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/developing");
  revalidatePath("/dashboard");
}
