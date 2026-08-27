export type Purchase = {
  id: string;
  brand: string;
  name: string;
  iso: number;
};

export type DevelopingRecord = {
  id: string;
  brand: string;
  name: string;
  purchase_id: string | null;
  develop_cost: number;
  scan_cost: number;
  shipping_cost: number;
  total_cost: number;
  develop_date: string;
  lab: string | null;
  notes: string | null;
};
