// 胶卷型号（表单下拉选项）
export type FilmStock = {
  id: string;
  brand: string;
  name: string;
  iso: number;
  process: string;
  format: string;
};

// 采购记录（列表展示）
export type Purchase = {
  id: string;
  brand: string;
  name: string;
  iso: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  purchase_date: string;
  vendor: string | null;
  notes: string | null;
};
