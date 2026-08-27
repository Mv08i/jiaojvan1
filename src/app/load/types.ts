export type Purchase = {
  id: string;
  brand: string;
  name: string;
  iso: number;
};

export type Camera = {
  id: string;
  brand: string;
  model: string;
  format: string;
  nickname: string | null;
  current_purchase_id: string | null;
  loaded_brand: string | null;
  loaded_name: string | null;
  loaded_iso: number | null;
  loaded_at: string | null;
  frames_shot: number;
  notes: string | null;
};
