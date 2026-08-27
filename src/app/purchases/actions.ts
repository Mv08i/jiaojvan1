'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// 新增采购记录
export async function addPurchase(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "请先登录后再添加采购记录" };
  }

  const rawStockId = formData.get("stock_id") as string | null;
  const quantity = parseInt(formData.get("quantity") as string, 10);
  const unitPrice = parseFloat(formData.get("unit_price") as string);
  const purchaseDate = formData.get("purchase_date") as string;
  const vendor = (formData.get("vendor") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  // 基础校验
  if (!quantity || !unitPrice || !purchaseDate) {
    return { error: "请填写数量、单价和购买日期" };
  }
  if (quantity < 1 || unitPrice < 0) {
    return { error: "数量必须 ≥1，单价必须 ≥0" };
  }

  let brand: string | null = null;
  let name: string | null = null;
  let iso: number | null = null;
  let stockId: string | null = null;

  const isCustom = rawStockId === "custom";

  if (isCustom) {
    // ============ 模式：用户手动填写 ============
    brand = (formData.get("brand") as string)?.trim() || null;
    name = (formData.get("name") as string)?.trim() || null;
    const isoStr = formData.get("iso") as string | null;
    const process = (formData.get("process") as string)?.trim() || null;
    const format = (formData.get("format") as string)?.trim() || null;
    iso = isoStr ? parseInt(isoStr, 10) : null;

    if (!brand || !name || !iso || iso < 1 || !process || !format) {
      return { error: "请完整填写胶卷的品牌、型号、ISO、工艺和画幅" };
    }
    if (!["C-41", "E-6", "B&W"].includes(process)) {
      return { error: "工艺参数不合法" };
    }
    if (!["135", "120", "sheet"].includes(format)) {
      return { error: "画幅参数不合法" };
    }

    // 优先查找用户已保存过的同名自定义型号（避免重复）
    const { data: existing } = await supabase
      .from("film_stocks")
      .select("id")
      .eq("brand", brand)
      .eq("name", name)
      .eq("iso", iso)
      .eq("format", format)
      .eq("owner_id", user.id)
      .maybeSingle();

    if (existing) {
      stockId = existing.id;
    } else {
      // 写入用户自定义型号库（is_preset=false, owner_id=当前用户）
      const { data: inserted, error: insErr } = await supabase
        .from("film_stocks")
        .insert({
          brand,
          name,
          iso,
          process,
          format,
          is_preset: false,
          owner_id: user.id,
        })
        .select("id")
        .single();

      if (insErr) {
        return { error: "保存自定义胶卷型号失败：" + insErr.message };
      }
      stockId = inserted?.id ?? null;
    }
  } else {
    // ============ 模式：从型号库选择 ============
    if (!rawStockId) {
      return { error: "请选择胶卷型号，或切换到手动填写" };
    }
    stockId = rawStockId;

    const { data: stock } = await supabase
      .from("film_stocks")
      .select("brand, name, iso")
      .eq("id", stockId)
      .maybeSingle();

    if (!stock) {
      return { error: "选择的胶卷型号不存在" };
    }
    brand = stock.brand;
    name = stock.name;
    iso = stock.iso;
  }

  if (!brand || !name || !iso) {
    return { error: "胶卷信息不完整" };
  }

  const { error } = await supabase.from("purchases").insert({
    user_id: user.id,
    stock_id: stockId,
    brand,
    name,
    iso,
    quantity,
    unit_price: unitPrice,
    total_price: unitPrice * quantity,
    purchase_date: purchaseDate,
    vendor,
    notes,
  });

  if (error) {
    return { error: "保存失败：" + error.message };
  }

  revalidatePath("/purchases");
  revalidatePath("/dashboard");
  return { success: `已添加 ${brand} ${name}（${quantity} 卷）` };
}

// 删除采购记录（通过 hidden input id 传 ID，服务器验证所有权）
export async function deletePurchase(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  if (!id) {
    throw new Error("缺少记录 ID");
  }

  // .eq("user_id") 确保用户只能删自己的记录
  const { error } = await supabase
    .from("purchases")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("删除失败：" + error.message);
  }

  revalidatePath("/purchases");
  revalidatePath("/dashboard");
}

export type ActionState = { error?: string; success?: string };
