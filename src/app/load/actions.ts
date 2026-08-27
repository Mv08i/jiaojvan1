'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; success?: string };

// 添加相机
export async function addCamera(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "请先登录后再添加相机" };
  }

  const brand = (formData.get("brand") as string)?.trim();
  const model = (formData.get("model") as string)?.trim();
  const format = (formData.get("format") as string) || "135";
  const nickname = (formData.get("nickname") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!brand || !model) {
    return { error: "请填写相机品牌和型号" };
  }

  const { error } = await supabase.from("cameras").insert({
    user_id: user.id,
    brand,
    model,
    format,
    nickname,
    notes,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/load");
  return { success: `已添加相机 ${brand} ${model}` };
}

// 删除相机
export async function deleteCamera(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  if (!id) {
    throw new Error("缺少相机 ID");
  }

  const { error } = await supabase
    .from("cameras")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/load");
}

// 装卷：关联一条采购记录，并把采购的 brand/name/iso 冗余到相机上
export async function loadFilm(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const cameraId = formData.get("camera_id") as string;
  const purchaseId = formData.get("purchase_id") as string;
  const loadedAt = (formData.get("loaded_at") as string) || new Date().toISOString().slice(0, 10);

  if (!cameraId || !purchaseId) {
    throw new Error("请选择相机和要装的胶卷");
  }

  // 反查采购记录（RLS 双重校验）
  const { data: purchase, error: pErr } = await supabase
    .from("purchases")
    .select("id, brand, name, iso")
    .eq("id", purchaseId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (pErr || !purchase) {
    throw new Error("所选胶卷不存在或无权访问");
  }

  const { error } = await supabase
    .from("cameras")
    .update({
      current_purchase_id: purchase.id,
      loaded_brand: purchase.brand,
      loaded_name: purchase.name,
      loaded_iso: purchase.iso,
      loaded_at: loadedAt,
      frames_shot: 0,
    })
    .eq("id", cameraId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/load");
}

// 卸卷：清空装卷状态，记录已拍帧数（用于复盘）
export async function unloadFilm(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const cameraId = formData.get("camera_id") as string;

  if (!cameraId) {
    throw new Error("缺少相机 ID");
  }

  const { error } = await supabase
    .from("cameras")
    .update({
      current_purchase_id: null,
      loaded_brand: null,
      loaded_name: null,
      loaded_iso: null,
      loaded_at: null,
      frames_shot: 0, // 卸卷后归零，下次装卷重新计数
    })
    .eq("id", cameraId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/load");
}
