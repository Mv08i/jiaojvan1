"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSettings } from "@/lib/i18n/provider";

export type YearlyStat = {
  year: number;
  film_cost: number;
  purchase_count: number;
  total_rolls: number;
};

export type BrandStat = {
  brand: string;
  total: number;
  rolls: number;
};

// 柯达黄主色板（黄 → 金 → 橙 → 包装金为主，紫/蓝/绿做点缀）
const COLORS = [
  "#ffd200",   // 柯达黄（主色，第一序列）
  "#f1bf00",   // 深黄
  "#c89b3c",   // 包装金
  "#ff9a00",   // 金橙（UltraMax 橙）
  "#ffef6e",   // 浅黄（第二）
  "#a8644a",   // Tri-X 褐
  "#7a3b95",   // Portra 紫（点缀）
  "#2b5fa5",   // Ektachrome 蓝（点缀）
  "#2f7d5b",   // Gold 盒绿（点缀）
];

const tooltipStyle = {
  backgroundColor: "#fff8d7",      // 黄奶油底（配合黄主色，反色改为浅底深字）
  border: "1px solid #c89b3c",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#3b1f14",
  boxShadow: "0 8px 22px -10px rgba(200,155,60,0.55)",
};

export function StatsCharts({
  yearly,
  byBrand,
}: {
  yearly: YearlyStat[];
  byBrand: BrandStat[];
}) {
  const { t, money } = useSettings();

  const yearlyData = yearly
    .sort((a, b) => a.year - b.year)
    .map((y) => ({
      year: String(y.year),
      spending: Number(y.film_cost.toFixed(2)),
      rolls: y.total_rolls,
    }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
        <h2 className="mb-1 text-sm font-semibold text-k-film-edge/80 dark:text-k-yellow/90">
          {t("stats.yearly_chart")}
        </h2>
        <p className="mb-4 text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("stats.yearly_chart_hint")}
        </p>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={yearlyData} margin={{ top: 28, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 155, 60, 0.18)" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#3b1f14" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#3b1f14" }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(200, 155, 60, 0.08)" }}
                formatter={(v, name) => {
                  if (name === "spending") {
                    return [money(Number(v)), t("table.total_price")];
                  }
                  if (name === "rolls") {
                    return [String(v), t("table.total_rolls")];
                  }
                  return [String(v), String(name)];
                }}
              />
              <Bar dataKey="spending" fill="#ffd200" radius={[4, 4, 0, 0]} name="spending">
                <LabelList
                  dataKey="spending"
                  position="top"
                  formatter={(v) => money(Number(v ?? 0), 0)}
                  fill="#3b1f14"
                  fontSize={11}
                  stroke="none"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-k-paper-line bg-k-cream-2 p-4 dark:border-k-paper-line dark:bg-k-film-edge/60">
        <h2 className="mb-1 text-sm font-semibold text-k-film-edge/80 dark:text-k-yellow/90">
          {t("stats.brand_chart")}
        </h2>
        <p className="mb-4 text-xs text-k-film-edge/55 dark:text-k-film-edge/40">
          {t("stats.brand_chart_hint")}
        </p>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={byBrand}
                dataKey="total"
                nameKey="brand"
                cx="50%"
                cy="50%"
                outerRadius={78}
                innerRadius={38}
                paddingAngle={2}
                labelLine={{
                  stroke: "#c89b3c",
                  strokeWidth: 1,
                }}
                label={(props) => {
                  const brand = String(props.name ?? "");
                  const total = Number(props.value ?? 0);
                  const percent = Number(props.percent ?? 0);
                  return (
                    <tspan fill="#3b1f14" fontSize={11}>
                      {brand} {money(total, 0)} ({(percent * 100).toFixed(0)}%)
                    </tspan>
                  );
                }}
              >
                {byBrand.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v, name) => {
                  if (name === "total") {
                    return [money(Number(v)), t("table.total_price")];
                  }
                  if (name === "rolls") {
                    return [String(v), t("table.total_rolls")];
                  }
                  return [String(v), String(name)];
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, color: "#3b1f14" }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
